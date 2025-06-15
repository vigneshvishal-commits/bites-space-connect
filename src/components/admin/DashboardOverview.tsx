import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ToggleRight, ToggleLeft, ShoppingCart, Users, HelpCircle } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import axiosInstance from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardOverview = () => {
  // All summary/analytics are fetched from backend now
  const { data: summary, isLoading: summaryLoading } = useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: async () => (await axiosInstance.get('/api/admin/dashboard/summary')).data
  });

  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['dashboard-analytics'],
    queryFn: async () => (await axiosInstance.get('/api/admin/dashboard/analytics')).data
  });

  const ticketData: ChartData<'doughnut', number[], string> = {
    labels: ['Open', 'In Progress', 'Resolved', 'Closed'],
    datasets: [
      {
        label: 'Ticket Status',
        data: [12, 19, 3, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const vendorData: ChartData<'doughnut', number[], string> = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        label: 'Vendor Status',
        data: [8, 2],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 99, 132, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600">Summary of key metrics and recent activity</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-800">5,345</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <ShoppingCart className="w-8 h-8 text-blue-600" />
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
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-green-600">1,245</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Users className="w-8 h-8 text-green-600" />
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
                  <p className="text-sm text-gray-600">Active Vendors</p>
                  <p className="text-3xl font-bold text-yellow-600">86</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <ToggleRight className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Open Tickets</p>
                  <p className="text-3xl font-bold text-red-600">23</p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <HelpCircle className="w-8 h-8 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Ticket Status</h3>
              <Doughnut data={ticketData} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Vendor Status</h3>
              <Doughnut data={vendorData} />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <p className="text-gray-600">New user registered</p>
                <span className="text-sm text-gray-500">5 minutes ago</span>
              </li>
              <li className="flex items-center justify-between">
                <p className="text-gray-600">Vendor updated menu</p>
                <span className="text-sm text-gray-500">30 minutes ago</span>
              </li>
              <li className="flex items-center justify-between">
                <p className="text-gray-600">New order placed</p>
                <span className="text-sm text-gray-500">1 hour ago</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default DashboardOverview;
