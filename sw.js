// offline cache for 胃透視シミュレータ: everything is served from the cache once it has been loaded
const CACHE='gastro-sim-v43';
const CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','vendor/vosk.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  e.respondWith(caches.open(CACHE).then(async c=>{const hit=await c.match(e.request,{ignoreSearch:true});if(hit)return hit;
    const r=await fetch(e.request);if(r.ok&&new URL(e.request.url).origin===location.origin)c.put(e.request,r.clone());return r;}));});
