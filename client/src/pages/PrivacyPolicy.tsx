import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
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

        <h1 className="text-3xl font-serif font-bold text-navy-800 mb-8">Privacy Policy</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-navy-800 mb-4">Information We Collect</h2>
            <p className="text-gray-600 mb-6">
              We collect information you provide directly to us, including name, email address, and transaction data. We also automatically collect certain information about your device when you use our services.
            </p>

            <h2 className="text-2xl font-semibold text-navy-800 mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 mb-6">
              We use the information we collect to provide, maintain, and improve our services, process your transactions, and communicate with you about your account and updates to our services.
            </p>

            <h2 className="text-2xl font-semibold text-navy-800 mb-4">Information Sharing</h2>
            <p className="text-gray-600 mb-6">
              We do not sell or share your personal information with third parties except as necessary to provide our services or as required by law.
            </p>

            <h2 className="text-2xl font-semibold text-navy-800 mb-4">Data Security</h2>
            <p className="text-gray-600 mb-6">
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or destruction.
            </p>

            <h2 className="text-2xl font-semibold text-navy-800 mb-4">Your Rights</h2>
            <p className="text-gray-600 mb-6">
              You have the right to access, correct, or delete your personal information. Contact us to exercise these rights or if you have questions about our privacy practices.
            </p>

            <h2 className="text-2xl font-semibold text-navy-800 mb-4">Updates to This Policy</h2>
            <p className="text-gray-600">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;