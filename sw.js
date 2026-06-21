// Radar Pogodowy — Service Worker
// Strategia: network-first dla wszystkiego
// Cache tylko jako fallback gdy offline

const CACHE = 'radar-v31';

self.addEventListener('install', e => {
  self.skipWaiting(); // Aktywuj od razu bez czekania
});

self.addEventListener('activate', e => {
  // Usuń stare cache
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim()) // Przejm kontrolę od razu
  );
});

self.addEventListener('fetch', e => {
  const url = e.request.url;

  // API calls — nigdy nie cache'uj
  if (url.includes('open-meteo.com') || url.includes('imgw.pl') ||
      url.includes('windy.com') || url.includes('flood-api') ||
      url.includes('geocoding-api')) {
    return; // Przeglądarka obsługuje sama
  }

  // App shell — network first, cache jako fallback
  e.respondWith(
    fetch(e.request)
      .then(response => {
        // Zapisz świeżą wersję do cache
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return response;
      })
      .catch(() => {
        // Offline — użyj cache
        return caches.match(e.request);
      })
  );
});

// Powiadomienia push
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(self.registration.showNotification(
    data.title || '🌦 Radar Pogodowy',
    {
      body: data.body || 'Alert pogodowy',
      icon: '/radar-pogodowy/icon-192.png',
      badge: '/radar-pogodowy/icon-192.png'
    }
  ));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({type: 'window'}).then(list => {
      if (list.length) return list[0].focus();
      return clients.openWindow('/radar-pogodowy/');
    })
  );
});
