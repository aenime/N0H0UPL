import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../common/Button';

type InjuredAnimal = {
  id: string;
  name: string;
  image: string;
  breed: string;
  injury: string;
  description: string;
  urgency: 'critical' | 'serious' | 'stable';
};

const InjuredAnimals: React.FC = () => {
  const injuredAnimals: InjuredAnimal[] = [
    {
      id: 'rescue1',
      name: 'भोला',
      image: '/images/animals/injured/injured-dog1.jpg',
      breed: 'Indian Street Dog',
      injury: 'Leg Injury',
      description: 'भोला को एक सड़क दुर्घटना में चोट लगी। उसे तत्काल चिकित्सा और पुनर्वास की आवश्यकता है।',
      urgency: 'critical'
    },
    {
      id: 'rescue2',
      name: 'चंदन',
      image: '/images/animals/injured/injured-cow1.jpg',
      breed: 'Desi Cow',
      injury: 'Malnutrition',
      description: 'चंदन को सड़क पर पाया गया था, भूखा और कमजोर। वह अब हमारे गौशाला में है और उपचार प्राप्त कर रहा है।',
      urgency: 'serious'
    },
    {
      id: 'rescue3',
      name: 'मिटटू',
      image: '/images/animals/injured/injured-cat1.jpg',
      breed: 'Indian Street Cat',
      injury: 'Eye Infection',
      description: 'मिटटू को गंभीर आंख संक्रमण है। उसे विशेष देखभाल और दवाओं की आवश्यकता है।',
      urgency: 'stable'
    }
  ];

  return (
    <div className="py-12 bg-orange-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">आपातकालीन सहायता</h2>
        <p className="text-center mb-8 text-gray-600">These animals need immediate help. Your support can save their lives.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {injuredAnimals.map((animal) => (
            <div key={animal.id} className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-red-200">
              <div className="relative h-64">
                <div className={`absolute top-0 right-0 z-10 ${
                  animal.urgency === 'critical' ? 'bg-red-600' :
                  animal.urgency === 'serious' ? 'bg-orange-500' : 'bg-yellow-500'
                } text-white px-3 py-1 m-2 rounded-full text-sm`}>
                  {animal.urgency === 'critical' ? 'अत्यंत जरुरी' :
                   animal.urgency === 'serious' ? 'गंभीर' : 'स्थिर'}
                </div>
                <Image 
                  src={animal.image} 
                  alt={animal.name} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-4"> 
                <h3 className="text-xl font-bold mb-1">{animal.name}</h3>
                <div className="text-gray-600 mb-1 text-sm">{animal.breed}</div>
                <div className="text-red-600 font-semibold mb-2 text-sm">Injury: {animal.injury}</div>
                <p className="text-gray-700 mb-4">{animal.description}</p>
                <Link href="/donate">
                  <Button variant="primary" className="w-full">अभी मदद करें</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link href="/animals/injured">
            <Button variant="secondary">सभी आपातकालीन मामले देखें</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InjuredAnimals;