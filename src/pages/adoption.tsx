import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/common/Layout';
import Button from '../components/common/Button';

const Adoption = () => {
  // Sample available animals for adoption
  const availableAnimals = [
    {
      id: 'dog1',
      name: 'Bruno',
      species: 'Dog',
      breed: 'Indian Mixed Breed',
      age: '2 years',
      gender: 'Male',
      description: 'Bruno is a friendly, energetic dog who loves playing fetch and going for walks. He is fully vaccinated and great with children.',
      image: '/images/animals/dog1.jpg',
    },
    {
      id: 'cat1',
      name: 'Whiskers',
      species: 'Cat',
      breed: 'Domestic Shorthair',
      age: '1 year',
      gender: 'Female',
      description: 'Whiskers is a gentle, curious cat who enjoys lounging in sunny spots and playing with toys. She is spayed and litter-trained.',
      image: '/images/animals/cat1.jpg',
    },
    {
      id: 'dog2',
      name: 'Rocky',
      species: 'Dog',
      breed: 'Labrador Mix',
      age: '3 years',
      gender: 'Male',
      description: 'Rocky is a calm, loyal companion who loves belly rubs and short walks. He has been rescued from a tough situation and is now ready for his forever home.',
      image: '/images/animals/dog2.jpg',
    }
  ];

  return (
    <Layout>
      <Head>
        <title>Adoption | Karuna For All</title>
        <meta name="description" content="Adopt a rescued animal and give them a loving forever home. Our adoption program ensures animals find caring families while promoting responsible pet ownership." />
      </Head>

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1750&q=80"
          alt="Animal adoption"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-purple-900/40 flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-3xl md:text-5xl text-white font-bold mb-4 max-w-2xl">
              Find Your Perfect Companion
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-6">
              Adopt, don't shop. Give a rescued animal a second chance at happiness.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#available">
                <Button 
                  variant="primary"
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  See Available Animals
                </Button>
              </Link>
              <Link href="#adoption-process">
                <Button 
                  variant="secondary"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/30"
                >
                  Adoption Process
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
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Adoption Program</h2>
            <p className="text-lg text-gray-600 mb-6">
              At Karuna For All, we believe that every animal deserves a loving home. Our adoption program aims to match rescued animals with caring families who will provide them with the love, care, and respect they deserve for the rest of their lives.
            </p>
            <p className="text-lg text-gray-600">
              We carefully screen all potential adopters to ensure our animals go to homes where they will be valued family members. Our process includes home visits, adoption counseling, and post-adoption support to ensure successful transitions for both the animals and their new families.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-xl mb-3 text-purple-800">Rescued Animals</h3>
                <p className="text-gray-600">All our animals have been rescued from abandonment, abuse, or neglect and rehabilitated to prepare for adoption</p>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-xl mb-3 text-purple-800">Fully Vetted</h3>
                <p className="text-gray-600">Our adoption animals are vaccinated, dewormed, and spayed/neutered before going to their new homes</p>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-xl mb-3 text-purple-800">Lifelong Support</h3>
                <p className="text-gray-600">We provide ongoing support and advice to adopters throughout their pet's lifetime</p>
              </div>
            </div>
          </div>

          {/* Available Animals */}
          <div id="available" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Available for Adoption</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {availableAnimals.map((animal) => (
                <div key={animal.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
                  <div className="relative h-64">
                    <Image 
                      src={animal.image}
                      alt={`${animal.name} - ${animal.species} for adoption`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 rounded-bl-lg text-sm font-medium">
                      {animal.species}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{animal.name}</h3>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                      <div>
                        <span className="text-gray-500">Breed:</span>
                        <p className="font-medium text-gray-800">{animal.breed}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Age:</span>
                        <p className="font-medium text-gray-800">{animal.age}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Gender:</span>
                        <p className="font-medium text-gray-800">{animal.gender}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6">
                      {animal.description}
                    </p>
                    
                    <Link href={`/animals/${animal.id}`}>
                      <Button 
                        variant="primary"
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        Meet {animal.name}
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link href="/animals">
                <Button 
                  variant="secondary"
                  className="border border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  See All Available Animals
                </Button>
              </Link>
            </div>
          </div>

          {/* Adoption Process */}
          <div id="adoption-process" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Adoption Process</h2>
            
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/4 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-2xl font-bold mb-3">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-center">Application</h3>
                </div>
                <div className="md:w-3/4">
                  <p className="text-gray-600">
                    Fill out our detailed adoption application form either online or in person at our shelter. This helps us understand your lifestyle, living situation, and experience with animals to make the best match possible.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/4 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-2xl font-bold mb-3">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-center">Meet & Greet</h3>
                </div>
                <div className="md:w-3/4">
                  <p className="text-gray-600">
                    Visit our center to meet the animal you're interested in adopting. We encourage all family members, including existing pets, to come along so we can ensure compatibility and a good fit for everyone.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/4 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-2xl font-bold mb-3">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-center">Home Check</h3>
                </div>
                <div className="md:w-3/4">
                  <p className="text-gray-600">
                    A member of our adoption team will visit your home to ensure it's safe and suitable for the animal you wish to adopt. This step helps us verify that the living environment matches what was described in the application.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/4 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-2xl font-bold mb-3">
                    4
                  </div>
                  <h3 className="text-xl font-semibold text-center">Adoption Contract</h3>
                </div>
                <div className="md:w-3/4">
                  <p className="text-gray-600">
                    Once approved, you'll sign an adoption contract agreeing to provide proper care for your new pet. This includes a commitment to regular veterinary care, proper nutrition, and returning the animal to us if you can no longer keep them.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/4 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-2xl font-bold mb-3">
                    5
                  </div>
                  <h3 className="text-xl font-semibold text-center">Follow-Up Support</h3>
                </div>
                <div className="md:w-3/4">
                  <p className="text-gray-600">
                    Our team will check in with you after adoption to see how the transition is going and provide any support or advice needed. We remain available throughout your pet's life for questions and assistance.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 p-6 bg-purple-50 rounded-lg border border-purple-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Adoption Fees</h3>
              <p className="text-gray-600 mb-4">
                Our adoption fees help cover the cost of vaccinations, spay/neuter surgery, microchipping, and medical care provided to the animal before adoption:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h4 className="font-medium text-purple-700">Dogs</h4>
                  <p className="text-gray-700">₹2,000 - ₹3,500</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h4 className="font-medium text-purple-700">Cats</h4>
                  <p className="text-gray-700">₹1,500 - ₹2,500</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h4 className="font-medium text-purple-700">Special Needs Animals</h4>
                  <p className="text-gray-700">Case-by-case basis</p>
                </div>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Success Stories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="grid grid-cols-2">
                  <div className="relative h-64">
                    <Image 
                      src="https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                      alt="Max with his new family"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-64">
                    <Image 
                      src="https://images.unsplash.com/photo-1601758174111-5560cdc4a3fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80"
                      alt="Max before adoption"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Max's New Beginning</h3>
                  <p className="text-gray-600 mb-4">
                    When Max arrived at our shelter, he was malnourished and timid after being abandoned on the streets. After three months of rehabilitation, he found his perfect family who had the patience to help him overcome his fears. Today, he's a confident, playful dog who loves exploring with his new family.
                  </p>
                  <div className="text-purple-600 font-medium">
                    Adopted in November 2024 | Now thriving in his forever home
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="grid grid-cols-2">
                  <div className="relative h-64">
                    <Image 
                      src="https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80"
                      alt="Luna playing with toys"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-64">
                    <Image 
                      src="https://images.unsplash.com/photo-1547565322-f8d881d1d6b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80"
                      alt="Luna before adoption"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Luna's Second Chance</h3>
                  <p className="text-gray-600 mb-4">
                    Luna was rescued from a hoarding situation where she had minimal human contact. She was terrified of people and would hide whenever anyone approached. With patience and gentle socialization, she slowly began to trust our staff. The Sharma family fell in love with her quiet personality and today, Luna enjoys sitting on laps and getting chin scratches.
                  </p>
                  <div className="text-purple-600 font-medium">
                    Adopted in February 2025 | Now a beloved lap cat
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">How long does the adoption process take?</h3>
                <p className="text-gray-600">
                  The entire adoption process typically takes 1-2 weeks, from application to bringing your new pet home. This allows time for application review, meet-and-greet sessions, home checks, and preparation for the animal's transition.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">What if the adoption doesn't work out?</h3>
                <p className="text-gray-600">
                  We have a return policy that requires adopters to return the animal to us rather than rehoming independently. We understand that sometimes, despite the best intentions, a match may not work out. There's no judgment - our primary concern is the animal's welfare.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Do you offer post-adoption support?</h3>
                <p className="text-gray-600">
                  Yes, we provide ongoing support after adoption including behavioral advice, referrals to pet-friendly services, and assistance with any issues that may arise. We're committed to ensuring a successful transition and lasting bond between adopters and their pets.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Can I adopt if I live in a rented apartment?</h3>
                <p className="text-gray-600">
                  Yes, but we'll need written confirmation from your landlord that pets are allowed in the property. We'll also consider the suitability of the space for the specific animal you're interested in adopting.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-purple-100 p-8 md:p-12 rounded-lg">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Add a New Family Member?</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                Begin your adoption journey today. Your perfect companion is waiting to meet you!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/adoption-application">
                  <Button 
                    variant="primary"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Start Adoption Application
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button 
                    variant="secondary"
                    className="border border-purple-300 text-purple-700 hover:bg-purple-50"
                  >
                    Contact Adoption Team
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Adoption;