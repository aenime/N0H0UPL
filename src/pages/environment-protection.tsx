import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/common/Layout';
import Button from '../components/common/Button';

const EnvironmentProtection = () => {
  return (
    <Layout>
      <Head>
        <title>Environment Protection | Karuna For All</title>
        <meta name="description" content="Our environmental protection initiatives focus on preserving natural habitats, promoting sustainable practices, and creating a harmonious balance between humans and wildlife." />
      </Head>

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
          alt="Environmental conservation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20 flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-3xl md:text-5xl text-white font-bold mb-4 max-w-2xl">
              Protecting Our Environment for Animals and Humans
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-6">
              Creating a sustainable ecosystem where all living beings can thrive together in harmony
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/donate?campaign=environment">
                <Button 
                  variant="primary"
                  className="bg-green-600 hover:bg-green-700"
                >
                  Support Our Initiatives
                </Button>
              </Link>
              <Link href="#volunteer">
                <Button 
                  variant="secondary"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/30"
                >
                  Volunteer With Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          {/* Introduction */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Environmental Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              At Karuna For All, we understand that the well-being of animals is intrinsically linked to the health of our environment. Our environmental protection initiatives aim to preserve natural habitats, promote sustainable practices, and create a harmonious balance between humans and wildlife.
            </p>
            <p className="text-lg text-gray-600">
              Through collaborative efforts with local communities, government bodies, and other NGOs, we work towards creating a greener, cleaner, and more sustainable ecosystem for all living beings.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-xl mb-3 text-green-800">Sustainable Practices</h3>
                <p className="text-gray-600">Promoting eco-friendly lifestyle choices and sustainable development that respects the needs of wildlife</p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-xl mb-3 text-green-800">Habitat Preservation</h3>
                <p className="text-gray-600">Protecting and restoring natural habitats that are critical for various animal species to thrive</p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-xl mb-3 text-green-800">Wildlife Corridors</h3>
                <p className="text-gray-600">Establishing safe passages for animals to move between fragmented habitats due to urban development</p>
              </div>
            </div>
          </div>

          {/* Key Initiatives */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Key Initiatives</h2>
            
            <div className="space-y-16">
              {/* Initiative 1 */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 relative h-[300px]">
                  <Image 
                    src="https://images.unsplash.com/photo-1550686041-366ad85a1355?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                    alt="Tree plantation drive"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Tree Plantation Drives</h3>
                  <p className="text-gray-600 mb-4">
                    We organize regular tree plantation drives in urban and rural areas to increase green cover. Each year, we plant thousands of native trees that provide food and habitat for wildlife while combating air pollution.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Our carefully selected native species ensure sustainability and maximum ecological benefit. We also conduct follow-up care to ensure high survival rates of planted saplings.
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">5,000+ trees planted annually</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">85% survival rate</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">20+ urban locations</span>
                  </div>
                </div>
              </div>

              {/* Initiative 2 */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 order-1 md:order-2 relative h-[300px]">
                  <Image 
                    src="https://images.unsplash.com/photo-1628688513216-a35153001096?ixlib=rb-4.0.3&auto=format&fit=crop&w=1721&q=80"
                    alt="Water conservation project"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-1/2 order-2 md:order-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Water Conservation Projects</h3>
                  <p className="text-gray-600 mb-4">
                    Our water conservation initiatives focus on reviving water bodies that serve as crucial habitats for various species. We work on cleaning and restoring ponds, lakes, and other water bodies that have been polluted or neglected.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Through rainwater harvesting systems and water management practices, we help create sustainable water sources for wildlife in drought-prone areas.
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">15 water bodies restored</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Rain water harvesting</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Drought mitigation</span>
                  </div>
                </div>
              </div>

              {/* Initiative 3 */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 relative h-[300px]">
                  <Image 
                    src="https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1738&q=80"
                    alt="Waste management program"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Waste Management Programs</h3>
                  <p className="text-gray-600 mb-4">
                    Improper waste disposal poses serious threats to animals and their habitats. Our waste management programs educate communities about proper waste segregation and recycling practices to minimize environmental impact.
                  </p>
                  <p className="text-gray-600 mb-4">
                    We organize clean-up drives in forests, beaches, and urban areas where animals are at risk of ingesting or getting entangled in trash. Our initiatives have significantly reduced plastic pollution in key wildlife areas.
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Monthly clean-up drives</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">50+ tons of waste collected</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Recycling awareness</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Success Stories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-56">
                  <Image 
                    src="https://images.unsplash.com/photo-1480944657103-7fed22359e1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80"
                    alt="Urban Bird Sanctuary"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Urban Bird Sanctuary</h3>
                  <p className="text-gray-600 mb-4">
                    We transformed a neglected urban park into a thriving bird sanctuary by planting native trees and creating water features. Today, the sanctuary hosts over 45 bird species and has become an educational center for urban wildlife conservation.
                  </p>
                  <div className="text-green-600 font-medium">
                    45+ bird species | 20,000+ annual visitors
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-56">
                  <Image 
                    src="https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                    alt="River Cleanup Project"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">River Cleanup Project</h3>
                  <p className="text-gray-600 mb-4">
                    Our three-year project to clean a heavily polluted river that runs through agricultural lands has restored the water quality, allowing native fish to return and providing local farmers with clean irrigation water.
                  </p>
                  <div className="text-green-600 font-medium">
                    10 km stretch restored | 7 native fish species returned
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How You Can Help */}
          <div id="volunteer" className="bg-green-50 p-8 md:p-12 rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">How You Can Help</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-800">Donate</h3>
                <p className="text-gray-600 mb-4">Your financial support powers our environmental initiatives and helps us expand our impact.</p>
                <Link href="/donate?campaign=environment">
                  <Button 
                    variant="primary"
                    className="w-full"
                  >
                    Make a Donation
                  </Button>
                </Link>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-800">Volunteer</h3>
                <p className="text-gray-600 mb-4">Join our dedicated team of volunteers for tree plantations, clean-up drives, and more.</p>
                <Link href="/volunteer?area=environment">
                  <Button 
                    variant="primary"
                    className="w-full"
                  >
                    Join as Volunteer
                  </Button>
                </Link>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-800">Spread Awareness</h3>
                <p className="text-gray-600 mb-4">Help us educate others about environmental issues and sustainable practices.</p>
                <Link href="/resources/environment">
                  <Button 
                    variant="primary"
                    className="w-full"
                  >
                    Get Resources
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Mission for a Greener Future</h2>
          <p className="text-lg md:text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Together, we can create a sustainable environment where both humans and animals can thrive. 
            Every small action makes a significant impact.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/donate?campaign=environment">
              <Button 
                variant="primary"
                className="bg-white text-green-800 hover:bg-gray-100"
              >
                Make a Donation
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                variant="secondary"
                className="border border-white/50 hover:bg-white/10"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EnvironmentProtection;