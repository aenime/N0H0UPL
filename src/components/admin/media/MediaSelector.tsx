import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';

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

interface MediaSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMedia: (media: MediaFile) => void;
  selectedMediaId?: string;
  categories?: MediaCategory[];
}

const MediaSelector: React.FC<MediaSelectorProps> = ({ 
  isOpen, 
  onClose, 
  onSelectMedia, 
  selectedMediaId,
  categories = []
}) => {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch media data when component opens
  useEffect(() => {
    if (isOpen) {
      fetchMediaData();
    }
  }, [isOpen]);

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
                uploadDate = new Date().toISOString().split('T')[0];
              } else {
                uploadDate = dateObj.toISOString().split('T')[0];
              }
            } catch (error) {
              uploadDate = new Date().toISOString().split('T')[0];
            }

            return {
              id: item.id || item._id || Math.random().toString(),
              name: item.title || item.name || 'Untitled',
              path: item.url || item.path || '',
              category: item.category || 'uncategorized',
              description: item.description || '',
              uploadDate,
              fileSize: item.fileSize || 0,
              dimensions: item.dimensions,
              alt: item.alt || item.title || item.name || 'Image'
            };
          });
          setMedia(transformedMedia);
        }
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMedia = media.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
                         item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.alt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && item.path; // Only show items with valid paths
  });

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Select Media</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Search and Filter Controls */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search media files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="sm:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name.toLowerCase()}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Media Grid */}
        <div className="p-6 overflow-y-auto max-h-96">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading media files...</p>
            </div>
          ) : filteredMedia.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectMedia(item)}
                  className={`relative group border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                    selectedMediaId === item.id 
                      ? 'border-blue-500 ring-2 ring-blue-200' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="aspect-square bg-gray-100 relative">
                    {item.path ? (
                      <Image
                        src={item.path}
                        alt={item.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <PhotoIcon className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    {selectedMediaId === item.id && (
                      <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                        <div className="bg-blue-500 text-white rounded-full p-1">
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-2 bg-white">
                    <h4 className="text-xs font-medium text-gray-900 truncate" title={item.name}>
                      {item.name}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                      <span>{item.category}</span>
                      <span>{formatFileSize(item.fileSize)}</span>
                    </div>
                    {item.dimensions && (
                      <div className="text-xs text-gray-400 mt-1">
                        {item.dimensions.width} × {item.dimensions.height}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No media files found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'No media files have been uploaded yet.'}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaSelector;
