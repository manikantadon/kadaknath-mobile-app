"use client";

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Settings as SettingsIcon, Store, Truck, Bell, CreditCard, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { showSuccess } from '@/utils/toast';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    storeName: 'Kadaknath Pro',
    storePhone: '+91 98765 43210',
    storeEmail: 'support@kadaknathpro.com',
    deliveryCharge: 50,
    minOrderValue: 500,
    freeDeliveryAbove: 1000,
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    codEnabled: true,
    onlinePaymentEnabled: true,
  });

  const handleSave = () => {
    showSuccess('Settings saved successfully');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground text-sm">Configure your store preferences</p>
          </div>
          <Button
            onClick={handleSave}
            className="h-11 rounded-2xl bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold gap-2"
          >
            <Save size={18} />
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Store Settings */}
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold">
                  <Store size={18} />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-foreground">Store Settings</CardTitle>
                  <CardDescription className="text-xs">Basic store information</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  Store Name
                </Label>
                <Input
                  value={settings.storeName}
                  onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                  className="h-11 rounded-xl border-border bg-muted/30"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  Support Phone
                </Label>
                <Input
                  value={settings.storePhone}
                  onChange={(e) => setSettings({ ...settings, storePhone: e.target.value })}
                  className="h-11 rounded-xl border-border bg-muted/30"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  Support Email
                </Label>
                <Input
                  value={settings.storeEmail}
                  onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
                  className="h-11 rounded-xl border-border bg-muted/30"
                />
              </div>
            </CardContent>
          </Card>

          {/* Delivery Settings */}
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold">
                  <Truck size={18} />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-foreground">Delivery Settings</CardTitle>
                  <CardDescription className="text-xs">Configure delivery charges</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  Delivery Charge (₹)
                </Label>
                <Input
                  type="number"
                  value={settings.deliveryCharge}
                  onChange={(e) => setSettings({ ...settings, deliveryCharge: parseInt(e.target.value) || 0 })}
                  className="h-11 rounded-xl border-border bg-muted/30"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  Minimum Order Value (₹)
                </Label>
                <Input
                  type="number"
                  value={settings.minOrderValue}
                  onChange={(e) => setSettings({ ...settings, minOrderValue: parseInt(e.target.value) || 0 })}
                  className="h-11 rounded-xl border-border bg-muted/30"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  Free Delivery Above (₹)
                </Label>
                <Input
                  type="number"
                  value={settings.freeDeliveryAbove}
                  onChange={(e) => setSettings({ ...settings, freeDeliveryAbove: parseInt(e.target.value) || 0 })}
                  className="h-11 rounded-xl border-border bg-muted/30"
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold">
                  <Bell size={18} />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-foreground">Notifications</CardTitle>
                  <CardDescription className="text-xs">Manage notification preferences</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground text-sm">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive order updates via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground text-sm">SMS Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive order updates via SMS</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground text-sm">Push Notifications</p>
                  <p className="text-xs text-muted-foreground">Browser push notifications</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Settings */}
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold">
                  <CreditCard size={18} />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-foreground">Payment Methods</CardTitle>
                  <CardDescription className="text-xs">Configure payment options</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground text-sm">Cash on Delivery</p>
                  <p className="text-xs text-muted-foreground">Allow COD payments</p>
                </div>
                <Switch
                  checked={settings.codEnabled}
                  onCheckedChange={(checked) => setSettings({ ...settings, codEnabled: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground text-sm">Online Payments</p>
                  <p className="text-xs text-muted-foreground">Accept UPI, cards, net banking</p>
                </div>
                <Switch
                  checked={settings.onlinePaymentEnabled}
                  onCheckedChange={(checked) => setSettings({ ...settings, onlinePaymentEnabled: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
