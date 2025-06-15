
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminSidebar from '@/components/admin/AdminSidebar';
import DashboardOverview from '@/components/admin/DashboardOverview';
import VendorManagement from '@/components/admin/VendorManagement';
import TicketManagement from '@/components/admin/TicketManagement';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, logout } = useAuth();

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'vendors':
        return <VendorManagement />;
      case 'tickets':
        return <TicketManagement />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex">
      <AdminSidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-80'}`}>
        <header className="p-4 flex justify-between items-center bg-white shadow-sm">
            <h1 className="text-xl font-semibold">Welcome, {user?.username || 'Admin'}!</h1>
            <div>
              <Button variant="outline" asChild className="mr-2">
                <Link to="/admin/change-password">Change Password</Link>
              </Button>
              <Button onClick={logout}>Logout</Button>
            </div>
        </header>
        <main className="p-8">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
