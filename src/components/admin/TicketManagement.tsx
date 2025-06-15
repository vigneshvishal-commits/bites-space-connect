import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Edit, CheckCircle, XCircle, AlertTriangle, Clock, User, MessageSquare, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import axiosInstance from '@/api/axiosInstance';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const TicketManagement = () => {
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [vendorFilter, setVendorFilter] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);
  const [isVendorPopoverOpen, setIsVendorPopoverOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const { toast } = useToast()
  const queryClient = useQueryClient();

  // Fetch tickets
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ['tickets'],
    queryFn: async () => (await axiosInstance.get('/api/admin/tickets')).data
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, newStatus }) =>
      (await axiosInstance.put(`/api/admin/tickets/${id}/status`, null, { params: { newStatus } })).data,
    onSuccess: () => queryClient.invalidateQueries(['tickets'])
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) =>
      (await axiosInstance.delete(`/api/admin/tickets/${id}`)),
    onSuccess: () => queryClient.invalidateQueries(['tickets'])
  });

  const handleStatusUpdate = (ticketId: string, newStatus: string) => {
    updateStatusMutation.mutate({ id: ticketId, newStatus });
    setShowEditModal(false);
    toast({
      title: "Status Updated",
      description: "Ticket status updated successfully.",
    })
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const filteredTickets = tickets?.filter(ticket => {
    const searchRegex = new RegExp(searchQuery, 'i');
    const matchesSearch = searchRegex.test(ticket.title) || searchRegex.test(ticket.description);
    const matchesStatus = !statusFilter || ticket.status === statusFilter;
    const matchesDate = !dateFilter || formatDate(dateFilter) === formatDate(new Date(ticket.createdAt));
    const matchesVendor = !vendorFilter || ticket.vendor === vendorFilter;

    return matchesSearch && matchesStatus && matchesDate && matchesVendor;
  });

  const statusOptions = [
    { value: 'open', label: 'Open' },
    { value: 'pending', label: 'Pending' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' },
  ];

  const vendorOptions = [...new Set(tickets.map(ticket => ticket.vendor))].map(vendor => ({
    value: vendor,
    label: vendor,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Ticket Management</h1>
          <p className="text-gray-600">Manage and resolve customer support tickets</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="text"
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Status Filter */}
            <select
              className="p-2 border rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            {/* Date Filter */}
            <Popover open={isDatePopoverOpen} onOpenChange={setIsDatePopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !dateFilter && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFilter ? (
                    format(dateFilter, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateFilter}
                  onSelect={setDateFilter}
                  onDayClick={() => setIsDatePopoverOpen(false)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {/* Vendor Filter */}
            <Popover open={isVendorPopoverOpen} onOpenChange={setIsVendorPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={isVendorPopoverOpen}
                  className="w-full justify-between"
                >
                  {vendorFilter
                    ? vendorOptions.find((option) => option.value === vendorFilter)?.label
                    : "Select vendor..."}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandList>
                    <CommandInput placeholder="Search vendor..." />
                    <CommandEmpty>No vendor found.</CommandEmpty>
                    <CommandGroup>
                      {vendorOptions.map((vendor) => (
                        <CommandItem
                          key={vendor.value}
                          value={vendor.value}
                          onSelect={() => {
                            setVendorFilter(vendor.value);
                            setIsVendorPopoverOpen(false);
                          }}
                        >
                          {vendor.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Tickets ({filteredTickets?.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Title</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Priority</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Vendor</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets?.map((ticket) => (
                  <motion.tr
                    key={ticket.id}
                    className="border-b hover:bg-gray-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <td className="p-4 font-medium">{ticket.title}</td>
                    <td className="p-4">
                      <Badge variant={
                        ticket.status === 'open' ? 'outline' :
                          ticket.status === 'pending' ? 'secondary' :
                            ticket.status === 'resolved' ? 'default' :
                              'destructive'
                      }>
                        {ticket.status}
                      </Badge>
                    </td>
                    <td className="p-4">{ticket.priority}</td>
                    <td className="p-4">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">{ticket.vendor}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setShowViewModal(true);
                          }}
                          title="View Details"
                          className="hover:bg-blue-50"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setNewStatus(ticket.status);
                            setShowEditModal(true);
                          }}
                          title="Edit Ticket"
                          className="hover:bg-yellow-50"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && selectedTicket && (
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
              <h2 className="text-xl font-semibold mb-4">Ticket Details</h2>
              <div className="space-y-3">
                <div><strong>Title:</strong> {selectedTicket.title}</div>
                <div><strong>Description:</strong> {selectedTicket.description}</div>
                <div><strong>Status:</strong>
                  <Badge variant={
                    selectedTicket.status === 'open' ? 'outline' :
                      selectedTicket.status === 'pending' ? 'secondary' :
                        selectedTicket.status === 'resolved' ? 'default' :
                          'destructive'
                  }>
                    {selectedTicket.status}
                  </Badge>
                </div>
                <div><strong>Priority:</strong> {selectedTicket.priority}</div>
                <div><strong>Date:</strong> {new Date(selectedTicket.createdAt).toLocaleDateString()}</div>
                <div><strong>Vendor:</strong> {selectedTicket.vendor}</div>
              </div>
              <Button
                onClick={() => setShowViewModal(false)}
                className="w-full mt-4"
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Status Modal */}
      <AnimatePresence>
        {showEditModal && selectedTicket && (
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
              <h2 className="text-xl font-semibold mb-4">Edit Ticket Status</h2>
              <div className="space-y-4">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  className="w-full p-2 border rounded-md"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="open">Open</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div className="flex space-x-4 mt-6">
                <Button variant="outline" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button onClick={() => handleStatusUpdate(selectedTicket.id, newStatus)}>
                  Update Status
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TicketManagement;
