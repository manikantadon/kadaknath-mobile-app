"use client";

import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import { QrCode, MapPin, Calendar, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Traceability = () => {
  return (
    <MobileLayout role="customer">
      <div className="px-6 pt-8">
        <h1 className="text-2xl font-black text-slate-900 mb-2">Traceability</h1>
        <p className="text-slate-500 text-sm mb-8">Scan your product QR code to see its journey from farm to table.</p>

        <div className="bg-white rounded-3xl p-8 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center mb-8">
          <div className="w-48 h-48 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
            <QrCode size={80} className="text-slate-300" />
          </div>
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-200">
            Scan QR Code
          </button>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Batch Info</h3>
        <div className="space-y-4">
          {[
            { id: 'B-9021', farm: 'Green Valley Farm', date: 'Oct 24, 2023', status: 'Verified' },
            { id: 'B-8842', farm: 'Highland Poultry', date: 'Oct 20, 2023', status: 'Verified' },
          ].map((batch) => (
            <motion.div 
              key={batch.id}
              whileTap={{ scale: 0.98 }}
              className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Batch #{batch.id}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {batch.farm}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {batch.date}</span>
                  </div>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Traceability;