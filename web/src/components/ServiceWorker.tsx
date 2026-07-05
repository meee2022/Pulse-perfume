"use client";

import { useEffect } from "react";

// During active design iteration the offline cache causes stale pages, so this
// unregisters any previously-installed worker and clears its caches. Re-enable
// the PWA (register /sw.js) once the design is settled.
export default function ServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.getRegistrations().then((rs) => rs.forEach((r) => r.unregister())).catch(() => {});
    if (typeof caches !== "undefined") {
      caches.keys().then((ks) => ks.forEach((k) => caches.delete(k))).catch(() => {});
    }
  }, []);
  return null;
}
