import React, { useState } from 'react';

interface AnalyticsData {
  website: {
    pageViews: number;
    uniqueVisitors: number;
    bounceRate: number;
    avgSessionDuration: string;
    topPages: Array<{ page: string; views: number }>;
  };
  donations: {
    totalAmount: number;
    totalCount: number;
    avgAmount: number;
    monthlyGrowth: number;
    topSources: Array<{ source: string; amount: number; percentage: number }>;
  };
  social: {
    facebook: { followers: number; engagement: number };
    instagram: { followers: number; engagement: number };
    twitter: { followers: number; engagement: number };
  };
  email: {
    subscribers: number;
    openRate: number;
    clickRate: number;
    unsubscribeRate: number;
  };
}

interface AnalyticsProps {
  showNotification?: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const Analytics: React.FC<AnalyticsProps> = ({ showNotification }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('last_30_days');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock analytics data
  const [analyticsData] = useState<AnalyticsData>({
    website: {
      pageViews: 12450,
      uniqueVisitors: 8920,
      bounceRate: 35.2,
      avgSessionDuration: '3m 24s',
      topPages: [
        { page: '/donate', views: 3240 },
        { page: '/', views: 2890 },
        { page: '/about', views: 1560 },
        { page: '/medical-care', views: 1340 },
        { page: '/contact', views: 890 }
      ]
    },
    donations: {
      totalAmount: 2_45_600,
      totalCount: 89,
      avgAmount: 2760,
      monthlyGrowth: 23.5,
      topSources: [
        { source: 'Website', amount: 1_85_600, percentage: 75.5 },
        { source: 'Social Media', amount: 45_200, percentage: 18.4 },
        { source: 'Email Campaign', amount: 14_800, percentage: 6.1 }
      ]
    },
    social: {
      facebook: { followers: 2456, engagement: 4.2 },
      instagram: { followers: 1892, engagement: 6.8 },
      twitter: { followers: 567, engagement: 2.1 }
    },
    email: {
      subscribers: 1234,
      openRate: 28.5,
      clickRate: 3.7,
      unsubscribeRate: 0.8
    }
  });

  const periods = [
    { value: 'last_7_days', label: 'Last 7 Days' },
    { value: 'last_30_days', label: 'Last 30 Days' },
    { value: 'last_3_months', label: 'Last 3 Months' },
    { value: 'last_year', label: 'Last Year' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'website', label: 'Website', icon: '🌐' },
    { id: 'donations', label: 'Donations', icon: '💰' },
    { id: 'social', label: 'Social Media', icon: '📱' },
    { id: 'email', label: 'Email', icon: '📧' }
  ];

  const exportData = () => {
    showNotification?.('Analytics data exported successfully', 'success');
  };

  const refreshData = () => {
    showNotification?.('Analytics data refreshed', 'success');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h2>
            <p className="text-gray-600">Track your organization's performance and impact.</p>
          </div>
          <div className="flex space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {periods.map((period) => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
            <button
              onClick={refreshData}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Refresh
            </button>
            <button
              onClick={exportData}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Export
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                    <span className="text-green-600 font-bold">₹</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Donations</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{analyticsData.donations.totalAmount.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                    <span className="text-blue-600 font-bold">👥</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Website Visitors</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analyticsData.website.uniqueVisitors.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                    <span className="text-purple-600 font-bold">📧</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Email Subscribers</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analyticsData.email.subscribers.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-100 rounded-md flex items-center justify-center">
                    <span className="text-orange-600 font-bold">📱</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Social Followers</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(analyticsData.social.facebook.followers + 
                      analyticsData.social.instagram.followers + 
                      analyticsData.social.twitter.followers).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation Sources</h3>
              <div className="space-y-3">
                {analyticsData.donations.topSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                      <span className="text-sm text-gray-700">{source.source}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        ₹{source.amount.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs text-gray-500">{source.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Pages</h3>
              <div className="space-y-3">
                {analyticsData.website.topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{page.page}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {page.views.toLocaleString()} views
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Website Tab */}
      {activeTab === 'website' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500">Page Views</h3>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.website.pageViews.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500">Unique Visitors</h3>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.website.uniqueVisitors.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500">Bounce Rate</h3>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.website.bounceRate}%</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500">Avg. Session</h3>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.website.avgSessionDuration}</p>
            </div>
          </div>
        </div>
      )}

      {/* Donations Tab */}
      {activeTab === 'donations' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
              <p className="text-2xl font-bold text-gray-900">
                ₹{analyticsData.donations.totalAmount.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500">Total Donations</h3>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.donations.totalCount}</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500">Average Amount</h3>
              <p className="text-2xl font-bold text-gray-900">
                ₹{analyticsData.donations.avgAmount.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500">Monthly Growth</h3>
              <p className="text-2xl font-bold text-green-600">+{analyticsData.donations.monthlyGrowth}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Social Media Tab */}
      {activeTab === 'social' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">f</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Facebook</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Followers</span>
                  <span className="text-sm font-medium text-gray-900">
                    {analyticsData.social.facebook.followers.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Engagement</span>
                  <span className="text-sm font-medium text-gray-900">
                    {analyticsData.social.facebook.engagement}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-pink-100 rounded-md flex items-center justify-center mr-3">
                  <span className="text-pink-600 font-bold">📷</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Instagram</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Followers</span>
                  <span className="text-sm font-medium text-gray-900">
                    {analyticsData.social.instagram.followers.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Engagement</span>
                  <span className="text-sm font-medium text-gray-900">
                    {analyticsData.social.instagram.engagement}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">🐦</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Twitter</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Followers</span>
                  <span className="text-sm font-medium text-gray-900">
                    {analyticsData.social.twitter.followers.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Engagement</span>
                  <span className="text-sm font-medium text-gray-900">
                    {analyticsData.social.twitter.engagement}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Tab */}
      {activeTab === 'email' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500">Subscribers</h3>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.email.subscribers.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500">Open Rate</h3>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.email.openRate}%</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500">Click Rate</h3>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.email.clickRate}%</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500">Unsubscribe Rate</h3>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.email.unsubscribeRate}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
