import Head from 'next/head';
import Layout from '../components/common/Layout';
import Hero from '../components/home/Hero';
import AnimalCards from '../components/home/AnimalCards';
import ImpactSection from '../components/home/ImpactSection';
import SuccessStories from '../components/home/SuccessStories';
import EmergencyAppeal from '../components/home/EmergencyAppeal';
import ProgramCategories from '../components/home/ProgramCategories';
import Testimonials from '../components/home/Testimonials';
import InjuredAnimals from '../components/home/InjuredAnimals';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>करुणा For All - गौशाला और जीव दया संस्था | Karuna For All</title>
        <meta name="description" content="जरूरतमंद जीवों की मदद करें, गौशाला का समर्थन करें, और पशु कल्याण के लिए दान दें। भारत में गरीब और जरूरतमंद परिवारों की सहायता करें।" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Hero />
      
      <EmergencyAppeal />
      
      <ProgramCategories />
      
      <InjuredAnimals />
      
      <ImpactSection />
      
      <AnimalCards />
      
      <SuccessStories />
      
      <Testimonials />
    </Layout>
  );
}