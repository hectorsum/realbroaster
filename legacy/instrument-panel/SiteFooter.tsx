import { DialIcon } from "./Icons";

export default function SiteFooter() {
  return (
    <footer className="border-t border-black/40 bg-panel px-5 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-2 text-steel-dim">
          <DialIcon className="h-4 w-4" />
          <span
            className="text-xs font-bold uppercase tracking-[0.3em]"
            style={{ fontFamily: "var(--font-mono-panel)" }}
          >
            Real Broaster
          </span>
        </div>
        <p className="text-xs text-steel-dim">Reescribiendo tus antojos — pollo broasted a domicilio.</p>
        <p className="tabular text-xs text-steel-dim" style={{ fontFamily: "var(--font-mono-panel)" }}>
          923 921 581 · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
