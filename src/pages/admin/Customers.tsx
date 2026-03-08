"use client";

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { customersApi, Customer } from '@/lib/api/customers.api';
import { Users, Search, Eye, UserX, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState(customersApi.getCustomers());
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleActive = (id: string) => {
    const updated = customersApi.toggleCustomerActive(id);
    if (updated) {
      setCustomers(customersApi.getCustomers());
      showSuccess(`Customer ${updated.active ? 'activated' : 'deactivated'}`);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Customers</h1>
            <p className="text-muted-foreground text-sm">Manage your customer base</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customers..."
            className="pl-11 h-12 rounded-2xl border-border bg-muted/30"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold shrink-0">
                <Users size={16} />
              </div>
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Total</span>
            </div>
            <p className="text-xl lg:text-2xl font-black text-foreground">{customers.length}</p>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 shrink-0">
                <Users size={16} />
              </div>
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Active</span>
            </div>
            <p className="text-xl lg:text-2xl font-black text-foreground">{customers.filter(c => c.active).length}</p>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border shadow-sm col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-slate-500/10 rounded-xl flex items-center justify-center text-slate-500 shrink-0">
                <Users size={16} />
              </div>
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Inactive</span>
            </div>
            <p className="text-xl lg:text-2xl font-black text-foreground">{customers.filter(c => !c.active).length}</p>
          </div>
        </div>

        {/* Customers List - Table for Desktop, Cards for Mobile */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {/* Mobile View */}
          <div className="lg:hidden divide-y divide-border">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-brand-gold rounded-2xl flex items-center justify-center text-brand-black font-bold text-lg">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-bold text-foreground leading-tight">{customer.name}</p>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5">
                        <MapPin size={10} className="text-brand-gold shrink-0" />
                        <span className="truncate max-w-[150px]">{customer.address}</span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    className={cn(
                      "font-bold text-[9px] uppercase",
                      customer.active ? 'bg-emerald-500/20 text-emerald-400 border-none' : 'bg-slate-500/20 text-slate-400 border-none'
                    )}
                  >
                    {customer.active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-muted/30 p-3 rounded-xl">
                  <div>
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-0.5">Orders</p>
                    <p className="font-bold text-foreground text-sm">{customer.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-0.5">Total Spent</p>
                    <p className="font-black text-brand-gold text-sm">₹{customer.totalSpent.toLocaleString()}</p>
                  </div>
                </div>

                <div className="space-y-1.5 px-1">
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <Phone size={12} className="text-brand-gold shrink-0" />
                    <span>{customer.phone}</span>
                  </div>
                  {customer.email && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Mail size={12} className="text-brand-gold shrink-0" />
                      <span className="truncate">{customer.email}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 h-10 rounded-xl font-bold text-xs gap-2 border-border"
                  >
                    <Eye size={14} className="text-brand-gold" />
                    Profile
                  </Button>
                  <Button
                    onClick={() => handleToggleActive(customer.id)}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "flex-1 h-10 rounded-xl font-bold text-xs gap-2",
                      customer.active ? "text-brand-red hover:bg-brand-red/10" : "text-emerald-500 hover:bg-emerald-500/10"
                    )}
                  >
                    <UserX size={14} />
                    {customer.active ? 'Deactivate' : 'Activate'}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30 border-b border-border">
                <tr>
                  <th className="text-left py-4 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    Customer
                  </th>
                  <th className="text-left py-4 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    Contact
                  </th>
                  <th className="text-left py-4 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    Orders
                  </th>
                  <th className="text-left py-4 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    Total Spent
                  </th>
                  <th className="text-left py-4 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    Status
                  </th>
                  <th className="text-right py-4 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center text-brand-black font-bold">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-foreground text-sm">{customer.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin size={10} />
                            <span className="truncate max-w-[150px]">{customer.address}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-foreground">
                          <Phone size={12} className="text-brand-gold" />
                          <span>{customer.phone}</span>
                        </div>
                        {customer.email && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Mail size={12} className="text-brand-gold" />
                            <span>{customer.email}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-foreground">{customer.totalOrders}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-black text-brand-gold">₹{customer.totalSpent.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-6">
                      <Badge
                        className={customer.active ? 'bg-emerald-500/20 text-emerald-500 border-none' : 'bg-slate-500/20 text-slate-500 border-none'}
                      >
                        {customer.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-3 rounded-lg text-brand-gold hover:bg-brand-gold/10 font-bold text-xs"
                        >
                          <Eye size={14} className="mr-1" />
                          View
                        </Button>
                        <Button
                          onClick={() => handleToggleActive(customer.id)}
                          variant="ghost"
                          size="sm"
                          className="h-8 px-3 rounded-lg text-brand-red hover:text-brand-red/10 font-bold text-xs"
                        >
                          <UserX size={14} className="mr-1" />
                          {customer.active ? 'Deactivate' : 'Activate'}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={24} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">No customers found</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCustomers;
