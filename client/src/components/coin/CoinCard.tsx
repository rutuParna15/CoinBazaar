import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import Button from '../ui/Button';

interface CoinProps {
  _id: string;
  name: string;
  type: string;
  age: number;
  price: number;
  description: string;
  image: string;
}

const CoinCard: React.FC<{ coin: CoinProps }> = ({ coin }) => {
  const { isAuthenticated } = useAuth();
  const { addToCart, cartItems } = useCart();
  
  // const isInCart = cartItems.some(item => item._id === coin._id);
  const isInCart = Array.isArray(cartItems) && cartItems.some(item => item._id === coin._id);

  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(coin);
  };
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-coin transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 animate-fade-in">
      <Link to={`/coin/${coin._id}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={coin.image} 
            alt={coin.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute bottom-0 right-0 bg-gold-500 text-navy-900 font-bold px-3 py-1 rounded-tl-lg">
          ₹{coin.price.toLocaleString()}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-serif text-lg font-semibold text-navy-800 line-clamp-2">{coin.name}</h3>
          </div>
          
          <div className="flex justify-between mb-3">
            <span className="text-sm bg-silver-100 text-navy-700 px-2 py-1 rounded-full">
              {coin.type}
            </span>
            <span className="text-sm bg-copper-100 text-copper-700 px-2 py-1 rounded-full">
              {coin.age} years old
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{coin.description}</p>
          
          <div className="flex gap-2">
            {isAuthenticated && (
              <Button 
                variant={isInCart ? "secondary" : "outline"} 
                size="sm" 
                className="w-full"
                onClick={handleAddToCart}
                disabled={isInCart}
              >
                {isInCart ? 'In Cart' : 'Add to Cart'}
              </Button>
            )}
            <Button 
              variant="primary" 
              size="sm" 
              className="w-full"
            >
              View Details
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CoinCard;