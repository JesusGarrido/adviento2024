const CACHE_NAME = "adviento2024-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/res/icon-192x192.png",
  "/res/icon-512x512.png",
  "/imagenes/captura1.png",
  "/imagenes/captura2.png"
];

// Instalar y cachear recursos
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Instalando y cacheando recursos...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Interceptar solicitudes y servir desde el caché si es posible
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request); // Devuelve desde el caché o realiza una solicitud de red
    })
  );
});

// Actualizar el caché en segundo plano
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log("[Service Worker] Eliminando caché antiguo:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
