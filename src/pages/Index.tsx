"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-200 rotate-12">
            <Sparkles className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Kadaknath Pro</h1>
          <p className="text-slate-500 font-medium">Premium Poultry Ecosystem</p>
        </div>

        <div className="space-y-4">
          <Link to="/customer">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6 group"
            >
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <ShoppingBag size={28} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Customer App</h3>
                <p className="text-slate-400 text-sm">Browse, Order & Trace</p>
              </div>
            </motion.div>
          </Link>

          <Link to="/admin">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6 group"
            >
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Admin Panel</h3>
                <p className="text-slate-400 text-sm">Inventory & Operations</p>
              </div>
            </motion.div>
          </Link>

          <Link to="/driver">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6 group"
            >
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Truck size={28} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Driver App</h3>
                <p className="text-slate-400 text-sm">Deliveries & Verification</p>
              </div>
            </motion.div>
          </Link>
        </div>

        <p className="text-center mt-12 text-slate-400 text-xs font-medium uppercase tracking-widest">
          Powered by Kadaknath Trace™
        </p>
      </div>
    </div>
  );
};

export default Index;