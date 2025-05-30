import React, { useState } from 'react';
import { 
  DocumentTextIcon, 
  TagIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

interface ContentManagerProps {
  onNavigate?: (tab: string) => void;
  showNotification?: (message: string, type?: 'success' | 'error' | 'info') => void;
}

// Lazy load components
const PostsManager = React.lazy(() => import('./PostsManager'));
const CategoryManager = React.lazy(() => import('./CategoryManager'));
const MediaManagerNew = React.lazy(() => import('./MediaManagerNew'));

const ContentManager: React.FC<ContentManagerProps> = ({ showNotification }) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'categories' | 'media'>('posts');

  const tabs = [
    {
      id: 'posts' as const,
      name: 'Posts',
      icon: DocumentTextIcon,
      description: 'Create and manage blog posts'
    },
    {
      id: 'categories' as const,
      name: 'Categories',
      icon: TagIcon,
      description: 'Manage post categories'
    },
    {
      id: 'media' as const,
      name: 'Media',
      icon: PhotoIcon,
      description: 'Upload and organize media files'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Content Management</h1>
        <p className="text-blue-100">Create and manage blog posts, categories, and media</p>
      </div>

      {/* Content Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5 mx-auto mb-1" />
                  <span className="block">{tab.name}</span>
                  <span className="hidden sm:block text-xs text-gray-400 mt-1">
                    {tab.description}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <React.Suspense 
            fallback={
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            }
          >
            {activeTab === 'posts' && <PostsManager showNotification={showNotification} />}
            {activeTab === 'categories' && <CategoryManager showNotification={showNotification} />}
            {activeTab === 'media' && <MediaManagerNew showNotification={showNotification} />}
          </React.Suspense>
        </div>
      </div>
    </div>
  );
};

export default ContentManager;