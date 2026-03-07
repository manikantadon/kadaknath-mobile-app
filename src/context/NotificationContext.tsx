"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Package, Calendar, Tag, Bell, Info } from 'lucide-react';

export type NotificationType = 'order' | 'subscription' | 'offer' | 'system';

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  type: NotificationType;
  timestamp: number;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'isRead' | 'timestamp' | 'time'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  requestPermission: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('kadaknath_notifications');
    if (saved) {
      setNotifications(JSON.parse(saved));
    }
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('kadaknath_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const requestPermission = async () => {
    if (!("Notification" in window)) return;
    const result = await Notification.requestPermission();
    setPermission(result);
  };

  const addNotification = (notif: Omit<Notification, 'id' | 'isRead' | 'timestamp' | 'time'>) => {
    const newNotif: Notification = {
      ...notif,
      id: Math.random().toString(36).substr(2, 9),
      isRead: false,
      timestamp: Date.now(),
      time: 'Just now'
    };

    setNotifications(prev => [newNotif, ...prev]);

    // Trigger Browser Notification
    if (permission === 'granted') {
      new Notification(newNotif.title, {
        body: newNotif.description,
        icon: '/logo.svg'
      });
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      unreadCount, 
      addNotification, 
      markAsRead, 
      markAllAsRead, 
      removeNotification,
      requestPermission
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within a NotificationProvider');
  return context;
};