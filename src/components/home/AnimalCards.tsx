import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../common/Button';

type Animal = {
  id: string;
  name: string;
  image: string;
  breed: string;
  age: string;
  description: string;
};

const AnimalCards: React.FC = () => {
  const animals: Animal[] = [
    {
      id: '1',
      name: 'Raja',
      image: '/images/animals/dog1.jpg',
      breed: 'Indian Pariah Dog',
      age: '2 years',
      description: 'Raja is a loyal and intelligent desi dog who is great with families and guards the home with dedication.'
    },
    {
      id: '2',
      name: 'Lakshmi',
      image: '/images/animals/cat1.jpg',
      breed: 'Indian Street Cat',
      age: '1.5 years',
      description: 'Lakshmi is a gentle cat who brings good fortune to her home and loves warm laps on winter evenings.'
    },
    {
      id: '3',
      name: 'Gaumata',
      image: '/images/animals/dog2.jpg',
      breed: 'Desi Cow',
      age: '4 years',
      description: 'Gaumata is a sacred animal who needs care and protection. She gives nutritious milk and represents our cultural heritage.'
    }
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">पशुओं को आपकी सहायता की आवश्यकता है</h2>
        <p className="text-center mb-8 text-gray-600">These animals need your compassion and care. Your support can change their lives.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animals.map((animal) => (
            <div key={animal.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-96"> 
              <div className="relative h-72 w-full">
                <Image 
                  src={animal.image} 
                  alt={animal.name} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={animal.id === '1'} 
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-4 flex flex-col justify-between flex-grow"> 
                <div>
                  <h3 className="text-xl font-bold mb-1 truncate">{animal.name}</h3>
                  <div className="text-gray-600 mb-2 text-sm">{animal.breed} · {animal.age}</div>
                  <p className="text-gray-700 mb-3 text-sm line-clamp-2">{animal.description}</p> 
                </div>
                <div>
                  <Link href={`/animals/${animal.id}`}>
                    <Button variant="outline" size="sm" className="mr-2">जानकारी</Button>
                  </Link>
                  <Link href="/donate">
                    <Button variant="primary" size="sm">सहायता करें</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link href="/animals">
            <Button variant="secondary">सभी पशु देखें</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnimalCards;