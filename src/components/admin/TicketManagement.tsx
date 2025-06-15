import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Flag, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const TicketManagement = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOutlet, setSelectedOutlet] = useState('All Vendors');
  const [selectedDate, setSelectedDate] = useState('all');
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Mock ticket data
  const [tickets, setTickets] = useState([
    {
      id: "TKT001",
      subject: "Food quality issue",
      description: "The food was cold when delivered and the taste was not up to the mark. I ordered chicken biryani but received a cold portion.",
      customerName: "John Doe",
      customerContact: "+91 9876543210",
      vendorName: "Spice Paradise",
      priority: "high",
      status: "open",
      timestamp: "2024-01-15 10:30:00",
      category: "Quality"
    },
    {
      id: "TKT002",
      subject: "Late delivery",
      description: "Order was delivered 45 minutes late. I had to wait and it affected my lunch break schedule.",
      customerName: "Sarah Smith",
      customerContact: "+91 9876543211",
      vendorName: "Fast Corner",
      priority: "medium",
      status: "in-progress",
      timestamp: "2024-01-14 14:15:00",
      category: "Delivery"
    },
    {
      id: "TKT003",
      subject: "Wrong order received",
      description: "I ordered a vegetarian burger but received a chicken burger instead. This is against my dietary preferences.",
      customerName: "Mike Johnson",
      customerContact: "+91 9876543212",
      vendorName: "Healthy Bites",
      priority: "low",
      status: "resolved",
      timestamp: "2024-01-13 12:45:00",
      category: "Order"
    },
    {
      id: "TKT004",
      subject: "Unhygienic food packaging",
      description: "The food container was dirty and there were spots on the packaging. Food safety is a concern.",
      customerName: "Emily Davis",
      customerContact: "+91 9876543213",
      vendorName: "Cafe Delight",
      priority: "high",
      status: "open",
      timestamp: "2024-01-16 09:20:00",
      category: "Hygiene"
    },
    {
      id: "TKT005",
      subject: "Overcharged amount",
      description: "I was charged ₹250 for an item that costs ₹180 according to the menu. Please check the billing.",
      customerName: "Robert Wilson",
      customerContact: "+91 9876543214",
      vendorName: "Snack Hub",
      priority: "medium",
      status: "in-progress",
      timestamp: "2024-01-15 16:00:00",
      category: "Billing"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'destructive';
      case 'in-progress': return 'default';
      case 'resolved': return 'secondary';
      default: return 'default';
    }
  };

  const updateTicketStatus = (ticketId: string, newStatus: string) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
    ));
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = selectedStatus === 'all' || ticket.status === selectedStatus;
    const matchesOutlet = selectedOutlet === 'All Vendors' || ticket.vendorName === selectedOutlet;
    
    let matchesDate = true;
    if (selectedDate !== 'all') {
      const ticketDate = new Date(ticket.timestamp);
      const today = new Date();
      
      switch (selectedDate) {
        case 'today':
          matchesDate = ticketDate.toDateString() === today.toDateString();
          break;
        case 'week':
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = ticketDate >= weekAgo;
          break;
        case 'month':
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = ticketDate >= monthAgo;
          break;
      }
    }
    
    return matchesStatus && matchesOutlet && matchesDate;
  });

  const getTicketCounts = () => {
    return {
      total: filteredTickets.length,
      open: filteredTickets.filter(t => t.status === 'open').length,
      inProgress: filteredTickets.filter(t => t.status === 'in-progress').length,
      resolved: filteredTickets.filter(t => t.status === 'resolved').length
    };
  };

  const counts = getTicketCounts();

  const outlets = ['All Vendors', 'Spice Paradise', 'Fast Corner', 'Healthy Bites', 'Cafe Delight', 'Snack Hub', 'Green Bowl', 'Pizza Point', 'Tea Time'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Ticket Management</h1>
        <p className="text-gray-600">Handle customer complaints and support requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Tickets</p>
                  <p className="text-2xl font-bold text-gray-800">{counts.total}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Open Tickets</p>
                  <p className="text-2xl font-bold text-red-600">{counts.open}</p>
                </div>
                <Flag className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-yellow-600">{counts.inProgress}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">{counts.resolved}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select 
              className="p-2 border rounded-md"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            
            <select 
              className="p-2 border rounded-md"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            
            <select 
              className="p-2 border rounded-md"
              value={selectedOutlet}
              onChange={(e) => setSelectedOutlet(e.target.value)}
            >
              {outlets.map(outlet => (
                <option key={outlet} value={outlet}>{outlet}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Tickets ({filteredTickets.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Ticket ID</th>
                  <th className="text-left p-4">Subject</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Vendor</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Timestamp</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => (
                  <motion.tr
                    key={ticket.id}
                    className="border-b hover:bg-gray-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <td className="p-4 font-medium">{ticket.id}</td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{ticket.subject}</p>
                        <p className="text-sm text-gray-600 truncate max-w-xs">{ticket.description}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{ticket.customerName}</p>
                        <p className="text-sm text-gray-600">{ticket.customerContact}</p>
                      </div>
                    </td>
                    <td className="p-4">{ticket.vendorName}</td>
                    <td className="p-4">
                      <Badge variant={getStatusColor(ticket.status)} className={ticket.status === 'resolved' ? 'bg-green-600' : ''}>
                        {ticket.status.replace('-', ' ')}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-sm">{new Date(ticket.timestamp).toLocaleDateString()}</p>
                        <p className="text-xs text-gray-600">{new Date(ticket.timestamp).toLocaleTimeString()}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedTicket(ticket);
                          setShowTicketModal(true);
                        }}
                        title="View Details"
                        className="hover:bg-blue-50"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Ticket Detail Modal */}
      <AnimatePresence>
        {showTicketModal && selectedTicket && (
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
              className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-semibold">Ticket Details</h2>
                <Badge variant={getStatusColor(selectedTicket.status)} className={selectedTicket.status === 'resolved' ? 'bg-green-600' : ''}>
                  {selectedTicket.status.replace('-', ' ')}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Ticket Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Ticket ID:</strong> {selectedTicket.id}</p>
                      <p><strong>Subject:</strong> {selectedTicket.subject}</p>
                      <p><strong>Category:</strong> {selectedTicket.category}</p>
                      <p><strong>Vendor:</strong> {selectedTicket.vendorName}</p>
                      <p><strong>Timestamp:</strong> {new Date(selectedTicket.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Customer Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Name:</strong> {selectedTicket.customerName}</p>
                      <p><strong>Contact:</strong> {selectedTicket.customerContact}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedTicket.description}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Update Status</h3>
                <div className="flex space-x-3">
                  <Button
                    variant={selectedTicket.status === 'open' ? 'default' : 'outline'}
                    onClick={() => {
                      updateTicketStatus(selectedTicket.id, 'open');
                      setSelectedTicket({...selectedTicket, status: 'open'});
                    }}
                    className="flex-1"
                  >
                    Open
                  </Button>
                  <Button
                    variant={selectedTicket.status === 'in-progress' ? 'default' : 'outline'}
                    onClick={() => {
                      updateTicketStatus(selectedTicket.id, 'in-progress');
                      setSelectedTicket({...selectedTicket, status: 'in-progress'});
                    }}
                    className="flex-1"
                  >
                    In Progress
                  </Button>
                  <Button
                    variant={selectedTicket.status === 'resolved' ? 'default' : 'outline'}
                    onClick={() => {
                      updateTicketStatus(selectedTicket.id, 'resolved');
                      setSelectedTicket({...selectedTicket, status: 'resolved'});
                    }}
                    className="flex-1"
                  >
                    Resolved
                  </Button>
                </div>
              </div>
              
              <Button
                onClick={() => setShowTicketModal(false)}
                className="w-full"
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TicketManagement;
