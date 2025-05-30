import React, { useState, useEffect } from 'react';

// Simple SVG icons as React components
const ChartBarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const CogIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EyeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const ClipboardIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

const ShieldCheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const DocumentTextIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

// Types and Interfaces
interface TrackingCode {
  id: string;
  name: string;
  code: string;
  type: 'google-analytics' | 'google-tag-manager' | 'facebook-pixel' | 'custom';
  isActive: boolean;
  lastUpdated: string;
}

interface AnalyticsMetric {
  id: string;
  name: string;
  value: string | number;
  change: number;
  period: 'today' | 'week' | 'month' | 'year';
  description: string;
}

interface ConversionGoal {
  id: string;
  name: string;
  type: 'donation' | 'adoption' | 'newsletter' | 'volunteer' | 'contact';
  value: number;
  isActive: boolean;
  conversionRate: number;
}

interface AnalyticsSettingsProps {
  showNotification?: (message: string, type: 'success' | 'error' | 'info') => void;
}

const AnalyticsSettings: React.FC<AnalyticsSettingsProps> = ({ showNotification }) => {
  // State Management
  const [trackingCodes, setTrackingCodes] = useState<TrackingCode[]>([]);
  const [metrics, setMetrics] = useState<AnalyticsMetric[]>([]);
  const [goals, setGoals] = useState<ConversionGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'tracking' | 'goals' | 'reports'>('overview');

  // Form States
  const [newTrackingCode, setNewTrackingCode] = useState({
    name: '',
    code: '',
    type: 'custom' as TrackingCode['type'],
    isActive: true
  });

  const [newGoal, setNewGoal] = useState({
    name: '',
    type: 'donation' as ConversionGoal['type'],
    value: 0
  });

  // Modal States
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [editingCode, setEditingCode] = useState<TrackingCode | null>(null);
  const [editingGoal, setEditingGoal] = useState<ConversionGoal | null>(null);

  // Initialize data
  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      
      // Mock data for demonstration
      const mockTrackingCodes: TrackingCode[] = [
        {
          id: '1',
          name: 'Google Analytics 4',
          code: 'G-XXXXXXXXXX',
          type: 'google-analytics',
          isActive: true,
          lastUpdated: '2024-01-20T10:30:00Z'
        },
        {
          id: '2',
          name: 'Google Tag Manager',
          code: 'GTM-XXXXXXX',
          type: 'google-tag-manager',
          isActive: true,
          lastUpdated: '2024-01-19T15:45:00Z'
        },
        {
          id: '3',
          name: 'Facebook Pixel',
          code: '123456789012345',
          type: 'facebook-pixel',
          isActive: false,
          lastUpdated: '2024-01-18T09:15:00Z'
        }
      ];

      const mockMetrics: AnalyticsMetric[] = [
        {
          id: '1',
          name: 'Total Page Views',
          value: '12,543',
          change: 15.3,
          period: 'month',
          description: 'Total page views this month'
        },
        {
          id: '2',
          name: 'Unique Visitors',
          value: '8,234',
          change: 8.7,
          period: 'month',
          description: 'Unique visitors this month'
        },
        {
          id: '3',
          name: 'Bounce Rate',
          value: '34.2%',
          change: -5.2,
          period: 'month',
          description: 'Percentage of single-page sessions'
        },
        {
          id: '4',
          name: 'Average Session Duration',
          value: '3m 45s',
          change: 12.1,
          period: 'month',
          description: 'Average time spent on site'
        }
      ];

      const mockGoals: ConversionGoal[] = [
        {
          id: '1',
          name: 'Donation Completed',
          type: 'donation',
          value: 156,
          isActive: true,
          conversionRate: 3.2
        },
        {
          id: '2',
          name: 'Newsletter Signup',
          type: 'newsletter',
          value: 432,
          isActive: true,
          conversionRate: 8.7
        },
        {
          id: '3',
          name: 'Volunteer Registration',
          type: 'volunteer',
          value: 89,
          isActive: true,
          conversionRate: 2.1
        }
      ];

      setTrackingCodes(mockTrackingCodes);
      setMetrics(mockMetrics);
      setGoals(mockGoals);
    } catch (error) {
      console.error('Error loading analytics data:', error);
      showNotification?.('Failed to load analytics data', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle tracking code submission
  const handleTrackingCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingCode) {
        // Update existing code
        const updatedCode: TrackingCode = {
          ...editingCode,
          name: newTrackingCode.name,
          code: newTrackingCode.code,
          type: newTrackingCode.type,
          isActive: newTrackingCode.isActive,
          lastUpdated: new Date().toISOString()
        };
        
        setTrackingCodes(codes => codes.map(c => c.id === editingCode.id ? updatedCode : c));
        showNotification?.('Tracking code updated successfully', 'success');
      } else {
        // Create new code
        const newCode: TrackingCode = {
          id: Date.now().toString(),
          name: newTrackingCode.name,
          code: newTrackingCode.code,
          type: newTrackingCode.type,
          isActive: newTrackingCode.isActive,
          lastUpdated: new Date().toISOString()
        };
        
        setTrackingCodes(codes => [...codes, newCode]);
        showNotification?.('Tracking code added successfully', 'success');
      }
      
      resetTrackingForm();
      setShowTrackingModal(false);
    } catch (error) {
      console.error('Error saving tracking code:', error);
      showNotification?.('Failed to save tracking code', 'error');
    }
  };

  // Handle goal submission
  const handleGoalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingGoal) {
        // Update existing goal
        const updatedGoal: ConversionGoal = {
          ...editingGoal,
          name: newGoal.name,
          type: newGoal.type,
          value: newGoal.value
        };
        
        setGoals(goals => goals.map(g => g.id === editingGoal.id ? updatedGoal : g));
        showNotification?.('Conversion goal updated successfully', 'success');
      } else {
        // Create new goal
        const newGoalItem: ConversionGoal = {
          id: Date.now().toString(),
          name: newGoal.name,
          type: newGoal.type,
          value: newGoal.value,
          isActive: true,
          conversionRate: 0
        };
        
        setGoals(goals => [...goals, newGoalItem]);
        showNotification?.('Conversion goal created successfully', 'success');
      }
      
      resetGoalForm();
      setShowGoalModal(false);
    } catch (error) {
      console.error('Error saving goal:', error);
      showNotification?.('Failed to save conversion goal', 'error');
    }
  };

  const resetTrackingForm = () => {
    setNewTrackingCode({
      name: '',
      code: '',
      type: 'custom',
      isActive: true
    });
    setEditingCode(null);
  };

  const resetGoalForm = () => {
    setNewGoal({
      name: '',
      type: 'donation',
      value: 0
    });
    setEditingGoal(null);
  };

  const handleEditTrackingCode = (code: TrackingCode) => {
    setEditingCode(code);
    setNewTrackingCode({
      name: code.name,
      code: code.code,
      type: code.type,
      isActive: code.isActive
    });
    setShowTrackingModal(true);
  };

  const handleDeleteTrackingCode = async (codeId: string) => {
    if (window.confirm('Are you sure you want to delete this tracking code?')) {
      try {
        setTrackingCodes(codes => codes.filter(c => c.id !== codeId));
        showNotification?.('Tracking code deleted successfully', 'success');
      } catch (error) {
        console.error('Error deleting tracking code:', error);
        showNotification?.('Failed to delete tracking code', 'error');
      }
    }
  };

  const handleToggleTrackingCode = async (codeId: string) => {
    try {
      setTrackingCodes(codes => codes.map(c => 
        c.id === codeId ? { ...c, isActive: !c.isActive, lastUpdated: new Date().toISOString() } : c
      ));
      showNotification?.('Tracking code status updated', 'success');
    } catch (error) {
      console.error('Error toggling tracking code:', error);
      showNotification?.('Failed to update tracking code status', 'error');
    }
  };

  const getTrackingTypeColor = (type: TrackingCode['type']) => {
    const colors = {
      'google-analytics': 'bg-orange-100 text-orange-800',
      'google-tag-manager': 'bg-blue-100 text-blue-800',
      'facebook-pixel': 'bg-indigo-100 text-indigo-800',
      'custom': 'bg-gray-100 text-gray-800'
    };
    return colors[type];
  };

  const getTrackingTypeIcon = (type: TrackingCode['type']) => {
    switch (type) {
      case 'google-analytics':
        return '📊';
      case 'google-tag-manager':
        return '🏷️';
      case 'facebook-pixel':
        return '📘';
      default:
        return '🔧';
    }
  };

  const getGoalTypeColor = (type: ConversionGoal['type']) => {
    const colors = {
      donation: 'bg-green-100 text-green-800',
      adoption: 'bg-pink-100 text-pink-800',
      newsletter: 'bg-blue-100 text-blue-800',
      volunteer: 'bg-purple-100 text-purple-800',
      contact: 'bg-yellow-100 text-yellow-800'
    };
    return colors[type];
  };

  const getGoalTypeIcon = (type: ConversionGoal['type']) => {
    const icons = {
      donation: '💰',
      adoption: '🐾',
      newsletter: '📧',
      volunteer: '🤝',
      contact: '📞'
    };
    return icons[type];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Analytics & Tracking</h3>
            <p className="text-sm text-gray-500">Monitor website performance and user behavior</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowTrackingModal(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <ClipboardIcon className="h-4 w-4 mr-2" />
              Add Tracking
            </button>
            <button
              onClick={() => setShowGoalModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
            >
              <ChartBarIcon className="h-4 w-4 mr-2" />
              Add Goal
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
          {[
            { id: 'overview', name: 'Overview', icon: ChartBarIcon },
            { id: 'tracking', name: 'Tracking Codes', icon: ClipboardIcon },
            { id: 'goals', name: 'Conversion Goals', icon: EyeIcon },
            { id: 'reports', name: 'Reports', icon: DocumentTextIcon }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric) => (
                <div key={metric.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-600">{metric.name}</h4>
                    <span className={`text-xs font-medium ${
                      metric.change > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
                </div>
              ))}
            </div>

            {/* Active Tracking Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Active Tracking</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {trackingCodes.filter(code => code.isActive).map((code) => (
                  <div key={code.id} className="bg-white rounded-lg p-4 border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg">{getTrackingTypeIcon(code.type)}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTrackingTypeColor(code.type)}`}>
                        {code.type.replace('-', ' ')}
                      </span>
                    </div>
                    <h5 className="font-medium text-gray-900">{code.name}</h5>
                    <p className="text-sm text-gray-600 mt-1">{code.code}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tracking' && (
          <div className="space-y-6">
            {/* Tracking Codes Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {trackingCodes.map((code) => (
                    <tr key={code.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-lg mr-3">{getTrackingTypeIcon(code.type)}</span>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{code.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTrackingTypeColor(code.type)}`}>
                          {code.type.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900 font-mono">{code.code}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleTrackingCode(code.id)}
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            code.isActive
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          {code.isActive ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(code.lastUpdated).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditTrackingCode(code)}
                            className="text-orange-600 hover:text-orange-900"
                          >
                            <CogIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTrackingCode(code.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="space-y-6">
            {/* Conversion Goals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal) => (
                <div key={goal.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getGoalTypeIcon(goal.type)}</span>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{goal.name}</h4>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGoalTypeColor(goal.type)}`}>
                          {goal.type}
                        </span>
                      </div>
                    </div>
                    <button
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        goal.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      <ShieldCheckIcon className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Conversions</span>
                      <span className="text-lg font-bold text-gray-900">{goal.value}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Conversion Rate</span>
                      <span className="text-sm font-medium text-orange-600">{goal.conversionRate}%</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingGoal(goal);
                        setNewGoal({
                          name: goal.name,
                          type: goal.type,
                          value: goal.value
                        });
                        setShowGoalModal(true);
                      }}
                      className="flex-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-md transition-colors"
                    >
                      Edit
                    </button>
                    <button className="flex-1 text-sm bg-orange-100 hover:bg-orange-200 text-orange-700 py-2 px-3 rounded-md transition-colors">
                      View Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="text-center py-12">
              <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Reports</h3>
              <p className="text-gray-600 mb-6">Detailed analytics reports and insights coming soon.</p>
              <button className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700">
                Request Beta Access
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tracking Code Modal */}
      {showTrackingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingCode ? 'Edit Tracking Code' : 'Add Tracking Code'}
            </h3>
            <form onSubmit={handleTrackingCodeSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newTrackingCode.name}
                  onChange={(e) => setNewTrackingCode({...newTrackingCode, name: e.target.value})}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  placeholder="e.g., Google Analytics"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={newTrackingCode.type}
                  onChange={(e) => setNewTrackingCode({...newTrackingCode, type: e.target.value as TrackingCode['type']})}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="google-analytics">Google Analytics</option>
                  <option value="google-tag-manager">Google Tag Manager</option>
                  <option value="facebook-pixel">Facebook Pixel</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Code</label>
                <textarea
                  value={newTrackingCode.code}
                  onChange={(e) => setNewTrackingCode({...newTrackingCode, code: e.target.value})}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  rows={3}
                  placeholder="Paste your tracking code here"
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={newTrackingCode.isActive}
                  onChange={(e) => setNewTrackingCode({...newTrackingCode, isActive: e.target.checked})}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Activate immediately
                </label>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowTrackingModal(false);
                    resetTrackingForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700"
                >
                  {editingCode ? 'Update' : 'Add'} Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingGoal ? 'Edit Conversion Goal' : 'Add Conversion Goal'}
            </h3>
            <form onSubmit={handleGoalSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Goal Name</label>
                <input
                  type="text"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  placeholder="e.g., Donation Completed"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Goal Type</label>
                <select
                  value={newGoal.type}
                  onChange={(e) => setNewGoal({...newGoal, type: e.target.value as ConversionGoal['type']})}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="donation">Donation</option>
                  <option value="adoption">Pet Adoption</option>
                  <option value="newsletter">Newsletter Signup</option>
                  <option value="volunteer">Volunteer Registration</option>
                  <option value="contact">Contact Form</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Value</label>
                <input
                  type="number"
                  value={newGoal.value}
                  onChange={(e) => setNewGoal({...newGoal, value: parseInt(e.target.value) || 0})}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Monthly target"
                  min="0"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowGoalModal(false);
                    resetGoalForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700"
                >
                  {editingGoal ? 'Update' : 'Create'} Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsSettings;
