import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Button from '../common/Button';
import Image from 'next/image';
import QRCodeModal from './QRCodeModal';

type PaymentMethod = 'upi' | 'phonepe' | 'gpay' | 'paytm' | 'qr' | 'netbanking';

const DonationForm: React.FC = () => {
  const router = useRouter();
  const [amount, setAmount] = useState<string>('1000');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pancard, setPancard] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('phonepe');
  const [loading, setLoading] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [showQRModal, setShowQRModal] = useState<boolean>(false);

  // Single UPI ID used for all payment options
  const merchantId = process.env.NEXT_PUBLIC_UPI || 'karunaforall@hdfcbank';

  // Detect device type
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Check if the user is on a mobile device
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  // Common donation amounts in India
  const predefinedAmounts = ['500', '1000', '2100', '5100'];

  // Slider images with memoization to improve performance
  const sliderImages = useMemo(() => [
    { src: '/images/animals/injured/injured-dog1.jpg', alt: 'Injured street dog needing help' },
    { src: '/images/animals/injured/injured-cat1.jpg', alt: 'Injured cat needing medical care' },
    { src: '/images/animals/injured/injured-cow1.jpg', alt: 'Injured cow requiring treatment' },
  ], []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  // Handle payment based on method
  const handleDirectPaymentApp = (method: PaymentMethod) => {
    if (!amount || !name || !phone) {
      alert('Please fill all required fields before making a payment');
      return;
    }

    setLoading(true);

    // Create payment description
    const paymentDescription = `Donation to Karuna For All - ${name}`;

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
            paymentLink = `phonepe://pay?pa=${encodeURIComponent(merchantId)}&pn=KarunaForAll&am=${amount}&cu=INR&tn=${encodeURIComponent(paymentDescription)}`;
            break;

          case 'gpay':
            paymentLink = `tez://upi/pay?pa=${encodeURIComponent(merchantId)}&pn=KarunaForAll&am=${amount}&cu=INR&tn=${encodeURIComponent(paymentDescription)}`;
            break;

          case 'paytm':
            paymentLink = `paytmmp://pay?pa=${encodeURIComponent(merchantId)}&pn=KarunaForAll&am=${amount}&cu=INR&tn=${encodeURIComponent(paymentDescription)}`;
            break;

          case 'upi':
            paymentLink = `upi://pay?pa=${encodeURIComponent(merchantId)}&pn=KarunaForAll&am=${amount}&cu=INR&tn=${encodeURIComponent(paymentDescription)}`;
            break;

          case 'netbanking':
            // Web flow for netbanking
            handleSubmit({
              preventDefault: () => {} 
            } as React.FormEvent<HTMLFormElement>);
            return;
        }

        if (paymentLink) {
          // Save donation info temporarily
          const donationInfo = {
            amount,
            name,
            phone,
            email,
            pancard,
            paymentMethod: method,
            timestamp: new Date().toISOString()
          };

          // Store in localStorage
          localStorage.setItem('pendingDonation', JSON.stringify(donationInfo));

          // Open the payment app
          window.location.href = paymentLink;

          // Fallback if app isn't installed
          setTimeout(() => {
            setLoading(false);
            // If the app didn't open, show QR code instead
            setShowQRModal(true);
          }, 1500);
          return;
        }
      } else {
        // On desktop, show QR for UPI methods
        if (['upi', 'phonepe', 'gpay', 'paytm'].includes(method)) {
          setLoading(false);
          setShowQRModal(true);
          return;
        }
      }

      // Default to web flow
      handleSubmit({
        preventDefault: () => {}
      } as React.FormEvent<HTMLFormElement>);

    } catch (error) {
      console.error('Error launching payment app:', error);
      setLoading(false);
      handleSubmit({
        preventDefault: () => {}
      } as React.FormEvent<HTMLFormElement>);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing
      setTimeout(() => {
        // Clear pending donation
        localStorage.removeItem('pendingDonation');

        // Navigate to thank you page
        router.push({
          pathname: '/thank-you',
          query: { amount, name }
        });
      }, 1000);
    } catch (error) {
      console.error('Donation failed:', error);
      alert('There was a problem processing your donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse mr-2">
          URGENT
        </div>
        <h2 className="text-xl font-bold text-center text-gray-800">Help Animals in Need</h2>
      </div>

      {/* Image Slider - optimized */}
      <div className="relative h-48 md:h-64 w-full mb-6 rounded-lg overflow-hidden">
        <Image
          src={sliderImages[currentSlide].src}
          alt={sliderImages[currentSlide].alt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-3 left-3 text-white text-sm font-medium">
          <p>{sliderImages[currentSlide].alt}</p>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-1 text-white"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-1 text-white"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4-4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Indicators */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>

      {/* 80G Tax benefit banner */}
      <div className="bg-green-50 border border-green-100 rounded-md p-3 mb-5 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-medium text-green-800">100% Secure Donation | Tax Benefits under Section 80G</span>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Donation amounts with cultural significance (ending in 1 is considered auspicious) */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2 text-center">Choose Amount</label>
          <div className="grid grid-cols-2 gap-3 mb-3">
            {predefinedAmounts.map(presetAmount => (
              <button
                key={presetAmount}
                type="button"
                className={`py-3 px-4 rounded-lg font-medium text-base ${
                  amount === presetAmount
                    ? 'bg-green-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                } transition-all`}
                onClick={() => setAmount(presetAmount)}
              >
                ₹{presetAmount}
              </button>
            ))}
          </div>
          <div className="relative mt-3">
            <label className="block text-gray-700 text-sm mb-1">Custom Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-lg"
              min="100"
              step="1"
            />
          </div>
        </div>

        {/* One-time donation note */}
        <div className="mb-5 bg-blue-50 p-3 rounded-md text-center">
          <p className="text-sm text-blue-800">
            <span className="font-medium">One-time donation.</span> Your contribution will immediately help animals in need.
          </p>
        </div>

        {/* Personal info collection */}
        <div className="space-y-4 mb-5">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1 text-sm">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-1 text-sm">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your mobile number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1 text-sm">
              Email <span className="text-gray-500 font-normal">(Optional)</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            />
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
              placeholder="For tax benefits under Section 80G"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Payment method selection - with UPI as the main option */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2 text-sm">Select Payment Method</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button
              type="button"
              className={`rounded-lg flex items-center justify-center py-3 h-14 ${
                paymentMethod === 'upi' ? 'bg-white shadow-md border-2 border-green-500' : 'bg-white hover:bg-gray-50 border border-gray-200'
              }`}
              onClick={() => setPaymentMethod('upi')}
            >
              <span className="font-medium">UPI</span>
            </button>

            <button
              type="button"
              className={`rounded-lg flex items-center justify-center py-3 h-14 ${
                paymentMethod === 'phonepe' ? 'bg-white shadow-md border-2 border-green-500' : 'bg-white hover:bg-gray-50 border border-gray-200'
              }`}
              onClick={() => setPaymentMethod('phonepe')}
            >
              <img
                src="/images/payment/phonepe.png"
                alt="PhonePe"
                className="h-16 object-contain"
              />
            </button>

            <button
              type="button"
              className={`rounded-lg flex items-center justify-center py-3 h-14 ${
                paymentMethod === 'gpay' ? 'bg-white shadow-md border-2 border-green-500' : 'bg-white hover:bg-gray-50 border border-gray-200'
              }`}
              onClick={() => setPaymentMethod('gpay')}
            >
              <img
                src="/images/payment/googlepay.png"
                alt="Google Pay"
                className="h-14 object-contain"
              />
            </button>

            <button
              type="button"
              className={`rounded-lg flex items-center justify-center py-3 h-14 ${
                paymentMethod === 'paytm' ? 'bg-white shadow-md border-2 border-green-500' : 'bg-white hover:bg-gray-50 border border-gray-200'
              }`}
              onClick={() => setPaymentMethod('paytm')}
            >
              <img
                src="/images/payment/paytm.png"
                alt="Paytm"
                className="h-16 object-contain"
              />
            </button>

            <button
              type="button"
              className={`rounded-lg flex items-center justify-center py-3 h-14 ${
                paymentMethod === 'netbanking' ? 'bg-white shadow-md border-2 border-green-500' : 'bg-white hover:bg-gray-50 border border-gray-200'
              }`}
              onClick={() => setPaymentMethod('netbanking')}
            >
              <span className="font-medium">Net Banking</span>
            </button>

            <button
              type="button"
              className={`rounded-lg flex items-center justify-center py-3 h-14 ${
                paymentMethod === 'qr' ? 'bg-white shadow-md border-2 border-green-500' : 'bg-white hover:bg-gray-50 border border-gray-200'
              }`}
              onClick={() => setPaymentMethod('qr')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z" clipRule="evenodd" />
                <path d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z" />
              </svg>
            </button>
          </div>
          
          {/* Display UPI ID for all payment methods */}
          <div className="text-center mt-2">
            <p className="text-xs text-gray-500">All payments use UPI ID: <span className="font-medium">{merchantId}</span></p>
          </div>
        </div>

        {/* CTA button */}
        <Button
          type="button"
          onClick={() => handleDirectPaymentApp(paymentMethod)}
          disabled={loading || !name || !phone || !amount}
          variant="primary"
          fullWidth
          className="py-4 text-lg font-bold rounded-lg animate-pulse"
        >
          {loading ? 'Processing...' : `Donate ₹${amount}`}
        </Button>

        {/* Trust elements */}
        <div className="text-center mt-4 space-y-3">
          <div className="flex items-center justify-center gap-1 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="text-xs">Secure Payment</span>
            <span className="text-gray-400 mx-1">•</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs">100% Secure</span>
          </div>
        </div>
      </form>

      {/* NGO registration info with Indian tax ID */}
      <div className="mt-5 pt-3 border-t text-xs text-gray-500 text-center">
        <p className="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Registered NGO: AABTK2963D | 80G Certificate: AABTK2963DF20221</span>
        </p>
      </div>

      {/* QR Code Modal */}
      <QRCodeModal 
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        amount={amount}
        merchantId={merchantId}
        paymentDescription={`Donation to Karuna For All - ${name}`}
      />
    </div>
  );
};

export default DonationForm;