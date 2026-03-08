"use client";

import React from 'react';
import { Order } from '@/lib/orders';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Package,
  MapPin,
  Phone,
  Calendar,
  ShoppingBag,
  User,
  Truck,
  CheckCircle2,
  X,
} from 'lucide-react';
import { OrderStatusBadge } from './OrderStatusBadge';
import { OrderTimeline } from './OrderTimeline';
import { cn } from '@/lib/utils';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/ui/drawer';

interface OrderAction {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'outline' | 'destructive';
  icon?: React.ReactNode;
}

interface OrderDetailsDrawerProps {
  order: Order | null;
  open: boolean;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  onCancelOrder?: () => void;
  showTimeline?: boolean;
  actions?: OrderAction[];
}

export const OrderDetailsDrawer = ({
  order,
  open,
  onClose,
  onOpenChange,
  onCancelOrder,
  showTimeline = true,
  actions,
}: OrderDetailsDrawerProps) => {
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      if (onClose) onClose();
      if (onOpenChange) onOpenChange(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleString('en-IN', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  if (!order) return null;

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent className="max-w-md mx-auto h-[95vh] flex flex-col rounded-t-[3rem]">
        <DrawerHeader className="px-6 pt-2 pb-4 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl font-display font-bold text-foreground">
              Order Details
            </DrawerTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleOpenChange(false)}
              className="rounded-full bg-muted/50"
            >
              <X size={18} />
            </Button>
          </div>
        </DrawerHeader>

        {/* Scrollable Content Container */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="px-6 py-6 space-y-5">
              {/* Order Header Card */}
              <div className="bg-gradient-to-br from-brand-gold/15 to-transparent rounded-[2rem] p-5 border border-brand-gold/25">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">
                      Order ID
                    </p>
                    <h2 className="text-xl font-display font-bold text-foreground">
                      {order.id}
                    </h2>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar size={12} className="text-brand-gold" />
                  <span>{formatDate(order.createdAt)}</span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-muted/30 rounded-[2rem] p-5 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold">
                    <User size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">Customer</h3>
                    <p className="text-xs text-muted-foreground">Delivery Info</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User size={14} className="text-brand-gold" />
                    <span className="font-medium text-foreground text-sm">{order.customerName || 'N/A'}</span>
                  </div>

                  {order.phone && (
                    <div className="flex items-center gap-3">
                      <Phone size={14} className="text-brand-gold" />
                      <span className="font-medium text-foreground text-sm">{order.phone}</span>
                    </div>
                  )}

                  {order.address && (
                    <div className="flex items-start gap-3">
                      <MapPin size={14} className="text-brand-gold shrink-0 mt-0.5" />
                      <span className="font-medium text-foreground text-sm">{order.address}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-muted/30 rounded-[2rem] p-5 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold">
                    <ShoppingBag size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">Items</h3>
                    <p className="text-xs text-muted-foreground">{order.items?.length || 0} product(s)</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {order.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-card rounded-xl border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-brand-gold/10 rounded-lg flex items-center justify-center">
                          <Package size={16} className="text-brand-gold" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.quantity} × ₹{item.price}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-foreground text-sm">
                        ₹{(item.price || 0) * (item.quantity || 0)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator className="my-3" />

                <div className="flex items-center justify-between p-3 bg-brand-gold/10 rounded-xl border border-brand-gold/20">
                  <span className="font-bold text-foreground text-sm">Total</span>
                  <span className="text-xl font-black text-brand-gold">₹{order.total}</span>
                </div>
              </div>

              {/* Driver Info */}
              {order.driverName && (
                <div className="bg-muted/30 rounded-[2rem] p-5 border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold">
                      <Truck size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-sm">Driver</h3>
                      <p className="text-xs text-muted-foreground">Delivery Partner</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border">
                    <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center text-brand-black font-bold text-sm">
                      {(order.driverName || 'D').split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="font-bold text-foreground text-sm">{order.driverName}</span>
                  </div>
                </div>
              )}

              {/* Timeline */}
              {showTimeline && (
                <div className="bg-muted/30 rounded-[2rem] p-5 border border-border pb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-sm">Tracking</h3>
                      <p className="text-xs text-muted-foreground">Order Journey</p>
                    </div>
                  </div>
                  <OrderTimeline order={order} />
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        <DrawerFooter className="px-6 pt-4 pb-10 border-t border-border bg-background flex-shrink-0">
          <div className="flex flex-col gap-3 w-full">
            {actions && actions.length > 0 ? (
              actions.map((action, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    action.onClick();
                    // Drawer handleOpenChange will take care of closing if needed
                  }}
                  variant={action.variant || 'default'}
                  className={cn(
                    "w-full h-12 rounded-2xl font-bold text-sm gap-2 shadow-lg",
                    action.variant === 'destructive' ? "" : "bg-brand-black dark:bg-brand-gold text-brand-gold dark:text-brand-black"
                  )}
                >
                  {action.icon}
                  {action.label}
                </Button>
              ))
            ) : (
              <>
                {order.status === 'CREATED' && onCancelOrder ? (
                  <Button
                    onClick={onCancelOrder}
                    variant="destructive"
                    className="w-full h-12 rounded-2xl font-bold text-sm shadow-lg"
                  >
                    <X size={18} className="mr-2" />
                    Cancel Order
                  </Button>
                ) : null}
                <Button
                  onClick={() => handleOpenChange(false)}
                  variant="default"
                  className="w-full h-12 rounded-2xl bg-brand-black dark:bg-brand-gold text-brand-gold dark:text-brand-black font-bold text-sm shadow-md"
                >
                  Close
                </Button>
              </>
            )}
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
