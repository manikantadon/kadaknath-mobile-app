import React from 'react';
import { Order, OrderStatus } from '@/lib/orders';
import { CheckCircle2, Circle, Package, Truck, Home, XCircle, ClipboardCheck, Warehouse } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrderTimelineProps {
  order: Order;
  className?: string;
}

const STATUS_STEPS: { status: OrderStatus; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { status: 'CREATED', label: 'Order Placed', icon: Circle },
  { status: 'CONFIRMED', label: 'Confirmed', icon: ClipboardCheck },
  { status: 'PACKING', label: 'Packing', icon: Package },
  { status: 'READY_FOR_PICKUP', label: 'Ready for Pickup', icon: Warehouse },
  { status: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', icon: Truck },
  { status: 'DELIVERED', label: 'Delivered', icon: Home },
];

const STATUS_PRIORITY: Record<OrderStatus, number> = {
  CREATED: 0,
  CONFIRMED: 1,
  PACKING: 2,
  READY_FOR_PICKUP: 3,
  OUT_FOR_DELIVERY: 4,
  DELIVERED: 5,
  CANCELLED: -1,
};

export const OrderTimeline = ({ order, className }: OrderTimelineProps) => {
  const currentPriority = STATUS_PRIORITY[order.status];
  const isCancelled = order.status === 'CANCELLED';

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'N/A';
      return date.toLocaleString('en-IN', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      return 'N/A';
    }
  };

  if (isCancelled) {
    return (
      <div className={cn('space-y-4', className)}>
        <div className="flex items-center gap-4 p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
          <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
            <XCircle size={20} />
          </div>
          <div>
            <p className="font-bold text-red-500">Order Cancelled</p>
            <p className="text-xs text-red-400">{formatDate(order.updatedAt)}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-0 relative', className)}>
      {STATUS_STEPS.map((step, index) => {
        const stepPriority = STATUS_PRIORITY[step.status];
        const isCompleted = stepPriority <= currentPriority;
        const isCurrent = stepPriority === currentPriority;
        const Icon = step.icon;

        return (
          <div key={step.status} className="flex gap-4 relative">
            {/* Timeline line */}
            {index < STATUS_STEPS.length - 1 && (
              <div
                className={cn(
                  'absolute left-5 top-10 w-[2px] h-[calc(100%-24px)]',
                  isCompleted ? 'bg-brand-gold' : 'bg-muted'
                )}
              />
            )}

            {/* Icon */}
            <div
              className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border-2 transition-colors z-10',
                isCompleted
                  ? 'bg-brand-gold text-brand-black border-brand-gold'
                  : 'bg-muted text-slate-400 border-muted'
              )}
            >
              <Icon size={18} strokeWidth={2.5} />
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              <div className="flex justify-between items-center mb-1">
                <h4
                  className={cn(
                    'font-bold text-sm',
                    isCompleted ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {step.label}
                </h4>
                {isCompleted && (
                  <CheckCircle2 size={14} className="text-brand-gold" />
                )}
              </div>
              {isCurrent && (
                <p className="text-[10px] font-black text-brand-gold uppercase tracking-widest">
                  {order.status === 'DELIVERED' ? 'Completed' : 'In Progress'}
                </p>
              )}
              {isCompleted && (
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDate(order.createdAt)}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
