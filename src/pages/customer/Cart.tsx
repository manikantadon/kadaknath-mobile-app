"use client";

import React, { useState } from 'react';
import MobileLayout from '@/components/MobileLayout';
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, MapPin, Phone, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '@/utils/toast';
import { PRODUCTS } from '@/lib/products';
import { useOrders } from '@/hooks/useOrders';
import { OrderItem } from '@/lib/orders';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

const CustomerCart = () => {
  const navigate = useNavigate();
  const { createOrderAction } = useOrders({ type: 'customer', customerId: 'customer' });
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { productId: 'kadaknath-whole', name: 'Premium Kadaknath Whole', price: 850, quantity: 1 },
  ]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [address, setAddress] = useState('123 Main Street, Apt 4B, Mumbai, Maharashtra 400001');
  const [phone, setPhone] = useState('+91 98765 43210');

  const updateQty = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
    showSuccess('Item removed from cart');
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!address || !phone) {
      showError('Please fill in all delivery details');
      return;
    }

    const orderItems: OrderItem[] = cartItems.map((item) => ({
      productId: item.productId,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    const order = await createOrderAction('customer', 'John Doe', orderItems, address, phone);
    if (order) {
      showSuccess(`Order ${order.id} placed successfully!`);
      setCartItems([]);
      setShowCheckout(false);
      navigate('/customer/orders');
    }
  };

  if (cartItems.length === 0) {
    return (
      <MobileLayout role="customer">
        <div className="px-6 pt-8 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
            <ShoppingCart size={40} className="text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground text-sm mb-6 text-center">
            Add some premium Kadaknath products to get started
          </p>
          <Button
            onClick={() => navigate('/customer')}
            className="h-12 rounded-2xl bg-brand-black dark:bg-brand-gold text-brand-gold dark:text-brand-black font-bold"
          >
            Browse Products
          </Button>
        </div>
      </MobileLayout>
    );
  }

  if (showCheckout) {
    return (
      <MobileLayout role="customer">
        <div className="px-6 pt-8 pb-24">
          <button
            onClick={() => setShowCheckout(false)}
            className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <MapPin size={16} className="rotate-180" />
            <span className="font-bold text-sm">Back to Cart</span>
          </button>

          <h1 className="text-2xl font-display font-bold text-foreground mb-2">Delivery Details</h1>
          <p className="text-muted-foreground text-sm mb-6">Enter your delivery information</p>

          <div className="space-y-4 mb-6">
            <div className="bg-card rounded-2xl p-5 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    Customer
                  </p>
                  <p className="font-bold text-foreground">John Doe</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 block">
                    Delivery Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter delivery address"
                      className="pl-11 h-12 rounded-2xl border-border bg-muted/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 block">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter phone number"
                      className="pl-11 h-12 rounded-2xl border-border bg-muted/30"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-5 border border-border">
              <h3 className="font-bold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-foreground">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                <span className="font-bold text-muted-foreground">Total</span>
                <span className="text-xl font-black text-foreground">₹{total}</span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleCheckout}
            className="w-full h-14 rounded-2xl bg-brand-black dark:bg-brand-gold text-brand-gold dark:text-brand-black font-bold gap-3 shadow-xl"
          >
            <CreditCard size={20} />
            Place Order (₹{total})
          </Button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout role="customer">
      <div className="px-6 pt-8 pb-24">
        <h1 className="text-2xl font-display font-bold text-foreground mb-2">My Cart</h1>
        <p className="text-muted-foreground text-sm mb-6">{cartItems.length} item(s)</p>

        <div className="space-y-4 mb-6">
          {cartItems.map((item) => {
            const product = PRODUCTS.find((p) => p.id === item.productId);
            return (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl p-4 border border-border flex gap-4"
              >
                <div className="w-20 h-20 rounded-xl bg-muted overflow-hidden shrink-0">
                  <img
                    src={product?.image || '/placeholder.svg'}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground truncate">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">₹{item.price}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-muted/50 rounded-xl p-1 gap-1">
                      <button
                        onClick={() => updateQty(item.productId, -1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-card text-foreground shadow-sm active:scale-90 transition-transform"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-black text-foreground w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.productId, 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-card text-foreground shadow-sm active:scale-90 transition-transform"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-brand-red hover:bg-brand-red/10 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-background/80 dark:bg-black/80 backdrop-blur-xl border-t border-border z-50">
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-muted-foreground">Subtotal</span>
            <span className="text-xl font-black text-foreground">₹{total}</span>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate('/customer')}
              variant="outline"
              className="flex-1 h-14 rounded-2xl border-border font-bold"
            >
              Continue Shopping
            </Button>
            <Button
              onClick={() => setShowCheckout(true)}
              className="flex-1 h-14 rounded-2xl bg-brand-black dark:bg-brand-gold text-brand-gold dark:text-brand-black font-bold gap-2 shadow-xl"
            >
              <CreditCard size={20} />
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default CustomerCart;
