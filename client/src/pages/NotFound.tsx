import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Coins } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Coins className="h-16 w-16 text-gold-500" />
        </div>
        <h1 className="text-6xl font-serif font-bold text-navy-800 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-navy-700 mb-6">Page Not Found</h2>
        <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
          <Button 
            variant="primary" 
            onClick={() => navigate('/')}
          >
            Go to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;