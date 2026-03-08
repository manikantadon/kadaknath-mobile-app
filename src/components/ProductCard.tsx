"use client";

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/lib/products';

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card dark:bg-brand-charcoal rounded-[1.5rem] overflow-hidden shadow-md border border-slate-100 dark:border-white/5 group"
    >
      <div 
        className="relative aspect-[4/5] overflow-hidden cursor-pointer"
        onClick={() => navigate(`/customer/product/${product.id}`)}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge className="bg-brand-black dark:bg-brand-gold text-brand-gold dark:text-brand-black border-none backdrop-blur-md font-bold text-[10px] uppercase tracking-wider">
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
        <h3 className="font-display font-bold text-foreground text-base leading-tight mb-1 truncate">{product.name}</h3>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-lg font-black text-foreground">₹{product.price}</span>
          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">/ {product.unit}</span>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => navigate('/customer/cart')}
            className="flex-1 rounded-xl bg-brand-gold hover:bg-brand-gold/90 text-brand-black font-bold gap-2 h-10 border-none shadow-lg shadow-brand-gold/20"
          >
            <ShoppingCart size={16} />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;