"use client";

import React, { useState, useMemo } from 'react';
import MobileLayout from '@/components/MobileLayout';
import ProductCard from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Search, ChevronLeft, Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PRODUCTS } from '@/lib/products';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CATEGORIES = ['All', 'Whole', 'Cuts', 'Eggs', 'Gifts'];

const ProductList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(location.state?.category || 'All');
  const [sortBy, setSortBy] = useState('popularity');

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });

    // Apply Sorting
    return [...result].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return (b.popularity || 0) - (a.popularity || 0);
    });
  }, [searchQuery, activeCategory, sortBy]);

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
      <div className="sticky top-0 bg-background z-10 py-4 overflow-hidden border-b border-border">
        <div className="flex overflow-x-auto gap-2 px-6 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border",
                activeCategory === cat 
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-black/10" 
                  : "bg-card text-muted-foreground border-border hover:border-brand-gold/50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Showing {filteredProducts.length} items
          </p>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 text-foreground font-bold text-xs uppercase tracking-widest active:scale-95 transition-transform bg-card px-3 py-2 rounded-xl border border-border shadow-sm">
                <ArrowUpDown size={14} className="text-brand-gold" />
                Sort
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-2xl p-2 bg-card border-border shadow-2xl">
              <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-3 py-2">Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                <DropdownMenuRadioItem value="popularity" className="rounded-xl text-sm font-bold py-3 focus:bg-muted cursor-pointer">
                  Popularity
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="price-low" className="rounded-xl text-sm font-bold py-3 focus:bg-muted cursor-pointer">
                  Price: Low to High
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="price-high" className="rounded-xl text-sm font-bold py-3 focus:bg-muted cursor-pointer">
                  Price: High to Low
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="rating" className="rounded-xl text-sm font-bold py-3 focus:bg-muted cursor-pointer">
                  Customer Rating
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  layout: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 }
                }}
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