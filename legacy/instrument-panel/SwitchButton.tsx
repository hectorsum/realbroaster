import type { ComponentType } from "react";

export default function SwitchButton({
  href,
  external,
  variant,
  Icon,
  children,
}: {
  href: string;
  external?: boolean;
  variant: "primary" | "secondary";
  Icon: ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  const primary = variant === "primary";
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group relative flex flex-1 items-center gap-3 px-6 py-4 text-base font-extrabold uppercase tracking-wide transition-transform active:translate-y-0.5 ${
        primary ? "text-ink" : "text-steel-bright"
      }`}
      style={{
        background: primary
          ? "linear-gradient(180deg, #ffe066 0%, var(--yellow) 16%, var(--yellow) 82%, var(--yellow-deep) 100%)"
          : "linear-gradient(180deg, #3a3b3e 0%, var(--panel-2) 16%, var(--panel-2) 82%, #0c0d0e 100%)",
        boxShadow: primary
          ? "inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -5px 8px rgba(0,0,0,0.25), 0 8px 18px rgba(0,0,0,0.45)"
          : "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -5px 8px rgba(0,0,0,0.4), 0 8px 18px rgba(0,0,0,0.45)",
        border: "1px solid rgba(0,0,0,0.55)",
      }}
    >
      <span
        aria-hidden="true"
        className="h-2.5 w-2.5 shrink-0 rounded-full"
        style={{
          background: primary ? "var(--ember-bright)" : "var(--steel-dim)",
          boxShadow: primary ? "0 0 7px 2px rgba(255,122,77,0.85)" : "none",
        }}
      />
      <Icon className="h-5 w-5 shrink-0" />
      <span className="flex-1 text-left">{children}</span>
      <span
        aria-hidden="true"
        className="flex h-5 w-9 shrink-0 items-center rounded-full"
        style={{
          background: primary ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.06)",
          border: "1px solid rgba(0,0,0,0.4)",
          justifyContent: primary ? "flex-end" : "flex-start",
          padding: "2px",
        }}
      >
        <span
          className="block h-3.5 w-3.5 rounded-full"
          style={{ background: primary ? "var(--ink)" : "var(--steel)" }}
        />
      </span>
    </a>
  );
}
