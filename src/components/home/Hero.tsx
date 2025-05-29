import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../common/Button';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[500px]">
      <div className="absolute inset-0">
        <Image 
          src="/images/hero-banner.jpg" 
          alt="Animal and humanitarian aid in India" 
          fill 
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-start">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          करुणा For All Living Beings
        </h1>
        <p className="text-xl text-white mb-6 max-w-lg">
          Your donation can save lives through our two essential missions:
        </p>
        <ul className="text-white mb-6 max-w-lg list-disc pl-5">
          <li className="mb-2"><span className="font-bold">Gaushala & Animal Protection:</span> Providing care, shelter, and rehabilitation for cows and other animals in need</li>
          <li className="mb-2"><span className="font-bold">Medical Aid:</span> Supporting life-saving treatments for underprivileged people in rural areas</li>
        </ul>
        <div className="flex flex-col gap-4">
          <Link href="/donate" className="inline-block">
            <Button variant="primary" size="lg">Donate Now</Button>
          </Link>
          <p className="text-white text-sm">Registered NGO - 80G Tax Benefits - GST No: 29AADTK2342R1ZA</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;