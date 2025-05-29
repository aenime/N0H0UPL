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
          content="करुणा फॉर ऑल द्वारा संचालित पशु अस्पताल और निःशुल्क चिकित्सा शिविर। हम बेसहारा और जरूरतमंद पशुओं के लिए उच्च स्तरीय चिकित्सा सेवाएं प्रदान करते हैं।" 
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
              इसके अतिरिक्त, हमारे मोबाइल क्लिनिक दूरदराज के क्षेत्रों तक पहुंचते हैं, जहां पशु चिकित्सा सुविधाएं सीमित हैं।
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

      {/* Our Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">हमारी मेडिकल सेवाएं</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-56">
                <Image 
                  src="/images/animals/injured/injured-cat1.jpg" 
                  alt="Emergency surgery being performed" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">आपातकालीन चिकित्सा</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    सड़क दुर्घटना के शिकार पशुओं के लिए तत्काल चिकित्सा
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    24x7 उपलब्ध आपातकालीन सेवाएं और एम्बुलेंस
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    तत्काल सर्जिकल हस्तक्षेप और गहन देखभाल इकाई
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    विषाक्त पदार्थों का सेवन और अन्य आपातकालीन स्थितियों का प्रबंधन
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-56">
                <Image 
                  src="/images/animals/dog1.jpg" 
                  alt="Orthopedic surgery being performed" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">सर्जरी विभाग</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    हड्डियों के फ्रैक्चर के लिए हाइटेक ऑर्थोपेडिक सर्जरी
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    नरम ऊतक की सर्जरी और घाव की देखभाल
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    बड़े पशुओं के लिए विशेषज्ञ सर्जिकल देखभाल
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    न्यूरोसर्जरी और रीढ़ की हड्डी के विकारों का उपचार
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-56">
                <Image 
                  src="/images/animals/injured/injured-dog1.jpg" 
                  alt="X-ray and diagnostic imaging" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">डायग्नोस्टिक सेवाएं</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    उच्च-रिज़ॉल्यूशन X-ray और अल्ट्रासाउंड इमेजिंग
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    पूरी तरह से सुसज्जित इन-हाउस प्रयोगशाला
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    हीमेटोलॉजी और बायोकेमिस्ट्री परीक्षण
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    बायोप्सी और हिस्टोपैथोलॉजी
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-56">
                <Image 
                  src="/images/animals/cat1.jpg" 
                  alt="Preventive care and vaccination" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">निवारक देखभाल</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    नियमित टीकाकरण और परजीवी नियंत्रण
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    रेबीज और अन्य संक्रामक रोगों का नियंत्रण
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    नसबंदी और गर्भनिरोध कार्यक्रम
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    आवारा पशुओं के लिए Animal Birth Control (ABC) कार्यक्रम
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Clinics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">मोबाइल पशु चिकित्सा वाहन</h2>
            <p className="text-lg text-gray-600 mb-10 text-center">
              हमारी मोबाइल क्लिनिक टीम ग्रामीण और दूरदराज के क्षेत्रों में जाती है, जहां पशु चिकित्सा सेवाएं सीमित या अनुपलब्ध हैं।
              यह विशेष रूप से डिज़ाइन किए गए वाहन आवश्यक उपचार और प्रौद्योगिकी से लैस हैं।
            </p>

            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-64">
                <Image 
                  src="/images/animals/dog2.jpg" 
                  alt="Mobile veterinary clinic in a rural area" 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-2">प्रति माह 20+ ग्रामीण क्षेत्रों की यात्रा</h3>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">मोबाइल क्लिनिक सेवाएं:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        आवारा पशुओं का टीकाकरण और उपचार
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Animal Birth Control कार्यक्रम
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        रेबीज वैक्सीन अभियान
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">मोबाइल क्लिनिक उपकरण:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        पोर्टेबल सर्जरी सेटअप
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        आधारभूत डायग्नोस्टिक उपकरण
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        आवश्यक दवाइयां और सुई-सिरिंज
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Link href="/mobile-clinic">
                    <Button variant="primary" className="bg-green-600 hover:bg-green-700">
                      मोबाइल क्लिनिक के बारे में अधिक जानें
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">चिकित्सा सफलता की कहानियां</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <Image 
                  src="/images/animals/injured/injured-dog1.jpg" 
                  alt="Rocky - Before and After Treatment" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full">ऑर्थोपेडिक सर्जरी</span>
                <h3 className="text-xl font-bold my-2 text-gray-800">रॉकी की कहानी</h3>
                <p className="text-gray-600 mb-4">
                  रॉकी को एक कार दुर्घटना के बाद गंभीर रूप से घायल अवस्था में लाया गया। उसके पिछले पैर में जटिल फ्रैक्चर था। हमारे सर्जनों ने जटिल ऑर्थोपेडिक सर्जरी की और आज रॉकी फिर से दौड़ सकता है।
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  पुनर्वास समय: 3 महीने
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <Image 
                  src="/images/animals/cat1.jpg" 
                  alt="Mia - Before and After Treatment" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">आंतरिक चिकित्सा</span>
                <h3 className="text-xl font-bold my-2 text-gray-800">मिया का स्वास्थ्य लाभ</h3>
                <p className="text-gray-600 mb-4">
                  मिया गंभीर रूप से कुपोषित और निर्जलित अवस्था में एक खंडहर से बचाई गई थी। उसे मल्टी-ड्रग रेजिस्टेंट इन्फेक्शन था जिसके लिए विशेष एंटीबायोटिक थेरेपी की आवश्यकता थी।
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  उपचार अवधि: 6 सप्ताह
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <Image 
                  src="/images/animals/injured/injured-cow1.jpg" 
                  alt="Bhola - Before and After Treatment" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold bg-purple-100 text-purple-800 px-2 py-1 rounded-full">बड़े पशु चिकित्सा</span>
                <h3 className="text-xl font-bold my-2 text-gray-800">भोला का नया जीवन</h3>
                <p className="text-gray-600 mb-4">
                  भोला एक बैल था जिसे गंभीर संक्रमित घाव और अंदरूनी चोटों के साथ छोड़ दिया गया था। हमारे बड़े पशु चिकित्सकों द्वारा विशेष उपचार और देखभाल के बाद वह पूरी तरह से ठीक हो गया।
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  उपचार अवधि: 2 महीने
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">हमारा चिकित्सा प्रभाव</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">12,000+</div>
              <p className="text-lg">सर्जरी प्रति वर्ष</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">35,000+</div>
              <p className="text-lg">उपचारित पशु</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">80+</div>
              <p className="text-lg">ग्रामीण शिविर</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">93%</div>
              <p className="text-lg">उपचार सफलता दर</p>
            </div>
          </div>
        </div>
      </section>

      {/* Training & Education */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">प्रशिक्षण और शिक्षा</h2>
            <p className="text-lg text-gray-600 mb-10 text-center">
              हम भविष्य के पशु चिकित्सकों को प्रशिक्षित करने और जागरूकता फैलाने के लिए भी काम करते हैं। हमारे शैक्षिक कार्यक्रम आगामी पशु चिकित्सकों, पैरावेटरिनरी स्टाफ और पशु प्रेमियों के लिए हैं।
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-green-500">
                <h3 className="text-xl font-bold mb-3 text-gray-800">पशु चिकित्सा इंटर्नशिप</h3>
                <p className="text-gray-600 mb-4">
                  हम पशु चिकित्सा छात्रों को व्यावहारिक अनुभव प्रदान करते हैं, जिससे उन्हें आपातकालीन पशु चिकित्सा और सर्जरी में कौशल विकसित करने में मदद मिलती है।
                </p>
                <Link href="/vet-training" className="text-green-600 hover:text-green-700 font-medium inline-flex items-center">
                  अधिक जानकारी
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-500">
                <h3 className="text-xl font-bold mb-3 text-gray-800">समुदाय जागरूकता कार्यक्रम</h3>
                <p className="text-gray-600 mb-4">
                  हम स्कूलों और स्थानीय समुदायों में जागरूकता कार्यक्रम आयोजित करते हैं जिसमें पशु कल्याण, पशु देखभाल और जिम्मेदार पालतू पशु पालन के बारे में जानकारी दी जाती है।
                </p>
                <Link href="/awareness-programs" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">
                  अधिक जानकारी
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
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
              आपके दान से हम अधिक जानवरों का इलाज कर सकते हैं, बेहतर चिकित्सा उपकरण खरीद सकते हैं और अपनी मोबाइल क्लिनिक सेवाओं का विस्तार कर सकते हैं।
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/donate/medical-care">
                <Button variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                  चिकित्सा सेवाओं को दान दें
                </Button>
              </Link>
              
              <Link href="/volunteer/vet">
                <Button variant="secondary" className="bg-transparent border-2 border-white hover:bg-white/10">
                  स्वयंसेवक बनें
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
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">हमारे अस्पताल से संपर्क करें</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">पशु अस्पताल</h3>
                  <div className="space-y-3">
                    <p className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      आपातकालीन हेल्पलाइन: +91-8800-123456 (24x7)
                    </p>
                    <p className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      medical@karunaforall.org
                    </p>
                    <p className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      करुणा पशु अस्पताल, सरदार पटेल मार्ग, वसंत विहार, नई दिल्ली - 110057
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">अस्पताल के घंटे</h3>
                  <div className="space-y-3">
                    <p className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      आपातकालीन सेवाएं: 24 घंटे, 7 दिन
                    </p>
                    <p className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      ओपीडी: सोमवार - शनिवार, सुबह 9 बजे - शाम 6 बजे
                    </p>
                    <p className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      सर्जरी अपॉइंटमेंट: सोमवार - शुक्रवार
                    </p>
                  </div>
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