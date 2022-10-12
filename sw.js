const CACHE_NAME = 'mo-cache-v5';
const FILES_TO_CACHE = [
    '/index.html',
    '/style.css',
    '/images/profile.webp'
];

self.addEventListener('install', e => {
    // once the SW is installed, go ahead and fetch the resources
    // to make this work offline
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FILES_TO_CACHE).then(() => self.skipWaiting());
        })
    );
});

// when the browser fetches a url, either response with
// the cached object or go ahead and fetch the actual url
self.addEventListener('fetch', event => {
    event.respondWith(
        // ensure we check the *right* cache to match against
        caches.open(CACHE_NAME).then(cache => {
            return cache.match(event.request).then(res => {
                return res || fetch(event.request)
            });
        })
    );
});