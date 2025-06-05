import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (coin: any) => void;
  removeFromCart: (coinId: string) => void;
  clearCart: () => void;
  updateQuantity: (coinId: string, quantity: number) => void;
  loading: boolean;
  error: string | null;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  updateQuantity: () => {},
  loading: false,
  error: null,
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, user } = useAuth();

  // Fetch cart items when user authenticates
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchCartItems();
    } else {
      // Clear cart when user logs out
      setCartItems([]);
    }
  }, [isAuthenticated, user]);

  const fetchCartItems = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('http://localhost:5000/api/cart');
      setCartItems(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch cart items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (coin: any) => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('http://localhost:5000/api/cart', { coinId: coin._id });
      setCartItems(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add item to cart');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (coinId: string) => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.delete(`http://localhost:5000/api/cart/${coinId}`);
      setCartItems(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to remove item from cart');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (coinId: string, quantity: number) => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.put(`http://localhost:5000/api/cart/${coinId}`, { quantity });
      setCartItems(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update quantity');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await axios.delete('http://localhost:5000/api/cart');
      setCartItems([]);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to clear cart');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        loading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};