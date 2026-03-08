import React from 'react';
import { Order } from '@/lib/orders';
import { OrderStatusBadge } from './OrderStatusBadge';
import { ShoppingBag, Calendar, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrderCardProps {
  order: Order;
  onClick?: () => void;
  className?: string;
}

export const OrderCard = ({ order, onClick, className }: OrderCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-card rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-all cursor-pointer',
        className
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">
            Order ID
          </p>
          <h3 className="font-bold text-foreground">{order.id}</h3>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <ShoppingBag size={14} className="text-brand-gold" />
          <span>{order.items.length} item(s) • ₹{order.total}</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <Calendar size={14} className="text-brand-gold" />
          <span>{formatDate(order.createdAt)}</span>
        </div>

        {order.address && (
          <div className="flex items-start gap-3 text-xs text-muted-foreground">
            <MapPin size={14} className="text-brand-gold shrink-0 mt-0.5" />
            <span className="line-clamp-2">{order.address}</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
            {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
          </span>
          <span className="text-sm font-black text-foreground">₹{order.total}</span>
        </div>
      </div>
    </div>
  );
};
