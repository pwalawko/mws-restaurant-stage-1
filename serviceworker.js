var filesToCache = [
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/index.html',
  '/restaurant.html'
];

var staticCacheName = 'pages-cache-v1';

self.addEventListener('install', function(event) {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
        if (response) return response;
        return fetch(event.request);
    })
  )
});
