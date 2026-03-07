"use client";

import React, { useState } from 'react';
import MobileLayout from '@/components/MobileLayout';
import { Search, UserPlus, Phone, Mail, Star, Shield, Truck, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const STAFF = [
  { id: 'S-101', name: 'Suresh Kumar', role: 'driver', status: 'active', rating: 4.8, deliveries: 142, phone: '+91 98765 00101' },
  { id: 'S-102', name: 'Amit Singh', role: 'driver', status: 'active', rating: 4.9, deliveries: 89, phone: '+91 98765 00102' },
  { id: 'S-103', name: 'Meera J.', role: 'inventory', status: 'active', rating: 4.7, tasks: 24, phone: '+91 98765 00103' },
  { id: 'S-104', name: 'Rajesh V.', role: 'driver', status: 'offline', rating: 4.5, deliveries: 210, phone: '+91 98765 00104' },
];

const AdminStaff = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredStaff = STAFF.filter(member => 
    activeTab === 'all' ? true : member.role === activeTab
  );

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'driver': return <Truck size={14} />;
      case 'inventory': return <Shield size={14} />;
      default: return <Shield size={14} />;
    }
  };

  return (
    <MobileLayout role="admin">
      <div className="px-6 pt-8">
        <header className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 mb-1">Staff Directory</h1>
            <p className="text-slate-500 text-sm">Manage your operations team</p>
          </div>
          <button className="bg-indigo-600 text-white p-3 rounded-2xl shadow-lg shadow-indigo-100">
            <UserPlus size={20} />
          </button>
        </header>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Search by name or ID..." 
            className="pl-11 h-12 rounded-2xl border-slate-200 bg-white shadow-sm"
          />
        </div>

        <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="w-full bg-slate-100 p-1 rounded-xl h-12">
            <TabsTrigger value="all" className="flex-1 rounded-lg font-bold text-xs">All</TabsTrigger>
            <TabsTrigger value="driver" className="flex-1 rounded-lg font-bold text-xs">Drivers</TabsTrigger>
            <TabsTrigger value="inventory" className="flex-1 rounded-lg font-bold text-xs">Inventory</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          {filteredStaff.map((member) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 font-bold text-xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className={cn(
                      "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white",
                      member.status === 'active' ? "bg-emerald-500" : "bg-slate-300"
                    )} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{member.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-slate-50 text-slate-500 border-none flex gap-1 items-center">
                        {getRoleIcon(member.role)}
                        {member.role}
                      </Badge>
                      <span className="text-[10px] text-slate-400 font-medium">{member.id}</span>
                    </div>
                  </div>
                </div>
                <button className="text-slate-300"><MoreVertical size={20} /></button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-50 rounded-2xl p-3">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Performance</div>
                  <div className="flex items-center gap-1 text-sm font-black text-slate-900">
                    <Star size={14} className="text-amber-500 fill-amber-500" />
                    {member.rating}
                  </div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-3">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                    {member.role === 'driver' ? 'Deliveries' : 'Tasks'}
                  </div>
                  <div className="text-sm font-black text-slate-900">
                    {member.role === 'driver' ? member.deliveries : member.tasks}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-slate-900 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                  <Phone size={14} />
                  Call
                </button>
                <button className="flex-1 bg-slate-50 text-slate-600 py-2.5 rounded-xl text-xs font-bold border border-slate-100 flex items-center justify-center gap-2">
                  <Mail size={14} />
                  Message
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default AdminStaff;