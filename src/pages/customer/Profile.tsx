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
  Zap,
  Moon,
  Sun
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { showSuccess } from '@/utils/toast';
import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';

const Profile = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  
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
            <div className="w-24 h-24 rounded-[2.5rem] bg-brand-black dark:bg-brand-gold flex items-center justify-center text-brand-gold dark:text-brand-black text-3xl font-display font-bold border-4 border-brand-gold/20 dark:border-black/20">
              RS
            </div>
            <div className="absolute -bottom-2 -right-2 bg-brand-gold text-brand-black p-2 rounded-xl shadow-lg">
              <Crown size={16} />
            </div>
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground">{user.name}</h1>
          <p className="text-slate-400 text-sm font-medium">{user.email}</p>
          <div className="mt-3 px-4 py-1 bg-brand-black dark:bg-brand-gold text-brand-gold dark:text-brand-black text-[10px] font-black uppercase tracking-widest rounded-full">
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
              <Progress 
                value={(user.points / user.nextReward) * 100} 
                className="h-2 bg-brand-black/10" 
                indicatorClassName="bg-brand-black"
              />
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-brand-black/5 rounded-full blur-xl"></div>
        </motion.div>

        {/* Display Settings (New) */}
        <div className="bg-card rounded-[2rem] p-6 mb-6 border border-border shadow-sm">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">App Theme</h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center text-foreground">
                {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Dark Mode</p>
                <p className="text-[10px] text-muted-foreground font-medium">Toggle app appearance</p>
              </div>
            </div>
            <Switch 
              checked={theme === 'dark'} 
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} 
            />
          </div>
        </div>

        {/* Active Subscription */}
        <div className="bg-card rounded-[2rem] p-6 mb-8 border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-brand-red/10 rounded-xl flex items-center justify-center text-brand-red">
              <Zap size={20} />
            </div>
            <div>
              <h4 className="font-bold text-foreground">Active Subscription</h4>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Weekly Curry Cut Plan</p>
            </div>
          </div>
          <div className="flex items-center justify-between py-3 border-t border-border/50">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
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
              className="w-full bg-card p-4 rounded-2xl border border-border shadow-sm flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <item.icon size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-foreground">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground font-medium">{item.sub}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-300 dark:text-slate-600" />
            </motion.button>
          ))}
        </div>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="w-full py-4 flex items-center justify-center gap-2 text-brand-red font-bold text-sm border-2 border-brand-red/10 rounded-2xl hover:bg-brand-red/5 transition-colors mb-12"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </MobileLayout>
  );
};

export default Profile;