import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { ShoppingCart, Menu, X, LogOut, LayoutDashboard, Home, Coins, PlusCircle } from 'lucide-react';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Coins className="h-8 w-8 text-gold-500" />
          <span className="text-2xl font-serif font-bold text-navy-800">CoinBazaar</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/marketplace" className="text-gray-700 hover:text-navy-600 font-medium">
            Marketplace
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/sell" className="text-gray-700 hover:text-navy-600 font-medium">
                Sell Coins
              </Link>
              <Link to="/dashboard" className="text-gray-700 hover:text-navy-600 font-medium">
                Dashboard
              </Link>
              <div className="relative">
                <Link to="/cart" className="text-gray-700 hover:text-navy-600">
                  <ShoppingCart className="h-6 w-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gold-500 text-navy-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </div>
              <div className="flex items-center gap-3">
                {user?.picture ? (
                  <img 
                    src={user.picture} 
                    alt={user.name} 
                    className="h-8 w-8 rounded-full object-cover" 
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-navy-500 text-white flex items-center justify-center">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center gap-1"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <Button 
              variant="primary" 
              onClick={() => navigate('/auth')}
            >
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden text-gray-700"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 px-4 py-2 bg-white rounded-lg shadow-lg absolute z-10 left-4 right-4 animate-fade-in">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/marketplace" 
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={18} />
              <span>Marketplace</span>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/sell" 
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <PlusCircle size={18} />
                  <span>Sell Coins</span>
                </Link>
                <Link 
                  to="/dashboard"
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  to="/cart"
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart size={18} />
                  <span>Cart</span>
                  {cartItems.length > 0 && (
                    <span className="ml-auto bg-gold-500 text-navy-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex items-center gap-2 p-2">
                    {user?.picture ? (
                      <img 
                        src={user.picture} 
                        alt={user.name} 
                        className="h-8 w-8 rounded-full object-cover" 
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-navy-500 text-white flex items-center justify-center">
                        {user?.name?.charAt(0) || 'U'}
                      </div>
                    )}
                    <span className="font-medium">{user?.name}</span>
                  </div>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <Button 
                variant="primary" 
                onClick={() => {
                  navigate('/auth');
                  setIsMenuOpen(false);
                }}
                className="mt-2"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;