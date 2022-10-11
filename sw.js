const CACHE_NAME = 'mo-cache-v4';
const FILES_TO_CACHE = [
    '/index.html',
    '/vendor/font-awesome/all.min.css',
    '/vendor/index.css',
    '/vendor/roboto.css',
    '/vendor/webfonts/fa-brands-400.eot',
    '/vendor/webfonts/fa-brands-400.svg',
    '/vendor/webfonts/fa-brands-400.ttf',
    '/vendor/webfonts/fa-brands-400.woff',
    '/vendor/webfonts/fa-brands-400.woff2',
    '/vendor/webfonts/fa-solid-900.eot',
    '/vendor/webfonts/fa-solid-900.svg',
    '/vendor/webfonts/fa-solid-900.ttf',
    '/vendor/webfonts/fa-solid-900.woff',
    '/vendor/webfonts/fa-solid-900.woff2',
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