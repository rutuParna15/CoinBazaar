import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import PaymentPopup from '../components/ui/PaymentPopup';
import RazorpayPopup from '../components/ui/RazorpayPopup';


interface AddressForm {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, loading } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);
  const [isRazorpayPopupOpen, setIsRazorpayPopupOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [address, setAddress] = useState<AddressForm>({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleQuantityChange = (coinId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(coinId, newQuantity);
    }
  };

  const handleRemoveItem = (coinId: string) => {
    removeFromCart(coinId);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = () => {
    // Validate address fields
    if (!address.street || !address.city || !address.state || !address.postalCode || !address.country) {
      alert('Please fill in all address fields');
      return;
    }
    setIsPaymentPopupOpen(true);
  };

  const handlePaymentSelection = async (method: 'razorpay' | 'cod') => {
    setIsPaymentPopupOpen(false);
    
    if (method === 'razorpay') {
      setIsRazorpayPopupOpen(true);
    } else {
      setCheckoutLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPaymentSuccess(true);
      clearCart();
      setCheckoutLoading(false);
    }
  };

  const handleRazorpayComplete = async () => {
    setIsRazorpayPopupOpen(false);
    setCheckoutLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setPaymentSuccess(true);
    clearCart();
    setCheckoutLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl p-8 shadow-sm text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-serif font-bold text-navy-800 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Your order has been placed successfully. You can view your purchase history in your dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              onClick={() => navigate('/marketplace')}
              className="flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Continue Shopping
            </Button>
            <Button 
              variant="primary" 
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl p-8 shadow-sm text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-navy-800 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any coins to your cart yet.
          </p>
          <Button 
            variant="primary" 
            onClick={() => navigate('/marketplace')}
          >
            Browse Marketplace
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button 
          onClick={() => navigate('/marketplace')}
          className="flex items-center text-navy-700 hover:text-navy-800 mb-6 group"
        >
          <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
          <span>Continue Shopping</span>
        </button>
        
        <h1 className="text-3xl font-serif font-bold text-navy-800 mb-8">Your Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item._id} className="p-6 flex flex-col sm:flex-row gap-4">
                    {/* Item Image */}
                    <div className="sm:w-1/4">
                      <div className="rounded-lg overflow-hidden h-24 sm:h-32">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          onClick={() => navigate(`/coin/${item._id}`)}
                          style={{ cursor: 'pointer' }}
                        />
                      </div>
                    </div>
                    
                    {/* Item Details */}
                    <div className="sm:w-3/4 flex flex-col sm:flex-row justify-between">
                      <div className="mb-4 sm:mb-0">
                        <h3 
                          className="text-lg font-medium text-navy-800 mb-1 hover:text-navy-600 cursor-pointer"
                          onClick={() => navigate(`/coin/${item._id}`)}
                        >
                          {item.name}
                        </h3>
                        <div className="flex gap-2 mb-2">
                          {item.type && (
                            <span className="text-sm bg-silver-100 text-navy-700 px-2 py-1 rounded-full">
                              {item.type}
                            </span>
                          )}
                        </div>
                        <div className="text-navy-800 font-bold">
                        ₹{item.price.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="flex items-end justify-between sm:flex-col sm:items-end">
                        {/* Quantity */}
                        <div className="flex items-center">
                          <button 
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="mx-3 w-6 text-center">{item.quantity}</span>
                          <button 
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        
                        {/* Remove Button */}
                        <button 
                          className="text-red-500 hover:text-red-700 flex items-center mt-3"
                          onClick={() => handleRemoveItem(item._id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold text-navy-800 mb-6 pb-4 border-b border-gray-200">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{calculateSubtotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Insurance</span>
                  <span className="font-medium">₹{(calculateSubtotal() * 0.01).toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="font-bold text-navy-800">Total</span>
                    <span className="font-bold text-navy-800">
                    ₹{(calculateSubtotal() * 1.01).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Shipping Address */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="font-medium text-navy-800 mb-2">Shipping Address</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Street Address</label>
                    <input
                      type="text"
                      name="street"
                      value={address.street}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={address.city}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">State</label>
                      <input
                        type="text"
                        name="state"
                        value={address.state}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
                        placeholder=""
                      />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={address.postalCode}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={address.country}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
                      placeholder="India"
                    />
                  </div>
                </div>
              </div>
              
              {/* Checkout Button */}
              <Button 
                variant="primary" 
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="w-full"
              >
                {checkoutLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div>
                    Processing...
                  </div>
                ) : 'Proceed to Payment'}
              </Button>
              
              <div className="mt-4 text-center text-sm text-gray-500">
                <p>Secured payment via Razorpay</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PaymentPopup
        isOpen={isPaymentPopupOpen}
        onClose={() => setIsPaymentPopupOpen(false)}
        onSelectPayment={handlePaymentSelection}
      />
       <RazorpayPopup
        isOpen={isRazorpayPopupOpen}
        onClose={() => setIsRazorpayPopupOpen(false)}
        onComplete={handleRazorpayComplete}
        amount={calculateSubtotal() * 1.01}
      />
    </div>
  );
};

export default Cart;