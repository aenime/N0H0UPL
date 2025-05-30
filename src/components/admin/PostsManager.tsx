import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  DocumentTextIcon, 
  PencilIcon, 
  TrashIcon,
  EyeIcon,
  PlusIcon,
  PhotoIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import MediaSelector from './media/MediaSelector';

interface MediaFile {
  id: string;
  name: string;
  path: string;
  category: string;
  description: string;
  uploadDate: string;
  fileSize: number;
  dimensions?: { width: number; height: number };
  alt: string;
}

interface MediaCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  count: number;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imagePath: string;
  category: string;
  publishDate: string;
  authorName: string;
  status: 'published' | 'draft';
  tags: string[];
  readTime: number;
  theme?: {
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    backgroundColor: string;
  };
  showOnHome?: boolean;
}

interface PostsManagerProps {
  showNotification?: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const PostsManager: React.FC<PostsManagerProps> = ({ showNotification }) => {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Successful Rescue of Injured Street Dog',
      content: 'Today we rescued a severely injured street dog from the highway. After emergency surgery and weeks of care, Charlie is now ready for adoption...',
      excerpt: 'Emergency rescue and recovery story of Charlie, a street dog who found hope.',
      imagePath: '/images/animals/dog1.jpg',
      category: 'Success Stories',
      publishDate: '2025-05-28',
      authorName: 'Dr. Priya Sharma',
      status: 'published',
      tags: ['rescue', 'dogs', 'success'],
      readTime: 5
    },
    {
      id: '2', 
      title: 'New Gaushala Facility Opens',
      content: 'We are excited to announce the opening of our new gaushala facility that can accommodate 50 cows...',
      excerpt: 'Expanding our capacity to care for rescued cattle with state-of-the-art facilities.',
      imagePath: '/images/animals/cow1.jpg',
      category: 'Announcements',
      publishDate: '2025-05-25',
      authorName: 'Admin Team',
      status: 'published',
      tags: ['gaushala', 'cows', 'facility'],
      readTime: 3
    },
    {
      id: '3',
      title: 'Community Awareness Program',
      content: 'Our upcoming community awareness program will focus on animal welfare and responsible pet ownership...',
      excerpt: 'Join us for an educational program about animal welfare in local communities.',
      imagePath: '/images/humans/workshop.jpg',
      category: 'Events',
      publishDate: '2025-05-30',
      authorName: 'Volunteer Team',
      status: 'draft',
      tags: ['education', 'community', 'awareness'],
      readTime: 4
    }
  ]);

  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['Success Stories', 'Announcements', 'Events', 'Medical Updates', 'Adoptions'];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const handleCreatePost = () => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: '',
      content: '',
      excerpt: '',
      imagePath: '',
      category: 'Success Stories',
      publishDate: new Date().toISOString().split('T')[0],
      authorName: '',
      status: 'draft',
      tags: [],
      readTime: 1,
      theme: {
        primaryColor: '#3B82F6',
        secondaryColor: '#DBEAFE',
        textColor: '#1E3A8A',
        backgroundColor: '#F8FAFC'
      },
      showOnHome: false
    };
    setEditingPost(newPost);
    setIsCreating(true);
  };

  const handleSavePost = (post: BlogPost) => {
    if (!post.title.trim() || !post.content.trim()) {
      showNotification?.('Please fill in title and content', 'error');
      return;
    }

    if (isCreating) {
      setPosts(prev => [...prev, post]);
      showNotification?.('Post created successfully', 'success');
    } else {
      setPosts(prev => prev.map(p => p.id === post.id ? post : p));
      showNotification?.('Post updated successfully', 'success');
    }
    
    setEditingPost(null);
    setIsCreating(false);
  };

  const handleDeletePost = (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(p => p.id !== postId));
      showNotification?.('Post deleted successfully', 'success');
    }
  };

  const handleToggleStatus = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, status: post.status === 'published' ? 'draft' : 'published' }
        : post
    ));
    showNotification?.('Post status updated', 'success');
  };

  const getStatusColor = (status: string) => {
    return status === 'published' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800';
  };

  if (editingPost) {
    return (
      <PostEditor 
        post={editingPost}
        categories={categories}
        onSave={handleSavePost}
        onCancel={() => {
          setEditingPost(null);
          setIsCreating(false);
        }}
        isCreating={isCreating}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Posts</p>
              <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
            </div>
            <DocumentTextIcon className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">
                {posts.filter(p => p.status === 'published').length}
              </p>
            </div>
            <EyeIcon className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-gray-900">
                {posts.filter(p => p.status === 'draft').length}
              </p>
            </div>
            <PencilIcon className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            </div>
            <CalendarIcon className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          
          <button
            onClick={handleCreatePost}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            Create Post
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 relative">
                {post.imagePath ? (
                  <Image
                    src={post.imagePath}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <PhotoIcon className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                    {post.status}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>{post.category}</span>
                  <span>{new Date(post.publishDate).toLocaleDateString('en-IN')}</span>
                  <span className="text-xs text-gray-500">{post.readTime} min read</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleToggleStatus(post.id)}
                      className={`text-sm px-2 py-1 rounded ${
                        post.status === 'published'
                          ? 'text-yellow-600 hover:text-yellow-800'
                          : 'text-green-600 hover:text-green-800'
                      }`}
                      title={post.status === 'published' ? 'Set to Draft' : 'Publish'}
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setEditingPost(post)}
                      className="text-green-600 hover:text-green-800"
                      title="Edit"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No posts found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filterCategory !== 'all' || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'Get started by creating your first post.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Post Editor Component
interface PostEditorProps {
  post: BlogPost;
  categories: string[];
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
  isCreating: boolean;
}

const PostEditor: React.FC<PostEditorProps> = ({ post, categories, onSave, onCancel, isCreating }) => {
  const [editedPost, setEditedPost] = useState<BlogPost>(post);
  const [tagInput, setTagInput] = useState('');
  const [showMediaSelector, setShowMediaSelector] = useState(false);
  const [mediaCategories, setMediaCategories] = useState<MediaCategory[]>([]);

  // Fetch media categories when component mounts
  useEffect(() => {
    fetchMediaCategories();
  }, []);

  const fetchMediaCategories = async () => {
    try {
      const response = await fetch('/api/media');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.categories) {
          setMediaCategories(data.categories);
        }
      }
    } catch (error) {
      console.error('Error fetching media categories:', error);
    }
  };

  const handleSelectMedia = (media: MediaFile) => {
    setEditedPost(prev => ({ ...prev, imagePath: media.path }));
    setShowMediaSelector(false);
  };

  const handleAddTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !editedPost.tags.includes(tag)) {
      setEditedPost(prev => ({ ...prev, tags: [...prev.tags, tag] }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setEditedPost(prev => ({ 
      ...prev, 
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          {isCreating ? 'Create New Post' : 'Edit Post'}
        </h2>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={editedPost.title}
              onChange={(e) => setEditedPost(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter post title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={editedPost.category}
              onChange={(e) => setEditedPost(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
          <input
            type="text"
            value={editedPost.excerpt}
            onChange={(e) => setEditedPost(prev => ({ ...prev, excerpt: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief description of the post"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
          <div className="space-y-4">
            {editedPost.imagePath ? (
              <div className="relative">
                <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={editedPost.imagePath}
                    alt="Featured image"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm text-gray-600">Featured image selected</span>
                  <div className="space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowMediaSelector(true)}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    >
                      Change Image
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditedPost(prev => ({ ...prev, imagePath: '' }))}
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div 
                onClick={() => setShowMediaSelector(true)}
                className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
              >
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Select Featured Image</h3>
                  <p className="mt-1 text-sm text-gray-500">Choose from your media library</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <textarea
            value={editedPost.content}
            onChange={(e) => setEditedPost(prev => ({ ...prev, content: e.target.value }))}
            rows={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Write your post content here..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
            <input
              type="text"
              value={editedPost.authorName}
              onChange={(e) => setEditedPost(prev => ({ ...prev, authorName: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Author name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Publish Date</label>
            <input
              type="date"
              value={editedPost.publishDate}
              onChange={(e) => setEditedPost(prev => ({ ...prev, publishDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={editedPost.status}
              onChange={(e) => setEditedPost(prev => ({ ...prev, status: e.target.value as 'published' | 'draft' }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        {/* Theme Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Post Theme</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Blue Ocean', primary: '#3B82F6', secondary: '#DBEAFE', text: '#1E3A8A', bg: '#F8FAFC' },
              { name: 'Green Nature', primary: '#10B981', secondary: '#D1FAE5', text: '#065F46', bg: '#F0FDF4' },
              { name: 'Purple Passion', primary: '#8B5CF6', secondary: '#EDE9FE', text: '#5B21B6', bg: '#FAF5FF' },
              { name: 'Orange Sunset', primary: '#F59E0B', secondary: '#FEF3C7', text: '#92400E', bg: '#FFFBEB' },
              { name: 'Red Alert', primary: '#EF4444', secondary: '#FEE2E2', text: '#991B1B', bg: '#FEF2F2' },
              { name: 'Gray Classic', primary: '#6B7280', secondary: '#F3F4F6', text: '#374151', bg: '#F9FAFB' }
            ].map((theme) => (
              <div
                key={theme.name}
                onClick={() => setEditedPost(prev => ({ 
                  ...prev, 
                  theme: {
                    primaryColor: theme.primary,
                    secondaryColor: theme.secondary,
                    textColor: theme.text,
                    backgroundColor: theme.bg
                  }
                }))}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  editedPost.theme?.primaryColor === theme.primary 
                    ? 'border-blue-500 ring-2 ring-blue-200' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                style={{ backgroundColor: theme.bg }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: theme.primary }}
                  ></div>
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: theme.secondary }}
                  ></div>
                </div>
                <p className="text-xs font-medium" style={{ color: theme.text }}>
                  {theme.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Home Page Display Option */}
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={editedPost.showOnHome || false}
              onChange={(e) => setEditedPost(prev => ({ ...prev, showOnHome: e.target.checked }))}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Show on Home Page</span>
          </label>
          <p className="text-xs text-gray-500 mt-1">This post will appear in the category section on the home page</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {editedPost.tags.map(tag => (
              <span key={tag} className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add tags"
            />
            <button
              onClick={handleAddTag}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(editedPost)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {isCreating ? 'Create Post' : 'Save Changes'}
        </button>
      </div>

      {/* Media Selector Modal */}
      <MediaSelector
        isOpen={showMediaSelector}
        onClose={() => setShowMediaSelector(false)}
        onSelectMedia={handleSelectMedia}
        selectedMediaId={editedPost.imagePath ? undefined : undefined}
        categories={mediaCategories}
      />
    </div>
  );
};

export default PostsManager;
