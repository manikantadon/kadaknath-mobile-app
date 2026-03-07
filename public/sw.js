const CACHE_NAME = 'kadaknath-pro-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/placeholder.svg',
  '/logo.svg'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((keys) => {
        return Promise.all(
          keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
        );
      })
    ])
  );
});

// Fetch Strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

// Handle Notification Clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        let client = clientList[0];
        for (let i = 0; i < clientList.length; i++) {
          if (clientList[i].focused) {
            client = clientList[i];
          }
        }
        return client.focus();
      }
      return clients.openWindow('/customer/notifications');
    })
  );
});

// Listen for push events (for future server-side notifications)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Kadaknath Pro';
  const options = {
    body: data.body || 'New update from Kadaknath Pro',
    icon: '/logo.svg',
    badge: '/logo.svg',
    data: data.data || { url: '/customer/notifications' }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});