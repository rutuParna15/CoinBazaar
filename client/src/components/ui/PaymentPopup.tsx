import React from 'react';
import { X } from 'lucide-react';
import Button from './Button';

interface PaymentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPayment: (method: 'razorpay' | 'cod') => void;
}

const PaymentPopup: React.FC<PaymentPopupProps> = ({ isOpen, onClose, onSelectPayment }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-navy-800">Select Payment Method</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => onSelectPayment('razorpay')}
            className="w-full p-4 border rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between"
          >
            <div>
              <h4 className="font-medium text-navy-800">Razorpay UPI</h4>
              <p className="text-sm text-gray-500">Pay securely using UPI</p>
            </div>
            <div className="w-6 h-6 border-2 rounded-full"></div>
          </button>

          <button
            onClick={() => onSelectPayment('cod')}
            className="w-full p-4 border rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between"
          >
            <div>
              <h4 className="font-medium text-navy-800">Pay on Delivery</h4>
              <p className="text-sm text-gray-500">Pay when you receive your coins</p>
            </div>
            <div className="w-6 h-6 border-2 rounded-full"></div>
          </button>
        </div>

        <Button
          variant="outline"
          className="w-full mt-6"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default PaymentPopup;