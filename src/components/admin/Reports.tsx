import React, { useState, useEffect } from 'react';

interface ReportData {
  totalDonations: number;
  totalAmount: number;
  monthlyDonations: number;
  monthlyAmount: number;
  topDonors: Array<{
    name: string;
    amount: number;
    date: string;
  }>;
  donationTrends: Array<{
    month: string;
    amount: number;
    count: number;
  }>;
}

const Reports: React.FC = () => {
  const [reportData, setReportData] = useState<ReportData>({
    totalDonations: 0,
    totalAmount: 0,
    monthlyDonations: 0,
    monthlyAmount: 0,
    topDonors: [],
    donationTrends: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      // Mock data for now - in a real implementation, this would fetch from API
      const mockData: ReportData = {
        totalDonations: 45,
        totalAmount: 125000,
        monthlyDonations: 12,
        monthlyAmount: 35000,
        topDonors: [
          { name: 'Anonymous Donor', amount: 25000, date: '2025-05-15' },
          { name: 'Rajesh Kumar', amount: 15000, date: '2025-05-20' },
          { name: 'Priya Singh', amount: 10000, date: '2025-05-25' }
        ],
        donationTrends: [
          { month: 'Jan', amount: 20000, count: 8 },
          { month: 'Feb', amount: 25000, count: 10 },
          { month: 'Mar', amount: 30000, count: 12 },
          { month: 'Apr', amount: 35000, count: 15 },
          { month: 'May', amount: 40000, count: 18 }
        ]
      };
      
      setTimeout(() => {
        setReportData(mockData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching report data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-24 rounded-lg"></div>
            ))}
          </div>
          <div className="bg-gray-200 h-96 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Reports & Analytics</h1>
        <p className="text-blue-100">Track donations, analyze trends, and generate reports</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">₹</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{reportData.totalAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">#</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Donations</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.totalDonations}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 font-bold">📅</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{reportData.monthlyAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">👥</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Monthly Donors</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.monthlyDonations}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Donors */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Top Donors</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {reportData.topDonors.map((donor, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <span className="text-gray-600 font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{donor.name}</p>
                      <p className="text-xs text-gray-500">{donor.date}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    ₹{donor.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Donation Trends */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Donation Trends</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {reportData.donationTrends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 w-12">{trend.month}</span>
                    <div className="flex-1 mx-4">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(trend.amount / 50000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      ₹{trend.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">{trend.count} donations</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Export Reports</h3>
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            📊 Export to Excel
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            📄 Export to PDF
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            📈 Generate Chart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
