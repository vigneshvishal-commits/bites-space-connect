
import React from 'react';
import { motion } from 'framer-motion';
import { Store, Users, ShoppingCart, TrendingUp, DollarSign, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const DashboardOverview = () => {
  const stats = [
    { title: 'Total Revenue', value: '₹2,45,890', change: '+15.3%', icon: DollarSign, color: 'text-green-600', bgColor: 'bg-green-100' },
    { title: 'Total Orders', value: '1,847', change: '+12.5%', icon: ShoppingCart, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { title: 'Active Vendors', value: '8', change: '+2', icon: Store, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { title: 'Total Users', value: '523', change: '+18.2%', icon: Users, color: 'text-orange-600', bgColor: 'bg-orange-100' }
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
    { name: 'Healthy Food', value: 30, color: '#10b981' },
    { name: 'Fast Food', value: 25, color: '#3b82f6' },
    { name: 'Cafe & Beverages', value: 20, color: '#8b5cf6' },
    { name: 'Multi Cuisine', value: 15, color: '#f59e0b' },
    { name: 'Snacks', value: 10, color: '#ef4444' }
  ];

  const locationData = [
    { location: 'SRZ SDB Floor 1 Wing A', vendors: 3, color: '#3b82f6' },
    { location: 'SRZ SDB Floor 1 Wing B', vendors: 2, color: '#10b981' },
    { location: 'SRZ SDB2 Floor 2 Wing A', vendors: 2, color: '#8b5cf6' },
    { location: 'SRZ SDB1 Floor 2 Wing B', vendors: 1, color: '#f59e0b' }
  ];

  const recentOrders = [
    { id: '#1847', customer: 'John Doe', vendor: 'Healthy Bites', amount: '₹245', status: 'Completed', time: '10:30 AM' },
    { id: '#1846', customer: 'Jane Smith', vendor: 'Fast Corner', amount: '₹180', status: 'Processing', time: '10:15 AM' },
    { id: '#1845', customer: 'Mike Johnson', vendor: 'Cafe Delight', amount: '₹320', status: 'Completed', time: '09:45 AM' },
    { id: '#1844', customer: 'Sarah Wilson', vendor: 'Snack Hub', amount: '₹150', status: 'Pending', time: '09:30 AM' }
  ];

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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span>Revenue & Orders Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} />
                  <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Vendor Distribution by Type */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Store className="w-5 h-5 text-purple-600" />
                <span>Vendor Distribution by Type</span>
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
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Location Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-orange-600" />
              <span>Vendor Distribution by Location</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={locationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="location" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="vendors" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5 text-green-600" />
              <span>Recent Orders</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{order.vendor}</p>
                      <p className="text-sm text-gray-600">{order.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="font-medium">{order.amount}</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardOverview;
