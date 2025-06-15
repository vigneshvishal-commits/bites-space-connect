import React from 'react';
import { motion } from 'framer-motion';
import { Store, ShoppingCart, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { Skeleton } from '@/components/ui/skeleton';

// Inferred types from backend response
interface DashboardSummary {
  totalRevenue: number;
  totalOrders: number;
  totalVendors: number;
  revenueChange: number;
  ordersChange: number;
  vendorsChange: number;
}

interface AnalyticsData {
  revenueAndOrdersTrend: { month: string; revenue: number; orders: number }[];
  vendorTypeDistribution: { name: string; value: number; color: string }[];
  locationDistribution: { name: string; value: number; color: string }[];
}

const DashboardOverview = () => {
  const { data: summary, isLoading: isLoadingSummary } = useQuery<DashboardSummary>({
    queryKey: ['dashboardSummary'],
    queryFn: () => axiosInstance.get('/admin/dashboard/summary').then(res => res.data),
  });

  const { data: analytics, isLoading: isLoadingAnalytics } = useQuery<AnalyticsData>({
    queryKey: ['dashboardAnalytics'],
    queryFn: () => axiosInstance.get('/admin/dashboard/analytics').then(res => res.data),
  });

  const stats = [
    { title: 'Total Revenue', value: summary ? `₹${summary.totalRevenue.toLocaleString()}` : '0', change: summary ? `${summary.revenueChange >= 0 ? '+' : ''}${summary.revenueChange}%` : '+0%', icon: DollarSign, color: 'text-green-600', bgColor: 'bg-green-100' },
    { title: 'Total Orders', value: summary ? summary.totalOrders.toLocaleString() : '0', change: summary ? `${summary.ordersChange >= 0 ? '+' : ''}${summary.ordersChange}%` : '+0%', icon: ShoppingCart, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { title: 'Total Vendors', value: summary ? summary.totalVendors.toLocaleString() : '0', change: summary ? `${summary.vendorsChange >= 0 ? '+' : ''}${summary.vendorsChange}` : '+0', icon: Store, color: 'text-purple-600', bgColor: 'bg-purple-100' }
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

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoadingSummary ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}><CardContent className="p-6"><Skeleton className="h-24 w-full" /></CardContent></Card>
          ))
        ) : (
          stats.map((stat, index) => {
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
          })
        )}
      </div>

      {/* Revenue and Orders Trend - Full Width Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">Revenue & Orders Trend</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingAnalytics ? <Skeleton className="w-full h-[400px]" /> : (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={analytics?.revenueAndOrdersTrend || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} name="Revenue (₹)" />
                <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={3} name="Orders" />
              </LineChart>
            </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Two Side-by-Side Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Vendor Distribution by Type */}
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
              {isLoadingAnalytics ? <Skeleton className="w-full h-[300px]" /> : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics?.vendorTypeDistribution || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {(analytics?.vendorTypeDistribution || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
              )}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {(analytics?.vendorTypeDistribution || []).map((entry, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                    <span className="text-xs text-gray-600">{entry.name} ({entry.value})</span>
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
              <CardTitle className="text-lg font-semibold">Distribution by Location</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingAnalytics ? <Skeleton className="w-full h-[300px]" /> : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics?.locationDistribution || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    tick={false}
                    tickFormatter={() => ''}
                  />
                  <YAxis domain={[0, 'dataMax']} tickCount={4} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" >
                    {(analytics?.locationDistribution || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              )}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {(analytics?.locationDistribution || []).map((entry, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                    <span className="text-xs text-gray-600">{entry.name} ({entry.value})</span>
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
