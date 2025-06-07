
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Eye, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const VendorManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock vendor data
  const vendors = [
    {
      id: 1,
      outletName: "Spice Paradise",
      vendorName: "John Doe",
      location: "Food Court A",
      contact: "+91 9876543210",
      outletType: "Multi Cuisine",
      isActive: true,
      complaints: 0
    },
    {
      id: 2,
      outletName: "Healthy Bites",
      vendorName: "Sarah Smith",
      location: "Food Court B",
      contact: "+91 9876543211",
      outletType: "Healthy Food",
      isActive: false,
      complaints: 2
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Vendor Management</h1>
          <p className="text-gray-600">Manage food outlets and vendors</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Outlet
        </Button>
      </div>

      {/* Add Vendor Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-lg border"
        >
          <h2 className="text-xl font-semibold mb-4">Add New Food Outlet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Outlet Name</label>
              <Input placeholder="Enter outlet name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Vendor Name</label>
              <Input placeholder="Enter vendor name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <Input placeholder="Enter location" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Contact Number</label>
              <Input placeholder="Enter contact number" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Outlet Type</label>
              <select className="w-full p-2 border rounded-md">
                <option>Healthy Food</option>
                <option>Fast Food</option>
                <option>Cafe and Beverages</option>
                <option>Multi Cuisine</option>
                <option>Snack and Refreshment</option>
                <option>Others</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-4 mt-6">
            <Button variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              Save
            </Button>
          </div>
        </motion.div>
      )}

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search vendors..." className="pl-10" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vendors List */}
      <Card>
        <CardHeader>
          <CardTitle>All Vendors ({vendors.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Outlet Name</th>
                  <th className="text-left p-4">Vendor</th>
                  <th className="text-left p-4">Location</th>
                  <th className="text-left p-4">Type</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Complaints</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor) => (
                  <motion.tr
                    key={vendor.id}
                    className="border-b hover:bg-gray-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <td className="p-4 font-medium">{vendor.outletName}</td>
                    <td className="p-4">{vendor.vendorName}</td>
                    <td className="p-4">{vendor.location}</td>
                    <td className="p-4">{vendor.outletType}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        {vendor.isActive ? (
                          <ToggleRight className="w-6 h-6 text-green-600" />
                        ) : (
                          <ToggleLeft className="w-6 h-6 text-red-600" />
                        )}
                        <Badge variant={vendor.isActive ? "default" : "destructive"}>
                          {vendor.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={vendor.complaints > 0 ? "destructive" : "secondary"}>
                        {vendor.complaints} complaints
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4" />
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
    </div>
  );
};

export default VendorManagement;
