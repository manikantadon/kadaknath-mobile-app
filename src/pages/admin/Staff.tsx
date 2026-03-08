"use client";

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { UserCog, Search, Plus, Pencil, UserX, Shield, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { showSuccess } from '@/utils/toast';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'ADMIN' | 'MANAGER' | 'PACKER' | 'SUPPORT';
  active: boolean;
  joinedDate: string;
}

const initialStaff: StaffMember[] = [
  {
    id: 'staff-1',
    name: 'Admin User',
    email: 'admin@kadaknathpro.com',
    phone: '+91 98765 43210',
    role: 'ADMIN',
    active: true,
    joinedDate: '2024-01-15',
  },
  {
    id: 'staff-2',
    name: 'Manager User',
    email: 'manager@kadaknathpro.com',
    phone: '+91 98765 43211',
    role: 'MANAGER',
    active: true,
    joinedDate: '2024-02-20',
  },
  {
    id: 'staff-3',
    name: 'Rajesh Packer',
    email: 'rajesh@kadaknathpro.com',
    phone: '+91 98765 43212',
    role: 'PACKER',
    active: true,
    joinedDate: '2024-03-10',
  },
  {
    id: 'staff-4',
    name: 'Priya Support',
    email: 'priya@kadaknathpro.com',
    phone: '+91 98765 43213',
    role: 'SUPPORT',
    active: false,
    joinedDate: '2024-04-05',
  },
];

const roleColors: Record<string, string> = {
  ADMIN: 'bg-brand-gold/20 text-brand-gold',
  MANAGER: 'bg-blue-500/20 text-blue-400',
  PACKER: 'bg-green-500/20 text-green-400',
  SUPPORT: 'bg-purple-500/20 text-purple-400',
};

const roleIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  ADMIN: Shield,
  MANAGER: UserCog,
  PACKER: UserCog,
  SUPPORT: UserCog,
};

const AdminStaff = () => {
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStaff = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleActive = (id: string) => {
    setStaff(staff.map((s) => (s.id === id ? { ...s, active: !s.active } : s)));
    const member = staff.find((s) => s.id === id);
    showSuccess(`Staff member ${member?.active ? 'deactivated' : 'activated'}`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Staff</h1>
            <p className="text-muted-foreground text-sm">Manage team members and permissions</p>
          </div>
          <Button className="h-11 rounded-2xl bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold gap-2">
            <Plus size={18} />
            Add Staff
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search staff..."
            className="pl-11 h-12 rounded-2xl border-border bg-muted/30"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-card rounded-2xl p-5 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold">
                <UserCog size={18} />
              </div>
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Total</span>
            </div>
            <p className="text-2xl font-black text-foreground">{staff.length}</p>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                <UserCog size={18} />
              </div>
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Active</span>
            </div>
            <p className="text-2xl font-black text-foreground">{staff.filter((s) => s.active).length}</p>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-slate-500/10 rounded-xl flex items-center justify-center text-slate-500">
                <UserCog size={18} />
              </div>
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Inactive</span>
            </div>
            <p className="text-2xl font-black text-foreground">{staff.filter((s) => !s.active).length}</p>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold">
                <Shield size={18} />
              </div>
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Admins</span>
            </div>
            <p className="text-2xl font-black text-foreground">{staff.filter((s) => s.role === 'ADMIN').length}</p>
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30 border-b border-border">
                <tr>
                  <th className="text-left py-4 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    Member
                  </th>
                  <th className="text-left py-4 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    Contact
                  </th>
                  <th className="text-left py-4 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    Role
                  </th>
                  <th className="text-left py-4 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    Joined
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
                {filteredStaff.map((member) => {
                  const RoleIcon = roleIcons[member.role] || UserCog;
                  return (
                    <tr key={member.id} className="hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center text-brand-black font-bold">
                            {member.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-bold text-foreground text-sm">{member.name}</p>
                            <p className="text-xs text-muted-foreground">ID: {member.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs text-foreground">
                            <Mail size={12} className="text-brand-gold" />
                            <span>{member.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Phone size={12} className="text-brand-gold" />
                            <span>{member.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge className={`${roleColors[member.role]} border-none font-bold text-[10px] uppercase`}>
                          <RoleIcon size={10} className="mr-1" />
                          {member.role}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium text-foreground">
                          {new Date(member.joinedDate).toLocaleDateString('en-IN', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <Badge
                          className={
                            member.active
                              ? 'bg-emerald-500/20 text-emerald-500 border-none'
                              : 'bg-slate-500/20 text-slate-500 border-none'
                          }
                        >
                          {member.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-3 rounded-lg"
                          >
                            <Pencil size={14} className="text-muted-foreground" />
                          </Button>
                          <Button
                            onClick={() => handleToggleActive(member.id)}
                            variant="ghost"
                            size="sm"
                            className="h-8 px-3 rounded-lg text-brand-red hover:text-brand-red hover:bg-brand-red/10"
                          >
                            <UserX size={14} className="mr-1" />
                            {member.active ? 'Deactivate' : 'Activate'}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredStaff.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCog size={24} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">No staff members found</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminStaff;
