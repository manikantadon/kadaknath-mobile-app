"use client";

import React, { useState } from 'react';
import MobileLayout from '@/components/MobileLayout';
import { Search, Filter, ChevronRight, Clock, CheckCircle2, Truck, AlertCircle, LogOut } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { showSuccess } from '@/utils/toast';

const ORDERS = [
  { id: 'ORD-7721', customer: 'Rahul S.', items: '2.5kg Curry Cut', total: 3375, status: 'pending', time: '10 mins ago', address: 'Sector 45, Gurgaon' },
  { id: 'ORD-7722', customer: 'Anita M.', items: '12 Eggs, 1kg Whole', total: 1650, status: 'assigned', time: '25 mins ago', driver: 'Suresh Kumar' },
  { id: 'ORD-7723', customer: 'Vikram J.', items: '2kg Breast Fillets', total: 3000, status: 'delivered', time: '2 hours ago', driver: 'Amit Singh' },
  { id: 'ORD-7724', customer: 'Sneha P.', items: '1kg Whole Chicken', total: 1200, status: 'pending', time: '45 mins ago', address: 'DLF Phase 5' },
];

const AdminOrders = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const filteredOrders = ORDERS.filter(order => 
    activeTab === 'all' ? true : order.status === activeTab
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={14} className="text-amber-500" />;
      case 'assigned': return <Truck size={14} className="text-blue-500" />;
      case 'delivered': return <CheckCircle2 size={14} className="text-emerald-500" />;
      default: return <AlertCircle size={14} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'assigned': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  const handleLogout = () => {
    showSuccess('Logged out successfully');
    navigate('/');
  };

  return (
    <MobileLayout role="admin">
      <div className="px-6 pt-8">
        <header className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-slate-900 mb-1">Order Management</h1>
            <p className="text-slate-500 text-sm">Track and assign customer orders</p>
          </div>
          <button 
            onClick={handleLogout}
            className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-brand-red hover:bg-brand-red/5 transition-colors"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </header>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Search by Order ID or Customer..." 
            className="pl-11 h-12 rounded-2xl border-slate-200 bg-white shadow-sm"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-600">
            <Filter size={18} />
          </button>
        </div>

        <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="w-full bg-slate-100 p-1 rounded-xl h-12">
            <TabsTrigger value="all" className="flex-1 rounded-lg font-bold text-xs">All</TabsTrigger>
            <TabsTrigger value="pending" className="flex-1 rounded-lg font-bold text-xs">Pending</TabsTrigger>
            <TabsTrigger value="assigned" className="flex-1 rounded-lg font-bold text-xs">Active</TabsTrigger>
            <TabsTrigger value="delivered" className="flex-1 rounded-lg font-bold text-xs">Done</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black text-indigo-600 tracking-wider">{order.id}</span>
                    <Badge variant="outline" className={cn("text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border", getStatusColor(order.status))}>
                      <span className="mr-1">{getStatusIcon(order.status)}</span>
                      {order.status}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-slate-900">{order.customer}</h3>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-slate-900">₹{order.total}</div>
                  <div className="text-[10px] text-slate-400 font-medium">{order.time}</div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-3 mb-4">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Items</div>
                <div className="text-xs font-medium text-slate-700">{order.items}</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {order.driver ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-[10px] font-bold text-indigo-600">
                        {order.driver.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs text-slate-500 font-medium">{order.driver}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic">No driver assigned</span>
                  )}
                </div>
                <button className="flex items-center gap-1 text-indigo-600 text-xs font-bold">
                  {order.status === 'pending' ? 'Assign Now' : 'View Details'}
                  <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-slate-300" />
              </div>
              <p className="text-slate-400 font-medium">No orders found in this category</p>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default AdminOrders;