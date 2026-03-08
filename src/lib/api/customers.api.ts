export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  active: boolean;
  address?: string;
}

let customers: Customer[] = [
  {
    id: 'customer',
    name: 'John Doe',
    phone: '+91 98765 43210',
    email: 'john@example.com',
    totalOrders: 15,
    totalSpent: 12500,
    lastOrderDate: new Date().toISOString(),
    active: true,
    address: '123 Main Street, Mumbai',
  },
  {
    id: 'customer-2',
    name: 'Jane Smith',
    phone: '+91 98765 12345',
    email: 'jane@example.com',
    totalOrders: 8,
    totalSpent: 6800,
    lastOrderDate: new Date(Date.now() - 86400000).toISOString(),
    active: true,
    address: '456 Park Avenue, Delhi',
  },
  {
    id: 'customer-3',
    name: 'Rajesh Kumar',
    phone: '+91 99887 76655',
    email: 'rajesh@example.com',
    totalOrders: 22,
    totalSpent: 18900,
    lastOrderDate: new Date(Date.now() - 43200000).toISOString(),
    active: true,
    address: '789 MG Road, Bangalore',
  },
  {
    id: 'customer-4',
    name: 'Priya Sharma',
    phone: '+91 88776 65544',
    email: 'priya@example.com',
    totalOrders: 5,
    totalSpent: 4200,
    lastOrderDate: new Date(Date.now() - 21600000).toISOString(),
    active: true,
    address: '321 Park Street, Kolkata',
  },
];

export const customersApi = {
  getCustomers: (): Customer[] => {
    return [...customers];
  },

  getCustomerById: (id: string): Customer | undefined => {
    return customers.find((c) => c.id === id);
  },

  getActiveCustomers: (): Customer[] => {
    return customers.filter((c) => c.active);
  },

  toggleCustomerActive: (id: string): Customer | null => {
    const index = customers.findIndex((c) => c.id === id);
    if (index === -1) return null;

    customers[index].active = !customers[index].active;
    return customers[index];
  },

  updateCustomer: (id: string, updates: Partial<Customer>): Customer | null => {
    const index = customers.findIndex((c) => c.id === id);
    if (index === -1) return null;

    customers[index] = { ...customers[index], ...updates };
    return customers[index];
  },
};
