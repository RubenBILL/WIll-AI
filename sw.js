const C='will-ai-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png'])));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(!/^(https?:)$/.test(u.protocol)||/generativelanguage|anthropic/.test(u.hostname))return;
 const net=u.origin===location.origin&&(r.mode==='navigate'||/index\.html$|\/$/.test(u.pathname));
 if(net){e.respondWith(fetch(r).then(n=>{const cp=n.clone();caches.open(C).then(c=>c.put(r,cp));return n}).catch(()=>caches.match(r).then(h=>h||caches.match('index.html'))));return}
 e.respondWith(caches.match(r).then(h=>h||fetch(r).then(n=>{if(n.ok&&(u.origin===location.origin||/fonts\.(googleapis|gstatic)|cdnjs/.test(u.hostname))){const cp=n.clone();caches.open(C).then(c=>c.put(r,cp))}return n})))});
