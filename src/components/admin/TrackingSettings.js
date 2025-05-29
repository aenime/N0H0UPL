import React from 'react';

const TrackingSettings = ({ trackingCodes, setTrackingCodes, onSave, isLoading }) => {
  const handleTrackingChange = (field, value) => {
    setTrackingCodes(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const trackingFields = [
    {
      key: 'facebookPixelId',
      label: 'Facebook Pixel ID',
      placeholder: 'Enter Facebook Pixel ID',
      description: 'Used for Facebook conversion tracking'
    },
    {
      key: 'googleAnalyticsId',
      label: 'Google Analytics ID',
      placeholder: 'G-XXXXXXXXXX or UA-XXXXXXXXX',
      description: 'Google Analytics tracking ID'
    },
    {
      key: 'googleTagManagerId',
      label: 'Google Tag Manager ID',
      placeholder: 'GTM-XXXXXXX',
      description: 'Google Tag Manager container ID'
    },
    {
      key: 'googleConversionLabel',
      label: 'Google Ads Conversion Label',
      placeholder: 'Enter conversion label',
      description: 'Google Ads conversion tracking label'
    }
  ];

  return (
    <div className="bg-white shadow rounded-lg p-3 sm:p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
        <h3 className="text-lg sm:text-xl font-medium text-gray-900">Analytics & Tracking Settings</h3>
        <button
          onClick={onSave}
          disabled={isLoading}
          className="w-full sm:w-auto bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 disabled:opacity-50 text-sm sm:text-base"
        >
          {isLoading ? 'Saving...' : 'Save Tracking Settings'}
        </button>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {trackingFields.map((field) => (
          <div key={field.key} className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
            </label>
            <input
              type="text"
              value={trackingCodes[field.key] || ''}
              onChange={(e) => handleTrackingChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
            />
            <p className="mt-2 text-xs sm:text-sm text-gray-500">{field.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h5 className="text-sm font-medium text-yellow-900 mb-2">Important Notes:</h5>
        <div className="text-sm text-yellow-800 space-y-1">
          <div className="flex items-start gap-2">
            <span className="text-yellow-600 mt-0.5">•</span>
            <span>These tracking codes will be automatically added to your website</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow-600 mt-0.5">•</span>
            <span>Make sure to test the tracking codes after saving</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow-600 mt-0.5">•</span>
            <span>Remove any existing tracking codes from your theme to avoid duplicates</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow-600 mt-0.5">•</span>
            <span>Changes may take a few minutes to take effect</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingSettings;
