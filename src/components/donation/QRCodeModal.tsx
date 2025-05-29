import React, { useState, useEffect } from 'react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
  merchantId: string;
  paymentDescription: string;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  amount,
  merchantId,
  paymentDescription
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  
  // QR code options
  const qrOptions = [
    { id: 'any-upi', name: 'Any UPI App', color: 'bg-blue-500' },
    { id: 'phonepe', name: 'PhonePe', color: 'bg-purple-500', icon: '/images/payment/phonepe.png' },
    { id: 'gpay', name: 'Google Pay', color: 'bg-green-500', icon: '/images/payment/googlepay.png' },
    { id: 'paytm', name: 'Paytm', color: 'bg-blue-400', icon: '/images/payment/paytm.png' },
  ];

  useEffect(() => {
    if (isOpen && merchantId) {
      const encodedMerchantId = encodeURIComponent(merchantId);
      const encodedDesc = encodeURIComponent(paymentDescription);
      
      // Generate QR code URL based on selected option
      // This uses a public API to generate QR codes
      const baseUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=`;
      let paymentData = '';

      switch (qrOptions[activeTab].id) {
        case 'phonepe':
          paymentData = `phonepe://pay?pa=${encodedMerchantId}&pn=KarunaForAll&am=${amount}&cu=INR&tn=${encodedDesc}`;
          break;
        case 'gpay':
          paymentData = `tez://upi/pay?pa=${encodedMerchantId}&pn=KarunaForAll&am=${amount}&cu=INR&tn=${encodedDesc}`;
          break;
        case 'paytm':
          paymentData = `paytmmp://pay?pa=${encodedMerchantId}&pn=KarunaForAll&am=${amount}&cu=INR&tn=${encodedDesc}`;
          break;
        case 'any-upi':
        default:
          paymentData = `upi://pay?pa=${encodedMerchantId}&pn=KarunaForAll&am=${amount}&cu=INR&tn=${encodedDesc}`;
          break;
      }

      setQrCodeUrl(`${baseUrl}${encodeURIComponent(paymentData)}`);
    }
  }, [isOpen, merchantId, paymentDescription, amount, activeTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 px-4 py-3 flex justify-between items-center">
          <h3 className="text-white font-bold text-lg">Scan & Pay ₹{amount}</h3>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* QR Tab Selection */}
        <div className="flex border-b">
          {qrOptions.map((option, index) => (
            <button
              key={option.id}
              onClick={() => setActiveTab(index)}
              className={`flex-1 py-3 text-sm font-medium text-center ${
                activeTab === index 
                  ? 'border-b-2 border-green-500 text-green-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {option.icon ? (
                <div className="flex flex-col items-center justify-center">
                  <div className="w-6 h-6 mb-1">
                    <img src={option.icon} alt={option.name} className="object-contain w-full h-full" />
                  </div>
                  <span>{option.name}</span>
                </div>
              ) : (
                option.name
              )}
            </button>
          ))}
        </div>

        {/* QR Code Display */}
        <div className="p-6 flex flex-col items-center">
          <div className="bg-white p-2 shadow-inner border rounded-lg mb-4">
            {qrCodeUrl ? (
              <img src={qrCodeUrl} alt="QR Code" width={200} height={200} />
            ) : (
              <div className="w-[200px] h-[200px] bg-gray-200 animate-pulse flex items-center justify-center">
                <span className="text-gray-500">Loading QR...</span>
              </div>
            )}
          </div>
          
          {/* Instructions */}
          <div className="text-center mb-2">
            <p className="text-lg font-bold text-gray-700">₹{amount}</p>
            <p className="text-xs text-gray-500 mt-1">UPI ID: {merchantId}</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg w-full">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">How to pay:</h4>
            <ol className="text-xs text-gray-600 space-y-1 list-decimal pl-4">
              <li>Open your {qrOptions[activeTab].name === 'Any UPI App' ? 'UPI app' : qrOptions[activeTab].name}</li>
              <li>Scan this QR code with your app's scanner</li>
              <li>Verify the amount and confirm payment</li>
              <li>After payment, click "I've Paid" button below</li>
            </ol>
          </div>

          {/* Payment Confirmation */}
          <div className="w-full mt-4 grid grid-cols-2 gap-3">
            <button 
              onClick={onClose}
              className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={onClose}
              className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              I've Paid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;