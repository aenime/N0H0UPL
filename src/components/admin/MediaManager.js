import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const MediaManager = ({ showNotification }) => {
  const [media, setMedia] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [bulkUploading, setBulkUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingMedia, setEditingMedia] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [newCategory, setNewCategory] = useState({ name: '', description: '', color: '#10B981' });
  const [showPostCardCreator, setShowPostCardCreator] = useState(false);
  const [selectedMediaForCard, setSelectedMediaForCard] = useState(null);
  
  const fileInputRef = useRef(null);
  const bulkFileInputRef = useRef(null);

  // Fetch media files
  const fetchMedia = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20'
      });
      
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }
      if (searchTerm) {
        params.append('search', searchTerm);
      }

      const response = await fetch(`/api/media?${params}`);
      const data = await response.json();
      
      if (data.success) {
        // Normalize media data to handle inconsistent field names
        const normalizedMedia = data.media.map(item => ({
          id: item.id || item._id?.toString() || `temp_${Date.now()}_${Math.random()}`,
          filename: item.filename || item.originalName || 'unknown',
          originalFilename: item.originalFilename || item.originalName || item.original_filename || item.filename,
          title: item.title || item.originalName || item.filename || 'Untitled',
          description: item.description || item.metadata?.description || '',
          category: item.category || 'uncategorized',
          fileType: item.fileType || (item.mimeType || item.mimetype || item.type || '').split('/')[0] || 'unknown',
          mimeType: item.mimeType || item.mimetype || item.type || 'unknown',
          size: item.size || 0,
          url: item.url || item.path || `/uploads/${item.filename}`,
          createdAt: item.createdAt || item.uploadedAt || item.uploaded_at || new Date().toISOString(),
          updatedAt: item.updatedAt || item.uploadedAt || item.uploaded_at || new Date().toISOString(),
          usedInPosts: item.usedInPosts || [],
          tags: item.tags || item.metadata?.tags || [],
          width: item.width || item.metadata?.width,
          height: item.height || item.metadata?.height,
          alt: item.alt || item.title || '',
          source: item.source || 'upload',
          status: item.status || 'active'
        }));
        
        setMedia(normalizedMedia);
        setTotalPages(data.pagination.total);
        setCurrentPage(data.pagination.current);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
      showNotification('Failed to fetch media files', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/media/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Handle bulk file upload
  const handleBulkUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    formData.append('category', selectedCategory === 'all' ? 'general' : selectedCategory);

    try {
      setBulkUploading(true);
      const response = await fetch('/api/media/bulk-upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        showNotification(`Successfully uploaded ${data.uploadedCount} files`, 'success');
        if (data.errorCount > 0) {
          showNotification(`${data.errorCount} files failed to upload`, 'warning');
        }
        fetchMedia(currentPage);
      } else {
        showNotification(data.error || 'Failed to upload files', 'error');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      showNotification('Failed to upload files', 'error');
    } finally {
      setBulkUploading(false);
      if (bulkFileInputRef.current) {
        bulkFileInputRef.current.value = '';
      }
    }
  };

  // Create new category
  const createCategory = async () => {
    if (!newCategory.name.trim()) {
      showNotification('Category name is required', 'error');
      return;
    }

    try {
      const response = await fetch('/api/media/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory)
      });

      const data = await response.json();
      if (data.success) {
        showNotification('Category created successfully', 'success');
        setNewCategory({ name: '', description: '', color: '#10B981' });
        setShowCategoryModal(false);
        fetchCategories();
      } else {
        showNotification(data.error || 'Failed to create category', 'error');
      }
    } catch (error) {
      console.error('Error creating category:', error);
      showNotification('Failed to create category', 'error');
    }
  };

  // Create PostCard from selected media
  const createPostCard = async (mediaItem) => {
    try {
      const postCardData = {
        id: `post_${Date.now()}`,
        image: mediaItem.url,
        name: mediaItem.title || 'Animal Name',
        breed: 'Unknown Breed',
        age: '2 years',
        gender: 'Unknown',
        weight: '15 kg',
        location: 'Animal Shelter',
        caretaker: 'Care Team',
        urgency: 'Medium',
        healthStatus: 'Healthy',
        vaccinated: true,
        neutered: false,
        personality: ['Friendly', 'Playful'],
        medicalNeeds: 'Regular checkup needed',
        rescueDate: new Date().toISOString().split('T')[0],
        tags: ['Rescued'],
        mediaId: mediaItem.id,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Link media to this post
      await fetch('/api/media/usage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mediaId: mediaItem.id,
          postId: postCardData.id,
          postType: 'postcard',
          postTitle: `PostCard for ${mediaItem.title}`
        })
      });

      // You can save this to your posts collection here if needed
      // await fetch('/api/posts', { method: 'POST', body: JSON.stringify(postCardData) });

      showNotification('PostCard created successfully! Media linked to post.', 'success');
      fetchMedia(currentPage); // Refresh to show updated usage
    } catch (error) {
      console.error('Error creating PostCard:', error);
      showNotification('Failed to create PostCard', 'error');
    }
  };

  // Initial load
  useEffect(() => {
    fetchCategories();
    fetchMedia();
  }, []);

  // Fetch media when filters change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchMedia(1);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [selectedCategory, searchTerm]);

  // Handle single file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', selectedCategory === 'all' ? 'general' : selectedCategory);

    try {
      setUploading(true);
      const response = await fetch('/api/media', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        showNotification('File uploaded successfully!');
        fetchMedia(currentPage);
      } else {
        showNotification(data.error, 'error');
      }
    } catch (error) {
      showNotification('Upload failed', 'error');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  // Delete media file
  const handleDelete = async (mediaId) => {
    if (!mediaId) {
      showNotification('Invalid media ID', 'error');
      return;
    }
    
    if (!confirm('Are you sure you want to delete this media file?')) return;

    try {
      const response = await fetch(`/api/media?id=${encodeURIComponent(mediaId)}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      if (data.success) {
        showNotification('Media deleted successfully!');
        fetchMedia(currentPage);
        // Also remove from selectedFiles if it was selected
        setSelectedFiles(prev => prev.filter(id => id !== mediaId));
      } else {
        showNotification(data.error || 'Failed to delete media', 'error');
        console.error('Delete failed:', data);
      }
    } catch (error) {
      console.error('Delete error:', error);
      showNotification('Delete failed - network or server error', 'error');
    }
  };

  // Update media metadata
  const handleUpdateMedia = async (mediaData) => {
    try {
      const response = await fetch('/api/media', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mediaData)
      });

      const data = await response.json();
      if (data.success) {
        showNotification('Media updated successfully!');
        setEditingMedia(null);
        fetchMedia(currentPage);
      } else {
        showNotification(data.error, 'error');
      }
    } catch (error) {
      showNotification('Update failed', 'error');
    }
  };

  // Enhanced createPostCard function - removed duplicate

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedFiles.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedFiles.length} selected files?`)) return;

    try {
      const deletePromises = selectedFiles.map(fileId =>
        fetch(`/api/media?id=${encodeURIComponent(fileId)}`, { method: 'DELETE' })
      );

      const results = await Promise.all(deletePromises);
      const successful = results.filter(r => r.ok).length;
      const failed = results.length - successful;
      
      if (successful > 0) {
        showNotification(`Successfully deleted ${successful}/${selectedFiles.length} files`);
      }
      if (failed > 0) {
        showNotification(`Failed to delete ${failed} files`, 'warning');
      }
      
      setSelectedFiles([]);
      fetchMedia(currentPage);
    } catch (error) {
      console.error('Bulk delete error:', error);
      showNotification('Failed to delete selected files', 'error');
    }
  };

  // Handle bulk category change
  const handleBulkCategoryChange = async () => {
    if (selectedFiles.length === 0) return;
    
    const newCategory = prompt('Enter new category ID for selected files:');
    if (!newCategory) return;

    try {
      const updatePromises = selectedFiles.map(fileId =>
        fetch('/api/media', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: fileId, category: newCategory })
        })
      );

      const results = await Promise.all(updatePromises);
      const successful = results.filter(r => r.ok).length;
      
      showNotification(`Successfully updated ${successful}/${selectedFiles.length} files`);
      setSelectedFiles([]);
      fetchMedia(currentPage);
    } catch (error) {
      showNotification('Failed to update selected files', 'error');
    }
  };

  // Handle file selection
  const handleFileSelect = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Clean up orphaned media entries (files that exist in DB but not on filesystem)
  const cleanupOrphanedMedia = async () => {
    if (!confirm('This will remove database entries for missing files. Continue?')) return;
    
    try {
      const response = await fetch('/api/media/cleanup', {
        method: 'POST'
      });
      
      const data = await response.json();
      if (data.success) {
        showNotification(`Cleaned up ${data.removed} orphaned entries`);
        fetchMedia(currentPage);
      } else {
        showNotification(data.error || 'Cleanup failed', 'error');
      }
    } catch (error) {
      console.error('Cleanup error:', error);
      showNotification('Cleanup failed', 'error');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-4 sm:mb-6 gap-3">
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Media Manager</h2>
          <div className="text-sm text-gray-600 mt-1 space-y-1 sm:space-y-0">
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              <span>Total: {media.length} files</span>
              <span className="hidden sm:inline">|</span>
              <span>Images: {media.filter(m => (m.fileType || m.mimeType || m.type || '').includes('image')).length}</span>
              <span className="hidden sm:inline">|</span>
              <span>Videos: {media.filter(m => (m.fileType || m.mimeType || m.type || '').includes('video')).length}</span>
              <span className="hidden sm:inline">|</span>
              <span>Connected: {media.filter(m => m.usedInPosts?.length > 0).length} posts</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          {selectedFiles.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 p-2 bg-gray-50 rounded-lg w-full sm:w-auto">
              <span className="text-sm text-gray-600">
                {selectedFiles.length} selected
              </span>
              <button
                onClick={() => setSelectedFiles([])}
                className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
              >
                Clear
              </button>
              <button
                onClick={handleBulkDelete}
                className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
              >
                <span className="hidden sm:inline">🗑️ Delete Selected</span>
                <span className="sm:hidden">🗑️ Delete</span>
              </button>
              <button
                onClick={handleBulkCategoryChange}
                className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
              >
                <span className="hidden sm:inline">📁 Change Category</span>
                <span className="sm:hidden">📁 Move</span>
              </button>
            </div>
          )}
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => setShowCategoryModal(true)}
              className="flex-1 sm:flex-none bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              <span className="hidden sm:inline">📁 Manage Categories</span>
              <span className="sm:hidden">📁 Categories</span>
            </button>
            <button
              onClick={cleanupOrphanedMedia}
              className="flex-1 sm:flex-none bg-yellow-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors text-sm sm:text-base"
              title="Remove database entries for missing files"
            >
              <span className="hidden sm:inline">🧹 Cleanup</span>
              <span className="sm:hidden">🧹</span>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex-1 sm:flex-none bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400 transition-colors text-sm sm:text-base"
            >
              {uploading ? (
                <span>Uploading...</span>
              ) : (
                <>
                  <span className="hidden sm:inline">📤 Upload File</span>
                  <span className="sm:hidden">📤 Upload</span>
                </>
              )}
            </button>
            <button
              onClick={() => bulkFileInputRef.current?.click()}
              disabled={bulkUploading}
              className="flex-1 sm:flex-none bg-orange-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-orange-700 disabled:bg-gray-400 transition-colors text-sm sm:text-base"
            >
              {bulkUploading ? (
                <span>Uploading...</span>
              ) : (
                <>
                  <span className="hidden sm:inline">📦 Bulk Upload</span>
                  <span className="sm:hidden">📦 Bulk</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex-1 min-w-64">
          <input
            type="text"
            placeholder="Search media files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          {media.length > 0 && (
            <button
              onClick={() => setSelectedFiles(selectedFiles.length === media.length ? [] : media.map(m => m.id))}
              className="text-sm bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300 whitespace-nowrap"
            >
              {selectedFiles.length === media.length ? '☑️ Deselect All' : '☐ Select All'}
            </button>
          )}
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            >
              <span className="hidden sm:inline">⊞ Grid</span>
              <span className="sm:hidden">⊞</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            >
              <span className="hidden sm:inline">☰ List</span>
              <span className="sm:hidden">☰</span>
            </button>
          </div>
        </div>
      </div>

      {/* Media Grid/List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading media files...</p>
        </div>
      ) : media.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No media files found</p>
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {media.map(item => (
                <MediaCard
                  key={item.id}
                  media={item}
                  onDelete={handleDelete}
                  onEdit={setEditingMedia}
                  onCreatePostCard={createPostCard}
                  categories={categories}
                  isSelected={selectedFiles.includes(item.id)}
                  onSelect={handleFileSelect}
                  setSelectedMediaForCard={setSelectedMediaForCard}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {media.map(item => (
                <MediaListItem
                  key={item.id}
                  media={item}
                  onDelete={handleDelete}
                  onEdit={setEditingMedia}
                  onCreatePostCard={createPostCard}
                  categories={categories}
                  formatFileSize={formatFileSize}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="flex gap-2">
                <button
                  onClick={() => fetchMedia(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 text-sm"
                >
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">‹</span>
                </button>
                <span className="px-3 py-2 text-gray-700 text-sm">
                  <span className="hidden sm:inline">Page {currentPage} of {totalPages}</span>
                  <span className="sm:hidden">{currentPage}/{totalPages}</span>
                </span>
                <button
                  onClick={() => fetchMedia(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 text-sm"
                >
                  <span className="hidden sm:inline">Next</span>
                  <span className="sm:hidden">›</span>
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Hidden file inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*,video/*"
        className="hidden"
      />
      <input
        type="file"
        ref={bulkFileInputRef}
        onChange={handleBulkUpload}
        accept="image/*,video/*"
        multiple
        className="hidden"
      />

      {/* Category Management Modal */}
      {showCategoryModal && (
        <CategoryModal
          categories={categories}
          onClose={() => setShowCategoryModal(false)}
          onUpdate={fetchCategories}
          showNotification={showNotification}
        />
      )}

      {/* Edit Media Modal */}
      {editingMedia && (
        <EditMediaModal
          media={editingMedia}
          categories={categories}
          onClose={() => setEditingMedia(null)}
          onUpdate={handleUpdateMedia}
        />
      )}

      {/* Media Usage Modal */}
      {selectedMediaForCard && (
        <MediaUsageModal
          media={selectedMediaForCard}
          onClose={() => setSelectedMediaForCard(null)}
          showNotification={showNotification}
        />
      )}
    </div>
  );
};

// Media Card Component for Grid View
const MediaCard = ({ media, onDelete, onEdit, onCreatePostCard, categories, isSelected, onSelect, setSelectedMediaForCard }) => {
  const category = categories.find(cat => cat.id === media.category);

  return (
    <div className={`bg-white border-2 rounded-lg overflow-hidden hover:shadow-md transition-all ${
      isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
    }`}>
      <div className="aspect-square relative bg-gray-100">
        {/* Selection checkbox */}
        <div className="absolute top-2 left-2 z-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(media.id)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
        </div>
        {(media.fileType || media.mimeType || media.type || '').includes('image') ? (
          <Image
            src={media.url}
            alt={media.title}
            fill
            className="object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : (media.fileType || media.mimeType || media.type || '').includes('video') ? (
          <video
            src={media.url}
            className="w-full h-full object-cover"
            muted
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl">📄</span>
          </div>
        )}
        {/* Error fallback for broken images */}
        <div className="w-full h-full flex items-center justify-center bg-gray-200" style={{ display: 'none' }}>
          <div className="text-center">
            <span className="text-2xl text-gray-400">🚫</span>
            <p className="text-xs text-gray-500 mt-1">Image not found</p>
          </div>
        </div>
        <div className="absolute top-2 right-2">
          <span
            className="px-2 py-1 text-xs text-white rounded"
            style={{ backgroundColor: category?.color || '#6B7280' }}
          >
            {category?.name || 'Uncategorized'}
          </span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm text-gray-900 truncate" title={media.title}>
          {media.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {(media.fileType || media.mimeType || media.type || 'unknown').split('/')[0].toUpperCase()} • {new Date(media.createdAt || media.uploadedAt || media.uploaded_at).toLocaleDateString()}
        </p>
        {media.usedInPosts && media.usedInPosts.length > 0 && (
          <div className="mt-2">
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              📎 Used in {media.usedInPosts.length} post{media.usedInPosts.length > 1 ? 's' : ''}
            </span>
          </div>
        )}
        <div className="flex gap-1 mt-2">
          <button
            onClick={() => onEdit(media)}
            className="flex-1 bg-blue-100 text-blue-700 text-xs py-1 px-2 rounded hover:bg-blue-200"
            title="Edit media details"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => onCreatePostCard(media)}
            className="flex-1 bg-green-100 text-green-700 text-xs py-1 px-2 rounded hover:bg-green-200"
            title="Create PostCard from this media"
          >
            🎨 Card
          </button>
          {media.usedInPosts && media.usedInPosts.length > 0 && (
            <button
              onClick={() => setSelectedMediaForCard(media)}
              className="flex-1 bg-purple-100 text-purple-700 text-xs py-1 px-2 rounded hover:bg-purple-200"
              title="View connected posts"
            >
              📊 Usage
            </button>
          )}
          <button
            onClick={() => onDelete(media.id)}
            className="bg-red-100 text-red-700 text-xs py-1 px-2 rounded hover:bg-red-200"
            title="Delete media file"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

// Media List Item Component for List View
const MediaListItem = ({ media, onDelete, onEdit, onCreatePostCard, categories, formatFileSize }) => {
  const category = categories.find(cat => cat.id === media.category);

  return (
    <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm">      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        {(media.fileType || media.mimeType || media.type || '').includes('image') ? (
          <Image
            src={media.url}
            alt={media.title}
            width={64}
            height={64}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentNode.classList.add('bg-gray-200');
              e.target.parentNode.innerHTML = '<div class="w-full h-full flex items-center justify-center"><span class="text-gray-400">🚫</span></div>';
            }}
          />
        ) : (media.fileType || media.mimeType || media.type || '').includes('video') ? (
          <video
            src={media.url}
            className="w-full h-full object-cover"
            muted
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentNode.classList.add('bg-gray-200');
              e.target.parentNode.innerHTML = '<div class="w-full h-full flex items-center justify-center"><span class="text-gray-400">🚫</span></div>';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-2xl">📄</span>
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">{media.title}</h3>
        <p className="text-sm text-gray-500 truncate">{media.description || 'No description'}</p>
        <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
          <span>{(media.fileType || media.mimeType || media.type || 'unknown').split('/')[0].toUpperCase()}</span>
          <span>{formatFileSize(media.size)}</span>
          <span
            className="px-2 py-1 text-white rounded"
            style={{ backgroundColor: category?.color || '#6B7280' }}
          >
            {category?.name || 'Uncategorized'}
          </span>
          <span>{new Date(media.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(media)}
          className="bg-blue-100 text-blue-700 text-sm py-1 px-3 rounded hover:bg-blue-200"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onCreatePostCard(media)}
          className="bg-green-100 text-green-700 text-sm py-1 px-3 rounded hover:bg-green-200"
        >
          🎨 Create Card
        </button>
        <button
          onClick={() => onDelete(media.id)}
          className="bg-red-100 text-red-700 text-sm py-1 px-3 rounded hover:bg-red-200"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

// Category Management Modal
const CategoryModal = ({ categories, onClose, onUpdate, showNotification }) => {
  const [newCategory, setNewCategory] = useState({ name: '', description: '', color: '#6B7280' });
  const [editingCategory, setEditingCategory] = useState(null);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.name.trim()) return;

    try {
      const response = await fetch('/api/media/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory)
      });

      const data = await response.json();
      if (data.success) {
        showNotification('Category created successfully!');
        setNewCategory({ name: '', description: '', color: '#6B7280' });
        onUpdate();
      } else {
        showNotification(data.error, 'error');
      }
    } catch (error) {
      showNotification('Failed to create category', 'error');
    }
  };

  const handleUpdateCategory = async (category) => {
    try {
      const response = await fetch('/api/media/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category)
      });

      const data = await response.json();
      if (data.success) {
        showNotification('Category updated successfully!');
        setEditingCategory(null);
        onUpdate();
      } else {
        showNotification(data.error, 'error');
      }
    } catch (error) {
      showNotification('Failed to update category', 'error');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const response = await fetch(`/api/media/categories?id=${categoryId}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      if (data.success) {
        showNotification('Category deleted successfully!');
        onUpdate();
      } else {
        showNotification(data.error, 'error');
      }
    } catch (error) {
      showNotification('Failed to delete category', 'error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] sm:max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold">Manage Categories</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl sm:text-base"
          >
            ✕
          </button>
        </div>

        {/* Create New Category */}
        <form onSubmit={handleCreateCategory} className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-3 text-sm sm:text-base">Create New Category</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              required
            />
            <input
              type="color"
              value={newCategory.color}
              onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md h-10"
            />
          </div>
          <textarea
            placeholder="Description (optional)"
            value={newCategory.description}
            onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            rows="2"
          />
          <button
            type="submit"
            className="mt-3 w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm sm:text-base"
          >
            Create Category
          </button>
        </form>

        {/* Existing Categories */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm sm:text-base">Existing Categories</h4>
          {categories.map(category => (
            <div key={category.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg gap-2 sm:gap-0">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded flex-shrink-0"
                  style={{ backgroundColor: category.color }}
                />
                <div className="min-w-0 flex-1">
                  <span className="font-medium text-sm sm:text-base">{category.name}</span>
                  {category.description && (
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{category.description}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2 self-end sm:self-auto">
                <button
                  onClick={() => setEditingCategory(category)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Category Modal */}
        {editingCategory && (
          <EditCategoryModal
            category={editingCategory}
            onClose={() => setEditingCategory(null)}
            onUpdate={handleUpdateCategory}
          />
        )}
      </div>
    </div>
  );
};

// Edit Category Modal
const EditCategoryModal = ({ category, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    id: category.id,
    name: category.name,
    description: category.description || '',
    color: category.color
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-base sm:text-lg font-bold">Edit Category</h4>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <input
            type="text"
            placeholder="Category Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            required
          />
          <input
            type="color"
            value={formData.color}
            onChange={(e) => setFormData({...formData, color: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md h-10"
          />
          <textarea
            placeholder="Description (optional)"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            rows="3"
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-sm sm:text-base"
            >
              Update Category
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Edit Media Modal
const EditMediaModal = ({ media, categories, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    id: media.id,
    title: media.title,
    description: media.description || '',
    category: media.category,
    tags: media.tags || []
  });

  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-base sm:text-lg font-bold">Edit Media</h4>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            required
          />
          
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          
          <textarea
            placeholder="Description (optional)"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            rows="3"
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Add tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={addTag}
                className="bg-gray-200 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-300 text-sm"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {formData.tags.map(tag => (
                <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-sm sm:text-base"
            >
              Update Media
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Media Usage Modal Component
const MediaUsageModal = ({ media, onClose, showNotification }) => {
  const [usage, setUsage] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsage();
  }, [media.id]);

  const fetchUsage = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/media/usage?mediaId=${media.id}`);
      const data = await response.json();
      
      if (data.success) {
        setUsage(data.usedInPosts || []);
      }
    } catch (error) {
      console.error('Error fetching usage:', error);
      showNotification('Failed to fetch media usage', 'error');
    } finally {
      setLoading(false);
    }
  };

  const unlinkFromPost = async (postId) => {
    if (!confirm('Are you sure you want to unlink this media from the post?')) return;

    try {
      const response = await fetch(`/api/media/usage?mediaId=${media.id}&postId=${postId}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      if (data.success) {
        showNotification('Media unlinked successfully');
        fetchUsage();
      } else {
        showNotification(data.error || 'Failed to unlink media', 'error');
      }
    } catch (error) {
      console.error('Error unlinking media:', error);
      showNotification('Failed to unlink media', 'error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] sm:max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold">Media Usage - {media.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl sm:text-base"
          >
            ✕
          </button>
        </div>

        <div className="mb-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="w-20 h-20 relative bg-gray-200 rounded flex-shrink-0">
              {(media.fileType || media.mimeType || media.type || '').includes('image') && (
                <Image
                  src={media.url}
                  alt={media.title}
                  fill
                  className="object-cover rounded"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gray-200 rounded"><span class="text-gray-400">🚫</span></div>';
                  }}
                />
              )}
              {!(media.fileType || media.mimeType || media.type || '').includes('image') && (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded">
                  <span className="text-gray-400">📄</span>
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-medium text-sm sm:text-base">{media.title}</h4>
              <p className="text-xs sm:text-sm text-gray-600">
                {(media.fileType || media.mimeType || media.type || 'unknown').split('/')[0].toUpperCase()} • {new Date(media.createdAt || media.uploadedAt || media.uploaded_at).toLocaleDateString()}
              </p>
              <p className="text-xs sm:text-sm text-blue-600">
                📎 Connected to {usage.length} post{usage.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">Loading usage data...</p>
          </div>
        ) : usage.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm sm:text-base">This media is not currently used in any posts.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 text-sm sm:text-base">Connected Posts:</h4>
            {usage.map((post, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg gap-2 sm:gap-0">
                <div className="min-w-0 flex-1">
                  <h5 className="font-medium text-sm">{post.postTitle}</h5>
                  <p className="text-xs text-gray-500">
                    Type: {post.postType} • Linked: {new Date(post.linkedAt).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-blue-600">Post ID: {post.postId}</p>
                </div>
                <div className="flex gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => unlinkFromPost(post.postId)}
                    className="bg-red-100 text-red-700 text-xs py-1 px-3 rounded hover:bg-red-200"
                  >
                    🔗 Unlink
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaManager;
