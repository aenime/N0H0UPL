import React, { useState, useEffect } from 'react';
import { 
  BanknotesIcon, 
  UserGroupIcon, 
  CreditCardIcon,
  DocumentTextIcon,
  ChartBarIcon,
  PhotoIcon,
  TrashIcon,
  PencilIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

interface Donation {
  id: string;
  name: string;
  email: string;
  amount: number;
  date: string;
  paymentMethod: string;
  purpose: string;
  status: 'completed' | 'pending' | 'failed';
}

interface DonationManagerProps {
  onNavigate?: (tab: string) => void;
  showNotification?: (message: string, type: 'success' | 'error' | 'info') => void;
}

const DonationManager: React.FC<DonationManagerProps> = ({ showNotification }) => {
  const [donations, setDonations] = useState<Donation[]>([
    { 
      id: '1', 
      name: 'Amit Sharma', 
      email: 'amit.s@example.com', 
      amount: 5000, 
      date: '2025-05-29', 
      paymentMethod: 'UPI', 
      purpose: 'Animal Care',
      status: 'completed'
    },
    { 
      id: '2', 
      name: 'Priya Patel', 
      email: 'priya.p@example.com', 
      amount: 2000, 
      date: '2025-05-28', 
      paymentMethod: 'Credit Card', 
      purpose: 'Medical Care',
      status: 'completed'
    },
    { 
      id: '3', 
      name: 'Raj Kumar', 
      email: 'raj.k@example.com', 
      amount: 10000, 
      date: '2025-05-27', 
      paymentMethod: 'Bank Transfer', 
      purpose: 'Gaushala',
      status: 'pending'
    },
    { 
      id: '4', 
      name: 'Meena Desai', 
      email: 'meena.d@example.com', 
      amount: 1500, 
      date: '2025-05-26', 
      paymentMethod: 'UPI', 
      purpose: 'Food',
      status: 'completed'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDonations, setSelectedDonations] = useState<string[]>([]);

  const filteredDonations = donations.filter(donation => {
    const matchesStatus = filterStatus === 'all' || donation.status === filterStatus;
    const matchesSearch = donation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalAmount = donations
    .filter(d => d.status === 'completed')
    .reduce((sum, donation) => sum + donation.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = (donationId: string, newStatus: 'completed' | 'pending' | 'failed') => {
    setDonations(prev => prev.map(donation => 
      donation.id === donationId 
        ? { ...donation, status: newStatus }
        : donation
    ));
    showNotification?.(`Donation status updated to ${newStatus}`, 'success');
  };

  const handleBulkDelete = () => {
    if (selectedDonations.length === 0) return;
    
    if (confirm(`Are you sure you want to delete ${selectedDonations.length} donation(s)?`)) {
      setDonations(prev => prev.filter(d => !selectedDonations.includes(d.id)));
      setSelectedDonations([]);
      showNotification?.(`${selectedDonations.length} donation(s) deleted`, 'success');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Donation Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Total Donations</p>
                <p className="text-2xl font-bold">{formatCurrency(totalAmount)}</p>
              </div>
              <BanknotesIcon className="h-8 w-8 text-green-200" />
            </div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Total Donors</p>
                <p className="text-2xl font-bold">{donations.length}</p>
              </div>
              <UserGroupIcon className="h-8 w-8 text-green-200" />
            </div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Avg. Donation</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(totalAmount / donations.filter(d => d.status === 'completed').length || 0)}
                </p>
              </div>
              <ChartBarIcon className="h-8 w-8 text-green-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search donations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          
          {selectedDonations.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              Delete Selected ({selectedDonations.length})
            </button>
          )}
        </div>

        {/* Donations Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedDonations.length === filteredDonations.length && filteredDonations.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedDonations(filteredDonations.map(d => d.id));
                      } else {
                        setSelectedDonations([]);
                      }
                    }}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Purpose
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDonations.map((donation) => (
                <tr key={donation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedDonations.includes(donation.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedDonations(prev => [...prev, donation.id]);
                        } else {
                          setSelectedDonations(prev => prev.filter(id => id !== donation.id));
                        }
                      }}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{donation.name}</div>
                        <div className="text-sm text-gray-500">{donation.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(donation.amount)}</div>
                    <div className="text-sm text-gray-500">{donation.paymentMethod}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {donation.purpose}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(donation.date).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(donation.status)}`}>
                      {donation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <select
                        value={donation.status}
                        onChange={(e) => handleStatusUpdate(donation.id, e.target.value as any)}
                        className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-green-500"
                      >
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                      </select>
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDonations.length === 0 && (
          <div className="text-center py-12">
            <BanknotesIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No donations found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filterStatus !== 'all' ? 'Try adjusting your search or filter criteria.' : 'Donations will appear here when received.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationManager;
