import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/common/Layout';
import DonationForm from '../components/donation/DonationForm';

export default function DonatePage() {
  return (
    <Layout>
      <Head>
        <title>Save Lives Now - Urgent Animal Rescue - Paws & Care</title>
        <meta name="description" content="Your donation today will save animals in critical need. Every minute counts - provide food, shelter and medical care to suffering animals." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta property="og:title" content="Save Lives Now - Urgent Animal Rescue" />
        <meta property="og:description" content="Your donation today will save animals in critical need." />
        <meta property="og:image" content="/images/animals/injured/injured-dog1.jpg" />
      </Head>
      
      <div className="bg-gray-50">
        {/* Urgent appeal banner */}
        <div className="bg-orange-600 text-white py-2 px-4 text-center text-sm md:text-base sticky top-0 z-10">
          <span className="font-bold">URGENT:</span> Animals in critical condition need your help now!
        </div>
        
        {/* Hero section with compelling image */}
        <div className="relative">
          <div className="relative h-[300px] md:h-[400px] w-full">
            <Image 
              src="/images/animals/injured/injured-dog1.jpg"
              alt="Injured dog in need of help" 
              fill
              className="object-cover brightness-[0.85]" 
              priority
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                This dog has 24 hours to live <span className="text-orange-400">without your help</span>
              </h1>
              <p className="text-white text-sm md:text-base mb-4">
                Your donation today provides immediate medical care, food and shelter
              </p>
              <a href="#donate-form" className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full py-3 px-6 inline-block text-center transition-colors mb-2 w-full md:w-auto animate-pulse">
                DONATE NOW TO SAVE LIVES
              </a>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          {/* Progress tracker */}
          <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">₹345,000 raised</span>
              <span className="text-green-600 font-medium">₹500,000 goal</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full" style={{width: '69%'}}></div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">463 donors</span>
              <span className="text-xs text-orange-600 font-medium">Emergency appeal ends in 2 days</span>
            </div>
          </div>
          
          {/* Impact cards - more emotionally appealing */}
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold mb-4">Your Donation's <span className="text-green-600">Immediate Impact</span></h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-lg shadow-md text-center">
                <div className="text-xl font-bold text-orange-600">₹500</div>
                <p className="text-xs">Feed a street dog for an entire month</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-md text-center">
                <div className="text-xl font-bold text-orange-600">₹1,000</div>
                <p className="text-xs">Vaccinate a vulnerable animal</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-md text-center">
                <div className="text-xl font-bold text-orange-600">₹2,500</div>
                <p className="text-xs">Provide one month of care for a rescued cow</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-md text-center">
                <div className="text-xl font-bold text-orange-600">₹5,000</div>
                <p className="text-xs">Emergency surgery for an injured animal</p>
              </div>
            </div>
          </div>
          
          {/* Urgency testimonial */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex items-center mb-2">
              <div className="w-12 h-12 relative rounded-full overflow-hidden mr-3">
                <Image 
                  src="/images/logo.png" 
                  alt="Dr. Sharma"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold">Dr. Sharma, Lead Veterinarian</p>
                <p className="text-xs text-gray-600">Emergency Animal Hospital</p>
              </div>
            </div>
            <p className="text-sm italic text-gray-700">
              "Every day, injured animals arrive at our doorstep needing immediate medical attention. 
              Without your donations, we wouldn't be able to save them. Your support is literally the 
              difference between life and death."
            </p>
          </div>
          
          {/* Donation form anchor */}
          <div id="donate-form" className="mb-2 -mt-20 pt-20">
            <DonationForm />
          </div>
          
          {/* Trust signals */}
          <div className="my-6 text-center">
            <p className="text-sm font-medium mb-3">Trusted by thousands across India</p>
            <div className="flex justify-center space-x-6">
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">10,000+</div>
                <p className="text-xs">Animals Rescued</p>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">8,500+</div>
                <p className="text-xs">Donors</p>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">15+</div>
                <p className="text-xs">Years of Service</p>
              </div>
            </div>
          </div>
          
          {/* Social proof */}
          <div className="mb-6">
            <div className="flex items-center space-x-1 mb-2 justify-center">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium">4.9/5 from 230+ reviews</span>
            </div>
          </div>
          
          {/* Last donation activity */}
          <div className="bg-white p-3 rounded-lg shadow-md mb-8">
            <p className="text-sm text-center mb-2 font-medium">Recent supporters</p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <p>Ananya S. donated ₹2,500</p>
                <p className="text-gray-500">3 mins ago</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Rajesh K. donated ₹1,000</p>
                <p className="text-gray-500">12 mins ago</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Priya M. donated ₹5,000</p>
                <p className="text-gray-500">37 mins ago</p>
              </div>
            </div>
          </div>
          
          {/* Emergency response commitment */}
          <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 mb-8">
            <h3 className="font-bold text-center mb-2">Our Emergency Response Promise</h3>
            <p className="text-sm text-center mb-4">
              When you donate today, our rescue team responds within <span className="font-bold">30 minutes</span> to save animals in critical condition.
            </p>
            <Link href="#donate-form">
              <div className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-full py-3 px-6 text-center transition-colors w-full block">
                DONATE & SAVE LIVES NOW
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}