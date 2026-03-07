"use client";

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/MobileLayout';
import { ChevronLeft, Share2, Star, ShieldCheck, MapPin, ShoppingCart, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { showSuccess } from '@/utils/toast';
import { PRODUCTS } from '@/lib/products';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find product by id
  const product = PRODUCTS.find(p => p.id === id);

  const handleShare = async () => {
    if (!product) return;

    const shareData = {
      title: product.name,
      text: `Check out this ${product.name} from Kadaknath Pro!`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        showSuccess('Link copied to clipboard! 📋');
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  if (!product) {
    return (
      <MobileLayout role="customer">
        <div className="flex flex-col items-center justify-center h-[80vh] px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button onClick={() => navigate('/customer')}>Back to Home</Button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout role="customer">
      <div className="relative">
        {/* Hero Image */}
        <div className="relative h-[45vh] w-full overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-brand-offwhite" />
          
          {/* Top Actions */}
          <div className="absolute top-12 left-6 right-6 flex justify-between items-center">
            <button 
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/20"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleShare}
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/20 active:scale-90 transition-transform"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* Content Card */}
        <div className="px-6 -mt-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[3rem] p-8 shadow-xl shadow-black/5 border border-slate-100"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <Badge className="bg-brand-gold/10 text-brand-gold border-none font-bold text-[10px] uppercase tracking-widest mb-2">
                  {product.category}
                </Badge>
                <h1 className="text-2xl font-display font-bold text-brand-black leading-tight">{product.name}</h1>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-brand-black">₹{product.price}</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">per {product.unit}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-brand-gold fill-brand-gold" />
                <span className="text-sm font-bold text-brand-black">{product.rating || 0}</span>
                <span className="text-xs text-slate-400">({product.reviews || 0} reviews)</span>
              </div>
              <div className="w-[1px] h-4 bg-slate-100" />
              <div className="flex items-center gap-1 text-emerald-600">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Certified</span>
              </div>
            </div>

            {product.description && (
              <>
                <h3 className="font-bold text-brand-black mb-2">Description</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-8">
                  {product.description}
                </p>
              </>
            )}

            {/* Nutrition Grid */}
            {product.nutrition && (
              <div className="grid grid-cols-4 gap-3 mb-8">
                {product.nutrition.map((item) => (
                  <div key={item.label} className="bg-brand-offwhite p-3 rounded-2xl text-center">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mb-1">{item.label}</div>
                    <div className="text-xs font-black text-brand-black">{item.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Farm Info */}
            {product.farm && (
              <div className="bg-brand-black rounded-[2rem] p-6 text-white mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-brand-gold">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Sourced From</p>
                    <h4 className="font-bold text-sm">{product.farm.name}</h4>
                    <p className="text-[10px] text-brand-gold font-medium">{product.farm.location}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white/80 backdrop-blur-xl border-t border-slate-100 z-50">
          <div className="flex gap-4">
            <div className="flex items-center bg-slate-100 rounded-2xl px-4 gap-4">
              <button className="w-8 h-8 flex items-center justify-center font-bold text-brand-black">-</button>
              <span className="font-black text-brand-black">1</span>
              <button className="w-8 h-8 flex items-center justify-center font-bold text-brand-black">+</button>
            </div>
            <Button 
              onClick={() => {
                showSuccess('Added to cart!');
                navigate('/customer/cart');
              }}
              className="flex-1 h-14 rounded-2xl bg-brand-black text-brand-gold hover:bg-brand-black/90 font-bold gap-3 shadow-xl shadow-brand-black/20"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default ProductDetails;