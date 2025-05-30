import React from 'react';
import Head from 'next/head';
import Layout from '../components/common/Layout';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../components/common/Button';

const MedicalCare: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>पशु चिकित्सा सेवा | करुणा For All</title>
        <meta 
          name="description" 
          content="करुणा फॉर ऑल द्वारा संचालित पशु अस्पताल और निःशुल्क चिकित्सा शिविर। हम बेसहारा और जरूरतमंद पशुओं को उच्च स्तरीय चिकित्सा सेवाएं प्रदान करते हैं।" 
        />
      </Head>

      {/* Hero banner */}
      <div className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/animals/injured/injured-dog1.jpg"
            alt="Veterinarians treating an injured street dog"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              पशु चिकित्सा और स्वास्थ्य सेवाएं
            </h1>
            <p className="text-lg text-white mb-6">
              हमारा समर्पित पशु अस्पताल और मोबाइल क्लिनिक जानवरों को आवश्यक चिकित्सा देखभाल प्रदान करते हैं
            </p>
            <Link href="/donate/medical-care">
              <Button variant="primary" size="lg" className="bg-green-600 hover:bg-green-700">
                चिकित्सा सेवाओं को सहयोग दें
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">हमारी चिकित्सा सेवाओं का परिचय</h2>
            <p className="text-lg text-gray-600 mb-8">
              करुणा फॉर ऑल अपने पशु चिकित्सा अस्पताल में पशुओं के लिए व्यापक चिकित्सा सेवाएं प्रदान करता है। हम सड़क दुर्घटनाओं में घायल, बीमार और त्यागे गए पशुओं को आवश्यक देखभाल और उपचार प्रदान करते हैं।
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
              <div className="p-6 bg-green-50 rounded-lg">
                <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">अनुभवी चिकित्सक</h3>
                <p className="text-gray-600">
                  हमारे पशु चिकित्सक विशेषज्ञ हैं और उन्हें विशेष रूप से आपातकालीन पशु चिकित्सा और सर्जरी में प्रशिक्षित किया गया है
                </p>
              </div>
              <div className="p-6 bg-blue-50 rounded-lg">
                <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">आधुनिक उपकरण</h3>
                <p className="text-gray-600">
                  अत्याधुनिक डायग्नोस्टिक और सर्जिकल उपकरणों से लैस अस्पताल जहां जटिल प्रक्रियाएं भी संभव हैं
                </p>
              </div>
              <div className="p-6 bg-purple-50 rounded-lg">
                <div className="bg-purple-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">पुनर्वास सुविधा</h3>
                <p className="text-gray-600">
                  सर्जरी के बाद पशुओं के पूर्ण स्वास्थ्य लाभ के लिए विशेष देखभाल और पुनर्वास सुविधा
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Us CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">हमारी चिकित्सा सेवाओं का सहयोग करें</h2>
            <p className="text-lg mb-8">
              आपके दान से हम अधिक जानवरों का इलाज कर सकते हैं, बेहतर चिकित्सा उपकरण खरीद सकते हैं और अपनी सेवाओं का विस्तार कर सकते हैं।
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/donate">
                <Button variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                  चिकित्सा सेवाओं को दान दें
                </Button>
              </Link>
              
              <Link href="/contact">
                <Button variant="secondary" className="bg-transparent border-2 border-white hover:bg-white/10">
                  संपर्क करें
                </Button>
              </Link>
            </div>

            <div className="mt-8 bg-white/10 p-4 rounded-lg inline-block">
              <p className="text-sm">प्रति ₹1,000 दान से एक आवारा पशु का पूर्ण चिकित्सा उपचार संभव हो जाता है</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">आपातकालीन संपर्क</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-bold mb-4 text-gray-800 text-red-600">24/7 आपातकालीन हॉटलाइन</h3>
                <div className="space-y-3">
                  <p className="flex items-center text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +91-XXXX-XXXXXX
                  </p>
                  <p className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    emergency@karunaforall.org
                  </p>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                <h3 className="text-xl font-bold mb-4 text-gray-800 text-green-600">सामान्य चिकित्सा सेवाएं</h3>
                <div className="space-y-3">
                  <p className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    medical@karunaforall.org
                  </p>
                  <p className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    आपातकालीन सेवाएं: 24 घंटे, 7 दिन
                  </p>
                  <p className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    सामान्य सेवाएं: सुबह 8 - शाम 6 बजे
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MedicalCare;