import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/common/Layout';
import Button from '../components/common/Button';

const CommunityOutreach = () => {
  return (
    <Layout>
      <Head>
        <title>Community Outreach | Karuna For All</title>
        <meta name="description" content="Our community outreach programs promote compassion for animals, educate people on animal welfare, and create a network of caring individuals working together for animal rights." />
      </Head>

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80"
          alt="Community outreach event"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/40 flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-3xl md:text-5xl text-white font-bold mb-4 max-w-2xl">
              Building Compassionate Communities Together
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-6">
              Educating, empowering, and engaging communities to create a safer world for animals
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/donate?campaign=community">
                <Button 
                  variant="primary"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Support Our Programs
                </Button>
              </Link>
              <Link href="#volunteer">
                <Button 
                  variant="secondary"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/30"
                >
                  Get Involved
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
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Community Approach</h2>
            <p className="text-lg text-gray-600 mb-6">
              At Karuna For All, we believe that sustainable animal welfare depends on engaged and educated communities. Our community outreach programs aim to foster a culture of compassion, create awareness about animal welfare issues, and empower people to take action.
            </p>
            <p className="text-lg text-gray-600">
              By working directly with schools, residential communities, and local businesses, we build a network of caring individuals who become advocates for animal rights and welfare in their own spheres of influence.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-xl mb-3 text-blue-800">Education</h3>
                <p className="text-gray-600">Raising awareness about animal welfare issues and teaching compassionate interaction with animals</p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-xl mb-3 text-blue-800">Skill Building</h3>
                <p className="text-gray-600">Training community members in animal first aid, rescue techniques, and responsible pet ownership</p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-xl mb-3 text-blue-800">Grassroots Network</h3>
                <p className="text-gray-600">Developing a committed network of local volunteers and advocates for animal welfare</p>
              </div>
            </div>
          </div>

          {/* Key Programs */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Key Programs</h2>
            
            <div className="space-y-16">
              {/* Program 1 */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 relative h-[300px]">
                  <Image 
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                    alt="School education program"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">School Education Programs</h3>
                  <p className="text-gray-600 mb-4">
                    Our educators visit schools to conduct interactive sessions that teach children about animal welfare, responsible pet ownership, and wildlife conservation. Through storytelling, games, and hands-on activities, we instill values of compassion and respect for all living beings.
                  </p>
                  <p className="text-gray-600 mb-4">
                    We also help schools establish animal welfare clubs where students can engage in ongoing activities, fundraising, and awareness campaigns.
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">100+ schools reached</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">20,000+ students educated</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">45 school clubs established</span>
                  </div>
                </div>
              </div>

              {/* Program 2 */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 order-1 md:order-2 relative h-[300px]">
                  <Image 
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1220&q=80"
                    alt="Community workshops"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-1/2 order-2 md:order-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Community Workshops</h3>
                  <p className="text-gray-600 mb-4">
                    We conduct regular workshops in residential communities, covering topics such as street animal care, humane solutions to human-animal conflict, and basic animal first aid. These practical sessions empower residents to address common animal welfare issues in their neighborhoods.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Our workshops also include specialized training for resident welfare associations on managing community animals humanely and legally.
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">75+ residential societies engaged</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">3,500+ participants trained</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">First aid demonstration</span>
                  </div>
                </div>
              </div>

              {/* Program 3 */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 relative h-[300px]">
                  <Image 
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                    alt="Animal welfare events"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Community Events & Campaigns</h3>
                  <p className="text-gray-600 mb-4">
                    We organize community-wide events such as adoption drives, vaccination camps, and awareness rallies to bring attention to animal welfare issues and provide practical solutions. These events create opportunities for community members to engage directly with our work.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Our campaigns focus on specific issues like street dog sterilization, preventing animal cruelty, and promoting adoption over buying pets.
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Quarterly adoption drives</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Monthly vaccination camps</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Awareness campaigns</span>
                  </div>
                </div>
              </div>
              
              {/* Program 4 */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 order-1 md:order-2 relative h-[300px]">
                  <Image 
                    src="https://images.unsplash.com/photo-1653482230612-d1148e5b4abd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                    alt="Corporate partnerships"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-1/2 order-2 md:order-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Corporate Partnerships</h3>
                  <p className="text-gray-600 mb-4">
                    We partner with businesses to organize CSR activities focused on animal welfare, such as shelter construction, feeding programs, and employee volunteering opportunities. These partnerships help us reach more communities and secure sustainable funding for our projects.
                  </p>
                  <p className="text-gray-600 mb-4">
                    We also offer workplace animal welfare education and create opportunities for corporate teams to engage in direct animal care activities.
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">25+ corporate partners</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Team building activities</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">CSR initiatives</span>
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
                    src="https://images.unsplash.com/photo-1518288774672-b94e808873ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                    alt="Green Valley Community"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Green Valley Community Initiative</h3>
                  <p className="text-gray-600 mb-4">
                    We worked with the Green Valley Resident Association to implement a comprehensive street dog management program. Through sterilization, vaccination, and community education, conflicts reduced by 90%, and residents now actively care for their community animals.
                  </p>
                  <div className="text-blue-600 font-medium">
                    100+ dogs sterilized | 90% reduction in conflicts
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-56">
                  <Image 
                    src="https://images.unsplash.com/photo-1627556704302-624286467c65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                    alt="St. Mary's School"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">St. Mary's School Animal Guardians</h3>
                  <p className="text-gray-600 mb-4">
                    After our educational programs, students at St. Mary's School formed an "Animal Guardians" club that now runs regular feeding stations for campus cats, advocates for animal welfare in their community, and raises funds for our rescue center.
                  </p>
                  <div className="text-blue-600 font-medium">
                    50+ active student members | ₹50,000 raised for animal welfare
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How You Can Help */}
          <div id="volunteer" className="bg-blue-50 p-8 md:p-12 rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Join Our Community Efforts</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-800">Become a Volunteer</h3>
                <p className="text-gray-600 mb-4">Join our team of community educators, event organizers, and outreach coordinators.</p>
                <Link href="/volunteer?area=community">
                  <Button 
                    variant="primary"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Volunteer With Us
                  </Button>
                </Link>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-800">Host a Workshop</h3>
                <p className="text-gray-600 mb-4">Invite us to conduct an animal welfare workshop in your community, school, or workplace.</p>
                <Link href="/contact?type=workshop">
                  <Button 
                    variant="primary"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Request a Workshop
                  </Button>
                </Link>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-800">Support Our Programs</h3>
                <p className="text-gray-600 mb-4">Your donation helps us reach more communities and conduct more outreach activities.</p>
                <Link href="/donate?campaign=community">
                  <Button 
                    variant="primary"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Make a Donation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Create Change in Your Community</h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Small actions in your community can create a big difference in the lives of animals.
            Let's work together to build a more compassionate world for all beings.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/volunteer?area=community">
              <Button 
                variant="primary"
                className="bg-white text-blue-800 hover:bg-gray-100"
              >
                Join Our Community Team
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

export default CommunityOutreach;