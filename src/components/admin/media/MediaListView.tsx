import React from 'react';
import Image from 'next/image';

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

interface MediaListViewProps {
  media: MediaFile[];
  selectedFiles: string[];
  onFileSelect: (fileId: string, isSelected: boolean) => void;
  onEditMedia: (media: MediaFile) => void;
  formatFileSize: (bytes: number) => string;
}

const MediaListView: React.FC<MediaListViewProps> = ({
  media,
  selectedFiles,
  onFileSelect,
  onEditMedia,
  formatFileSize
}) => {
  return (
    <div className="space-y-3">
      {media.map((file) => (
        <div key={file.id} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
          <input
            type="checkbox"
            checked={selectedFiles.includes(file.id)}
            onChange={(e) => onFileSelect(file.id, e.target.checked)}
            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden relative">
            <Image 
              src={file.path} 
              alt={file.alt} 
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">{file.name}</p>
            <p className="text-sm text-gray-500">{file.description || 'No description'}</p>
            <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
              <span>{file.category}</span>
              <span>{formatFileSize(file.fileSize)}</span>
              <span>{file.uploadDate}</span>
              {file.dimensions && (
                <span>{file.dimensions.width} × {file.dimensions.height}</span>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEditMedia(file)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              ✏️
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              👁️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaListView;
