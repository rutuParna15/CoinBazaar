import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsOfService: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-navy-700 hover:text-navy-800 mb-6 group"
        >
          <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
          <span>Back</span>
        </button>

        <h1 className="text-3xl font-serif font-bold text-navy-800 mb-8">Terms of Service</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-navy-800 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-600 mb-6">
              By accessing and using HeritageCoin, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>

            <h2 className="text-2xl font-semibold text-navy-800 mb-4">User Accounts</h2>
            <p className="text-gray-600 mb-6">
              You must create an account to use certain features of our service. You are responsible for maintaining the confidentiality of your account information and for all activities under your account.
            </p>

            <h2 className="text-2xl font-semibold text-navy-800 mb-4">Buying and Selling</h2>
            <p className="text-gray-600 mb-6">
              All listings must be accurate and truthful. Sellers are responsible for the authenticity of their coins. Buyers must complete payment for purchased items within the specified timeframe.
            </p>

            <h2 className="text-2xl font-semibold text-navy-800 mb-4">Prohibited Activities</h2>
            <p className="text-gray-600 mb-6">
              Users may not engage in fraudulent activities, manipulate prices, or list counterfeit items. Violation of these terms may result in account termination.
            </p>

            <h2 className="text-2xl font-semibold text-navy-800 mb-4">Dispute Resolution</h2>
            <p className="text-gray-600 mb-6">
              Any disputes between users will be handled through our dispute resolution process. We reserve the right to make final decisions on all disputes.
            </p>

            <h2 className="text-2xl font-semibold text-navy-800 mb-4">Limitation of Liability</h2>
            <p className="text-gray-600">
              HeritageCoin is not liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;