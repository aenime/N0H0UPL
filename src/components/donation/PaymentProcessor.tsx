import React, { useState } from 'react';
import Button from '../common/Button';

type PaymentProcessorProps = {
  amount: string;
  onSuccess: (transactionId: string) => void;
  onError: (error: Error) => void;
};

const PaymentProcessor: React.FC<PaymentProcessorProps> = ({ amount, onSuccess, onError }) => {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');
  const [processing, setProcessing] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // In a real app, this would connect to Stripe, PayPal, or another payment processor
      // For demo purposes, we'll simulate a successful payment after a short delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a fake transaction ID
      const transactionId = `TXN-${Math.random().toString(36).substr(2, 9)}`;
      onSuccess(transactionId);
    } catch (error) {
      onError(error instanceof Error ? error : new Error('Payment processing failed'));
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="cardName" className="block text-gray-700 text-sm font-medium mb-1">
            Name on Card
          </label>
          <input
            type="text"
            id="cardName"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="John Doe"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-medium mb-1">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/[^0-9]/g, ''))}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="1234 5678 9012 3456"
            maxLength={16}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="expiryDate" className="block text-gray-700 text-sm font-medium mb-1">
              Expiry Date (MM/YY)
            </label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="MM/YY"
              maxLength={5}
              required
            />
          </div>
          
          <div>
            <label htmlFor="cvv" className="block text-gray-700 text-sm font-medium mb-1">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="123"
              maxLength={3}
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={processing}
          variant="primary"
          fullWidth
        >
          {processing ? 'Processing...' : `Pay $${amount}`}
        </Button>
        
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>This is a demo payment form. No actual charges will be made.</p>
        </div>
      </form>
    </div>
  );
};

export default PaymentProcessor;