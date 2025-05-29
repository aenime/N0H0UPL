import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const WebsiteScraper = ({ showNotification }) => {
  const [url, setUrl] = useState('');
  const [scraping, setScraping] = useState(false);
  const [scrapedImages, setScrapedImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [importing, setImporting] = useState(false);
  const [filters, setFilters] = useState({
    minWidth: 100,
    maxWidth: 2000,
    minHeight: 100,
    maxHeight: 2000,
    minFileSize: 0, // in KB
    maxFileSize: 5000, // in KB
    formats: ['jpg', 'jpeg', 'png', 'webp', 'gif']
  });
  const [filterToggles, setFilterToggles] = useState({
    dimensions: true,
    fileSize: true,
    formats: true
  });

  const handleScrape = async () => {
    if (!url.trim()) {
      showNotification('Please enter a valid URL', 'error');
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch (error) {
      showNotification('Please enter a valid URL', 'error');
      return;
    }

    setScraping(true);
    setScrapedImages([]);
    setSelectedImages([]);

    try {
      const response = await fetch('/api/scrape-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, filters: getActiveFilters() }),
      });

      const data = await response.json();

      if (data.success) {
        setScrapedImages(data.images);
        showNotification(`Found ${data.images.length} images`, 'success');
      } else {
        showNotification(data.message || 'Failed to scrape images', 'error');
      }
    } catch (error) {
      console.error('Error scraping images:', error);
      showNotification('Failed to scrape images', 'error');
    } finally {
      setScraping(false);
    }
  };

  const handleImageSelect = (imageUrl, isSelected) => {
    if (isSelected) {
      setSelectedImages(prev => [...prev, imageUrl]);
    } else {
      setSelectedImages(prev => prev.filter(img => img !== imageUrl));
    }
  };

  const handleSelectAll = () => {
    if (selectedImages.length === scrapedImages.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(scrapedImages.map(img => img.url));
    }
  };

  const handleImportToMedia = async () => {
    if (selectedImages.length === 0) {
      showNotification('Please select at least one image to import', 'error');
      return;
    }

    setImporting(true);

    try {
      const response = await fetch('/api/import-scraped-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          images: selectedImages.map(imgUrl => 
            scrapedImages.find(img => img.url === imgUrl)
          )
        }),
      });

      const data = await response.json();

      if (data.success) {
        showNotification(`Successfully imported ${data.imported} images to media library`, 'success');
        setScrapedImages([]);
        setSelectedImages([]);
        setUrl('');
      } else {
        showNotification(data.message || 'Failed to import images', 'error');
      }
    } catch (error) {
      console.error('Error importing images:', error);
      showNotification('Failed to import images', 'error');
    } finally {
      setImporting(false);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleFilterToggle = (filterName) => {
    setFilterToggles(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const getActiveFilters = () => {
    const activeFilters = { ...filters };
    
    // If dimensions filter is off, remove dimension restrictions
    if (!filterToggles.dimensions) {
      activeFilters.minWidth = 0;
      activeFilters.maxWidth = 10000;
      activeFilters.minHeight = 0;
      activeFilters.maxHeight = 10000;
    }
    
    // If file size filter is off, remove size restrictions
    if (!filterToggles.fileSize) {
      activeFilters.minFileSize = 0;
      activeFilters.maxFileSize = 50000;
    }
    
    // If formats filter is off, allow all formats
    if (!filterToggles.formats) {
      activeFilters.formats = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'bmp', 'tiff'];
    }
    
    return activeFilters;
  };

  const handleFormatToggle = (format) => {
    setFilters(prev => ({
      ...prev,
      formats: prev.formats.includes(format)
        ? prev.formats.filter(f => f !== format)
        : [...prev.formats, format]
    }));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Website Image Scraper</h2>
        
        {/* URL Input */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website URL
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
              disabled={scraping}
            />
            <button
              onClick={handleScrape}
              disabled={scraping || !url.trim()}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {scraping ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span className="hidden sm:inline">Scraping...</span>
                  <span className="sm:hidden">Loading...</span>
                </>
              ) : (
                <>
                  <span>🔍</span>
                  <span className="hidden sm:inline">Scrape Images</span>
                  <span className="sm:hidden">Scrape</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-0">Image Filters</h3>
            <div className="text-sm text-gray-600">
              Active: {Object.values(filterToggles).filter(Boolean).length}/3 filters
            </div>
          </div>
          
          {/* Filter Toggles */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6 p-3 bg-white rounded-lg border">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="dimensions-toggle"
                checked={filterToggles.dimensions}
                onChange={() => handleFilterToggle('dimensions')}
                className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="dimensions-toggle" className="text-sm font-medium text-gray-700">
                <span className="hidden sm:inline">📏 Dimensions Filter</span>
                <span className="sm:hidden">📏 Dimensions</span>
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="filesize-toggle"
                checked={filterToggles.fileSize}
                onChange={() => handleFilterToggle('fileSize')}
                className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="filesize-toggle" className="text-sm font-medium text-gray-700">
                <span className="hidden sm:inline">📊 File Size Filter</span>
                <span className="sm:hidden">📊 File Size</span>
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="formats-toggle"
                checked={filterToggles.formats}
                onChange={() => handleFilterToggle('formats')}
                className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="formats-toggle" className="text-sm font-medium text-gray-700">
                <span className="hidden sm:inline">🎨 Format Filter</span>
                <span className="sm:hidden">🎨 Formats</span>
              </label>
            </div>
          </div>
          
          {/* Dimensions Filter */}
          {filterToggles.dimensions && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-sm font-semibold text-blue-900 mb-3">📏 Dimensions (pixels)</h4>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                <div>
                  <label className="block text-xs font-medium text-blue-700 mb-1">Min Width</label>
                  <input
                    type="number"
                    value={filters.minWidth}
                    onChange={(e) => handleFilterChange('minWidth', parseInt(e.target.value) || 0)}
                    className="w-full border border-blue-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-blue-700 mb-1">Max Width</label>
                  <input
                    type="number"
                    value={filters.maxWidth}
                    onChange={(e) => handleFilterChange('maxWidth', parseInt(e.target.value) || 5000)}
                    className="w-full border border-blue-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-blue-700 mb-1">Min Height</label>
                  <input
                    type="number"
                    value={filters.minHeight}
                    onChange={(e) => handleFilterChange('minHeight', parseInt(e.target.value) || 0)}
                    className="w-full border border-blue-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-blue-700 mb-1">Max Height</label>
                  <input
                    type="number"
                    value={filters.maxHeight}
                    onChange={(e) => handleFilterChange('maxHeight', parseInt(e.target.value) || 5000)}
                    className="w-full border border-blue-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* File Size Filter */}
          {filterToggles.fileSize && (
            <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <h4 className="text-sm font-semibold text-green-900 mb-3">📊 File Size (KB)</h4>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <label className="block text-xs font-medium text-green-700 mb-1">Min Size</label>
                  <input
                    type="number"
                    value={filters.minFileSize}
                    onChange={(e) => handleFilterChange('minFileSize', parseInt(e.target.value) || 0)}
                    className="w-full border border-green-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-green-700 mb-1">Max Size</label>
                  <input
                    type="number"
                    value={filters.maxFileSize}
                    onChange={(e) => handleFilterChange('maxFileSize', parseInt(e.target.value) || 10000)}
                    className="w-full border border-green-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    min="0"
                  />
                </div>
              </div>
            </div>
          )}

          {/* File Formats Filter */}
          {filterToggles.formats && (
            <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="text-sm font-semibold text-purple-900 mb-3">🎨 Allowed Formats</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
                {['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].map(format => (
                  <label key={format} className="flex items-center bg-white px-2 sm:px-3 py-2 rounded-lg border border-purple-200 hover:bg-purple-100 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.formats.includes(format)}
                      onChange={() => handleFormatToggle(format)}
                      className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="text-xs sm:text-sm font-medium text-purple-700 uppercase">{format}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      {scrapedImages.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              Scraped Images ({scrapedImages.length})
            </h3>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={handleSelectAll}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm sm:text-base"
              >
                {selectedImages.length === scrapedImages.length ? 'Deselect All' : 'Select All'}
              </button>
              <button
                onClick={handleImportToMedia}
                disabled={selectedImages.length === 0 || importing}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {importing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span className="hidden sm:inline">Importing...</span>
                    <span className="sm:hidden">Loading...</span>
                  </>
                ) : (
                  <>
                    <span>📁</span>
                    <span className="hidden sm:inline">Import to Media ({selectedImages.length})</span>
                    <span className="sm:hidden">Import ({selectedImages.length})</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
            {scrapedImages.map((image, index) => (
              <div
                key={index}
                className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                  selectedImages.includes(image.url)
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleImageSelect(image.url, !selectedImages.includes(image.url))}
              >
                <div className="aspect-square relative">
                  <Image
                    src={image.url}
                    alt={`Scraped image ${index + 1}`}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.target.src = '/images/placeholder-image.svg';
                      e.target.style.opacity = '0.5';
                    }}
                    unoptimized={true}
                  />
                  {selectedImages.includes(image.url) && (
                    <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-orange-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm">
                      ✓
                    </div>
                  )}
                </div>
                <div className="p-1 sm:p-2 bg-white">
                  <p className="text-xs text-gray-600 truncate" title={image.url}>
                    {image.filename || `image-${index + 1}`}
                  </p>
                  <p className="text-xs text-gray-500">
                    {image.width} × {image.height}
                    {image.size && ` • ${Math.round(image.size / 1024)}KB`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsiteScraper;
