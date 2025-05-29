import React, { useState } from 'react';

const DonorsList = ({ donors, onRefresh, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const filteredDonors = donors
    .filter(donor => 
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.phone.includes(searchTerm) ||
      (donor.email && donor.email.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const totalDonations = donors.reduce((sum, donor) => sum + (parseFloat(donor.amount) || 0), 0);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-3 sm:p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-medium text-gray-900">Donors List</h3>
          <p className="text-sm text-gray-600 mt-1">
            <span className="block sm:inline">Total: {donors.length} donors</span>
            <span className="hidden sm:inline"> | </span>
            <span className="block sm:inline">₹{totalDonations.toLocaleString('en-IN')} raised</span>
          </p>
        </div>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="w-full sm:w-auto bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 disabled:opacity-50 text-sm sm:text-base"
        >
          {isLoading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {/* Search and Sort Controls */}
      <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="w-full">
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="flex-1">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
            >
              <option value="createdAt">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
          <div className="flex-1">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Donor
              </th>
              <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Method
              </th>
              <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDonors.length > 0 ? (
              filteredDonors.map((donor, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 xl:px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{donor.name}</div>
                      {donor.pancard && (
                        <div className="text-sm text-gray-500">PAN: {donor.pancard}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 xl:px-6 py-4">
                    <div className="text-sm text-gray-900">{donor.phone}</div>
                    {donor.email && (
                      <div className="text-sm text-gray-500">{donor.email}</div>
                    )}
                  </td>
                  <td className="px-4 xl:px-6 py-4">
                    <div className="text-sm font-medium text-green-600">
                      ₹{parseFloat(donor.amount || 0).toLocaleString('en-IN')}
                    </div>
                  </td>
                  <td className="px-4 xl:px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {donor.paymentMethod || 'N/A'}
                    </span>
                  </td>
                  <td className="px-4 xl:px-6 py-4 text-sm text-gray-500">
                    {formatDate(donor.createdAt)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 xl:px-6 py-8 text-center text-gray-500">
                  {searchTerm ? 'No donors found matching your search.' : 'No donors found.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-3">
        {filteredDonors.length > 0 ? (
          filteredDonors.map((donor, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-base">{donor.name}</h4>
                  {donor.pancard && (
                    <p className="text-sm text-gray-500 mt-1">PAN: {donor.pancard}</p>
                  )}
                </div>
                <div className="text-lg font-semibold text-green-600">
                  ₹{parseFloat(donor.amount || 0).toLocaleString('en-IN')}
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Phone:</span>
                  <span className="text-gray-900 font-medium">{donor.phone}</span>
                </div>
                
                {donor.email && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Email:</span>
                    <span className="text-gray-900 truncate ml-2">{donor.email}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Payment:</span>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {donor.paymentMethod || 'N/A'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Date:</span>
                  <span className="text-gray-900">{formatDate(donor.createdAt)}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? 'No donors found matching your search.' : 'No donors found.'}
          </div>
        )}
      </div>

      {donors.length > 10 && (
        <div className="mt-4 text-sm text-gray-600 text-center bg-gray-50 py-2 rounded-lg">
          <span className="block sm:inline">Showing {filteredDonors.length} of {donors.length} donors</span>
        </div>
      )}
    </div>
  );
};

export default DonorsList;
