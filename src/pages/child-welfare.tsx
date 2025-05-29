import React from 'react';
import Head from 'next/head';
import Layout from '../components/common/Layout';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../components/common/Button';

const ChildWelfare: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>बाल कल्याण | करुणा For All</title>
        <meta 
          name="description" 
          content="भारत के वंचित बच्चों और युवाओं के लिए शिक्षा, स्वास्थ्य और विकास कार्यक्रम। उन्हें आत्मनिर्भर बनने और अच्छा जीवन जीने के लिए सक्षम बनाना।" 
        />
      </Head>

      {/* Hero banner */}
      <div className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/animals/dog2.jpg"
            alt="Children in a classroom setting"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              बाल कल्याण कार्यक्रम
            </h1>
            <p className="text-lg text-white mb-6">
              वंचित बच्चों और युवाओं को सशक्त बनाने के लिए शिक्षा, स्वास्थ्य और समर्थन कार्यक्रम
            </p>
            <Link href="/donate/child-welfare">
              <Button variant="primary" size="lg" className="bg-blue-600 hover:bg-blue-700">
                बच्चों की मदद करें
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">बाल कल्याण का परिचय</h2>
            <p className="text-lg text-gray-600 mb-8">
              करुणा फॉर ऑल का बाल कल्याण कार्यक्रम वंचित बच्चों और युवाओं को उनके पूर्ण क्षमता तक पहुंचने में मदद करने के लिए समग्र दृष्टिकोण अपनाता है।
              हम शिक्षा, स्वास्थ्य देखभाल, कौशल विकास और भावनात्मक समर्थन पर ध्यान केंद्रित करते हैं ताकि वे एक स्वस्थ और सशक्त वयस्क बन सकें।
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
              <div className="p-6 bg-blue-50 rounded-lg">
                <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">500+ बच्चे शिक्षित</h3>
                <p className="text-gray-600">
                  हर साल गुणवत्तापूर्ण शिक्षा और शैक्षिक संसाधन प्रदान करते हैं
                </p>
              </div>
              <div className="p-6 bg-green-50 rounded-lg">
                <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">20+ कार्यक्रम और पहल</h3>
                <p className="text-gray-600">
                  विभिन्न आयु वर्ग और आवश्यकताओं के लिए विशेष कार्यक्रम
                </p>
              </div>
              <div className="p-6 bg-purple-50 rounded-lg">
                <div className="bg-purple-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">85% सफलता दर</h3>
                <p className="text-gray-600">
                  हमारे कार्यक्रमों से गुजरने वाले बच्चों का सफलतापूर्वक समाज में एकीकरण
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Programs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">हमारे बाल कल्याण कार्यक्रम</h2>
          
          <div className="space-y-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="relative h-64 md:h-full">
                    <Image 
                      src="/images/animals/cat1.jpg" 
                      alt="Education program for underprivileged children" 
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">शिक्षा समर्थन कार्यक्रम</h3>
                  <p className="text-gray-600 mb-4">
                    वंचित बच्चों को गुणवत्तापूर्ण शिक्षा प्रदान करना जो उन्हें एक उज्जवल भविष्य की ओर ले जाए। इसमें औपचारिक और अनौपचारिक शिक्षा दोनों शामिल हैं।
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      स्कूल शुल्क, किताबें और स्टेशनरी प्रदान करना
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      अतिरिक्त कक्षाएं और ट्यूशन समर्थन
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      डिजिटल शिक्षा और कंप्यूटर साक्षरता
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link href="/education-support">
                      <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                        अधिक जानें
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex flex-row-reverse">
                <div className="md:w-1/3">
                  <div className="relative h-64 md:h-full">
                    <Image 
                      src="/images/animals/injured/injured-cat1.jpg" 
                      alt="Healthcare for vulnerable children" 
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">बाल स्वास्थ्य कार्यक्रम</h3>
                  <p className="text-gray-600 mb-4">
                    वंचित बच्चों के लिए समग्र स्वास्थ्य देखभाल सेवाएं प्रदान करना, जिसमें नियमित जांच, टीकाकरण और पोषण सुनिश्चित करना शामिल है।
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      नियमित स्वास्थ्य शिविर और जांच
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      टीकाकरण और आवश्यक दवाएं
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      पोषण सप्लीमेंट और भोजन कार्यक्रम
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link href="/child-health">
                      <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                        अधिक जानें
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="relative h-64 md:h-full">
                    <Image 
                      src="/images/animals/dog1.jpg" 
                      alt="Skill development program for youth" 
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">कौशल विकास कार्यक्रम</h3>
                  <p className="text-gray-600 mb-4">
                    युवाओं को रोजगार और आत्मनिर्भरता के लिए आवश्यक व्यावसायिक और जीवन कौशल प्रदान करना।
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      व्यावसायिक प्रशिक्षण (सिलाई, बुनाई, बढ़ईगीरी, आदि)
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      कंप्यूटर और डिजिटल कौशल प्रशिक्षण
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      रोजगार सहायता और उद्यमिता मार्गदर्शन
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link href="/skill-development">
                      <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                        अधिक जानें
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">हम कैसे काम करते हैं</h2>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">पहचान और आकलन</h3>
                  <p className="text-gray-600">
                    हम सहायता की आवश्यकता वाले बच्चों की पहचान करते हैं और उनकी विशिष्ट आवश्यकताओं का आकलन करते हैं।
                    इसमें सामुदायिक सर्वेक्षण, स्कूलों, अन्य NGOs और सरकारी विभागों के साथ सहयोग शामिल है।
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold text-xl">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">व्यक्तिगत विकास योजना</h3>
                  <p className="text-gray-600">
                    प्रत्येक बच्चे के लिए एक अनुकूलित विकास योजना बनाई जाती है, जिसमें उनकी शिक्षा, स्वास्थ्य, भावनात्मक और सामाजिक आवश्यकताओं को ध्यान में रखा जाता है।
                    हम माता-पिता या अभिभावकों को भी इस प्रक्रिया में शामिल करते हैं।
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold text-xl">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">समग्र सहायता</h3>
                  <p className="text-gray-600">
                    हम शिक्षा, स्वास्थ्य देखभाल, पोषण, परामर्श और अन्य आवश्यक सेवाओं के माध्यम से समग्र सहायता प्रदान करते हैं।
                    हमारी सेवाएं बच्चे के समग्र विकास पर केंद्रित हैं—बौद्धिक, शारीरिक और भावनात्मक।
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold text-xl">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">निगरानी और मूल्यांकन</h3>
                  <p className="text-gray-600">
                    हम बच्चे की प्रगति का नियमित रूप से मूल्यांकन और निगरानी करते हैं और योजना को आवश्यकतानुसार समायोजित करते हैं।
                    हम बच्चे और उनके परिवार के साथ नियमित बैठकें करते हैं और उनकी प्रगति का दस्तावेजीकरण करते हैं।
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold text-xl">5</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">स्नातक और अनुवर्ती</h3>
                  <p className="text-gray-600">
                    जब बच्चा या युवा हमारे कार्यक्रम से स्नातक होता है, हम उनकी सफलता सुनिश्चित करने के लिए अनुवर्ती सहायता प्रदान करना जारी रखते हैं।
                    इसमें कैरियर मार्गदर्शन, उच्च शिक्षा में सहायता या रोजगार में सहायता शामिल हो सकती है।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">सफलता की कहानियां</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-56">
                <Image 
                  src="/images/animals/dog1.jpg" 
                  alt="Success story of Priya" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">प्रिया की कहानी</h3>
                <p className="text-gray-500 mb-4">12 वर्षीय | शिक्षा कार्यक्रम</p>
                <p className="text-gray-600 mb-4">
                  प्रिया एक झुग्गी बस्ती में रहती थी और उसके परिवार की आर्थिक स्थिति खराब थी। हमारे कार्यक्रम के माध्यम से, उसे नियमित शिक्षा और स्वास्थ्य देखभाल मिली। आज, वह अपनी कक्षा में अव्वल है और डॉक्टर बनने का सपना देख रही है।
                </p>
                <div className="text-gray-600 italic">
                  "करुणा फॉर ऑल की मदद के बिना मैं स्कूल नहीं जा पाती। आज मैं अपने सपनों को पूरा करने की राह पर हूं।"
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-56">
                <Image 
                  src="/images/animals/cat1.jpg" 
                  alt="Success story of Raju" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">राजू की कहानी</h3>
                <p className="text-gray-500 mb-4">18 वर्षीय | कौशल विकास कार्यक्रम</p>
                <p className="text-gray-600 mb-4">
                  राजू का परिवार बहुत गरीब था और वह कम उम्र में ही काम करने लगा था। हमारे कौशल विकास कार्यक्रम के माध्यम से उसने इलेक्ट्रिशियन का प्रशिक्षण लिया। आज, वह एक सफल इलेक्ट्रिशियन है और अपने परिवार का आर्थिक सहायता कर रहा है।
                </p>
                <div className="text-gray-600 italic">
                  "करुणा फॉर ऑल ने मुझे एक नया जीवन दिया है। अब मैं अपने भाई-बहनों की पढ़ाई में भी मदद कर पा रहा हूं।"
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">हमारा प्रभाव</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">500+</div>
              <p className="text-lg">बच्चे प्रति वर्ष सहायता प्राप्त</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">95%</div>
              <p className="text-lg">स्कूल में बने रहने की दर</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">85%</div>
              <p className="text-lg">युवा रोजगार दर</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">20+</div>
              <p className="text-lg">समुदाय केंद्र</p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer and Support */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">स्वयंसेवा और समर्थन</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">स्वयंसेवक बनें</h3>
                <p className="text-gray-600 mb-6">
                  हमारे बाल कल्याण कार्यक्रमों में स्वयंसेवक के रूप में शामिल हों और बच्चों के जीवन में सकारात्मक बदलाव लाएँ। आप इन तरीकों से मदद कर सकते हैं:
                </p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    शिक्षण सहायक - बच्चों को पढ़ाएं और उनकी होमवर्क में मदद करें
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    मेंटर - बच्चों और युवाओं का मार्गदर्शन करें
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    विशेष कार्यक्रम आयोजन में सहायता
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    प्रशासनिक और लॉजिस्टिक सहायता
                  </li>
                </ul>
                <Link href="/volunteer/child-welfare">
                  <Button variant="primary" className="bg-blue-600 hover:bg-blue-700 w-full">
                    स्वयंसेवक के रूप में आवेदन करें
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">दान करें</h3>
                <p className="text-gray-600 mb-6">
                  आपका दान वंचित बच्चों और युवाओं के जीवन में महत्वपूर्ण बदलाव ला सकता है। आप इन तरीकों से दान कर सकते हैं:
                </p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    एक बच्चे को प्रायोजित करें - ₹2,000/माह
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    एकमुश्त दान - किसी भी राशि का दान करें
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    वस्तु दान - पुस्तकें, स्टेशनरी, खिलौने, कपड़े, आदि
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    कॉर्पोरेट सामाजिक उत्तरदायित्व (CSR) सहयोग
                  </li>
                </ul>
                <Link href="/donate/child-welfare">
                  <Button variant="primary" className="bg-blue-600 hover:bg-blue-700 w-full">
                    अभी दान करें
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Us CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">बच्चों के भविष्य में निवेश करें</h2>
            <p className="text-lg mb-8">
              एक बच्चे की सहायता करके आप पूरे समाज का भविष्य बदल सकते हैं। आज हमारे साथ जुड़ें और अंतर पैदा करें।
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/donate/child-welfare">
                <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  दान करें
                </Button>
              </Link>
              
              <Link href="/volunteer/child-welfare">
                <Button variant="secondary" className="bg-transparent border-2 border-white hover:bg-white/10">
                  स्वयंसेवक बनें
                </Button>
              </Link>
            </div>

            <div className="mt-8 bg-white/10 p-4 rounded-lg inline-block">
              <p className="text-sm">₹2,000/माह से एक बच्चे को प्रायोजित करें और उसके जीवन को बदलें</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">संपर्क करें</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">बाल कल्याण विभाग</h3>
                  <div className="space-y-3">
                    <p className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      फोन: +91-8800-123457
                    </p>
                    <p className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      ईमेल: children@karunaforall.org
                    </p>
                    <p className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      करुणा बाल विकास केंद्र, नेहरू मार्ग, गुलमोहर पार्क, नई दिल्ली - 110049
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">कार्यक्रम और भेंट</h3>
                  <div className="space-y-3">
                    <p className="flex items-start">
                      <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      केंद्र भेंट: सोमवार - शुक्रवार, सुबह 10 बजे - शाम 5 बजे
                    </p>
                    <p className="flex items-start">
                      <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      वस्तु दान स्वीकृति: सोमवार - शनिवार, सुबह 9 बजे - शाम 6 बजे
                    </p>
                    <p className="flex items-start">
                      <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      बच्चों के साथ मिलने के लिए पूर्व अपॉइंटमेंट आवश्यक है
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

export default ChildWelfare;