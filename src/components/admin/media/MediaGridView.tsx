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

interface MediaGridViewProps {
  media: MediaFile[];
  selectedFiles: string[];
  onFileSelect: (fileId: string, isSelected: boolean) => void;
  onEditMedia: (media: MediaFile) => void;
  formatFileSize: (bytes: number) => string;
}

const MediaGridView: React.FC<MediaGridViewProps> = ({
  media,
  selectedFiles,
  onFileSelect,
  onEditMedia,
  formatFileSize
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {media.map((file) => (
        <div key={file.id} className="relative group">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <input
              type="checkbox"
              checked={selectedFiles.includes(file.id)}
              onChange={(e) => onFileSelect(file.id, e.target.checked)}
              className="absolute top-2 left-2 z-10 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <Image
              src={file.path}
              alt={file.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 flex space-x-2">
                <button
                  onClick={() => onEditMedia(file)}
                  className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100"
                >
                  ✏️
                </button>
                <button className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100">
                  👁️
                </button>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-xs font-medium text-gray-900 truncate">{file.name}</p>
            <p className="text-xs text-gray-500">{formatFileSize(file.fileSize)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaGridView;
