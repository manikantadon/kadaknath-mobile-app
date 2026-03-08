"use client";

import React, { useState } from 'react';
import MobileLayout from '@/components/MobileLayout';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useOrders } from '@/hooks/useOrders';
import { OrderCard } from '@/components/orders/OrderCard';
import { OrderDetailsDrawer } from '@/components/orders/OrderDetailsDrawer';
import { Order, OrderStatus } from '@/lib/orders';
import { Package, RotateCcw, AlertCircle } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { useNavigate } from 'react-router-dom';

const CustomerOrders = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { orders, cancelOrderAction, refreshOrders } = useOrders({ type: 'customer', customerId: 'customer' });

  const activeOrders = orders.filter((o) => !['DELIVERED', 'CANCELLED'].includes(o.status));
  const completedOrders = orders.filter((o) => ['DELIVERED', 'CANCELLED'].includes(o.status));

  const handleCancelOrder = async (orderId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const order = orders.find((o) => o.id === orderId);
    if (order?.status !== 'CREATED') {
      showError('Only orders in CREATED status can be cancelled');
      return;
    }

    const updated = await cancelOrderAction(orderId);
    if (updated) {
      showSuccess('Order cancelled successfully');
      refreshOrders();
    }
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
                <OrderCard order={order} onClick={() => setSelectedOrder(order)} />
                {order.status === 'CREATED' && activeTab === 'active' && (
                  <Button
                    onClick={(e) => handleCancelOrder(order.id, e)}
                    variant="destructive"
                    size="sm"
                    className="absolute top-4 right-4 h-8 w-8 p-0 rounded-full"
                  >
                    <RotateCcw size={14} />
                  </Button>
                )}
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
                  onClick: async () => {
                    const updated = await cancelOrderAction(selectedOrder.id);
                    if (updated) {
                      showSuccess('Order cancelled successfully');
                      refreshOrders();
                      setSelectedOrder(null);
                    }
                  },
                  variant: 'destructive',
                },
              ]
            : []
        }
        showTimeline
      />
    </MobileLayout>
  );
};

export default CustomerOrders;
