var version = 'v20180411.3'

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('search').then(cache => {
      return cache.addAll([
          './',
          './index.html',
          './db/schema.json',
          './db/db.min.xml',
          './css/colors.css',
          './css/style.css',
          './js/classList.min.js',
          './js/colors.js',
          './js/exceptions.js',
          './js/main.js',
          './js/plugins.js',
          './js/signals.js',
          './js/template.js',
          './sw.js',
          './upup.min.js',
          './upup.sw.min.js',
          './img/favicon.ico'
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
