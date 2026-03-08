import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { OrderStatus } from '@/lib/orders';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const statusConfig: Record<OrderStatus, { label: string; variant: string; icon?: string }> = {
  CREATED: { label: 'Created', variant: 'bg-slate-500/20 text-slate-400 border-slate-500/30' },
  CONFIRMED: { label: 'Confirmed', variant: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  PACKING: { label: 'Packing', variant: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  READY_FOR_PICKUP: { label: 'Ready for Pickup', variant: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  OUT_FOR_DELIVERY: { label: 'Out for Delivery', variant: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  DELIVERED: { label: 'Delivered', variant: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  CANCELLED: { label: 'Cancelled', variant: 'bg-red-500/20 text-red-400 border-red-500/30' },
};

export const OrderStatusBadge = ({ status, className }: OrderStatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <Badge
      className={cn(
        'font-bold text-[10px] uppercase tracking-widest border',
        config.variant,
        className
      )}
    >
      {config.label}
    </Badge>
  );
};
