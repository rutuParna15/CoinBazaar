import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FAQ: React.FC = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How do I know the coins are authentic?",
      answer: "Every coin listed on HeritageCoin undergoes a rigorous authentication process by our expert numismatists. We use advanced verification techniques and provide detailed documentation of authenticity for each piece."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept payments through Razorpay, which supports credit/debit cards, net banking, UPI, and various digital wallets. All transactions are secure and protected."
    },
    {
      question: "How is shipping handled?",
      answer: "All coins are insured during shipping and carefully packaged to ensure safe delivery. We use trusted courier services and provide tracking information for all shipments."
    },
    {
      question: "Can I sell my coins on HeritageCoin?",
      answer: "Yes! Registered users can list their coins for sale. Each listing will be reviewed by our team to ensure authenticity before being published on the marketplace."
    },
    {
      question: "What if I'm not satisfied with my purchase?",
      answer: "We offer a 14-day return policy for all purchases. The coin must be returned in its original condition and packaging. Refunds will be processed within 5-7 business days."
    },
    {
      question: "How do you determine coin prices?",
      answer: "Coin prices are determined based on factors including rarity, condition, historical significance, and market demand. Our expert team regularly reviews and updates pricing to reflect current market values."
    }
  ];

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

        <h1 className="text-3xl font-serif font-bold text-navy-800 mb-8">Frequently Asked Questions</h1>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-sm p-6 transition-all duration-200 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-navy-800 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;