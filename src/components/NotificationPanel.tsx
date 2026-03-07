"use client";

import React from 'react';
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerTrigger,
  DrawerFooter
} from '@/components/ui/drawer';
import { Bell, Package, Calendar, Tag, ChevronRight, Info, ShieldCheck, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotifications, NotificationType } from '@/context/NotificationContext';

const getIcon = (type: NotificationType) => {
  switch (type) {
    case 'order': return { icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' };
    case 'subscription': return { icon: Calendar, color: 'text-brand-gold', bg: 'bg-brand-gold/10' };
    case 'offer': return { icon: Tag, color: 'text-brand-red', bg: 'bg-brand-red/10' };
    default: return { icon: Info, color: 'text-slate-500', bg: 'bg-slate-50' };
  }
};

const NotificationPanel = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { notifications, markAsRead, requestPermission, permissionStatus } = useNotifications();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className="bg-brand-offwhite border-none rounded-t-[3rem] max-w-md mx-auto h-[80vh]">
        <div className="mx-auto w-12 h-1.5 bg-slate-200 rounded-full mt-4 mb-2" />
        <DrawerHeader className="px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bell size={20} className="text-brand-gold" />
            <DrawerTitle className="text-xl font-display font-bold text-brand-black">Notifications</DrawerTitle>
          </div>
          
          {permissionStatus !== 'granted' ? (
            <button 
              onClick={requestPermission}
              className="text-[10px] font-black text-brand-gold uppercase tracking-widest border border-brand-gold/20 px-3 py-1 rounded-full flex items-center gap-1 animate-pulse"
            >
              <ShieldAlert size={12} />
              Enable Alerts
            </button>
          ) : (
            <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1">
              <ShieldCheck size={12} />
              Active
            </div>
          )}
        </DrawerHeader>

        <ScrollArea className="flex-1 px-6 py-4">
          {permissionStatus === 'default' && (
            <div className="mb-6 p-4 bg-brand-gold/10 rounded-2xl border border-brand-gold/20">
              <p className="text-xs font-bold text-brand-black mb-2">Don't miss your delivery!</p>
              <p className="text-[10px] text-slate-500 mb-3">Enable system notifications to get real-time updates on your mobile device.</p>
              <button 
                onClick={requestPermission}
                className="w-full py-2 bg-brand-black text-brand-gold rounded-xl text-[10px] font-black uppercase tracking-widest"
              >
                Allow Notifications
              </button>
            </div>
          )}

          <div className="space-y-4 pb-6">
            {notifications.length > 0 ? (
              notifications.map((notif) => {
                const { icon: Icon, color, bg } = getIcon(notif.type);
                return (
                  <button 
                    key={notif.id}
                    onClick={() => {
                      markAsRead(notif.id);
                      navigate(`/customer/orders`);
                    }}
                    className="w-full flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-left group transition-all active:scale-95"
                  >
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", bg, color)}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-brand-black text-sm truncate">{notif.title}</h4>
                        {!notif.isRead && <span className="w-2 h-2 bg-brand-red rounded-full mt-1.5" />}
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-1">{notif.description}</p>
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{notif.time}</span>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="text-center py-20">
                <Bell size={40} className="mx-auto text-slate-200 mb-4" />
                <p className="text-slate-400 text-sm font-medium">No notifications yet</p>
              </div>
            )}
          </div>
        </ScrollArea>

        <DrawerFooter className="px-6 pb-10">
          <button 
            onClick={() => navigate('/customer/notifications')}
            className="w-full py-4 bg-brand-black text-brand-gold rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-brand-black/20"
          >
            View All History
            <ChevronRight size={16} />
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default NotificationPanel;