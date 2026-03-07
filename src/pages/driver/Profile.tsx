"use client";

import React, { useState } from 'react';
import MobileLayout from '@/components/MobileLayout';
import { 
  Truck, 
  Shield, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Settings,
  Power,
  ChevronRight,
  CreditCard
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { showSuccess } from '@/utils/toast';

const DriverProfile = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState('active');

  const driver = {
    name: "Suresh Kumar",
    phone: "+91 98765 00101",
    photo: "SK",
    vehicle: "Mahindra Supro",
    vehicleNum: "DL 1L AA 1234",
    license: "DL-9020230045",
    rating: 4.8
  };

  const earnings = {
    today: 1250,
    weekly: 8400,
    total: 45200
  };

  const activeDeliveries = [
    { id: 'ORD-7721', customer: 'Rahul S.', address: 'Sector 45, Gurgaon', status: 'Picked' },
  ];

  const history = [
    { id: 'ORD-7715', date: 'Oct 24, 2023', earnings: 150, status: 'Delivered' },
    { id: 'ORD-7712', date: 'Oct 24, 2023', earnings: 120, status: 'Delivered' },
    { id: 'ORD-7708', date: 'Oct 23, 2023', earnings: 180, status: 'Delivered' },
  ];

  const handleToggleAvailability = (checked: boolean) => {
    setIsOnline(checked);
    showSuccess(checked ? "You are now Online" : "You are now Offline");
  };

  return (
    <MobileLayout role="driver">
      <div className="px-6 pt-12 pb-8">
        {/* Header & Availability */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-black flex items-center justify-center text-brand-gold text-xl font-display font-bold border-2 border-brand-gold/20">
              {driver.photo}
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-brand-black">{driver.name}</h1>
              <div className="flex items-center gap-1 text-brand-gold">
                <Shield size={12} />
                <span className="text-[10px] font-black uppercase tracking-widest">Verified Driver</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className={cn(
              "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5",
              isOnline ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"
            )}>
              <div className={cn("w-1.5 h-1.5 rounded-full", isOnline ? "bg-emerald-500 animate-pulse" : "bg-slate-300")} />
              {isOnline ? "Online" : "Offline"}
            </div>
            <Switch 
              checked={isOnline} 
              onCheckedChange={handleToggleAvailability}
              className="data-[state=checked]:bg-emerald-500"
            />
          </div>
        </div>

        {/* Earnings Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: "Today", value: `₹${earnings.today}`, icon: Clock, color: "text-brand-gold" },
            { label: "Weekly", value: `₹${earnings.weekly}`, icon: TrendingUp, color: "text-blue-500" },
            { label: "Total", value: `₹${earnings.total}`, icon: CreditCard, color: "text-emerald-500" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
              <stat.icon size={14} className={cn("mb-2", stat.color)} />
              <div className="text-sm font-black text-brand-black">{stat.value}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Delivery Management */}
        <Tabs defaultValue="active" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="w-full bg-slate-100 p-1 rounded-2xl h-12">
            <TabsTrigger value="active" className="flex-1 rounded-xl font-bold text-xs data-[state=active]:bg-brand-black data-[state=active]:text-brand-gold">Assigned</TabsTrigger>
            <TabsTrigger value="history" className="flex-1 rounded-xl font-bold text-xs data-[state=active]:bg-brand-black data-[state=active]:text-brand-gold">History</TabsTrigger>
          </TabsList>
        </Tabs>

        {activeTab === 'active' ? (
          <div className="space-y-4">
            {activeDeliveries.map((delivery) => (
              <motion.div 
                key={delivery.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline" className="bg-brand-gold/10 text-brand-gold border-brand-gold/20 text-[10px] font-black uppercase">
                    {delivery.status}
                  </Badge>
                  <span className="text-[10px] font-bold text-slate-300">{delivery.id}</span>
                </div>
                <h3 className="font-bold text-brand-black mb-1">{delivery.customer}</h3>
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-6">
                  <MapPin size={14} />
                  <span>{delivery.address}</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-brand-black text-brand-gold py-3 rounded-xl text-xs font-bold">
                    Update Status
                  </button>
                  <button className="px-4 bg-brand-offwhite text-brand-charcoal py-3 rounded-xl">
                    <Phone size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
            {activeDeliveries.length === 0 && (
              <div className="text-center py-12 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                <Truck size={32} className="mx-auto text-slate-300 mb-2" />
                <p className="text-slate-400 text-sm font-medium">No active deliveries</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-black">{item.id}</h4>
                    <p className="text-[10px] text-slate-400 font-medium">{item.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-emerald-600">+₹{item.earnings}</div>
                  <div className="text-[10px] text-slate-300 font-bold uppercase">Earned</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Vehicle & License Info */}
        <div className="mt-12">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-2">Vehicle & Documents</h3>
          <div className="bg-brand-black rounded-[2rem] p-6 text-white shadow-xl shadow-brand-black/20">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-brand-gold">
                    <Truck size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Vehicle</p>
                    <p className="text-sm font-bold">{driver.vehicle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Number</p>
                  <p className="text-sm font-bold">{driver.vehicleNum}</p>
                </div>
              </div>
              <div className="h-[1px] bg-white/10" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-brand-gold">
                    <Shield size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">License</p>
                    <p className="text-sm font-bold">{driver.license}</p>
                  </div>
                </div>
                <button className="text-brand-gold text-[10px] font-black uppercase tracking-widest">View</button>
              </div>
            </div>
          </div>
        </div>

        {/* Settings & Logout */}
        <div className="mt-8 space-y-3">
          <button className="w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-brand-offwhite rounded-xl flex items-center justify-center text-brand-charcoal group-hover:bg-brand-black group-hover:text-brand-gold transition-colors">
                <Settings size={20} />
              </div>
              <span className="text-sm font-bold text-brand-black">Profile Settings</span>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </button>
          <button className="w-full py-4 flex items-center justify-center gap-2 text-brand-red font-bold text-sm border-2 border-brand-red/10 rounded-2xl hover:bg-brand-red/5 transition-colors">
            <Power size={18} />
            Sign Out
          </button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default DriverProfile;