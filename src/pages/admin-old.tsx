import React, { useState, useEffect, useRef } from 'react';
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

const MediaManagerNew = dynamic(() => import('../components/admin/MediaManagerNew'), {
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

// Additional components for complete admin panel
const PaymentSettings = dynamic(() => import('../components/admin/PaymentSettings'), {
  ssr: false,
  loading: () => <div className="p-6"><div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div></div>
});

const EmailTemplates = dynamic(() => import('../components/admin/EmailTemplates'), {
  ssr: false,
  loading: () => <div className="p-6"><div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div></div>
});

const Analytics = dynamic(() => import('../components/admin/Analytics'), {
  ssr: false,
  loading: () => <div className="p-6"><div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div></div>
});

// Notification system
interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  timestamp: Date;
}

const AdminPanel: React.FC = () => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Notification system
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Blog post management state
  const [newBlogPost, setNewBlogPost] = useState({
    title: '',
    content: '',
    imageUrl: '',
    category: 'Success Stories',
    authorName: '',
    status: 'draft'
  });

  // Additional state variables for functionality
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [bulkFiles, setBulkFiles] = useState<File[]>([]);
  const [bulkPreviews, setBulkPreviews] = useState<string[]>([]);
  const [animalPhotos, setAnimalPhotos] = useState<any[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminAuth');
    }
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
      
      case 'media':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Media Library</h2>
            <p className="text-gray-600">Media management component coming soon...</p>
          </div>
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
  
  const handleAddOrUpdateBlogPost = async () => {
    if (!newBlogPost.title || !newBlogPost.content || !newBlogPost.authorName) {
      alert('Please fill all fields');
      return;
    }
    
    const today = new Date().toISOString().split('T')[0];
    const mockImagePath = '/images/animals/dog1.jpg';
    
    // This function is deprecated - blog post management is now handled by ContentManager component
    showNotification('Blog post management is now handled in the Content tab', 'info');
    
    // Reset form
    setNewBlogPost({
      title: '',
      content: '',
      imageUrl: '',
      category: 'Success Stories',
      authorName: '',
      status: 'draft'
    });
    
    alert('Blog post added successfully!');
  };

  // Handle bulk file selection for animal photos
  const handleBulkFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setBulkFiles(filesArray);
      
      // Create preview URLs for all files
      const previewsArray = filesArray.map(file => {
        return URL.createObjectURL(file);
      });
      setBulkPreviews(previewsArray);
    }
  };
  
  // Clear bulk upload selection
  const clearBulkUpload = () => {
    setBulkFiles([]);
    setBulkPreviews([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle removing an animal photo
  const handleRemoveAnimalPhoto = (id: string) => {
    if (confirm('Are you sure you want to delete this photo?')) {
      setAnimalPhotos(animalPhotos.filter(photo => photo.id !== id));
    }
  };
  
  const handleAddBlogPost = () => { // eslint-disable-line @typescript-eslint/no-unused-vars
    if (!newBlogPost.title || !newBlogPost.content || !newBlogPost.authorName) {
      alert('Please fill all required fields');
      return;
    }
    
    const today = new Date().toISOString().split('T')[0];
    const mockImagePath = '/images/animals/dog1.jpg';
    
    setBlogPosts([
      ...blogPosts,
      { 
        id: `${blogPosts.length + 1}`, 
        title: newBlogPost.title,
        content: newBlogPost.content,
        imagePath: newBlogPost.imageUrl || mockImagePath,
        category: newBlogPost.category,
        publishDate: today,
        authorName: newBlogPost.authorName,
        status: newBlogPost.status
      }
    ]);
    
    // Reset form
    setNewBlogPost({
      title: '',
      content: '',
      imageUrl: '',
      category: 'Success Stories',
      authorName: '',
      status: 'draft'
    });
    
    alert('Blog post added successfully!');
  };

  // Define function for bulk upload
  const handleBulkUpload = () => { // eslint-disable-line @typescript-eslint/no-unused-vars
    // In a real app, this would upload multiple files to a server
    alert('Bulk upload functionality would be implemented here in a production app');
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <Head>
          <title>Admin Login | Karuna For All</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Admin Login
              </h2>
            </div>
            
            {loginError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">
                      {loginError}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="username" className="sr-only">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Username"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-400"
                >
                  {isLoading ? (
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                  ) : (
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <svg className="h-5 w-5 text-green-500 group-hover:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>
            
            <div className="mt-4 text-center text-sm text-gray-600">
              <p>For demo: Username = "admin", Password = "admin123"</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Admin Panel | Karuna For All</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7z" clipRule="evenodd" />
                <path d="M4 8a1 1 0 011-1h4a1 1 0 110 2H5a1 1 0 01-1-1z" />
              </svg>
              Logout
            </button>
          </div>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                <button
                  className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                    activeTab === 'upi'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('upi')}
                >
                  UPI Management
                </button>
                <button
                  className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                    activeTab === 'tracking'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('tracking')}
                >
                  Tracking Codes
                </button>
                <button
                  className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                    activeTab === 'donors'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('donors')}
                >
                  Donor Data
                </button>
                <button
                  className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                    activeTab === 'photos'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('photos')}
                >
                  Animal Photos
                </button>
                <button
                  className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                    activeTab === 'blog'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('blog')}
                >
                  Website Posts
                </button>
                <button
                  className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                    activeTab === 'services'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('services')}
                >
                  Service Categories
                </button>
                <button
                  className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                    activeTab === 'navigation'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('navigation')}
                >
                  Navigation
                </button>
              </nav>
            </div>
            
            {/* UPI Management Tab */}
            {activeTab === 'upi' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">UPI Payment Settings</h2>
                
                {/* Add New UPI */}
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h3 className="font-medium text-gray-700 mb-3">Add New UPI ID</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 mb-1">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        id="upiId"
                        value={newUpi.upiId}
                        onChange={(e) => setNewUpi({...newUpi, upiId: e.target.value})}
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g., name@ybl"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={handleAddUpi}
                        className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Add UPI
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* UPI List */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          UPI ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {upiSettings.map((upi) => (
                        <tr key={upi.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              value={upi.upiId}
                              onChange={(e) => handleUpdateUpi(upi.id, 'upiId', e.target.value)}
                              className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${upi.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {upi.active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleToggleUpiActive(upi.id)}
                              className={`mr-3 px-3 py-1 rounded ${
                                upi.active
                                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                  : 'bg-green-100 text-green-700 hover:bg-green-200'
                              }`}
                            >
                              {upi.active ? 'Deactivate' : 'Activate'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* Tracking Codes Tab */}
            {activeTab === 'tracking' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Tracking Code Settings</h2>
                <form onSubmit={handleUpdateTrackingCode}>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="facebookPixelId" className="block text-sm font-medium text-gray-700 mb-1">
                        Facebook Pixel ID
                      </label>
                      <input
                        type="text"
                        id="facebookPixelId"
                        value={trackingCodes.facebookPixelId}
                        onChange={(e) => setTrackingCodes({...trackingCodes, facebookPixelId: e.target.value})}
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Example: FB-12345678
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="googleAnalyticsId" className="block text-sm font-medium text-gray-700 mb-1">
                        Google Analytics Measurement ID
                      </label>
                      <input
                        type="text"
                        id="googleAnalyticsId"
                        value={trackingCodes.googleAnalyticsId}
                        onChange={(e) => setTrackingCodes({...trackingCodes, googleAnalyticsId: e.target.value})}
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Example: G-XXXXXXXXXX
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="googleTagManagerId" className="block text-sm font-medium text-gray-700 mb-1">
                        Google Tag Manager ID
                      </label>
                      <input
                        type="text"
                        id="googleTagManagerId"
                        value={trackingCodes.googleTagManagerId}
                        onChange={(e) => setTrackingCodes({...trackingCodes, googleTagManagerId: e.target.value})}
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Example: GTM-XXXXXX
                      </p>
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
            
            {/* Donor Data Tab */}
            {activeTab === 'donors' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Recent Donations</h2>
                  <div className="bg-green-100 px-4 py-2 rounded-lg">
                    <p className="text-sm font-medium text-green-800">
                      Total Donations: <span className="text-xl">₹{totalDonationAmount.toLocaleString('en-IN')}</span>
                    </p>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount (₹)
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Method
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Purpose
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {donors.map((donor) => (
                        <tr key={donor.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {donor.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {donor.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            ₹{donor.amount.toLocaleString('en-IN')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {donor.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {donor.paymentMethod}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {donor.purpose}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination Example */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      Previous
                    </a>
                    <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      Next
                    </a>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">{donors.length}</span> of <span className="font-medium">{donors.length}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                          <span className="sr-only">Previous</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                          1
                        </a>
                        <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                          <span className="sr-only">Next</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </a>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Animal Photos Tab */}
            {activeTab === 'photos' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Photo Management</h2>
                
                {/* Add New Photo */}
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h3 className="font-medium text-gray-700 mb-3">Add New Photo</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name/Title
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={newAnimalPhoto.name}
                        onChange={(e) => setNewAnimalPhoto({...newAnimalPhoto, name: e.target.value})}
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g., Charlie or Education Workshop"
                      />
                    </div>
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        id="category"
                        value={newAnimalPhoto.category}
                        onChange={(e) => setNewAnimalPhoto({...newAnimalPhoto, category: e.target.value})}
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        {animalCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        id="description"
                        value={newAnimalPhoto.description}
                        onChange={(e) => setNewAnimalPhoto({...newAnimalPhoto, description: e.target.value})}
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Brief description of the photo"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                        Image
                      </label>
                      <input
                        type="file"
                        id="image"
                        onChange={handleFileSelect}
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        accept="image/*"
                      />
                      {previewUrl && (
                        <div className="mt-2">
                          <img src={previewUrl} alt="Preview" className="h-20 w-auto object-cover rounded-md" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={handleAddAnimalPhoto}
                      className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Add Photo
                    </button>
                  </div>
                </div>
                
                {/* Bulk Upload Section */}
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h3 className="font-medium text-gray-700 mb-3">Bulk Upload Photos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label htmlFor="bulkCategory" className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        id="bulkCategory"
                        value={bulkCategory}
                        onChange={(e) => setBulkCategory(e.target.value)}
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        {animalCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="bulkImage" className="block text-sm font-medium text-gray-700 mb-1">
                        Images
                      </label>
                      <input
                        type="file"
                        id="bulkImage"
                        onChange={handleBulkFileSelect}
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        accept="image/*"
                        multiple
                        ref={fileInputRef}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={handleBulkUpload}
                      className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Upload Photos
                    </button>
                    <button
                      onClick={clearBulkUpload}
                      className="ml-2 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Clear Selection
                    </button>
                  </div>
                  {bulkPreviews.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {bulkPreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img src={preview} alt={`Bulk preview ${index + 1}`} className="w-full h-auto object-cover rounded-md" />
                          <button
                            onClick={() => {
                              const newPreviews = bulkPreviews.filter((_, i) => i !== index);
                              setBulkPreviews(newPreviews);
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Category Filter */}
                <div className="mb-4">
                  <label htmlFor="categoryFilter" className="block text-sm font-medium text-gray-700 mb-1">
                    Filter by Category
                  </label>
                  <select
                    id="categoryFilter"
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-48 sm:text-sm border-gray-300 rounded-md"
                    onChange={() => {
                      // This would filter photos in a real implementation
                    }}
                  >
                    <option value="">All Categories</option>
                    {animalCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Photos Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
                  {animalPhotos.map((photo) => (
                    <div key={photo.id} className="bg-white rounded-lg shadow overflow-hidden">
                      <div className="h-48 w-full relative">
                        <img 
                          src={photo.imagePath} 
                          alt={photo.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-medium text-gray-900">{photo.name}</h3>
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {photo.category}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{photo.description}</p>
                        <p className="mt-1 text-xs text-gray-400">Added on: {photo.uploadDate}</p>
                        <div className="mt-3 flex justify-end">
                          <button
                            onClick={() => handleRemoveAnimalPhoto(photo.id)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none"
                          >
                            <svg className="mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Empty State */}
                {animalPhotos.length === 0 && (
                  <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                    <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">No photos added yet</p>
                    <p className="mt-1 text-sm text-gray-500">Add your first photo using the form above</p>
                  </div>
                )}
              </div>
            )}

            {/* Blog Posts Tab */}
            {activeTab === 'blog' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Blog Posts Management</h2>
                
                {/* Add New Blog Post */}
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h3 className="font-medium text-gray-700 mb-3">Add New Blog Post</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={newBlogPost.title}
                        onChange={(e) => setNewBlogPost({...newBlogPost, title: e.target.value})}
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Blog post title"
                      />
                    </div>
                    <div>
                      <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-1">
                        Author Name
                      </label>
                      <input
                        type="text"
                        id="authorName"
                        value={newBlogPost.authorName}
                        onChange={(e) => setNewBlogPost({...newBlogPost, authorName: e.target.value})}
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Author name"
                      />
                    </div>
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        id="category"
                        value={newBlogPost.category}
                        onChange={(e) => setNewBlogPost({...newBlogPost, category: e.target.value})}
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        {postCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                        Image
                      </label>
                      <input
                        type="file"
                        id="image"
                        onChange={(_) => {
                          if (_.target.files && _.target.files[0]) {
                            const file = _.target.files[0];
                            setSelectedPostFile(file);
                            
                            // Create preview URL
                            const reader = new FileReader();
                            reader.onload = () => {
                              setPostPreviewUrl(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        accept="image/*"
                      />
                      {postPreviewUrl && (
                        <div className="mt-2">
                          <img src={postPreviewUrl} alt="Preview" className="h-20 w-auto object-cover rounded-md" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 col-span-4">
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                      Content
                    </label>
                    <textarea
                      id="content"
                      value={newBlogPost.content}
                      onChange={(e) => setNewBlogPost({...newBlogPost, content: e.target.value})}
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter the blog post content here..."
                      rows={6}
                    />
                  </div>
                  <div className="mt-4 col-span-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input
                          id="status-draft"
                          name="status"
                          type="radio"
                          checked={newBlogPost.status === 'draft'}
                          onChange={() => setNewBlogPost({...newBlogPost, status: 'draft'})}
                          className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                        />
                        <label htmlFor="status-draft" className="ml-2 block text-sm text-gray-700">
                          Draft
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="status-published"
                          name="status"
                          type="radio"
                          checked={newBlogPost.status === 'published'}
                          onChange={() => setNewBlogPost({...newBlogPost, status: 'published'})}
                          className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                        />
                        <label htmlFor="status-published" className="ml-2 block text-sm text-gray-700">
                          Published
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button 
                      type="submit"
                      onClick={handleAddOrUpdateBlogPost} // Changed from handleAddBlogPost
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      {editingPostId ? 'Update Post' : 'Add Post'}
                    </button>
                  </div>
                </div>
                
                {/* Blog Posts List */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Author
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {blogPosts.map((post) => (
                        <tr key={post.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {post.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {post.authorName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {post.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {post.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => {
                                // Edit post functionality here
                              }}
                              className="mr-3 text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this blog post?')) {
                                  setBlogPosts(blogPosts.filter(p => p.id !== post.id));
                                }
                              }}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Blog Posts List with Expanded View */}
                <div className="space-y-4">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="bg-white shadow rounded-lg overflow-hidden">
                      <div className="border-b border-gray-200">
                        <div className="px-4 py-5 sm:px-6 flex justify-between">
                          <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                              {post.title}
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                              {post.authorName} • {post.publishDate} • 
                              <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {post.status}
                              </span>
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                // Toggle post status
                                setBlogPosts(blogPosts.map(p => 
                                  p.id === post.id 
                                    ? {...p, status: p.status === 'published' ? 'draft' : 'published'} 
                                    : p
                                ));
                              }}
                              className={`px-3 py-1 text-xs font-medium rounded ${
                                post.status === 'published'
                                  ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                  : 'bg-green-100 text-green-800 hover:bg-green-200'
                              }`}
                            >
                              {post.status === 'published' ? 'Set to Draft' : 'Publish'}
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this blog post?')) {
                                  setBlogPosts(blogPosts.filter(p => p.id !== post.id));
                                }
                              }}
                              className="bg-red-100 text-red-800 hover:bg-red-200 px-3 py-1 text-xs font-medium rounded"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-5 sm:p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="md:w-1/3">
                            <div className="bg-gray-100 rounded-lg overflow-hidden">
                              <div className="relative h-48 w-full">
                                <img
                                  src={post.imagePath}
                                  alt={post.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="p-2 bg-gray-50">
                                <span className="text-xs text-gray-500">Featured image</span>
                              </div>
                            </div>
                            <div className="mt-2 text-sm text-gray-500">
                              <span className="font-medium">Category:</span> {post.category}
                            </div>
                            <div className="mt-4">
                              <button
                                onClick={() => {
                                  // Edit functionality would go here in a real implementation
                                }}
                                className="bg-indigo-100 text-indigo-700 px-3 py-1 text-sm font-medium rounded hover:bg-indigo-200"
                              >
                                Edit Post
                              </button>
                            </div>
                          </div>
                          <div className="md:w-2/3">
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Post Content:</h4>
                            <div className="prose max-w-none border border-gray-200 rounded-md p-4 bg-white">
                              <p>{post.content}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty State for Blog Posts */}
                {blogPosts.length === 0 && (
                  <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h5m-1-9h4m-2-2v4" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">No blog posts added yet</p>
                    <p className="mt-1 text-sm text-gray-500">Add your first post using the form above</p>
                  </div>
                )}
              </div>
            )}

            {/* Service Categories Tab */}
            {activeTab === 'services' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Service Categories Management</h2>

                {/* Add New Category */}
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h3 className="font-medium text-gray-700 mb-3">Add New Category</h3>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newServiceCategory}
                      onChange={(e) => setNewServiceCategory(e.target.value)}
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Category name"
                    />
                    <button
                      onClick={handleAddServiceCategory}
                      className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Existing Categories List */}
                <div className="bg-white p-4 rounded-md shadow">
                  <h3 className="font-medium text-gray-700 mb-3">Existing Categories</h3>
                  <ul className="divide-y divide-gray-200">
                    {serviceCategories.map((category) => (
                      <li key={category} className="flex justify-between items-center py-2">
                        <span>{category}</span>
                        <button
                          onClick={() => handleRemoveServiceCategory(category)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                    {serviceCategories.length === 0 && (
                      <li className="py-2 text-gray-500">No categories available</li>
                    )}
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Tab */}
            {activeTab === 'navigation' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Navigation Management</h2>

                {/* Add New Navigation Item */}
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h3 className="font-medium text-gray-700 mb-3">Add New Menu Item</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      value={newNavLabel}
                      onChange={(e) => setNewNavLabel(e.target.value)}
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Label (e.g., Home)"
                    />
                    <input
                      type="text"
                      value={newNavPath}
                      onChange={(e) => setNewNavPath(e.target.value)}
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Path (e.g., /)"
                    />
                    <button
                      onClick={handleAddNavItem}
                      className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                    >
                      Add Item
                    </button>
                  </div>
                </div>

                {/* Existing Navigation Items */}
                <div className="bg-white p-4 rounded-md shadow">
                  <h3 className="font-medium text-gray-700 mb-3">Existing Menu Items</h3>
                  <ul className="divide-y divide-gray-200">
                    {navItems.map((item) => (
                      <li key={item.path} className="flex justify-between items-center py-2">
                        <div>
                          <span className="font-medium">{item.label}</span> <span className="text-gray-500">({item.path})</span>
                        </div>
                        <button
                          onClick={() => handleRemoveNavItem(item.path)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                    {navItems.length === 0 && (
                      <li className="py-2 text-gray-500">No menu items</li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPanel;