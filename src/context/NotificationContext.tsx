"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

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
  permissionStatus: NotificationPermission;
  addNotification: (notification: Omit<Notification, 'id' | 'isRead' | 'timestamp' | 'time'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  requestPermission: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('kadaknath_notifications');
      if (saved && saved !== 'undefined') {
        setNotifications(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Error loading notifications:", err);
      localStorage.removeItem('kadaknath_notifications');
    }
    if ("Notification" in window) {
      setPermissionStatus(Notification.permission);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kadaknath_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const requestPermission = async () => {
    if (!("Notification" in window)) {
      console.warn("This browser does not support desktop notifications");
      return;
    }
    
    const permission = await Notification.requestPermission();
    setPermissionStatus(permission);
    
    if (permission === 'granted') {
      // Show a test notification immediately to confirm
      addNotification({
        title: 'Notifications Enabled! 🔔',
        description: 'You will now receive real-time updates for your orders.',
        type: 'system'
      });
    }
  };

  const addNotification = async (notif: Omit<Notification, 'id' | 'isRead' | 'timestamp' | 'time'>) => {
    const newNotif: Notification = {
      ...notif,
      id: Math.random().toString(36).substr(2, 9),
      isRead: false,
      timestamp: Date.now(),
      time: 'Just now'
    };

    setNotifications(prev => [newNotif, ...prev]);

    // Trigger System Notification
    if (permissionStatus === 'granted') {
      const systemTitle = 'Kadaknath Pro';
      const systemBody = newNotif.title + (newNotif.description ? `: ${newNotif.description}` : '');
      const iconUrl = `${window.location.origin}/logo.svg`;
      
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.ready;
          // showNotification is the standard way for PWAs to hide the URL
          await registration.showNotification(systemTitle, {
            body: systemBody,
            icon: iconUrl,
            badge: iconUrl,
            vibrate: [200, 100, 200],
            tag: newNotif.id,
            renotify: true,
            data: { url: '/customer/notifications' }
          });
        } catch (err) {
          console.error("Service Worker notification failed:", err);
          // Fallback only if SW is completely broken, though URL might show
          if (typeof Notification !== 'undefined') {
            new Notification(systemTitle, { body: systemBody, icon: iconUrl });
          }
        }
      } else if (typeof Notification !== 'undefined') {
        new Notification(systemTitle, { body: systemBody, icon: iconUrl });
      }
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

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      unreadCount, 
      permissionStatus,
      addNotification, 
      markAsRead, 
      markAllAsRead, 
      removeNotification,
      clearAll,
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