"use client";

import React, { useState } from 'react';
import MobileLayout from '@/components/MobileLayout';
import { Package, Truck, CheckCircle2, Clock, ChevronRight, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ACTIVE_ORDER = {
  id: 'ORD-9921',
  status: 'processing',
  items: 'Premium Kadaknath Whole (1.2kg)',
  total: 1440,
  steps: [
    { label: 'Ordered', icon: Clock, completed: true },
    { label: 'Processing', icon: Package, completed: true, current: true },
    { label: 'On the Way', icon: Truck, completed: false },
    { label: 'Delivered', icon: CheckCircle2, completed: false },
  ]
};

const PAST_ORDERS = [
  { id: 'ORD-8812', date: 'Oct 12, 2023', items: 'Curry Cut, 12 Eggs', total: 1800, status: 'delivered' },
  { id: 'ORD-8705', date: 'Sep 28, 2023', items: 'Breast Fillets (2kg)', total: 3000, status: 'delivered' },
];

const CustomerOrders = () => {
  const [activeTab, setActiveTab] = useState('active');

  return (
    <MobileLayout role="customer">
      <div className="px-6 pt-8">
        <h1 className="text-2xl font-display font-bold text-brand-black mb-2">My Orders</h1>
        <p className="text-slate-500 text-sm mb-8">Track your premium poultry deliveries.</p>

        <Tabs defaultValue="active" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="w-full bg-slate-100 p-1 rounded-2xl h-12">
            <TabsTrigger value="active" className="flex-1 rounded-xl font-bold text-xs data-[state=active]:bg-brand-black data-[state=active]:text-brand-gold">Active</TabsTrigger>
            <TabsTrigger value="past" className="flex-1 rounded-xl font-bold text-xs data-[state=active]:bg-brand-black data-[state=active]:text-brand-gold">History</TabsTrigger>
          </TabsList>
        </Tabs>

        {activeTab === 'active' ? (
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-black text-brand-gold uppercase tracking-widest">Order ID</span>
                  <h3 className="text-lg font-bold text-brand-black">{ACTIVE_ORDER.id}</h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</span>
                  <div className="text-lg font-black text-brand-black">₹{ACTIVE_ORDER.total}</div>
                </div>
              </div>

              <div className="bg-brand-offwhite rounded-2xl p-4 mb-8">
                <p className="text-xs font-medium text-brand-charcoal">{ACTIVE_ORDER.items}</p>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100"></div>
                <div className="space-y-8">
                  {ACTIVE_ORDER.steps.map((step, idx) => (
                    <div key={step.label} className="flex items-center gap-4 relative">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors duration-500",
                        step.completed ? "bg-brand-black text-brand-gold" : "bg-slate-100 text-slate-300",
                        step.current && "ring-4 ring-brand-gold/20"
                      )}>
                        <step.icon size={16} />
                      </div>
                      <div>
                        <p className={cn(
                          "text-sm font-bold",
                          step.completed ? "text-brand-black" : "text-slate-300"
                        )}>{step.label}</p>
                        {step.current && <p className="text-[10px] text-brand-gold font-black uppercase tracking-wider">In Progress</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="space-y-4">
            {PAST_ORDERS.map((order) => (
              <motion.div 
                key={order.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-offwhite rounded-2xl flex items-center justify-center text-brand-black">
                    <CheckCircle2 size={24} className="text-emerald-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-brand-black">{order.id}</h4>
                      <span className="text-[10px] text-slate-400 font-medium">{order.date}</span>
                    </div>
                    <p className="text-xs text-slate-500">{order.items}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-brand-black mb-2">₹{order.total}</div>
                  <button className="flex items-center gap-1 text-brand-gold text-[10px] font-black uppercase tracking-widest">
                    <RotateCcw size={12} />
                    Reorder
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default CustomerOrders;