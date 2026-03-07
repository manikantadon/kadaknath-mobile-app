"use client";

import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import ProductCard from '@/components/ProductCard';
import NotificationPanel from '@/components/NotificationPanel';
import { Input } from '@/components/ui/input';
import { Search, Bell, Sparkles, Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNotifications } from '@/context/NotificationContext';
import { PRODUCTS } from '@/lib/products';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  { name: 'Whole', icon: '🍗', color: 'bg-orange-50' },
  { name: 'Cuts', icon: '🔪', color: 'bg-blue-50' },
  { name: 'Eggs', icon: '🥚', color: 'bg-yellow-50' },
  { name: 'Gifts', icon: '🎁', color: 'bg-pink-50' },
];

const CustomerHome = () => {
  const { unreadCount, addNotification } = useNotifications();
  const navigate = useNavigate();

  const triggerTestNotification = () => {
    addNotification({
      title: 'Special Offer! 🍗',
      description: 'Get 20% off on your next Kadaknath Whole purchase. Valid for 24 hours.',
      type: 'offer'
    });
  };

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
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-red text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-brand-black">
                  {unreadCount}
                </span>
              )}
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
          onClick={triggerTestNotification}
          className="bg-brand-gold rounded-[2rem] p-6 text-brand-black relative overflow-hidden shadow-xl shadow-brand-gold/20 cursor-pointer active:scale-95 transition-transform"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-brand-black" />
              <span className="text-[10px] font-black uppercase tracking-widest">Exclusive Offer</span>
            </div>
            <h3 className="text-xl font-display font-bold mb-1">15% Off Subscriptions</h3>
            <p className="text-brand-black/70 text-xs font-medium">Tap to test a real notification alert.</p>
          </div>
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-brand-black/5 rounded-full blur-2xl"></div>
        </motion.div>
      </div>

      <div className="px-6 pt-8">
        <h3 className="text-lg font-display font-bold text-brand-charcoal mb-4">Categories</h3>
        <div className="grid grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.name}
              onClick={() => navigate('/customer/products', { state: { category: cat.name } })}
              className="flex flex-col items-center gap-2 group active:scale-95 transition-transform"
            >
              <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:shadow-md transition-all`}>
                {cat.icon}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pt-8 pb-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-display font-bold text-brand-charcoal">Featured Products</h3>
          <button 
            onClick={() => navigate('/customer/products')}
            className="text-brand-red text-xs font-bold uppercase tracking-widest active:scale-95 transition-transform"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {PRODUCTS.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default CustomerHome;