"use client";

import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import ProductCard from '@/components/ProductCard';
import NotificationPanel from '@/components/NotificationPanel';
import { Input } from '@/components/ui/input';
import { Search, Bell, Sparkles, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

const PRODUCTS = [
  { id: '1', name: 'Premium Kadaknath Whole', price: 1200, unit: 'kg', image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=400', category: 'Whole' },
  { id: '2', name: 'Curry Cut (Skinless)', price: 1350, unit: 'kg', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400', category: 'Cuts', isSubscription: true },
  { id: '3', name: 'Kadaknath Eggs (Case)', price: 450, unit: '12 pcs', image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&q=80&w=400', category: 'Eggs' },
  { id: '4', name: 'Breast Fillets', price: 1500, unit: 'kg', image: 'https://images.unsplash.com/photo-1602491673980-73aa38de027a?auto=format&fit=crop&q=80&w=400', category: 'Cuts' },
];

const CustomerHome = () => {
  return (
    <MobileLayout role="customer">
      <div className="bg-brand-black pt-12 pb-8 px-6 rounded-b-[3rem] shadow-xl">
        <header className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Crown size={14} className="text-brand-gold" />
              <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.2em]">Premium Member</span>
            </div>
            <h1 className="text-2xl font-display font-bold text-white">Welcome back</h1>
          </div>
          <NotificationPanel>
            <button className="relative p-2.5 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md transition-all active:scale-90">
              <Bell size={20} className="text-brand-gold" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-red rounded-full border-2 border-brand-black"></span>
            </button>
          </NotificationPanel>
        </header>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <Input 
            placeholder="Search premium cuts..." 
            className="pl-11 h-12 rounded-2xl border-none bg-white/10 text-white placeholder:text-slate-500 backdrop-blur-md focus-visible:ring-brand-gold"
          />
        </div>
      </div>

      <div className="px-6 -mt-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-gold rounded-[2rem] p-6 text-brand-black relative overflow-hidden shadow-xl shadow-brand-gold/20"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-brand-black" />
              <span className="text-[10px] font-black uppercase tracking-widest">Exclusive Offer</span>
            </div>
            <h3 className="text-xl font-display font-bold mb-1">15% Off Subscriptions</h3>
            <p className="text-brand-black/70 text-xs font-medium">Fresh Kadaknath delivered weekly to your doorstep.</p>
          </div>
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-brand-black/5 rounded-full blur-2xl"></div>
        </motion.div>
      </div>

      <div className="px-6 pt-8 pb-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-display font-bold text-brand-charcoal">Featured Products</h3>
          <button className="text-brand-red text-xs font-bold uppercase tracking-widest">View All</button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default CustomerHome;