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
import { Bell, Package, Calendar, Tag, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

export const MOCK_NOTIFICATIONS = [
  { 
    id: '1', 
    title: 'Order Shipped', 
    description: 'Your Kadaknath order #124 is on the way', 
    time: '2 mins ago',
    isRead: false,
    type: 'order',
    icon: Package,
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  { 
    id: '2', 
    title: 'Subscription Reminder', 
    description: 'Tomorrow delivery scheduled', 
    time: '1 hour ago',
    isRead: false,
    type: 'subscription',
    icon: Calendar,
    color: 'text-brand-gold',
    bg: 'bg-brand-gold/10'
  },
  { 
    id: '3', 
    title: 'New Offer', 
    description: '10% off on premium cuts', 
    time: '5 hours ago',
    isRead: true,
    type: 'offer',
    icon: Tag,
    color: 'text-brand-red',
    bg: 'bg-brand-red/10'
  },
  { 
    id: '4', 
    title: 'Points Earned', 
    description: 'You earned 50 points from your last order', 
    time: '1 day ago',
    isRead: true,
    type: 'offer',
    icon: Tag,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  { 
    id: '5', 
    title: 'Feedback Requested', 
    description: 'How was your last delivery?', 
    time: '2 days ago',
    isRead: true,
    type: 'order',
    icon: Package,
    color: 'text-indigo-500',
    bg: 'bg-indigo-50'
  }
];

const NotificationPanel = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className="bg-brand-offwhite border-none rounded-t-[3rem] max-w-md mx-auto h-[80vh]">
        <div className="mx-auto w-12 h-1.5 bg-slate-200 rounded-full mt-4 mb-2" />
        <DrawerHeader className="px-6">
          <div className="flex items-center gap-2">
            <Bell size={20} className="text-brand-gold" />
            <DrawerTitle className="text-xl font-display font-bold text-brand-black">Notifications</DrawerTitle>
          </div>
        </DrawerHeader>

        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-4 pb-6">
            {MOCK_NOTIFICATIONS.map((notif) => (
              <button 
                key={notif.id}
                onClick={() => navigate(`/customer/orders`)}
                className="w-full flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-left group transition-all active:scale-95"
              >
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", notif.bg, notif.color)}>
                  <notif.icon size={20} />
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
            ))}
          </div>
        </ScrollArea>

        <DrawerFooter className="px-6 pb-10">
          <button 
            onClick={() => navigate('/customer/notifications')}
            className="w-full py-4 bg-brand-black text-brand-gold rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-brand-black/20"
          >
            View All Notifications
            <ChevronRight size={16} />
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default NotificationPanel;