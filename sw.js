self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("catalogo-waves-plus-v4").then(cache => {
      return cache.addAll([
        "./",
        "index.html",
        "css/app.css",
        "js/app.js",
        "data/produtos.json",
        "data/categorias.json",
        "manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
