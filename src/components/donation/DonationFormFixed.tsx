import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '../common/Button';
import Image from 'next/image';
import QRCodeModal from './QRCodeModal';

type PaymentMethod = 'upi' | 'phonepe' | 'gpay' | 'paytm' | 'qr' | 'netbanking';
type DonationType = 'one-time' | 'monthly';

interface ActivePaymentMethod {
  id: string;
  name: string;
  type: PaymentMethod;
  upiId: string;
  active: boolean;
  published: boolean;
}

const DonationForm: React.FC = () => {
  const router = useRouter();
  const [donationType, setDonationType] = useState<DonationType>('one-time');
  const [amount, setAmount] = useState<string>('1000');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [pincode, setPincode] = useState<string>('');
  const [pancard, setPancard] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('phonepe');
  const [loading, setLoading] = useState<boolean>(false);
  const [showQRModal, setShowQRModal] = useState<boolean>(false);
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  
  // Payment methods state
  const [activePaymentMethods, setActivePaymentMethods] = useState<ActivePaymentMethod[]>([]);
  const [paymentMethodsLoading, setPaymentMethodsLoading] = useState<boolean>(true);

  // Fallback payment methods when admin settings are not available
  const fallbackPaymentMethods: { type: PaymentMethod; name: string; upiId: string }[] = [
    { type: 'upi', name: 'UPI', upiId: process.env.NEXT_PUBLIC_UPI || 'karunaforall@hdfcbank' },
    { type: 'phonepe', name: 'PhonePe', upiId: process.env.NEXT_PUBLIC_UPI || 'karunaforall@hdfcbank' },
    { type: 'gpay', name: 'Google Pay', upiId: process.env.NEXT_PUBLIC_UPI || 'karunaforall@hdfcbank' },
    { type: 'paytm', name: 'Paytm', upiId: process.env.NEXT_PUBLIC_UPI || 'karunaforall@hdfcbank' },
    { type: 'netbanking', name: 'Net Banking', upiId: process.env.NEXT_PUBLIC_UPI || 'karunaforall@hdfcbank' },
    { type: 'qr', name: 'QR Code', upiId: process.env.NEXT_PUBLIC_UPI || 'karunaforall@hdfcbank' }
  ];

  // Single UPI ID used for all payment options (fallback)
  const merchantId = process.env.NEXT_PUBLIC_UPI || 'karunaforall@hdfcbank';

  // Detect device type
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Check if the user is on a mobile device
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    // Load active payment methods from admin settings
    loadActivePaymentMethods();
  }, []);

  const loadActivePaymentMethods = async () => {
    try {
      const response = await fetch('/api/active-payment-methods');
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data && result.data.length > 0) {
          setActivePaymentMethods(result.data);
          // Set the first available payment method as default
          setPaymentMethod(result.data[0].type);
        } else {
          // Use fallback methods if no active methods found
          console.log('No active payment methods found, using fallback methods');
          setActivePaymentMethods([]);
        }
      } else {
        console.log('Failed to fetch active payment methods, using fallback');
        setActivePaymentMethods([]);
      }
    } catch (error) {
      console.error('Error loading active payment methods:', error);
      setActivePaymentMethods([]);
    } finally {
      setPaymentMethodsLoading(false);
    }
  };

  // Get available payment methods (admin configured or fallback)
  const getAvailablePaymentMethods = () => {
    if (activePaymentMethods.length > 0) {
      return activePaymentMethods.map(method => ({
        type: method.type,
        name: method.name,
        upiId: method.upiId
      }));
    }
    return fallbackPaymentMethods;
  };

  // Get UPI ID for selected payment method
  const getUpiIdForPaymentMethod = (method: PaymentMethod) => {
    const availableMethods = getAvailablePaymentMethods();
    const selectedMethod = availableMethods.find(m => m.type === method);
    return selectedMethod?.upiId || merchantId;
  };

  // Predefined donation amounts
  const predefinedAmounts = [
    { value: '500', label: '₹500' },
    { value: '1000', label: '₹1,000' },
    { value: '2500', label: '₹2,500' },
    { value: '5000', label: '₹5,000' },
    { value: 'custom', label: 'Other Amount' }
  ];

  // Get final donation amount
  const getFinalAmount = () => {
    return amount === 'custom' ? customAmount : amount;
  };

  // Handle payment based on method
  const handleDirectPaymentApp = (method: PaymentMethod) => {
    const finalAmount = getFinalAmount();
    if (!finalAmount || !firstName || !phone || !email) {
      alert('Please fill all required fields before making a payment');
      return;
    }

    if (!agreeToTerms) {
      alert('Please agree to receive updates and tax receipts');
      return;
    }

    setLoading(true);

    // Create payment description
    const paymentDescription = `Donation to Paws & Care - ${firstName} ${lastName}`;

    try {
      // Show QR modal for QR option
      if (method === 'qr') {
        setLoading(false);
        setShowQRModal(true);
        return;
      }

      // Only create payment links on mobile
      if (isMobile) {
        let paymentLink = '';

        switch (method) {
          case 'phonepe':
            paymentLink = `phonepe://pay?pa=${encodeURIComponent(getUpiIdForPaymentMethod('phonepe'))}&pn=PawsAndCare&am=${finalAmount}&cu=INR&tn=${encodeURIComponent(paymentDescription)}`;
            break;

          case 'gpay':
            paymentLink = `tez://upi/pay?pa=${encodeURIComponent(getUpiIdForPaymentMethod('gpay'))}&pn=PawsAndCare&am=${finalAmount}&cu=INR&tn=${encodeURIComponent(paymentDescription)}`;
            break;

          case 'paytm':
            paymentLink = `paytmmp://pay?pa=${encodeURIComponent(getUpiIdForPaymentMethod('paytm'))}&pn=PawsAndCare&am=${finalAmount}&cu=INR&tn=${encodeURIComponent(paymentDescription)}`;
            break;
            
        }

        if (paymentLink) {
          // Save donation info temporarily
          const donationInfo = {
            amount: finalAmount,
            name: `${firstName} ${lastName}`,
            phone,
            email,
            pancard,
            paymentMethod: method,
            timestamp: new Date().toISOString(),
            donationType
          };

          localStorage.setItem('pendingDonation', JSON.stringify(donationInfo));

          // Try to open the payment app
          window.location.href = paymentLink;

          // Fallback: redirect to thank you page after a delay
          setTimeout(() => {
            setLoading(false);
            router.push('/thank-you');
          }, 3000);
        }
      } else {
        // Desktop: Show QR code
        setLoading(false);
        setShowQRModal(true);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setLoading(false);
      alert('There was a problem processing your donation. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalAmount = getFinalAmount();
    
    if (!finalAmount || !firstName || !phone || !email) {
      alert('Please fill all required fields');
      return;
    }

    if (!agreeToTerms) {
      alert('Please agree to receive updates and tax receipts');
      return;
    }

    setLoading(true);

    try {
      const donationData = {
        amount: finalAmount,
        firstName,
        lastName,
        phone,
        email,
        address,
        city,
        state,
        pincode,
        pancard,
        paymentMethod,
        donationType,
        timestamp: new Date().toISOString()
      };

      // Save to localStorage
      localStorage.setItem('donationData', JSON.stringify(donationData));

      // Redirect to payment
      handleDirectPaymentApp(paymentMethod);
    } catch (error) {
      console.error('Submission error:', error);
      setLoading(false);
      alert('There was a problem processing your donation. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Make a Donation</h2>
        <p className="text-gray-600">Your support makes a real difference in animals' lives</p>
      </div>

      {/* 80G Tax benefit banner */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-medium text-green-800">Tax Benefits under Section 80G</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Donation Type Toggle */}
        <div className="mb-6">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                donationType === 'one-time'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setDonationType('one-time')}
            >
              One-time
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                donationType === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setDonationType('monthly')}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Donation amounts */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-3">Choose Amount</label>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {predefinedAmounts.map(presetAmount => (
              <button
                key={presetAmount.value}
                type="button"
                className={`py-3 px-4 rounded-lg font-medium transition-all ${
                  amount === presetAmount.value
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
                onClick={() => setAmount(presetAmount.value)}
              >
                {presetAmount.label}
              </button>
            ))}
          </div>
          
          {amount === 'custom' && (
            <div>
              <label className="block text-gray-700 text-sm mb-1">Custom Amount (₹)</label>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                min="100"
                step="1"
                placeholder="Enter amount"
                required
              />
            </div>
          )}
        </div>

        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-800">Personal Information</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="firstName" className="block text-gray-700 font-medium mb-1 text-sm">First Name *</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700 font-medium mb-1 text-sm">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1 text-sm">Email *</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-1 text-sm">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-gray-700 font-medium mb-1 text-sm">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Street address"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="city" className="block text-gray-700 font-medium mb-1 text-sm">City</label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-gray-700 font-medium mb-1 text-sm">State</label>
              <input
                type="text"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="pincode" className="block text-gray-700 font-medium mb-1 text-sm">Pincode</label>
              <input
                type="text"
                id="pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="pancard" className="block text-gray-700 font-medium mb-1 text-sm">
              PAN Card Number <span className="text-gray-500 font-normal">(For 80G tax benefit)</span>
            </label>
            <input
              type="text"
              id="pancard"
              value={pancard}
              onChange={(e) => setPancard(e.target.value)}
              placeholder="ABCDE1234F"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Payment Method Selection */}
        <div>
          <label className="block text-gray-700 font-medium mb-3 text-sm">Select Payment Method</label>
          {paymentMethodsLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Loading payment methods...</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {getAvailablePaymentMethods().map(method => (
                <button
                  key={method.type}
                  type="button"
                  className={`rounded-lg flex items-center justify-center py-3 h-14 border-2 transition-colors ${
                    paymentMethod === method.type ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod(method.type)}
                >
                  <span className="font-medium">{method.name}</span>
                </button>
              ))}
            </div>
          )}
          
          {/* Display UPI ID */}
          <div className="text-center mt-2">
            <p className="text-xs text-gray-500">UPI ID: <span className="font-medium">{getUpiIdForPaymentMethod(paymentMethod)}</span></p>
            {activePaymentMethods.length === 0 && (
              <p className="text-xs text-orange-600 mt-1">Using fallback payment methods (Admin settings not configured)</p>
            )}
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="agreeToTerms"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            className="mt-1"
            required
          />
          <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
            I agree to receive updates about my donation and tax receipts via email/SMS
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="button"
          onClick={() => handleDirectPaymentApp(paymentMethod)}
          disabled={loading || !firstName || !phone || !email || !agreeToTerms}
          variant="primary"
          fullWidth
          className="py-4 text-lg font-bold rounded-lg"
        >
          {loading ? 'Processing...' : `Donate ₹${getFinalAmount()}`}
        </Button>

        {/* Trust elements */}
        <div className="text-center mt-4 space-y-2">
          <div className="flex items-center justify-center gap-4 text-gray-600">
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-xs">Secure Payment</span>
            </div>
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs">Tax Deductible</span>
            </div>
          </div>
          
          <div className="text-xs text-gray-500">
            <p>Registered NGO | 80G Tax Benefits Available</p>
          </div>
        </div>
      </form>

      {/* QR Code Modal */}
      <QRCodeModal 
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        amount={getFinalAmount()}
        merchantId={merchantId}
        paymentDescription={`Donation to Paws & Care - ${firstName} ${lastName}`}
      />
    </div>
  );
};

export default DonationForm;