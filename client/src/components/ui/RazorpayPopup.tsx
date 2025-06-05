import React, { useState } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

interface RazorpayPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  amount: number;
}

const RazorpayPopup: React.FC<RazorpayPopupProps> = ({ isOpen, onClose, onComplete, amount }) => {
  const [activeTab, setActiveTab] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [upiId, setUpiId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl mx-4 overflow-hidden">
        <div className="flex">
          {/* Left Panel */}
          <div className="w-1/3 bg-blue-600 p-6 text-white">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-2">CoinBazaar</h3>
              <div className="text-sm opacity-80">Secured by Razorpay</div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm opacity-80">Price Summary</div>
                <div className="text-2xl font-bold">₹{amount.toFixed(2)}</div>
              </div>
              
              <div>
                <div className="text-sm opacity-80">Using as</div>
                {/* <div className="text-base">+91 ●●●● ●●●●●</div> */}
                <div className="text-base">+91 XXXXX XXXXX</div>
              </div>
            </div>

            <div className="mt-auto pt-8">
              <img 
                src="https://cdn.iconscout.com/icon/free/png-512/free-razorpay-logo-icon-download-in-svg-png-gif-file-formats--payment-gateway-brand-logos-icons-1399875.png?f=webp&w=512"
                alt="Payment secure"
                className="w-full max-w-[200px] mx-auto "
              />
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Payment Options</h3>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <div className="flex gap-4 mb-6">
              <button
                className={`flex-1 p-4 text-left rounded-lg border ${
                  activeTab === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setActiveTab('upi')}
              >
                <div className="font-medium mb-1">UPI</div>
                <div className="flex gap-2">
                  <img src="https://cdn.iconscout.com/icon/free/png-512/free-google-pay-logo-icon-download-in-svg-png-gif-file-formats--gpay-payment-money-pack-logos-icons-1721670.png?f=webp&w=512" alt="GPay" className="h-6" />
                  <img src="https://w7.pngwing.com/pngs/332/615/png-transparent-phonepe-india-unified-payments-interface-india-purple-violet-text-thumbnail.png" alt="PhonePe" className="h-6" />
                </div>
              </button>

              <button
                className={`flex-1 p-4 text-left rounded-lg border ${
                  activeTab === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setActiveTab('card')}
              >
                <div className="font-medium mb-1">Cards</div>
                <div className="flex gap-2">
                  <img src="https://cdn.iconscout.com/icon/free/png-512/free-visa-logo-icon-download-in-svg-png-gif-file-formats--online-payment-brand-logos-pack-icons-226460.png?f=webp&w=512" alt="Visa" className="h-6" />
                  <img src="https://cdn.iconscout.com/icon/free/png-512/free-mastercard-icon-download-in-svg-png-gif-file-formats--logo-social-media-pack-logos-icons-1912006.png?f=webp&w=512" alt="Mastercard" className="h-6" />
                </div>
              </button>
            </div>

            {activeTab === 'upi' && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="username@upi"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Pay ₹{amount.toFixed(2)}
                </Button>
              </form>
            )}

            {activeTab === 'card' && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="XXXX XXXX XXXX XXXX"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="password"
                      maxLength={3}
                      placeholder="•••"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder=""
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="save-card"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="save-card" className="ml-2 block text-sm text-gray-700">
                    Save this card as per RBI guidelines
                  </label>
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Pay ₹{amount.toFixed(2)}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RazorpayPopup;