"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

interface Props {
  coords: [number, number];
  /** "store": interactive map with branded pin + popup. "preview": static mini-map. */
  variant: "store" | "preview";
  className?: string;
  popup?: { title: string; address: string };
}

const STORE_PIN = `<div style="position:relative;width:40px;height:52px">
<svg width="40" height="52" viewBox="0 0 40 52" fill="none"><path d="M20 50C20 50 36 30.5 36 19.5A16 16 0 1 0 4 19.5C4 30.5 20 50 20 50z" fill="#E42027" stroke="#141110" stroke-width="3"/><circle cx="20" cy="19" r="6.5" fill="#F5C518" stroke="#141110" stroke-width="2.5"/></svg></div>`;

export default function LeafletMap({ coords, variant, className, popup }: Props) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !box.current) return;
      const preview = variant === "preview";
      map = L.map(el, preview
        ? { scrollWheelZoom: false, dragging: false, zoomControl: false, attributionControl: false, doubleClickZoom: false, boxZoom: false, keyboard: false }
        : { scrollWheelZoom: false, zoomControl: true },
      ).setView(coords, 16);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: preview ? undefined : "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      const icon = preview
        ? L.divIcon({ className: "", iconSize: [30, 38], iconAnchor: [15, 38], html: '<div class="rb-pin"></div>' })
        : L.divIcon({ className: "", iconSize: [40, 52], iconAnchor: [20, 50], html: STORE_PIN });
      const marker = L.marker(coords, { icon, title: popup?.title }).addTo(map);
      if (popup) {
        const wrap = document.createElement("div");
        const strong = document.createElement("strong");
        strong.textContent = popup.title;
        const small = document.createElement("span");
        small.style.fontSize = "12px";
        small.textContent = popup.address;
        wrap.append(strong, document.createElement("br"), small);
        marker.bindPopup(wrap);
      }
      setTimeout(() => map?.invalidateSize(), 60);
    });

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [coords, variant, popup]);

  return <div ref={box} className={className} />;
}
