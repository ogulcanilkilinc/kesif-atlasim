// Replaces the old Keşif Atlasım service worker: clears its caches, removes itself
// and sends open pages to the new address. Saved data (localStorage) is untouched.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    // Caches are shared by the whole github.io origin: delete only the old app's
    await Promise.all(keys.filter((k) => k.startsWith('kesif-atlasim')).map((k) => caches.delete(k)));
    await self.registration.unregister();
    const pages = await self.clients.matchAll({ type: 'window' });
    pages.forEach((c) => c.navigate('https://ogulcanilkilinc.github.io/GezginOgi/'));
  })());
});
