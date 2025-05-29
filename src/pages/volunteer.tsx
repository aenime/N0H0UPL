import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/common/Layout';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { STORAGE_KEYS } from '../utils/localStorage';

const VolunteerPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [membershipType, setMembershipType] = useState('annual');
  const [submitted, setSubmitted] = useState(false);
  const [volunteerID, setVolunteerID] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);
  
  // States for membership fees and benefits
  const [membershipFees, setMembershipFees] = useState<Record<string, number>>({
    annual: 1200,
    lifetime: 10000,
    student: 500,
    senior: 800,
    family: 2000,
  });
  const [membershipBenefits, setMembershipBenefits] = useState<string[]>([]);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  // Load membership fees and benefits from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load membership fees
      const storedFees = localStorage.getItem(STORAGE_KEYS.MEMBERSHIP_FEES);
      if (storedFees) {
        try {
          setMembershipFees(JSON.parse(storedFees));
        } catch (error) {
          console.error('Error parsing membership fees:', error);
        }
      }
      
      // Load membership benefits
      const storedBenefits = localStorage.getItem(STORAGE_KEYS.MEMBERSHIP_BENEFITS);
      if (storedBenefits) {
        try {
          setMembershipBenefits(JSON.parse(storedBenefits));
        } catch (error) {
          console.error('Error parsing membership benefits:', error);
        }
      }
    }
  }, []);

  // Function to handle membership payment simulation
  const handlePayment = () => {
    // In a real app, this would integrate with a payment gateway
    setPaymentCompleted(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentCompleted) {
      alert('Please complete the membership payment before submitting.');
      return;
    }
    
    // generate volunteer ID
    const id = 'VOL-' + Date.now();
    setVolunteerID(id);
    
    // In a real app, we would store the member data
    const memberData = {
      id,
      name,
      email,
      phone,
      address,
      membershipType,
      joinDate: new Date().toISOString(),
      // photoUrl: would be uploaded to storage in a real app
    };
    
    // Store in localStorage for demo purposes
    try {
      const existingMembers = JSON.parse(localStorage.getItem(STORAGE_KEYS.MEMBERS) || '[]');
      localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify([...existingMembers, memberData]));
    } catch (error) {
      console.error('Error storing member data:', error);
    }
    
    setSubmitted(true);
  };

  const handleDownload = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current);
      canvas.toBlob((blob) => {
        if (blob) saveAs(blob, `${volunteerID}.png`);
      });
    }
  };

  return (
    <Layout>
      <Head>
        <title>Volunteer Membership | Karuna For All</title>
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-8">Volunteer Membership Program</h1>
        
        {!submitted ? (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left column: Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6">Membership Registration</h2>
              
              {!paymentCompleted ? (
                <div>
                  <h3 className="text-xl font-medium mb-4">Select Membership Type</h3>
                  <div className="space-y-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className={`border rounded-lg p-4 cursor-pointer transition ${membershipType === 'annual' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                        onClick={() => setMembershipType('annual')}>
                        <h4 className="font-medium">Annual Membership</h4>
                        <p className="text-xl font-bold text-green-700">₹{membershipFees.annual}</p>
                        <p className="text-sm text-gray-500">Valid for 1 year</p>
                      </div>
                      
                      <div className={`border rounded-lg p-4 cursor-pointer transition ${membershipType === 'lifetime' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                        onClick={() => setMembershipType('lifetime')}>
                        <h4 className="font-medium">Lifetime Membership</h4>
                        <p className="text-xl font-bold text-green-700">₹{membershipFees.lifetime}</p>
                        <p className="text-sm text-gray-500">One-time payment</p>
                      </div>
                      
                      <div className={`border rounded-lg p-4 cursor-pointer transition ${membershipType === 'student' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                        onClick={() => setMembershipType('student')}>
                        <h4 className="font-medium">Student Membership</h4>
                        <p className="text-xl font-bold text-green-700">₹{membershipFees.student}</p>
                        <p className="text-sm text-gray-500">Valid for 1 year (student ID required)</p>
                      </div>
                      
                      <div className={`border rounded-lg p-4 cursor-pointer transition ${membershipType === 'family' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                        onClick={() => setMembershipType('family')}>
                        <h4 className="font-medium">Family Membership</h4>
                        <p className="text-xl font-bold text-green-700">₹{membershipFees.family}</p>
                        <p className="text-sm text-gray-500">Up to 4 family members</p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3">Member Benefits</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {membershipBenefits.map((benefit, index) => (
                          <li key={index} className="text-gray-700">{benefit}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <button 
                      onClick={handlePayment}
                      className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition mt-6"
                    >
                      Pay ₹{membershipFees[membershipType as keyof typeof membershipFees]} Now
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                    <p className="text-green-700">
                      Payment of ₹{membershipFees[membershipType as keyof typeof membershipFees]} received successfully! Please complete your profile.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      className="w-full border border-gray-300 p-2 rounded"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full border border-gray-300 p-2 rounded"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                      type="tel"
                      required
                      className="w-full border border-gray-300 p-2 rounded"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <textarea
                      required
                      className="w-full border border-gray-300 p-2 rounded"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Upload Photo</label>
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) => setPhotoFile(e.target.files ? e.target.files[0] : null)}
                      className="w-full border border-gray-300 p-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Upload Document (ID/Certificate)</label>
                    <input
                      type="file"
                      required
                      onChange={(e) => setDocumentFile(e.target.files ? e.target.files[0] : null)}
                      className="w-full border border-gray-300 p-2 rounded"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition mt-4"
                  >
                    Submit and Get Member ID
                  </button>
                </form>
              )}
            </div>
            
            {/* Right column: ID Card Preview */}
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-6">Member ID Card Preview</h2>
              <div className="relative w-full max-w-sm">
                <Image 
                  src="/images/id-card-template.svg"
                  alt="ID Card Template"
                  width={300}
                  height={180}
                  className="mx-auto"
                />
              </div>
              <p className="text-sm text-gray-600 mt-6 text-center max-w-sm">
                After completing your registration and payment, you'll receive a personalized ID card like this. You can download and print it for official verification.
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-center">
              <div className="text-green-700 text-3xl mb-3">✓</div>
              <h2 className="text-2xl font-semibold mb-2">Registration Successful!</h2>
              <p className="text-gray-700">Thank you for becoming a member of Karuna For All.</p>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4 text-center">Your Member ID Card</h3>
              <div ref={cardRef} className="border-2 border-green-500 rounded-lg p-6 bg-white max-w-md mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-1 rounded-full mr-3">
                      <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
                    </div>
                    <div>
                      <h3 className="font-bold text-green-700 text-lg">Karuna For All</h3>
                      <p className="text-xs text-gray-500">Member ID Card</p>
                    </div>
                  </div>
                  <div className="text-xs px-2 py-1 bg-green-100 rounded text-green-800">
                    {membershipType.charAt(0).toUpperCase() + membershipType.slice(1)}
                  </div>
                </div>
                
                <div className="flex">
                  {photoFile && (
                    <div className="mr-4">
                      <img
                        src={URL.createObjectURL(photoFile)}
                        alt="Member Photo"
                        className="w-24 h-24 object-cover rounded-md border border-gray-300"
                      />
                    </div>
                  )}
                  <div>
                    <table className="text-sm">
                      <tbody>
                        <tr>
                          <td className="font-medium pr-2 pb-1">Name:</td>
                          <td>{name}</td>
                        </tr>
                        <tr>
                          <td className="font-medium pr-2 pb-1">ID:</td>
                          <td>{volunteerID}</td>
                        </tr>
                        <tr>
                          <td className="font-medium pr-2 pb-1">Joined:</td>
                          <td>{new Date().toLocaleDateString()}</td>
                        </tr>
                        <tr>
                          <td className="font-medium pr-2">Phone:</td>
                          <td>{phone}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <button
                  onClick={handleDownload}
                  className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition"
                >
                  Download ID Card
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default VolunteerPage;
