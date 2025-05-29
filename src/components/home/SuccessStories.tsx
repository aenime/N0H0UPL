import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../common/Button';

type SuccessStory = {
  id: string;
  name: string;
  image: string;
  beforeImage?: string;
  storyTitle: string;
  shortDescription: string;
  fullStory: string;
};

const SuccessStories: React.FC = () => {
  const stories: SuccessStory[] = [
    {
      id: '1',
      name: 'Rocky',
      image: '/images/animals/dog1.jpg',
      storyTitle: 'From Streets to Loving Home',
      shortDescription: 'Rocky was found abandoned and injured. After rehabilitation, he found his forever family.',
      fullStory: 'Rocky was discovered on the streets with a broken leg and severe malnutrition. Our medical team provided emergency care, and after months of rehabilitation, he made a complete recovery. Rocky now lives with the Johnson family who provide him with endless love and care.'
    },
    {
      id: '2',
      name: 'Whiskers',
      image: '/images/animals/cat1.jpg',
      storyTitle: 'The Cat Who Survived Against All Odds',
      shortDescription: 'Whiskers was rescued from a hoarding situation and now thrives in her new home.',
      fullStory: 'Whiskers was one of 30 cats rescued from a severe hoarding situation. She was underweight and terrified of human contact. After patient care from our dedicated volunteers, she slowly learned to trust again. Today, she is a loving companion to an elderly woman who calls Whiskers her best friend.'
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Success Stories</h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">Every animal deserves a second chance at life. Here are some of the lives we've been able to transform with your support.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story) => (
            <div key={story.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <div className="relative h-64 w-full">
                <Image 
                  src={story.image} 
                  alt={story.name} 
                  fill 
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{story.storyTitle}</h3>
                <p className="text-gray-600 mb-3 font-medium">{story.name}'s Story</p>
                <p className="text-gray-700 mb-4">{story.shortDescription}</p>
                <Link href={`/stories/${story.id}`}>
                  <Button variant="outline">Read Full Story</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link href="/stories">
            <Button variant="secondary">View All Stories</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;