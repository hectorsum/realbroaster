"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { BANNERS, STORE } from "@/app/lib/menu";
import { useSwipe } from "@/app/lib/useSwipe";
import { ArrowIcon, BurgerIcon, CloseIcon, PhoneIcon, PinIcon } from "./Icons";
import { scrollToId, useStore } from "./StoreProvider";

const ROTATE_MS = 6000;

function Banner() {
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = BANNERS.length;

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);
  const restart = useCallback(() => {
    stop();
    timer.current = setInterval(() => setIdx((i) => (i + 1) % count), ROTATE_MS);
  }, [stop, count]);

  useEffect(() => {
    restart();
    return stop;
  }, [restart, stop]);

  const go = (next: number) => {
    setIdx((next + count) % count);
    restart();
  };

  const { dragX, dragging, handlers } = useSwipe({
    onSwipe: (dir) => setIdx((i) => (i + dir + count) % count),
    onStart: stop,
    onEnd: restart,
  });

  return (
    <div className="rb-banner">
      <div
        className={`rb-ban-viewport${dragging ? " is-dragging" : ""}`}
        {...handlers}
      >
        <div
          className={`rb-ban-track${dragging ? " is-dragging" : ""}`}
          style={{ transform: `translateX(calc(${-idx * 100}% + ${dragX}px))` }}
        >
          {BANNERS.map((b, i) => (
            <div key={b.titulo} className={`rb-ban-slide rb-ban-slide--${b.tone}`} aria-hidden={i !== idx}>
              <div className="rb-ban-copy">
                <div className="rb-ban-kicker">{b.kicker}</div>
                <h2 className="rb-ban-title">{b.titulo}</h2>
                <div className="rb-ban-offer">
                  <div className="rb-ban-price">
                    <small>S/</small>
                    <strong>{b.precio}</strong>
                    <small>{b.cent}</small>
                  </div>
                  <span className="rb-ban-was">{b.antes}</span>
                  <ul className="rb-ban-bullets">
                    {b.bullets.map((t) => (
                      <li key={t}>+ {t}</li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  className="rb-btn rb-ban-cta"
                  tabIndex={i === idx ? 0 : -1}
                  onClick={() => scrollToId(b.target, 84)}
                >
                  Comprar
                </button>
              </div>
              <div className="rb-ban-photo-wrap">
                <div className="rb-ban-photo">
                  <Image src={b.img} alt={b.titulo} fill sizes="280px" priority={i === 0} draggable={false} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button type="button" className="rb-round rb-ban-nav rb-ban-nav--prev" aria-label="Promoción anterior" onClick={() => go(idx - 1)}>
        <ArrowIcon size={18} />
      </button>
      <button type="button" className="rb-round rb-ban-nav rb-ban-nav--next" aria-label="Siguiente promoción" onClick={() => go(idx + 1)}>
        <ArrowIcon size={18} />
      </button>
      <div className="rb-dots rb-ban-dots">
        {BANNERS.map((b, i) => (
          <button
            key={b.titulo}
            type="button"
            className="rb-dot"
            aria-label={`Promoción ${i + 1}`}
            aria-current={i === idx}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default function SiteHeader() {
  const { loc, setModeOpen, cartCount, openCheckout } = useStore();
  const [navOpen, setNavOpen] = useState(false);

  const onPedir = () => {
    if (cartCount > 0) openCheckout();
    else scrollToId("menu", 68);
  };

  return (
    <section className="rb-top">
      <div className="rb-topbar">
        <div className="rb-bar">
          <div className="rb-brandgroup">
            <Image src="/assets/logo-mark.webp" alt="Real Broaster" width={1344} height={768} className="rb-logo" priority />
            <button type="button" className={`rb-mode-btn${loc ? " is-set" : ""}`} title={loc?.label} onClick={() => setModeOpen(true)}>
              <PinIcon size={18} />
              <span className="rb-mode-label">{loc?.label ?? "¿Cómo recibes tu pedido?"}</span>
            </button>
            <button
              type="button"
              className="rb-burger"
              aria-label="Abrir menú"
              aria-expanded={navOpen}
              onClick={() => setNavOpen((o) => !o)}
            >
              {navOpen ? <CloseIcon size={22} /> : <BurgerIcon size={22} />}
            </button>
          </div>
          <nav className={`rb-nav${navOpen ? " is-open" : ""}`} onClick={() => setNavOpen(false)}>
            <a href="#menu">Menú</a>
            <a href="#nosotros">Local</a>
            <a href="#nosotros">Contacto</a>
          </nav>
          <button type="button" className="rb-btn rb-btn--cta rb-btn--yellow rb-pedir" onClick={onPedir}>
            Pedir ahora
            <span className="rb-pedir__count">{cartCount}</span>
          </button>
        </div>
        <svg className="rb-topbar__wave" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,35 C180,90 320,0 480,45 C640,90 780,10 960,50 C1120,88 1260,20 1440,48 L1440,100 L0,100 Z" fill="var(--yellow-500)" />
        </svg>
      </div>

      <div className="rb-hero">
        <h1 className="sr-only">Real Broaster — pollo broaster a domicilio en Miraflores, Lima</h1>
        <Banner />
        <div className="rb-herostrip">
          <a className="rb-btn rb-btn--cta rb-herostrip__phone" href={STORE.phoneHref}>
            <PhoneIcon size={18} />
            {STORE.phoneDisplay}
          </a>
          <button type="button" className="rb-btn rb-btn--cta rb-btn--white" onClick={() => scrollToId("menu", 68)}>
            Ver menú
          </button>
          <button type="button" className="rb-btn rb-btn--cta rb-btn--white" onClick={() => scrollToId("nosotros", 68)}>
            Encuéntranos
          </button>
          <div className="rb-discount">
            <strong>-5%</strong>
            <i />
            <span>
              Desde tu
              <br />
              2do pedido
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
