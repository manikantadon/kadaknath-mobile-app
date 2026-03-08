"use client";

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { ordersApi } from '@/lib/api/orders.api';
import { driversApi } from '@/lib/api/drivers.api';
import { Order, OrderStatus } from '@/lib/orders';
import { Driver } from '@/lib/api/drivers.api';
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  Truck,
  CheckCircle,
  Clock,
  Package,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { OrderDetailsDrawer } from '@/components/orders/OrderDetailsDrawer';
import { CancelConfirmationDialog } from '@/components/orders/CancelConfirmationDialog';
import { showSuccess, showError } from '@/utils/toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const statusColors: Record<OrderStatus, string> = {
  CREATED: 'bg-slate-500/20 text-slate-400',
  CONFIRMED: 'bg-blue-500/20 text-blue-400',
  PACKING: 'bg-yellow-500/20 text-yellow-400',
  READY_FOR_PICKUP: 'bg-orange-500/20 text-orange-400',
  OUT_FOR_DELIVERY: 'bg-purple-500/20 text-purple-400',
  DELIVERED: 'bg-emerald-500/20 text-emerald-400',
  CANCELLED: 'bg-red-500/20 text-red-400',
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>(ordersApi.getOrders());
  const [drivers] = useState<Driver[]>(driversApi.getActiveDrivers());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<Order | null>(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [orderToAssign, setOrderToAssign] = useState<Order | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<string>('');

  // Refresh orders every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(ordersApi.getOrders());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedOrder(null), 300);
  };

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    const updated = ordersApi.updateOrderStatus(orderId, newStatus);
    if (updated) {
      setOrders(ordersApi.getOrders());
      showSuccess(`Order status updated to ${newStatus.replace(/_/g, ' ')}`);
      handleCloseDrawer();
    }
  };

  const handleRequestCancel = (order: Order) => {
    setOrderToCancel(order);
    setCancelDialogOpen(true);
    handleCloseDrawer();
  };

  const handleConfirmCancel = async () => {
    if (!orderToCancel) return;
    const updated = ordersApi.cancelOrder(orderToCancel.id);
    if (updated) {
      setOrders(ordersApi.getOrders());
      showSuccess('Order cancelled successfully');
    }
    setCancelDialogOpen(false);
    setOrderToCancel(null);
  };

  const handleOpenAssignDialog = (order: Order) => {
    setOrderToAssign(order);
    setSelectedDriver(order.driverId || '');
    setAssignDialogOpen(true);
    handleCloseDrawer();
  };

  const handleAssignDriver = () => {
    if (!orderToAssign || !selectedDriver) {
      showError('Please select a driver');
      return;
    }
    const driver = drivers.find((d) => d.id === selectedDriver);
    if (driver) {
      const updated = ordersApi.assignDriver(orderToAssign.id, driver.id, driver.name);
      if (updated) {
        setOrders(ordersApi.getOrders());
        showSuccess(`Driver ${driver.name} assigned to order`);
      }
    }
    setAssignDialogOpen(false);
    setOrderToAssign(null);
  };

  const getAvailableActions = (order: Order) => {
    const actions: { label: string; onClick: () => void; variant?: 'default' | 'outline' | 'destructive' }[] = [];

    switch (order.status) {
      case 'CREATED':
        actions.push({
          label: 'Confirm Order',
          onClick: () => handleUpdateStatus(order.id, 'CONFIRMED'),
        });
        actions.push({
          label: 'Cancel Order',
          onClick: () => handleRequestCancel(order),
          variant: 'destructive' as const,
        });
        break;
      case 'CONFIRMED':
        actions.push({
          label: 'Mark as Packing',
          onClick: () => handleUpdateStatus(order.id, 'PACKING'),
        });
        break;
      case 'PACKING':
        actions.push({
          label: 'Mark Ready for Pickup',
          onClick: () => handleUpdateStatus(order.id, 'READY_FOR_PICKUP'),
        });
        break;
      case 'READY_FOR_PICKUP':
        actions.push({
          label: 'Assign Driver',
          onClick: () => handleOpenAssignDialog(order),
        });
        break;
      case 'OUT_FOR_DELIVERY':
        actions.push({
          label: 'Mark as Delivered',
          onClick: () => handleUpdateStatus(order.id, 'DELIVERED'),
        });
        break;
    }

    return actions;
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'CREATED':
        return Clock;
      case 'CONFIRMED':
        return CheckCircle;
      case 'PACKING':
        return Package;
      case 'READY_FOR_PICKUP':
      case 'OUT_FOR_DELIVERY':
        return Truck;
      case 'DELIVERED':
        return CheckCircle;
      case 'CANCELLED':
        return X;
      default:
        return Clock;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Orders</h1>
            <p className="text-muted-foreground text-sm">Manage and track all orders</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order ID or Customer..."
              className="pl-11 h-12 rounded-2xl border-border bg-muted/30"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-12 rounded-2xl border-border bg-muted/30 w-full sm:w-[200px]">
              <Filter size={18} className="mr-2 text-muted-foreground" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="CREATED">Created</SelectItem>
              <SelectItem value="CONFIRMED">Confirmed</SelectItem>
              <SelectItem value="PACKING">Packing</SelectItem>
              <SelectItem value="READY_FOR_PICKUP">Ready for Pickup</SelectItem>
              <SelectItem value="OUT_FOR_DELIVERY">Out for Delivery</SelectItem>
              <SelectItem value="DELIVERED">Delivered</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders Table */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30 border-b border-border">
                <tr>
                  <th className="text-left py-4 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    Order
                  </th>
                  <th className="text-left py-4 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    Customer
                  </th>
                  <th className="text-left py-4 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    Total
                  </th>
                  <th className="text-left py-4 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    Driver
                  </th>
                  <th className="text-right py-4 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredOrders.map((order) => {
                  const StatusIcon = getStatusIcon(order.status);
                  return (
                    <tr key={order.id} className="hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-bold text-foreground text-sm">{order.id}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString('en-IN', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-bold text-foreground text-sm">{order.customerName}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                            {order.items.length} items
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge className={`${statusColors[order.status]} border-none font-bold text-[10px] uppercase`}>
                          <StatusIcon size={10} className="mr-1" />
                          {order.status.replace(/_/g, ' ')}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-black text-brand-gold">₹{order.total}</span>
                      </td>
                      <td className="py-4 px-6">
                        {order.driverName ? (
                          <div className="flex items-center gap-2">
                            <Truck size={14} className="text-brand-gold" />
                            <span className="font-medium text-foreground text-sm">{order.driverName}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">Not assigned</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            onClick={() => handleViewDetails(order)}
                            variant="ghost"
                            size="sm"
                            className="h-8 px-3 rounded-lg text-brand-gold hover:bg-brand-gold/10 font-bold text-xs"
                          >
                            <Eye size={14} className="mr-1" />
                            View
                          </Button>
                          {order.status === 'READY_FOR_PICKUP' && (
                            <Button
                              onClick={() => handleOpenAssignDialog(order)}
                              variant="ghost"
                              size="sm"
                              className="h-8 px-3 rounded-lg text-brand-gold hover:bg-brand-gold/10 font-bold text-xs"
                            >
                              <Truck size={14} className="mr-1" />
                              Assign
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={24} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">No orders found</p>
          </div>
        )}
      </div>

      {/* Order Details Drawer */}
      <OrderDetailsDrawer
        order={selectedOrder}
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        onCancelOrder={selectedOrder?.status === 'CREATED' ? () => handleRequestCancel(selectedOrder) : undefined}
        showTimeline
      />

      {/* Cancel Confirmation Dialog */}
      <CancelConfirmationDialog
        open={cancelDialogOpen}
        orderId={orderToCancel?.id || null}
        onConfirm={handleConfirmCancel}
        onCancel={() => {
          setCancelDialogOpen(false);
          setOrderToCancel(null);
        }}
      />

      {/* Assign Driver Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Driver</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                Select Driver
              </label>
              <Select value={selectedDriver} onValueChange={setSelectedDriver}>
                <SelectTrigger className="h-11 rounded-xl border-border bg-muted/30">
                  <SelectValue placeholder="Choose a driver" />
                </SelectTrigger>
                <SelectContent>
                  {drivers.map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                      {driver.name} - {driver.currentOrders} active orders
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => setAssignDialogOpen(false)}
                variant="outline"
                className="flex-1 h-11 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAssignDriver}
                className="flex-1 h-11 rounded-xl bg-brand-gold text-brand-black font-bold"
              >
                Assign Driver
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminOrders;
