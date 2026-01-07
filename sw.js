const CACHE_NAME = 'sonsuzay-v2.3'; // Güncelleme yaptıkça burayı v2, v3 yap!
const urlsToCache = [
  './',
  './index.html',
  './oyunlar.html',
  './uygulamalar.html',
  './indir.html',
  './player.html',
  './saat.html',
  './site_simge.png',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Yeni sürüm gelince bekleme, hemen yükle
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', (event) => {
  // Eski sürümleri (cache) temizle
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Sayfanın kontrolünü hemen ele al
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
