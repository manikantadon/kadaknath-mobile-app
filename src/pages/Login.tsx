"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Lock, ArrowRight, ShieldCheck, Truck, User, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { showSuccess, showError } from '@/utils/toast';
import { cn } from '@/lib/utils';

interface LoginForm {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    setValue,
    formState: { errors } 
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    setIsLoading(true);

    // Dummy authentication logic
    setTimeout(() => {
      if (data.password === '12345678') {
        if (data.username === 'admin') {
          showSuccess('Welcome back, Administrator');
          navigate('/admin');
        } else if (data.username === 'customer') {
          showSuccess('Welcome to Kadaknath Pro');
          navigate('/customer');
        } else if (data.username === 'driver') {
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

  const quickAccess = (user: string) => {
    setValue('username', user);
    setValue('password', '12345678');
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Username</label>
              <div className="relative">
                <User className={cn(
                  "absolute left-4 top-1/2 -translate-y-1/2 transition-colors",
                  errors.username ? "text-brand-red" : "text-slate-400"
                )} size={18} />
                <Input 
                  {...register("username", { required: "Username is required" })}
                  type="text"
                  placeholder="admin, customer, or driver"
                  className={cn(
                    "pl-11 h-14 rounded-2xl border-slate-100 bg-slate-50 focus-visible:ring-brand-gold transition-all",
                    errors.username && "border-brand-red/50 bg-brand-red/5 focus-visible:ring-brand-red"
                  )}
                />
              </div>
              <AnimatePresence>
                {errors.username && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-[10px] font-bold text-brand-red flex items-center gap-1 ml-1"
                  >
                    <AlertCircle size={12} />
                    {errors.username.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className={cn(
                  "absolute left-4 top-1/2 -translate-y-1/2 transition-colors",
                  errors.password ? "text-brand-red" : "text-slate-400"
                )} size={18} />
                <Input 
                  {...register("password", { 
                    required: "Password is required",
                    minLength: { value: 8, message: "Minimum 8 characters" }
                  })}
                  type="password"
                  placeholder="••••••••"
                  className={cn(
                    "pl-11 h-14 rounded-2xl border-slate-100 bg-slate-50 focus-visible:ring-brand-gold transition-all",
                    errors.password && "border-brand-red/50 bg-brand-red/5 focus-visible:ring-brand-red"
                  )}
                />
              </div>
              <AnimatePresence>
                {errors.password && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-[10px] font-bold text-brand-red flex items-center gap-1 ml-1"
                  >
                    <AlertCircle size={12} />
                    {errors.password.message}
                  </motion.p>
                )}
              </AnimatePresence>
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
              <button onClick={() => quickAccess('customer')} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-50 hover:bg-brand-gold/10 transition-colors group">
                <User size={16} className="text-slate-400 group-hover:text-brand-gold" />
                <span className="text-[8px] font-black uppercase text-slate-400 group-hover:text-brand-gold">User</span>
              </button>
              <button onClick={() => quickAccess('admin')} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-50 hover:bg-brand-gold/10 transition-colors group">
                <ShieldCheck size={16} className="text-slate-400 group-hover:text-brand-gold" />
                <span className="text-[8px] font-black uppercase text-slate-400 group-hover:text-brand-gold">Admin</span>
              </button>
              <button onClick={() => quickAccess('driver')} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-50 hover:bg-brand-gold/10 transition-colors group">
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