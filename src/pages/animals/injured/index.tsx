import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../../components/common/Layout';
import Button from '../../../components/common/Button';

type InjuredAnimal = {
  id: string;
  name: string;
  image: string;
  breed: string;
  injury: string;
  description: string;
  story: string;
  urgency: 'critical' | 'serious' | 'stable';
};

export default function InjuredAnimalsPage() {
  // Mock data - in a real app, this would come from an API
  const allInjuredAnimals: InjuredAnimal[] = [
    {
      id: 'rescue1',
      name: 'भोला',
      image: '/images/animals/injured/injured-dog1.jpg',
      breed: 'Indian Street Dog',
      injury: 'Leg Injury',
      description: 'भोला को एक सड़क दुर्घटना में चोट लगी। उसे तत्काल चिकित्सा और पुनर्वास की आवश्यकता है।',
      story: 'भोला को दिल्ली की एक व्यस्त सड़क पर एक दुर्घटना में बुरी तरह घायल पाया गया। हमारे रेस्क्यू टीम ने उसे तुरंत अपने क्लिनिक में भर्ती कराया। उसके पैर में गंभीर चोट है और उसे सर्जरी की जरूरत है। सर्जरी के बाद विशेष पुनर्वास की आवश्यकता होगी ताकि वह फिर से चल सके।',
      urgency: 'critical'
    },
    {
      id: 'rescue2',
      name: 'चंदन',
      image: '/images/animals/injured/injured-cow1.jpg',
      breed: 'Desi Cow',
      injury: 'Malnutrition',
      description: 'चंदन को सड़क पर पाया गया था, भूखा और कमजोर। वह अब हमारे गौशाला में है और उपचार प्राप्त कर रहा है।',
      story: 'चंदन को उत्तर प्रदेश के एक गांव के बाहर छोड़ दिया गया था जब वह दूध देना बंद कर दी। उसके पूर्व मालिक उसे रखने का खर्च नहीं उठा सकते थे। जब हमें उसके बारे में सूचना मिली, वह गंभीर कुपोषण की स्थिति में थी और खड़े होने में भी असमर्थ थी। हमारे पशु चिकित्सकों ने उसका इलाज शुरू किया है और विशेष आहार दे रहे हैं, लेकिन उसकी पूरी वसूली में अभी कई महीने लगेंगे।',
      urgency: 'serious'
    },
    {
      id: 'rescue3',
      name: 'मिटटू',
      image: '/images/animals/injured/injured-cat1.jpg',
      breed: 'Indian Street Cat',
      injury: 'Eye Infection',
      description: 'मिटटू को गंभीर आंख संक्रमण है। उसे विशेष देखभाल और दवाओं की आवश्यकता है।',
      story: 'मिटटू को मुंबई में एक बारिश के दिन एक नाली के पास पाया गया था। उसकी दोनों आंखें संक्रमण से गंभीर रूप से प्रभावित थीं। उसे तुरंत हमारे क्लिनिक लाया गया जहां उसका इलाज शुरू किया गया। विशेष आंख ड्रॉप्स और एंटीबायोटिक्स के साथ, वह अब स्थिर है लेकिन उसे एक आंख का आंशिक दृष्टि नुकसान हो सकता है। फिर भी, हम आशावादी हैं कि उचित देखभाल के साथ वह एक स्वस्थ जीवन जी पाएगी।',
      urgency: 'stable'
    },
    {
      id: 'rescue4',
      name: 'बहादुर',
      image: '/images/animals/injured/injured-dog1.jpg',
      breed: 'Indian Pariah Dog',
      injury: 'Burns',
      description: 'बहादुर को पटाखों से गंभीर जलन हुई है। उसे विशेष देखभाल और लंबे समय तक इलाज की आवश्यकता है।',
      story: 'दिवाली के दौरान, बहादुर पटाखों से घायल हो गया था। उसके शरीर पर जगह-जगह जलन के निशान हैं। एक जागरूक नागरिक ने उसे हमारे आश्रय में लाया था। उसे दर्द से राहत और संक्रमण को रोकने के लिए विशेष उपचार की आवश्यकता है। जलन के घाव भरने में समय लगेगा, लेकिन हम उसके पूरी तरह से ठीक होने की उम्मीद करते हैं।',
      urgency: 'serious'
    },
    {
      id: 'rescue5',
      name: 'लक्की',
      image: '/images/animals/injured/injured-cat1.jpg',
      breed: 'Bengal Mix',
      injury: 'Broken Leg',
      description: 'लक्की को ऊंचाई से गिरने के कारण टूटा हुआ पैर है। उसे सर्जरी और लंबे पुनर्वास की आवश्यकता है।',
      story: 'लक्की को जयपुर में एक इमारत की तीसरी मंजिल से गिरने के बाद पाया गया था। उसका एक पैर बुरी तरह टूट गया था और उसे तुरंत सर्जरी की आवश्यकता थी। हमारे पशु चिकित्सकों ने सर्जरी की और अब वह धीरे-धीरे ठीक हो रही है। उसके पैर में पिन लगाए गए हैं जिन्हें कुछ महीनों में निकालना होगा। इस दौरान, उसे विशेष देखभाल और फिजियोथेरेपी की आवश्यकता है।',
      urgency: 'stable'
    },
    {
      id: 'rescue6',
      name: 'रानी',
      image: '/images/animals/injured/injured-cow1.jpg',
      breed: 'Jersey Cow',
      injury: 'Infected Wound',
      description: 'रानी को शरीर पर एक गहरा संक्रमित घाव है। उसे तत्काल चिकित्सा देखभाल की आवश्यकता है।',
      story: 'रानी को गुजरात के एक गांव में उसके मालिक द्वारा उसके उम्र बढ़ने के कारण छोड़ दिया गया था। हमारे टीम ने उसे खेतों के पास घूमते हुए पाया, जहां उसके शरीर पर एक गहरा घाव था जो संक्रमित हो गया था। संक्रमण पूरे शरीर में फैल रहा था और उसे बुखार था। हमने उसे तुरंत अपने गौशाला में लाया और इलाज शुरू किया। एंटीबायोटिक्स और नियमित ड्रेसिंग के साथ, उसकी स्थिति अब स्थिर है, लेकिन उसे पूरी तरह ठीक होने के लिए लंबे समय तक इलाज की आवश्यकता है।',
      urgency: 'critical'
    }
  ];

  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  
  const filteredAnimals = urgencyFilter === 'all' 
    ? allInjuredAnimals 
    : allInjuredAnimals.filter(animal => animal.urgency === urgencyFilter);

  return (
    <Layout>
      <Head>
        <title>आपातकालीन मामले - भारतीय पशु सेवा</title>
        <meta name="description" content="Meet the animals in emergency situations that need immediate help" />
      </Head>
      
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-2">आपातकालीन मामले</h1>
          <p className="text-center mb-8 text-gray-600">These animals need immediate medical attention and your support</p>
          
          <div className="mb-8 flex justify-center">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                onClick={() => setUrgencyFilter('all')}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  urgencyFilter === 'all'
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                सभी मामले
              </button>
              <button
                onClick={() => setUrgencyFilter('critical')}
                className={`px-4 py-2 text-sm font-medium ${
                  urgencyFilter === 'critical'
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                अत्यंत जरुरी
              </button>
              <button
                onClick={() => setUrgencyFilter('serious')}
                className={`px-4 py-2 text-sm font-medium ${
                  urgencyFilter === 'serious'
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                गंभीर
              </button>
              <button
                onClick={() => setUrgencyFilter('stable')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  urgencyFilter === 'stable'
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                स्थिर
              </button>
            </div>
          </div>
          
          {filteredAnimals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">इस श्रेणी में कोई पशु नहीं मिला।</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAnimals.map((animal) => (
                <div key={animal.id} className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-red-200">
                  <div className="relative h-64">
                    <div className={`absolute top-0 right-0 z-10 ${
                      animal.urgency === 'critical' ? 'bg-red-600' :
                      animal.urgency === 'serious' ? 'bg-orange-500' : 'bg-yellow-500'
                    } text-white px-3 py-1 m-2 rounded-full text-sm`}>
                      {animal.urgency === 'critical' ? 'अत्यंत जरुरी' :
                       animal.urgency === 'serious' ? 'गंभीर' : 'स्थिर'}
                    </div>
                    <Image 
                      src={animal.image} 
                      alt={animal.name} 
                      fill 
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-1">{animal.name}</h3>
                    <div className="text-gray-600 mb-1 text-sm">{animal.breed}</div>
                    <div className="text-red-600 font-semibold mb-2 text-sm">Injury: {animal.injury}</div>
                    <p className="text-gray-700 mb-4">{animal.description}</p>
                    <details className="mb-4">
                      <summary className="font-medium cursor-pointer text-green-700">Read full story</summary>
                      <p className="mt-2 text-gray-700 pl-2 border-l-2 border-green-200">{animal.story}</p>
                    </details>
                    <Link href="/donate">
                      <Button variant="primary" className="w-full">अभी मदद करें</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-12">
            <h2 className="text-2xl font-bold text-center mb-4">आपात स्थिति में जानवरों की मदद कैसे करें</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li>
                <strong>तत्काल सहायता:</strong> घायल जानवर देखें तो हमारे हेल्पलाइन <strong>1800-XXX-XXXX</strong> पर कॉल करें
              </li>
              <li>
                <strong>फोटो भेजें:</strong> संभव हो तो जानवर की स्थिति की फोटो हमारे WhatsApp नंबर पर भेजें
              </li>
              <li>
                <strong>सुरक्षित रखें:</strong> जानवर को यातायात और अन्य खतरों से दूर एक सुरक्षित जगह पर रखें
              </li>
              <li>
                <strong>आर्थिक मदद:</strong> इलाज में आर्थिक सहायता के लिए दान करें - हर छोटी रकम मायने रखती है
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}