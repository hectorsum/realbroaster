"use client";

import { useEffect, useState } from "react";
import { PhoneIcon } from "./Icons";

const START = -100;
const END = 100;

export default function ScrollGauge({ phoneDisplay, phoneHref }: { phoneDisplay: string; phoneHref: string }) {
  const [progress, setProgress] = useState(0);
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setProgress(Math.min(1, Math.max(0, p)));
      setPast(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const angle = START + progress * (END - START);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-2.5 transition-[background-color,box-shadow] duration-300 sm:px-6 ${
        past ? "bg-panel/95 shadow-[0_1px_0_rgba(0,0,0,0.6)] backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <svg viewBox="0 0 40 40" width="30" height="30" aria-hidden="true">
          <circle cx="20" cy="20" r="18" fill="var(--panel-2)" stroke="var(--steel-dim)" strokeWidth="1.5" />
          <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: "20px 20px", transition: "transform 80ms linear" }}>
            <line x1="20" y1="20" x2="20" y2="7" stroke="var(--ember-bright)" strokeWidth="2" strokeLinecap="round" />
          </g>
          <circle cx="20" cy="20" r="2" fill="var(--steel)" />
        </svg>
        <span
          className="font-display text-[15px] font-extrabold uppercase tracking-tight text-paper"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Real Broaster
        </span>
      </div>

      <a
        href={phoneHref}
        className={`flex items-center gap-2 rounded-sm border border-yellow-deep bg-yellow px-3 py-1.5 text-[13px] font-bold uppercase tracking-wide text-ink transition-all duration-300 ${
          past ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0 sm:pointer-events-auto sm:translate-y-0 sm:opacity-100"
        }`}
        style={{ fontFamily: "var(--font-mono-panel)" }}
      >
        <PhoneIcon className="h-3.5 w-3.5" />
        {phoneDisplay}
      </a>
    </header>
  );
}
