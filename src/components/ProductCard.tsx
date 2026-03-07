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
      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group"
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-black/80 text-white border-none backdrop-blur-md">
            {product.category}
          </Badge>
          {product.isSubscription && (
            <Badge className="bg-indigo-600 text-white border-none">
              Subscription
            </Badge>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1">{product.name}</h3>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-xl font-black text-indigo-600">₹{product.price}</span>
          <span className="text-xs text-slate-400 font-medium">/ {product.unit}</span>
        </div>
        <div className="flex gap-2">
          <Button className="flex-1 rounded-xl bg-slate-900 hover:bg-black text-white gap-2 h-11">
            <ShoppingCart size={18} />
            Add
          </Button>
          <Button variant="outline" size="icon" className="rounded-xl h-11 w-11 border-slate-200">
            <Info size={18} className="text-slate-400" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;