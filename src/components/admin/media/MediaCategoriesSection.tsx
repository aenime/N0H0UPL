import React from 'react';

interface MediaCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  count: number;
}

interface MediaCategoriesSectionProps {
  categories: MediaCategory[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onManageCategories: () => void;
}

const MediaCategoriesSection: React.FC<MediaCategoriesSectionProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  onManageCategories
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
        <button
          onClick={onManageCategories}
          className="text-sm text-purple-600 hover:text-purple-700 font-medium"
        >
          Manage Categories
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.name
                ? 'text-white'
                : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
            }`}
            style={{
              backgroundColor: selectedCategory === category.name ? category.color : undefined
            }}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>
    </div>
  );
};

export default MediaCategoriesSection;
