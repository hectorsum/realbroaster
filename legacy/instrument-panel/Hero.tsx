import GaugeDial from "./GaugeDial";
import SwitchButton from "./SwitchButton";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

const STATES = [{ label: "CERRADO" }, { label: "OCUPADO" }, { label: "LISTO" }, { label: "EXPRESS" }];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-panel pt-20 pb-10 sm:pt-24 sm:pb-12">
      {/* hazard edge */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-2.5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, var(--yellow) 0 14px, var(--ink) 14px 28px)",
        }}
      />

      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[min(60vw,540px)] w-[min(60vw,540px)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--ember) 0%, transparent 65%)" }}
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 text-center">
        <p
          className="mb-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-steel"
          style={{ fontFamily: "var(--font-mono-panel)" }}
        >
          Panel de estado · Pollo broasted a domicilio
        </p>

        <div className="w-full" style={{ maxWidth: "clamp(260px, 32vw, 420px)" }}>
          <GaugeDial states={STATES} activeIndex={2} size="100%" />
        </div>

        <div className="brushed relative mt-4 rounded-md border border-black/40 bg-panel-2 px-8 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.5)] sm:px-12 sm:py-5">
          <span className="rivet absolute left-3 top-3" />
          <span className="rivet absolute right-3 top-3" />
          <span className="rivet absolute bottom-3 left-3" />
          <span className="rivet absolute bottom-3 right-3" />

          <h1
            className="engraved text-[13vw] font-black uppercase leading-[0.85] tracking-tight sm:text-[46px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Real
            <br />
            Broaster
          </h1>
          <p
            className="stamped mt-2 text-sm font-medium uppercase tracking-[0.28em] text-yellow sm:text-base"
            style={{ fontFamily: "var(--font-mono-panel)" }}
          >
            Reescribiendo tus antojos
          </p>
        </div>

        <div
          className="tabular mt-5 text-3xl font-bold text-steel-bright sm:text-4xl"
          style={{ fontFamily: "var(--font-mono-panel)", letterSpacing: "0.04em" }}
        >
          923&nbsp;921&nbsp;581
        </div>
        <p className="mt-1.5 text-xs uppercase tracking-[0.2em] text-steel-dim">Línea directa de pedidos</p>

        <div className="mt-5 flex w-full max-w-md flex-col gap-3 sm:w-auto sm:flex-row">
          <SwitchButton href="tel:+34923921581" variant="primary" Icon={PhoneIcon}>
            Llamar ahora
          </SwitchButton>
          <SwitchButton href="https://wa.me/34923921581" external variant="secondary" Icon={WhatsAppIcon}>
            WhatsApp
          </SwitchButton>
        </div>
      </div>
    </section>
  );
}
