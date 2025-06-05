import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Razorpay from 'razorpay';
import { OAuth2Client } from 'google-auth-library';
import bcrypt from 'bcrypt';
import cors from 'cors';
// const fetch = require('node-fetch');
import fetch from 'node-fetch';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const googleClientID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(googleClientID)

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// MongoDB Connection (would be configured with actual MongoDB URI in production)
const connectDB = async () => {
  try {
    // This is a placeholder - in a real app, you would use an actual MongoDB URI
    const mongoURI = process.env.MONGO_URI;
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

// Razorpay setup (would be configured with actual Razorpay keys in production)
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_key',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_test_secret',
});

// Define MongoDB Models (simplified for demonstration)
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  googleId: { type: String, unique: true, sparse: true },
  password: { type: String },
  picture: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const CoinSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  age: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  material: { type: String },
  condition: { type: String },
  diameter: { type: String },
  weight: { type: String },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  createdAt: { type: Date, default: Date.now },
});

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      coin: { type: mongoose.Schema.Types.ObjectId, ref: 'Coin', required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
  updatedAt: { type: Date, default: Date.now },
});

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coins: [
    {
      coin: { type: mongoose.Schema.Types.ObjectId, ref: 'Coin', required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentId: { type: String },
  razorpayOrderId: { type: String },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  shippingAddress: {
    address: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

// Create models
const User = mongoose.model('User', UserSchema);
const Coin = mongoose.model('Coin', CoinSchema);
const Cart = mongoose.model('Cart', CartSchema);
const Order = mongoose.model('Order', OrderSchema);

// JWT Middleware for auth
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.status(401).json({ message: 'Unauthorized' });
  
  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
};

// Routes

// Auth routes

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, picture, token, accessToken} = req.body;

    let user;

    // If token is provided, it's Google signup
    if (token) {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
    
      const payload = ticket.getPayload();
      console.log('Google token payload:', payload);
    
      let googleId = payload.sub;
      let emailFromGoogle = payload.email;
      let nameFromGoogle = payload.name;
      let pictureFromGoogle = payload.picture;
    
      if (!nameFromGoogle || !pictureFromGoogle) {
        if (!accessToken) {
          return res.status(400).json({ message: 'Access token is required to fetch full user info.' });
        }
    
        const userInfoResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
    
        const userInfo = await userInfoResponse.json();
        console.log('UserInfo API response:', userInfo);
    
        nameFromGoogle = userInfo.name || nameFromGoogle;
        pictureFromGoogle = userInfo.picture || pictureFromGoogle;
      }
    
      if (!nameFromGoogle) {
        nameFromGoogle = emailFromGoogle.split('@')[0];  // <<-- here
      }
    
      user = await User.findOne({ email: emailFromGoogle });
    
      if (!user) {
        user = new User({
          name: nameFromGoogle,
          email: emailFromGoogle,
          googleId,
          picture: pictureFromGoogle || '',
        });
        await user.save();
      }
    }    
    // Else normal email/password signup
    else {
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required' });
      }

      user = await User.findOne({ email });
      if (user) {
        return res.status(409).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      user = new User({
        name,
        email,
        password: hashedPassword,
        picture,
      });

      await user.save();
    }

    // Generate JWT
    const jwtToken = jwt.sign(
      { id: user._id, name: user.name, email: user.email, picture: user.picture },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '7d' }
    );
    console.log('JWT Token:', jwtToken);

    res.json({
      token: jwtToken,
      user: { id: user._id, name: user.name, email: user.email, picture: user.picture },
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Signup failed' });
  }
});



app.post('/api/auth/login', async (req, res) => {
  try {
    const { token, email, password } = req.body;

    let user;

    // GOOGLE LOGIN
    if (token) {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const { sub: googleId, email: googleEmail, name, picture } = payload;

      user = await User.findOne({ email: googleEmail });

      if (!user) {
        user = new User({ name, email: googleEmail, googleId, picture });
        await user.save();
      }
    }

    // NORMAL LOGIN
    else if (email && password) {
      user = await User.findOne({ email });

      if (!user || !user.password) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    }

    else {
      return res.status(400).json({ message: 'Provide either Google token or email/password' });
    }

    // Generate JWT
    const jwtToken = jwt.sign(
      { id: user._id, name: user.name, email: user.email, picture: user.picture },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '7d' }
    );
    console.log('JWT Token:', jwtToken);

    res.json({
      token: jwtToken,
      user: { id: user._id, name: user.name, email: user.email, picture: user.picture }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Coin routes
app.get('/api/coins', async (req, res) => {
  try {
    const { type, minPrice, maxPrice, minAge, maxAge } = req.query;
    
    let query = {};
    
    if (type) {
      query.type = type;
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    if (minAge || maxAge) {
      query.age = {};
      if (minAge) query.age.$gte = Number(minAge);
      if (maxAge) query.age.$lte = Number(maxAge);
    }
    
    const coins = await Coin.find(query).populate('seller', 'name');
    res.json(coins);
  } catch (error) {
    console.error('Error fetching coins:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/coins/:id', async (req, res) => {
  try {
    const coin = await Coin.findById(req.params.id).populate('seller', 'name');
    if (!coin) {
      return res.status(404).json({ message: 'Coin not found' });
    }
    res.json(coin);
  } catch (error) {
    console.error('Error fetching coin:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/coins', authenticateToken, async (req, res) => {
  try {
    const { name, type, age, price, description, image, material, condition, diameter, weight } = req.body;
    
    const newCoin = new Coin({
      name,
      type,
      age,
      price,
      description,
      image,
      material,
      condition,
      diameter,
      weight,
      seller: req.user.id
    });
    
    await newCoin.save();
    res.status(201).json(newCoin);
  } catch (error) {
    console.error('Error creating coin:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cart routes
app.get('/api/cart', authenticateToken, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate({
      path: 'items.coin',
      select: 'name price image'
    });
    
    if (!cart) {
      return res.json([]);
    }
    
    // Format response
    const cartItems = cart.items.map(item => ({
      _id: item.coin._id,
      name: item.coin.name,
      price: item.coin.price,
      image: item.coin.image,
      quantity: item.quantity
    }));
    
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/cart', authenticateToken, async (req, res) => {
  try {
    const { coinId } = req.body;
    
    let cart = await Cart.findOne({ user: req.user.id });
    
    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        items: [{ coin: coinId, quantity: 1 }]
      });
    } else {
      // Check if item exists
      const itemIndex = cart.items.findIndex(item => item.coin.toString() === coinId);
      
      if (itemIndex > -1) {
        // Increment quantity
        cart.items[itemIndex].quantity += 1;
      } else {
        // Add new item
        cart.items.push({ coin: coinId, quantity: 1 });
      }
      
      cart.updatedAt = Date.now();
    }
    
    await cart.save();
    
    // Return updated cart
    cart = await Cart.findOne({ user: req.user.id }).populate({
      path: 'items.coin',
      select: 'name price image'
    });
    
    // Format response
    const cartItems = cart.items.map(item => ({
      _id: item.coin._id,
      name: item.coin.name,
      price: item.coin.price,
      image: item.coin.image,
      quantity: item.quantity
    }));
    
    res.json(cartItems);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/cart/:coinId', authenticateToken, async (req, res) => {
  try {
    const { coinId } = req.params;
    const { quantity } = req.body;
    
    let cart = await Cart.findOne({ user: req.user.id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Update item quantity
    const itemIndex = cart.items.findIndex(item => item.coin.toString() === coinId);
    
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      cart.updatedAt = Date.now();
      await cart.save();
    } else {
      return res.status(404).json({ message: 'Item not in cart' });
    }
    
    // Return updated cart
    cart = await Cart.findOne({ user: req.user.id }).populate({
      path: 'items.coin',
      select: 'name price image'
    });
    
    // Format response
    const cartItems = cart.items.map(item => ({
      _id: item.coin._id,
      name: item.coin.name,
      price: item.coin.price,
      image: item.coin.image,
      quantity: item.quantity
    }));
    
    res.json(cartItems);
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/cart/:coinId', authenticateToken, async (req, res) => {
  try {
    const { coinId } = req.params;
    
    let cart = await Cart.findOne({ user: req.user.id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Remove item
    cart.items = cart.items.filter(item => item.coin.toString() !== coinId);
    cart.updatedAt = Date.now();
    await cart.save();
    
    // Return updated cart
    cart = await Cart.findOne({ user: req.user.id }).populate({
      path: 'items.coin',
      select: 'name price image'
    });
    
    // Format response
    const cartItems = cart.items.map(item => ({
      _id: item.coin._id,
      name: item.coin.name,
      price: item.coin.price,
      image: item.coin.image,
      quantity: item.quantity
    }));
    
    res.json(cartItems);
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/cart', authenticateToken, async (req, res) => {
  try {
    await Cart.findOneAndUpdate(
      { user: req.user.id },
      { $set: { items: [], updatedAt: Date.now() } }
    );
    
    res.json([]);
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Payment routes
app.post('/api/payment/create-order', authenticateToken, async (req, res) => {
  try {
    const { amount } = req.body;
    
    const options = {
      amount: amount * 100, // Razorpay uses amount in paise
      currency: 'INR',
      receipt: 'order_' + Date.now(),
    };
    
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/payment/verify', authenticateToken, async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    
    // In a real app, you would verify the payment signature here
    // For demo, we'll assume payment is valid
    
    // Create order from cart
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.coin');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    
    const orderItems = cart.items.map(item => ({
      coin: item.coin._id,
      price: item.coin.price,
      quantity: item.quantity
    }));
    
    const totalAmount = cart.items.reduce(
      (total, item) => total + item.coin.price * item.quantity, 
      0
    );
    
    const newOrder = new Order({
      user: req.user.id,
      coins: orderItems,
      totalAmount,
      paymentId: razorpay_payment_id,
      status: 'completed',
      shippingAddress: req.body.shippingAddress
    });
    
    await newOrder.save();
    
    // Clear cart
    await Cart.findOneAndUpdate(
      { user: req.user.id },
      { $set: { items: [], updatedAt: Date.now() } }
    );
    
    res.json({ success: true, order: newOrder });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Order routes
app.get('/api/orders', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('coins.coin')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
const startServer = async () => {
  try {
    // await connectDB(); // Uncomment for actual MongoDB connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

connectDB();
startServer();