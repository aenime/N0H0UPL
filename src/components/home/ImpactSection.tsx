import React, { useState, useEffect } from 'react';
import { getDonationStats, initializeLocalStorage } from '../../utils/localStorage';

const ImpactSection: React.FC = () => {
  const [donationTotal, setDonationTotal] = useState<number>(0);
  const [donationCount, setDonationCount] = useState<number>(0);

  useEffect(() => {
    // Initialize localStorage if needed
    initializeLocalStorage();
    
    // Get donation statistics from localStorage
    const stats = getDonationStats();
    setDonationTotal(stats.total);
    setDonationCount(stats.count);
  }, []);

  const impactStats = [
    {
      id: 1,
      count: '500+',
      label: 'Animals Rescued',
      icon: '🐾'
    },
    {
      id: 2,
      count: '350+',
      label: 'Successful Adoptions',
      icon: '🏠'
    },
    {
      id: 3,
      count: donationTotal > 0 ? `₹${donationTotal.toLocaleString()}` : '$100K+',
      label: `${donationCount > 0 ? donationCount : 'Many'} Donations Received`,
      icon: '💰'
    },
    {
      id: 4,
      count: '1000+',
      label: 'Volunteer Hours',
      icon: '❤️'
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactStats.map((stat) => (
            <div key={stat.id} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-green-600 mb-2">{stat.count}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImpactSection;