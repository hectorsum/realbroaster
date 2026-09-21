import { PhoneIcon, TicketIcon, ScooterIcon } from "./Icons";
import type { ComponentType } from "react";

const STEPS: { n: string; title: string; body: string; Icon: ComponentType<{ className?: string }> }[] = [
  {
    n: "01",
    title: "Llamas o escribes",
    body: "Marcas el 923 921 581 o mandas un WhatsApp. Sin apps ni cuentas: hablas directo con la tienda.",
    Icon: PhoneIcon,
  },
  {
    n: "02",
    title: "Sale el ticket",
    body: "Confirmamos tu pedido al momento, como en el mostrador, y va directo a la freidora.",
    Icon: TicketIcon,
  },
  {
    n: "03",
    title: "Llega en moto",
    body: "Reparto propio hasta tu puerta, caliente y recién salido de la Broaster.",
    Icon: ScooterIcon,
  },
];

export default function HowItWorks() {
  return (
    <section className="relative bg-panel-2 px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <h2
          className="engraved text-center text-4xl font-extrabold uppercase tracking-tight sm:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Cómo funciona
        </h2>

        <div className="brushed relative mt-12 rounded-md border border-black/40 bg-panel px-6 py-10 shadow-[0_18px_40px_rgba(0,0,0,0.45)] sm:px-12 sm:py-14">
          <span className="rivet absolute left-3 top-3" />
          <span className="rivet absolute right-3 top-3" />
          <span className="rivet absolute bottom-3 left-3" />
          <span className="rivet absolute bottom-3 right-3" />

          <div className="relative grid gap-10 sm:grid-cols-3 sm:gap-6">
            <div
              aria-hidden="true"
              className="absolute left-[16.6%] right-[16.6%] top-10 hidden h-px sm:block"
              style={{
                backgroundImage: "repeating-linear-gradient(90deg, var(--steel-dim) 0 8px, transparent 8px 16px)",
              }}
            />
            {STEPS.map(({ n, title, body, Icon }) => (
              <div key={n} className="flex flex-col items-center text-center">
                <div
                  className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: "radial-gradient(circle at 42% 36%, #26262a 0%, #17181a 70%, #0c0d0e 100%)",
                    border: "3px dashed var(--steel-dim)",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05), 0 8px 18px rgba(0,0,0,0.4)",
                  }}
                >
                  <Icon className="h-7 w-7 text-steel-bright" />
                </div>
                <span
                  className="tabular mt-4 text-xs font-bold tracking-[0.25em] text-yellow"
                  style={{ fontFamily: "var(--font-mono-panel)" }}
                >
                  PASO {n}
                </span>
                <h3 className="mt-2 text-xl font-bold uppercase tracking-tight text-steel-bright">{title}</h3>
                <p className="mt-2 max-w-[22ch] text-[15px] leading-relaxed text-steel">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
