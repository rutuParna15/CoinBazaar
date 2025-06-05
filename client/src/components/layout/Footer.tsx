import React from 'react';
import { Link } from 'react-router-dom';
import { Coins, Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Coins className="h-8 w-8 text-gold-500" />
              <span className="text-2xl font-serif font-bold">CoinBazaar</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Discover rare and valuable heritage coins from around the world. 
              Our marketplace connects collectors and sellers in a secure, trusted environment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-gold-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/invites/contact/?igsh=dkjv5b9g8ktl&utm_content=y0wy3f3" className="text-gray-300 hover:text-gold-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="mailto:vivekmore0404@gmail.com" className="text-gray-300 hover:text-gold-500 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-gold-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-gray-300 hover:text-gold-500 transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/sell" className="text-gray-300 hover:text-gold-500 transition-colors">
                  Sell Coins
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-gold-500 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Help & Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-gold-500 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-gold-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-300 hover:text-gold-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-gold-500 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} HeritageCoin Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;