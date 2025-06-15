import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Eye, Edit, Trash2, ToggleLeft, ToggleRight, Key, RefreshCw, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import VendorSearch from './VendorSearch';
import axiosInstance from '@/api/axiosInstance';

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

const VendorManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    outletName: '',
    vendorName: '',
    vendorEmail: '',
    location: '',
    contact: '',
    outletType: 'Healthy Food'
  });

  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loadingVendors, setLoadingVendors] = useState(true);

  useEffect(() => {
    fetchVendors();
  }, [searchTerm, statusFilter, typeFilter, locationFilter]);

  const fetchVendors = async () => {
    setLoadingVendors(true);
    try {
      const response = await axiosInstance.get('/admin/vendors', {
        params: {
          search: searchTerm || null,
          status: statusFilter === 'all' ? null : statusFilter,
          type: typeFilter === 'all' ? null : typeFilter,
          location: locationFilter === 'all' ? null : locationFilter,
        },
      });
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      toast({
        title: "Error",
        description: "Failed to load vendors.",
        variant: "destructive",
      });
    } finally {
      setLoadingVendors(false);
    }
  };

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = searchTerm === '' || vendor.outletName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'active' && vendor.isActive) ||
      (statusFilter === 'inactive' && !vendor.isActive);
    const matchesType = typeFilter === 'all' || vendor.outletType === typeFilter;
    const matchesLocation = locationFilter === 'all' || vendor.location === locationFilter;

    return matchesSearch && matchesStatus && matchesType && matchesLocation;
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

  const handleAddVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/admin/vendors', formData);
      setVendors([...vendors, response.data]);
      setFormData({
        outletName: '',
        vendorName: '',
        vendorEmail: '',
        location: '',
        contact: '',
        outletType: 'Healthy Food'
      });
      setShowAddForm(false);
      toast({
        title: "Success",
        description: "Outlet saved successfully!",
      });
      fetchVendors();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create vendor.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!selectedVendor) {
        throw new Error("No vendor selected for update.");
      }
      await axiosInstance.put(`/admin/vendors/${selectedVendor.id}`, formData);
      fetchVendors();
      setShowEditModal(false);
      setSelectedVendor(null);
      toast({
        title: "Success",
        description: "Vendor updated successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update vendor.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendCredentialsEmail = async () => {
    setIsLoading(true);

    try {
      if (!selectedVendor) {
        throw new Error("No vendor selected to send credentials.");
      }

      await axiosInstance.post(`/admin/vendors/${selectedVendor.id}/credentials`, {
        username: credentials.username,
        password: credentials.password,
      });

      setShowCredentialsModal(false);
      toast({
        title: "Success",
        description: "Credentials sent successfully to vendor's email!",
      });
    } catch (error: any) {
      console.error('Failed to send email:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to send credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteVendor = async () => {
    setIsLoading(true);
    try {
      if (!selectedVendor) {
        throw new Error("No vendor selected for deletion.");
      }
      await axiosInstance.delete(`/admin/vendors/${selectedVendor.id}`);
      fetchVendors();
      setShowDeleteConfirm(false);
      setSelectedVendor(null);
      toast({
        title: "Success",
        description: "Vendor deleted successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete vendor.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVendorStatus = async (id: number) => {
    try {
      await axiosInstance.put(`/admin/vendors/${id}/status`);
      fetchVendors();
      toast({
        title: "Success",
        description: "Vendor status toggled successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to toggle vendor status.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
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

      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <VendorSearch
              vendors={vendors}
              onVendorSelect={(vendor) => {
                setSearchTerm(vendor.outletName);
              }}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            <select
              className="p-2 border rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>

            <select
              className="p-2 border rounded-md"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="Healthy Food">Healthy Food</option>
              <option value="Fast Food">Fast Food</option>
              <option value="Cafe and Beverages">Cafe & Beverages</option>
              <option value="Multi Cuisine">Multi Cuisine</option>
              <option value="Snack and Refreshment">Snacks</option>
            </select>

            <select
              className="p-2 border rounded-md"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="all">All Locations</option>
              <option value="SRZ SDB Floor 1 Wing A">Floor 1 Wing A</option>
              <option value="SRZ SDB Floor 1 Wing B">Floor 1 Wing B</option>
              <option value="SRZ SDB2 Floor 2 Wing A">Floor 2 Wing A</option>
              <option value="SRZ SDB1 Floor 2 Wing B">Floor 2 Wing B</option>
            </select>
          </div>
        </CardContent>
      </Card>

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
                {loadingVendors ? (
                  <tr><td colSpan={7} className="text-center p-8">Loading vendors...</td></tr>
                ) : filteredVendors.length === 0 ? (
                  <tr><td colSpan={7} className="text-center p-8">No vendors found.</td></tr>
                ) : (
                  filteredVendors.map((vendor) => (
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
                        <Badge variant={vendor.isActive ? "default" : "destructive"} className={vendor.isActive ? "bg-green-600" : ""}>
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
                            title="View Details"
                            className="hover:bg-blue-50"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedVendor(vendor);
                              setFormData({
                                outletName: vendor.outletName,
                                vendorName: vendor.vendorName,
                                vendorEmail: vendor.vendorEmail,
                                location: vendor.location,
                                contact: vendor.contact,
                                outletType: vendor.outletType
                              });
                              setShowEditModal(true);
                            }}
                            title="Edit Vendor"
                            className="hover:bg-yellow-50"
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
                            title="Delete Vendor"
                            className="hover:bg-red-50"
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
                            title="Generate Credentials"
                            className="hover:bg-green-50"
                          >
                            <Key className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleVendorStatus(vendor.id)}
                            title="Toggle Status"
                            className="hover:bg-purple-50"
                          >
                            {vendor.isActive ? <ToggleLeft className="w-4 h-4" /> : <ToggleRight className="w-4 h-4" />}
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {showAddForm && (
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
              <h2 className="text-2xl font-semibold mb-6">Add New Food Outlet</h2>
              <form onSubmit={handleAddVendor}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label className="block text-sm font-medium mb-2">Outlet Name *</Label>
                    <Input
                      placeholder="Enter outlet name"
                      value={formData.outletName}
                      onChange={(e) => setFormData({ ...formData, outletName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium mb-2">Vendor Name *</Label>
                    <Input
                      placeholder="Enter vendor name"
                      value={formData.vendorName}
                      onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium mb-2">Vendor Email *</Label>
                    <Input
                      type="email"
                      placeholder="Enter vendor email"
                      value={formData.vendorEmail}
                      onChange={(e) => setFormData({ ...formData, vendorEmail: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium mb-2">Contact Number *</Label>
                    <Input
                      placeholder="Enter contact number"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium mb-2">Location *</Label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, outletType: e.target.value })}
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
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEditModal && selectedVendor && (
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
              <h2 className="text-2xl font-semibold mb-6">Edit Vendor Details</h2>
              <form onSubmit={handleUpdateVendor}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label className="block text-sm font-medium mb-2">Outlet Name *</Label>
                    <Input
                      placeholder="Enter outlet name"
                      value={formData.outletName}
                      onChange={(e) => setFormData({ ...formData, outletName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium mb-2">Vendor Name *</Label>
                    <Input
                      placeholder="Enter vendor name"
                      value={formData.vendorName}
                      onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium mb-2">Vendor Email *</Label>
                    <Input
                      type="email"
                      placeholder="Enter vendor email"
                      value={formData.vendorEmail}
                      onChange={(e) => setFormData({ ...formData, vendorEmail: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium mb-2">Contact Number *</Label>
                    <Input
                      placeholder="Enter contact number"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium mb-2">Location *</Label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, outletType: e.target.value })}
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
                      setShowEditModal(false);
                      setSelectedVendor(null);
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Updating...' : 'Update'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCredentialsModal && selectedVendor && (
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
                  onClick={sendCredentialsEmail}
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isLoading ? 'Sending...' : 'Send Credentials'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                <div>
                  <strong>Status:</strong>
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

      <AnimatePresence>
        {showDeleteConfirm && selectedVendor && (
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
                  disabled={isLoading}
                >
                  {isLoading ? 'Deleting...' : 'Delete'}
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
