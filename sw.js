const CACHE = 'radar-v2';

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll([
      '/radar-pogodowy/',
      '/radar-pogodowy/index.html',
      '/radar-pogodowy/manifest.json',
      '/radar-pogodowy/icon-192.png',
      '/radar-pogodowy/icon-512.png'
    ]).catch(()=>{}))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = e.request.url;
  // Never cache API calls — always fetch fresh
  if (url.includes('open-meteo.com') || url.includes('imgw.pl') ||
      url.includes('windy.com') || url.includes('geocoding-api') ||
      url.includes('flood-api')) {
    return;
  }
  // Network first for app shell, fallback to cache
  e.respondWith(
    fetch(e.request).then(res => {
      if (res.ok && e.request.method === 'GET') {
        const clone = res.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, clone));
      }
      return res;
    }).catch(() => caches.match(e.request))
  );
});

self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(self.registration.showNotification(
    data.title || '🌦 Radar Pogodowy',
    {body: data.body || 'Alert pogodowy', icon: '/radar-pogodowy/icon-192.png', badge: '/radar-pogodowy/icon-192.png'}
  ));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({type:'window'}).then(list => {
    if (list.length) return list[0].focus();
    return clients.openWindow('/radar-pogodowy/');
  }));
});
