"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { STORE, money } from "@/app/lib/menu";
import { CheckIcon, CloseIcon, TrashIcon } from "./Icons";
import LeafletMap from "./LeafletMap";
import { useBodyLock, useStore, type CartLine, type Loc } from "./StoreProvider";

type Pago = "Yape" | "Plin" | "Efectivo";

/** Customer details survive closing and reopening the checkout. */
interface Draft {
  nombre: string;
  apellidos: string;
  tel: string;
  ref: string;
  pago: Pago;
}

const STEPS = ["Mi pedido", "Entrega", "Pago"];

function Thumb({ line, size }: { line: CartLine; size: number }) {
  return (
    <div className="rb-thumb" style={{ width: size, height: size }}>
      <Image src={line.img} alt="" fill sizes={`${size}px`} />
    </div>
  );
}

function Field({ label, value, onChange, placeholder, required }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; required?: boolean;
}) {
  return (
    <label className="rb-field-label">
      <span>
        {label}
        {required && <> <b>*</b></>}
      </span>
      <input className="rb-input" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function Choice({ on, title, sub, wide, onClick }: { on: boolean; title: string; sub: string; wide?: boolean; onClick: () => void }) {
  return (
    <button type="button" className={`rb-choice${wide ? " rb-choice--wide" : ""}`} aria-pressed={on} onClick={onClick}>
      <div className="rb-choice__head">
        <span className="rb-choice__radio" />
        <span className="rb-choice__title">{title}</span>
      </div>
      <div className="rb-choice__sub">{sub}</div>
    </button>
  );
}

function Summary({ cart, subtotal, delivery, total }: { cart: CartLine[]; subtotal: number; delivery: boolean; total: number }) {
  return (
    <aside>
      <div className="rb-summary">
        <h2 className="rb-h-display">Resumen</h2>
        <div className="rb-summary__count">{cart.length} {cart.length === 1 ? "producto" : "productos"}</div>
        {cart.map((l) => (
          <div className="rb-summary__line" key={l.id}>
            <Thumb line={l} size={40} />
            <div>
              <div className="rb-summary__name">{l.qty}× {l.name}</div>
              {l.opts && <div className="rb-summary__opts">{l.opts}</div>}
            </div>
            <span className="rb-mono">{money(l.unit * l.qty)}</span>
          </div>
        ))}
        <div className="rb-summary__row rb-summary__row--first"><span>Subtotal</span><span className="rb-mono">{money(subtotal)}</span></div>
        <div className="rb-summary__row">
          <span>{delivery ? "Delivery" : "Retiro en local"}</span>
          <span className="rb-mono">{delivery ? money(STORE.deliveryFee) : "Gratis"}</span>
        </div>
        <div className="rb-summary__total"><span>Total</span><span className="rb-mono">{money(total)}</span></div>
      </div>
    </aside>
  );
}

function CheckoutView({ initial, onDraft, onClose }: { initial: Draft; onDraft: (d: Draft) => void; onClose: () => void }) {
  const { cart, subtotal, loc, setQty, removeLine, clearCart } = useStore();
  const [step, setStep] = useState(1);
  const [listo, setListo] = useState(false);
  const [modo, setModo] = useState<Loc["modo"]>(loc?.modo ?? "retiro");
  const [dir, setDir] = useState(loc?.dir ?? "");
  const [editDir, setEditDir] = useState(false);
  const [acepta, setAcepta] = useState(false);
  const [err, setErr] = useState("");
  const [nombre, setNombre] = useState(initial.nombre);
  const [apellidos, setApellidos] = useState(initial.apellidos);
  const [tel, setTel] = useState(initial.tel);
  const [ref, setRef] = useState(initial.ref);
  const [pago, setPago] = useState<Pago>(initial.pago);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useBodyLock(true);
  useEffect(() => {
    closeBtn.current?.focus();
  }, []);
  useEffect(() => {
    onDraft({ nombre, apellidos, tel, ref, pago });
  }, [onDraft, nombre, apellidos, tel, ref, pago]);

  const delivery = modo === "delivery";
  const total = subtotal + (delivery ? STORE.deliveryFee : 0);
  const usaGuardada = !!loc && loc.modo === modo && !editDir;
  const goto = (n: number) => {
    setErr("");
    setStep(n);
  };

  const next2 = () => {
    if (!nombre.trim() || tel.replace(/\D/g, "").length < 6 || (delivery && !dir.trim())) {
      setErr(`Completa tu nombre, celular${delivery ? " y dirección" : ""} para continuar.`);
      return;
    }
    goto(3);
  };

  const confirm = () => {
    if (!acepta) {
      setErr("Marca la casilla para confirmar tu pedido.");
      return;
    }
    setListo(true);
  };

  const whatsappHref = () => {
    const lines = [
      "Hola Real Broaster, quiero confirmar mi pedido:",
      ...cart.map((l) => `- ${l.qty}x ${l.name}${l.opts ? ` (${l.opts})` : ""}${l.note ? ` — Nota: ${l.note}` : ""}`),
      `Total: ${money(total)}`,
      `Entrega: ${delivery ? `Delivery - ${dir}${ref ? ` (${ref})` : ""}` : "Retiro en local"}`,
      `Pago: ${pago}`,
      `Cliente: ${`${nombre} ${apellidos}`.trim()} · ${tel}`,
    ];
    return `https://wa.me/${STORE.orderWhatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  return (
    <div className="rb-checkout" role="dialog" aria-modal="true" aria-label="Tu pedido">
      <div className="rb-checkout__bar">
        <div className="rb-checkout__brand">Real Broaster</div>
        <button ref={closeBtn} type="button" className="rb-round" aria-label="Cerrar" onClick={onClose}>
          <CloseIcon size={14} />
        </button>
      </div>
      <div className="rb-checkout__wrap">
        <div className="rb-co-steps">
          {STEPS.map((t, i) => {
            const n = i + 1;
            const done = n < step;
            return (
              <span key={t} style={{ display: "contents" }}>
                <button
                  type="button"
                  className={`rb-co-step${done ? " is-done" : ""}`}
                  aria-current={n === step ? "step" : undefined}
                  disabled={n > step || listo}
                  onClick={() => goto(n)}
                >
                  <span className="rb-co-step__n">{n}</span>
                  <span className="rb-co-step__t">{t}</span>
                </button>
                {i < STEPS.length - 1 && <span className="rb-co-sep">›</span>}
              </span>
            );
          })}
        </div>

        <div className="rb-co-grid">
          <div>
            {listo ? (
              <div className="rb-done">
                <div className="rb-done__icon"><CheckIcon size={28} strokeWidth={3.2} /></div>
                <h2 className="rb-h-display" style={{ fontSize: "clamp(26px,3vw,36px)", marginBottom: 8 }}>¡Pedido enviado!</h2>
                <p className="rb-script">Ya lo estamos preparando</p>
                <p>Mándanos la captura de tu pago por WhatsApp y confirmamos tu pedido al toque.</p>
                <a className="rb-btn rb-btn--red" href={whatsappHref()} target="_blank" rel="noopener">Enviar por WhatsApp</a>
                <div style={{ marginTop: 18 }}>
                  <button type="button" className="rb-link" style={{ margin: 0 }} onClick={() => { clearCart(); onClose(); }}>
                    Hacer otro pedido
                  </button>
                </div>
              </div>
            ) : step === 1 ? (
              <>
                <h1 className="rb-h-display rb-co-title">Mi pedido</h1>
                <p className="rb-script rb-co-sub">Revisa antes de seguir</p>
                <div className="rb-co-note">Preparamos tu pedido en 20-25 min. Pide antes de que cierre la cocina.</div>
                <div className="rb-lines">
                  {cart.map((l) => (
                    <div className="rb-line" key={l.id}>
                      <Thumb line={l} size={62} />
                      <div className="rb-line__main">
                        <div className="rb-line__name">{l.name}</div>
                        {l.opts && <div className="rb-line__opts">{l.opts}</div>}
                        {l.note && <div className="rb-line__note">Nota: {l.note}</div>}
                      </div>
                      <div className="rb-line__qty">
                        <button type="button" className="rb-round" aria-label="Quitar uno" onClick={() => setQty(l.id, l.qty - 1)}>−</button>
                        <output>{l.qty}</output>
                        <button type="button" className="rb-round" aria-label="Sumar uno" onClick={() => setQty(l.id, l.qty + 1)}>+</button>
                      </div>
                      <span className="rb-line__total">{money(l.unit * l.qty)}</span>
                      <button type="button" className="rb-line__del" aria-label={`Eliminar ${l.name}`} onClick={() => removeLine(l.id)}>
                        <TrashIcon size={18} />
                      </button>
                    </div>
                  ))}
                  <button type="button" className="rb-link" onClick={onClose}>← Seguir pidiendo</button>
                </div>
                <div className="rb-co-next">
                  <button type="button" className="rb-btn rb-btn--red rb-btn--block rb-co-cta" onClick={() => goto(2)}>Continuar</button>
                </div>
              </>
            ) : step === 2 ? (
              <>
                <h1 className="rb-h-display rb-co-title">Entrega</h1>
                <p className="rb-script rb-co-sub">¿Cómo lo quieres recibir?</p>
                <div className="rb-choices" style={{ marginBottom: 18 }}>
                  <Choice wide on={modo === "retiro"} title="Retiro en local" sub="Listo en 20 min · sin costo" onClick={() => { setModo("retiro"); setEditDir(false); }} />
                  <Choice wide on={delivery} title="Delivery" sub={`Zona cercana · ${money(STORE.deliveryFee)}`} onClick={() => { setModo("delivery"); setEditDir(false); }} />
                </div>

                {usaGuardada && loc && (
                  <div className="rb-panel rb-loc">
                    <h3 className="rb-block-title">{loc.modo === "delivery" ? "Enviamos a" : "Tu punto de retiro"}</h3>
                    <div className="rb-loc__grid">
                      <div>
                        <div className="rb-loc__zone">{loc.zona}</div>
                        <div className="rb-loc__dir">{loc.dir}</div>
                        <div className="rb-loc__eta">
                          {loc.modo === "delivery" ? "Llega en 30-40 min. El repartidor te llama al llegar." : "Guardamos tu pedido 30 minutos desde que esté listo."}
                        </div>
                        <button type="button" className="rb-btn rb-loc__change" onClick={() => { setEditDir(true); setDir(""); }}>Cambiar</button>
                      </div>
                      <LeafletMap className="rb-co-map" variant="preview" coords={loc.coords} />
                    </div>
                  </div>
                )}

                <div className="rb-panel">
                  <h3 className="rb-block-title">Tus datos</h3>
                  <div className="rb-fields">
                    <Field label="Nombre" value={nombre} onChange={setNombre} placeholder="Ej. Juan" required />
                    <Field label="Apellidos" value={apellidos} onChange={setApellidos} placeholder="Ej. Pérez" />
                    <Field label="Celular" value={tel} onChange={setTel} placeholder="Ej. 999 888 777" required />
                  </div>
                  {delivery && !usaGuardada && (
                    <div className="rb-fields">
                      <Field label="Dirección" value={dir} onChange={setDir} placeholder="Calle, número, dpto." required />
                      <Field label="Referencia" value={ref} onChange={setRef} placeholder="Ej. frente al parque" />
                    </div>
                  )}
                  {delivery && usaGuardada && (
                    <div>
                      <Field label="Referencia (opcional)" value={ref} onChange={setRef} placeholder="Ej. frente al parque" />
                    </div>
                  )}
                </div>
                <div className="rb-co-err" role="alert">{err}</div>
                <div className="rb-co-actions" style={{ maxWidth: 520 }}>
                  <button type="button" className="rb-btn rb-btn--ghost" onClick={() => goto(1)}>← Volver</button>
                  <div><button type="button" className="rb-btn rb-btn--red rb-btn--block rb-co-cta" onClick={next2}>Ir a pagar</button></div>
                </div>
              </>
            ) : (
              <>
                <h1 className="rb-h-display rb-co-title">Pago</h1>
                <p className="rb-script rb-co-sub">Yape, Plin o efectivo</p>
                <div className="rb-panel">
                  <div className="rb-label" style={{ marginBottom: 12 }}>¿Cómo vas a pagar?</div>
                  <div className="rb-choices">
                    <Choice on={pago === "Yape"} title="Yape" sub="Escanea el QR" onClick={() => setPago("Yape")} />
                    <Choice on={pago === "Plin"} title="Plin" sub="Mismo QR y número" onClick={() => setPago("Plin")} />
                    <Choice on={pago === "Efectivo"} title="Efectivo" sub="Al recibir tu pedido" onClick={() => setPago("Efectivo")} />
                  </div>
                  {pago === "Efectivo" ? (
                    <div className="rb-pay-cash">
                      <h4>Pagas al recibir</h4>
                      <p>Ten listo {money(total)}. Si necesitas vuelto, avísanos por WhatsApp.</p>
                    </div>
                  ) : (
                    <div className="rb-qr">
                      <h4>Escanea para pagar {money(total)}</h4>
                      <Image src="/assets/yape-qr.png" alt="QR de pago Yape / Plin" width={564} height={795} />
                      <p className="rb-qr__name">Manuel Andrés Sánchez Cova</p>
                      <p>¿No puedes escanear? Yapea o Plinea al <strong>+51 900 633 137</strong></p>
                      <p className="rb-qr__small">Después de pagar, mándanos la captura por WhatsApp para confirmar.</p>
                    </div>
                  )}
                  <label className="rb-accept">
                    <input type="checkbox" checked={acepta} onChange={(e) => setAcepta(e.target.checked)} />
                    <span>Confirmo mis datos y acepto los términos del pedido.</span>
                  </label>
                </div>
                <div className="rb-co-err" role="alert">{err}</div>
                <div className="rb-co-actions">
                  <button type="button" className="rb-btn rb-btn--ghost" onClick={() => goto(2)}>← Volver</button>
                  <div><button type="button" className="rb-btn rb-btn--red rb-btn--block rb-co-cta" onClick={confirm}>Confirmar pedido · {money(total)}</button></div>
                </div>
              </>
            )}
          </div>
          {!listo && <Summary cart={cart} subtotal={subtotal} delivery={delivery} total={total} />}
        </div>
      </div>
    </div>
  );
}

export default function Checkout() {
  const { checkoutOpen, closeCheckout } = useStore();
  const [draft, setDraft] = useState<Draft>({ nombre: "", apellidos: "", tel: "", ref: "", pago: "Yape" });
  if (!checkoutOpen) return null;
  return <CheckoutView initial={draft} onDraft={setDraft} onClose={closeCheckout} />;
}
