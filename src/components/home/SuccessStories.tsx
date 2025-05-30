import React from 'react';
import Image from 'next/image';

const SuccessStories: React.FC = () => {
  const stories = [
    {
      id: 1,
      title: "Rescued from the Streets",
      description: "This little puppy was found injured on the streets. After months of care, he's now healthy and happy with his new family.",
      image: "/images/animals/dog1.jpg",
      outcome: "Successfully Adopted"
    },
    {
      id: 2,
      title: "Medical Miracle",
      description: "This cat came to us with severe injuries. Our veterinary team worked tirelessly to save her life.",
      image: "/images/animals/cat1.jpg",
      outcome: "Fully Recovered"
    },
    {
      id: 3,
      title: "A Second Chance",
      description: "After being abandoned, this dog found love and care at our shelter before finding his forever home.",
      image: "/images/animals/dog2.jpg",
      outcome: "Living Happily"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every rescue is a victory. Here are some of the amazing transformations made possible by your support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div key={story.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{story.title}</h3>
                <p className="text-gray-600 mb-4">{story.description}</p>
                <div className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  {story.outcome}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
