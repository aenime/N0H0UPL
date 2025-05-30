import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Button from '../common/Button';
import QRCodeModal from './QRCodeModal';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  velocity: { x: number; y: number };
  opacity: number;
}

interface ActivePaymentMethod {
  id: string;
  name: string;
  icon: string;
  upiId: string;
  active: boolean;
  published: boolean;
}

type PaymentMethod = 'upi' | 'phonepe' | 'gpay' | 'googlepay' | 'paytm' | 'qr' | 'netbanking';
type DonationType = 'one-time' | 'monthly';

const InteractiveDonationPage: React.FC = () => {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  
  // Animation state
  const [isAnimating, setIsAnimating] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  
  // Form state
  const [donationType, setDonationType] = useState<DonationType>('one-time');
  const [amount, setAmount] = useState<string>('1000');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('phonepe');
  const [loading, setLoading] = useState<boolean>(false);
  const [showQRModal, setShowQRModal] = useState<boolean>(false);
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  
  // Payment methods state
  const [activePaymentMethods, setActivePaymentMethods] = useState<ActivePaymentMethod[]>([]);
  const [loadingPaymentMethods, setLoadingPaymentMethods] = useState<boolean>(true);

  // Colors for rainbow effect and bubbles
  const rainbowColors = [
    '#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00',
    '#00ff80', '#00ffff', '#0080ff', '#0000ff', '#8000ff',
    '#ff00ff', '#ff0080'
  ];

  const bubbleColors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7',
    '#dda0dd', '#98d8c8', '#f7dc6f', '#bb8fce', '#85c1e9'
  ];

  useEffect(() => {
    loadActivePaymentMethods();
  }, []);

  const loadActivePaymentMethods = async () => {
    try {
      setLoadingPaymentMethods(true);
      
      // Try to load from localStorage first
      const localData = localStorage.getItem('paymentSettings');
      if (localData) {
        const allMethods = JSON.parse(localData);
        const activeMethods = allMethods.filter((method: ActivePaymentMethod) => 
          method.active && method.published && method.upiId.trim() !== ''
        );
        setActivePaymentMethods(activeMethods);
        
        if (activeMethods.length > 0) {
          setPaymentMethod(activeMethods[0].id as PaymentMethod);
        }
      }

      // Fetch from API
      const response = await fetch('/api/active-payment-methods');
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setActivePaymentMethods(result.data);
          if (result.data.length > 0) {
            setPaymentMethod(result.data[0].id as PaymentMethod);
          }
        }
      }
    } catch (error) {
      console.error('Error loading active payment methods:', error);
      // Fallback to default methods
      setActivePaymentMethods([
        {
          id: 'phonepe',
          name: 'PhonePe',
          icon: '📱',
          upiId: 'karunaforall@hdfcbank',
          active: true,
          published: true
        }
      ]);
    } finally {
      setLoadingPaymentMethods(false);
    }
  };

  // Initialize bubbles
  const createBubbles = (count: number = 50) => {
    const newBubbles: Bubble[] = [];
    for (let i = 0; i < count; i++) {
      newBubbles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 30 + 10,
        color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
        velocity: {
          x: (Math.random() - 0.5) * 4,
          y: (Math.random() - 0.5) * 4
        },
        opacity: Math.random() * 0.7 + 0.3
      });
    }
    setBubbles(newBubbles);
  };

  // Animate bubbles
  const animateBubbles = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    setBubbles(prevBubbles => 
      prevBubbles.map(bubble => {
        // Update position
        const newX = bubble.x + bubble.velocity.x;
        const newY = bubble.y + bubble.velocity.y;

        // Bounce off walls
        let newVelX = bubble.velocity.x;
        let newVelY = bubble.velocity.y;

        if (newX <= 0 || newX >= canvas.width) newVelX *= -1;
        if (newY <= 0 || newY >= canvas.height) newVelY *= -1;

        // Draw bubble
        ctx.globalAlpha = bubble.opacity;
        ctx.beginPath();
        ctx.arc(newX, newY, bubble.size, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        return {
          ...bubble,
          x: newX <= 0 ? 0 : newX >= canvas.width ? canvas.width : newX,
          y: newY <= 0 ? 0 : newY >= canvas.height ? canvas.height : newY,
          velocity: { x: newVelX, y: newVelY }
        };
      })
    );

    if (isAnimating) {
      animationRef.current = requestAnimationFrame(animateBubbles);
    }
  };

  // Start animation when donation is initiated
  const startAnimation = () => {
    setIsAnimating(true);
    createBubbles();
    animateBubbles();
  };

  // Stop animation
  const stopAnimation = () => {
    setIsAnimating(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  useEffect(() => {
    if (isAnimating) {
      animateBubbles();
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating]);

  // Get final donation amount
  const getFinalAmount = () => {
    return amount === 'custom' ? customAmount : amount;
  };

  // Get UPI ID for selected payment method
  const getUpiIdForMethod = (method: PaymentMethod): string => {
    const activeMethod = activePaymentMethods.find(m => m.id === method);
    return activeMethod?.upiId || 'karunaforall@hdfcbank';
  };

  // Handle payment
  const handlePayment = () => {
    const finalAmount = getFinalAmount();
    if (!finalAmount || !firstName || !phone || !email || !agreeToTerms) {
      alert('Please fill all required fields and agree to terms before making a payment');
      return;
    }

    startAnimation();
    setLoading(true);

    const upiId = getUpiIdForMethod(paymentMethod);
    const paymentDescription = `Donation to Paws & Care - ${firstName} ${lastName}`;

    try {
      if (paymentMethod === 'qr') {
        setShowQRModal(true);
        return;
      }

      // Generate UPI payment URL
      const upiUrl = `upi://pay?pa=${upiId}&pn=Paws%20%26%20Care&am=${finalAmount}&cu=INR&tn=${encodeURIComponent(paymentDescription)}`;

      // Try to open payment app
      window.location.href = upiUrl;

      // Redirect to thank you page after delay
      setTimeout(() => {
        router.push('/thank-you');
      }, 3000);

    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setTimeout(() => {
        setLoading(false);
        stopAnimation();
      }, 3000);
    }
  };

  // Predefined amounts
  const predefinedAmounts = [
    { value: '500', label: '₹500' },
    { value: '1000', label: '₹1,000' },
    { value: '2500', label: '₹2,500' },
    { value: '5000', label: '₹5,000' }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ background: 'linear-gradient(45deg, rgba(255,0,150,0.1), rgba(0,255,255,0.1))' }}
      />

      {/* Rainbow Border Animation */}
      <div
        className={`fixed inset-0 pointer-events-none z-10 transition-opacity duration-1000 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `linear-gradient(45deg, ${rainbowColors.join(', ')})`,
          padding: '8px',
          animation: isAnimating ? 'rainbow-rotate 3s linear infinite' : 'none'
        }}
      >
        <div className="w-full h-full bg-white rounded-lg"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                🐾 Save Lives Today
              </h1>
              <p className="text-lg text-gray-600">
                Your donation helps rescue and care for animals in need
              </p>
            </div>

            {/* Donation Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-transparent bg-clip-padding"
                 style={{
                   background: isAnimating 
                     ? 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #00ff00, #0000ff, #8000ff, #ff00ff) border-box'
                     : 'white'
                 }}>
              
              {/* Donation Type */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Donation Type
                </label>
                <div className="flex space-x-4">
                  {[
                    { value: 'one-time', label: 'One-time' },
                    { value: 'monthly', label: 'Monthly' }
                  ].map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setDonationType(type.value as DonationType)}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                        donationType === type.value
                          ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Amount
                </label>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {predefinedAmounts.map((amountOption) => (
                    <button
                      key={amountOption.value}
                      onClick={() => setAmount(amountOption.value)}
                      className={`py-3 px-4 rounded-lg font-medium transition-all ${
                        amount === amountOption.value
                          ? 'bg-green-500 text-white shadow-lg transform scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {amountOption.label}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setAmount('custom')}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all mb-3 ${
                    amount === 'custom'
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Custom Amount
                </button>
                
                {amount === 'custom' && (
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input
                  type="text"
                  placeholder="First Name *"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Payment Methods */}
              {!loadingPaymentMethods && activePaymentMethods.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {activePaymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          paymentMethod === method.id
                            ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-2">{method.icon}</div>
                        <div className="text-sm font-medium">{method.name}</div>
                      </button>
                    ))}
                    <button
                      onClick={() => setPaymentMethod('qr')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        paymentMethod === 'qr'
                          ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">📱</div>
                      <div className="text-sm font-medium">QR Code</div>
                    </button>
                  </div>
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the terms and conditions and privacy policy *
                  </span>
                </label>
              </div>

              {/* Donate Button */}
              <button
                onClick={handlePayment}
                disabled={loading || !agreeToTerms}
                className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all ${
                  loading || !agreeToTerms
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                } ${isAnimating ? 'animate-pulse' : ''}`}
              >
                {loading ? '🎉 Processing Donation... 🎉' : `💖 Donate ₹${getFinalAmount()} Now 💖`}
              </button>
            </div>
          </div>
        </div>

        {/* QR Code Modal */}
        {showQRModal && (
          <QRCodeModal
            isOpen={showQRModal}
            amount={getFinalAmount()}
            merchantId={getUpiIdForMethod('qr')}
            paymentDescription={`Donation to Paws & Care - ${firstName} ${lastName}`}
            onClose={() => setShowQRModal(false)}
          />
        )}
      </div>

      {/* Rainbow Animation Styles */}
      <style jsx>{`
        @keyframes rainbow-rotate {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default InteractiveDonationPage;
