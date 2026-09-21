"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CATS, GROUPS, money, type GroupKey, type MenuItem } from "@/app/lib/menu";
import { CheckIcon, CloseIcon, PinIcon, ScooterIcon } from "./Icons";
import { useBodyLock, useStore } from "./StoreProvider";

type Selection = Record<string, string[]>;

function Builder({ ci, ii, onClose }: { ci: number; ii: number; onClose: () => void }) {
  const { addLine } = useStore();
  const cat = CATS[ci];
  const item: MenuItem = cat.items[ii];
  const steps = item.steps;

  const [cur, setCur] = useState(0);
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [sel, setSel] = useState<Selection>(() => Object.fromEntries(steps.map((k) => [k, []])));
  const closeBtn = useRef<HTMLButtonElement>(null);

  useBodyLock(true);
  useEffect(() => {
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const groupDone = (k: GroupKey) => !GROUPS[k].req || sel[k].length > 0;
  const allDone = steps.every(groupDone);
  const extras = steps.reduce(
    (sum, k) => sum + GROUPS[k].opts.reduce((s, [name, price]) => s + (sel[k].includes(name) ? price : 0), 0),
    0,
  );
  const unit = item.p + extras;

  const toggle = (k: GroupKey, name: string) => {
    const g = GROUPS[k];
    setSel((prev) => {
      const list = prev[k];
      const has = list.includes(name);
      if (g.max === 1) return { ...prev, [k]: has ? [] : [name] };
      if (has) return { ...prev, [k]: list.filter((n) => n !== name) };
      if (list.length < g.max) return { ...prev, [k]: [...list, name] };
      return prev;
    });
  };
  const toggleAll = (k: GroupKey) => {
    const g = GROUPS[k];
    setSel((prev) => ({ ...prev, [k]: prev[k].length === g.opts.length ? [] : g.opts.map((o) => o[0]) }));
  };

  const add = () => {
    if (!allDone) return;
    addLine({
      name: item.n,
      img: item.img,
      opts: steps.map((k) => sel[k].join(", ")).filter(Boolean).join(" · "),
      note: note.trim(),
      qty,
      unit,
    });
    onClose();
  };

  const key = steps[Math.min(cur, steps.length - 1)];
  const group = key ? GROUPS[key] : null;
  const list = key ? sel[key] : [];
  const stepDone = group ? !group.req || list.length > 0 : true;
  const last = cur === steps.length - 1;

  return (
    <div className="rb-overlay rb-prod" role="dialog" aria-modal="true" aria-labelledby="rb-prod-name" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="rb-prod__card">
        <div className="rb-prod__scroll">
          <div className="rb-prod__top">
            <div className="rb-crumb">
              Inicio <i>›</i> {cat.label} <i>›</i> <b>{item.n}</b>
            </div>
            <button ref={closeBtn} type="button" className="rb-round rb-round--close" aria-label="Cerrar" onClick={onClose}>
              <CloseIcon size={14} />
            </button>
          </div>

          <div className="rb-prod__grid">
            <div>
              <div className="rb-prod__img">
                <Image src={item.img} alt={item.n} fill sizes="(min-width: 900px) 480px, 90vw" />
              </div>
              <h2 id="rb-prod-name" className="rb-h-display rb-prod__name">{item.n}</h2>
              <p className="rb-prod__desc">{item.d}</p>
              <div className="rb-prod__price">
                {money(item.p)} {item.was && <s>{money(item.was)}</s>}
              </div>
              <div className="rb-pickups">
                <b>Retiros disponibles</b>
                <div>
                  <span><PinIcon size={17} />Retiro en local</span>
                  <span><ScooterIcon size={17} />Delivery</span>
                </div>
              </div>
            </div>

            <div>
              {steps.length > 0 && (
                <div className="rb-steps">
                  {steps.map((k, i) => {
                    const done = groupDone(k) && sel[k].length > 0 && i !== cur;
                    return (
                      <div className="rb-step-item" key={k}>
                        <button
                          type="button"
                          className={`rb-step${done ? " is-done" : ""}`}
                          aria-current={i === cur ? "step" : undefined}
                          onClick={() => setCur(i)}
                        >
                          <span className="rb-step__dot">{done ? <CheckIcon size={13} strokeWidth={3.4} /> : i + 1}</span>
                          <span className="rb-step__label">{GROUPS[k].title}</span>
                        </button>
                        {i < steps.length - 1 && <i />}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="rb-form">
                {group && key ? (
                  <div>
                    <div className="rb-group__head">
                      <h3 className="rb-h-display">{group.title}</h3>
                      <span className={`rb-group__state${group.req && !stepDone ? " is-required" : ""}`}>
                        {group.req ? (stepDone ? "Listo" : "Obligatorio") : "Opcional"}
                      </span>
                    </div>
                    <p className="rb-script rb-group__sub">{group.sub}</p>
                    <div className="rb-chips">
                      {group.all && (
                        <button
                          type="button"
                          className="rb-chip rb-chip--all"
                          aria-pressed={list.length === group.opts.length}
                          onClick={() => toggleAll(key)}
                        >
                          <span className="rb-chip__box">{list.length === group.opts.length && <CheckIcon size={11} strokeWidth={4} />}</span>
                          Marcar todos
                        </button>
                      )}
                      {group.opts.map(([name, price]) => {
                        const on = list.includes(name);
                        return (
                          <button
                            key={name}
                            type="button"
                            className={`rb-chip${group.max === 1 ? " rb-chip--radio" : ""}`}
                            aria-pressed={on}
                            onClick={() => toggle(key, name)}
                          >
                            <span className="rb-chip__box">
                              {on && (group.max === 1 ? <i /> : <CheckIcon size={11} strokeWidth={4} />)}
                            </span>
                            <span className="rb-chip__name">{name}</span>
                            {price > 0 && <span className="rb-chip__price">+{money(price)}</span>}
                          </button>
                        );
                      })}
                    </div>
                    <div className="rb-group__step">Paso {cur + 1} de {steps.length}</div>
                  </div>
                ) : (
                  <div className="rb-panel rb-ready">
                    <h4>Listo para agregar</h4>
                    <p>Este producto no necesita complementos. Elige la cantidad y súmalo a tu pedido.</p>
                  </div>
                )}
              </div>

              {(steps.length === 0 || last) && (
                <div className="rb-note">
                  <label htmlFor="rb-note">
                    Comentarios <small>(opcional)</small>
                  </label>
                  <textarea
                    id="rb-note"
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Ej. sin cebolla, cremas en bolsita aparte…"
                  />
                </div>
              )}

              {steps.length > 0 && (
                <div className="rb-wiznav">
                  <button type="button" className="rb-btn rb-btn--ghost" disabled={cur === 0} onClick={() => setCur((c) => Math.max(0, c - 1))}>
                    ← Volver
                  </button>
                  {!last && (
                    <button type="button" className="rb-btn rb-btn--red" disabled={!stepDone} onClick={() => setCur((c) => c + 1)}>
                      Siguiente →
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="rb-prod__bar">
          <div className="rb-prod__bar-info">
            <div className="rb-thumb">
              <Image src={item.img} alt="" fill sizes="46px" style={{ objectFit: "contain" }} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div className="rb-prod__bar-name">{item.n}</div>
              <div className="rb-prod__bar-price">
                {money(unit * qty)} {item.was && <s>{money(item.was * qty)}</s>}
              </div>
            </div>
          </div>
          <div className="rb-prod__bar-actions">
            <div className="rb-qty">
              <button type="button" className="rb-round" aria-label="Quitar uno" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <output aria-live="polite">{qty}</output>
              <button type="button" className="rb-round" aria-label="Sumar uno" onClick={() => setQty((q) => Math.min(20, q + 1))}>+</button>
            </div>
            <button type="button" className="rb-btn rb-btn--red rb-prod__add" disabled={!allDone} onClick={add}>
              {allDone ? `Agregar al pedido · ${money(unit * qty)}` : "Elige lo obligatorio"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDialog() {
  const { product, closeProduct } = useStore();
  if (!product) return null;
  return <Builder key={`${product.ci}-${product.ii}`} ci={product.ci} ii={product.ii} onClose={closeProduct} />;
}
