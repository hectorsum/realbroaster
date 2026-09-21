"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { CATS, money, type Category } from "@/app/lib/menu";
import { useSwipe } from "@/app/lib/useSwipe";
import { ArrowIcon, HeartIcon, PlusIcon } from "./Icons";
import { scrollToId, useStore } from "./StoreProvider";

const MIN_CARD = 230;

interface Metrics {
  perView: number;
  pages: number;
  step: number;
  cardW: number;
  count: number;
}

function FavButton({ name }: { name: string }) {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      className="rb-fav"
      aria-label={`${on ? "Quitar de" : "Agregar a"} favoritos: ${name}`}
      aria-pressed={on}
      onClick={(e) => {
        e.stopPropagation();
        setOn((v) => !v);
      }}
    >
      <HeartIcon filled={on} />
    </button>
  );
}

function CategoryCarousel({ cat, ci }: { cat: Category; ci: number }) {
  const { openProduct } = useStore();
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [m, setM] = useState<Metrics | null>(null);

  const measure = useCallback(() => {
    const vp = viewport.current;
    const tr = track.current;
    if (!vp || !tr) return;
    const count = cat.items.length;
    const gap = parseFloat(getComputedStyle(tr).columnGap) || 0;
    const avail = vp.clientWidth - (parseFloat(getComputedStyle(vp).paddingRight) || 0);
    const perView = Math.max(1, Math.min(count, Math.floor((avail + gap) / (MIN_CARD + gap))));
    const cardW = (avail - gap * (perView - 1)) / perView;
    setM({ perView, pages: Math.max(1, Math.ceil(count / perView)), step: cardW + gap, cardW, count });
  }, [cat.items.length]);

  useLayoutEffect(() => {
    measure();
    const vp = viewport.current;
    if (!vp || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(vp);
    return () => ro.disconnect();
  }, [measure]);

  const current = m ? Math.min(page, m.pages - 1) : 0;
  const { dragX, dragging, handlers } = useSwipe({
    onSwipe: (dir) => m && setPage(Math.min(Math.max(current + dir, 0), m.pages - 1)),
  });
  const maxIndex = m ? Math.max(0, m.count - m.perView) : 0;
  const offset = m ? Math.min(current * m.perView, maxIndex) * m.step : 0;

  return (
    <div
      className="rb-cat"
      id={`cat-${cat.id}`}
      data-cat-section
      style={m ? ({ "--rb-card-w": `${m.cardW}px` } as React.CSSProperties) : undefined}
    >
      <div className="rb-cat__head">
        <div style={{ minWidth: 0 }}>
          <div className="rb-cat__title">
            <h3>{cat.label}</h3>
            <span className="rb-cat__count">{cat.items.length} opciones</span>
          </div>
          <p className="rb-script rb-cat__tag">{cat.tag}</p>
        </div>
        {m && (
          <div className="rb-cat__navs">
            <button
              type="button"
              className="rb-round rb-round--nav"
              aria-label={`Anterior en ${cat.label}`}
              disabled={current === 0}
              onClick={() => setPage(current - 1)}
            >
              <ArrowIcon size={16} style={{ transform: "rotate(180deg)" }} />
            </button>
            <button
              type="button"
              className="rb-round rb-round--nav"
              aria-label={`Siguiente en ${cat.label}`}
              disabled={current === m.pages - 1}
              onClick={() => setPage(current + 1)}
            >
              <ArrowIcon size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="rb-viewport" ref={viewport} {...handlers}>
        <div
          className={`rb-track${dragging ? " is-dragging" : ""}`}
          ref={track}
          style={{ transform: `translateX(${-offset + dragX}px)` }}
        >
          {cat.items.map((it, ii) => (
            <div
              key={it.n}
              className="rb-card"
              role="button"
              tabIndex={0}
              aria-label={`Armar ${it.n}`}
              onClick={() => openProduct(ci, ii)}
              onKeyDown={(e) => {
                if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  openProduct(ci, ii);
                }
              }}
            >
              <div className="rb-card__media">
                <div>
                  <Image src={it.img} alt={it.n} fill sizes="260px" draggable={false} />
                </div>
              </div>
              <div className="rb-card__body">
                <div className="rb-card__top">
                  <div className="rb-card__name">{it.n}</div>
                  <FavButton name={it.n} />
                </div>
                <div className="rb-card__desc">{it.d}</div>
                <div className="rb-card__foot">
                  <span className="rb-price">
                    <strong>{money(it.p)}</strong>
                    {it.was && <s>{money(it.was)}</s>}
                  </span>
                  <button
                    type="button"
                    className="rb-add"
                    aria-label={`Agregar ${it.n}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      openProduct(ci, ii);
                    }}
                  >
                    <PlusIcon size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {m && (
        <div className="rb-dots">
          {Array.from({ length: m.pages }, (_, i) => (
            <button
              key={i}
              type="button"
              className="rb-dot"
              aria-label={`Ir al grupo ${i + 1}`}
              aria-current={i === current}
              onClick={() => setPage(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MenuSection() {
  const [active, setActive] = useState(CATS[0].id);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id.replace("cat-", ""));
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    document.querySelectorAll("[data-cat-section]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="menu" className="rb-menu">
      <div className="rb-wrap">
        <div style={{ marginBottom: 22 }}>
          <h2 className="rb-menu__title">Nuestro menú</h2>
          <p className="rb-script" style={{ fontSize: 21 }}>Elige tu plato y ármalo a tu gusto</p>
        </div>
        <div className="rb-pills">
          {CATS.map((c) => (
            <button
              key={c.id}
              type="button"
              className="rb-pill"
              aria-current={active === c.id}
              onClick={() => {
                setActive(c.id);
                scrollToId(`cat-${c.id}`, 84);
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
        {CATS.map((c, ci) => (
          <CategoryCarousel key={c.id} cat={c} ci={ci} />
        ))}
      </div>
    </section>
  );
}
