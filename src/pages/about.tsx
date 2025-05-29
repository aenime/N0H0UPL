import Head from 'next/head';
import Layout from '../components/common/Layout';
import Button from '../components/common/Button';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <Layout>
      <Head>
        <title>About Us - Paws & Care</title>
        <meta name="description" content="Learn about our mission to help animals in need" />
      </Head>

      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Our Mission</h1>
          
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <p className="text-lg mb-6">
              At Paws & Care, we are dedicated to the rescue, rehabilitation, and rehoming of animals in need.
              Founded in 2010, our organization has helped thousands of animals find loving forever homes.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Compassion</h3>
                <p>We treat all animals with kindness and respect, ensuring their welfare is our top priority.</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p>We believe in the power of community to make a difference in the lives of animals.</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Education</h3>
                <p>We educate the public about responsible pet ownership and animal welfare issues.</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden">
                  <div className="bg-gray-300 w-full h-full flex items-center justify-center">
                    <span className="text-3xl">👤</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mt-2">Sarah Johnson</h3>
                <p className="text-gray-600">Founder & Director</p>
              </div>
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden">
                  <div className="bg-gray-300 w-full h-full flex items-center justify-center">
                    <span className="text-3xl">👤</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mt-2">Michael Thompson</h3>
                <p className="text-gray-600">Veterinarian</p>
              </div>
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden">
                  <div className="bg-gray-300 w-full h-full flex items-center justify-center">
                    <span className="text-3xl">👤</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mt-2">Emily Rodriguez</h3>
                <p className="text-gray-600">Adoption Coordinator</p>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <p className="text-lg mb-4">Join us in making a difference in the lives of animals in need.</p>
              <Link href="/donate">
                <Button variant="primary" size="lg">Support Our Cause</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}