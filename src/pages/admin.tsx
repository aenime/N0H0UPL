import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Admin Components
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminTabs from '../components/admin/AdminTabs';
import DonationManager from '../components/admin/DonationManager';
import ContentManager from '../components/admin/ContentManager';
import MediaManagerNew from '../components/admin/MediaManagerNew';
import UserManagement from '../components/admin/UserManagement';
import AnalyticsSettings from '../components/admin/AnalyticsSettings';
import NGOProfileSettings from '../components/admin/NGOProfileSettings';
import PaymentSettings from '../components/admin/PaymentSettings';
import EmailTemplates from '../components/admin/EmailTemplates';
import LoginForm from '../components/admin/LoginForm';

// Notification Component
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/react/24/solid';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  timestamp: Date;
}

interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'moderator' | 'editor';
  lastLogin: Date;
}

const AdminPanel: React.FC = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is logged in (this would typically check JWT token)
        const token = localStorage.getItem('adminToken');
        if (token) {
          // Validate token and get user data
          const userData = await validateToken(token);
          setCurrentUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        localStorage.removeItem('adminToken');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Handle URL tab changes
  useEffect(() => {
    const { tab } = router.query;
    if (tab && typeof tab === 'string') {
      setActiveTab(tab);
    }
  }, [router.query]);

  // Mock token validation (replace with actual API call)
  const validateToken = async (token: string): Promise<AdminUser> => {
    // This would be an actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: '1',
          username: 'admin',
          email: 'admin@ngo.org',
          role: 'admin',
          lastLogin: new Date()
        });
      }, 1000);
    });
  };

  // Authentication handlers
  const handleLogin = async () => {
    try {
      setLoading(true);
      // This would be actual login API call
      const mockToken = 'mock-jwt-token';
      localStorage.setItem('adminToken', mockToken);
      
      const userData = await validateToken(mockToken);
      setCurrentUser(userData);
      setIsAuthenticated(true);
      
      showNotification('Successfully logged in!', 'success');
    } catch (error) {
      showNotification('Login failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveTab('dashboard');
    router.push('/admin');
    showNotification('Successfully logged out', 'info');
  };

  // Navigation handler
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/admin?tab=${tab}`, undefined, { shallow: true });
  };

  // Notification system
  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const notification: Notification = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date()
    };
    
    setNotifications(prev => [...prev, notification]);
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Render notification
  const NotificationComponent: React.FC<{ notification: Notification }> = ({ notification }) => {
    const iconMap = {
      success: CheckCircleIcon,
      error: XCircleIcon,
      info: InformationCircleIcon
    };
    
    const colorMap = {
      success: 'bg-green-50 border-green-200 text-green-800',
      error: 'bg-red-50 border-red-200 text-red-800',
      info: 'bg-blue-50 border-blue-200 text-blue-800'
    };
    
    const Icon = iconMap[notification.type];
    
    return (
      <div className={`border rounded-lg p-4 mb-2 flex items-center justify-between ${colorMap[notification.type]}`}>
        <div className="flex items-center">
          <Icon className="h-5 w-5 mr-2" />
          <span>{notification.message}</span>
        </div>
        <button
          onClick={() => removeNotification(notification.id)}
          className="text-sm opacity-70 hover:opacity-100"
        >
          ×
        </button>
      </div>
    );
  };

  // Render main content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <AdminDashboard 
            onNavigate={handleTabChange}
            showNotification={showNotification}
          />
        );
      
      case 'donations':
        return (
          <DonationManager 
            showNotification={showNotification}
          />
        );
      
      case 'content':
        return (
          <ContentManager 
            showNotification={showNotification}
          />
        );
      
      case 'media':
        return (
          <MediaManagerNew 
            showNotification={showNotification}
          />
        );
      
      case 'users':
        return (
          <UserManagement 
            showNotification={showNotification}
          />
        );
      
      case 'analytics':
        return (
          <AnalyticsSettings 
            showNotification={showNotification}
          />
        );
      
      case 'settings':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <NGOProfileSettings 
                showNotification={showNotification}
              />
              <PaymentSettings 
                showNotification={showNotification}
              />
            </div>
            <EmailTemplates 
              showNotification={showNotification}
            />
          </div>
        );
      
      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Page not found</h3>
            <p className="text-gray-500">The requested page could not be found.</p>
          </div>
        );
    }
  };

  // Show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Admin Login - NGO Management</title>
          <meta name="description" content="Admin login for NGO management system" />
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <LoginForm onLogin={handleLogin} />
      </>
    );
  }

  // Main admin panel
  return (
    <>
      <Head>
        <title>Admin Panel - NGO Management</title>
        <meta name="description" content="Comprehensive admin panel for NGO management" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="fixed top-2 right-2 z-50 w-80 sm:w-96 max-w-sm">
            {notifications.map(notification => (
              <NotificationComponent 
                key={notification.id} 
                notification={notification} 
              />
            ))}
          </div>
        )}

        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="flex justify-between items-center py-3 sm:py-4">
              <div className="flex items-center min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">NGO Admin Panel</h1>
                {currentUser && (
                  <span className="ml-2 sm:ml-4 text-xs sm:text-sm text-gray-500 hidden sm:inline">
                    Welcome, {currentUser.username}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
                {currentUser && (
                  <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600">
                    <span>Role: {currentUser.role}</span>
                    <span className="text-gray-400">|</span>
                    <span>
                      Last login: {currentUser.lastLogin.toLocaleDateString()}
                    </span>
                  </div>
                )}
                
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 pt-3 sm:pt-6">
          <AdminTabs 
            activeTab={activeTab} 
            onTabChange={handleTabChange} 
          />
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 pb-6 sm:pb-12">
          <div className="bg-white shadow-sm rounded-lg">
            {renderContent()}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-6 sm:mt-12">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-500 space-y-2 sm:space-y-0">
              <p>&copy; 2025 NGO Management System. All rights reserved.</p>
              <p>Version 1.0.0</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AdminPanel;