import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSelector from './LanguageSelector';
import { FaPhone, FaEnvelope, FaSearch } from 'react-icons/fa';
import { ensureHomeNav } from '../../utils/test-nav';

const Header: React.FC = () => {
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const [navItems, setNavItems] = useState([
     { label: 'Home', path: '/' },
     { label: 'About', path: '/about' },
     { label: 'Animals', path: '/animals' },
     { label: 'Gaushala', path: '/gaushala' },
     { label: 'Child Welfare', path: '/child-welfare' },
     { label: 'Environmental', path: '/environmental' }
   ]);
   
   // Load navigation items from localStorage when component mounts
   useEffect(() => {
     if (typeof window !== 'undefined') {
       // First ensure Home navigation is available
       const updatedNavItems = ensureHomeNav();
       
       if (updatedNavItems) {
         setNavItems(updatedNavItems);
       } else {
         // Fallback to directly reading from localStorage
         const savedNavItems = localStorage.getItem('navItems');
         if (savedNavItems) {
           try {
             const parsedItems = JSON.parse(savedNavItems);
             setNavItems(parsedItems);
           } catch (error) {
             console.error('Error parsing navigation items:', error);
           }
         }
       }
     }
   }, []);

   return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
       {/* Top info bar with Indian contact details */}
       <div className="bg-gray-100 py-1 hidden md:block">
         <div className="container mx-auto px-4 flex justify-between items-center text-xs uppercase">
           <div className="flex items-center">
             <div className="flex items-center mr-6">
               <FaPhone className="text-green-600 mr-1" />
               <a href="tel:+91-8800-123456" className="text-gray-600 hover:text-green-600">+91 8800-123456</a>
             </div>
             <div className="flex items-center">
               <FaEnvelope className="text-green-600 mr-1" />
               <a href="mailto:contact@karunaforall.org" className="text-gray-600 hover:text-green-600">contact@karunaforall.org</a>
             </div>
           </div>
           <div className="flex items-center space-x-4">
             <LanguageSelector />
             <Link href="/about" className="hover:text-green-600">About Us</Link>
             <Link href="/contact" className="hover:text-green-600">Contact</Link>
           </div>
         </div>
       </div>
       
       {/* Main header with Indian NGO name */}
       <div className="container mx-auto px-4 py-3 flex justify-between items-center">
         <Link href="/" className="flex items-center gap-2">
           <Image src="/images/logo.png" alt="Karuna For All" width={40} height={40} />
           <span className="text-2xl font-extrabold text-green-700">Karuna For All</span>
         </Link>
        
         <div className="hidden md:flex items-center space-x-8">
           {/* Search bar */}
           <div className="relative hidden lg:block">
             <input 
               type="text" 
               placeholder="Search..." 
               className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
             />
             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
           </div>
           
           {/* Navigation with Indian-specific sections - fully dynamic from admin panel */}
           <nav className="flex space-x-6 text-gray-700">
             {navItems
               .filter(item => item.label.toLowerCase() !== 'donate') // Filter out Donate from regular menu
               .map((item, index) => (
                 <Link 
                   key={index} 
                   href={item.path} 
                   className="hover:text-green-600 hover:underline"
                 >
                   {item.label}
                 </Link>
               ))}
           </nav>
           
           {/* Donate button is separate from regular menu */}
           <Link href="/donate" className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition ml-4">
             Donate Now
           </Link>
         </div>
         
         {/* Mobile menu button */}
         <button 
           className="md:hidden text-gray-700 focus:outline-none"
           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
           aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
         >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile menu with Indian-specific links */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t transition-all duration-300">
           <div className="container mx-auto px-4 py-3">
             <div className="flex items-center mb-2 pb-2 border-b">
               <div className="flex-1">
                 <input 
                   type="text" 
                   placeholder="Search..." 
                   className="w-full pl-3 pr-10 py-1 border border-gray-300 rounded-md"
                 />
               </div>
               <FaSearch className="ml-2 text-gray-400" />
             </div>
             <nav className="flex flex-col space-y-2">
               {navItems.map((item, index) => (
                 <Link 
                   key={index} 
                   href={item.path} 
                   className={item.label.toLowerCase() === 'donate' ? 
                     "py-2 text-green-600 font-semibold" : 
                     "py-2 text-gray-700 hover:text-green-600"
                   }
                 >
                   {item.label}
                 </Link>
               ))}
               {!navItems.some(item => item.label.toLowerCase() === 'donate') && (
                 <Link href="/donate" className="py-2 text-green-600 font-semibold">
                   Donate Now
                 </Link>
               )}
               {/* Additional links not in the navItems */}
               {!navItems.some(item => item.path === '/contact') && 
                 <Link href="/contact" className="py-2 text-gray-700 hover:text-green-600">Contact</Link>
               }
               
               <div className="mt-3 pt-3 border-t flex items-center">
                 <LanguageSelector />
               </div>
               
               <div className="mt-3 pt-3 border-t">
                 <div className="flex items-center py-1">
                   <FaPhone className="text-green-600 mr-2" />
                   <a href="tel:+91-8800-123456" className="text-gray-700">+91 8800-123456</a>
                 </div>
                 <div className="flex items-center py-1">
                   <FaEnvelope className="text-green-600 mr-2" />
                   <a href="mailto:contact@karunaforall.org" className="text-gray-700">contact@karunaforall.org</a>
                 </div>
               </div>
             </nav>
           </div>
         </div>
       )}
    </header>
  );
};

export default Header;