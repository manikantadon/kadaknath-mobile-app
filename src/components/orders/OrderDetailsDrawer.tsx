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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-xl font-display font-bold">
                {order.id}
              </DialogTitle>
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
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-180px)]">
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
      </DialogContent>
    </Dialog>
  );
};
