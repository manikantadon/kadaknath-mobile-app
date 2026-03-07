"use client";

import React from 'react';
import { Home, Search, ShoppingBag, User, ShieldCheck, Truck } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: React.ReactNode;
  role: 'customer' | 'admin' | 'driver';
  hideNav?: boolean;
}

const MobileLayout = ({ children, role, hideNav = false }: MobileLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [lastTap, setLastTap] = React.useState<{ time: number; x: number } | null>(null);

  // Edge threshold (15% of screen width)
  const edgeThreshold = 0.15;
  // Double tap delay (milliseconds)
  const doubleTapDelay = 300;

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

  const handleDoubleClick = (e: React.MouseEvent | React.TouchEvent) => {
    // Basic double tap/click detection
    const now = Date.now();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const screenWidth = window.innerWidth;

    const isLeftEdge = clientX < screenWidth * edgeThreshold;
    const isRightEdge = clientX > screenWidth * (1 - edgeThreshold);

    // ONLY work on the left or right corners/edges
    if (!isLeftEdge && !isRightEdge) {
      setLastTap(null);
      return;
    }

    if (lastTap && (now - lastTap.time) < doubleTapDelay) {
      // Double tap detected
      const currentIndex = currentNav.findIndex(item => item.path === location.pathname);
      
      if (isRightEdge) {
        // Right corner double click -> Next
        if (currentIndex < currentNav.length - 1) {
          navigate(currentNav[currentIndex + 1].path);
        }
      } else if (isLeftEdge) {
        // Left corner double click -> Previous
        if (currentIndex > 0) {
          navigate(currentNav[currentIndex - 1].path);
        }
      }
      setLastTap(null); // Reset after successful detection
    } else {
      setLastTap({ time: now, x: clientX });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground max-w-md mx-auto border-x border-slate-200 dark:border-white/5 shadow-2xl overflow-hidden">
      <main 
        className="flex-1 overflow-y-auto pb-24 select-none no-scrollbar"
        onClick={handleDoubleClick}
      >
        {children}
      </main>
      
      {!hideNav && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-brand-black dark:bg-card border-t border-brand-gold/20 px-6 py-4 flex justify-between items-center z-50 rounded-t-[2rem]">
          {currentNav.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 transition-all duration-300",
                  isActive ? "text-brand-gold scale-110" : "text-slate-500 dark:text-slate-400 hover:text-slate-300"
                )}
              >
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
};

export default MobileLayout;