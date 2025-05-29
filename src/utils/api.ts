import axios from 'axios';
import { Animal, Donation } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

export const fetchDonations = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/donations`);
        return response.data;
    } catch {
        // Ignoring the error parameter since we're not using it
        throw new Error('Error fetching donations');
    }
};

// Define a type for donation data
interface DonationData {
  amount: string;
  name: string;
  email: string;
}

export const createDonation = async (donationData: DonationData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/donations`, donationData);
        return response.data;
    } catch {
        // Ignoring the error parameter since we're not using it
        throw new Error('Error creating donation');
    }
};

// API utility for donations
export async function submitDonation(donationData: {
  amount: string;
  name: string;
  email: string;
}): Promise<{ success: boolean; donation?: Donation; error?: string }> {
  try {
    const response = await fetch('/api/donations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donationData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting donation:', error);
    return {
      success: false,
      error: 'Failed to process donation. Please try again.',
    };
  }
}

// Fetch animals (in a real app this would come from an API or database)
export function getAnimals(): Animal[] {
  return [
    {
      id: '1',
      name: 'Max',
      image: '/images/animals/dog1.jpg',
      breed: 'Golden Retriever',
      age: '3 years',
      description: 'Max is a friendly and energetic dog who loves playing fetch and going for walks.',
      story: 'Max was found wandering alone near a highway. A kind person brought him to our shelter, and we discovered he had no microchip or ID. After medical care and rehabilitation, he\'s now ready to find his forever home.',
      status: 'available'
    },
    {
      id: '2',
      name: 'Luna',
      image: '/images/animals/cat1.jpg',
      breed: 'Domestic Shorthair',
      age: '2 years',
      description: 'Luna is a sweet and gentle cat who enjoys cuddles and playing with toys.',
      story: 'Luna was rescued from a hoarding situation along with several other cats. Despite her difficult past, she\'s incredibly affectionate and trusting with humans.',
      status: 'available'
    },
    {
      id: '3',
      name: 'Buddy',
      image: '/images/animals/dog2.jpg',
      breed: 'Labrador Mix',
      age: '1 year',
      description: 'Buddy is a playful puppy who is looking for an active family to call his own.',
      story: 'Buddy was surrendered to our shelter when his previous family moved to a place that didn\'t allow pets. He\'s a smart, sociable dog who\'s been learning basic commands.',
      status: 'available'
    }
  ];
}

// Get animal by ID
export function getAnimalById(id: string): Animal | undefined {
  const animals = getAnimals();
  return animals.find(animal => animal.id === id);
}