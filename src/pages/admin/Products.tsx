"use client";

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { productsApi, Product } from '@/lib/api/products.api';
import { Package, Plus, Pencil, Trash2, Eye, EyeOff, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { showSuccess, showError } from '@/utils/toast';
import { cn } from '@/lib/utils';

const AdminProducts = () => {
  const [products, setProducts] = useState(productsApi.getProducts());
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleActive = (id: string) => {
    const updated = productsApi.toggleProductActive(id);
    if (updated) {
      setProducts(productsApi.getProducts());
      showSuccess(`Product ${updated.active ? 'activated' : 'deactivated'}`);
    }
  };

  const handleDelete = (id: string) => {
    if (productsApi.deleteProduct(id)) {
      setProducts(productsApi.getProducts());
      showSuccess('Product deleted successfully');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Products</h1>
            <p className="text-muted-foreground text-sm">Manage your product inventory</p>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="h-11 rounded-2xl bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold gap-2">
                <Plus size={18} />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <div className="text-center text-muted-foreground py-8">
                Product form coming soon...
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="pl-11 h-12 rounded-2xl border-border bg-muted/30"
          />
        </div>

        {/* Products List - Table for Desktop, Cards for Mobile */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {/* Mobile View */}
          <div className="lg:hidden divide-y divide-border">
            {filteredProducts.map((product) => (
              <div key={product.id} className="p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center shrink-0">
                      <Package size={20} className="text-brand-gold" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm leading-tight">{product.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="bg-muted/50 text-[8px] font-black uppercase px-1.5 py-0">
                          {product.category}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground font-medium">{product.unit}</span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    className={cn(
                      "font-bold text-[9px] uppercase",
                      product.active ? 'bg-emerald-500/20 text-emerald-500 border-none' : 'bg-slate-500/20 text-slate-500 border-none'
                    )}
                  >
                    {product.active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-muted/30 p-3 rounded-xl">
                  <div>
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-0.5">Price</p>
                    <p className="font-bold text-foreground">₹{product.price}</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-0.5">Stock</p>
                    <p className={cn(
                      "font-bold",
                      product.stock > 20 ? 'text-emerald-500' : product.stock > 0 ? 'text-amber-500' : 'text-brand-red'
                    )}>
                      {product.stock} units
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleToggleActive(product.id)}
                    variant="outline"
                    size="sm"
                    className="flex-1 h-10 rounded-xl font-bold text-xs gap-2"
                  >
                    {product.active ? (
                      <>
                        <EyeOff size={14} className="text-muted-foreground" />
                        Hide
                      </>
                    ) : (
                      <>
                        <Eye size={14} className="text-brand-gold" />
                        Show
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => setEditingProduct(product)}
                    variant="outline"
                    size="sm"
                    className="h-10 w-10 rounded-xl font-bold shrink-0"
                  >
                    <Pencil size={14} className="text-muted-foreground" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(product.id)}
                    variant="ghost"
                    size="sm"
                    className="h-10 w-10 rounded-xl font-bold shrink-0 text-brand-red hover:bg-brand-red/10"
                  >
                    <Trash2 size={14} />
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
                    Product
                  </th>
                  <th className="text-left py-4 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    Category
                  </th>
                  <th className="text-left py-4 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    Price
                  </th>
                  <th className="text-left py-4 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    Stock
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
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold">
                          <Package size={16} />
                        </div>
                        <div>
                          <p className="font-bold text-foreground text-sm">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.unit}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant="outline" className="bg-muted/50 text-[10px] font-black uppercase">
                        {product.category}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-black text-foreground">₹{product.price}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={cn(
                        "font-bold",
                        product.stock > 20 ? 'text-emerald-500' : product.stock > 0 ? 'text-amber-500' : 'text-brand-red'
                      )}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <Badge
                        className={cn(
                          "font-bold text-[10px] uppercase border-none",
                          product.active ? 'bg-emerald-500/20 text-emerald-500' : 'bg-slate-500/20 text-slate-500'
                        )}
                      >
                        {product.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          onClick={() => handleToggleActive(product.id)}
                          variant="ghost"
                          size="sm"
                          className="h-8 px-3 rounded-lg text-brand-gold hover:bg-brand-gold/10 font-bold text-xs"
                        >
                          {product.active ? (
                            <>
                              <EyeOff size={14} className="mr-1" />
                              Hide
                            </>
                          ) : (
                            <>
                              <Eye size={14} className="mr-1" />
                              Show
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={() => setEditingProduct(product)}
                          variant="ghost"
                          size="sm"
                          className="h-8 px-3 rounded-lg text-muted-foreground hover:bg-muted/50 font-bold text-xs"
                        >
                          <Pencil size={14} className="mr-1" />
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(product.id)}
                          variant="ghost"
                          size="sm"
                          className="h-8 px-3 rounded-lg text-brand-red hover:bg-brand-red/10 font-bold text-xs"
                        >
                          <Trash2 size={14} className="mr-1" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={24} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">No products found</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;