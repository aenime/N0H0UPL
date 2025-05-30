import React from 'react';
import Image from 'next/image';

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

interface MediaCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  count: number;
}

interface WebsiteScraperTabProps {
  scrapeUrl: string;
  setScrapeUrl: (url: string) => void;
  scraping: boolean;
  scrapedMedia: ScrapedMedia[];
  selectedScrapedMedia: string[];
  importing: boolean;
  scrapeFilters: ScrapeFilters;
  setScrapeFilters: (filters: ScrapeFilters) => void;
  showAdvancedFilters: boolean;
  setShowAdvancedFilters: (show: boolean) => void;
  onScrape: () => void;
  onSelectMedia: (id: string, selected: boolean) => void;
  onSelectAll: () => void;
  onImport: () => void;
  onReset: () => void;
  categories: MediaCategory[];
  selectedCategory: string;
}

const WebsiteScraperTab: React.FC<WebsiteScraperTabProps> = ({
  scrapeUrl,
  setScrapeUrl,
  scraping,
  scrapedMedia,
  selectedScrapedMedia,
  importing,
  scrapeFilters,
  setScrapeFilters,
  showAdvancedFilters,
  setShowAdvancedFilters,
  onScrape,
  onSelectMedia,
  onSelectAll,
  onImport,
  onReset,
  categories,
  selectedCategory,
}) => {
  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Scraper Controls */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🌐 Website Media Scraper</h3>
        <p className="text-sm text-gray-600 mb-6">
          Import images and videos from any website with advanced filtering and preview options.
        </p>
        
        <div className="space-y-4">
          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
            <div className="flex gap-3">
              <input
                type="url"
                value={scrapeUrl}
                onChange={(e) => setScrapeUrl(e.target.value)}
                placeholder="https://example.com"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={scraping}
              />
              <button
                onClick={onScrape}
                disabled={scraping || !scrapeUrl.trim()}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {scraping ? '🔄 Scraping...' : '🔍 Scrape Media'}
              </button>
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center text-sm text-purple-600 hover:text-purple-700"
            >
              ⚙️ Advanced Filters {showAdvancedFilters ? '▼' : '▶'}
            </button>
            {scrapedMedia.length > 0 && (
              <button
                onClick={onReset}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                🗑️ Clear Results
              </button>
            )}
          </div>

          {/* Advanced Filters Panel */}
          {showAdvancedFilters && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <h4 className="font-medium text-gray-900">Scraping Filters</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Dimensions */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Image Dimensions</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={scrapeFilters.minWidth}
                        onChange={(e) => setScrapeFilters({...scrapeFilters, minWidth: Number(e.target.value)})}
                        className="w-20 px-2 py-1 text-xs border border-gray-300 rounded"
                        placeholder="Min W"
                      />
                      <span className="text-xs text-gray-500">×</span>
                      <input
                        type="number"
                        value={scrapeFilters.minHeight}
                        onChange={(e) => setScrapeFilters({...scrapeFilters, minHeight: Number(e.target.value)})}
                        className="w-20 px-2 py-1 text-xs border border-gray-300 rounded"
                        placeholder="Min H"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={scrapeFilters.maxWidth}
                        onChange={(e) => setScrapeFilters({...scrapeFilters, maxWidth: Number(e.target.value)})}
                        className="w-20 px-2 py-1 text-xs border border-gray-300 rounded"
                        placeholder="Max W"
                      />
                      <span className="text-xs text-gray-500">×</span>
                      <input
                        type="number"
                        value={scrapeFilters.maxHeight}
                        onChange={(e) => setScrapeFilters({...scrapeFilters, maxHeight: Number(e.target.value)})}
                        className="w-20 px-2 py-1 text-xs border border-gray-300 rounded"
                        placeholder="Max H"
                      />
                    </div>
                  </div>
                </div>

                {/* File Size */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">File Size (KB)</label>
                  <div className="space-y-2">
                    <input
                      type="number"
                      value={scrapeFilters.minFileSize}
                      onChange={(e) => setScrapeFilters({...scrapeFilters, minFileSize: Number(e.target.value)})}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                      placeholder="Min size"
                    />
                    <input
                      type="number"
                      value={scrapeFilters.maxFileSize}
                      onChange={(e) => setScrapeFilters({...scrapeFilters, maxFileSize: Number(e.target.value)})}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                      placeholder="Max size"
                    />
                  </div>
                </div>

                {/* Options */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Options</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={scrapeFilters.includeAltText}
                        onChange={(e) => setScrapeFilters({...scrapeFilters, includeAltText: e.target.checked})}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-2"
                      />
                      <span className="text-xs">Import alt text</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={scrapeFilters.includeVideos}
                        onChange={(e) => setScrapeFilters({...scrapeFilters, includeVideos: e.target.checked})}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-2"
                      />
                      <span className="text-xs">Include videos</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* File Formats */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Allowed Formats</label>
                <div className="flex flex-wrap gap-2">
                  {['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'svg'].map(format => (
                    <label key={format} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={scrapeFilters.formats.includes(format)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setScrapeFilters({
                              ...scrapeFilters,
                              formats: [...scrapeFilters.formats, format]
                            });
                          } else {
                            setScrapeFilters({
                              ...scrapeFilters,
                              formats: scrapeFilters.formats.filter(f => f !== format)
                            });
                          }
                        }}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-1"
                      />
                      <span className="text-xs uppercase">{format}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scraped Media Results */}
      {scrapedMedia.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Scraped Media</h3>
                <p className="text-sm text-gray-600">
                  Found {scrapedMedia.length} media files • {selectedScrapedMedia.length} selected
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedScrapedMedia.length === scrapedMedia.filter(m => !m.error).length && scrapedMedia.length > 0}
                    onChange={onSelectAll}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-2"
                  />
                  <span className="text-sm">Select All</span>
                </label>
                <button
                  onClick={onImport}
                  disabled={selectedScrapedMedia.length === 0 || importing}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {importing ? '⏳ Importing...' : `📥 Import (${selectedScrapedMedia.length})`}
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {scrapedMedia.map((mediaItem) => (
                <div key={mediaItem.id} className={`relative group ${mediaItem.error ? 'opacity-50' : ''}`}>
                  <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    {!mediaItem.error && (
                      <input
                        type="checkbox"
                        checked={selectedScrapedMedia.includes(mediaItem.id)}
                        onChange={(e) => onSelectMedia(mediaItem.id, e.target.checked)}
                        className="absolute top-2 left-2 z-10 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                    )}
                    
                    {mediaItem.error ? (
                      <div className="w-full h-full flex items-center justify-center text-red-500 text-4xl">
                        ❌
                      </div>
                    ) : (
                      <Image
                        src={mediaItem.url}
                        alt={mediaItem.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
                        onError={() => {
                          // Handle image load error
                          console.error('Failed to load image:', mediaItem.url);
                        }}
                      />
                    )}
                    
                    {mediaItem.type === 'video' && !mediaItem.error && (
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <div className="text-white text-2xl">▶️</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-xs font-medium text-gray-900 truncate">{mediaItem.name}</p>
                    {mediaItem.error ? (
                      <p className="text-xs text-red-500 truncate">{mediaItem.error}</p>
                    ) : (
                      <>
                        <p className="text-xs text-gray-500">{formatFileSize(mediaItem.fileSize)}</p>
                        {mediaItem.dimensions && (
                          <p className="text-xs text-gray-500">
                            {mediaItem.dimensions.width} × {mediaItem.dimensions.height}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Storage Location Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="text-blue-500 mr-3 text-xl">💾</div>
          <div>
            <h4 className="font-medium text-blue-900">Storage Management</h4>
            <p className="text-sm text-blue-700 mt-1">
              Scraped media will be stored in <code className="bg-blue-100 px-1 rounded">/public/images/scraped/</code> directory.
              Files will be automatically organized by date and optimized for web delivery.
            </p>
            <div className="mt-2 text-xs text-blue-600">
              • Images will be compressed and resized if needed<br/>
              • Alt text and metadata will be preserved<br/>
              • Category: {selectedCategory === 'all' ? 'Animals' : selectedCategory}
            </div>
          </div>
        </div>
      </div>

      {/* Error Handling Tips */}
      {scrapedMedia.some(m => m.error) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="text-yellow-500 mr-3 text-xl">⚠️</div>
            <div>
              <h4 className="font-medium text-yellow-900">Some Media Could Not Be Loaded</h4>
              <p className="text-sm text-yellow-700 mt-1">
                This can happen due to:
              </p>
              <ul className="text-xs text-yellow-600 mt-2 list-disc list-inside">
                <li>CORS (Cross-Origin Resource Sharing) restrictions</li>
                <li>Invalid or broken image URLs</li>
                <li>Server-side protection against hotlinking</li>
                <li>Images that require authentication to access</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsiteScraperTab;
