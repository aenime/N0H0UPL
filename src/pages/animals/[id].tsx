import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/common/Layout';
import Button from '../../components/common/Button';
import { Animal } from '../../types';

export default function AnimalDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  
  // Mock data - in a real app, this would come from an API based on the ID
  const animals: { [key: string]: Animal } = {
    '1': {
      id: '1',
      name: 'Raja',
      image: '/images/animals/dog1.jpg',
      breed: 'Indian Pariah Dog',
      age: '2 years',
      description: 'Raja is a loyal and intelligent desi dog who is great with families and guards the home with dedication.',
      story: 'Raja was found abandoned at a construction site in Delhi during the monsoon season. Our rescue team provided immediate care and shelter. Despite his difficult past, Raja has shown remarkable resilience and intelligence. He quickly learned basic commands and now provides loving companionship to our shelter staff. Desi dogs like Raja are known for their adaptability and loyalty, making excellent pets for Indian homes.',
      status: 'available'
    },
    '2': {
      id: '2',
      name: 'Lakshmi',
      image: '/images/animals/cat1.jpg',
      breed: 'Indian Street Cat',
      age: '1.5 years',
      description: 'Lakshmi is a gentle cat who brings good fortune to her home and loves warm laps on winter evenings.',
      story: 'Lakshmi was rescued as a tiny kitten during Diwali celebrations when she was found hiding under a temple veranda, scared of firecrackers. A kind devotee brought her to our shelter. She has blossomed into a beautiful, affectionate cat who loves being around people. In Indian homes, cats like Lakshmi are considered harbingers of prosperity and good luck. She would make a wonderful companion for a quiet household.',
      status: 'available'
    },
    '3': {
      id: '3',
      name: 'Gaumata',
      image: '/images/animals/dog2.jpg',
      breed: 'Desi Cow',
      age: '4 years',
      description: 'Gaumata is a sacred animal who needs care and protection. She gives nutritious milk and represents our cultural heritage.',
      story: 'Gaumata was found wandering on a busy highway after being abandoned by her previous owners who could no longer afford to keep her. In India, cows hold special cultural and religious significance but are often abandoned when they age. Our gaushala provides her with proper food, shelter, and medical care. The milk she produces supports our shelter, and her presence brings peace to visitors. By sponsoring Gaumata, you help preserve an important part of Indian heritage while providing care to this gentle creature.',
      status: 'sanctuary'
    },
    '4': {
      id: '4',
      name: 'Krishna',
      image: '/images/animals/dog2.jpg',
      breed: 'Indie Puppy',
      age: '4 months',
      description: 'Krishna is an energetic and intelligent puppy who learns quickly and loves to play with children.',
      story: 'Krishna was born in our shelter after we rescued his pregnant mother from the streets of Mumbai during heavy rains. As the only black puppy in the litter, he was named Krishna for his beautiful dark coat. He\'s extremely playful and smart, already responding to basic commands. Indian native dogs like Krishna are known for their natural immunity to local diseases and adaptability to the Indian climate, making them excellent companions with minimal health issues compared to foreign breeds.',
      status: 'available'
    }
  };

  const animal = id ? animals[id as string] : null;

  if (router.isFallback || !animal) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-lg">लोड हो रहा है...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{animal.name} - पशु सेवा</title>
        <meta name="description" content={`Learn about ${animal.name} and how you can help this animal`} />
      </Head>
      
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="relative h-72 md:h-full">
                  <Image 
                    src={animal.image} 
                    alt={animal.name} 
                    fill 
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
              
              <div className="p-6 md:w-1/2">
                <h1 className="text-3xl font-bold mb-2">{animal.name}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {animal.breed}
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {animal.age}
                  </span>
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {animal.status === 'available' ? 'गोद लेने के लिए उपलब्ध' : animal.status === 'sanctuary' ? 'आश्रय में रहता है' : animal.status}
                  </span>
                </div>
                
                <h2 className="text-xl font-semibold mb-2">परिचय</h2>
                <p className="text-gray-700 mb-4">{animal.description}</p>
                
                <h2 className="text-xl font-semibold mb-2">कहानी</h2>
                <p className="text-gray-700 mb-6">{animal.story}</p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/donate">
                    <Button variant="primary">सहायता करें {animal.name}</Button>
                  </Link>
                  <Link href="#contact">
                    <Button variant="outline">गोद लेने की जानकारी</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link href="/animals">
              <Button variant="secondary">सभी पशु देखें</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}