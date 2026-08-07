self.addEventListener("install", event => {
    self.skipWaiting();
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.open("codigo404-v1").then(cache => {
            return cache.match(event.request).then(response => {
                return response || fetch(event.request);
            });
        })
    );
});