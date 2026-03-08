"use client";

import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { ordersApi } from '@/lib/api/orders.api';
import { customersApi } from '@/lib/api/customers.api';
import { productsApi } from '@/lib/api/products.api';
import {
  ShoppingBag,
  Package,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  Truck,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const DashboardCard = ({
  title,
  value,
  icon: Icon,
  trend,
  color,
}: {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ size?: number }>;
  trend?: string;
  color: string;
}) => (
  <Card className="border-border bg-card shadow-sm">
    <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 pt-4 space-y-0">
      <CardTitle className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">
        {title}
      </CardTitle>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
        <Icon size={14} />
      </div>
    </CardHeader>
    <CardContent className="px-4 pb-4">
      <div className="text-xl font-black text-foreground mb-0.5">{value}</div>
      {trend && (
        <div className="flex items-center gap-1 text-[9px] text-emerald-500 font-bold whitespace-nowrap">
          <TrendingUp size={10} />
          {trend.split(' from ')[0]}
        </div>
      )}
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const orders = ordersApi.getOrders();
  const customers = customersApi.getCustomers();
  const products = productsApi.getProducts();

  const todayOrders = ordersApi.getTodayOrders();
  const pendingOrders = ordersApi.getPendingOrders();
  const deliveredToday = todayOrders.filter((o) => o.status === 'DELIVERED').length;
  const revenueToday = todayOrders
    .filter((o) => o.status === 'DELIVERED')
    .reduce((sum, o) => sum + o.total, 0);

  const statusCounts = {
    CREATED: orders.filter((o) => o.status === 'CREATED').length,
    CONFIRMED: orders.filter((o) => o.status === 'CONFIRMED').length,
    PACKING: orders.filter((o) => o.status === 'PACKING').length,
    READY_FOR_PICKUP: orders.filter((o) => o.status === 'READY_FOR_PICKUP').length,
    OUT_FOR_DELIVERY: orders.filter((o) => o.status === 'OUT_FOR_DELIVERY').length,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground text-sm">Overview of your Kadaknath Pro business</p>
          </div>
          <Button
            onClick={() => navigate('/admin/orders')}
            className="h-11 rounded-2xl bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold"
          >
            <ShoppingBag size={18} className="mr-2" />
            View Orders
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard
            title="Orders Today"
            value={todayOrders.length}
            icon={ShoppingBag}
            trend="+12% from yesterday"
            color="bg-brand-gold/10 text-brand-gold"
          />
          <DashboardCard
            title="Revenue Today"
            value={`₹${revenueToday}`}
            icon={DollarSign}
            trend="+8% from yesterday"
            color="bg-emerald-500/10 text-emerald-500"
          />
          <DashboardCard
            title="Pending Orders"
            value={pendingOrders.length}
            icon={Clock}
            color="bg-amber-500/10 text-amber-500"
          />
          <DashboardCard
            title="Total Customers"
            value={customers.length}
            icon={Users}
            trend="+3 new this week"
            color="bg-blue-500/10 text-blue-500"
          />
        </div>

        {/* Order Status Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Orders by Status */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                <Package size={20} className="text-brand-gold" />
                Orders by Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-500/10 rounded-lg flex items-center justify-center">
                    <Package size={14} className="text-slate-500" />
                  </div>
                  <span className="font-medium text-foreground text-sm">Created</span>
                </div>
                <span className="font-bold text-foreground">{statusCounts.CREATED}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <CheckCircle size={14} className="text-blue-500" />
                  </div>
                  <span className="font-medium text-foreground text-sm">Confirmed</span>
                </div>
                <span className="font-bold text-foreground">{statusCounts.CONFIRMED}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                    <Package size={14} className="text-yellow-500" />
                  </div>
                  <span className="font-medium text-foreground text-sm">Packing</span>
                </div>
                <span className="font-bold text-foreground">{statusCounts.PACKING}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
                    <Truck size={14} className="text-orange-500" />
                  </div>
                  <span className="font-medium text-foreground text-sm">Ready for Pickup</span>
                </div>
                <span className="font-bold text-foreground">{statusCounts.READY_FOR_PICKUP}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <Truck size={14} className="text-purple-500" />
                  </div>
                  <span className="font-medium text-foreground text-sm">Out for Delivery</span>
                </div>
                <span className="font-bold text-foreground">{statusCounts.OUT_FOR_DELIVERY}</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                <TrendingUp size={20} className="text-brand-gold" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => navigate('/admin/orders')}
                variant="outline"
                className="w-full h-12 rounded-xl justify-start border-border font-bold"
              >
                <ShoppingBag size={18} className="mr-3 text-brand-gold" />
                Manage Orders
              </Button>
              <Button
                onClick={() => navigate('/admin/products')}
                variant="outline"
                className="w-full h-12 rounded-xl justify-start border-border font-bold"
              >
                <Package size={18} className="mr-3 text-brand-gold" />
                Manage Products
              </Button>
              <Button
                onClick={() => navigate('/admin/customers')}
                variant="outline"
                className="w-full h-12 rounded-xl justify-start border-border font-bold"
              >
                <Users size={18} className="mr-3 text-brand-gold" />
                View Customers
              </Button>
              <Button
                onClick={() => navigate('/admin/drivers')}
                variant="outline"
                className="w-full h-12 rounded-xl justify-start border-border font-bold"
              >
                <Truck size={18} className="mr-3 text-brand-gold" />
                Manage Drivers
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
              <ShoppingBag size={20} className="text-brand-gold" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center">
                      <Package size={16} className="text-brand-gold" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm">{order.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.items.length} items • ₹{order.total}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground font-medium">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-[10px] font-bold text-brand-gold uppercase tracking-wider">
                      {order.status.replace(/_/g, ' ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
