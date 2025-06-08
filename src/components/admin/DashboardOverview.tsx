
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Store, ShoppingCart, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const DashboardOverview = () => {
  const [selectedVendor, setSelectedVendor] = useState('All Vendors');

  // All vendors trend data
  const allVendorsData = [
    { month: 'Jan', revenue: 25000, orders: 180 },
    { month: 'Feb', revenue: 28000, orders: 220 },
    { month: 'Mar', revenue: 32000, orders: 280 },
    { month: 'Apr', revenue: 35000, orders: 320 },
    { month: 'May', revenue: 42000, orders: 380 },
    { month: 'Jun', revenue: 45890, orders: 420 }
  ];

  // Individual vendor data
  const vendorSpecificData = {
    'Spice Paradise': [
      { month: 'Jan', revenue: 4500, orders: 32 },
      { month: 'Feb', revenue: 5200, orders: 38 },
      { month: 'Mar', revenue: 6100, orders: 45 },
      { month: 'Apr', revenue: 6800, orders: 52 },
      { month: 'May', revenue: 7200, orders: 58 },
      { month: 'Jun', revenue: 8100, orders: 62 }
    ],
    'Healthy Bites': [
      { month: 'Jan', revenue: 3200, orders: 28 },
      { month: 'Feb', revenue: 3800, orders: 32 },
      { month: 'Mar', revenue: 4200, orders: 38 },
      { month: 'Apr', revenue: 4600, orders: 42 },
      { month: 'May', revenue: 5100, orders: 46 },
      { month: 'Jun', revenue: 5500, orders: 50 }
    ],
    'Fast Corner': [
      { month: 'Jan', revenue: 3800, orders: 42 },
      { month: 'Feb', revenue: 4200, orders: 48 },
      { month: 'Mar', revenue: 4800, orders: 55 },
      { month: 'Apr', revenue: 5200, orders: 62 },
      { month: 'May', revenue: 5800, orders: 68 },
      { month: 'Jun', revenue: 6200, orders: 72 }
    ],
    'Cafe Delight': [
      { month: 'Jan', revenue: 2800, orders: 35 },
      { month: 'Feb', revenue: 3200, orders: 40 },
      { month: 'Mar', revenue: 3600, orders: 48 },
      { month: 'Apr', revenue: 4000, orders: 55 },
      { month: 'May', revenue: 4400, orders: 62 },
      { month: 'Jun', revenue: 4800, orders: 68 }
    ],
    'Snack Hub': [
      { month: 'Jan', revenue: 2200, orders: 25 },
      { month: 'Feb', revenue: 2600, orders: 30 },
      { month: 'Mar', revenue: 3000, orders: 38 },
      { month: 'Apr', revenue: 3400, orders: 45 },
      { month: 'May', revenue: 3800, orders: 52 },
      { month: 'Jun', revenue: 4200, orders: 58 }
    ],
    'Green Bowl': [
      { month: 'Jan', revenue: 3000, orders: 30 },
      { month: 'Feb', revenue: 3400, orders: 35 },
      { month: 'Mar', revenue: 3800, orders: 42 },
      { month: 'Apr', revenue: 4200, orders: 48 },
      { month: 'May', revenue: 4600, orders: 55 },
      { month: 'Jun', revenue: 5000, orders: 62 }
    ],
    'Pizza Point': [
      { month: 'Jan', revenue: 3500, orders: 40 },
      { month: 'Feb', revenue: 3900, orders: 45 },
      { month: 'Mar', revenue: 4300, orders: 52 },
      { month: 'Apr', revenue: 4700, orders: 58 },
      { month: 'May', revenue: 5100, orders: 65 },
      { month: 'Jun', revenue: 5500, orders: 70 }
    ],
    'Tea Time': [
      { month: 'Jan', revenue: 1800, orders: 22 },
      { month: 'Feb', revenue: 2100, orders: 26 },
      { month: 'Mar', revenue: 2400, orders: 32 },
      { month: 'Apr', revenue: 2700, orders: 38 },
      { month: 'May', revenue: 3000, orders: 44 },
      { month: 'Jun', revenue: 3300, orders: 50 }
    ]
  };

  const getCurrentData = () => {
    if (selectedVendor === 'All Vendors') {
      return allVendorsData;
    }
    return vendorSpecificData[selectedVendor] || allVendorsData;
  };

  // Calculate totals based on current data
  const currentData = getCurrentData();
  const totalRevenue = currentData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = currentData.reduce((sum, item) => sum + item.orders, 0);

  const stats = [
    { title: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, change: '+15.3%', icon: DollarSign, color: 'text-green-600', bgColor: 'bg-green-100' },
    { title: 'Total Orders', value: totalOrders.toLocaleString(), change: '+12.5%', icon: ShoppingCart, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { title: 'Total Vendors', value: '8', change: '+2', icon: Store, color: 'text-purple-600', bgColor: 'bg-purple-100' }
  ];

  const vendorTypeData = [
    { name: 'Healthy Food', value: 2, color: '#10b981' },
    { name: 'Fast Food', value: 2, color: '#3b82f6' },
    { name: 'Cafe & Beverages', value: 2, color: '#8b5cf6' },
    { name: 'Multi Cuisine', value: 2, color: '#f59e0b' }
  ];

  const locationData = [
    { name: 'SRZ SDB Floor 1 Wing A', value: 3, color: '#3b82f6' },
    { name: 'SRZ SDB Floor 1 Wing B', value: 2, color: '#10b981' },
    { name: 'SRZ SDB2 Floor 2 Wing A', value: 2, color: '#8b5cf6' },
    { name: 'SRZ SDB1 Floor 2 Wing B', value: 1, color: '#f59e0b' }
  ];

  const vendors = ['All Vendors', 'Spice Paradise', 'Healthy Bites', 'Fast Corner', 'Cafe Delight', 'Snack Hub', 'Green Bowl', 'Pizza Point', 'Tea Time'];

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

      {/* Revenue and Orders Trend - Full Width Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-xl font-semibold">Revenue & Orders Trend</CardTitle>
              <select 
                className="p-2 border rounded-md text-sm max-w-xs"
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
              <LineChart data={getCurrentData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} name="Revenue (₹)" dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }} />
                <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={3} name="Orders" dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Two Side-by-Side Charts - Reordered */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Vendor Distribution by Type - First */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Distribution by Type</CardTitle>
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
                  <Tooltip formatter={(value) => [value, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {vendorTypeData.map((entry, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                    <span className="text-xs text-gray-600">{entry.name} ({entry.value})</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Distribution by Location - Second */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Distribution by Location</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={locationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                  <XAxis 
                    dataKey="name" 
                    tick={false}
                    tickFormatter={() => ''}
                  />
                  <YAxis domain={[0, 'dataMax']} tickCount={4} stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {locationData.map((entry, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                    <span className="text-xs text-gray-600 text-center">
                      {entry.name.length > 15 ? `Location ${index + 1}` : entry.name} ({entry.value})
                    </span>
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
