"use client";

import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import { MOCK_NOTIFICATIONS } from '@/components/NotificationPanel';
import { ChevronLeft, MoreVertical, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Notifications = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout role="customer">
      <div className="px-6 pt-8">
        <header className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-sm"
          >
            <ChevronLeft size={20} className="text-brand-black" />
          </button>
          <h1 className="text-xl font-display font-bold text-brand-black">Notifications</h1>
          <button className="w-10 h-10 flex items-center justify-center text-slate-400">
            <MoreVertical size={20} />
          </button>
        </header>

        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recent</span>
          <button className="text-brand-gold text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
            <CheckCircle2 size={12} />
            Mark all as read
          </button>
        </div>

        <div className="space-y-4">
          {MOCK_NOTIFICATIONS.map((notif, idx) => (
            <motion.div 
              key={notif.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "p-5 rounded-[2rem] border transition-all",
                notif.isRead 
                  ? "bg-white border-slate-100 shadow-sm" 
                  : "bg-brand-gold/5 border-brand-gold/20 shadow-md shadow-brand-gold/5"
              )}
            >
              <div className="flex gap-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", notif.bg, notif.color)}>
                  <notif.icon size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-brand-black">{notif.title}</h3>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{notif.time}</span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-3">{notif.description}</p>
                  {!notif.isRead && (
                    <button className="text-brand-gold text-[10px] font-black uppercase tracking-widest">
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Notifications;