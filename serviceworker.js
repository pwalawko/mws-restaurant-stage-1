var filesToCache = [
  '/',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/index.html',
  '/restaurant.html',
  '/img/'
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

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function (cacheName) {
            console.log('hello')
            return cacheName.startsWith('pages-cache')&&
                cacheName != staticCacheName;
          }).map(function (cacheName) {
              return cache.delete(cacheName);
          })
        );
      })
  );

});