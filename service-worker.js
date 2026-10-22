/* Bloom Taxonomy PWA v1.4 — online-first for updates; offline fallback for convenience. */
const CACHE_NAME = 'bloom-taxonomy-v1.4';
const OFFLINE_FILES = ['./', './index.html', './data.js?v=1.4', './manifest.webmanifest', './icon.svg'];
const BASE_PATH = new URL('./', self.registration.scope).pathname;

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME)
    .then(cache => cache.addAll(OFFLINE_FILES))
    .then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => k.startsWith('bloom-taxonomy-') && k !== CACHE_NAME)
      .map(k => caches.delete(k))
  )).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(BASE_PATH)) return;
  // Bypass HTTP cache when online, so stale browser cache cannot hide a new release.
  event.respondWith((async () => {
    try {
      const response = await fetch(event.request, {cache:'no-store'});
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(event.request, response.clone());
      }
      return response;
    } catch (_) {
      const cache = await caches.open(CACHE_NAME);
      const match = await cache.match(event.request, {ignoreSearch:false});
      if (match) return match;
      if (event.request.mode === 'navigate') {
        const offlinePage = await cache.match('./index.html');
        if (offlinePage) return offlinePage;
      }
      return Response.error();
    }
  })());
});
