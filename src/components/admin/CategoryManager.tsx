import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  showOnHome: boolean;
  isActive: boolean;
  icon: string;
  order: number;
}

interface CategoryManagerProps {
  showNotification?: (message: string, type: 'success' | 'error' | 'info') => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({ showNotification }) => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Success Stories',
      description: 'Inspiring stories of rescued animals and their recovery',
      color: '#10B981',
      showOnHome: true,
      isActive: true,
      icon: '🐕',
      order: 1
    },
    {
      id: '2',
      name: 'Medical Updates',
      description: 'Updates on medical treatments and procedures',
      color: '#EF4444',
      showOnHome: true,
      isActive: true,
      icon: '🏥',
      order: 2
    },
    {
      id: '3',
      name: 'Events',
      description: 'Community events and workshops',
      color: '#8B5CF6',
      showOnHome: true,
      isActive: true,
      icon: '🎉',
      order: 3
    },
    {
      id: '4',
      name: 'Announcements',
      description: 'Important announcements and news',
      color: '#3B82F6',
      showOnHome: false,
      isActive: true,
      icon: '📢',
      order: 4
    },
    {
      id: '5',
      name: 'Adoptions',
      description: 'Animals available for adoption',
      color: '#F59E0B',
      showOnHome: true,
      isActive: true,
      icon: '🏠',
      order: 5
    }
  ]);

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateCategory = () => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name: '',
      description: '',
      color: '#6B7280',
      showOnHome: false,
      isActive: true,
      icon: '📝',
      order: categories.length + 1
    };
    setEditingCategory(newCategory);
    setIsCreating(true);
  };

  const handleSaveCategory = (category: Category) => {
    if (!category.name.trim()) {
      showNotification?.('Please enter a category name', 'error');
      return;
    }

    if (isCreating) {
      setCategories(prev => [...prev, category]);
      showNotification?.('Category created successfully', 'success');
    } else {
      setCategories(prev => prev.map(c => c.id === category.id ? category : c));
      showNotification?.('Category updated successfully', 'success');
    }
    
    setEditingCategory(null);
    setIsCreating(false);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(prev => prev.filter(c => c.id !== categoryId));
      showNotification?.('Category deleted successfully', 'success');
    }
  };

  const handleToggleHomeVisibility = (categoryId: string) => {
    setCategories(prev => prev.map(category => 
      category.id === categoryId 
        ? { ...category, showOnHome: !category.showOnHome }
        : category
    ));
    showNotification?.('Home page visibility updated', 'success');
  };

  const handleToggleActive = (categoryId: string) => {
    setCategories(prev => prev.map(category => 
      category.id === categoryId 
        ? { ...category, isActive: !category.isActive }
        : category
    ));
    showNotification?.('Category status updated', 'success');
  };

  if (editingCategory) {
    return <CategoryEditor 
      category={editingCategory}
      onSave={handleSaveCategory}
      onCancel={() => {
        setEditingCategory(null);
        setIsCreating(false);
      }}
      isCreating={isCreating}
    />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Category Management</h1>
        <p className="text-indigo-100">Manage post categories and their visibility on the home page</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Categories</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">📁</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Shown on Home</p>
              <p className="text-2xl font-bold text-gray-900">
                {categories.filter(c => c.showOnHome).length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <EyeIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {categories.filter(c => c.isActive).length}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Hidden</p>
              <p className="text-2xl font-bold text-gray-900">
                {categories.filter(c => !c.showOnHome).length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <EyeSlashIcon className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
          <button
            onClick={handleCreateCategory}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Category
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Home Page
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.sort((a, b) => a.order - b.order).map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg mr-3"
                        style={{ backgroundColor: `${category.color}20`, color: category.color }}
                      >
                        {category.icon}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                        <div 
                          className="text-xs px-2 py-1 rounded-full inline-block"
                          style={{ backgroundColor: `${category.color}20`, color: category.color }}
                        >
                          {category.color}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {category.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleHomeVisibility(category.id)}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        category.showOnHome
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {category.showOnHome ? (
                        <>
                          <EyeIcon className="h-3 w-3 mr-1" />
                          Visible
                        </>
                      ) : (
                        <>
                          <EyeSlashIcon className="h-3 w-3 mr-1" />
                          Hidden
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleActive(category.id)}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        category.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {category.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {category.order}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setEditingCategory(category)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Edit"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Category Editor Component
interface CategoryEditorProps {
  category: Category;
  onSave: (category: Category) => void;
  onCancel: () => void;
  isCreating: boolean;
}

const CategoryEditor: React.FC<CategoryEditorProps> = ({ category, onSave, onCancel, isCreating }) => {
  const [editedCategory, setEditedCategory] = useState<Category>(category);

  const colorOptions = [
    '#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', 
    '#6B7280', '#EC4899', '#14B8A6', '#F97316', '#84CC16'
  ];

  const iconOptions = [
    '🐕', '🐱', '🏥', '🎉', '📢', '🏠', '📝', '💊', '🎯', '⭐',
    '🌟', '❤️', '🐾', '🦴', '🎪', '📚', '🎨', '🎭', '🏆', '🎊'
  ];

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {isCreating ? 'Create New Category' : 'Edit Category'}
          </h2>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
              <input
                type="text"
                value={editedCategory.name}
                onChange={(e) => setEditedCategory(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter category name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
              <input
                type="number"
                value={editedCategory.order}
                onChange={(e) => setEditedCategory(prev => ({ ...prev, order: parseInt(e.target.value) || 1 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                min="1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={editedCategory.description}
              onChange={(e) => setEditedCategory(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter category description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  onClick={() => setEditedCategory(prev => ({ ...prev, color }))}
                  className={`w-8 h-8 rounded-full border-2 ${
                    editedCategory.color === color 
                      ? 'border-gray-800 ring-2 ring-gray-300' 
                      : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
            <div className="grid grid-cols-10 gap-2">
              {iconOptions.map((icon) => (
                <button
                  key={icon}
                  onClick={() => setEditedCategory(prev => ({ ...prev, icon }))}
                  className={`p-2 text-lg rounded-lg border-2 ${
                    editedCategory.icon === icon 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={editedCategory.showOnHome}
                onChange={(e) => setEditedCategory(prev => ({ ...prev, showOnHome: e.target.checked }))}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">Show on Home Page</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={editedCategory.isActive}
                onChange={(e) => setEditedCategory(prev => ({ ...prev, isActive: e.target.checked }))}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">Active</span>
            </label>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(editedCategory)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {isCreating ? 'Create Category' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
