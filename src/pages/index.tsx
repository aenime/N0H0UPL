import Head from 'next/head';
import Layout from '../components/common/Layout';
import Hero from '../components/home/Hero';
import AnimalCards from '../components/home/AnimalCards';
import EmergencyAppeal from '../components/home/EmergencyAppeal';
import CategoryPostsSection from '../components/home/CategoryPostsSection';

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
      
      <AnimalCards />
      
      <CategoryPostsSection />
    </Layout>
  );
}