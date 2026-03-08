import React from 'react';
import { Order } from '@/lib/orders';
import { OrderStatusBadge } from './OrderStatusBadge';
import { ShoppingBag, Calendar, MapPin, X, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface OrderCardProps {
  order: Order;
  onViewDetails: () => void;
  onCancel?: () => void;
  className?: string;
}

export const OrderCard = ({ order, onViewDetails, onCancel, className }: OrderCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const canCancel = order.status === 'CREATED';

  return (
    <div
      onClick={onViewDetails}
      className={cn(
        'bg-card rounded-[2rem] p-5 border border-border shadow-sm cursor-pointer active:scale-[0.98] transition-all',
        className
      )}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">
            Order ID
          </p>
          <h3 className="font-bold text-foreground text-base">{order.id}</h3>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {/* Order Info */}
      <div className="space-y-2.5 mb-4">
        <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
          <div className="w-6 h-6 bg-brand-gold/10 rounded-lg flex items-center justify-center shrink-0">
            <ShoppingBag size={12} className="text-brand-gold" />
          </div>
          <span>{order.items.length} item(s) • <span className="font-bold text-foreground">₹{order.total}</span></span>
        </div>

        <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
          <div className="w-6 h-6 bg-brand-gold/10 rounded-lg flex items-center justify-center shrink-0">
            <Calendar size={12} className="text-brand-gold" />
          </div>
          <span>{formatDate(order.createdAt)}</span>
        </div>

        {order.address && (
          <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
            <div className="w-6 h-6 bg-brand-gold/10 rounded-lg flex items-center justify-center shrink-0 mt-0">
              <MapPin size={12} className="text-brand-gold" />
            </div>
            <span className="line-clamp-2">{order.address}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border gap-3">
        <div>
          <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
            Total Paid
          </span>
          <p className="text-xl font-black text-brand-gold mt-0.5">₹{order.total}</p>
        </div>
        
        <div className="flex gap-2">
          {canCancel && onCancel && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onCancel();
              }}
              variant="outline"
              size="sm"
              className="h-9 px-3 rounded-xl border-brand-red/50 text-brand-red hover:bg-brand-red/10 hover:border-brand-red font-bold text-[10px] uppercase tracking-wider"
            >
              <X size={14} className="mr-1" />
              Cancel
            </Button>
          )}
          <Button
            onClick={onViewDetails}
            variant="default"
            size="sm"
            className="h-9 px-3 rounded-xl bg-brand-black dark:bg-brand-gold text-brand-gold dark:text-brand-black font-bold text-[10px] uppercase tracking-wider"
          >
            <Eye size={14} className="mr-1" />
            View
          </Button>
        </div>
      </div>
    </div>
  );
};
