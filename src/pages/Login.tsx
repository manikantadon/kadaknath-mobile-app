"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Mail, Lock, ArrowRight, ShieldCheck, Truck, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { showSuccess, showError } from '@/utils/toast';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Dummy authentication logic
    setTimeout(() => {
      if (password === '12345678') {
        if (email === 'admin') {
          showSuccess('Welcome back, Administrator');
          navigate('/admin');
        } else if (email === 'customer') {
          showSuccess('Welcome to Kadaknath Pro');
          navigate('/customer');
        } else if (email === 'driver') {
          showSuccess('Ready for deliveries?');
          navigate('/driver');
        } else {
          showError('Invalid username. Use admin, customer, or driver.');
        }
      } else {
        showError('Incorrect password. Try 12345678');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-brand-offwhite flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-brand-black rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-brand-black/20 border-2 border-brand-gold/30">
            <Crown className="text-brand-gold" size={40} />
          </div>
          <h1 className="text-3xl font-display font-bold text-brand-black mb-2">Kadaknath Pro</h1>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">Premium Poultry Ecosystem</p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-black/5 border border-slate-100">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input 
                  type="text"
                  placeholder="admin, customer, or driver"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 h-14 rounded-2xl border-slate-100 bg-slate-50 focus-visible:ring-brand-gold"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input 
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 h-14 rounded-2xl border-slate-100 bg-slate-50 focus-visible:ring-brand-gold"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full h-14 rounded-2xl bg-brand-black text-brand-gold hover:bg-brand-black/90 font-bold gap-3 shadow-xl shadow-brand-black/20"
            >
              {isLoading ? "Authenticating..." : "Sign In"}
              {!isLoading && <ArrowRight size={18} />}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-50">
            <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-4">Quick Access Demo</p>
            <div className="grid grid-cols-3 gap-3">
              <button onClick={() => { setEmail('customer'); setPassword('12345678'); }} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-50 hover:bg-brand-gold/10 transition-colors group">
                <User size={16} className="text-slate-400 group-hover:text-brand-gold" />
                <span className="text-[8px] font-black uppercase text-slate-400 group-hover:text-brand-gold">User</span>
              </button>
              <button onClick={() => { setEmail('admin'); setPassword('12345678'); }} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-50 hover:bg-brand-gold/10 transition-colors group">
                <ShieldCheck size={16} className="text-slate-400 group-hover:text-brand-gold" />
                <span className="text-[8px] font-black uppercase text-slate-400 group-hover:text-brand-gold">Admin</span>
              </button>
              <button onClick={() => { setEmail('driver'); setPassword('12345678'); }} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-50 hover:bg-brand-gold/10 transition-colors group">
                <Truck size={16} className="text-slate-400 group-hover:text-brand-gold" />
                <span className="text-[8px] font-black uppercase text-slate-400 group-hover:text-brand-gold">Driver</span>
              </button>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-400 text-xs">
          Don't have an account? <span className="text-brand-gold font-bold cursor-pointer">Register Now</span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;