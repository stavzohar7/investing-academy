// Service Worker — מאפשר להתקין את האפליקציה ולהשתמש בה גם בלי אינטרנט.
// אסטרטגיה: "רשת קודם" — כשיש אינטרנט תמיד מקבלים את הגרסה העדכנית (כולל דוחות שבועיים חדשים),
// וכשאין — מגישים את העותק השמור.
const CACHE = "investing-academy-v54";
const CORE = [
  "./", "index.html", "styles.css", "theme.css", "manifest.webmanifest", "icon.svg",
  "content.js", "content2.js", "content3.js", "content4.js", "content5.js", "content6.js",
  "content7.js", "content8.js", "content9.js", "content10.js", "content11.js", "content12.js", "content13.js", "content14.js", "content15.js", "content16.js", "content17.js", "content18.js", "content19.js", "content20.js", "content21.js", "content22.js", "content23.js", "content24.js", "merge.js",
  "glossary.js", "app.js", "tools.js", "weekly.js", "library.js", "practice.js", "extras.js", "lab.js", "hub.js", "play.js", "course.js", "parts.js", "weekly-tech.js", "layout.js", "trust.js", "news.js", "creative.js", "portfolio.js", "money.js", "finance.js", "youth.js", "assets.js", "present.js", "video/manifest.js", "video/scripts.js", "video/scripts2.js", "daily/manifest.js", "daily/2026-11-23.js", "daily/2026-11-23-pre.js", "daily/2026-11-20.js", "daily/2026-11-19.js", "daily/2026-11-18.js", "daily/2026-11-17.js",
  "weekly/manifest.js", "weekly/scorecard.js"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(res => {
      if (res && (res.ok || res.type === "opaque")) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match(e.request).then(r => r || (e.request.mode === "navigate" ? caches.match("index.html") : undefined)))
  );
});
