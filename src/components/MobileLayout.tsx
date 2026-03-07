"use client";

import React from 'react';
import { Home, Search, ShoppingBag, User, ShieldCheck, Truck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: React.ReactNode;
  role: 'customer' | 'admin' | 'driver';
}

const MobileLayout = ({ children, role }: MobileLayoutProps) => {
  const location = useLocation();

  const navItems = {
    customer: [
      { icon: Home, label: 'Home', path: '/customer' },
      { icon: Search, label: 'Trace', path: '/customer/trace' },
      { icon: ShoppingBag, label: 'Orders', path: '/customer/orders' },
      { icon: User, label: 'Profile', path: '/customer/profile' },
    ],
    admin: [
      { icon: ShieldCheck, label: 'Inventory', path: '/admin' },
      { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
      { icon: User, label: 'Staff', path: '/admin/staff' },
    ],
    driver: [
      { icon: Truck, label: 'Deliveries', path: '/driver' },
      { icon: User, label: 'Profile', path: '/driver/profile' },
    ],
  };

  const currentNav = navItems[role];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 max-w-md mx-auto border-x border-slate-200 shadow-xl overflow-hidden">
      <main className="flex-1 overflow-y-auto pb-24">
        {children}
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-lg border-t border-slate-200 px-6 py-3 flex justify-between items-center z-50">
        {currentNav.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 transition-all duration-200",
                isActive ? "text-indigo-600 scale-110" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileLayout;