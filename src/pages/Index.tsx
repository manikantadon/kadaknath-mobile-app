"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Truck, Sparkles, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <div className="min-h-screen bg-brand-offwhite flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ rotate: 0, scale: 0.8 }}
            animate={{ rotate: 12, scale: 1 }}
            className="w-24 h-24 bg-brand-black rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-brand-black/20 border-2 border-brand-gold/30"
          >
            <Crown className="text-brand-gold" size={48} />
          </motion.div>
          <h1 className="text-4xl font-display font-bold text-brand-black mb-2 tracking-tight">Kadaknath Pro</h1>
          <div className="flex items-center justify-center gap-2">
            <div className="h-[1px] w-8 bg-brand-gold"></div>
            <p className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.3em]">Premium Poultry Ecosystem</p>
            <div className="h-[1px] w-8 bg-brand-gold"></div>
          </div>
        </div>

        <div className="space-y-4">
          <Link to="/customer">
            <motion.div 
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6 group transition-all"
            >
              <div className="w-14 h-14 bg-brand-offwhite rounded-2xl flex items-center justify-center text-brand-black group-hover:bg-brand-black group-hover:text-brand-gold transition-colors">
                <ShoppingBag size={28} />
              </div>
              <div>
                <h3 className="font-display font-bold text-brand-charcoal text-lg">Customer App</h3>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Browse, Order & Trace</p>
              </div>
            </motion.div>
          </Link>

          <Link to="/admin">
            <motion.div 
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6 group transition-all"
            >
              <div className="w-14 h-14 bg-brand-offwhite rounded-2xl flex items-center justify-center text-brand-black group-hover:bg-brand-black group-hover:text-brand-gold transition-colors">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h3 className="font-display font-bold text-brand-charcoal text-lg">Admin Panel</h3>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Inventory & Operations</p>
              </div>
            </motion.div>
          </Link>

          <Link to="/driver">
            <motion.div 
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6 group transition-all"
            >
              <div className="w-14 h-14 bg-brand-offwhite rounded-2xl flex items-center justify-center text-brand-black group-hover:bg-brand-black group-hover:text-brand-gold transition-colors">
                <Truck size={28} />
              </div>
              <div>
                <h3 className="font-display font-bold text-brand-charcoal text-lg">Driver App</h3>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Deliveries & Verification</p>
              </div>
            </motion.div>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">
            Powered by Kadaknath Trace™
          </p>
          <div className="flex justify-center gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-gold"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-black"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-red"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;