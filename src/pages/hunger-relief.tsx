import React from 'react';
import Head from 'next/head';
import Layout from '../components/common/Layout';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../components/common/Button';

const HungerRelief: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>पशु आहार कार्यक्रम | करुणा For All</title>
        <meta 
          name="description" 
          content="भारत के आवारा और बेसहारा पशुओं के लिए भोजन वितरण कार्यक्रम। गायों, कुत्तों, बिल्लियों और अन्य पशुओं को नियमित आहार उपलब्ध कराना।" 
        />
      </Head>

      {/* Hero banner */}
      <div className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/animals/injured/injured-cow1.jpg"
            alt="Volunteers feeding stray animals"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              पशु आहार कार्यक्रम
            </h1>
            <p className="text-lg text-white mb-6">
              भूख और कुपोषण से पीड़ित आवारा पशुओं को नियमित और पौष्टिक आहार उपलब्ध कराने का हमारा मिशन
            </p>
            <Link href="/donate/hunger-relief">
              <Button variant="primary" size="lg" className="bg-yellow-600 hover:bg-yellow-700">
                भूखे पशुओं को खिलाने में मदद करें
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">पशु आहार कार्यक्रम का परिचय</h2>
            <p className="text-lg text-gray-600 mb-8">
              भारत में लाखों आवारा पशु भूख और कुपोषण से पीड़ित हैं। करुणा फॉर ऑल का पशु आहार कार्यक्रम ऐसे बेसहारा जीवों को नियमित, स्वच्छ और पौष्टिक आहार उपलब्ध कराता है।
              हमारे स्वयंसेवक हर दिन पूरे शहर के विभिन्न क्षेत्रों में पशु-आहार वितरण स्थलों पर जाकर आवारा कुत्तों, बिल्लियों, गायों और अन्य पशुओं को भोजन देते हैं।
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
              <div className="p-6 bg-yellow-50 rounded-lg">
                <div className="bg-yellow-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">15,000+ भोजन प्रतिदिन</h3>
                <p className="text-gray-600">
                  हर दिन हजारों आवारा पशुओं को स्वच्छ और पौष्टिक भोजन उपलब्ध कराते हैं
                </p>
              </div>
              <div className="p-6 bg-green-50 rounded-lg">
                <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">200+ फीडिंग स्पॉट्स</h3>
                <p className="text-gray-600">
                  शहर भर में नियमित फीडिंग स्थल जहाँ हमारे स्वयंसेवक रोज़ाना पशु-भोजन पहुंचाते हैं
                </p>
              </div>
              <div className="p-6 bg-blue-50 rounded-lg">
                <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">500+ स्वयंसेवक</h3>
                <p className="text-gray-600">
                  समर्पित स्वयंसेवकों की टीम जो हर मौसम में पशुओं के लिए भोजन वितरण सुनिश्चित करती है
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Food Programs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">हमारे आहार कार्यक्रम</h2>
          
          <div className="space-y-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="relative h-64 md:h-full">
                    <Image 
                      src="/images/animals/dog2.jpg" 
                      alt="Daily feeding program for stray dogs" 
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">दैनिक पशु आहार कार्यक्रम</h3>
                  <p className="text-gray-600 mb-4">
                    हमारा मुख्य कार्यक्रम जिसके तहत शहर के विभिन्न क्षेत्रों में स्थित 200+ स्थानों पर प्रतिदिन आवारा पशुओं को भोजन पहुंचाया जाता है। इसमें मुख्य रूप से कुत्तों, बिल्लियों और गायों को खिलाना शामिल है।
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      पौष्टिक खाना: रोटी, चावल, दाल, सब्जियां और मांस मिश्रण
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      दिन में दो बार: सुबह 7-9 बजे और शाम 5-7 बजे
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      स्थान: शहर के सभी वार्ड और उपनगरों में
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link href="/feeding-spots">
                      <Button variant="outline" className="text-yellow-600 border-yellow-600 hover:bg-yellow-50">
                        फीडिंग स्पॉट्स की सूची देखें
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
                      src="/images/animals/injured/injured-cow1.jpg" 
                      alt="Goshala feeding program for cows" 
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">गौशाला आहार कार्यक्रम</h3>
                  <p className="text-gray-600 mb-4">
                    हमारे परिसर में स्थित गौशाला और शहर के अन्य गौशालाओं में गायों, बैलों और बछड़ों के लिए विशेष आहार कार्यक्रम। इसमें विशेष रूप से वृद्ध, बीमार और घायल गायों के लिए विशेष आहार शामिल है।
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      विशेष आहार: हरा चारा, सूखा चारा, दाना मिश्रण और गुड़
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      अतिरिक्त सप्लीमेंट: विटामिन और मिनरल सप्लीमेंट
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      सेवित गौवंश: प्रतिदिन 500+ गाय और बैल
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link href="/goshala">
                      <Button variant="outline" className="text-yellow-600 border-yellow-600 hover:bg-yellow-50">
                        गौशाला के बारे में अधिक जानें
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
                      src="/images/animals/cat1.jpg" 
                      alt="Emergency feeding program during disasters" 
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">आपदा राहत फीडिंग</h3>
                  <p className="text-gray-600 mb-4">
                    प्राकृतिक आपदाओं और अन्य संकट स्थितियों के दौरान प्रभावित क्षेत्रों में पशुओं के लिए विशेष आपातकालीन भोजन वितरण। बाढ़, भूकंप, महामारी जैसी आपदाओं में जब पशुओं को भोजन मिलना मुश्किल हो जाता है।
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      त्वरित प्रतिक्रिया: आपदा के 24 घंटे के भीतर पहुंच
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      मोबाइल किचन: आपदाग्रस्त क्षेत्रों में पशु भोजन तैयार करना
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      पिछली सहायता: बाढ़, सूखा और अन्य आपदाओं के दौरान
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link href="/disaster-relief">
                      <Button variant="outline" className="text-yellow-600 border-yellow-600 hover:bg-yellow-50">
                        आपदा राहत कार्यक्रम देखें
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Feed */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">हम क्या खिलाते हैं</h2>
            <p className="text-lg text-gray-600 mb-10 text-center">
              हमारे पशु आहार विशेषज्ञ और पशु चिकित्सकों की सलाह पर तैयार किया गया संतुलित आहार विभिन्न प्रकार के पशुओं की विशिष्ट पोषण आवश्यकताओं को पूरा करता है।
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">कुत्तों के लिए आहार</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    रोटी, चावल और दाल का मिश्रण
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    पका हुआ चिकन या अंडे (प्रोटीन सोर्स)
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    सब्जियां (गाजर, मटर, आलू)
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    विटामिन सप्लीमेंट (विशेष रूप से कमजोर कुत्तों के लिए)
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    पिल्लों के लिए विशेष नरम आहार
                  </li>
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">बिल्लियों के लिए आहार</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    उबला हुआ मांस या मछली
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    दूध और पनीर (कैल्शियम सोर्स)
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    अंडों का मिश्रण
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    छोटे बच्चों के लिए विशेष फॉर्मूला
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    टॉरिन और अन्य प्रोटीन सप्लीमेंट
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">गायों के लिए आहार</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    हरा चारा (घास, जई, बरसीम)
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    सूखा चारा (भूसा, फसल अवशेष)
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    दाना मिश्रण (चोकर, मक्का, दालें)
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    गुड़ और नमक मिश्रण
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    मिनरल मिक्स और विटामिन सप्लीमेंट
                  </li>
                </ul>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">अन्य जानवरों के लिए आहार</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-purple-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    बंदरों के लिए: फल, सब्जियां और अनाज
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-purple-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    पक्षियों के लिए: अनाज, बीज और फल के टुकड़े
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-purple-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    घायल जंगली जानवरों के लिए: पशु चिकित्सक द्वारा निर्धारित विशेष आहार
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-purple-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    दुर्लभ प्रजातियां: प्रजातियों के अनुसार विशेष आहार
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10 bg-yellow-50 p-6 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4 text-gray-800">आहार की गुणवत्ता</h3>
              <p className="text-gray-600">
                हम सुनिश्चित करते हैं कि सभी पशुओं को स्वच्छ, ताजा और पौष्टिक भोजन मिले। भोजन की तैयारी और वितरण के दौरान सख्त स्वच्छता मानकों का पालन किया जाता है। हमारे पशु चिकित्सक नियमित रूप से भोजन की गुणवत्ता की जांच करते हैं।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteers and Food Drives */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">स्वयंसेवक और फूड ड्राइव</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-56">
                <Image 
                  src="/images/animals/dog2.jpg" 
                  alt="Volunteers feeding animals" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">स्वयंसेवक प्रोग्राम</h3>
                <p className="text-gray-600 mb-4">
                  हमारे फीडिंग कार्यक्रम के स्वयंसेवक बनें और आवारा पशुओं को खिलाने में मदद करें। हम आपको प्रशिक्षण, सामग्री और समर्थन प्रदान करेंगे।
                </p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    सप्ताह में एक या अधिक दिन शामिल हों
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    अपने क्षेत्र में फीडिंग स्पॉट अपनाएं
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    पशु आहार की तैयारी में मदद करें
                  </li>
                </ul>
                <Link href="/volunteer/feeding">
                  <Button variant="primary" className="bg-yellow-600 hover:bg-yellow-700 w-full">
                    स्वयंसेवक के रूप में आवेदन करें
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-56">
                <Image 
                  src="/images/animals/cat1.jpg" 
                  alt="Food donation drive" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">फूड डोनेशन ड्राइव</h3>
                <p className="text-gray-600 mb-4">
                  अपने घर, स्कूल, कार्यालय या सामुदायिक स्थान पर पशु आहार दान अभियान आयोजित करें। हम आपको सभी आवश्यक सामग्री और मार्गदर्शन प्रदान करेंगे।
                </p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    दान पेटियां और पोस्टर प्रदान किए जाते हैं
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    स्वीकृत खाद्य पदार्थों की सूची
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    संग्रह और वितरण में सहायता
                  </li>
                </ul>
                <Link href="/organize-food-drive">
                  <Button variant="primary" className="bg-yellow-600 hover:bg-yellow-700 w-full">
                    फूड ड्राइव आयोजित करें
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-yellow-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">हमारा प्रभाव</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">5.5M+</div>
              <p className="text-lg">भोजन वितरित (वार्षिक)</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">15,000+</div>
              <p className="text-lg">पशु प्रतिदिन खिलाए</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">200+</div>
              <p className="text-lg">फीडिंग स्पॉट्स</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">10+</div>
              <p className="text-lg">जिलों में सेवाएं</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">स्वयंसेवकों के अनुभव</h2>
            
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                    <span className="text-yellow-600 font-bold text-xl">A</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">अनिता शर्मा</h4>
                    <p className="text-sm text-gray-500">2 वर्षों से स्वयंसेवक</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "पिछले दो सालों से मैं हर रोज सुबह अपने क्षेत्र के आवारा पशुओं को खिलाती हूं। इससे मुझे बहुत संतुष्टि मिलती है। उनकी आंखों में खुशी और उत्साह देखना सबसे बड़ा इनाम है। करुणा फॉर ऑल की टीम हमेशा सहयोग के लिए तत्पर रहती है।"
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                    <span className="text-yellow-600 font-bold text-xl">R</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">राकेश चौधरी</h4>
                    <p className="text-sm text-gray-500">1 वर्ष से स्वयंसेवक</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "मैं और मेरे दोस्त मिलकर अपने कॉलेज के पास के क्षेत्र में लगभग 50 आवारा पशुओं को खिलाते हैं। यह देखना अद्भुत है कि वे हमें पहचानते हैं और हमारा इंतजार करते हैं। करुणा फॉर ऑल की टीम हमें नियमित रूप से खाना और मार्गदर्शन प्रदान करती है।"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Us CTA */}
      <section className="py-16 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">पशु आहार कार्यक्रम का समर्थन करें</h2>
            <p className="text-lg mb-8">
              आपके दान से हम अधिक भूखे पशुओं तक पहुंच सकते हैं और उन्हें नियमित, पौष्टिक भोजन उपलब्ध करा सकते हैं।
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/donate/hunger-relief">
                <Button variant="secondary" className="bg-white text-yellow-600 hover:bg-gray-100">
                  दान करें
                </Button>
              </Link>
              
              <Link href="/volunteer/feeding">
                <Button variant="secondary" className="bg-transparent border-2 border-white hover:bg-white/10">
                  स्वयंसेवक बनें
                </Button>
              </Link>
            </div>

            <div className="mt-8 bg-white/10 p-4 rounded-lg inline-block">
              <p className="text-sm">₹500 का दान 5 आवारा पशुओं को एक सप्ताह तक खिला सकता है</p>
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
                  <h3 className="text-xl font-bold mb-4 text-gray-800">आहार कार्यक्रम संपर्क</h3>
                  <div className="space-y-3">
                    <p className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      फोन: +91-8800-123456
                    </p>
                    <p className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      ईमेल: feeding@karunaforall.org
                    </p>
                    <p className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      करुणा केंद्र, सरदार पटेल मार्ग, वसंत विहार, नई दिल्ली - 110057
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">आहार प्रशिक्षण और दान</h3>
                  <div className="space-y-3">
                    <p className="flex items-start">
                      <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      स्वयंसेवकों के लिए प्रशिक्षण: हर शनिवार, सुबह 10 बजे
                    </p>
                    <p className="flex items-start">
                      <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      खाद्य दान स्वीकृति: सोमवार - शनिवार, सुबह 9 बजे - शाम 6 बजे
                    </p>
                    <p className="flex items-start">
                      <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      फूड प्रिपरेशन वर्कशॉप: हर महीने के पहले रविवार
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

export default HungerRelief;