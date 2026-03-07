"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, User, Mail, Phone, Lock, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';

interface RegisterForm {
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'driver';
}

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors, isValid } 
  } = useForm<RegisterForm>({
    mode: 'onChange',
    defaultValues: { role: 'customer' }
  });

  const selectedRole = watch('role');

  const onSubmit = (data: RegisterForm) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      showSuccess(`Account created! Welcome, ${data.name}`);
      navigate('/');
      setIsLoading(false);
    }, 1500);
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-brand-black dark:bg-brand-gold rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl border-2 border-brand-gold/30 dark:border-brand-black/20">
            <Crown className="text-brand-gold dark:text-brand-black" size={32} />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground text-xs font-medium uppercase tracking-widest mt-1">Join the Premium Poultry Network</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2].map((i) => (
            <div 
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                step === i ? "w-8 bg-brand-gold" : "w-4 bg-muted"
              )}
            />
          ))}
        </div>

        <div className="bg-card rounded-[2.5rem] p-8 shadow-xl shadow-black/5 border border-border overflow-hidden relative">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <Input 
                        {...register("name", { required: "Name is required" })}
                        placeholder="John Doe"
                        className="pl-11 h-14 rounded-2xl border-border bg-muted/30 focus-visible:ring-brand-gold text-foreground"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <Input 
                        {...register("email", { 
                          required: "Email is required",
                          pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                        })}
                        type="email"
                        placeholder="john@example.com"
                        className="pl-11 h-14 rounded-2xl border-border bg-muted/30 focus-visible:ring-brand-gold text-foreground"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <Input 
                        {...register("phone", { required: "Phone is required" })}
                        placeholder="+91 XXXXX XXXXX"
                        className="pl-11 h-14 rounded-2xl border-border bg-muted/30 focus-visible:ring-brand-gold text-foreground"
                      />
                    </div>
                  </div>

                  <Button 
                    type="button"
                    onClick={nextStep}
                    disabled={!watch('name') || !watch('email') || !watch('phone')}
                    className="w-full h-14 rounded-2xl bg-brand-black dark:bg-brand-gold text-brand-gold dark:text-brand-black font-bold gap-3 mt-4"
                  >
                    Next Step
                    <ArrowRight size={18} />
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1 block text-center">Choose Your Role</label>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <label className={cn(
                        "p-6 rounded-[2rem] border-2 cursor-pointer transition-all flex flex-col items-center gap-3 text-center",
                        selectedRole === 'customer' 
                          ? "bg-brand-gold/10 border-brand-gold text-brand-gold" 
                          : "bg-muted/30 border-transparent text-muted-foreground hover:border-muted"
                      )}>
                        <input {...register('role')} type="radio" value="customer" className="hidden" />
                        <User size={32} strokeWidth={selectedRole === 'customer' ? 3 : 2} />
                        <span className="font-bold text-xs">Customer</span>
                      </label>

                      <label className={cn(
                        "p-6 rounded-[2rem] border-2 cursor-pointer transition-all flex flex-col items-center gap-3 text-center",
                        selectedRole === 'driver' 
                          ? "bg-brand-gold/10 border-brand-gold text-brand-gold" 
                          : "bg-muted/30 border-transparent text-muted-foreground hover:border-muted"
                      )}>
                        <input {...register('role')} type="radio" value="driver" className="hidden" />
                        <Truck size={32} strokeWidth={selectedRole === 'driver' ? 3 : 2} />
                        <span className="font-bold text-xs">Delivery Partner</span>
                      </label>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-2xl flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      By creating an account, you agree to our <span className="text-brand-gold font-bold">Terms of Service</span> and <span className="text-brand-gold font-bold">Privacy Policy</span>.
                    </p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep}
                      className="h-14 w-14 rounded-2xl border-border bg-card text-foreground p-0"
                    >
                      <ArrowLeft size={20} />
                    </Button>
                    <Button 
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 h-14 rounded-2xl bg-brand-black dark:bg-brand-gold text-brand-gold dark:text-brand-black font-bold gap-3 shadow-xl"
                    >
                      {isLoading ? "Creating..." : "Complete Setup"}
                      {!isLoading && <ShieldCheck size={18} />}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        <p className="text-center mt-8 text-muted-foreground text-xs">
          Already have an account? <span onClick={() => navigate('/')} className="text-brand-gold font-bold cursor-pointer">Sign In</span>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;