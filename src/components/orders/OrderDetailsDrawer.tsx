import React from 'react';
import { Order, OrderStatus } from '@/lib/orders';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  X,
  Package,
  MapPin,
  Phone,
  Calendar,
  ShoppingBag,
  User,
  Truck,
} from 'lucide-react';
import { OrderStatusBadge } from './OrderStatusBadge';
import { OrderTimeline } from './OrderTimeline';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface OrderDetailsDrawerProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actions?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'outline' | 'destructive';
    disabled?: boolean;
  }[];
  showTimeline?: boolean;
}

export const OrderDetailsDrawer = ({
  order,
  open,
  onOpenChange,
  actions,
  showTimeline = true,
}: OrderDetailsDrawerProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!order) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/80 z-50"
          />
          
          {/* Drawer Content */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-background z-50 rounded-t-[2.5rem] max-h-[90vh] flex flex-col"
          >
            {/* Handle bar */}
            <div className="flex items-center justify-center pt-4 pb-2">
              <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-6 pb-4 border-b border-border">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h2 className="text-xl font-display font-bold">
                    {order.id}
                  </h2>
                  <OrderStatusBadge status={order.status} />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onOpenChange(false)}
                  className="w-8 h-8 rounded-full"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>

            {/* Scrollable Content */}
            <ScrollArea className="flex-1 max-h-[calc(90vh-140px)]">
              <div className="p-6 space-y-6">
                {/* Customer Info */}
                <div className="space-y-3">
                  <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    Customer Details
                  </h3>
                  <div className="flex items-center gap-3 text-sm">
                    <User size={16} className="text-brand-gold" />
                    <span className="font-medium">{order.customerName}</span>
                  </div>
                  {order.phone && (
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Phone size={16} className="text-brand-gold" />
                      <span>{order.phone}</span>
                    </div>
                  )}
                  {order.address && (
                    <div className="flex items-start gap-3 text-sm text-muted-foreground">
                      <MapPin size={16} className="text-brand-gold shrink-0 mt-0.5" />
                      <span>{order.address}</span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Order Items */}
                <div className="space-y-3">
                  <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    Order Items
                  </h3>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-2"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                            <ShoppingBag size={14} className="text-brand-gold" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Qty: {item.quantity} × ₹{item.price}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-foreground">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Order Meta */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                      Order Date
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={14} className="text-brand-gold" />
                      <span className="font-medium">{formatDate(order.createdAt)}</span>
                    </div>
                  </div>
                  {order.driverName && (
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                        Assigned Driver
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <Truck size={14} className="text-brand-gold" />
                        <span className="font-medium">{order.driverName}</span>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Total */}
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-2xl">
                  <span className="font-bold text-muted-foreground">Total</span>
                  <span className="text-xl font-black text-foreground">₹{order.total}</span>
                </div>

                {/* Timeline */}
                {showTimeline && (
                  <>
                    <Separator />
                    <div className="space-y-3">
                      <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                        Delivery Progress
                      </h3>
                      <OrderTimeline order={order} />
                    </div>
                  </>
                )}
              </div>
            </ScrollArea>

            {/* Actions */}
            {actions && actions.length > 0 && (
              <div className="p-6 border-t border-border bg-background">
                <div className={cn(
                  'flex gap-3',
                  actions.length === 1 ? 'flex-col' : ''
                )}>
                  {actions.map((action, idx) => (
                    <Button
                      key={idx}
                      onClick={action.onClick}
                      variant={action.variant}
                      disabled={action.disabled}
                      className={cn(
                        'h-12 rounded-2xl font-bold',
                        action.variant === 'default' && 'bg-brand-black dark:bg-brand-gold text-brand-gold dark:text-brand-black'
                      )}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
