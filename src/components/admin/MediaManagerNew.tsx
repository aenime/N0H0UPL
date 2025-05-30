import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import MediaLibraryStats from './media/MediaLibraryStats';
import MediaLibraryControls from './media/MediaLibraryControls';
import MediaCategoriesSection from './media/MediaCategoriesSection';
import MediaGridView from './media/MediaGridView';
import MediaListView from './media/MediaListView';
import MediaEditModal from './media/MediaEditModal';
import CategoryModal from './media/CategoryModal';
import WebsiteScraperTab from './media/WebsiteScraperTab';

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

interface MediaManagerProps {
  showNotification?: (message: string, type?: 'success' | 'error' | 'info') => void;
}

interface ScrapedMedia {
  id: string;
  url: string;
  name: string;
  type: 'image' | 'video';
  dimensions?: { width: number; height: number };
  fileSize: number;
  alt: string;
  selected: boolean;
  error?: string;
}

interface ScrapeFilters {
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  minFileSize: number; // in KB
  maxFileSize: number; // in KB
  formats: string[];
  includeAltText: boolean;
  includeVideos: boolean;
}

const MediaManager: React.FC<MediaManagerProps> = ({ showNotification }) => {
  const [media, setMedia] = useState<MediaFile[]>([]);

  const [categories, setCategories] = useState<MediaCategory[]>([
    { id: '1', name: 'animals', description: 'Photos of rescued animals', color: '#10B981', count: 0 },
    { id: '2', name: 'facilities', description: 'NGO facilities and infrastructure', color: '#3B82F6', count: 0 },
    { id: '3', name: 'medical', description: 'Medical treatments and procedures', color: '#EF4444', count: 0 },
    { id: '4', name: 'events', description: 'Community events and workshops', color: '#8B5CF6', count: 0 },
    { id: '5', name: 'scraped', description: 'Images imported from website scraper', color: '#F59E0B', count: 0 },
    { id: '6', name: 'uncategorized', description: 'Uncategorized media files', color: '#6B7280', count: 0 }
  ]);

  // Website Scraping State
  const [activeTab, setActiveTab] = useState<'library' | 'scraper'>('library');
  const [scrapeUrl, setScrapeUrl] = useState('');
  const [scraping, setScraping] = useState(false);
  const [scrapedMedia, setScrapedMedia] = useState<ScrapedMedia[]>([]);
  const [selectedScrapedMedia, setSelectedScrapedMedia] = useState<string[]>([]);
  const [importing, setImporting] = useState(false);
  const [scrapeFilters, setScrapeFilters] = useState<ScrapeFilters>({
    minWidth: 100,
    maxWidth: 2000,
    minHeight: 100,
    maxHeight: 2000,
    minFileSize: 0,
    maxFileSize: 5000,
    formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    includeAltText: true,
    includeVideos: false
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [editingMedia, setEditingMedia] = useState<MediaFile | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch media data from API
  useEffect(() => {
    fetchMediaData();
  }, []);

  const fetchMediaData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/media');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.media) {
          // Transform API data to match component interface
          const transformedMedia: MediaFile[] = data.media.map((item: any) => {
            // Safe date handling to prevent RangeError
            let uploadDate = '';
            try {
              const dateObj = new Date(item.createdAt || item.uploadDate || Date.now());
              if (isNaN(dateObj.getTime())) {
                // If date is invalid, use current date
                uploadDate = new Date().toISOString().split('T')[0];
              } else {
                uploadDate = dateObj.toISOString().split('T')[0];
              }
            } catch (error) {
              // Fallback to current date if any error occurs
              uploadDate = new Date().toISOString().split('T')[0];
            }

            return {
              id: item.id || item._id,
              name: item.originalFilename || item.filename,
              path: item.url,
              category: item.category || 'uncategorized',
              description: item.description || '',
              uploadDate,
              fileSize: item.size,
              dimensions: item.width && item.height ? { width: item.width, height: item.height } : undefined,
              alt: item.title || item.originalFilename || item.filename
            };
          });
          setMedia(transformedMedia);
          
          // Update categories with actual counts
          const categoryCount = transformedMedia.reduce((acc, file) => {
            const category = file.category.toLowerCase();
            acc[category] = (acc[category] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);
          
          setCategories(prev => prev.map(cat => ({
            ...cat,
            count: categoryCount[cat.name.toLowerCase()] || 0
          })));
        }
      }
    } catch (error) {
      console.error('Error fetching media:', error);
      showNotification?.('Failed to load media files', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filteredMedia = media.filter(file => {
    const matchesCategory = selectedCategory === 'all' || 
                           file.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.alt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', file.name);
        formData.append('description', '');
        formData.append('category', selectedCategory === 'all' ? 'animals' : selectedCategory.toLowerCase());

        const response = await fetch('/api/media', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }
      }

      // Refresh media data after upload
      await fetchMediaData();
      showNotification?.(`${files.length} file(s) uploaded successfully`, 'success');
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
      showNotification?.('Failed to upload files', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteFiles = async () => {
    if (selectedFiles.length === 0) return;
    
    if (confirm(`Delete ${selectedFiles.length} selected file(s)?`)) {
      try {
        // Delete each file from the API
        for (const fileId of selectedFiles) {
          const response = await fetch(`/api/media?id=${fileId}`, {
            method: 'DELETE',
          });
          
          if (!response.ok) {
            throw new Error(`Failed to delete file ${fileId}`);
          }
        }
        
        // Refresh media data after deletion
        await fetchMediaData();
        setSelectedFiles([]);
        showNotification?.(`${selectedFiles.length} file(s) deleted`, 'success');
      } catch (error) {
        console.error('Delete error:', error);
        showNotification?.('Failed to delete files', 'error');
      }
    }
  };

  const handleFileSelect = (fileId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedFiles(prev => [...prev, fileId]);
    } else {
      setSelectedFiles(prev => prev.filter(id => id !== fileId));
    }
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredMedia.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredMedia.map(file => file.id));
    }
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getTotalStorageUsed = () => {
    return media.reduce((total, file) => total + file.fileSize, 0);
  };

  // Website Scraping Functions
  const handleScrapeMedia = async () => {
    if (!scrapeUrl.trim()) {
      showNotification?.('Please enter a valid URL', 'error');
      return;
    }

    try {
      new URL(scrapeUrl);
    } catch (error) {
      showNotification?.('Please enter a valid URL', 'error');
      return;
    }

    setScraping(true);
    setScrapedMedia([]);
    setSelectedScrapedMedia([]);

    try {
      const response = await fetch('/api/admin/media/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          url: scrapeUrl, 
          filters: scrapeFilters 
        }),
      });

      console.log('Scraper response status:', response.status);
      
      const data = await response.json();
      console.log('Scraper response data:', data);
      
      if (!response.ok || data.success === false) {
        console.error('Scraper API error:', data);
        throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      if (!data.media) {
        console.warn('API returned success but no media array was found');
        data.media = [];
      }
      
      setScrapedMedia(data.media || []);
      showNotification?.(`Found ${data.media?.length || 0} media files`, 'success');
    } catch (error) {
      console.error('Scraping error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      showNotification?.(`Failed to scrape media: ${errorMessage}`, 'error');
    } finally {
      setScraping(false);
    }
  };

  const handleSelectScrapedMedia = (mediaId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedScrapedMedia(prev => [...prev, mediaId]);
    } else {
      setSelectedScrapedMedia(prev => prev.filter(id => id !== mediaId));
    }
  };

  const handleSelectAllScrapedMedia = () => {
    const validMedia = scrapedMedia.filter(media => !media.error);
    if (selectedScrapedMedia.length === validMedia.length) {
      setSelectedScrapedMedia([]);
    } else {
      setSelectedScrapedMedia(validMedia.map(media => media.id));
    }
  };

  const handleImportScrapedMedia = async () => {
    if (selectedScrapedMedia.length === 0) {
      showNotification?.('Please select media to import', 'error');
      return;
    }

    setImporting(true);

    try {
      const mediaToImport = scrapedMedia.filter(media => 
        selectedScrapedMedia.includes(media.id) && !media.error
      );

      const response = await fetch('/api/admin/media/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          images: mediaToImport.map(media => ({
            url: media.url,
            filename: media.name,
            extension: media.name.split('.').pop()?.toLowerCase() || 'jpg',
            alt: media.alt,
            title: media.name
          }))
        }),
      });

      const data = await response.json();
      
      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Failed to import media');
      }
      
      // Refresh media data after import
      await fetchMediaData();
      setSelectedScrapedMedia([]);
      showNotification?.(`Successfully imported ${data.imported || selectedScrapedMedia.length} media files`, 'success');
      
      // Switch back to library tab
      setActiveTab('library');
    } catch (error) {
      console.error('Import error:', error);
      showNotification?.('Failed to import selected media', 'error');
    } finally {
      setImporting(false);
    }
  };

  const resetScraper = () => {
    setScrapeUrl('');
    setScrapedMedia([]);
    setSelectedScrapedMedia([]);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Media Library</h1>
        <p className="text-purple-100">Manage photos, videos and documents for your NGO</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('library')}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === 'library'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📚 Media Library
            </button>
            <button
              onClick={() => setActiveTab('scraper')}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === 'scraper'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              🌐 Website Scraper
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'library' ? (
        // Media Library Content using modular components
        <>
          {/* Stats */}
          <MediaLibraryStats
            totalFiles={media.length}
            totalCategories={categories.length}
            storageUsed={formatFileSize(getTotalStorageUsed())}
            selectedCount={selectedFiles.length}
          />

          {/* Controls */}
          <MediaLibraryControls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            viewMode={viewMode}
            setViewMode={setViewMode}
            selectedFilesCount={selectedFiles.length}
            onDeleteFiles={handleDeleteFiles}
            onFileUpload={handleFileUpload}
            uploading={uploading}
          />

          {/* Categories */}
          <MediaCategoriesSection
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onManageCategories={() => setShowCategoryModal(true)}
          />

          {/* Media Grid/List */}
          <div className="bg-white rounded-lg shadow">
            {filteredMedia.length > 0 && (
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedFiles.length === filteredMedia.length && filteredMedia.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">
                      {selectedFiles.length} of {filteredMedia.length} selected
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {filteredMedia.length} file(s) found
                  </span>
                </div>
              </div>
            )}

            <div className="p-6">
              {loading ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">⏳</div>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Loading media files...</h3>
                  <p className="mt-1 text-sm text-gray-500">Please wait while we fetch your media library.</p>
                </div>
              ) : viewMode === 'grid' ? (
                <MediaGridView
                  media={filteredMedia}
                  selectedFiles={selectedFiles}
                  onFileSelect={handleFileSelect}
                  onEditMedia={setEditingMedia}
                  formatFileSize={formatFileSize}
                />
              ) : (
                <MediaListView
                  media={filteredMedia}
                  selectedFiles={selectedFiles}
                  onFileSelect={handleFileSelect}
                  onEditMedia={setEditingMedia}
                  formatFileSize={formatFileSize}
                />
              )}

              {!loading && filteredMedia.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📷</div>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No media files found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchTerm || selectedCategory !== 'all' 
                      ? 'Try adjusting your search or filter criteria.' 
                      : 'Get started by uploading your first media file.'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </>
      ) : (
        // Website Scraper Content
        <WebsiteScraperTab
          scrapeUrl={scrapeUrl}
          setScrapeUrl={setScrapeUrl}
          scraping={scraping}
          scrapedMedia={scrapedMedia}
          selectedScrapedMedia={selectedScrapedMedia}
          importing={importing}
          scrapeFilters={scrapeFilters}
          setScrapeFilters={setScrapeFilters}
          showAdvancedFilters={showAdvancedFilters}
          setShowAdvancedFilters={setShowAdvancedFilters}
          onScrape={handleScrapeMedia}
          onSelectMedia={handleSelectScrapedMedia}
          onSelectAll={handleSelectAllScrapedMedia}
          onImport={handleImportScrapedMedia}
          onReset={resetScraper}
          categories={categories}
          selectedCategory={selectedCategory}
        />
      )}

      {/* Edit Media Modal */}
      {editingMedia && (
        <MediaEditModal
          media={editingMedia}
          categories={categories}
          onSave={(updatedMedia) => {
            setMedia(prev => prev.map(m => m.id === updatedMedia.id ? updatedMedia : m));
            setEditingMedia(null);
            showNotification?.('Media updated successfully', 'success');
          }}
          onCancel={() => setEditingMedia(null)}
        />
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <CategoryModal
          categories={categories}
          onSave={(newCategories) => {
            setCategories(newCategories);
            setShowCategoryModal(false);
            showNotification?.('Categories updated successfully', 'success');
          }}
          onCancel={() => setShowCategoryModal(false)}
        />
      )}
    </div>
  );
};

export default MediaManager;
