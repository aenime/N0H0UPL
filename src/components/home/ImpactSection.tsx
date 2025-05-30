import React from 'react';

const ImpactSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Through your generous support, we've been able to make a real difference in the lives of animals in need.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">12,000+</div>
            <div className="text-gray-600">Animals Rescued</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">8,500+</div>
            <div className="text-gray-600">Medical Treatments</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">15,000+</div>
            <div className="text-gray-600">Animals Fed Daily</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
            <div className="text-gray-600">Successful Adoptions</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
