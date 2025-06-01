
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg border border-blue-200 h-full group cursor-pointer"
      whileHover={{ 
        y: -8,
        boxShadow: "0 20px 40px rgba(37, 99, 235, 0.15)",
        borderColor: "#2563eb"
      }}
      transition={{ duration: 0.3, type: "spring", stiffness: 400, damping: 10 }}
    >
      <motion.div
        className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
        whileHover={{ rotate: 5 }}
      >
        <Icon className="w-8 h-8 text-white" />
      </motion.div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        {title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;
