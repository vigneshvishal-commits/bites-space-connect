
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Eye, Edit, Trash2, ToggleLeft, ToggleRight, Key, RefreshCw, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

const VendorManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('all');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showSuccess, setShowSuccess] = useState('');
  const [formData, setFormData] = useState({
    outletName: '',
    vendorName: '',
    vendorEmail: '',
    location: '',
    contact: '',
    outletType: 'Healthy Food'
  });

  // Mock vendor data
  const [vendors, setVendors] = useState([
    {
      id: 1,
      outletName: "Spice Paradise",
      vendorName: "John Doe",
      vendorEmail: "john.doe@cognizant.com",
      location: "SRZ SDB Floor 1 Wing A",
      contact: "+91 9876543210",
      outletType: "Multi Cuisine",
      isActive: true,
      joinDate: "2024-01-15"
    },
    {
      id: 2,
      outletName: "Healthy Bites",
      vendorName: "Sarah Smith",
      vendorEmail: "sarah.smith@cognizant.com",
      location: "SRZ SDB Floor 1 Wing B",
      contact: "+91 9876543211",
      outletType: "Healthy Food",
      isActive: false,
      joinDate: "2024-02-20"
    },
    // Add 6 more vendors to make it 8 total
    {
      id: 3,
      outletName: "Fast Corner",
      vendorName: "Mike Johnson",
      vendorEmail: "mike.johnson@cognizant.com",
      location: "SRZ SDB2 Floor 2 Wing A",
      contact: "+91 9876543212",
      outletType: "Fast Food",
      isActive: true,
      joinDate: "2024-01-10"
    },
    {
      id: 4,
      outletName: "Cafe Delight",
      vendorName: "Emily Davis",
      vendorEmail: "emily.davis@cognizant.com",
      location: "SRZ SDB1 Floor 2 Wing B",
      contact: "+91 9876543213",
      outletType: "Cafe and Beverages",
      isActive: true,
      joinDate: "2024-03-05"
    },
    {
      id: 5,
      outletName: "Snack Hub",
      vendorName: "Robert Wilson",
      vendorEmail: "robert.wilson@cognizant.com",
      location: "SRZ SDB Floor 1 Wing A",
      contact: "+91 9876543214",
      outletType: "Snack and Refreshment",
      isActive: false,
      joinDate: "2024-02-28"
    },
    {
      id: 6,
      outletName: "Green Bowl",
      vendorName: "Lisa Brown",
      vendorEmail: "lisa.brown@cognizant.com",
      location: "SRZ SDB Floor 1 Wing B",
      contact: "+91 9876543215",
      outletType: "Healthy Food",
      isActive: true,
      joinDate: "2024-03-12"
    },
    {
      id: 7,
      outletName: "Pizza Point",
      vendorName: "David Miller",
      vendorEmail: "david.miller@cognizant.com",
      location: "SRZ SDB2 Floor 2 Wing A",
      contact: "+91 9876543216",
      outletType: "Fast Food",
      isActive: true,
      joinDate: "2024-01-22"
    },
    {
      id: 8,
      outletName: "Tea Time",
      vendorName: "Anna Taylor",
      vendorEmail: "anna.taylor@cognizant.com",
      location: "SRZ SDB1 Floor 2 Wing B",
      contact: "+91 9876543217",
      outletType: "Cafe and Beverages",
      isActive: true,
      joinDate: "2024-03-08"
    }
  ]);

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.outletName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSort = sortBy === 'all' || 
                       (sortBy === 'active' && vendor.isActive) ||
                       (sortBy === 'inactive' && !vendor.isActive) ||
                       vendor.outletType === sortBy ||
                       vendor.location === sortBy;
    return matchesSearch && matchesSort;
  });

  const totalVendors = vendors.length;
  const activeVendors = vendors.filter(v => v.isActive).length;
  const inactiveVendors = vendors.filter(v => !v.isActive).length;

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCredentials(prev => ({ ...prev, password }));
  };

  const handleAddVendor = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to save this outlet?')) {
      const newVendor = {
        id: vendors.length + 1,
        ...formData,
        isActive: true,
        joinDate: new Date().toISOString().split('T')[0]
      };
      setVendors([...vendors, newVendor]);
      setFormData({
        outletName: '',
        vendorName: '',
        vendorEmail: '',
        location: '',
        contact: '',
        outletType: 'Healthy Food'
      });
      setShowAddForm(false);
      setShowSuccess('Outlet saved successfully!');
      setTimeout(() => setShowSuccess(''), 3000);
    }
  };

  const handleSendCredentials = () => {
    setShowCredentialsModal(false);
    setShowSuccess('Credentials sent successfully!');
    setTimeout(() => setShowSuccess(''), 3000);
  };

  const handleDeleteVendor = () => {
    setVendors(vendors.filter(v => v.id !== selectedVendor.id));
    setShowDeleteConfirm(false);
    setSelectedVendor(null);
    setShowSuccess('Vendor deleted successfully!');
    setTimeout(() => setShowSuccess(''), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2"
          >
            <CheckCircle className="w-5 h-5" />
            <span>{showSuccess}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Vendor Management</h1>
          <p className="text-gray-600">Manage food outlets and vendors</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Outlet
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Vendors</p>
                  <p className="text-3xl font-bold text-gray-800">{totalVendors}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <ToggleRight className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Active</p>
                  <p className="text-3xl font-bold text-green-600">{activeVendors}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <ToggleRight className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Inactive</p>
                  <p className="text-3xl font-bold text-red-600">{inactiveVendors}</p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <ToggleLeft className="w-8 h-8 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search outlet name..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="p-2 border rounded-md"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="all">All Vendors</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
              <option value="Healthy Food">Healthy Food</option>
              <option value="Fast Food">Fast Food</option>
              <option value="Cafe and Beverages">Cafe & Beverages</option>
              <option value="Multi Cuisine">Multi Cuisine</option>
              <option value="Snack and Refreshment">Snacks</option>
              <option value="SRZ SDB Floor 1 Wing A">Floor 1 Wing A</option>
              <option value="SRZ SDB Floor 1 Wing B">Floor 1 Wing B</option>
              <option value="SRZ SDB2 Floor 2 Wing A">Floor 2 Wing A</option>
              <option value="SRZ SDB1 Floor 2 Wing B">Floor 2 Wing B</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Vendors Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Vendors ({filteredVendors.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Outlet Name</th>
                  <th className="text-left p-4">Vendor</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">Location</th>
                  <th className="text-left p-4">Type</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map((vendor) => (
                  <motion.tr
                    key={vendor.id}
                    className="border-b hover:bg-gray-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <td className="p-4 font-medium">{vendor.outletName}</td>
                    <td className="p-4">{vendor.vendorName}</td>
                    <td className="p-4">{vendor.vendorEmail}</td>
                    <td className="p-4">{vendor.location}</td>
                    <td className="p-4">{vendor.outletType}</td>
                    <td className="p-4">
                      <Badge variant={vendor.isActive ? "default" : "destructive"}>
                        {vendor.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedVendor(vendor);
                            setShowViewModal(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedVendor(vendor);
                            setFormData(vendor);
                            setShowEditModal(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedVendor(vendor);
                            setShowDeleteConfirm(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedVendor(vendor);
                            setCredentials({ username: vendor.vendorEmail, password: '' });
                            generatePassword();
                            setShowCredentialsModal(true);
                          }}
                        >
                          <Key className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Vendor Modal */}
      <AnimatePresence>
        {(showAddForm || showEditModal) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl"
            >
              <h2 className="text-2xl font-semibold mb-6">
                {showAddForm ? 'Add New Food Outlet' : 'Edit Vendor Details'}
              </h2>
              <form onSubmit={handleAddVendor}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label className="block text-sm font-medium mb-2">Outlet Name *</Label>
                    <Input 
                      placeholder="Enter outlet name" 
                      value={formData.outletName}
                      onChange={(e) => setFormData({...formData, outletName: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium mb-2">Vendor Name *</Label>
                    <Input 
                      placeholder="Enter vendor name" 
                      value={formData.vendorName}
                      onChange={(e) => setFormData({...formData, vendorName: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium mb-2">Vendor Email *</Label>
                    <Input 
                      type="email"
                      placeholder="Enter vendor email" 
                      value={formData.vendorEmail}
                      onChange={(e) => setFormData({...formData, vendorEmail: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium mb-2">Contact Number *</Label>
                    <Input 
                      placeholder="Enter contact number" 
                      value={formData.contact}
                      onChange={(e) => setFormData({...formData, contact: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium mb-2">Location *</Label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      required
                    >
                      <option value="">Select Location</option>
                      <option value="SRZ SDB Floor 1 Wing A">SRZ SDB Floor 1 Wing A</option>
                      <option value="SRZ SDB Floor 1 Wing B">SRZ SDB Floor 1 Wing B</option>
                      <option value="SRZ SDB2 Floor 2 Wing A">SRZ SDB2 Floor 2 Wing A</option>
                      <option value="SRZ SDB1 Floor 2 Wing B">SRZ SDB1 Floor 2 Wing B</option>
                    </select>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium mb-2">Outlet Type *</Label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={formData.outletType}
                      onChange={(e) => setFormData({...formData, outletType: e.target.value})}
                    >
                      <option value="Healthy Food">Healthy Food</option>
                      <option value="Fast Food">Fast Food</option>
                      <option value="Cafe and Beverages">Cafe and Beverages</option>
                      <option value="Multi Cuisine">Multi Cuisine</option>
                      <option value="Snack and Refreshment">Snack and Refreshment</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={() => {
                      setShowAddForm(false);
                      setShowEditModal(false);
                      setFormData({
                        outletName: '',
                        vendorName: '',
                        vendorEmail: '',
                        location: '',
                        contact: '',
                        outletType: 'Healthy Food'
                      });
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    {showAddForm ? 'Save' : 'Update'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Credentials Modal */}
      <AnimatePresence>
        {showCredentialsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl"
            >
              <h2 className="text-xl font-semibold mb-4">Generate Credentials</h2>
              <div className="space-y-4">
                <div>
                  <Label className="block text-sm font-medium mb-2">Username</Label>
                  <Input 
                    value={credentials.username}
                    readOnly
                    className="bg-gray-100"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-2">Password</Label>
                  <div className="flex space-x-2">
                    <Input 
                      value={credentials.password}
                      readOnly
                      className="bg-gray-100"
                    />
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={generatePassword}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowCredentialsModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendCredentials}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Credentials
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && selectedVendor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl"
            >
              <h2 className="text-xl font-semibold mb-4">Vendor Details</h2>
              <div className="space-y-3">
                <div><strong>Outlet Name:</strong> {selectedVendor.outletName}</div>
                <div><strong>Vendor Name:</strong> {selectedVendor.vendorName}</div>
                <div><strong>Email:</strong> {selectedVendor.vendorEmail}</div>
                <div><strong>Contact:</strong> {selectedVendor.contact}</div>
                <div><strong>Location:</strong> {selectedVendor.location}</div>
                <div><strong>Type:</strong> {selectedVendor.outletType}</div>
                <div><strong>Status:</strong> 
                  <Badge variant={selectedVendor.isActive ? "default" : "destructive"} className="ml-2">
                    {selectedVendor.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div><strong>Join Date:</strong> {selectedVendor.joinDate}</div>
              </div>
              <Button
                onClick={() => setShowViewModal(false)}
                className="w-full mt-4"
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-96 shadow-xl"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Delete</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this vendor? This action cannot be undone.</p>
              <div className="flex space-x-3">
                <Button
                  onClick={() => setShowDeleteConfirm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDeleteVendor}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  Delete
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VendorManagement;
