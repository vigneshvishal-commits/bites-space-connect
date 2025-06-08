
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Store, ShoppingCart, TrendingUp, DollarSign, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const DashboardOverview = () => {
  const [selectedVendor, setSelectedVendor] = useState('All Vendors');

  const stats = [
    { title: 'Total Revenue', value: '₹2,45,890', change: '+15.3%', icon: DollarSign, color: 'text-green-600', bgColor: 'bg-green-100' },
    { title: 'Total Orders', value: '1,847', change: '+12.5%', icon: ShoppingCart, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { title: 'Total Vendors', value: '8', change: '+2', icon: Store, color: 'text-purple-600', bgColor: 'bg-purple-100' }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 25000, orders: 180 },
    { month: 'Feb', revenue: 28000, orders: 220 },
    { month: 'Mar', revenue: 32000, orders: 280 },
    { month: 'Apr', revenue: 35000, orders: 320 },
    { month: 'May', revenue: 42000, orders: 380 },
    { month: 'Jun', revenue: 45890, orders: 420 }
  ];

  const vendorTypeData = [
    { name: 'Healthy Food', value: 25, color: '#10b981' },
    { name: 'Fast Food', value: 25, color: '#3b82f6' },
    { name: 'Cafe & Beverages', value: 25, color: '#8b5cf6' },
    { name: 'Multi Cuisine', value: 25, color: '#f59e0b' }
  ];

  const locationData = [
    { location: 'SRZ SDB Floor 1 Wing A', vendors: 3, color: '#3b82f6' },
    { location: 'SRZ SDB Floor 1 Wing B', vendors: 2, color: '#10b981' },
    { location: 'SRZ SDB2 Floor 2 Wing A', vendors: 2, color: '#8b5cf6' },
    { location: 'SRZ SDB1 Floor 2 Wing B', vendors: 1, color: '#f59e0b' }
  ];

  const vendors = ['All Vendors', 'Healthy Bites', 'Fast Corner', 'Cafe Delight', 'Spice Paradise', 'Snack Hub', 'Green Garden', 'Curry Express', 'Coffee Corner'];

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome Admin! 
        </h1>
        <p className="text-xl text-gray-600">
          Manage your Bites Space efficiently
        </p>
      </motion.div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      <p className="text-sm text-green-600 font-medium mt-1">{stat.change}</p>
                    </div>
                    <div className={`p-4 rounded-full ${stat.bgColor}`}>
                      <Icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Revenue and Orders Trend - Big Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span>Revenue & Orders Trend</span>
              </CardTitle>
              <select 
                className="p-2 border rounded-md text-sm"
                value={selectedVendor}
                onChange={(e) => setSelectedVendor(e.target.value)}
              >
                {vendors.map(vendor => (
                  <option key={vendor} value={vendor}>{vendor}</option>
                ))}
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} name="Revenue (₹)" />
                <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={3} name="Orders" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Two Charts Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Vendor Distribution by Type */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Store className="w-5 h-5 text-purple-600" />
                <span>Distribution by Type</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={vendorTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {vendorTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {vendorTypeData.map((entry, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                    <span className="text-xs text-gray-600">{entry.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Distribution by Location */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-orange-600" />
                <span>Distribution by Location</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={locationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="location" tick={false} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="vendors" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {locationData.map((entry, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                    <span className="text-xs text-gray-600">{entry.location}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardOverview;
