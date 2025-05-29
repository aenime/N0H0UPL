import React from 'react';
import Head from 'next/head';
import Layout from '../components/common/Layout';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../components/common/Button';

const AnimalRescue: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>पशु बचाव केंद्र | करुणा For All</title>
        <meta 
          name="description" 
          content="हमारा पशु बचाव केंद्र भारत के बेसहारा, घायल और जरूरतमंद पशुओं को बचाता है और उनका इलाज करता है। जानिए कैसे हम स्थानीय समुदायों के साथ मिलकर काम करते हैं।" 
        />
      </Head>

      {/* Hero banner */}
      <div className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/animals/injured/injured-cow1.jpg"
            alt="Animal rescue worker helping an injured cow"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              पशु बचाव और पुनर्वास केंद्र
            </h1>
            <p className="text-lg text-white mb-6">
              हर जीव का जीवन मूल्यवान है - हम उन्हें बचाने, इलाज करने और पुनर्वासित करने के लिए समर्पित हैं
            </p>
            <Link href="/donate/animal-rescue">
              <Button variant="primary" size="lg" className="bg-orange-500 hover:bg-orange-600">
                बचाव कार्य को सहयोग दें
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">पशु बचाव और देखभाल में हमारा दृष्टिकोण</h2>
            <p className="text-lg text-gray-600 mb-8">
              हमारा पशु बचाव केंद्र भारत के विभिन्न क्षेत्रों में बेसहारा, घायल और जरूरतमंद पशुओं को बचाने और उनका इलाज करने के लिए 24x7 कार्यरत है।
              हम आवारा पशुओं, विशेषकर कुत्तों, बिल्लियों, गायों और अन्य घरेलू व वन्य जीवों की मदद करते हैं जो दुर्घटनाओं, प्राकृतिक आपदाओं, या मानव क्रूरता के शिकार हुए हैं।
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
              <div className="p-6 bg-orange-50 rounded-lg">
                <div className="bg-orange-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">24x7 हेल्पलाइन</h3>
                <p className="text-gray-600">
                  आपातकालीन संकटों के लिए हमारी टीम 24 घंटे उपलब्ध है और शीघ्रता से प्रतिक्रिया देती है
                </p>
              </div>
              <div className="p-6 bg-green-50 rounded-lg">
                <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">आधुनिक चिकित्सा</h3>
                <p className="text-gray-600">
                  अत्याधुनिक सुविधाओं से लैस केंद्र जहां प्रशिक्षित पशु चिकित्सक विशेषज्ञ देखभाल प्रदान करते हैं
                </p>
              </div>
              <div className="p-6 bg-blue-50 rounded-lg">
                <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">समुदाय का सहयोग</h3>
                <p className="text-gray-600">
                  जन-जागरूकता और शिक्षा के माध्यम से स्थानीय समुदाय को पशु कल्याण में शामिल करते हैं
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">हम कैसे काम करते हैं</h2>
            
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-1/3">
                  <div className="bg-white rounded-lg p-2 shadow-lg">
                    <div className="aspect-w-1 aspect-h-1 w-full rounded-lg overflow-hidden">
                      <div className="relative h-64">
                        <Image 
                          src="/images/animals/dog1.jpg" 
                          alt="Animal rescue team responding to a call" 
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-orange-500">
                    <h3 className="text-xl font-bold mb-3 text-gray-800">1. आपातकालीन प्रतिक्रिया</h3>
                    <p className="text-gray-600 mb-4">
                      हमारी बचाव टीम किसी भी संकटग्रस्त पशु के लिए हेल्पलाइन पर कॉल प्राप्त करती है। हमारे प्रशिक्षित कार्यकर्ता तुरंत मौके पर पहुंचते हैं और पशु को सुरक्षित रूप से केंद्र तक लाने की व्यवस्था करते हैं।
                    </p>
                    <ul className="text-gray-600 space-y-1">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        हेल्पलाइन नंबर: +91-8800-123456 (24x7 उपलब्ध)
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        औसतन प्रतिक्रिया समय: शहरी क्षेत्रों में 30 मिनट, ग्रामीण क्षेत्रों में 60-90 मिनट
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse items-center gap-6">
                <div className="w-full md:w-1/3">
                  <div className="bg-white rounded-lg p-2 shadow-lg">
                    <div className="aspect-w-1 aspect-h-1 w-full rounded-lg overflow-hidden">
                      <div className="relative h-64">
                        <Image 
                          src="/images/animals/injured/injured-dog1.jpg" 
                          alt="Veterinarians treating an injured dog" 
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-green-500">
                    <h3 className="text-xl font-bold mb-3 text-gray-800">2. चिकित्सा और उपचार</h3>
                    <p className="text-gray-600 mb-4">
                      प्रत्येक पशु का हमारे अनुभवी पशुचिकित्सकों द्वारा विस्तृत परीक्षण किया जाता है। हमारे केंद्र में आधुनिक सर्जिकल सुविधाएं, X-ray, अल्ट्रासाउंड और प्रयोगशाला परीक्षण उपलब्ध हैं। घायल या बीमार पशुओं को उनकी स्थिति के अनुसार तत्काल उपचार दिया जाता है।
                    </p>
                    <ul className="text-gray-600 space-y-1">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        प्रति वर्ष 5,000+ पशुओं का इलाज
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        7 अनुभवी पशु चिकित्सक और 15 प्रशिक्षित सहायक स्टाफ
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-1/3">
                  <div className="bg-white rounded-lg p-2 shadow-lg">
                    <div className="aspect-w-1 aspect-h-1 w-full rounded-lg overflow-hidden">
                      <div className="relative h-64">
                        <Image 
                          src="/images/animals/cat1.jpg" 
                          alt="Cat recovering at the shelter" 
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-blue-500">
                    <h3 className="text-xl font-bold mb-3 text-gray-800">3. पुनर्वास और देखभाल</h3>
                    <p className="text-gray-600 mb-4">
                      उपचार के बाद, पशुओं को पूर्ण स्वास्थ्य लाभ तक हमारे केंद्र में रखा जाता है। यहां वे न केवल शारीरिक बल्कि मानसिक रूप से भी स्वस्थ होते हैं। हमारा स्टाफ उनके स्वास्थ्य की निगरानी करता है, उन्हें पौष्टिक भोजन देता है और उनके साथ समय बिताता है।
                    </p>
                    <ul className="text-gray-600 space-y-1">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        3 एकड़ का विशाल आश्रय क्षेत्र जहाँ पशु खुले में घूम सकते हैं
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        व्यावहारिक प्रशिक्षण और विशेषज्ञों द्वारा मनोवैज्ञानिक पुनर्वास
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse items-center gap-6">
                <div className="w-full md:w-1/3">
                  <div className="bg-white rounded-lg p-2 shadow-lg">
                    <div className="aspect-w-1 aspect-h-1 w-full rounded-lg overflow-hidden">
                      <div className="relative h-64">
                        <Image 
                          src="/images/animals/dog2.jpg" 
                          alt="A dog being adopted by a family" 
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-purple-500">
                    <h3 className="text-xl font-bold mb-3 text-gray-800">4. गोद लेना या प्राकृतिक आवास में वापसी</h3>
                    <p className="text-gray-600 mb-4">
                      पूर्ण स्वस्थ होने के बाद, हम पशुओं के लिए उचित घर खोजते हैं। जंगली जानवरों को उनके प्राकृतिक आवास में वापस छोड़ दिया जाता है, जबकि घरेलू पशुओं को गोद लेने की प्रक्रिया से गुजरना पड़ता है।
                    </p>
                    <ul className="text-gray-600 space-y-1">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        सख्त गोद लेने की प्रक्रिया जिसमें घर का निरीक्षण और फॉलो-अप शामिल है
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        वन विभाग के साथ समन्वय में जंगली जानवरों का पुनर्वास
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact with stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">हमारा प्रभाव</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <div className="text-4xl font-bold text-orange-600 mb-2">25,000+</div>
              <p className="text-gray-600">बचाए गए पशु</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">12,000+</div>
              <p className="text-gray-600">चिकित्सा उपचार</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">8,500+</div>
              <p className="text-gray-600">गोद लिए गए पशु</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">15,000+</div>
              <p className="text-gray-600">टीकाकरण</p>
            </div>
          </div>

          <div className="mt-16 bg-gray-50 p-6 rounded-lg max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-4 text-center text-gray-800">वर्तमान बचाव अभियान</h3>
            <p className="text-gray-600 mb-6 text-center">
              हम वर्तमान में महाराष्ट्र के बाढ़ प्रभावित क्षेत्रों में फंसे पशुओं को बचाने के लिए एक विशेष अभियान चला रहे हैं।
            </p>
            <div className="flex justify-center">
              <Link href="/emergencies/maharashtra-floods">
                <Button variant="primary" className="bg-red-600 hover:bg-red-700">
                  अधिक जानकारी
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">सफलता की कहानियां</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <Image 
                  src="/images/animals/dog1.jpg" 
                  alt="Rescued dog named Buddy" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">बड्डी का परिवर्तन</h3>
                <p className="text-gray-600 mb-4">
                  बड्डी एक गंभीर रूप से घायल और कुपोषित आवारा कुत्ता था जिसे हमने एक सड़क दुर्घटना के बाद बचाया। तीन महीने के गहन उपचार के बाद, वह पूरी तरह स्वस्थ हो गया और अब एक प्रेमपूर्ण परिवार के साथ रह रहा है।
                </p>
                <Link href="/stories/buddy" className="text-orange-600 hover:text-orange-700 font-medium">
                  पूरी कहानी पढ़ें →
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <Image 
                  src="/images/animals/cat1.jpg" 
                  alt="Rescued cat named Whiskers" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">व्हिस्कर्स का साहस</h3>
                <p className="text-gray-600 mb-4">
                  व्हिस्कर्स एक अत्यधिक भयभीत बिल्ली थी जिसे एक परित्यक्त फैक्ट्री से बचाया गया था। हमारे व्यावहारिक पुनर्वास कार्यक्रम के माध्यम से, वह अब एक खुशहाल, आत्मविश्वासी बिल्ली बन गई है।
                </p>
                <Link href="/stories/whiskers" className="text-orange-600 hover:text-orange-700 font-medium">
                  पूरी कहानी पढ़ें →
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <Image 
                  src="/images/animals/injured/injured-cow1.jpg" 
                  alt="Rescued cow named Lakshmi" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">लक्ष्मी का नया जीवन</h3>
                <p className="text-gray-600 mb-4">
                  लक्ष्मी एक बूढ़ी गाय थी जिसे मालिक ने छोड़ दिया था। घावों से भरी और कमजोर स्थिति में हमने उसे बचाया। अब वह हमारी गौशाला में शांति से रह रही है और अन्य गायों के साथ घूमती है।
                </p>
                <Link href="/stories/lakshmi" className="text-orange-600 hover:text-orange-700 font-medium">
                  पूरी कहानी पढ़ें →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">हमारे साथ जुड़ें</h2>
            <p className="text-lg mb-8">
              पशु बचाव में आप कई तरह से मदद कर सकते हैं - दान देकर, स्वयंसेवक बनकर, या पशु को गोद लेकर।
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/donate/animal-rescue">
                <Button variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
                  दान करें
                </Button>
              </Link>
              
              <Link href="/volunteer">
                <Button variant="secondary" className="bg-transparent border-2 border-white hover:bg-white/10">
                  स्वयंसेवक बनें
                </Button>
              </Link>
              
              <Link href="/adopt">
                <Button variant="secondary" className="bg-transparent border-2 border-white hover:bg-white/10">
                  गोद लें
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">संपर्क करें</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">पशु बचाव हेल्पलाइन</h3>
                  <div className="space-y-3">
                    <p className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      +91-8800-123456 (24x7 उपलब्ध)
                    </p>
                    <p className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      rescue@karunaforall.org
                    </p>
                    <p className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      करुणा पशु बचाव केंद्र, सरदार पटेल मार्ग, वसंत विहार, नई दिल्ली - 110057
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">विजिटिंग घंटे</h3>
                  <div className="space-y-3">
                    <p className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      सोमवार - शनिवार: सुबह 10 बजे - शाम 5 बजे तक
                    </p>
                    <p className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      रविवार: सुबह 11 बजे - दोपहर 3 बजे तक
                    </p>
                    <p className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      गोद लेने के लिए पहले से अपॉइंटमेंट आवश्यक है
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

export default AnimalRescue;