"use client";

import React, { useState, useMemo } from 'react';
import MobileLayout from '@/components/MobileLayout';
import ProductCard from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Search, ChevronLeft, Filter, SlidersHorizontal } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PRODUCTS } from '@/lib/products';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const CATEGORIES = ['All', 'Whole', 'Cuts', 'Eggs', 'Gifts'];

const ProductList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(location.state?.category || 'All');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <MobileLayout role="customer">
      <div className="bg-brand-black pt-12 pb-6 px-6 rounded-b-[2.5rem] shadow-xl relative z-20">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate('/customer')}
            className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white backdrop-blur-md border border-white/10 active:scale-90 transition-transform"
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-xl font-display font-bold text-white">All Products</h1>
        </div>

        <div className="relative mb-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Kadaknath products..." 
            className="pl-11 h-12 rounded-2xl border-none bg-white/10 text-white placeholder:text-slate-500 backdrop-blur-md focus-visible:ring-brand-gold"
          />
        </div>
      </div>

      {/* Categories Scroller */}
      <div className="sticky top-0 bg-brand-offwhite z-10 py-4 overflow-hidden border-b border-slate-100">
        <div className="flex overflow-x-auto gap-2 px-6 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border",
                activeCategory === cat 
                  ? "bg-brand-black text-brand-gold border-brand-black shadow-lg shadow-black/10" 
                  : "bg-white text-slate-400 border-slate-100 hover:border-slate-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Showing {filteredProducts.length} items
          </p>
          <button className="flex items-center gap-2 text-brand-black font-bold text-xs uppercase tracking-widest">
            <SlidersHorizontal size={14} />
            Sort
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter size={32} className="text-slate-200" />
            </div>
            <h3 className="font-bold text-brand-black mb-1">No products found</h3>
            <p className="text-sm text-slate-400">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default ProductList;