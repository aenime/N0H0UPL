import React from 'react';
import Link from 'next/link';
import Button from '../common/Button';

const EmergencyAppeal: React.FC = () => {
  return (
    <div className="bg-red-50 py-6">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 p-6 md:p-8 bg-red-600 text-white">
              <span className="inline-block bg-white text-red-600 rounded-full px-3 py-1 text-xs font-semibold mb-3">आपातकालीन अपील</span>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Help Animals Affected by Maharashtra Flood Crisis</h2>
              <p className="mb-6">
                Hundreds of cattle, strays and wildlife are stranded without shelter and food due to the recent floods in rural Maharashtra. 
                Your emergency donation can help us rescue, treat, and provide food for these vulnerable animals.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/emergencies/maharashtra-floods">
                  <Button variant="secondary">Learn More</Button>
                </Link>
                <Link href="/donate/emergency">
                  <Button variant="primary" className="bg-white text-red-600 hover:bg-gray-100">Donate Emergency Relief</Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-6">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-700 mb-1">Goal: ₹10,00,000</div>
                <div className="text-sm text-gray-600 mb-3">Raised so far: ₹6,25,000 (63%)</div>
                <div className="w-full bg-gray-300 rounded-full h-4 mb-4">
                  <div className="bg-red-600 h-4 rounded-full" style={{ width: '63%' }}></div>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">217 donors</span> have already contributed
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  Emergency appeal ends in 5 days
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyAppeal;