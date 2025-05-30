// Admin navigation tabs component
import React from 'react';

interface TabItem {
  id: string;
  label: string;
  icon: string;
  shortLabel: string;
}

interface AdminTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const AdminTabs: React.FC<AdminTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: TabItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', shortLabel: 'Dashboard' },
    { id: 'donations', label: 'Donations', icon: '💰', shortLabel: 'Donations' },
    { id: 'content', label: 'Content', icon: '📝', shortLabel: 'Content' },
    { id: 'users', label: 'Users', icon: '👥', shortLabel: 'Users' },
    { id: 'analytics', label: 'Analytics', icon: '📈', shortLabel: 'Analytics' },
    { id: 'settings', label: 'Settings', icon: '⚙️', shortLabel: 'Settings' }
  ];

  return (
    <div className="border-b border-gray-200 mb-4 sm:mb-6">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex -mb-px space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
              activeTab === tab.id
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Mobile Navigation - Scrollable */}
      <nav className="md:hidden -mb-px flex space-x-4 overflow-x-auto scrollbar-hide" aria-label="Mobile Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-shrink-0 py-2 px-3 border-b-2 font-medium text-xs flex flex-col items-center gap-1 min-w-[60px] transition-colors ${
              activeTab === tab.id
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="text-xs leading-tight text-center">{tab.shortLabel}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default AdminTabs;
