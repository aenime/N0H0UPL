import React from 'react';

interface MediaLibraryStatsProps {
  totalFiles: number;
  totalCategories: number;
  storageUsed: string;
  selectedCount: number;
}

const MediaLibraryStats: React.FC<MediaLibraryStatsProps> = ({
  totalFiles,
  totalCategories,
  storageUsed,
  selectedCount
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Files</p>
            <p className="text-2xl font-bold text-gray-900">{totalFiles}</p>
          </div>
          <div className="h-8 w-8 text-purple-500">📷</div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Categories</p>
            <p className="text-2xl font-bold text-gray-900">{totalCategories}</p>
          </div>
          <div className="h-8 w-8 text-blue-500">📁</div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Storage Used</p>
            <p className="text-lg font-bold text-gray-900">{storageUsed}</p>
          </div>
          <div className="h-8 w-8 text-green-500">☁️</div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Selected</p>
            <p className="text-2xl font-bold text-gray-900">{selectedCount}</p>
          </div>
          <div className="h-8 w-8 text-orange-500">📋</div>
        </div>
      </div>
    </div>
  );
};

export default MediaLibraryStats;
