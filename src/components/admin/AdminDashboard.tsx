import React, { useState, useEffect } from 'react';

// Safe icon components
const ChartBarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const UserGroupIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const BanknotesIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TrendingUpIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const EyeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const DocumentPlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m3-3H9" />
  </svg>
);

interface DashboardStats {
  totalDonations: {
    amount: number;
    count: number;
    growthRate: number;
  };
  recentDonors: number;
  monthlyGrowth: number;
  avgDonation: number;
  conversionRate: number;
  pageViews: number;
}

interface RecentActivity {
  id: string;
  type: 'donation' | 'post' | 'media' | 'user';
  action: string;
  user: string;
  timestamp: Date;
  amount?: number;
  metadata?: any;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
  action: () => void;
}

interface AdminDashboardProps {
  onNavigate: (tab: string) => void;
  showNotification: (message: string, type: 'success' | 'error' | 'info') => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate, showNotification }) => {
  const [stats, setStats] = useState<DashboardStats>({
    totalDonations: { amount: 0, count: 0, growthRate: 0 },
    recentDonors: 0,
    monthlyGrowth: 0,
    avgDonation: 0,
    conversionRate: 0,
    pageViews: 0
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch dashboard statistics
      const statsResponse = await fetch('/api/admin/dashboard/stats');
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      // Fetch recent activity
      const activityResponse = await fetch('/api/admin/dashboard/activity');
      if (activityResponse.ok) {
        const activityData = await activityResponse.json();
        setRecentActivity(activityData.activities || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      showNotification('Failed to load dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const quickActions: QuickAction[] = [
    {
      id: 'add-post',
      label: 'Add New Post',
      icon: DocumentPlusIcon,
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => onNavigate('content')
    },
    {
      id: 'record-donation',
      label: 'Record Donation',
      icon: BanknotesIcon,
      color: 'bg-green-500 hover:bg-green-600',
      action: () => onNavigate('donations')
    },
    {
      id: 'upload-media',
      label: 'Upload Media',
      icon: ChartBarIcon,
      color: 'bg-purple-500 hover:bg-purple-600',
      action: () => onNavigate('media')
    },
    {
      id: 'view-donors',
      label: 'View Donors',
      icon: UserGroupIcon,
      color: 'bg-orange-500 hover:bg-orange-600',
      action: () => onNavigate('donations')
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'donation':
        return <BanknotesIcon className="h-4 w-4" />;
      case 'post':
        return <DocumentPlusIcon className="h-4 w-4" />;
      case 'media':
        return <ChartBarIcon className="h-4 w-4" />;
      default:
        return <UserGroupIcon className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-32"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-gray-200 rounded-lg h-96"></div>
            <div className="bg-gray-200 rounded-lg h-96"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome to Admin Dashboard</h1>
        <p className="text-orange-100">Manage your NGO's digital presence and track impact</p>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Donations */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Donations</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(stats.totalDonations.amount)}
              </p>
              <p className="text-sm text-gray-500">
                {stats.totalDonations.count} donations
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <BanknotesIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUpIcon className="h-4 w-4 text-green-500" />
            <span className="text-green-500 text-sm font-medium ml-1">
              {stats.totalDonations.growthRate > 0 ? '+' : ''}{stats.totalDonations.growthRate}%
            </span>
            <span className="text-gray-500 text-sm ml-1">vs last month</span>
          </div>
        </div>

        {/* Active Donors */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Recent Donors</p>
              <p className="text-2xl font-bold text-gray-900">{stats.recentDonors}</p>
              <p className="text-sm text-gray-500">This month</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <UserGroupIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUpIcon className="h-4 w-4 text-blue-500" />
            <span className="text-blue-500 text-sm font-medium ml-1">
              +{stats.monthlyGrowth}%
            </span>
            <span className="text-gray-500 text-sm ml-1">growth</span>
          </div>
        </div>

        {/* Average Donation */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Donation</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(stats.avgDonation)}
              </p>
              <p className="text-sm text-gray-500">Per donation</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <HeartIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-purple-500 text-sm font-medium">
              {stats.conversionRate}%
            </span>
            <span className="text-gray-500 text-sm ml-1">conversion rate</span>
          </div>
        </div>

        {/* Page Views */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Page Views</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.pageViews.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">This month</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <EyeIcon className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <CalendarIcon className="h-4 w-4 text-orange-500" />
            <span className="text-gray-500 text-sm ml-1">Monthly views</span>
          </div>
        </div>
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={action.action}
                className={`w-full flex items-center p-3 rounded-lg text-white transition-colors ${action.color}`}
              >
                <action.icon className="h-5 w-5 mr-3" />
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <button 
              onClick={fetchDashboardData}
              className="text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              Refresh
            </button>
          </div>
          
          {recentActivity.length > 0 ? (
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'donation' ? 'bg-green-100 text-green-600' :
                    activity.type === 'post' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'media' ? 'bg-purple-100 text-purple-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                      {activity.amount && (
                        <span className="font-semibold text-green-600 ml-1">
                          {formatCurrency(activity.amount)}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500">{formatDate(activity.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <ChartBarIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>No recent activity</p>
            </div>
          )}
        </div>
      </div>

      {/* Monthly Summary Chart Placeholder */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Donation Trends</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <ChartBarIcon className="h-12 w-12 mx-auto mb-2" />
            <p>Chart visualization will be implemented with a charting library</p>
            <p className="text-sm">Consider using Chart.js or Recharts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
