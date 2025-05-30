import React from 'react';
import Head from 'next/head';
import Layout from '../components/common/Layout';

const Jobs = () => {
  const jobs = [
    {
      id: 1,
      title: "Animal Welfare Officer",
      location: "Delhi NCR",
      type: "Full-time",
      description: "We're looking for compassionate individuals to join our animal rescue team. This role involves responding to emergency calls, rescuing injured or distressed animals, and providing initial care.",
      requirements: [
        "Experience in animal handling and rescue",
        "Valid driving license",
        "Ability to work in shifts, including nights and weekends",
        "Physical fitness to handle rescue operations"
      ],
      applicationProcess: "Send your resume to careers@karunaforall.org with subject 'Animal Welfare Officer Application'"
    },
    {
      id: 2,
      title: "Veterinary Assistant",
      location: "Noida",
      type: "Full-time",
      description: "Support our veterinary team in providing medical care to rescued animals. You'll assist in examinations, treatments, and post-operative care.",
      requirements: [
        "Veterinary nursing qualification or relevant experience",
        "Strong interest in animal welfare",
        "Good communication skills",
        "Ability to handle stressful situations"
      ],
      applicationProcess: "Send your resume to careers@karunaforall.org with subject 'Veterinary Assistant Application'"
    },
    {
      id: 3,
      title: "Community Outreach Coordinator",
      location: "Gurgaon",
      type: "Full-time",
      description: "Lead our community engagement initiatives, including awareness programs and educational workshops.",
      requirements: [
        "Experience in community development or public relations",
        "Strong communication and presentation skills",
        "Proficiency in Hindi and English",
        "Knowledge of social media management"
      ],
      applicationProcess: "Send your resume to careers@karunaforall.org with subject 'Community Outreach Application'"
    },
    {
      id: 4,
      title: "Fundraising Manager",
      location: "Delhi",
      type: "Full-time",
      description: "Develop and implement fundraising strategies to support our animal welfare programs. Build relationships with donors, corporate partners, and manage fundraising events.",
      requirements: [
        "Proven experience in fundraising or development",
        "Strong networking abilities",
        "Experience in grant writing and proposal development",
        "Financial management skills"
      ],
      applicationProcess: "Send your resume to careers@karunaforall.org with subject 'Fundraising Manager Application'"
    }
  ];

  return (
    <Layout>
      <Head>
        <title>Career Opportunities | Karuna For All</title>
        <meta name="description" content="Join our team and make a difference in the lives of animals in need. Explore career opportunities at Karuna For All." />
      </Head>

      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Career Opportunities</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our team of dedicated professionals working to improve animal welfare and make a positive impact on our community.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Current openings */}
            <div className="mb-16">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Current Openings</h2>
              
              {jobs.length > 0 ? (
                <div className="space-y-8">
                  {jobs.map((job) => (
                    <div key={job.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                      <div className="flex flex-wrap justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                        <div className="flex gap-2 mt-1 sm:mt-0">
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                            {job.location}
                          </span>
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            {job.type}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{job.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-800 mb-2">Requirements:</h4>
                        <ul className="list-disc pl-5 text-gray-600 space-y-1">
                          {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-green-50 p-3 rounded-md">
                        <h4 className="font-medium text-gray-800 mb-1">How to Apply:</h4>
                        <p className="text-gray-600">{job.applicationProcess}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-600">No positions are currently available. Please check back later.</p>
                </div>
              )}
            </div>

            {/* General application */}
            <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-blue-500">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Suitable Position?</h2>
              <p className="text-gray-600 mb-6">
                Don't see a role that matches your skills? We're always interested in hearing from passionate individuals who want to contribute to our cause. Send your resume to careers@karunaforall.org with a cover letter explaining how you can contribute to our mission.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="mailto:careers@karunaforall.org" 
                  className="inline-flex items-center px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;