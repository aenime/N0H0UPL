import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const InjuredAnimals: React.FC = () => {
  const injuredAnimals = [
    {
      id: 1,
      name: "Emergency Case #247",
      description: "Injured dog found on highway needs immediate medical attention",
      image: "/images/animals/injured/injured-dog1.jpg",
      urgency: "Critical",
      location: "Mumbai Highway"
    },
    {
      id: 2,
      name: "Emergency Case #248",
      description: "Injured cow with broken leg requires surgery and rehabilitation",
      image: "/images/animals/injured/injured-cow1.jpg",
      urgency: "High",
      location: "Rural Delhi"
    },
    {
      id: 3,
      name: "Emergency Case #249",
      description: "Injured cat with severe wounds needs medical care",
      image: "/images/animals/injured/injured-cat1.jpg",
      urgency: "Medium",
      location: "Pune Streets"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
            🚨 URGENT HELP NEEDED
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Animals Need Immediate Help</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These animals are in critical condition and need your support right now. Every minute counts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {injuredAnimals.map((animal) => (
            <div key={animal.id} className="bg-white rounded-lg shadow-lg overflow-hidden border">
              <div className="relative h-48">
                <Image
                  src={animal.image}
                  alt={animal.name}
                  fill
                  className="object-cover"
                />
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(animal.urgency)}`}>
                  {animal.urgency}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{animal.name}</h3>
                <p className="text-gray-600 mb-3">{animal.description}</p>
                <div className="text-sm text-gray-500 mb-4">📍 {animal.location}</div>
                <Link href="/donate">
                  <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors">
                    Help Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/donate">
            <button className="bg-red-600 text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors animate-pulse">
              🚨 Emergency Donation - Help Save Lives
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InjuredAnimals;
