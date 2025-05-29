import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/common/Layout';
import Button from '../../components/common/Button';
import { Animal } from '../../types';

export default function AnimalsPage() {
  // Mock data - in a real app, this would come from an API
  const allAnimals: Animal[] = [
    {
      id: '1',
      name: 'Raja',
      image: '/images/animals/dog1.jpg',
      breed: 'Indian Pariah Dog',
      age: '2 years',
      description: 'Raja is a loyal and intelligent desi dog who is great with families and guards the home with dedication.',
      status: 'available'
    },
    {
      id: '2',
      name: 'Lakshmi',
      image: '/images/animals/cat1.jpg',
      breed: 'Indian Street Cat',
      age: '1.5 years',
      description: 'Lakshmi is a gentle cat who brings good fortune to her home and loves warm laps on winter evenings.',
      status: 'available'
    },
    {
      id: '3',
      name: 'Gaumata',
      image: '/images/animals/dog2.jpg',
      breed: 'Desi Cow',
      age: '4 years',
      description: 'Gaumata is a sacred animal who needs care and protection. She gives nutritious milk and represents our cultural heritage.',
      status: 'sanctuary'
    },
    {
      id: '4',
      name: 'Krishna',
      image: '/images/animals/dog2.jpg',
      breed: 'Indie Puppy',
      age: '4 months',
      description: 'Krishna is an energetic and intelligent puppy who learns quickly and loves to play with children.',
      status: 'available'
    },
    {
      id: '5',
      name: 'Sheru',
      image: '/images/animals/dog1.jpg',
      breed: 'Mudhol Hound',
      age: '3 years',
      description: 'Sheru is a majestic Indian Mudhol hound who is fast, loyal, and has a royal lineage that goes back centuries.',
      status: 'available'
    },
    {
      id: '6',
      name: 'Moti',
      image: '/images/animals/cat1.jpg',
      breed: 'Himalayan Cat',
      age: '2 years',
      description: 'Moti is a beautiful Himalayan cat with soft fur who purrs loudly and enjoys peaceful meditation with her owners.',
      status: 'available'
    }
  ];

  const [filter, setFilter] = useState<string>('all');
  
  const filteredAnimals = filter === 'all' 
    ? allAnimals 
    : allAnimals.filter(animal => {
        if (filter === 'dogs') return animal.breed.toLowerCase().includes('dog') || animal.breed.toLowerCase().includes('puppy') || animal.breed.toLowerCase().includes('hound');
        if (filter === 'cats') return animal.breed.toLowerCase().includes('cat');
        if (filter === 'cows') return animal.breed.toLowerCase().includes('cow');
        return true;
      });

  return (
    <Layout>
      <Head>
        <title>पशु - भारतीय पशु सेवा</title>
        <meta name="description" content="Meet the animals looking for help and forever homes in India" />
      </Head>
      
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">हमारे पशु परिवार से मिलिए</h1>
          <p className="text-center mb-8 text-gray-600">Each animal has a unique story and needs your compassion</p>
          
          <div className="mb-8 flex justify-center">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  filter === 'all'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                सभी पशु
              </button>
              <button
                onClick={() => setFilter('dogs')}
                className={`px-4 py-2 text-sm font-medium ${
                  filter === 'dogs'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                कुत्ते
              </button>
              <button
                onClick={() => setFilter('cats')}
                className={`px-4 py-2 text-sm font-medium ${
                  filter === 'cats'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                बिल्लियाँ
              </button>
              <button
                onClick={() => setFilter('cows')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  filter === 'cows'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                गाय
              </button>
            </div>
          </div>
          
          {filteredAnimals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">इस श्रेणी में कोई पशु नहीं मिला।</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAnimals.map((animal) => (
                <div key={animal.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-64">
                    <Image 
                      src={animal.image} 
                      alt={animal.name} 
                      fill 
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-1">{animal.name}</h3>
                    <div className="text-gray-600 mb-2">{animal.breed} · {animal.age}</div>
                    <p className="text-gray-700 mb-4">{animal.description}</p>
                    <Link href={`/animals/${animal.id}`}>
                      <Button variant="primary">अधिक जानकारी</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}