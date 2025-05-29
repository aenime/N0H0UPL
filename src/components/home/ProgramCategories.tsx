import React from 'react';
import Link from 'next/link';
import { FaPaw, FaHospital, FaHome, FaHandsHelping, FaShieldAlt, FaUtensils, FaChild, FaLeaf } from 'react-icons/fa';

type Program = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
};

const ProgramCategories: React.FC = () => {
  const programs: Program[] = [
    {
      id: '1',
      title: 'Animal Rescue',
      description: 'Rescuing animals from abuse, abandonment, and dangerous situations.',
      icon: <FaPaw size={32} className="text-green-600" />,
      link: '/programs/rescue'
    },
    {
      id: '2',
      title: 'Medical Care',
      description: 'Providing veterinary treatment, surgeries, and preventive care.',
      icon: <FaHospital size={32} className="text-green-600" />,
      link: '/programs/medical'
    },
    {
      id: '3',
      title: 'Hunger Relief',
      description: 'Providing meals and food supplies to underprivileged communities and the homeless.',
      icon: <FaUtensils size={32} className="text-orange-600" />,
      link: '/programs/hunger-relief'
    },
    {
      id: '4',
      title: 'Child Welfare',
      description: 'Supporting orphaned and vulnerable children with shelter, education and care.',
      icon: <FaChild size={32} className="text-blue-600" />,
      link: '/programs/child-welfare'
    },
    {
      id: '5',
      title: 'Environmental Protection',
      description: 'Conservation efforts to preserve natural habitats and create a healthier environment.',
      icon: <FaLeaf size={32} className="text-green-600" />,
      link: '/programs/environment'
    },
    {
      id: '6',
      title: 'Community Outreach',
      description: 'Educational programs promoting welfare of all living beings in communities.',
      icon: <FaHandsHelping size={32} className="text-green-600" />,
      link: '/programs/community'
    },
    {
      id: '7',
      title: 'Adoption',
      description: 'Finding loving forever homes for rehabilitated animals.',
      icon: <FaHome size={32} className="text-green-600" />,
      link: '/programs/adoption'
    },
    {
      id: '8',
      title: 'Advocacy',
      description: 'Fighting for stronger protection laws and policies for all vulnerable beings.',
      icon: <FaShieldAlt size={32} className="text-green-600" />,
      link: '/programs/advocacy'
    }
  ];

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Our Programs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer comprehensive programs to help all living beings in need - from animal welfare to human hunger relief, orphaned children support, and environmental protection.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map(program => (
            <Link key={program.id} href={program.link}>
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full border border-gray-100">
                <div className="mb-4">
                  {program.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{program.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{program.description}</p>
                <div className="text-green-600 font-medium flex items-center mt-auto">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramCategories;