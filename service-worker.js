self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('adviento-cache').then(cache => {
            return cache.addAll([
                'index.html',
                'CSS/style.css',
                'JS/script.js',
                'imagenes/estrella.png',
                'jquery-mobile/jquery.mobile.min.css',
                'jquery-mobile/jquery.mobile.min.js'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
