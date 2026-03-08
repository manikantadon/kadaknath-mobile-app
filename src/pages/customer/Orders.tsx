"use client";

import React, { useState } from 'react';
import MobileLayout from '@/components/MobileLayout';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useOrders } from '@/hooks/useOrders';
import { OrderCard } from '@/components/orders/OrderCard';
import { OrderDetailsDrawer } from '@/components/orders/OrderDetailsDrawer';
import { CancelConfirmationDialog } from '@/components/orders/CancelConfirmationDialog';
import { Order } from '@/lib/orders';
import { Package } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { useNavigate } from 'react-router-dom';

const CustomerOrders = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<Order | null>(null);

  const orderScope = React.useMemo(() => ({ type: 'customer' as const, customerId: 'customer' }), []);
  const { orders, cancelOrderAction, refreshOrders } = useOrders(orderScope);

  const activeOrders = orders.filter((o) => !['DELIVERED', 'CANCELLED'].includes(o.status));
  const completedOrders = orders.filter((o) => ['DELIVERED', 'CANCELLED'].includes(o.status));

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedOrder(null), 300);
  };

  const handleRequestCancel = (order: Order) => {
    if (order.status !== 'CREATED') {
      showError('Only orders in CREATED status can be cancelled');
      return;
    }
    setOrderToCancel(order);
    setCancelDialogOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!orderToCancel) return;

    const updated = await cancelOrderAction(orderToCancel.id);
    if (updated) {
      showSuccess('Order cancelled successfully');
      refreshOrders();
    }
    setCancelDialogOpen(false);
    setOrderToCancel(null);
  };

  const handleCancelFromDrawer = () => {
    if (selectedOrder) {
      setOrderToCancel(selectedOrder);
      setCancelDialogOpen(true);
      handleCloseDrawer();
    }
  };

  const displayedOrders = activeTab === 'active' ? activeOrders : completedOrders;

  return (
    <MobileLayout role="customer">
      <div className="px-6 pt-8 pb-24">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">My Orders</h1>
          <p className="text-muted-foreground text-sm">Track your premium poultry deliveries</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="active" className="mb-6" onValueChange={(v) => setActiveTab(v as 'active' | 'completed')}>
          <TabsList className="w-full bg-muted p-1 rounded-2xl h-12">
            <TabsTrigger value="active" className="flex-1 rounded-xl font-bold text-xs data-[state=active]:bg-brand-black data-[state=active]:text-brand-gold transition-all">
              Active ({activeOrders.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex-1 rounded-xl font-bold text-xs data-[state=active]:bg-brand-black data-[state=active]:text-brand-gold transition-all">
              History ({completedOrders.length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Orders List */}
        {displayedOrders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-5">
              <Package size={32} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium text-sm">
              {activeTab === 'active' ? 'No active orders' : 'No order history'}
            </p>
            {activeTab === 'active' && (
              <Button
                onClick={() => navigate('/customer')}
                variant="outline"
                className="mt-5 h-12 rounded-2xl border-brand-gold text-brand-gold font-bold text-sm"
              >
                Browse Products
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {displayedOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onViewDetails={() => handleViewDetails(order)}
                onCancel={order.status === 'CREATED' && activeTab === 'active' ? () => handleRequestCancel(order) : undefined}
              />
            ))}
          </div>
        )}
      </div>

      {/* Order Details Drawer - z-[90-91] */}
      <OrderDetailsDrawer
        order={selectedOrder}
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        onCancelOrder={handleCancelFromDrawer}
        showTimeline
      />

      {/* Cancel Confirmation Dialog - z-[100-101] */}
      <CancelConfirmationDialog
        open={cancelDialogOpen}
        orderId={orderToCancel?.id || null}
        onConfirm={handleConfirmCancel}
        onCancel={() => {
          setCancelDialogOpen(false);
          setOrderToCancel(null);
        }}
      />
    </MobileLayout>
  );
};

export default CustomerOrders;
