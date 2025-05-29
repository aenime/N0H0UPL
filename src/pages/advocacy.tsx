import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/common/Layout';
import Button from '../components/common/Button';

const Advocacy = () => {
  return (
    <Layout>
      <Head>
        <title>Animal Advocacy | Karuna For All</title>
        <meta name="description" content="Our animal advocacy programs focus on creating lasting change through policy reform, public awareness campaigns, and partnership with government bodies to protect animal rights." />
      </Head>

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1565799508093-712062aeaddf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
          alt="Animal advocacy campaign"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-purple-700/40 flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-3xl md:text-5xl text-white font-bold mb-4 max-w-2xl">
              Giving Voice to the Voiceless
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-6">
              Advocating for stronger animal protection laws, policies, and public awareness
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/donate?campaign=advocacy">
                <Button 
                  variant="primary"
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Support Our Advocacy
                </Button>
              </Link>
              <Link href="#take-action">
                <Button 
                  variant="secondary"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/30"
                >
                  Take Action
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
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Advocacy Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              At Karuna For All, we believe that creating lasting change for animals requires not only direct intervention but also systemic changes through policy reform and public awareness. Our advocacy efforts aim to address the root causes of animal suffering by influencing legislation and building a society that values and protects animal welfare.
            </p>
            <p className="text-lg text-gray-600">
              Through evidence-based research, strategic partnerships with government bodies, and mobilization of public support, we campaign for stronger animal protection laws and their effective implementation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-xl mb-3 text-purple-800">Policy Reform</h3>
                <p className="text-gray-600">Working with government bodies to strengthen laws that protect animals from cruelty and exploitation</p>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-xl mb-3 text-purple-800">Public Awareness</h3>
                <p className="text-gray-600">Running campaigns to educate the public about animal rights issues and inspire collective action</p>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-xl mb-3 text-purple-800">Coalition Building</h3>
                <p className="text-gray-600">Creating networks of organizations and individuals to amplify our advocacy efforts and reach</p>
              </div>
            </div>
          </div>

          {/* Key Campaigns */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Key Campaigns</h2>
            
            <div className="space-y-16">
              {/* Campaign 1 */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 relative h-[300px]">
                  <Image 
                    src="https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80"
                    alt="Street animal welfare campaign"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Street Animal Welfare Policy</h3>
                  <p className="text-gray-600 mb-4">
                    Our flagship campaign focuses on developing comprehensive municipal guidelines for the humane management of street animals. We work with city authorities to implement sustainable sterilization programs, veterinary care protocols, and community engagement strategies.
                  </p>
                  <p className="text-gray-600 mb-4">
                    This campaign has led to improved conditions for street animals in 12 cities, with structured feeding programs, regular health check-ups, and reduced human-animal conflicts.
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">12 cities engaged</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Policy implementation</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Sterilization programs</span>
                  </div>
                </div>
              </div>

              {/* Campaign 2 */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 order-1 md:order-2 relative h-[300px]">
                  <Image 
                    src="https://images.unsplash.com/photo-1551958219-acbc608c6377?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                    alt="Animal transportation campaign"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-1/2 order-2 md:order-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Humane Transport Initiative</h3>
                  <p className="text-gray-600 mb-4">
                    We advocate for stricter regulations on the transport of farm animals to prevent suffering during transit. Through documentation of violations, engagement with transport authorities, and public pressure, we've driven significant improvements in animal transport conditions.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Our efforts have led to new guidelines being adopted by the national transport authority, limiting journey times and ensuring basic welfare provisions during transport.
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">New national guidelines</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">70% reduction in violations</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Transport company training</span>
                  </div>
                </div>
              </div>

              {/* Campaign 3 */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 relative h-[300px]">
                  <Image 
                    src="https://images.unsplash.com/photo-1583309219338-a582f1f9ca6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1227&q=80"
                    alt="Wildlife conservation campaign"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Wildlife Protection Campaign</h3>
                  <p className="text-gray-600 mb-4">
                    Our wildlife protection campaign targets illegal wildlife trade, habitat destruction, and human-wildlife conflict. We work with forest departments and law enforcement agencies to strengthen protection measures and prosecution of wildlife crimes.
                  </p>
                  <p className="text-gray-600 mb-4">
                    The campaign includes community education initiatives in buffer zones around protected areas, creating sustainable livelihoods that don't depend on wildlife exploitation.
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">5 protected areas covered</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Legal action support</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Community education</span>
                  </div>
                </div>
              </div>
              
              {/* Campaign 4 */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 order-1 md:order-2 relative h-[300px]">
                  <Image 
                    src="https://images.unsplash.com/photo-1526913382968-e119461bfcf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80"
                    alt="Animal welfare education"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-1/2 order-2 md:order-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Education Policy Reform</h3>
                  <p className="text-gray-600 mb-4">
                    We advocate for the inclusion of animal welfare and compassion in school curricula. Our team works with education boards to develop age-appropriate learning materials that teach children about responsible interaction with animals and environmental stewardship.
                  </p>
                  <p className="text-gray-600 mb-4">
                    This campaign has successfully introduced animal welfare modules in over 200 schools, reaching thousands of young minds with messages of compassion and respect for all beings.
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">200+ schools participating</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Curriculum development</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Teacher training programs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Policy Achievements */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Policy Achievements</h2>
            
            <div className="bg-purple-50 p-8 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Street Animal Protection Guidelines</h3>
                  </div>
                  <p className="text-gray-600">
                    Successfully advocated for comprehensive municipal guidelines adopted by 12 cities, establishing feeding stations, routine healthcare, and community caretaker programs.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Transport Regulations</h3>
                  </div>
                  <p className="text-gray-600">
                    Helped implement new regulations limiting transport durations, mandating adequate space, ventilation, and access to water for animals in transit.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Wildlife Corridor Protection</h3>
                  </div>
                  <p className="text-gray-600">
                    Secured legal protection for three wildlife corridors crucial for animal migration, preventing development that would fragment habitats.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Educational Integration</h3>
                  </div>
                  <p className="text-gray-600">
                    Achieved inclusion of animal welfare topics in school science and social studies curricula across three state education boards.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Take Action */}
          <div id="take-action" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Take Action</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Sign Our Petitions</h3>
                  <p className="text-gray-600 mb-6">
                    Make your voice heard by signing our active petitions advocating for animal welfare policy changes.
                  </p>
                  <div className="space-y-4">
                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="font-semibold text-gray-800 mb-1">Ban on Wild Animals in Circuses</h4>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">12,542 signatures of 15,000 goal</p>
                        <Link href="/petitions/circus-animals">
                          <Button variant="secondary" className="text-sm">Sign Now</Button>
                        </Link>
                      </div>
                    </div>
                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="font-semibold text-gray-800 mb-1">Strengthen Penalties for Animal Abuse</h4>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">8,921 signatures of 10,000 goal</p>
                        <Link href="/petitions/abuse-penalties">
                          <Button variant="secondary" className="text-sm">Sign Now</Button>
                        </Link>
                      </div>
                    </div>
                    <div className="pb-2">
                      <h4 className="font-semibold text-gray-800 mb-1">Wildlife Corridor Protection Act</h4>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">4,732 signatures of 10,000 goal</p>
                        <Link href="/petitions/wildlife-corridors">
                          <Button variant="secondary" className="text-sm">Sign Now</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Contact Decision Makers</h3>
                  <p className="text-gray-600 mb-6">
                    Use our templates to write to legislators and officials about important animal welfare policies.
                  </p>
                  <div className="space-y-4">
                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">City Council Members</h4>
                      <p className="text-sm text-gray-600 mb-2">Urge support for the Urban Animal Management Policy</p>
                      <Link href="/advocacy/contact/city-council">
                        <Button variant="secondary" className="text-sm">Use Template</Button>
                      </Link>
                    </div>
                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">State Representatives</h4>
                      <p className="text-sm text-gray-600 mb-2">Request strengthening of animal welfare enforcement</p>
                      <Link href="/advocacy/contact/state-reps">
                        <Button variant="secondary" className="text-sm">Use Template</Button>
                      </Link>
                    </div>
                    <div className="pb-2">
                      <h4 className="font-semibold text-gray-800 mb-2">Education Officials</h4>
                      <p className="text-sm text-gray-600 mb-2">Support inclusion of animal welfare in school curricula</p>
                      <Link href="/advocacy/contact/education-board">
                        <Button variant="secondary" className="text-sm">Use Template</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-purple-100 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Join Our Advocacy Network</h3>
              <p className="text-gray-600 mb-4">
                Become part of our advocacy network to receive alerts about urgent actions, upcoming policy discussions, and opportunities to speak up for animals.
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-3 border border-gray-300 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Button variant="primary" className="bg-purple-600 hover:bg-purple-700 whitespace-nowrap">
                  Join Network
                </Button>
              </div>
            </div>
          </div>

          {/* Research and Reports */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Research and Reports</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-48">
                  <Image 
                    src="https://images.unsplash.com/photo-1568122506084-57d012241427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                    alt="Street animal welfare report"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">State of Street Animals Report 2025</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Comprehensive data on street animal populations, welfare status, and intervention effectiveness across major cities.
                  </p>
                  <Link href="/reports/street-animals-2025">
                    <Button 
                      variant="secondary"
                      className="text-purple-700 hover:text-purple-800"
                    >
                      Download Report
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-48">
                  <Image 
                    src="https://images.unsplash.com/photo-1520697060875-76a76b86d91f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                    alt="Wildlife policy analysis"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Wildlife Policy Analysis 2024</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Critical assessment of current wildlife protection policies, implementation gaps, and recommendations for improvement.
                  </p>
                  <Link href="/reports/wildlife-policy-analysis">
                    <Button 
                      variant="secondary"
                      className="text-purple-700 hover:text-purple-800"
                    >
                      Download Report
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-48">
                  <Image 
                    src="https://images.unsplash.com/photo-1606036525232-dea9ba650eb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80"
                    alt="Animal transport investigation"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Animal Transport Investigation</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Investigative report documenting animal welfare violations during transport and recommendations for reform.
                  </p>
                  <Link href="/reports/transport-investigation">
                    <Button 
                      variant="secondary"
                      className="text-purple-700 hover:text-purple-800"
                    >
                      Download Report
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Support Our Advocacy */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg overflow-hidden shadow-lg">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 className="text-3xl font-bold text-white mb-4">Support Our Advocacy Work</h2>
                <p className="text-white/90 mb-6">
                  Your donation helps us advocate for stronger animal protection laws, conduct research, and run campaigns that create lasting change for animals.
                </p>
                <Link href="/donate?campaign=advocacy">
                  <Button 
                    variant="primary"
                    className="bg-white text-purple-700 hover:bg-gray-100"
                  >
                    Donate Today
                  </Button>
                </Link>
              </div>
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <Image 
                  src="https://images.unsplash.com/photo-1593526613712-7b4b8e8794b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                  alt="Animal advocacy campaign"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Advocacy;