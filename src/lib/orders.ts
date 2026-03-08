export type OrderStatus =
  | 'CREATED'
  | 'CONFIRMED'
  | 'PACKING'
  | 'READY_FOR_PICKUP'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName?: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  address: string;
  phone?: string;
  createdAt: string;
  driverId?: string;
  driverName?: string;
  updatedAt: string;
}

const STATUS_ORDER: OrderStatus[] = [
  'CREATED',
  'CONFIRMED',
  'PACKING',
  'READY_FOR_PICKUP',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
];

// In-memory store
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
];

function generateId(): string {
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `ORD-${num}`;
}

export function getOrders(): Order[] {
  return [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getCustomerOrders(customerId: string): Order[] {
  return orders
    .filter((o) => o.customerId === customerId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getOrderById(id: string): Order | undefined {
  return orders.find((o) => o.id === id);
}

export function getDriverOrders(driverId: string): Order[] {
  return orders
    .filter((o) => o.driverId === driverId && o.status !== 'DELIVERED')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function createOrder(
  customerId: string,
  customerName: string,
  items: OrderItem[],
  address: string,
  phone?: string
): Order {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order: Order = {
    id: generateId(),
    customerId,
    customerName,
    items,
    total,
    status: 'CREATED',
    address,
    phone,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  orders.unshift(order);
  return order;
}

export function updateOrderStatus(orderId: string, status: OrderStatus): Order | null {
  const order = orders.find((o) => o.id === orderId);
  if (!order) return null;

  const currentIndex = STATUS_ORDER.indexOf(order.status);
  const newIndex = STATUS_ORDER.indexOf(status);

  if (newIndex < currentIndex && status !== 'CANCELLED') {
    return null; // Cannot go backwards
  }

  order.status = status;
  order.updatedAt = new Date().toISOString();
  return order;
}

export function assignDriver(orderId: string, driverId: string, driverName: string): Order | null {
  const order = orders.find((o) => o.id === orderId);
  if (!order) return null;

  order.driverId = driverId;
  order.driverName = driverName;
  order.updatedAt = new Date().toISOString();
  return order;
}

export function cancelOrder(orderId: string): Order | null {
  const order = orders.find((o) => o.id === orderId);
  if (!order) return null;
  if (order.status === 'DELIVERED') return null;

  order.status = 'CANCELLED';
  order.updatedAt = new Date().toISOString();
  return order;
}

export function getOrdersByStatus(status: OrderStatus): Order[] {
  return orders.filter((o) => o.status === status);
}

export function getPendingOrders(): Order[] {
  return orders.filter((o) => !['DELIVERED', 'CANCELLED'].includes(o.status));
}
