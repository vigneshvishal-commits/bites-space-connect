
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Vendor } from './types';

interface EditVendorModalProps {
  show: boolean;
  onClose: () => void;
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
  vendor: Vendor | null;
}

const EditVendorModal: React.FC<EditVendorModalProps> = ({ show, onClose, formData, setFormData, onSubmit, isPending, vendor }) => {
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
            className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl"
          >
            <h2 className="text-2xl font-semibold mb-6">Edit Vendor Details</h2>
            <form onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label className="block text-sm font-medium mb-2">Outlet Name *</Label>
                  <Input
                    placeholder="Enter outlet name"
                    value={formData.outletName}
                    onChange={(e) => setFormData({ ...formData, outletName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-2">Vendor Name *</Label>
                  <Input
                    placeholder="Enter vendor name"
                    value={formData.vendorName}
                    onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-2">Vendor Email *</Label>
                  <Input
                    type="email"
                    placeholder="Enter vendor email"
                    value={formData.vendorEmail}
                    onChange={(e) => setFormData({ ...formData, vendorEmail: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-2">Contact Number *</Label>
                  <Input
                    placeholder="Enter contact number"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-2">Location *</Label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  >
                    <option value="">Select Location</option>
                    <option value="SRZ SDB Floor 1 Wing A">SRZ SDB Floor 1 Wing A</option>
                    <option value="SRZ SDB Floor 1 Wing B">SRZ SDB Floor 1 Wing B</option>
                    <option value="SRZ SDB2 Floor 2 Wing A">SRZ SDB2 Floor 2 Wing A</option>
                    <option value="SRZ SDB1 Floor 2 Wing B">SRZ SDB1 Floor 2 Wing B</option>
                  </select>
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-2">Outlet Type *</Label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={formData.outletType}
                    onChange={(e) => setFormData({ ...formData, outletType: e.target.value })}
                  >
                    <option value="Healthy Food">Healthy Food</option>
                    <option value="Fast Food">Fast Food</option>
                    <option value="Cafe and Beverages">Cafe and Beverages</option>
                    <option value="Multi Cuisine">Multi Cuisine</option>
                    <option value="Snack and Refreshment">Snack and Refreshment</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-4">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700" disabled={isPending}>
                  {isPending ? 'Updating...' : 'Update'}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditVendorModal;
