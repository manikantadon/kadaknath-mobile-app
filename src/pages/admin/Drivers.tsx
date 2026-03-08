"use client";

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { driversApi, Driver } from '@/lib/api/drivers.api';
import { Truck, Search, Plus, Pencil, UserX, Phone, Star, Package, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { showSuccess, showError } from '@/utils/toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const AdminDrivers = () => {
  const [drivers, setDrivers] = useState<Driver[]>(driversApi.getDrivers());
  const [searchQuery, setSearchQuery] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    vehicle: string;
    licensePlate: string;
  }>({
    name: '',
    phone: '',
    vehicle: '',
    licensePlate: '',
  });

  const filteredDrivers = drivers.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.phone.includes(searchQuery) ||
      d.vehicle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleActive = (id: string) => {
    const updated = driversApi.toggleDriverActive(id);
    if (updated) {
      setDrivers(driversApi.getDrivers());
      showSuccess(`Driver ${updated.active ? 'activated' : 'deactivated'}`);
    }
  };

  const handleAddDriver = () => {
    if (!formData.name || !formData.phone || !formData.vehicle) {
      showError('Please fill in all required fields');
      return;
    }

    const driver: Driver = {
      id: `driver-${Date.now()}`,
      name: formData.name,
      phone: formData.phone,
      vehicle: formData.vehicle,
      licensePlate: formData.licensePlate || 'N/A',
      active: true,
      currentOrders: 0,
      totalDeliveries: 0,
      rating: 5.0,
    };

    driversApi.createDriver(driver);
    setDrivers(driversApi.getDrivers());
    setFormData({ name: '', phone: '', vehicle: '', licensePlate: '' });
    setAddDialogOpen(false);
    showSuccess('Driver added successfully');
  };

  const handleEditDriver = () => {
    if (!editingDriver || !formData.name || !formData.phone || !formData.vehicle) {
      showError('Please fill in all required fields');
      return;
    }

    const updated = driversApi.updateDriver(editingDriver.id, {
      name: formData.name,
      phone: formData.phone,
      vehicle: formData.vehicle,
      licensePlate: formData.licensePlate,
    });

    if (updated) {
      setDrivers(driversApi.getDrivers());
      showSuccess('Driver updated successfully');
    }
    setEditingDriver(null);
    setFormData({ name: '', phone: '', vehicle: '', licensePlate: '' });
    setEditDialogOpen(false);
  };

  const openEditDialog = (driver: Driver) => {
    setEditingDriver(driver);
    setFormData({
      name: driver.name,
      phone: driver.phone,
      vehicle: driver.vehicle,
      licensePlate: driver.licensePlate || '',
    });
    setEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({ name: '', phone: '', vehicle: '', licensePlate: '' });
    setEditingDriver(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Drivers</h1>
            <p className="text-muted-foreground text-sm">Manage delivery partners</p>
          </div>
          <Button
            onClick={() => {
              setAddDialogOpen(true);
              resetForm();
            }}
            className="h-11 rounded-2xl bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold gap-2"
          >
            <Plus size={18} />
            Add Driver
          </Button>
        </div>

        {/* Add/Edit Driver Dialog */}
        <Dialog open={addDialogOpen || editDialogOpen} onOpenChange={(open) => {
          if (!open) {
            setAddDialogOpen(false);
            setEditDialogOpen(false);
            resetForm();
          }
        }}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-display font-bold">
                {editDialogOpen ? 'Edit Driver' : 'Add Driver'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  Full Name *
                </Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter driver name"
                  className="h-11 rounded-xl border-border bg-muted/30"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  Phone Number *
                </Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="h-11 rounded-xl border-border bg-muted/30"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  Vehicle Type *
                </Label>
                <Input
                  value={formData.vehicle}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                  placeholder="e.g., Motorcycle, Scooter, Bicycle"
                  className="h-11 rounded-xl border-border bg-muted/30"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  License Plate
                </Label>
                <Input
                  value={formData.licensePlate}
                  onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
                  placeholder="MH 01 AB 1234 (optional)"
                  className="h-11 rounded-xl border-border bg-muted/30"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => {
                    setAddDialogOpen(false);
                    setEditDialogOpen(false);
                    resetForm();
                  }}
                  variant="outline"
                  className="flex-1 h-11 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={editDialogOpen ? handleEditDriver : handleAddDriver}
                  className="flex-1 h-11 rounded-xl bg-brand-gold text-brand-black font-bold"
                >
                  {editDialogOpen ? 'Update Driver' : 'Add Driver'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search drivers..."
            className="pl-11 h-12 rounded-2xl border-border bg-muted/30"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold shrink-0">
                <Truck size={16} />
              </div>
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-tight">Total</span>
            </div>
            <p className="text-xl lg:text-2xl font-black text-foreground">{drivers.length}</p>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 shrink-0">
                <Truck size={16} />
              </div>
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-tight">Active</span>
            </div>
            <p className="text-xl lg:text-2xl font-black text-foreground">{drivers.filter(d => d.active).length}</p>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border shadow-sm col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 shrink-0">
                <Package size={16} />
              </div>
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-tight">On Duty</span>
            </div>
            <p className="text-xl lg:text-2xl font-black text-foreground">{drivers.reduce((sum, d) => sum + d.currentOrders, 0)}</p>
          </div>
        </div>

        {/* Drivers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDrivers.map((driver) => (
            <div key={driver.id} className="bg-card rounded-2xl p-5 border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center text-brand-black font-bold">
                    {driver.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{driver.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Phone size={10} />
                      <span>{driver.phone}</span>
                    </div>
                  </div>
                </div>
                <Badge
                  className={driver.active ? 'bg-emerald-500/20 text-emerald-500 border-none' : 'bg-slate-500/20 text-slate-500 border-none'}
                >
                  {driver.active ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Vehicle</span>
                  <span className="font-bold text-foreground">{driver.vehicle}</span>
                </div>
                {driver.licensePlate && driver.licensePlate !== 'N/A' && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Plate</span>
                    <span className="font-bold text-foreground">{driver.licensePlate}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Current Orders</span>
                  <span className="font-bold text-amber-500">{driver.currentOrders}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Deliveries</span>
                  <span className="font-bold text-foreground">{driver.totalDeliveries}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-brand-gold fill-brand-gold" />
                    <span className="font-bold text-foreground">{driver.rating}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-border">
                <Button
                  onClick={() => handleToggleActive(driver.id)}
                  variant="outline"
                  className="flex-1 h-10 rounded-xl border-border font-bold text-xs"
                >
                  <UserX size={14} className="mr-1" />
                  {driver.active ? 'Deactivate' : 'Activate'}
                </Button>
                <Button
                  onClick={() => openEditDialog(driver)}
                  variant="outline"
                  className="h-10 w-10 rounded-xl border-border"
                >
                  <Pencil size={14} className="text-muted-foreground" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredDrivers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck size={24} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">No drivers found</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDrivers;
