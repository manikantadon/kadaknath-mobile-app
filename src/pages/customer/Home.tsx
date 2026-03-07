"use client";

import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import ProductCard from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Search, Bell, Sparkles } from 'lucide-react';
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
      <div className="px-6 pt-8 pb-4">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-slate-400 text-sm font-medium">Welcome back,</h2>
            <h1 className="text-2xl font-black text-slate-900">Premium Member</h1>
          </div>
          <button className="relative p-2 bg-white rounded-2xl shadow-sm border border-slate-100">
            <Bell size={24} className="text-slate-600" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </header>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <Input 
            placeholder="Search products, recipes..." 
            className="pl-12 h-14 rounded-2xl border-none bg-white shadow-sm text-base"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 text-white mb-8 relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={18} className="text-indigo-200" />
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-100">Loyalty Reward</span>
            </div>
            <h3 className="text-xl font-bold mb-1">Get 15% Off Subscriptions</h3>
            <p className="text-indigo-100 text-sm opacity-90">Fresh Kadaknath delivered weekly to your doorstep.</p>
          </div>
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        </motion.div>

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-900">Featured Products</h3>
          <button className="text-indigo-600 text-sm font-bold">View All</button>
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