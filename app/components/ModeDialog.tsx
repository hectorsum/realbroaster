"use client";

import { useEffect, useRef, useState } from "react";
import { DISTRICTS, STORE } from "@/app/lib/menu";
import { CloseIcon, PinIcon } from "./Icons";
import { useStore } from "./StoreProvider";

type Tab = "delivery" | "pickup";

function Dialog({ onClose }: { onClose: () => void }) {
  const { setLoc } = useStore();
  const [tab, setTab] = useState<Tab>("delivery");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [msg, setMsg] = useState("");
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const choose = (loc: Parameters<typeof setLoc>[0]) => {
    setLoc(loc);
    onClose();
  };

  const saveDelivery = () => {
    const a = address.trim();
    if (!district || !a) {
      setMsg("Elige un distrito y escribe tu dirección.");
      return;
    }
    setMsg("");
    choose({
      modo: "delivery",
      label: `Delivery · ${district}`,
      dir: a,
      zona: district,
      coords: DISTRICTS[district] ?? STORE.coords,
      exacta: false,
    });
  };

  const shareLocation = () => {
    setMsg("");
    if (!navigator.geolocation) {
      setMsg("Tu navegador no permite compartir ubicación.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        choose({
          modo: "delivery",
          label: "Delivery · tu ubicación",
          dir: "Ubicación compartida desde tu celular",
          zona: "Tu ubicación",
          coords: [pos.coords.latitude, pos.coords.longitude],
          exacta: true,
        }),
      () => setMsg("No pudimos obtener tu ubicación. Busca tu dirección abajo."),
    );
  };

  return (
    <div className="rb-overlay" style={{ zIndex: 100, padding: 24 }} role="dialog" aria-modal="true" aria-labelledby="rb-modal-title" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="rb-modal-card">
        <div className="rb-modal-head">
          <h2 id="rb-modal-title" className="rb-h-display">¿Cómo quieres tu pedido?</h2>
          <button ref={closeBtn} type="button" className="rb-round" style={{ width: 32, height: 32 }} aria-label="Cerrar" onClick={onClose}>
            <CloseIcon size={14} />
          </button>
        </div>

        <div className="rb-tabs">
          <button type="button" className="rb-tab" aria-pressed={tab === "delivery"} onClick={() => setTab("delivery")}>Delivery</button>
          <button type="button" className="rb-tab" aria-pressed={tab === "pickup"} onClick={() => setTab("pickup")}>Retiro en local</button>
        </div>

        {tab === "delivery" ? (
          <div>
            <button type="button" className="rb-btn rb-btn--cta rb-btn--red rb-btn--block" style={{ fontSize: 13, padding: 14, marginBottom: 18 }} onClick={shareLocation}>
              Compartir mi ubicación
            </button>
            <div className="rb-or">
              <i />
              <span>O busca tu dirección</span>
              <i />
            </div>
            <div className="rb-field">
              <label className="rb-label" htmlFor="rb-district">Distrito</label>
              <select id="rb-district" className="rb-input" value={district} onChange={(e) => setDistrict(e.target.value)}>
                <option value="">Selecciona un distrito</option>
                {Object.keys(DISTRICTS).map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="rb-field" style={{ marginBottom: 20 }}>
              <label className="rb-label" htmlFor="rb-address">Tu dirección</label>
              <input id="rb-address" className="rb-input" type="text" placeholder="Av. / Calle y número" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <button type="button" className="rb-btn rb-btn--cta rb-btn--yellow rb-btn--block" style={{ fontSize: 13, padding: 14 }} onClick={saveDelivery}>
              Confirmar dirección
            </button>
            <p className="rb-error" role="alert">{msg}</p>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: 13, color: "var(--color-fg-muted)", margin: "0 0 14px" }}>Elige el local donde recoges tu pedido.</p>
            <button
              type="button"
              className="rb-local"
              onClick={() =>
                choose({ modo: "retiro", label: "Retiro · Miraflores", dir: STORE.address, zona: "Miraflores", coords: STORE.coords, exacta: true })
              }
            >
              <PinIcon size={20} />
              <span style={{ minWidth: 0 }}>
                <strong>Miraflores</strong>
                <span>Av. Gral. Mendiburu 290 · Lun–Sáb 5:30–11:30 pm</span>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ModeDialog() {
  const { modeOpen, setModeOpen } = useStore();
  if (!modeOpen) return null;
  return <Dialog onClose={() => setModeOpen(false)} />;
}
