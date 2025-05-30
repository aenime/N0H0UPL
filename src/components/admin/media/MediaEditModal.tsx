import React, { useState } from 'react';
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

interface MediaCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  count: number;
}

interface MediaEditModalProps {
  media: MediaFile;
  categories: MediaCategory[];
  onSave: (media: MediaFile) => void;
  onCancel: () => void;
}

const MediaEditModal: React.FC<MediaEditModalProps> = ({ media, categories, onSave, onCancel }) => {
  const [editedMedia, setEditedMedia] = useState<MediaFile>(media);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Edit Media</h3>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden mb-4 relative">
            <Image 
              src={editedMedia.path} 
              alt={editedMedia.alt} 
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">File Name</label>
            <input
              type="text"
              value={editedMedia.name}
              onChange={(e) => setEditedMedia(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={editedMedia.description}
              onChange={(e) => setEditedMedia(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alt Text</label>
            <input
              type="text"
              value={editedMedia.alt}
              onChange={(e) => setEditedMedia(prev => ({ ...prev, alt: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={editedMedia.category}
              onChange={(e) => setEditedMedia(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(editedMedia)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaEditModal;
