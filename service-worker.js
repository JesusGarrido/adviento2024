const CACHE_NAME = "adviento2024-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./CSS/estilos.css",
  "./JS/cordova.js",
  "./JS/cordova_plugins.js",
  "./JS/phonegap.js",
  "./Imagenes/estrella.png",
  "./manifest.json"
];

// Instalación del Service Worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Archivos en caché durante la instalación del Service Worker");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activación del Service Worker
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log(`Eliminando caché antigua: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar las solicitudes para servir contenido desde la caché
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
