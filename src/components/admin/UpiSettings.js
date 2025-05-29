import React from 'react';

const UpiSettings = ({ upiSettings, setUpiSettings, hasChanges, setHasChanges, onSave, isLoading }) => {
  const handleUpiChange = (index, field, value) => {
    const updatedSettings = [...upiSettings];
    updatedSettings[index] = { ...updatedSettings[index], [field]: value };
    setUpiSettings(updatedSettings);
    setHasChanges(true);
  };

  const getMethodIcon = (method) => {
    const icons = {
      phonepe: '📱',
      gpay: '🟣',
      paytm: '🔵',
      qr: '📋'
    };
    return icons[method] || '💳';
  };

  const getMethodName = (method) => {
    const names = {
      phonepe: 'PhonePe',
      gpay: 'Google Pay',
      paytm: 'Paytm',
      qr: 'QR Code'
    };
    return names[method] || method;
  };

  return (
    <div className="bg-white shadow rounded-lg p-3 sm:p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
        <h3 className="text-lg sm:text-xl font-medium text-gray-900">UPI Payment Settings</h3>
        {hasChanges && (
          <button
            onClick={onSave}
            disabled={isLoading}
            className="w-full sm:w-auto bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 disabled:opacity-50 text-sm sm:text-base"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        )}
      </div>

      <div className="space-y-4 sm:space-y-6">
        {upiSettings.map((setting, index) => (
          <div key={setting.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xl sm:text-2xl">{getMethodIcon(setting.method)}</span>
                <h4 className="text-base sm:text-lg font-medium text-gray-900">
                  {getMethodName(setting.method)}
                </h4>
              </div>
              <div className="flex flex-col xs:flex-row gap-2 xs:gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={setting.active}
                    onChange={(e) => handleUpiChange(index, 'active', e.target.checked)}
                    className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Active</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={setting.published}
                    onChange={(e) => handleUpiChange(index, 'published', e.target.checked)}
                    className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Published</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UPI ID
              </label>
              <input
                type="text"
                value={setting.upiId}
                onChange={(e) => handleUpiChange(index, 'upiId', e.target.value)}
                placeholder={`Enter UPI ID for ${getMethodName(setting.method)}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h5 className="text-sm font-medium text-blue-900 mb-2">Instructions:</h5>
        <div className="text-sm text-blue-800 space-y-1">
          <div className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span><strong>Active:</strong> Payment method will be available for donations</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span><strong>Published:</strong> Payment method will be visible on the donation page</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span><strong>UPI ID:</strong> The merchant UPI ID for receiving payments</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>At least one payment method should be active and published</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpiSettings;
