import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/common/Layout';
import dynamic from 'next/dynamic';

// Dynamic imports for admin components
const LoginForm = dynamic(() => import('../components/admin/LoginForm'), {
  ssr: false
});

const AdminDashboard = dynamic(() => import('../components/admin/AdminDashboard'), {
  ssr: false
});

const AdminTabs = dynamic(() => import('../components/admin/AdminTabs'), {
  ssr: false
});

const DonationManager = dynamic(() => import('../components/admin/DonationManager'), {
  ssr: false
});

const ContentManager = dynamic(() => import('../components/admin/ContentManager'), {
  ssr: false
});

const AnalyticsSettings = dynamic(() => import('../components/admin/AnalyticsSettings'), {
  ssr: false
});

const NGOProfileSettings = dynamic(() => import('../components/admin/NGOProfileSettings'), {
  ssr: false
});

const UserManagement = dynamic(() => import('../components/admin/UserManagement'), {
  ssr: false
});

// Notification system
interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  timestamp: Date;
}

// Notification Component
const NotificationItem: React.FC<{
  notification: Notification;
  onClose: (id: string) => void;
}> = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(notification.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification.id, onClose]);

  const bgColor = {
    success: 'bg-green-50 border-green-400',
    error: 'bg-red-50 border-red-400',
    info: 'bg-blue-50 border-blue-400'
  }[notification.type];

  const textColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    info: 'text-blue-800'
  }[notification.type];

  return (
    <div className={`fixed top-4 right-4 z-50 ${bgColor} border-l-4 p-4 rounded-md shadow-lg max-w-sm`}>
      <div className="flex items-center justify-between">
        <p className={`text-sm font-medium ${textColor}`}>
          {notification.message}
        </p>
        <button
          onClick={() => onClose(notification.id)}
          className={`ml-4 ${textColor} hover:opacity-75`}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const AdminPanel: React.FC = () => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Notification system
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Check for existing authentication on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authStatus = localStorage.getItem('adminAuth');
      if (authStatus === 'true') {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Authentication handlers
  const handleLogin = () => {
    setIsAuthenticated(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminAuth', 'true');
    }
    showNotification('Successfully logged in!', 'success');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('dashboard');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminAuth');
    }
    showNotification('Successfully logged out!', 'info');
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
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Tab navigation handler
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Render active component based on tab
  const renderActiveComponent = () => {
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
            onNavigate={handleTabChange}
            showNotification={showNotification}
          />
        );
      
      case 'content':
        return (
          <ContentManager 
            showNotification={showNotification}
          />
        );
      
      case 'analytics':
        return (
          <AnalyticsSettings 
            showNotification={showNotification}
          />
        );

      case 'users':
        return (
          <UserManagement 
            showNotification={showNotification}
          />
        );

      case 'settings':
        return (
          <NGOProfileSettings 
            showNotification={showNotification}
          />
        );

      default:
        return (
          <AdminDashboard 
            onNavigate={handleTabChange}
            showNotification={showNotification}
          />
        );
    }
  };

  // Login page
  if (!isAuthenticated) {
    return (
      <Layout>
        <Head>
          <title>Admin Login | Karuna For All</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        
        <LoginForm onLogin={handleLogin} />
        
        {/* Notifications */}
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClose={removeNotification}
          />
        ))}
      </Layout>
    );
  }

  // Main admin panel
  return (
    <Layout>
      <Head>
        <title>Admin Panel | Karuna For All</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              Logout
            </button>
          </div>
          
          {/* Navigation Tabs */}
          <AdminTabs 
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
          
          {/* Main Content */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            {renderActiveComponent()}
          </div>
        </div>
      </div>
      
      {/* Notifications */}
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={removeNotification}
        />
      ))}
    </Layout>
  );
};

export default AdminPanel;
