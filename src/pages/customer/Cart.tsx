"use client";

import React, { useState } from 'react';
import MobileLayout from '@/components/MobileLayout';
import { ChevronLeft, Trash2, Plus, Minus, CreditCard, MapPin, ChevronRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { showSuccess } from '@/utils/toast';

const Cart = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: '1', name: 'Premium Kadaknath Whole', price: 1200, qty: 1, image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=200' },
    { id: '2', name: 'Kadaknath Eggs (Case)', price: 450, qty: 2, image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&q=80&w=200' },
  ]);

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const delivery = 50;
  const total = subtotal + delivery;

  const updateQty = (id: string, delta: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <MobileLayout role="customer">
      <div className="px-6 pt-8 pb-32">
        <header className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-sm"
          >
            <ChevronLeft size={20} className="text-brand-black" />
          </button>
          <h1 className="text-xl font-display font-bold text-brand-black">My Cart</h1>
          <div className="w-10" />
        </header>

        {items.length > 0 ? (
          <>
            <div className="space-y-4 mb-8">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm flex gap-4"
                  >
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-bold text-brand-black leading-tight">{item.name}</h3>
                        <button onClick={() => removeItem(item.id)} className="text-slate-300 hover:text-brand-red">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-black text-brand-black">₹{item.price * item.qty}</span>
                        <div className="flex items-center bg-brand-offwhite rounded-xl px-2 py-1 gap-3">
                          <button onClick={() => updateQty(item.id, -1)} className="text-slate-400"><Minus size={14} /></button>
                          <span className="text-xs font-black text-brand-black w-4 text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="text-slate-400"><Plus size={14} /></button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Delivery Info */}
            <div className="space-y-3 mb-8">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Delivery Address</p>
                    <p className="text-xs font-bold text-brand-black">Sector 45, Gurgaon...</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-300" />
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-black/5 rounded-xl flex items-center justify-center text-brand-black">
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Payment Method</p>
                    <p className="text-xs font-bold text-brand-black">Visa ending in 4242</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-300" />
              </div>
            </div>

            {/* Summary */}
            <div className="bg-brand-black rounded-[2.5rem] p-8 text-white shadow-2xl shadow-brand-black/20">
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="font-bold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Delivery Fee</span>
                  <span className="font-bold">₹{delivery}</span>
                </div>
                <div className="h-[1px] bg-white/10" />
                <div className="flex justify-between text-lg">
                  <span className="font-display font-bold">Total</span>
                  <span className="font-display font-bold text-brand-gold">₹{total}</span>
                </div>
              </div>
              
              <Button 
                onClick={() => {
                  showSuccess('Order placed successfully!');
                  navigate('/customer/orders');
                }}
                className="w-full h-14 rounded-2xl bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold gap-3 border-none"
              >
                <Sparkles size={20} />
                Place Order
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 size={32} className="text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-brand-black mb-2">Your cart is empty</h3>
            <p className="text-slate-400 text-sm mb-8">Looks like you haven't added any premium cuts yet.</p>
            <Button onClick={() => navigate('/customer')} className="bg-brand-black text-brand-gold rounded-xl px-8">
              Start Shopping
            </Button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Cart;