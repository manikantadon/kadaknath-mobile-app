"use client";

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  category: string;
  isSubscription?: boolean;
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[1.5rem] overflow-hidden shadow-md border border-slate-100 group"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge className="bg-brand-black text-brand-gold border-none backdrop-blur-md font-bold text-[10px] uppercase tracking-wider">
            {product.category}
          </Badge>
          {product.isSubscription && (
            <Badge className="bg-brand-red text-white border-none font-bold text-[10px] uppercase tracking-wider">
              Subscription
            </Badge>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display font-bold text-brand-charcoal text-base leading-tight mb-1">{product.name}</h3>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-lg font-black text-brand-black">₹{product.price}</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">/ {product.unit}</span>
        </div>
        <div className="flex gap-2">
          <Button className="flex-1 rounded-xl bg-brand-gold hover:bg-brand-gold/90 text-brand-black font-bold gap-2 h-10 border-none shadow-lg shadow-brand-gold/20">
            <ShoppingCart size={16} />
            Add
          </Button>
          <Button variant="outline" size="icon" className="rounded-xl h-10 w-10 border-slate-200 text-slate-400">
            <Info size={16} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;