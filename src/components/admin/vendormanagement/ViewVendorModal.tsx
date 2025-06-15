
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Vendor } from './types';

interface ViewVendorModalProps {
  show: boolean;
  onClose: () => void;
  vendor: Vendor | null;
}

const ViewVendorModal: React.FC<ViewVendorModalProps> = ({ show, onClose, vendor }) => {
  return (
    <AnimatePresence>
      {show && vendor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl"
          >
            <h2 className="text-xl font-semibold mb-4">Vendor Details</h2>
            <div className="space-y-3">
              <div><strong>Outlet Name:</strong> {vendor.outletName}</div>
              <div><strong>Vendor Name:</strong> {vendor.vendorName}</div>
              <div><strong>Email:</strong> {vendor.vendorEmail}</div>
              <div><strong>Contact:</strong> {vendor.contact}</div>
              <div><strong>Location:</strong> {vendor.location}</div>
              <div><strong>Type:</strong> {vendor.outletType}</div>
              <div>
                <strong>Status:</strong>
                <Badge variant={vendor.isActive ? "default" : "destructive"} className="ml-2">
                  {vendor.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div><strong>Join Date:</strong> {new Date(vendor.joinDate).toLocaleDateString()}</div>
            </div>
            <Button onClick={onClose} className="w-full mt-4">
              Close
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ViewVendorModal;
