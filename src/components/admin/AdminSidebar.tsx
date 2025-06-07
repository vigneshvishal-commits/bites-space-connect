
import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Store, 
  Users, 
  BarChart3, 
  Ticket, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

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
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'vendors', label: 'Vendors', icon: Store },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'tickets', label: 'Tickets', icon: Ticket }
  ];

  return (
    <motion.div
      className={`fixed left-0 top-0 h-full bg-white shadow-xl z-50 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img 
                src="/lovable-uploads/b3787bd3-143a-4cb2-9fdf-8228781e5bf4.png" 
                alt="Bites Space" 
                className="w-8 h-8"
              />
              <span className="font-bold text-lg text-gray-800" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Bites Space
              </span>
            </motion.div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
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
      <nav className="mt-6">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center px-4 py-3 text-left transition-all duration-200 hover:bg-blue-50 ${
                isActive ? 'bg-blue-100 border-r-4 border-blue-600 text-blue-700' : 'text-gray-600'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 4 }}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
              {!collapsed && (
                <span className="ml-3 font-medium" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  {item.label}
                </span>
              )}
            </motion.button>
          );
        })}
      </nav>
    </motion.div>
  );
};

export default AdminSidebar;
