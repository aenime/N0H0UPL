import React, { useState } from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPaw, FaPhone, FaEnvelope, FaMapMarkerAlt, FaHeart, FaLeaf, FaChild } from 'react-icons/fa';
import Button from './Button';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert(`${email} पर सदस्यता के लिए धन्यवाद!`);
    setEmail('');
  };

  return (
    <footer className="text-gray-100 relative">
      {/* Indian flag color decorative border */}
      <div className="h-4 bg-gradient-to-r from-orange-500 via-white to-green-600"></div>
      
      {/* Top donation banner with saffron background */}
      <div className="bg-orange-500 text-white py-3">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-3 md:mb-0">
            <h4 className="font-bold text-lg">जीवे दया करो - दान धर्म का मूल है</h4>
            <p className="text-sm">सभी दान धारा 80G के तहत कर लाभ के लिए पात्र हैं</p>
          </div>
          <Link href="/donate">
            <Button variant="primary" className="bg-white text-orange-600 hover:bg-gray-100 border border-orange-600">अभी दान करें</Button>
          </Link>
        </div>
      </div>
      
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 border-b border-orange-800">
        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                  <FaHeart className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-white">करुणा <span className="text-orange-400">|</span> Karuna For All</h3>
              </div>
              <p className="text-sm mb-4 border-l-2 border-orange-500 pl-3">
                २०१० से जरूरतमंद जीवों की सहायता में समर्पित - 
                जानवरों, गौशाला, भूखे लोगों, अनाथ बच्चों और पर्यावरण की सुरक्षा के लिए काम कर रहे हैं।
              </p>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <FaPhone className="text-orange-500 mr-2" />
                  <a href="tel:+91-8800-123456" className="hover:text-orange-300 transition-colors duration-200">+91 8800-123456</a>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-orange-500 mr-2" />
                  <a href="mailto:seva@karunaforall.org" className="hover:text-orange-300 transition-colors duration-200">seva@karunaforall.org</a>
                </div>
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-orange-500 mr-2 mt-1" />
                  <address className="not-italic text-sm">
                    करुणा फॉर ऑल ट्रस्ट<br />
                    ४२, सरदार पटेल मार्ग, वसंत विहार<br />
                    नई दिल्ली, 110057
                  </address>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-orange-500 pb-2">त्वरित लिंक</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <li><Link href="/" className="hover:text-orange-300 hover:underline transition-colors duration-200 flex items-center">
                  <span className="text-orange-500 mr-1">❯</span> होम
                </Link></li>
                <li><Link href="/about" className="hover:text-orange-300 hover:underline transition-colors duration-200 flex items-center">
                  <span className="text-orange-500 mr-1">❯</span> हमारे बारे में
                </Link></li>
                <li><Link href="/animals" className="hover:text-orange-300 hover:underline transition-colors duration-200 flex items-center">
                  <span className="text-orange-500 mr-1">❯</span> पशु कल्याण
                </Link></li>
                <li><Link href="/gaushala" className="hover:text-orange-300 hover:underline transition-colors duration-200 flex items-center">
                  <span className="text-orange-500 mr-1">❯</span> गौशाला
                </Link></li>
                <li><Link href="/child-welfare" className="hover:text-orange-300 hover:underline transition-colors duration-200 flex items-center">
                  <span className="text-orange-500 mr-1">❯</span> बाल कल्याण
                </Link></li>
                <li><Link href="/environmental" className="hover:text-orange-300 hover:underline transition-colors duration-200 flex items-center">
                  <span className="text-orange-500 mr-1">❯</span> पर्यावरण
                </Link></li>
                <li><Link href="/donate" className="hover:text-orange-300 hover:underline transition-colors duration-200 flex items-center">
                  <span className="text-orange-500 mr-1">❯</span> दान करें
                </Link></li>
                <li><Link href="/stories" className="hover:text-orange-300 hover:underline transition-colors duration-200 flex items-center">
                  <span className="text-orange-500 mr-1">❯</span> सफलता की कहानियां
                </Link></li>
                <li><Link href="/contact" className="hover:text-orange-300 hover:underline transition-colors duration-200 flex items-center">
                  <span className="text-orange-500 mr-1">❯</span> संपर्क करें
                </Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-orange-500 pb-2">सहायता के कार्यक्रम</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/donate/monthly" className="hover:text-orange-300 hover:underline transition-colors duration-200 flex items-center">
                  <span className="text-orange-500 mr-1">❯</span> मासिक दान
                </Link></li>
                <li><Link href="/donate/corporate" className="hover:text-orange-300 hover:underline transition-colors duration-200 flex items-center">
                  <span className="text-orange-500 mr-1">❯</span> कॉर्पोरेट सहयोग
                </Link></li>
                <li><Link href="/donate/gaushala" className="hover:text-orange-300 hover:underline transition-colors duration-200 flex items-center">
                  <FaPaw className="text-orange-500 mr-1 text-xs" /> गौ सेवा
                </Link></li>
                <li><Link href="/donate/animals" className="hover:text-orange-300 hover:underline transition-colors duration-200 flex items-center">
                  <FaPaw className="text-orange-500 mr-1 text-xs" /> पशु देखभाल
                </Link></li>
                <li><Link href="/donate/hunger" className="hover:text-orange-300 hover:underline transition-colors duration-200 flex items-center">
                  <span className="text-orange-500 mr-1">❯</span> अन्न दान
                </Link></li>
                <li><Link href="/donate/children" className="hover:text-orange-300 hover:underline transition-colors duration-200 flex items-center">
                  <FaChild className="text-orange-500 mr-1 text-xs" /> बाल सहायता
                </Link></li>
                <li><Link href="/donate/environment" className="hover:text-orange-300 hover:underline transition-colors duration-200 flex items-center">
                  <FaLeaf className="text-orange-500 mr-1 text-xs" /> वृक्ष रोपण
                </Link></li>
              </ul>
              
              {/* Social media with Indian touch */}
              <h3 className="text-lg font-semibold text-white mt-6 mb-3 border-b border-orange-500 pb-2">हमसे जुड़ें</h3>
              <div className="flex space-x-3">
                <a href="#" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 p-2 rounded-full transition-colors duration-200">
                  <FaFacebookF size={16} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 p-2 rounded-full transition-colors duration-200">
                  <FaTwitter size={16} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 p-2 rounded-full transition-colors duration-200">
                  <FaInstagram size={16} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 p-2 rounded-full transition-colors duration-200">
                  <FaYoutube size={16} />
                </a>
              </div>
            </div>
            
            {/* Newsletter signup with Indian style */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-lg border-l-4 border-orange-500">
              <h3 className="text-lg font-semibold text-white mb-4">न्यूज़लेटर</h3>
              <p className="text-sm mb-3">हमारे मानवीय कार्य और प्रभाव की कहानियों के अपडेट प्राप्त करें।</p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="आपका ईमेल पता" 
                    className="w-full px-3 py-2 bg-gray-800 border border-orange-500 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
                >
                  सदस्यता लें
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-2">सदस्यता लेकर आप हमारी गोपनीयता नीति से सहमत हैं।</p>
            </div>
          </div>
          
          {/* Trust badges with Indian style */}
          <div className="border-t border-orange-800 pt-6 pb-2">
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-3 py-2 rounded text-xs text-center border-b-2 border-orange-500">
                <span className="block text-white font-semibold">80G</span>
                <span className="text-gray-400">कर छूट</span>
              </div>
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-3 py-2 rounded text-xs text-center border-b-2 border-orange-500">
                <span className="block text-white font-semibold">FCRA</span>
                <span className="text-gray-400">पंजीकृत</span>
              </div>
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-3 py-2 rounded text-xs text-center border-b-2 border-orange-500">
                <span className="block text-white font-semibold">90%</span>
                <span className="text-gray-400">कोष सीधे कार्यक्रमों में</span>
              </div>
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-3 py-2 rounded text-xs text-center border-b-2 border-orange-500">
                <span className="block text-white font-semibold">2010 से</span>
                <span className="text-gray-400">सेवा में समर्पित</span>
              </div>
            </div>
            
            {/* Indian payment methods */}
            <div className="flex justify-center mt-4 flex-wrap gap-3">
              <img src="/images/logo.png" alt="Logo" className="h-6 opacity-60 hover:opacity-100 transition-opacity" />
              <span className="text-gray-500 mx-2 self-center">|</span>
              <span className="text-xs text-gray-500 self-center">भुगतान के तरीके:</span>
              <span className="bg-white text-xs text-gray-800 px-2 py-1 rounded">UPI</span>
              <span className="bg-white text-xs text-gray-800 px-2 py-1 rounded">नेट बैंकिंग</span>
              <span className="bg-white text-xs text-gray-800 px-2 py-1 rounded">क्रेडिट/डेबिट कार्ड</span>
              <span className="bg-white text-xs text-gray-800 px-2 py-1 rounded">पेटीएम</span>
              <span className="bg-white text-xs text-gray-800 px-2 py-1 rounded">फ़ोनपे</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-900 py-4 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} करुणा फॉर ऑल चैरिटेबल ट्रस्ट | सर्वाधिकार सुरक्षित</p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link href="/privacy-policy" className="hover:text-orange-300 hover:underline transition-colors duration-200">गोपनीयता नीति</Link>
          <span className="text-gray-700">|</span>
          <Link href="/terms" className="hover:text-orange-300 hover:underline transition-colors duration-200">सेवा की शर्तें</Link>
          <span className="text-gray-700">|</span>
          <Link href="/accessibility" className="hover:text-orange-300 hover:underline transition-colors duration-200">एक्सेसिबिलिटी</Link>
        </div>
      </div>
      
      {/* Indian flag color decorative border at bottom */}
      <div className="h-1 bg-gradient-to-r from-green-600 via-white to-orange-500"></div>
    </footer>
  );
};

export default Footer;