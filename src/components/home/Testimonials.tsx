import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

type Testimonial = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
};

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Monthly Donor',
      avatar: '/images/testimonials/avatar1.jpg',
      content: 'I\'ve been supporting Paws & Care for three years now. Their commitment to animal welfare is truly inspiring, and I know my monthly donations are making a real difference in the lives of animals.'
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      role: 'Volunteer',
      avatar: '/images/testimonials/avatar2.jpg',
      content: 'Volunteering with Paws & Care has been one of the most rewarding experiences of my life. Seeing animals transform from scared and injured to happy and healthy is absolutely incredible.'
    },
    {
      id: '3',
      name: 'Emily Chen',
      role: 'Adopter',
      avatar: '/images/testimonials/avatar3.jpg',
      content: 'We adopted our dog Max from Paws & Care last year. The staff was incredibly helpful throughout the process, and Max has brought so much joy to our family. We\'re forever grateful!'
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">What Our Supporters Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from the people who have experienced our work firsthand - donors, volunteers, and adopters who believe in our mission.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-green-600 mb-4">
                <FaQuoteLeft size={24} />
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 relative overflow-hidden">
                  {/* Placeholder for avatar - in production you would use real images */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;