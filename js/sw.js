var version = 'v20180301.1'

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('search').then(cache => {
      return cache.addAll([
          '../',
          '../index.html',
          '../css/style.css',
          '../js/plugins.js',
          '../js/main.js',
          '../js/db.xml'
        ])
        .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
