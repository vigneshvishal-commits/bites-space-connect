
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

interface VendorSearchProps {
  vendors: Array<{ name: string; email: string; type: string; location: string; status: string }>;
  onVendorSelect: (vendor: any) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const VendorSearch: React.FC<VendorSearchProps> = ({
  vendors,
  onVendorSelect,
  searchTerm,
  setSearchTerm
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVendorClick = (vendor: any) => {
    setSearchTerm(vendor.name);
    setShowSuggestions(false);
    onVendorSelect(vendor);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search vendor by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(e.target.value.length > 0);
          }}
          onFocus={() => setShowSuggestions(searchTerm.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <AnimatePresence>
        {showSuggestions && filteredVendors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1 max-h-60 overflow-y-auto"
          >
            {filteredVendors.map((vendor, index) => (
              <motion.div
                key={vendor.email}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleVendorClick(vendor)}
                className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <div className="font-medium text-gray-800">{vendor.name}</div>
                <div className="text-sm text-gray-600">{vendor.type} • {vendor.location}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VendorSearch;
