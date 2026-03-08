"use client";

import React, { useState } from 'react';
import MobileLayout from '@/components/MobileLayout';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useOrders } from '@/hooks/useOrders';
import { OrderCard } from '@/components/orders/OrderCard';
import { OrderDetailsDrawer } from '@/components/orders/OrderDetailsDrawer';
import { Order } from '@/lib/orders';
import { Package } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CustomerOrders = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<Order | null>(null);

  const { orders, cancelOrderAction, refreshOrders } = useOrders({ type: 'customer', customerId: 'customer' });

  const activeOrders = orders.filter((o) => !['DELIVERED', 'CANCELLED'].includes(o.status));
  const completedOrders = orders.filter((o) => ['DELIVERED', 'CANCELLED'].includes(o.status));

  const requestCancelOrder = (order: Order, e: React.MouseEvent) => {
    e.stopPropagation();
    if (order.status !== 'CREATED') {
      showError('Only orders in CREATED status can be cancelled');
      return;
    }
    setOrderToCancel(order);
    setShowCancelDialog(true);
  };

  const handleCancelOrder = async () => {
    if (!orderToCancel) return;

    const updated = await cancelOrderAction(orderToCancel.id);
    if (updated) {
      showSuccess('Order cancelled successfully');
      refreshOrders();
    }
    setShowCancelDialog(false);
    setOrderToCancel(null);
  };

  const displayedOrders = activeTab === 'active' ? activeOrders : completedOrders;

  return (
    <MobileLayout role="customer">
      <div className="px-6 pt-8 pb-24">
        <h1 className="text-2xl font-display font-bold text-foreground mb-2">My Orders</h1>
        <p className="text-muted-foreground text-sm mb-6">Track your premium poultry deliveries.</p>

        <Tabs defaultValue="active" className="mb-6" onValueChange={(v) => setActiveTab(v as 'active' | 'completed')}>
          <TabsList className="w-full bg-muted p-1 rounded-2xl h-12">
            <TabsTrigger value="active" className="flex-1 rounded-xl font-bold text-xs data-[state=active]:bg-brand-black data-[state=active]:text-brand-gold">
              Active ({activeOrders.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex-1 rounded-xl font-bold text-xs data-[state=active]:bg-brand-black data-[state=active]:text-brand-gold">
              History ({completedOrders.length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {displayedOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={24} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">
              {activeTab === 'active' ? 'No active orders' : 'No order history'}
            </p>
            {activeTab === 'active' && (
              <Button
                onClick={() => navigate('/customer')}
                variant="outline"
                className="mt-4 h-12 rounded-2xl border-brand-gold text-brand-gold"
              >
                Browse Products
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {displayedOrders.map((order) => (
              <div key={order.id} className="relative">
                <OrderCard 
                  order={order} 
                  onClick={(e) => { e.stopPropagation(); setSelectedOrder(order); }}
                  onCancel={order.status === 'CREATED' && activeTab === 'active' ? (e) => requestCancelOrder(order, e) : undefined}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <OrderDetailsDrawer
        order={selectedOrder}
        open={!!selectedOrder}
        onOpenChange={(open) => !open && setSelectedOrder(null)}
        actions={
          selectedOrder?.status === 'CREATED'
            ? [
                {
                  label: 'Cancel Order',
                  onClick: () => {
                    setOrderToCancel(selectedOrder);
                    setShowCancelDialog(true);
                    setSelectedOrder(null);
                  },
                  variant: 'destructive',
                },
              ]
            : []
        }
        showTimeline
      />

      {/* Custom Confirmation Dialog */}
      <AnimatePresence>
        {showCancelDialog && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCancelDialog(false)}
              className="fixed inset-0 bg-black/80 z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-6 pointer-events-none"
            >
              <div className="bg-card rounded-[2rem] p-6 max-w-[320px] w-full border border-border shadow-xl pointer-events-auto">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">
                    Cancel Order?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    This action cannot be undone. Are you sure you want to cancel order{' '}
                    <span className="font-bold text-foreground">{orderToCancel?.id}</span>?
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={() => setShowCancelDialog(false)}
                    variant="outline"
                    className="h-12 rounded-2xl font-bold"
                  >
                    Keep Order
                  </Button>
                  <Button
                    onClick={handleCancelOrder}
                    className="h-12 rounded-2xl bg-brand-red text-white hover:bg-brand-red/90 font-bold"
                  >
                    Yes, Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </MobileLayout>
  );
};

export default CustomerOrders;
