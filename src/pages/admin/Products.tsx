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

        {/* Products Table */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
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
                        <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center">
                          <Package size={20} className="text-brand-gold" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground text-sm">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.unit}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant="outline" className="bg-muted/50 text-foreground text-[10px] font-bold uppercase">
                        {product.category}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-foreground">₹{product.price}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`font-bold ${product.stock > 20 ? 'text-emerald-500' : product.stock > 0 ? 'text-amber-500' : 'text-brand-red'}`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <Badge
                        className={product.active ? 'bg-emerald-500/20 text-emerald-500 border-none' : 'bg-slate-500/20 text-slate-500 border-none'}
                      >
                        {product.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          onClick={() => handleToggleActive(product.id)}
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 rounded-lg"
                        >
                          {product.active ? (
                            <EyeOff size={16} className="text-muted-foreground" />
                          ) : (
                            <Eye size={16} className="text-brand-gold" />
                          )}
                        </Button>
                        <Button
                          onClick={() => setEditingProduct(product)}
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 rounded-lg"
                        >
                          <Pencil size={16} className="text-muted-foreground" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(product.id)}
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 rounded-lg text-brand-red hover:text-brand-red hover:bg-brand-red/10"
                        >
                          <Trash2 size={16} />
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
