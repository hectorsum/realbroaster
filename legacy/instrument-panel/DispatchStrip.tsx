const ITEMS = [
  "PEDIDOS POR TELÉFONO",
  "WHATSAPP DIRECTO",
  "REPARTO A DOMICILIO",
  "RECIÉN SALIDO DE LA BROASTER",
  "SIN APPS, SIN COMISIONES",
];

function Row() {
  return (
    <>
      {ITEMS.map((item) => (
        <span key={item} className="mx-6 inline-flex items-center gap-6 sm:mx-8">
          <span
            className="tabular text-[13px] font-bold uppercase tracking-[0.22em] text-panel"
            style={{ fontFamily: "var(--font-mono-panel)" }}
          >
            {item}
          </span>
          <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-panel/60" />
        </span>
      ))}
    </>
  );
}

export default function DispatchStrip() {
  return (
    <div className="overflow-hidden border-y-2 border-yellow-deep bg-yellow py-3" role="presentation">
      <div className="flex w-max animate-ticker whitespace-nowrap">
        <Row />
        <Row />
      </div>
    </div>
  );
}
