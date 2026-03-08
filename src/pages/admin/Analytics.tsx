"use client";

import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { ordersApi } from '@/lib/api/orders.api';
import { productsApi } from '@/lib/api/products.api';
import { customersApi } from '@/lib/api/customers.api';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  Star,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminAnalytics = () => {
  const orders = ordersApi.getOrders();
  const products = productsApi.getProducts();
  const customers = customersApi.getCustomers();

  const totalRevenue = orders
    .filter((o) => o.status === 'DELIVERED')
    .reduce((sum, o) => sum + o.total, 0);

  const avgOrderValue = orders.length > 0
    ? totalRevenue / orders.filter((o) => o.status === 'DELIVERED').length
    : 0;

  const topProducts = products
    .map((p) => ({
      ...p,
      orders: Math.floor(Math.random() * 50) + 1,
    }))
    .sort((a, b) => b.orders - a.orders)
    .slice(0, 5);

  const topCustomers = customers
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5);

  const ordersByDay = [
    { day: 'Mon', orders: 12, revenue: 8500 },
    { day: 'Tue', orders: 18, revenue: 12300 },
    { day: 'Wed', orders: 15, revenue: 10200 },
    { day: 'Thu', orders: 22, revenue: 15800 },
    { day: 'Fri', orders: 28, revenue: 19500 },
    { day: 'Sat', orders: 25, revenue: 17200 },
    { day: 'Sun', orders: 20, revenue: 14100 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground text-sm">Business insights and performance metrics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                Total Revenue
              </CardTitle>
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                <DollarSign size={18} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-foreground">₹{totalRevenue.toLocaleString()}</div>
              <div className="flex items-center gap-1 text-xs text-emerald-500 font-bold mt-1">
                <TrendingUp size={12} />
                +15% this month
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                Avg Order Value
              </CardTitle>
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                <ShoppingBag size={18} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-foreground">₹{Math.round(avgOrderValue)}</div>
              <div className="flex items-center gap-1 text-xs text-emerald-500 font-bold mt-1">
                <TrendingUp size={12} />
                +8% this month
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                Total Orders
              </CardTitle>
              <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold">
                <Package size={18} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-foreground">{orders.length}</div>
              <div className="flex items-center gap-1 text-xs text-emerald-500 font-bold mt-1">
                <TrendingUp size={12} />
                +22% this month
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                Total Customers
              </CardTitle>
              <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500">
                <Users size={18} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-foreground">{customers.length}</div>
              <div className="flex items-center gap-1 text-xs text-emerald-500 font-bold mt-1">
                <TrendingUp size={12} />
                +5 new this week
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Orders Chart */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                <TrendingUp size={20} className="text-brand-gold" />
                Weekly Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between h-48 gap-2">
                {ordersByDay.map((day) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-brand-gold/20 rounded-t-lg transition-all hover:bg-brand-gold/40"
                      style={{ height: `${(day.orders / 30) * 100}%` }}
                    />
                    <span className="text-xs font-bold text-muted-foreground">{day.day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                <Package size={20} className="text-brand-gold" />
                Top Products
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topProducts.map((product, idx) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-gold/10 rounded-lg flex items-center justify-center text-brand-gold font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                  </div>
                  <span className="font-bold text-foreground">{product.orders} orders</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Customers */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                <Star size={20} className="text-brand-gold" />
                Top Customers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topCustomers.map((customer, idx) => (
                <div key={customer.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-gold/10 rounded-lg flex items-center justify-center text-brand-gold font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm">{customer.name}</p>
                      <p className="text-xs text-muted-foreground">{customer.totalOrders} orders</p>
                    </div>
                  </div>
                  <span className="font-black text-brand-gold">₹{customer.totalSpent.toLocaleString()}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Order Status Distribution */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                <Package size={20} className="text-brand-gold" />
                Order Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {['CREATED', 'CONFIRMED', 'PACKING', 'OUT_FOR_DELIVERY', 'DELIVERED'].map((status) => {
                const count = orders.filter((o) => o.status === status).length;
                const percentage = orders.length > 0 ? (count / orders.length) * 100 : 0;
                return (
                  <div key={status} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">{status.replace(/_/g, ' ')}</span>
                      <span className="font-bold text-muted-foreground">{count}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-gold rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
