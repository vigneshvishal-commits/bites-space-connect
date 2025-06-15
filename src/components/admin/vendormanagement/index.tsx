
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import axiosInstance from '@/api/axiosInstance';
import { Vendor } from './types';
import VendorStats from './VendorStats';
import VendorFilters from './VendorFilters';
import VendorsTable from './VendorsTable';
import AddVendorModal from './AddVendorModal';
import EditVendorModal from './EditVendorModal';
import ViewVendorModal from './ViewVendorModal';
import DeleteVendorModal from './DeleteVendorModal';
import CredentialsModal from './CredentialsModal';

const fetchVendors = async (searchTerm: string, statusFilter: string, typeFilter: string, locationFilter: string): Promise<Vendor[]> => {
  const { data } = await axiosInstance.get('/admin/vendors', {
    params: {
      search: searchTerm || null,
      status: statusFilter === 'all' ? null : statusFilter,
      type: typeFilter === 'all' ? null : typeFilter,
      location: locationFilter === 'all' ? null : locationFilter,
    },
  });
  return data;
};

const VendorManagement = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [showAddForm, setShowAddForm] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [formData, setFormData] = useState({
    outletName: '',
    vendorName: '',
    vendorEmail: '',
    location: '',
    contact: '',
    outletType: 'Healthy Food'
  });

  const { data: vendors = [], isLoading: loadingVendors, isError } = useQuery<Vendor[]>({
    queryKey: ['vendors', searchTerm, statusFilter, typeFilter, locationFilter],
    queryFn: () => fetchVendors(searchTerm, statusFilter, typeFilter, locationFilter),
  });

  const invalidateVendorsQuery = () => {
    queryClient.invalidateQueries({ queryKey: ['vendors'] });
  };

  const addVendorMutation = useMutation({
    mutationFn: (newVendor: Omit<Vendor, 'id' | 'isActive' | 'joinDate'>) => axiosInstance.post('/admin/vendors', newVendor),
    onSuccess: () => {
      invalidateVendorsQuery();
      setShowAddForm(false);
      toast({ title: "Success", description: "Outlet saved successfully!" });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create vendor.",
        variant: "destructive",
      });
    },
  });

  const updateVendorMutation = useMutation({
    mutationFn: (updatedVendor: { id: number; data: Omit<Vendor, 'id' | 'isActive' | 'joinDate'> }) =>
      axiosInstance.put(`/admin/vendors/${updatedVendor.id}`, updatedVendor.data),
    onSuccess: () => {
      invalidateVendorsQuery();
      setShowEditModal(false);
      setSelectedVendor(null);
      toast({ title: "Success", description: "Vendor updated successfully!" });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update vendor.",
        variant: "destructive",
      });
    },
  });

  const deleteVendorMutation = useMutation({
    mutationFn: (vendorId: number) => axiosInstance.delete(`/admin/vendors/${vendorId}`),
    onSuccess: () => {
      invalidateVendorsQuery();
      setShowDeleteConfirm(false);
      setSelectedVendor(null);
      toast({ title: "Success", description: "Vendor deleted successfully!" });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete vendor.",
        variant: "destructive",
      });
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: (vendorId: number) => axiosInstance.put(`/admin/vendors/${vendorId}/status`),
    onSuccess: () => {
      invalidateVendorsQuery();
      toast({ title: "Success", description: "Vendor status toggled successfully!" });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to toggle vendor status.",
        variant: "destructive",
      });
    },
  });

  const sendCredentialsMutation = useMutation({
    mutationFn: (data: { id: number; credentials: { username: string; password: string } }) =>
      axiosInstance.post(`/admin/vendors/${data.id}/credentials`, data.credentials),
    onSuccess: () => {
      setShowCredentialsModal(false);
      toast({ title: "Success", description: "Credentials sent successfully to vendor's email!" });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to send credentials.",
        variant: "destructive",
      });
    },
  });

  const totalVendors = vendors.length;
  const activeVendors = vendors.filter(v => v.isActive).length;
  const inactiveVendors = vendors.filter(v => !v.isActive).length;

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCredentials(prev => ({ ...prev, password }));
  };

  const handleAddVendor = (e: React.FormEvent) => {
    e.preventDefault();
    addVendorMutation.mutate(formData);
  };

  const handleUpdateVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedVendor) {
      updateVendorMutation.mutate({ id: selectedVendor.id, data: formData });
    }
  };

  const sendCredentialsEmail = () => {
    if (selectedVendor) {
      sendCredentialsMutation.mutate({ id: selectedVendor.id, credentials });
    }
  };

  const handleDeleteVendor = () => {
    if (selectedVendor) {
      deleteVendorMutation.mutate(selectedVendor.id);
    }
  };

  const handleOpenEditModal = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setFormData({
      outletName: vendor.outletName,
      vendorName: vendor.vendorName,
      vendorEmail: vendor.vendorEmail,
      location: vendor.location,
      contact: vendor.contact,
      outletType: vendor.outletType
    });
    setShowEditModal(true);
  };
  
  const handleOpenCredentialsModal = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setCredentials({ username: vendor.vendorEmail, password: '' });
    generatePassword();
    setShowCredentialsModal(true);
  };
  
  const handleCloseAddModal = () => {
    setShowAddForm(false);
    setFormData({
      outletName: '',
      vendorName: '',
      vendorEmail: '',
      location: '',
      contact: '',
      outletType: 'Healthy Food'
    });
  }

  if (isError) {
    return <div className="text-center text-red-500">Failed to load vendors. Please try again later.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Vendor Management</h1>
          <p className="text-gray-600">Manage food outlets and vendors</p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Outlet
        </Button>
      </div>

      <VendorStats 
        loadingVendors={loadingVendors}
        totalVendors={totalVendors}
        activeVendors={activeVendors}
        inactiveVendors={inactiveVendors}
      />

      <VendorFilters
        vendors={vendors}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
      />

      <VendorsTable
        vendors={vendors}
        loadingVendors={loadingVendors}
        onView={(vendor) => { setSelectedVendor(vendor); setShowViewModal(true); }}
        onEdit={handleOpenEditModal}
        onDelete={(vendor) => { setSelectedVendor(vendor); setShowDeleteConfirm(true); }}
        onGenerateCredentials={handleOpenCredentialsModal}
        onToggleStatus={(id) => toggleStatusMutation.mutate(id)}
      />

      <AddVendorModal 
        show={showAddForm}
        onClose={handleCloseAddModal}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleAddVendor}
        isPending={addVendorMutation.isPending}
      />

      <EditVendorModal
        show={showEditModal}
        onClose={() => { setShowEditModal(false); setSelectedVendor(null); }}
        vendor={selectedVendor}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleUpdateVendor}
        isPending={updateVendorMutation.isPending}
      />

      <ViewVendorModal
        show={showViewModal}
        onClose={() => setShowViewModal(false)}
        vendor={selectedVendor}
      />

      <DeleteVendorModal
        show={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteVendor}
        isPending={deleteVendorMutation.isPending}
        vendor={selectedVendor}
      />

      <CredentialsModal
        show={showCredentialsModal}
        onClose={() => setShowCredentialsModal(false)}
        onConfirm={sendCredentialsEmail}
        isPending={sendCredentialsMutation.isPending}
        vendor={selectedVendor}
        credentials={credentials}
        generatePassword={generatePassword}
      />
    </div>
  );
};

export default VendorManagement;
