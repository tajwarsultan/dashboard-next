'use client';
import { useState } from 'react';
import { 
  Search, Filter, User, 
  ArrowUpDown, ChevronDown, MoreHorizontal 
} from 'lucide-react';

export default function CustomerDashboard() {
  const [customers] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john.doe@example.com', 
      status: 'active',
      registrationDate: '2023-05-15',
      lastLogin: '2024-02-24',
      orderCount: 12,
      segment: 'Premium',
      phone: '+1234567890',
      location: 'New York, USA',
      age: 34,
      referredBy: 'Michael Scott'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane.smith@example.com', 
      status: 'inactive',
      registrationDate: '2022-11-03',
      lastLogin: '2023-12-10',
      orderCount: 5,
      segment: 'Standard',
      phone: '+1987654321',
      location: 'Los Angeles, USA',
      age: 28,
      referredBy: null
    },
    { 
      id: 3, 
      name: 'Alice Johnson', 
      email: 'alice.johnson@example.com', 
      status: 'active',
      registrationDate: '2024-01-10',
      lastLogin: '2025-02-20',
      orderCount: 8,
      segment: 'Standard',
      phone: '+1122334455',
      location: 'Chicago, USA',
      age: 30,
      referredBy: 'John Doe'
    },
    { 
      id: 4, 
      name: 'Robert Brown', 
      email: 'robert.brown@example.com', 
      status: 'suspended',
      registrationDate: '2021-08-22',
      lastLogin: '2024-01-15',
      orderCount: 3,
      segment: 'Basic',
      phone: '+3344556677',
      location: 'Houston, USA',
      age: 45,
      referredBy: null
    },
    { 
      id: 5, 
      name: 'Emily Davis', 
      email: 'emily.davis@example.com', 
      status: 'active',
      registrationDate: '2023-03-11',
      lastLogin: '2024-02-27',
      orderCount: 15,
      segment: 'Premium',
      phone: '+7788990011',
      location: 'San Francisco, USA',
      age: 29,
      referredBy: 'Jane Smith'
    }
  ]);  

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if ((a[sortField as keyof typeof a] ?? '') < (b[sortField as keyof typeof b] ?? '')) return sortDirection === 'asc' ? -1 : 1;
    if ((a[sortField as keyof typeof a] ?? '') > (b[sortField as keyof typeof b] ?? '')) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field: keyof typeof customers[0]) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Customer Management</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search customers by name or email..."
            className="pl-10 pr-4 py-2 border rounded w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <select
              className="appearance-none pl-4 pr-10 py-2 border rounded bg-white"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
          
          <button className="flex items-center gap-1 px-4 py-2 bg-white border rounded">
            <Filter size={18} />
            <span>More Filters</span>
          </button>
        </div>
      </div>
      
      {/* Customer Table */}
      <div className="overflow-x-auto bg-white rounded border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button className="flex items-center gap-1" onClick={() => handleSort('name')}>
                  Customer
                  <ArrowUpDown size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button className="flex items-center gap-1" onClick={() => handleSort('registrationDate')}>
                  Registered
                  <ArrowUpDown size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button className="flex items-center gap-1" onClick={() => handleSort('orderCount')}>
                  Orders
                  <ArrowUpDown size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Segment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedCustomers.length > 0 ? (
              sortedCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="text-gray-500" size={18} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${customer.status === 'active' ? 'bg-green-100 text-green-800' : 
                        customer.status === 'inactive' ? 'bg-gray-100 text-gray-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.registrationDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.orderCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.segment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                      Edit
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  No customers found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{sortedCustomers.length}</span> of{" "}
          <span className="font-medium">{customers.length}</span> customers
        </div>
        <div className="flex gap-1">
          <button className="px-3 py-1 border rounded text-sm" disabled>
            Previous
          </button>
          <button className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">
            1
          </button>
          <button className="px-3 py-1 border rounded text-sm">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}