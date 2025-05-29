import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Button from '../components/common/Button';
import { useRouter } from 'next/router';
import { MdArrowBack, MdOutlineWarning, MdPets, MdVolunteerActivism } from 'react-icons/md';
import { FaPaw, FaTwitter, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Maintenance = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  const [randomImage, setRandomImage] = useState('');
  const [loading, setLoading] = useState(true);
  
  const animalImages = [
    '/images/animals/dog1.jpg',
    '/images/animals/cat1.jpg',
    '/images/animals/dog2.jpg',
  ];

  useEffect(() => {
    // Select a random animal image
    setRandomImage(animalImages[Math.floor(Math.random() * animalImages.length)]);
    setLoading(false);
    
    // Countdown timer
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Head>
        <title>Page Under Maintenance | करुणा For All</title>
        <meta name="description" content="We're currently enhancing our website to serve you better. Please check back soon." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#f97316" />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden max-w-4xl w-full border border-orange-100">
          {/* Top accent bar with pawprint pattern */}
          <div className="h-3 bg-orange-500 flex overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <FaPaw key={i} className="text-orange-400 opacity-50 mx-1 animate-pulse" 
                style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left side - Image */}
            <div className="relative h-64 md:h-full overflow-hidden">
              {!loading && (
                <div className="absolute inset-0">
                  <Image 
                    src={randomImage} 
                    alt="Animal in need of care" 
                    fill 
                    className="object-cover transition-transform hover:scale-105 duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="font-medium text-lg">While we're away...</h3>
                    <p className="text-sm opacity-80">Our animals still need your support</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Right side - Content */}
            <div className="p-6 md:p-8 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative h-12 w-12">
                  <Image 
                    src="/images/logo.png" 
                    alt="करुणा For All Logo" 
                    fill
                    className="object-contain" 
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    करुणा <span className="text-orange-600">For All</span>
                  </h1>
                  <p className="text-sm text-gray-500">Compassion in Action</p>
                </div>
              </div>
              
              <div className="mb-6 flex items-center justify-start">
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                  <MdPets className="text-3xl text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Page Under Maintenance
                  </h2>
                  <p className="text-sm text-gray-500">
                    सेवा अस्थायी रूप से अनुपलब्ध
                  </p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <p className="text-gray-700">
                  We're currently upgrading this page to better serve our animal friends and supporters like you.
                </p>
                
                <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
                  <p className="text-gray-700 text-sm">
                    <span className="font-medium block">हम जल्द वापस आएंगे</span>
                    We're improving our website to better help animals in need. Thank you for your patience.
                  </p>
                </div>
              </div>
              
              {/* Helpline Information */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4 mb-6 border border-orange-100">
                <div className="flex items-center gap-2 mb-2">
                  <MdOutlineWarning className="text-orange-600 text-xl" />
                  <h3 className="font-medium text-orange-800">Need immediate assistance?</h3>
                </div>
                
                <a href="tel:+91-8800-123456" className="text-orange-600 text-xl font-semibold block hover:text-orange-700 transition-colors">
                  +91 8800-123456
                </a>
                <p className="text-xs text-gray-600">For animal emergencies: +91 9900-654321</p>
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                <Button 
                  onClick={() => router.push('/')}
                  className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-1 py-2 px-4"
                >
                  <MdArrowBack /> 
                  <span>Go to homepage</span>
                </Button>
                
                <Button 
                  onClick={() => router.push('/donate')}
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 py-2 px-4"
                >
                  <MdVolunteerActivism /> 
                  <span>अभी दान करें</span>
                </Button>
              </div>
              
              {/* Social media links */}
              <div className="mt-auto">
                <p className="text-sm text-gray-500 mb-2">Follow us for updates:</p>
                <div className="flex gap-4">
                  {[
                    { icon: <FaTwitter />, label: "Twitter", url: "https://twitter.com" },
                    { icon: <FaFacebook />, label: "Facebook", url: "https://facebook.com" },
                    { icon: <FaInstagram />, label: "Instagram", url: "https://instagram.com" },
                    { icon: <FaWhatsapp />, label: "WhatsApp", url: "https://whatsapp.com" },
                  ].map((social, i) => (
                    <a 
                      key={i}
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-orange-100 hover:text-orange-600 transition-colors"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom accent bar */}
          <div className="h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500"></div>
        </div>
        
        <p className="text-gray-500 text-sm mt-8">
          &copy; {new Date().getFullYear()} करुणा फॉर ऑल चैरिटेबल ट्रस्ट | सर्वाधिकार सुरक्षित
        </p>
      </main>
    </div>
  );
};

export default Maintenance;