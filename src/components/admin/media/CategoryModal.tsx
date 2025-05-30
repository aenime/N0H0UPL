import React, { useState } from 'react';

interface MediaCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  count: number;
}

interface CategoryModalProps {
  categories: MediaCategory[];
  onSave: (categories: MediaCategory[]) => void;
  onCancel: () => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ categories, onSave, onCancel }) => {
  const [editedCategories, setEditedCategories] = useState<MediaCategory[]>(categories);
  const [newCategory, setNewCategory] = useState({ name: '', description: '', color: '#6366F1' });

  const addCategory = () => {
    if (newCategory.name.trim()) {
      const category: MediaCategory = {
        id: Date.now().toString(),
        name: newCategory.name,
        description: newCategory.description,
        color: newCategory.color,
        count: 0
      };
      setEditedCategories(prev => [...prev, category]);
      setNewCategory({ name: '', description: '', color: '#6366F1' });
    }
  };

  const removeCategory = (id: string) => {
    setEditedCategories(prev => prev.filter(cat => cat.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Manage Categories</h3>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Add New Category */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-4">Add New Category</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Category name"
                value={newCategory.name}
                onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <input
                type="color"
                value={newCategory.color}
                onChange={(e) => setNewCategory(prev => ({ ...prev, color: e.target.value }))}
                className="h-10 border border-gray-300 rounded-lg"
              />
            </div>
            <textarea
              placeholder="Description (optional)"
              value={newCategory.description}
              onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
              rows={2}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={addCategory}
              className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Add Category
            </button>
          </div>

          {/* Existing Categories */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Existing Categories</h4>
            {editedCategories.map((category) => (
              <div key={category.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: category.color }}
                  />
                  <div>
                    <p className="font-medium text-gray-900">{category.name}</p>
                    <p className="text-sm text-gray-500">{category.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeCategory(category.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  🗑️
                </button>
              </div>
            ))}
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
            onClick={() => onSave(editedCategories)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
