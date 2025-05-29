import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/common/Layout';
import Button from '../components/common/Button';

export default function ThankYouPage() {
  const router = useRouter();
  const { amount } = router.query;
  
  return (
    <Layout>
      <Head>
        <title>Thank You for Your Donation - Paws & Care</title>
        <meta name="description" content="Thank you for supporting our animal welfare mission" />
      </Head>
      
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <div className="text-green-600 mb-4">
              <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold mb-4">Thank You for Your Donation!</h1>
            
            {amount && (
              <p className="text-lg mb-6">
                Your generous donation of <span className="font-semibold">${amount}</span> will help provide care for animals in need.
              </p>
            )}
            
            <p className="text-gray-600 mb-8">
              We've sent a receipt to your email address. Thank you for supporting our mission!
            </p>
            
            <div className="space-y-3">
              <Link href="/">
                <Button variant="primary" fullWidth>Return to Home</Button>
              </Link>
              
              <Link href="/animals">
                <Button variant="outline" fullWidth>Meet Our Animals</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}