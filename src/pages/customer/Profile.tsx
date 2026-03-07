"use client";

import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import { 
  Settings, 
  CreditCard, 
  MapPin, 
  Headset, 
  LogOut, 
  ChevronRight, 
  Crown, 
  Award,
  Calendar,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { showSuccess } from '@/utils/toast';

const Profile = () => {
  const navigate = useNavigate();
  
  const user = {
    name: "Rahul Sharma",
    email: "rahul.s@example.com",
    points: 1250,
    nextReward: 2000,
    membership: "Gold Member"
  };

  const menuItems = [
    { icon: CreditCard, label: "Payment Methods", sub: "Visa ending in 4242" },
    { icon: MapPin, label: "Delivery Addresses", sub: "2 saved addresses" },
    { icon: Headset, label: "Help & Support", sub: "24/7 premium support" },
    { icon: Settings, label: "Account Settings", sub: "Privacy and security" },
  ];

  const handleLogout = () => {
    showSuccess("Logged out successfully");
    navigate('/');
  };

  return (
    <MobileLayout role="customer">
      <div className="px-6 pt-12 pb-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-[2.5rem] bg-brand-black flex items-center justify-center text-brand-gold text-3xl font-display font-bold border-4 border-brand-gold/20">
              RS
            </div>
            <div className="absolute -bottom-2 -right-2 bg-brand-gold text-brand-black p-2 rounded-xl shadow-lg">
              <Crown size={16} />
            </div>
          </div>
          <h1 className="text-2xl font-display font-bold text-brand-black">{user.name}</h1>
          <p className="text-slate-400 text-sm font-medium">{user.email}</p>
          <div className="mt-3 px-4 py-1 bg-brand-black text-brand-gold text-[10px] font-black uppercase tracking-widest rounded-full">
            {user.membership}
          </div>
        </div>

        {/* Loyalty Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-gold rounded-[2rem] p-6 mb-6 shadow-xl shadow-brand-gold/20 relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-brand-black/60 text-[10px] font-black uppercase tracking-widest">Kadaknath Points</p>
                <h3 className="text-3xl font-display font-bold text-brand-black">{user.points.toLocaleString()}</h3>
              </div>
              <Award size={32} className="text-brand-black/20" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-brand-black">
                <span>Next Reward: 15% Off</span>
                <span>{Math.round((user.points / user.nextReward) * 100)}%</span>
              </div>
              <Progress value={(user.points / user.nextReward) * 100} className="h-2 bg-brand-black/10" />
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-brand-black/5 rounded-full blur-xl"></div>
        </motion.div>

        {/* Active Subscription */}
        <div className="bg-white rounded-[2rem] p-6 mb-8 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-brand-red/10 rounded-xl flex items-center justify-center text-brand-red">
              <Zap size={20} />
            </div>
            <div>
              <h4 className="font-bold text-brand-black">Active Subscription</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Weekly Curry Cut Plan</p>
            </div>
          </div>
          <div className="flex items-center justify-between py-3 border-t border-slate-50">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Calendar size={14} />
              <span>Next Delivery: Oct 28</span>
            </div>
            <button className="text-brand-red text-[10px] font-black uppercase tracking-widest">Manage</button>
          </div>
        </div>

        {/* Menu Links */}
        <div className="space-y-3 mb-8">
          {menuItems.map((item, idx) => (
            <motion.button
              key={item.label}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-offwhite rounded-xl flex items-center justify-center text-brand-charcoal group-hover:bg-brand-black group-hover:text-brand-gold transition-colors">
                  <item.icon size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-brand-black">{item.label}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{item.sub}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-300" />
            </motion.button>
          ))}
        </div>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="w-full py-4 flex items-center justify-center gap-2 text-brand-red font-bold text-sm border-2 border-brand-red/10 rounded-2xl hover:bg-brand-red/5 transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </MobileLayout>
  );
};

export default Profile;