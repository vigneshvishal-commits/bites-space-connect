import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Store, CheckCircle, XCircle, Eye, Edit, Trash2, Key, Search as SearchIcon } from 'lucide-react';

interface Vendor {
  id: number;
  outletName: string;
  vendorName: string;
  vendorEmail: string;
  location: string;
  contact: string;
  outletType: string;
  isActive: boolean;
  joinDate: string;
}

interface VendorSearchProps {
  vendors: Vendor[];
  onVendorSelect: (vendorName: string) => void;
  placeholder?: string;
}

const VendorSearch: React.FC<VendorSearchProps> = ({ vendors, onVendorSelect, placeholder = "Search..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Vendor[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      const results = vendors.filter(vendor =>
        vendor.outletName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setIsDropdownOpen(true);
    } else {
      setSearchResults([]);
      setIsDropdownOpen(false);
    }
  }, [searchTerm, vendors]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onVendorSelect(e.target.value);
  };

  const handleVendorSelect = (vendorName: string) => {
    setSearchTerm(vendorName);
    onVendorSelect(vendorName);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full pr-10"
          onFocus={() => setIsDropdownOpen(true)}
          onBlur={() => setTimeout(() => setIsDropdownOpen(false), 100)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      {isDropdownOpen && searchResults.length > 0 && (
        <div className="absolute left-0 mt-1 w-full rounded-md shadow-lg z-10 bg-white border border-gray-200 max-h-48 overflow-y-auto">
          <ul className="py-1 text-sm text-gray-700">
            {searchResults.map(vendor => (
              <li
                key={vendor.id}
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleVendorSelect(vendor.outletName)}
              >
                {vendor.outletName} ({vendor.vendorName})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const VendorManagement = () => {
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: 1,
      outletName: 'Spice Paradise',
      vendorName: 'Vignesh Vishal',
      vendorEmail: 'vignesh@example.com',
      location: 'SRZ SDB Floor 1 Wing A',
      contact: '9876543210',
      outletType: 'Multi Cuisine',
      isActive: true,
      joinDate: '01/01/2024'
    },
    {
      id: 2,
      outletName: 'Healthy Bites',
      vendorName: 'Sasank Pagadala',
      vendorEmail: 'sasank@example.com',
      location: 'SRZ SDB Floor 1 Wing B',
      contact: '8765432190',
      outletType: 'Healthy Food',
      isActive: false,
      joinDate: '01/05/2024'
    },
    {
      id: 3,
      outletName: 'Fast Corner',
      vendorName: 'Siva Sankar',
      vendorEmail: 'siva@example.com',
      location: 'SRZ SDB2 Floor 2 Wing A',
      contact: '7654321980',
      outletType: 'Fast Food',
      isActive: true,
      joinDate: '02/15/2024'
    },
    {
      id: 4,
      outletName: 'Cafe Delight',
      vendorName: 'Abinash Dash',
      vendorEmail: 'abi@example.com',
      location: 'SRZ SDB1 Floor 2 Wing B',
      contact: '6543219870',
      outletType: 'Cafe & Beverages',
      isActive: true,
      joinDate: '03/01/2024'
    },
    {
      id: 5,
      outletName: 'Snack Hub',
      vendorName: 'Praveen Kumar',
      vendorEmail: 'praveen@example.com',
      location: 'SRZ SDB Floor 1 Wing A',
      contact: '9876543211',
      outletType: 'Snacks',
      isActive: true,
      joinDate: '03/15/2024'
    },
    {
      id: 6,
      outletName: 'Green Bowl',
      vendorName: 'Deepika Reddy',
      vendorEmail: 'deepika@example.com',
      location: 'SRZ SDB Floor 1 Wing B',
      contact: '8765432191',
      outletType: 'Healthy Food',
      isActive: false,
      joinDate: '04/01/2024'
    },
    {
      id: 7,
      outletName: 'Pizza Point',
      vendorName: 'Sai Kumar',
      vendorEmail: 'sai@example.com',
      location: 'SRZ SDB2 Floor 2 Wing A',
      contact: '7654321981',
      outletType: 'Fast Food',
      isActive: true,
      joinDate: '04/15/2024'
    },
    {
      id: 8,
      outletName: 'Tea Time',
      vendorName: 'Suresh Babu',
      vendorEmail: 'suresh@example.com',
      location: 'SRZ SDB1 Floor 2 Wing B',
      contact: '6543219871',
      outletType: 'Cafe & Beverages',
      isActive: true,
      joinDate: '05/01/2024'
    }
  ]);
  const [newVendor, setNewVendor] = useState<Omit<Vendor, 'id' | 'joinDate'>>({
    outletName: '',
    vendorName: '',
    vendorEmail: '',
    location: '',
    contact: '',
    outletType: '',
    isActive: true
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const handleSaveVendor = () => {
    if (!newVendor.outletName || !newVendor.vendorName || !newVendor.vendorEmail || !newVendor.location || !newVendor.contact || !newVendor.outletType) {
      alert('Please fill in all required fields');
      return;
    }

    // Show confirmation dialog
    const confirmed = window.confirm('Are you sure you want to save this vendor?');
    if (!confirmed) return;

    if (editingVendor) {
      // Update existing vendor
      setVendors(vendors.map(vendor => 
        vendor.id === editingVendor.id 
          ? { ...newVendor, id: editingVendor.id, joinDate: vendor.joinDate }
          : vendor
      ));
      setEditingVendor(null);
      alert('Vendor updated successfully!');
    } else {
      // Add new vendor
      const vendor = {
        ...newVendor,
        id: Date.now(),
        joinDate: new Date().toLocaleDateString()
      };
      setVendors([...vendors, vendor]);
      alert('Vendor saved successfully!');
    }

    setNewVendor({
      outletName: '',
      vendorName: '',
      vendorEmail: '',
      location: '',
      contact: '',
      outletType: '',
      isActive: true
    });
    setShowAddForm(false);
  };

  const handleDeleteVendor = (vendorId: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this vendor?');
    if (confirmed) {
      setVendors(vendors.filter(vendor => vendor.id !== vendorId));
      alert('Vendor deleted successfully!');
    }
  };

  const handleGenerateCredentials = (vendor: Vendor) => {
    // Mock email sending
    const credentials = {
      username: vendor.vendorEmail,
      password: Math.random().toString(36).slice(-8),
      loginUrl: `${window.location.origin}/login`
    };

    // Simulate sending email
    setTimeout(() => {
      alert(`Credentials sent successfully to ${vendor.vendorEmail}!\n\nUsername: ${credentials.username}\nPassword: ${credentials.password}\nLogin URL: ${credentials.loginUrl}`);
    }, 1000);

    // Show loading state
    alert('Sending credentials...');
  };

  const handleEditVendor = (vendor: Vendor) => {
    setEditingVendor(vendor);
    setNewVendor({
      outletName: vendor.outletName,
      vendorName: vendor.vendorName,
      vendorEmail: vendor.vendorEmail,
      location: vendor.location,
      contact: vendor.contact,
      outletType: vendor.outletType,
      isActive: vendor.isActive
    });
    setShowAddForm(true);
  };

  const filteredVendors = vendors.filter(vendor => {
    const searchMatch =
      vendor.outletName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
    const statusMatch = statusFilter ? (statusFilter === 'active' ? vendor.isActive : !vendor.isActive) : true;
    const typeMatch = typeFilter ? vendor.outletType === typeFilter : true;
    const locationMatch = locationFilter ? vendor.location === locationFilter : true;

    return searchMatch && statusMatch && typeMatch && locationMatch;
  });

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Vendors</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{vendors.length}</p>
                </div>
                <div className="p-4 rounded-full bg-blue-100">
                  <Store className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Active</p>
                  <p className="text-3xl font-bold text-green-600 mt-1">{vendors.filter(v => v.isActive).length}</p>
                </div>
                <div className="p-4 rounded-full bg-green-100">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Inactive</p>
                  <p className="text-3xl font-bold text-red-600 mt-1">{vendors.filter(v => !v.isActive).length}</p>
                </div>
                <div className="p-4 rounded-full bg-red-100">
                  <XCircle className="w-8 h-8 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Vendor Management</h2>
        <Button onClick={() => setShowAddForm(true)}>Add Vendor</Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <VendorSearch 
                vendors={vendors}
                onVendorSelect={setSearchQuery}
                placeholder="Search vendors..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Types</option>
                <option value="Healthy Food">Healthy Food</option>
                <option value="Fast Food">Fast Food</option>
                <option value="Multi Cuisine">Multi Cuisine</option>
                <option value="Cafe & Beverages">Cafe & Beverages</option>
                <option value="Snacks">Snacks</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Locations</option>
                <option value="SRZ SDB Floor 1 Wing A">SRZ SDB Floor 1 Wing A</option>
                <option value="SRZ SDB Floor 1 Wing B">SRZ SDB Floor 1 Wing B</option>
                <option value="SRZ SDB2 Floor 2 Wing A">SRZ SDB2 Floor 2 Wing A</option>
                <option value="SRZ SDB1 Floor 2 Wing B">SRZ SDB1 Floor 2 Wing B</option>
              </select>
            </div>
          </div>

          {/* Vendors Table */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outlet Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vendor.outletName}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{vendor.vendorName}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{vendor.vendorEmail}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{vendor.outletType}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{vendor.location}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        vendor.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {vendor.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button 
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEditVendor(vendor)}
                          className="text-green-600 hover:text-green-900 transition-colors"
                          title="Edit Vendor"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteVendor(vendor.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Delete Vendor"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleGenerateCredentials(vendor)}
                          className="text-purple-600 hover:text-purple-900 transition-colors"
                          title="Generate Credentials"
                        >
                          <Key className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Vendor Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {editingVendor ? 'Edit Vendor' : 'Add New Vendor'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Outlet Name *</label>
                <Input
                  value={newVendor.outletName}
                  onChange={(e) => setNewVendor({...newVendor, outletName: e.target.value})}
                  placeholder="Enter outlet name"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vendor Name *</label>
                <Input
                  value={newVendor.vendorName}
                  onChange={(e) => setNewVendor({...newVendor, vendorName: e.target.value})}
                  placeholder="Enter vendor name"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vendor Email *</label>
                <Input
                  type="email"
                  value={newVendor.vendorEmail}
                  onChange={(e) => setNewVendor({...newVendor, vendorEmail: e.target.value})}
                  placeholder="Enter vendor email"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact *</label>
                <Input
                  value={newVendor.contact}
                  onChange={(e) => setNewVendor({...newVendor, contact: e.target.value})}
                  placeholder="Enter contact number"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Outlet Type *</label>
                <select
                  value={newVendor.outletType}
                  onChange={(e) => setNewVendor({...newVendor, outletType: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select outlet type</option>
                  <option value="Healthy Food">Healthy Food</option>
                  <option value="Fast Food">Fast Food</option>
                  <option value="Multi Cuisine">Multi Cuisine</option>
                  <option value="Cafe & Beverages">Cafe & Beverages</option>
                  <option value="Snacks">Snacks</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <select
                  value={newVendor.location}
                  onChange={(e) => setNewVendor({...newVendor, location: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select location</option>
                  <option value="SRZ SDB Floor 1 Wing A">SRZ SDB Floor 1 Wing A</option>
                  <option value="SRZ SDB Floor 1 Wing B">SRZ SDB Floor 1 Wing B</option>
                  <option value="SRZ SDB2 Floor 2 Wing A">SRZ SDB2 Floor 2 Wing A</option>
                  <option value="SRZ SDB1 Floor 2 Wing B">SRZ SDB1 Floor 2 Wing B</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-6">
              <input
                type="checkbox"
                id="isActive"
                checked={newVendor.isActive}
                onChange={(e) => setNewVendor({...newVendor, isActive: e.target.checked})}
                className="rounded border-gray-300"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Active</label>
            </div>
            
            <div className="flex space-x-4 mt-8">
              <Button onClick={handleSaveVendor} className="flex-1 bg-blue-600 hover:bg-blue-700">
                {editingVendor ? 'Update Vendor' : 'Save Vendor'}
              </Button>
              <Button onClick={() => {
                setShowAddForm(false);
                setEditingVendor(null);
                setNewVendor({
                  outletName: '',
                  vendorName: '',
                  vendorEmail: '',
                  location: '',
                  contact: '',
                  outletType: '',
                  isActive: true
                });
              }} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default VendorManagement;
