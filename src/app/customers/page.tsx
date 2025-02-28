'use client';
import { useState } from 'react';
import { 
  Search, Filter, User, 
  ArrowUpDown, ChevronDown, MoreHorizontal 
} from 'lucide-react';

type Customer = {
  id: number;
  name: string;
  email: string;
  status: string;
  registrationDate: string;
  lastLogin: string;
  orderCount: number;
  segment: string;
  phone: string;
  location: string;
  age: number;
  referredBy: string | null;
};

export default function CustomerDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [customers, setCustomers] = useState<Customer[]>([
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
    },
    { 
      id: 6, 
      name: 'David Wilson', 
      email: 'david.wilson@example.com', 
      status: 'active',
      registrationDate: '2023-08-15',
      lastLogin: '2024-02-25',
      orderCount: 7,
      segment: 'Standard',
      phone: '+1234567891',
      location: 'Miami, USA',
      age: 32,
      referredBy: null
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortField, setSortField] = useState<keyof Customer>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState<number | null>(null);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    const aValue = a[sortField] ?? '';
    const bValue = b[sortField] ?? '';
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field: keyof Customer) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const paginatedCustomers = sortedCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedCustomers.length / itemsPerPage);

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };

  const handleDeleteCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  const handleStatusChange = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsStatusModalOpen(true);
  };

  const handleSaveEdit = (updatedCustomer: Customer) => {
    setCustomers(prevCustomers =>
      prevCustomers.map(customer =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      )
    );
    setIsEditModalOpen(false);
  };

  const handleStatusUpdate = (newStatus: string) => {
    if (!selectedCustomer) return;
    
    setCustomers(prevCustomers =>
      prevCustomers.map(customer =>
        customer.id === selectedCustomer.id
          ? { ...customer, status: newStatus }
          : customer
      )
    );
    setIsStatusModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (!selectedCustomer) return;
    
    setCustomers(prevCustomers =>
      prevCustomers.filter(customer => customer.id !== selectedCustomer.id)
    );
    setIsDeleteModalOpen(false);
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
      
      <div className="bg-white rounded border">
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
            {paginatedCustomers.length > 0 ? (
              paginatedCustomers.map((customer) => (
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
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditCustomer(customer)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <div className="relative">
                        <button 
                          onClick={() => setIsMenuOpen(isMenuOpen === customer.id ? null : customer.id)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <MoreHorizontal size={18} />
                        </button>
                        {isMenuOpen === customer.id && (
                          <div className="absolute right-0 mt-2 w-48 z-10 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1" role="menu">
                              <button
                                onClick={() => {
                                  handleStatusChange(customer);
                                  setIsMenuOpen(null);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Change Status
                              </button>
                              <button
                                onClick={() => {
                                  handleDeleteCustomer(customer);
                                  setIsMenuOpen(null);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              >
                                Delete Customer
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
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

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">
            {Math.min(currentPage * itemsPerPage, sortedCustomers.length) - itemsPerPage + 1}
          </span> to{" "}
          <span className="font-medium">
            {Math.min(currentPage * itemsPerPage, sortedCustomers.length)}
          </span> of{" "}
          <span className="font-medium">{sortedCustomers.length}</span> customers
        </div>
        <div className="flex gap-1">
          <button 
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`px-3 py-1 rounded text-sm ${
                currentPage === index + 1
                  ? 'bg-indigo-600 text-white'
                  : 'border'
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button 
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {isEditModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Edit Customer</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              
              const updatedCustomer = {
                ...selectedCustomer,
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                phone: formData.get('phone') as string,
                segment: formData.get('segment') as string,
                status: selectedCustomer.status,
                registrationDate: selectedCustomer.registrationDate,
                lastLogin: selectedCustomer.lastLogin,
                orderCount: selectedCustomer.orderCount,
                location: selectedCustomer.location,
                age: selectedCustomer.age,
                referredBy: selectedCustomer.referredBy,
              };
              
              handleSaveEdit(updatedCustomer);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    name="name"
                    type="text"
                    defaultValue={selectedCustomer.name}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    name="email"
                    type="email"
                    defaultValue={selectedCustomer.email}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    name="phone"
                    type="text"
                    defaultValue={selectedCustomer.phone}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Segment</label>
                  <select
                    name="segment"
                    defaultValue={selectedCustomer.segment}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                  >
                    <option value="Basic">Basic</option>
                    <option value="Standard">Standard</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isStatusModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Change Status</h2>
            <div className="space-y-4">
              <select 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                defaultValue={selectedCustomer.status}
                onChange={(e) => handleStatusUpdate(e.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setIsStatusModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStatusUpdate(selectedCustomer.status)}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Delete Customer</h2>
            <p className="text-gray-600">
              Are you sure you want to delete {selectedCustomer.name}? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}