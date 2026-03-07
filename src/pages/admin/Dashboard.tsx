"use client";

import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import { Package, TrendingUp, Users, AlertCircle, CheckCircle2, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { showSuccess } from '@/utils/toast';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Active Orders', value: '24', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Revenue Today', value: '₹18.4k', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'New Customers', value: '12', icon: Users, color: 'text-violet-600', bg: 'bg-violet-50' },
  ];

  const handleLogout = () => {
    showSuccess('Logged out successfully');
    navigate('/');
  };

  return (
    <MobileLayout role="admin">
      <div className="px-6 pt-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Operations</h1>
            <p className="text-slate-500 text-sm">Real-time inventory & orders</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold">
              AD
            </div>
            <button 
              onClick={handleLogout}
              className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-brand-red hover:bg-brand-red/5 transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-2", stat.bg)}>
                <stat.icon size={18} className={stat.color} />
              </div>
              <div className="text-lg font-black text-slate-900">{stat.value}</div>
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900">Inventory Alerts</h3>
            <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-lg">3 Critical</span>
          </div>
          <div className="space-y-4">
            {[
              { item: 'Kadaknath Eggs', stock: '12 units', status: 'Low Stock' },
              { item: 'Whole Chicken', stock: '45 kg', status: 'Healthy' },
            ].map((item) => (
              <div key={item.item} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div>
                  <div className="font-bold text-slate-800 text-sm">{item.item}</div>
                  <div className="text-xs text-slate-400">{item.stock} remaining</div>
                </div>
                {item.status === 'Low Stock' ? (
                  <AlertCircle size={18} className="text-amber-500" />
                ) : (
                  <CheckCircle2 size={18} className="text-emerald-500" />
                )}
              </div>
            ))}
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-4">Pending Assignments</h3>
        <div className="space-y-4">
          {[
            { id: 'ORD-7721', customer: 'Rahul S.', items: '2.5kg Curry Cut', time: '10 mins ago' },
            { id: 'ORD-7722', customer: 'Anita M.', items: '12 Eggs, 1kg Whole', time: '25 mins ago' },
          ].map((order) => (
            <motion.div 
              key={order.id}
              className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-xs font-bold text-indigo-600 mb-1">{order.id}</div>
                  <div className="font-bold text-slate-900">{order.customer}</div>
                </div>
                <div className="text-[10px] text-slate-400 font-medium">{order.time}</div>
              </div>
              <div className="text-sm text-slate-500 mb-4">{order.items}</div>
              <div className="flex gap-2">
                <button className="flex-1 bg-slate-900 text-white py-2 rounded-xl text-xs font-bold">Assign Driver</button>
                <button className="px-4 bg-slate-50 text-slate-600 py-2 rounded-xl text-xs font-bold border border-slate-100">Details</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default AdminDashboard;