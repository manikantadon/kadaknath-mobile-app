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
import { useState, useMemo, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { name: 'Whole', icon: '🍗', color: 'bg-orange-50', darkColor: 'dark:bg-orange-950/30' },
  { name: 'Cuts', icon: '🔪', color: 'bg-blue-50', darkColor: 'dark:bg-blue-950/30' },
  { name: 'Eggs', icon: '🥚', color: 'bg-yellow-50', darkColor: 'dark:bg-yellow-950/30' },
  { name: 'Gifts', icon: '🎁', color: 'bg-pink-50', darkColor: 'dark:bg-pink-950/30' },
];

const CustomerHome = () => {
  const { unreadCount, addNotification } = useNotifications();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Suggestions logic
  const suggestions = useMemo(() => {
    if (searchQuery.length < 2) return [];
    return PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [searchQuery]);

  // Close suggestions on click outside
  useEffect(() => {
    const handleClickOutside = () => setShowSuggestions(false);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

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
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={(e) => {
              e.stopPropagation();
              setShowSuggestions(true);
            }}
            placeholder="Search premium cuts..." 
            className="pl-11 h-12 rounded-2xl border-none bg-white/10 text-white placeholder:text-slate-500 backdrop-blur-md focus-visible:ring-brand-gold"
          />

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl shadow-2xl z-[100] overflow-hidden backdrop-blur-xl"
              >
                <div className="p-2">
                  {suggestions.map((product) => (
                    <button
                      key={product.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/customer/product/${product.id}`);
                        setShowSuggestions(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-xl transition-colors text-left group"
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-border">
                        <img src={product.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground truncate group-hover:text-brand-gold transition-colors">{product.name}</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-black text-foreground">₹{product.price}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
        <h3 className="text-lg font-display font-bold text-foreground mb-4">Categories</h3>
        <div className="grid grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.name}
              onClick={() => navigate('/customer/products', { state: { category: cat.name } })}
              className="flex flex-col items-center gap-2 group active:scale-95 transition-transform"
            >
              <div className={`w-14 h-14 ${cat.color} ${cat.darkColor} rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:shadow-md transition-all border border-transparent dark:border-white/5`}>
                {cat.icon}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pt-8 pb-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-display font-bold text-foreground">Featured Products</h3>
          <button 
            onClick={() => navigate('/customer/products')}
            className="text-brand-red dark:text-brand-gold text-xs font-bold uppercase tracking-widest active:scale-95 transition-transform"
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