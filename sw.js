const CACHE = "treino-v3";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./gifs/0CXGHya.gif", "./gifs/10Z2DXU.gif", "./gifs/17lJ1kr.gif", "./gifs/2NpxjC1.gif", "./gifs/4c9BhzB.gif", "./gifs/7F1DVzn.gif", "./gifs/7I6LNUG.gif", "./gifs/9KU9TYF.gif", "./gifs/9WTm7dq.gif", "./gifs/9XjtHvS.gif", "./gifs/CHpahtl.gif", "./gifs/DsgkuIt.gif", "./gifs/F1KxjBa.gif", "./gifs/FVmZVhk.gif", "./gifs/NN8nSNT.gif", "./gifs/P5p0j8B.gif", "./gifs/Qa55kX1.gif", "./gifs/Qqi7bko.gif", "./gifs/T0yTjgW.gif", "./gifs/YTur5nR.gif", "./gifs/Zg3XY7P.gif", "./gifs/aaXr7ld.gif", "./gifs/ae9UoXQ.gif", "./gifs/b6hQYMb.gif", "./gifs/dNFYIU1.gif", "./gifs/dRTfGZT.gif", "./gifs/dU605di.gif", "./gifs/fUBheHs.gif", "./gifs/kont8Ut.gif", "./gifs/my33uHU.gif", "./gifs/o17Jfkt.gif", "./gifs/oHsrypV.gif", "./gifs/qg2PGl6.gif", "./gifs/u2X71Np.gif", "./gifs/v3xmPAR.gif", "./gifs/vpp9Ku2.gif", "./gifs/wQ2c4XD.gif", "./gifs/x69MAlq.gif", "./gifs/xNrS20v.gif", "./gifs/ykUOVze.gif", "./gifs/zhMwOwE.gif"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const u = new URL(e.request.url);
  if (u.hostname === "i.ytimg.com") {
    e.respondWith(caches.open(CACHE).then(c => c.match(e.request).then(r => r || fetch(e.request).then(n => { c.put(e.request, n.clone()); return n; }))));
    return;
  }
  if (u.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); return r; })
    .catch(() => caches.match(e.request, {ignoreSearch: true}).then(r => r || caches.match("./index.html"))));
});
