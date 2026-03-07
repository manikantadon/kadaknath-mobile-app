"use client";

import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import { ChevronLeft, MoreVertical, CheckCircle2, Package, Calendar, Tag, Info, Trash2, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useNotifications, NotificationType } from '@/context/NotificationContext';

const getIcon = (type: NotificationType) => {
  switch (type) {
    case 'order': return { icon: Package, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' };
    case 'subscription': return { icon: Calendar, color: 'text-brand-gold', bg: 'bg-brand-gold/10 dark:bg-brand-gold/5' };
    case 'offer': return { icon: Tag, color: 'text-brand-red', bg: 'bg-brand-red/10 dark:bg-brand-red/5' };
    default: return { icon: Info, color: 'text-slate-500', bg: 'bg-slate-50 dark:bg-white/5' };
  }
};

const Notifications = () => {
  const navigate = useNavigate();
  const { notifications, markAllAsRead, markAsRead, removeNotification } = useNotifications();

  return (
    <MobileLayout role="customer">
      <div className="px-6 pt-8">
        <header className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-card rounded-xl flex items-center justify-center border border-border shadow-sm active:scale-95 transition-transform"
          >
            <ChevronLeft size={20} className="text-foreground" />
          </button>
          <h1 className="text-xl font-display font-bold text-foreground">Notifications</h1>
          <button className="w-10 h-10 flex items-center justify-center text-muted-foreground">
            <MoreVertical size={20} />
          </button>
        </header>

        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Recent</span>
          <button 
            onClick={markAllAsRead}
            className="text-brand-gold text-[10px] font-black uppercase tracking-widest flex items-center gap-1 active:scale-95 transition-transform"
          >
            <CheckCircle2 size={12} />
            Mark all as read
          </button>
        </div>

        <div className="space-y-4 mb-12">
          <AnimatePresence mode="popLayout">
            {notifications.map((notif) => {
              const { icon: Icon, color, bg } = getIcon(notif.type);
              return (
                <motion.div 
                  key={notif.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={cn(
                    "p-5 rounded-[2rem] border transition-all relative group",
                    notif.isRead 
                      ? "bg-card border-border shadow-sm" 
                      : "bg-brand-gold/5 border-brand-gold/20 shadow-md shadow-brand-gold/5"
                  )}
                >
                  <div className="flex gap-4">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", bg, color)}>
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-foreground">{notif.title}</h3>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{notif.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{notif.description}</p>
                      <div className="flex gap-4">
                        {!notif.isRead && (
                          <button 
                            onClick={() => markAsRead(notif.id)}
                            className="text-brand-gold text-[10px] font-black uppercase tracking-widest"
                          >
                            Mark as read
                          </button>
                        )}
                        <button 
                          onClick={() => removeNotification(notif.id)}
                          className="text-muted-foreground hover:text-brand-red text-[10px] font-black uppercase tracking-widest flex items-center gap-1"
                        >
                          <Trash2 size={12} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {notifications.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Bell size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">All caught up!</h3>
              <p className="text-muted-foreground text-sm">You have no new notifications.</p>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Notifications;