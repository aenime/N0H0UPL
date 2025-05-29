import React, { useState } from 'react';
import { FaGlobe } from 'react-icons/fa';

type Language = {
  code: string;
  name: string;
};

const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>({
    code: 'en',
    name: 'English'
  });

  const languages: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'zh', name: '中文' },
  ];

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    setIsOpen(false);
    // In a real implementation, you would update the app's language context/state here
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm rounded-md px-3 py-2 hover:bg-gray-100 focus:outline-none"
        aria-expanded={isOpen}
      >
        <FaGlobe className="mr-1" />
        <span>{currentLanguage.name}</span>
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="language-menu"
          >
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  currentLanguage.code === language.code
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700'
                } hover:bg-gray-100`}
                role="menuitem"
              >
                {language.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;