const C="biflovna-1.3.4";
const F=["./","index.html","manifest.webmanifest","icons/apple-touch-180.png","icons/icon-512.png","icons/maskable-192.png","icons/maskable-512.png"];
// instalace bere soubory přímo ze sítě (GitHub Pages mají 10min HTTP cache, jinak by se pod novým názvem uložila stará stránka)
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:"reload"})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;
  if(/(version|subjects)[.]json$/.test(new URL(r.url).pathname))return; // kontrola verze vždy ze sítě
  if(r.mode==="navigate"){e.respondWith(Promise.race([fetch(r.url,{cache:"no-cache"}).then(n=>{if(n.ok){const c=n.clone();caches.open(C).then(x=>x.put("index.html",c))}return n}),new Promise((_,no)=>setTimeout(no,3000))]).catch(()=>caches.match("index.html")));return}
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(h=>h||fetch(r).then(n=>{const c=n.clone();caches.open(C).then(x=>x.put(r,c));return n})).catch(()=>caches.match("index.html")))});
