import React, { useState, useEffect } from 'react';

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  upiId: string;
  active: boolean;
  published: boolean;
}

interface PaymentSettingsProps {
  showNotification?: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const PaymentSettings: React.FC<PaymentSettingsProps> = ({ showNotification }) => {
  // Fixed 4 payment methods - exactly as requested
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'phonepe',
      name: 'PhonePe',
      icon: '📱',
      upiId: '',
      active: false,
      published: false
    },
    {
      id: 'googlepay',
      name: 'Google Pay',
      icon: '🟣',
      upiId: '',
      active: false,
      published: false
    },
    {
      id: 'paytm',
      name: 'Paytm',
      icon: '🔵',
      upiId: '',
      active: false,
      published: false
    },
    {
      id: 'qr',
      name: 'QR Code',
      icon: '📋',
      upiId: '',
      active: false,
      published: false
    }
  ]);

  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load payment settings on component mount
  useEffect(() => {
    loadPaymentSettings();
  }, []);

  const loadPaymentSettings = async () => {
    try {
      // First try to load from localStorage for immediate display
      const localData = localStorage.getItem('paymentSettings');
      if (localData) {
        const savedSettings = JSON.parse(localData);
        setPaymentMethods(savedSettings);
      }

      // Then fetch from API for latest data
      const response = await fetch('/api/payment-settings');
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setPaymentMethods(result.data);
          // Save to localStorage for future loads
          localStorage.setItem('paymentSettings', JSON.stringify(result.data));
        }
      }
    } catch (error) {
      console.error('Error loading payment settings:', error);
      showNotification?.('Failed to load payment settings', 'error');
    }
  };

  const handlePaymentChange = (id: string, field: keyof PaymentMethod, value: string | boolean) => {
    setPaymentMethods(prev =>
      prev.map(method =>
        method.id === id ? { ...method, [field]: value } : method
      )
    );
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Save to API
      const response = await fetch('/api/payment-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentMethods }),
      });

      const result = await response.json();
      
      if (result.success) {
        // Save to localStorage for immediate access
        localStorage.setItem('paymentSettings', JSON.stringify(paymentMethods));
        
        setHasChanges(false);
        showNotification?.('Payment settings saved successfully!', 'success');
      } else {
        throw new Error(result.error || 'Failed to save');
      }
    } catch (error) {
      console.error('Error saving payment settings:', error);
      showNotification?.('Failed to save payment settings. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Get published methods with filled UPI IDs (for donation page display)
  const getPublishedMethods = () => {
    return paymentMethods.filter(method => 
      method.published && 
      method.active && 
      method.upiId.trim() !== ''
    );
  };

  return (
    <div>
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Payment Methods</h2>
            <p className="text-sm sm:text-base text-gray-600">Configure your organization's payment methods for donations.</p>
          </div>
          
          {hasChanges && (
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          )}
        </div>
      </div>

      {/* Payment Methods Configuration */}
      <div className="space-y-4 sm:space-y-6">
        {paymentMethods.map((method) => (
          <div key={method.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xl sm:text-2xl">{method.icon}</span>
                <h4 className="text-base sm:text-lg font-medium text-gray-900">
                  {method.name}
                </h4>
              </div>
              
              <div className="flex flex-col xs:flex-row gap-2 xs:gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={method.active}
                    onChange={(e) => handlePaymentChange(method.id, 'active', e.target.checked)}
                    className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Active</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={method.published}
                    onChange={(e) => handlePaymentChange(method.id, 'published', e.target.checked)}
                    className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Published</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UPI ID {method.name === 'QR Code' ? '(for QR generation)' : ''}
              </label>
              <input
                type="text"
                value={method.upiId}
                onChange={(e) => handlePaymentChange(method.id, 'upiId', e.target.value)}
                placeholder={`Enter UPI ID for ${method.name}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Status Summary */}
      <div className="mt-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h5 className="text-sm font-medium text-blue-900 mb-2">Payment Methods Status</h5>
        <div className="text-sm text-blue-800 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <span className="font-medium">Active Methods:</span> {paymentMethods.filter(m => m.active).length}/4
            </div>
            <div>
              <span className="font-medium">Published Methods:</span> {getPublishedMethods().length}/4
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-blue-200">
            <p className="font-medium mb-1">Methods visible on donation page:</p>
            {getPublishedMethods().length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {getPublishedMethods().map(method => (
                  <span key={method.id} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {method.icon} {method.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-orange-700 font-medium">No payment methods will be visible on donation page</p>
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h5 className="text-sm font-medium text-yellow-900 mb-2">Instructions:</h5>
        <div className="text-sm text-yellow-800 space-y-1">
          <div className="flex items-start gap-2">
            <span className="text-yellow-600 mt-0.5">•</span>
            <span><strong>Active:</strong> Payment method will be available for processing donations</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow-600 mt-0.5">•</span>
            <span><strong>Published:</strong> Payment method will be visible on the donation page</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow-600 mt-0.5">•</span>
            <span><strong>UPI ID:</strong> Required field - only methods with filled UPI IDs will show on donation page</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow-600 mt-0.5">•</span>
            <span>At least one payment method should be active and published with a valid UPI ID</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSettings;