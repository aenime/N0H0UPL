import React from 'react';

type Partner = {
  id: string;
  name: string;
  logo: string;
  altText: string;
};

const CorporatePartners: React.FC = () => {
  const partners: Partner[] = [
    {
      id: '1',
      name: 'PetSmart',
      logo: '/images/partners/partner1.png', // You'll need to add these images
      altText: 'PetSmart logo'
    },
    {
      id: '2',
      name: 'Royal Canin',
      logo: '/images/partners/partner2.png',
      altText: 'Royal Canin logo'
    },
    {
      id: '3',
      name: 'Hill\'s Pet Nutrition',
      logo: '/images/partners/partner3.png',
      altText: 'Hill\'s Pet Nutrition logo'
    },
    {
      id: '4',
      name: 'Chewy',
      logo: '/images/partners/partner4.png',
      altText: 'Chewy logo'
    },
    {
      id: '5',
      name: 'Purina',
      logo: '/images/partners/partner5.png',
      altText: 'Purina logo'
    }
  ];

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-2">Our Corporate Partners</h2>
        <p className="text-center text-gray-600 mb-8">These organizations help make our mission possible.</p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner) => (
            <div key={partner.id} className="w-32 h-20 relative grayscale hover:grayscale-0 transition-all">
              {/* This is a placeholder. You'll need to add actual partner logos */}
              <div className="flex items-center justify-center h-full border border-gray-200 rounded-md bg-gray-50 px-4">
                <p className="text-sm text-center text-gray-500">{partner.name}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">Interested in becoming a corporate partner? 
            <a href="/contact" className="text-blue-600 hover:underline ml-1">Contact us</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CorporatePartners;