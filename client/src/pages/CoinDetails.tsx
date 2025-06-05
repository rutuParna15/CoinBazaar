import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { ArrowLeft, Shield, Award, Clock, Tag } from 'lucide-react';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import axios from 'axios'; // ✨ new

const CoinDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { cartItems, addToCart } = useCart();
  
  const [coin, setCoin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/coins/${id}`);
        setCoin(response.data);
        setIsInCart(Array.isArray(cartItems) && cartItems.some(item => item._id === id));
      } catch (err) {
        console.error('Error fetching coin:', err);
        setError('Failed to load coin details');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) fetchCoinDetails();
  }, [id, cartItems]);

  const handleAddToCart = () => {
    if (coin) {
      addToCart(coin);
      setIsInCart(true);
    }
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    if (coin && !isInCart) {
      addToCart(coin);
    }
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !coin) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold text-navy-800 mb-4">Coin Not Found</h2>
            <p className="text-gray-600 mb-6">
              The coin you're looking for doesn't exist or has been removed.
            </p>
            <Button 
              variant="primary" 
              onClick={() => navigate('/marketplace')}
            >
              Back to Marketplace
            </Button>
          </div>
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
          <span>Back to Marketplace</span>
        </button>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Coin Images */}
            <div className="p-6 lg:p-8">
              <div className="rounded-xl overflow-hidden mb-6">
                <img 
                  src={coin.image} 
                  alt={coin.name} 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Coin Details */}
            <div className="p-6 lg:p-8">
              <h1 className="text-3xl font-serif font-bold text-navy-800 mb-2">
                {coin.name}
              </h1>

              <div className="flex flex-wrap gap-2 mb-4">
                {coin.type && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-silver-100 text-navy-700">
                    {coin.type}
                  </span>
                )}
                {coin.age && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-copper-100 text-copper-700">
                    {coin.age} years old
                  </span>
                )}
                {coin.condition && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-navy-100 text-navy-700">
                    {coin.condition}
                  </span>
                )}
              </div>

              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-navy-800">
                  ${coin.price?.toLocaleString()}
                </span>
                {coin.certification && (
                  <span className="ml-4 flex items-center text-green-700 bg-green-50 px-3 py-1 rounded-full text-sm">
                    <Shield className="w-4 h-4 mr-1" />
                    {coin.certification}
                  </span>
                )}
              </div>

              <div className="border-t border-b border-gray-200 py-6 mb-6">
                <p className="text-gray-700 mb-4">
                  {coin.description}
                </p>
              </div>

              {/* Coin Specifications */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-navy-800 mb-4">
                  Coin Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {coin.material && (
                    <div className="flex items-center">
                      <Award className="w-5 h-5 text-gold-500 mr-2" />
                      <div>
                        <span className="text-sm text-gray-500">Material</span>
                        <p className="font-medium">{coin.material}</p>
                      </div>
                    </div>
                  )}
                  {coin.age && (
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-gold-500 mr-2" />
                      <div>
                        <span className="text-sm text-gray-500">Age</span>
                        <p className="font-medium">{coin.age} years</p>
                      </div>
                    </div>
                  )}
                  {coin.diameter && (
                    <div className="flex items-center">
                      <Tag className="w-5 h-5 text-gold-500 mr-2" />
                      <div>
                        <span className="text-sm text-gray-500">Diameter</span>
                        <p className="font-medium">{coin.diameter}</p>
                      </div>
                    </div>
                  )}
                  {coin.weight && (
                    <div className="flex items-center">
                      <Tag className="w-5 h-5 text-gold-500 mr-2" />
                      <div>
                        <span className="text-sm text-gray-500">Weight</span>
                        <p className="font-medium">{coin.weight}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Seller Info */}
              {coin.seller && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-navy-800 mb-4">
                    Seller Information
                  </h3>
                  <div className="flex items-center">
                    <div className="bg-navy-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <span className="text-navy-800 font-bold">
                        {coin.seller.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{coin.seller.name}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated && (
                  <Button 
                    variant={isInCart ? "secondary" : "outline"} 
                    onClick={handleAddToCart}
                    disabled={isInCart}
                    className="flex-1"
                  >
                    {isInCart ? 'Added to Cart' : 'Add to Cart'}
                  </Button>
                )}
                <Button 
                  variant="primary" 
                  onClick={handleBuyNow}
                  className="flex-1"
                >
                  Buy Now
                </Button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CoinDetails;
