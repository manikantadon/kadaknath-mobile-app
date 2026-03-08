"use client";

import React, { useState } from 'react';
import MobileLayout from '@/components/MobileLayout';
import { Search, Filter, LogOut, User, Truck, CheckCircle2, Clock, Package, Warehouse } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useOrders } from '@/hooks/useOrders';
import { OrderDetailsDrawer } from '@/components/orders/OrderDetailsDrawer';
import { Order, OrderStatus } from '@/lib/orders';
import { cn } from '@/lib/utils';
import { showSuccess, showError } from '@/utils/toast';
import { useNavigate } from 'react-router-dom';

const STATUS_FILTERS: { value: string; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'CREATED', label: 'New' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'PACKING', label: 'Packing' },
  { value: 'READY_FOR_PICKUP', label: 'Ready' },
  { value: 'OUT_FOR_DELIVERY', label: 'Delivery' },
  { value: 'DELIVERED', label: 'Done' },
];

const statusIcons: Record<OrderStatus, React.ComponentType<{ size?: number }>> = {
  CREATED: Clock,
  CONFIRMED: CheckCircle2,
  PACKING: Package,
  READY_FOR_PICKUP: Warehouse,
  OUT_FOR_DELIVERY: Truck,
  DELIVERED: CheckCircle2,
  CANCELLED: User,
};

const AdminOrders = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const orderScope = React.useMemo(() => ({ type: 'all' as const }), []);
  const { orders, updateStatus, assignDriverAction, refreshOrders } = useOrders(orderScope);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = activeTab === 'all' || order.status === activeTab;
    const matchesSearch =
      searchQuery === '' ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleLogout = () => {
    showSuccess('Logged out successfully');
    navigate('/');
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    const updated = await updateStatus(orderId, newStatus);
    if (updated) {
      showSuccess(`Order ${newStatus.replace(/_/g, ' ')}`);
      refreshOrders();
      setSelectedOrder(null);
    }
  };

  const handleAssignDriver = async (orderId: string) => {
    const updated = await assignDriverAction(orderId, 'driver', 'Mike Driver');
    if (updated) {
      showSuccess('Driver assigned successfully');
      refreshOrders();
      setSelectedOrder(null);
    }
  };

  const getActionsForOrder = (order: Order) => {
    const actions: { label: string; onClick: () => void; variant?: 'default' | 'outline' | 'destructive' }[] = [];

    switch (order.status) {
      case 'CREATED':
        actions.push({
          label: 'Confirm Order',
          onClick: () => handleStatusChange(order.id, 'CONFIRMED'),
        });
        actions.push({
          label: 'Cancel Order',
          onClick: () => handleStatusChange(order.id, 'CANCELLED'),
          variant: 'destructive',
        });
        break;
      case 'CONFIRMED':
        actions.push({
          label: 'Move to Packing',
          onClick: () => handleStatusChange(order.id, 'PACKING'),
        });
        break;
      case 'PACKING':
        actions.push({
          label: 'Mark Ready for Pickup',
          onClick: () => handleStatusChange(order.id, 'READY_FOR_PICKUP'),
        });
        break;
      case 'READY_FOR_PICKUP':
        actions.push({
          label: 'Assign Driver',
          onClick: () => handleAssignDriver(order.id),
        });
        break;
      case 'OUT_FOR_DELIVERY':
        actions.push({
          label: 'Mark as Delivered',
          onClick: () => handleStatusChange(order.id, 'DELIVERED'),
        });
        break;
    }

    return actions;
  };

  return (
    <MobileLayout role="admin">
      <div className="px-6 pt-8 pb-24">
        <header className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground mb-1">Order Management</h1>
            <p className="text-muted-foreground text-sm">Track and manage customer orders</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:text-brand-red hover:bg-brand-red/5 transition-colors"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </header>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID or Customer..."
            className="pl-11 h-12 rounded-2xl border-border bg-muted/30"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-gold">
            <Filter size={18} />
          </button>
        </div>

        <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="w-full bg-muted p-1 rounded-xl h-12 overflow-x-auto">
            {STATUS_FILTERS.map((filter) => (
              <TabsTrigger
                key={filter.value}
                value={filter.value}
                className="flex-1 min-w-[60px] rounded-lg font-bold text-xs whitespace-nowrap"
              >
                {filter.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const StatusIcon = statusIcons[order.status];
            return (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="bg-card rounded-3xl p-5 border border-border shadow-sm cursor-pointer hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black text-brand-gold uppercase tracking-wider">{order.id}</span>
                      <Badge variant="outline" className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border border-brand-gold/30 bg-brand-gold/10 text-brand-gold">
                        <span className="mr-1"><StatusIcon size={12} /></span>
                        {order.status.replace(/_/g, ' ')}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-foreground">{order.customerName}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-foreground">₹{order.total}</div>
                    <div className="text-[10px] text-muted-foreground font-medium">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-2xl p-3 mb-4">
                  <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Items</div>
                  <div className="text-xs font-medium text-foreground">
                    {order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {order.driverName ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-brand-gold/20 rounded-full flex items-center justify-center text-[10px] font-bold text-brand-gold">
                          {order.driverName.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <span className="text-xs text-muted-foreground font-medium">{order.driverName}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground italic">No driver assigned</span>
                    )}
                  </div>
                  <button className="flex items-center gap-1 text-brand-gold text-xs font-bold">
                    View Details
                  </button>
                </div>
              </div>
            );
          })}

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">No orders found</p>
            </div>
          )}
        </div>
      </div>

      <OrderDetailsDrawer
        order={selectedOrder}
        open={!!selectedOrder}
        onOpenChange={(open) => !open && setSelectedOrder(null)}
        actions={selectedOrder ? getActionsForOrder(selectedOrder) : []}
        showTimeline
      />
    </MobileLayout>
  );
};

export default AdminOrders;
