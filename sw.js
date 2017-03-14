var version = 'v20170314.1'

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('hcis-search').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './style.css',
        './plugins.js',
        './main.js',
        './db.xml'
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
