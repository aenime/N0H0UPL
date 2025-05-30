import React from 'react';
import Link from 'next/link';

const ProgramCategories: React.FC = () => {
  const programs = [
    {
      id: 1,
      title: "Emergency Rescue",
      description: "24/7 emergency response for injured and distressed animals",
      icon: "🚑",
      link: "/emergency"
    },
    {
      id: 2,
      title: "Medical Care",
      description: "Professional veterinary treatment and rehabilitation services",
      icon: "🏥",
      link: "/medical-care"
    },
    {
      id: 3,
      title: "Shelter & Care",
      description: "Safe shelter, nutritious food, and loving care for homeless animals",
      icon: "🏠",
      link: "/shelter"
    },
    {
      id: 4,
      title: "Adoption Program",
      description: "Helping animals find loving forever homes with responsible families",
      icon: "❤️",
      link: "/adoption"
    },
    {
      id: 5,
      title: "Education & Awareness",
      description: "Community education about animal welfare and responsible pet ownership",
      icon: "📚",
      link: "/education"
    },
    {
      id: 6,
      title: "Volunteer Program",
      description: "Join our team of dedicated volunteers making a difference",
      icon: "🤝",
      link: "/volunteer"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Programs</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer comprehensive programs to address every aspect of animal welfare and rescue operations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <Link key={program.id} href={program.link}>
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer h-full">
                <div className="text-4xl mb-4">{program.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h3>
                <p className="text-gray-600">{program.description}</p>
                <div className="mt-4 inline-flex items-center text-blue-600 font-medium">
                  Learn More
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramCategories;
