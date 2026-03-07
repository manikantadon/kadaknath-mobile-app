"use client";

import React, { useState } from 'react';
import MobileLayout from '@/components/MobileLayout';
import { MapPin, Phone, CheckCircle, Navigation, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { showSuccess } from '@/utils/toast';

const DriverDeliveries = () => {
  const [showOtp, setShowOtp] = useState<string | null>(null);

  const deliveries = [
    { id: 'ORD-7721', customer: 'Rahul S.', address: 'Sector 45, Gurgaon', phone: '+91 98765 43210', items: '2.5kg Curry Cut' },
    { id: 'ORD-7718', customer: 'Priya K.', address: 'DLF Phase 3, Gurgaon', phone: '+91 99887 76655', items: '1kg Whole Chicken' },
  ];

  return (
    <MobileLayout role="driver">
      <div className="px-6 pt-8">
        <h1 className="text-2xl font-black text-slate-900 mb-2">My Deliveries</h1>
        <p className="text-slate-500 text-sm mb-8">You have {deliveries.length} pending deliveries today.</p>

        <div className="space-y-6">
          {deliveries.map((delivery) => (
            <motion.div 
              key={delivery.id}
              layout
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider">
                  {delivery.id}
                </span>
                <button className="text-slate-400"><Navigation size={20} /></button>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1">{delivery.customer}</h3>
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                <MapPin size={14} />
                <span>{delivery.address}</span>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 mb-6">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Order Items</div>
                <div className="text-sm font-medium text-slate-700">{delivery.items}</div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-slate-100 text-slate-600 h-12 rounded-2xl flex items-center justify-center gap-2 font-bold">
                  <Phone size={18} />
                  Call
                </button>
                <button 
                  onClick={() => setShowOtp(delivery.id)}
                  className="flex-[2] bg-indigo-600 text-white h-12 rounded-2xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-indigo-100"
                >
                  <CheckCircle size={18} />
                  Complete
                </button>
              </div>

              <AnimatePresence>
                {showOtp === delivery.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 mt-6 border-t border-slate-100">
                      <div className="flex items-center gap-2 mb-3 text-indigo-600">
                        <Key size={16} />
                        <span className="text-sm font-bold">Enter Delivery OTP</span>
                      </div>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="0 0 0 0" 
                          className="h-12 text-center text-xl font-black tracking-[1em] rounded-xl border-slate-200"
                          maxLength={4}
                        />
                        <button 
                          onClick={() => {
                            showSuccess('Delivery verified successfully!');
                            setShowOtp(null);
                          }}
                          className="bg-slate-900 text-white px-6 rounded-xl font-bold"
                        >
                          Verify
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default DriverDeliveries;