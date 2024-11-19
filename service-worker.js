const CACHE_NAME = "adviento2024-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/res/icon-192x192.png",
  "/res/icon-512x512.png",
  "/imagenes/captura1.png",
  "/imagenes/captura2.png"
];

// Instalar el Service Worker y cachear recursos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Archivos cacheados correctamente.");
      return cache.addAll(urlsToCache);
    })
  );
});

// Interceptar solicitudes y servir desde el caché si es posible
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Devuelve la respuesta desde el caché
      }
      return fetch(event.request); // Realiza una solicitud de red si no está en caché
    })
  );
});

// Actualizar el caché en segundo plano
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log("Eliminando caché antiguo:", cacheName);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
