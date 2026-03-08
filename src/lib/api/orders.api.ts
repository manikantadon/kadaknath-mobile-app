import { Order, OrderStatus } from '../orders';

// In-memory store for admin operations
let orders: Order[] = [
  {
    id: 'ORD-001',
    customerId: 'customer',
    customerName: 'John Doe',
    items: [
      { productId: 'kadaknath-whole', name: 'Premium Kadaknath Whole', quantity: 1, price: 850 },
      { productId: 'kadaknath-eggs', name: 'Kadaknath Eggs (6 pcs)', quantity: 2, price: 150 },
    ],
    total: 1150,
    status: 'OUT_FOR_DELIVERY',
    address: '123 Main Street, Apt 4B, Mumbai, Maharashtra 400001',
    phone: '+91 98765 43210',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    driverId: 'driver',
    driverName: 'Mike Driver',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'ORD-002',
    customerId: 'customer',
    customerName: 'John Doe',
    items: [
      { productId: 'kadaknath-curry', name: 'Kadaknath Curry Cut', quantity: 2, price: 450 },
    ],
    total: 900,
    status: 'CONFIRMED',
    address: '123 Main Street, Apt 4B, Mumbai, Maharashtra 400001',
    phone: '+91 98765 43210',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'ORD-003',
    customerId: 'customer-2',
    customerName: 'Jane Smith',
    items: [
      { productId: 'kadaknath-whole', name: 'Premium Kadaknath Whole', quantity: 1, price: 850 },
    ],
    total: 850,
    status: 'CREATED',
    address: '456 Park Avenue, Delhi 110001',
    phone: '+91 98765 12345',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'ORD-004',
    customerId: 'customer-3',
    customerName: 'Rajesh Kumar',
    items: [
      { productId: 'kadaknath-breast', name: 'Kadaknath Breast Fillets', quantity: 2, price: 600 },
    ],
    total: 1200,
    status: 'PACKING',
    address: '789 MG Road, Bangalore 560001',
    phone: '+91 99887 76655',
    createdAt: new Date(Date.now() - 43200000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'ORD-005',
    customerId: 'customer-4',
    customerName: 'Priya Sharma',
    items: [
      { productId: 'kadaknath-whole', name: 'Premium Kadaknath Whole', quantity: 1, price: 850 },
      { productId: 'kadaknath-curry', name: 'Kadaknath Curry Cut', quantity: 1, price: 450 },
    ],
    total: 1300,
    status: 'READY_FOR_PICKUP',
    address: '321 Park Street, Kolkata 700001',
    phone: '+91 88776 65544',
    createdAt: new Date(Date.now() - 21600000).toISOString(),
    driverId: 'driver-2',
    driverName: 'Suresh Kumar',
    updatedAt: new Date().toISOString(),
  },
];

export const ordersApi = {
  getOrders: (): Order[] => {
    return [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getOrderById: (id: string): Order | undefined => {
    return orders.find((o) => o.id === id);
  },

  getOrdersByStatus: (status: OrderStatus): Order[] => {
    return orders.filter((o) => o.status === status);
  },

  updateOrderStatus: (orderId: string, status: OrderStatus): Order | null => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return null;

    order.status = status;
    order.updatedAt = new Date().toISOString();
    return order;
  },

  assignDriver: (orderId: string, driverId: string, driverName: string): Order | null => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return null;

    order.driverId = driverId;
    order.driverName = driverName;
    order.updatedAt = new Date().toISOString();
    return order;
  },

  cancelOrder: (orderId: string): Order | null => {
    const order = orders.find((o) => o.id === orderId);
    if (!order || order.status === 'DELIVERED') return null;

    order.status = 'CANCELLED';
    order.updatedAt = new Date().toISOString();
    return order;
  },

  getTodayOrders: (): Order[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return orders.filter((o) => new Date(o.createdAt) >= today);
  },

  getPendingOrders: (): Order[] => {
    return orders.filter((o) => !['DELIVERED', 'CANCELLED'].includes(o.status));
  },
};
