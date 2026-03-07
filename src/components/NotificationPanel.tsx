"use client";

import React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Bell, CheckCircle2, Package, Calendar, Tag, Info, Trash2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNotifications, NotificationType } from '@/context/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';

const getIcon = (type: NotificationType) => {
  switch (type) {
    case 'order': return { icon: Package, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' };
    case 'subscription': return { icon: Calendar, color: 'text-brand-gold', bg: 'bg-brand-gold/10 dark:bg-brand-gold/5' };
    case 'offer': return { icon: Tag, color: 'text-brand-red', bg: 'bg-brand-red/10 dark:bg-brand-red/5' };
    default: return { icon: Info, color: 'text-slate-500', bg: 'bg-slate-50 dark:bg-white/5' };
  }
};

const NotificationPanel = ({ children }: { children: React.ReactNode }) => {
  const { notifications, unreadCount, removeNotification, clearAll } = useNotifications();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className="bg-background border-none rounded-t-[3rem] max-w-md mx-auto h-[80vh]">
        <div className="mx-auto w-12 h-1.5 bg-muted rounded-full mt-4 mb-2" />
        
        <div className="flex flex-col h-full overflow-hidden">
          <DrawerHeader className="px-8 flex items-center justify-between">
            <div>
              <DrawerTitle className="text-2xl font-display font-bold text-foreground">Notifications</DrawerTitle>
              <p className="text-xs text-muted-foreground mt-1">You have {unreadCount} unread messages</p>
            </div>
            {notifications.length > 0 && (
              <button 
                onClick={clearAll}
                className="text-brand-red text-[10px] font-black uppercase tracking-widest flex items-center gap-1 active:scale-95 transition-transform"
              >
                <Trash2 size={12} />
                Clear All
              </button>
            )}
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto px-6 py-4 no-scrollbar">
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {notifications.length > 0 ? (
                  notifications.map((notif) => {
                    const { icon: Icon, color, bg } = getIcon(notif.type);
                    return (
                      <motion.div
                        key={notif.id}
                        layout
                        drag="x"
                        dragConstraints={{ left: 0, right: 1000 }}
                        dragElastic={{ left: 0, right: 0.5 }}
                        onDragEnd={(_, info) => {
                          // Very sensitive: if moved right even a little bit
                          if (info.offset.x > 20 || info.velocity.x > 20) {
                            removeNotification(notif.id);
                          }
                        }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ 
                          opacity: 0, 
                          x: 500,
                          transition: { type: "spring", stiffness: 500, damping: 40 } 
                        }}
                        whileDrag={{ scale: 1.02, zIndex: 1 }}
                        className={cn(
                          "w-full flex items-start gap-4 p-4 rounded-2xl border transition-all text-left relative touch-pan-y cursor-grab active:cursor-grabbing",
                          notif.isRead 
                            ? "bg-card border-border shadow-sm" 
                            : "bg-brand-gold/5 border-brand-gold/20 shadow-md shadow-brand-gold/5"
                        )}
                      >
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notif.id);
                          }}
                          className="absolute top-4 right-4 p-1.5 bg-muted/50 rounded-full text-muted-foreground hover:text-brand-red transition-all active:scale-90 z-10"
                        >
                          <X size={14} />
                        </button>

                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", bg, color)}>
                          <Icon size={20} />
                        </div>
                        <div className="flex-1 min-w-0 pr-8">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-sm text-foreground truncate pr-2">{notif.title}</h4>
                            <span className="text-[8px] font-bold text-muted-foreground uppercase whitespace-nowrap">{notif.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed">{notif.description}</p>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground">
                      <Bell size={24} />
                    </div>
                    <h4 className="font-bold text-foreground">No notifications</h4>
                    <p className="text-xs text-muted-foreground mt-1">We'll let you know when something happens.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default NotificationPanel;