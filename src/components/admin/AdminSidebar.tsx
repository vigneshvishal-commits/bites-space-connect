
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Store, 
  Ticket, 
  ChevronLeft,
  ChevronRight,
  User,
  LogOut,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeSection,
  setActiveSection,
  collapsed,
  setCollapsed
}) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'vendors', label: 'Vendors', icon: Store },
    { id: 'tickets', label: 'Tickets', icon: Ticket }
  ];

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    setShowProfile(false);
    // Add logout animation here
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  };

  return (
    <>
      <motion.div
        className={`fixed left-0 top-0 h-full bg-white shadow-2xl z-50 transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-80'
        }`}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <motion.div
                className="flex flex-col items-center space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <img 
                  src="/lovable-uploads/b3787bd3-143a-4cb2-9fdf-8228781e5bf4.png" 
                  alt="Bites Space" 
                  className="w-16 h-16"
                />
                <span className="font-bold text-xl text-gray-800" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Bites Space
                </span>
              </motion.div>
            )}
            {collapsed && (
              <img 
                src="/lovable-uploads/b3787bd3-143a-4cb2-9fdf-8228781e5bf4.png" 
                alt="Bites Space" 
                className="w-12 h-12 mx-auto"
              />
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              {collapsed ? (
                <ChevronRight className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 mt-8">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-6 py-4 text-left transition-all duration-200 hover:bg-blue-50 ${
                  isActive ? 'bg-blue-100 border-r-4 border-blue-600 text-blue-700' : 'text-gray-600'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 4 }}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                {!collapsed && (
                  <span className="ml-4 font-medium text-lg" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    {item.label}
                  </span>
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Profile Section in Footer */}
        <div className="border-t border-gray-200 p-4">
          <motion.button
            onClick={() => setShowProfile(!showProfile)}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors ${
              showProfile ? 'bg-gray-100' : ''
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            {!collapsed && (
              <div className="text-left">
                <p className="text-sm font-medium text-gray-800">Admin</p>
                <p className="text-xs text-gray-600">EatInCognizant</p>
              </div>
            )}
          </motion.button>

          {/* Profile Details */}
          <AnimatePresence>
            {showProfile && !collapsed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> Administrator</p>
                  <p><span className="font-medium">Username:</span> EatInCognizant</p>
                  <p><span className="font-medium">Role:</span> System Admin</p>
                  <p><span className="font-medium">Last Login:</span> Today</p>
                </div>
                <Button
                  onClick={() => setShowLogoutConfirm(true)}
                  variant="outline"
                  className="w-full mt-3 text-red-600 border-red-300 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
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
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Logout</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to log out of your admin account?</p>
              <div className="flex space-x-3">
                <Button
                  onClick={() => setShowLogoutConfirm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleLogout}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  Yes, Logout
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;
