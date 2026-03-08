"use client";

import React, { useState } from 'react';
import MobileLayout from '@/components/MobileLayout';
import { MapPin, Phone, CheckCircle, Navigation, LogOut, Package, Truck, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useOrders } from '@/hooks/useOrders';
import { OrderDetailsDrawer } from '@/components/orders/OrderDetailsDrawer';
import { Order, OrderStatus } from '@/lib/orders';
import { OrderStatusBadge } from '@/components/orders/OrderStatusBadge';
import { showSuccess, showError } from '@/utils/toast';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const DriverDeliveries = () => {
  const navigate = useNavigate();
  const [showOtp, setShowOtp] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [otpValue, setOtpValue] = useState('');

  const orderScope = React.useMemo(() => ({ type: 'driver' as const, driverId: 'driver' }), []);
  const { orders, updateStatus, refreshOrders } = useOrders(orderScope);

  const handleLogout = () => {
    showSuccess('Logged out successfully');
    navigate('/');
  };

  const handlePickupOrder = async (orderId: string) => {
    const updated = await updateStatus(orderId, 'OUT_FOR_DELIVERY');
    if (updated) {
      showSuccess('Order picked up - Out for delivery!');
      refreshOrders();
      setSelectedOrder(null);
    }
  };

  const handleMarkDelivered = async () => {
    if (!selectedOrder) return;
    if (otpValue.length !== 4) {
      showError('Please enter 4-digit OTP');
      return;
    }
    const updated = await updateStatus(selectedOrder.id, 'DELIVERED');
    if (updated) {
      showSuccess('Delivery completed successfully!');
      refreshOrders();
      setSelectedOrder(null);
      setShowOtp(null);
      setOtpValue('');
    }
  };

  const getActionsForOrder = (order: Order) => {
    const actions: { label: string; onClick: () => void; variant?: 'default' | 'outline' | 'destructive'; icon?: React.ReactNode }[] = [];

    if (order.status === 'READY_FOR_PICKUP') {
      actions.push({
        label: 'Pickup Order',
        onClick: () => handlePickupOrder(order.id),
        icon: <Truck size={18} />,
      });
    } else if (order.status === 'OUT_FOR_DELIVERY') {
      actions.push({
        label: 'Mark as Delivered',
        onClick: () => setShowOtp(order.id),
        icon: <CheckCircle size={18} />,
      });
    }

    return actions;
  };

  return (
    <MobileLayout role="driver">
      <div className="px-6 pt-8 pb-24">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground mb-2">My Deliveries</h1>
            <p className="text-muted-foreground text-sm">
              You have {orders.length} pending {orders.length === 1 ? 'delivery' : 'deliveries'}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:text-brand-red hover:bg-brand-red/5 transition-colors"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </header>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={24} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">No pending deliveries</p>
            <p className="text-muted-foreground text-sm mt-2">Check back later for new assignments</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                layout
                onClick={() => setSelectedOrder(order)}
                className="bg-card rounded-3xl p-6 border border-border shadow-sm cursor-pointer hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <OrderStatusBadge status={order.status} />
                  <button className="text-muted-foreground hover:text-brand-gold transition-colors">
                    <Navigation size={20} />
                  </button>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-1">{order.customerName}</h3>

                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                  <MapPin size={14} className="text-brand-gold" />
                  <span className="line-clamp-1">{order.address}</span>
                </div>

                <div className="bg-muted/50 rounded-2xl p-4 mb-6">
                  <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">
                    Order Items
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                  </div>
                  <div className="text-xs font-black text-foreground mt-2">
                    Total: ₹{order.total}
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href={`tel:${order.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 bg-muted text-foreground h-12 rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-muted/80 transition-colors"
                  >
                    <Phone size={18} />
                    Call
                  </a>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (order.status === 'READY_FOR_PICKUP') {
                        handlePickupOrder(order.id);
                      } else if (order.status === 'OUT_FOR_DELIVERY') {
                        setShowOtp(order.id);
                      }
                    }}
                    className="flex-[2] h-12 rounded-2xl font-bold gap-2 bg-brand-black dark:bg-brand-gold text-brand-gold dark:text-brand-black"
                  >
                    {order.status === 'READY_FOR_PICKUP' ? (
                      <>
                        <Truck size={18} />
                        Pickup
                      </>
                    ) : (
                      <>
                        <CheckCircle size={18} />
                        Complete
                      </>
                    )}
                  </Button>
                </div>

                <AnimatePresence>
                  {showOtp === order.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 mt-6 border-t border-border">
                        <div className="flex items-center gap-2 mb-3 text-brand-gold">
                          <CheckCircle size={16} />
                          <span className="text-sm font-bold">Enter Delivery OTP</span>
                        </div>
                        <div className="flex gap-2">
                          <Input
                            value={otpValue}
                            onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, '').slice(0, 4))}
                            placeholder="0 0 0 0"
                            className="h-12 text-center text-xl font-black tracking-[1em] rounded-xl border-border bg-muted/30"
                            maxLength={4}
                          />
                          <Button
                            onClick={handleMarkDelivered}
                            className="bg-brand-black dark:bg-brand-gold text-brand-gold dark:text-brand-black px-6 rounded-xl font-bold h-12"
                          >
                            Verify
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <OrderDetailsDrawer
        order={selectedOrder}
        open={!!selectedOrder}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedOrder(null);
            setShowOtp(null);
            setOtpValue('');
          }
        }}
        actions={selectedOrder ? getActionsForOrder(selectedOrder) : []}
        showTimeline={false}
      />
    </MobileLayout>
  );
};

export default DriverDeliveries;
