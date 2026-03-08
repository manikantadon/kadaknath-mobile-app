import { useState, useEffect, useCallback } from 'react';
import {
  Order,
  OrderStatus,
  OrderItem,
  getOrders,
  getCustomerOrders,
  getDriverOrders,
  createOrder,
  updateOrderStatus,
  assignDriver,
  cancelOrder,
  getOrderById,
} from '@/lib/orders';

interface UseOrdersResult {
  orders: Order[];
  loading: boolean;
  error: string | null;
  refreshOrders: () => void;
  createOrderAction: (
    customerId: string,
    customerName: string,
    items: OrderItem[],
    address: string,
    phone?: string
  ) => Promise<Order | null>;
  updateStatus: (orderId: string, status: OrderStatus) => Promise<Order | null>;
  assignDriverAction: (orderId: string, driverId: string, driverName: string) => Promise<Order | null>;
  cancelOrderAction: (orderId: string) => Promise<Order | null>;
  getOrder: (orderId: string) => Order | undefined;
}

export function useOrders(scope: { type: 'all' } | { type: 'customer'; customerId: string } | { type: 'driver'; driverId: string }): UseOrdersResult {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(() => {
    setLoading(true);
    setError(null);
    try {
      let fetchedOrders: Order[];
      if (scope.type === 'customer') {
        fetchedOrders = getCustomerOrders(scope.customerId);
      } else if (scope.type === 'driver') {
        fetchedOrders = getDriverOrders(scope.driverId);
      } else {
        fetchedOrders = getOrders();
      }
      setOrders(fetchedOrders);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, [scope]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const createOrderAction = async (
    customerId: string,
    customerName: string,
    items: OrderItem[],
    address: string,
    phone?: string
  ): Promise<Order | null> => {
    try {
      const order = createOrder(customerId, customerName, items, address, phone);
      setOrders((prev) => [order, ...prev.filter((o) => o.id !== order.id)]);
      return order;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create order');
      return null;
    }
  };

  const updateStatus = async (orderId: string, status: OrderStatus): Promise<Order | null> => {
    try {
      const order = updateOrderStatus(orderId, status);
      if (order) {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? order : o)));
      }
      return order;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update order status');
      return null;
    }
  };

  const assignDriverAction = async (orderId: string, driverId: string, driverName: string): Promise<Order | null> => {
    try {
      const order = assignDriver(orderId, driverId, driverName);
      if (order) {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? order : o)));
      }
      return order;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to assign driver');
      return null;
    }
  };

  const cancelOrderAction = async (orderId: string): Promise<Order | null> => {
    try {
      const order = cancelOrder(orderId);
      if (order) {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? order : o)));
      }
      return order;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel order');
      return null;
    }
  };

  const getOrder = (orderId: string): Order | undefined => {
    return getOrderById(orderId);
  };

  return {
    orders,
    loading,
    error,
    refreshOrders: fetchOrders,
    createOrderAction,
    updateStatus,
    assignDriverAction,
    cancelOrderAction,
    getOrder,
  };
}
