const ROWS = ["Pollo broasted — entero, medio o cuarto", "Alitas broasted", "Combos para compartir", "Acompañamientos"];

export default function MenuPlate() {
  return (
    <section className="bg-panel px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <h2
          className="engraved text-center text-4xl font-extrabold uppercase tracking-tight sm:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Lo que sale de la Broaster
        </h2>

        <div className="brushed relative mt-10 rounded-md border border-black/40 bg-panel-2 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.45)] sm:p-10">
          <span className="rivet absolute left-3 top-3" />
          <span className="rivet absolute right-3 top-3" />
          <span className="rivet absolute bottom-3 left-3" />
          <span className="rivet absolute bottom-3 right-3" />

          <dl className="divide-y divide-steel-dim/25">
            {ROWS.map((row) => (
              <div key={row} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow" />
                <dt className="text-base font-semibold uppercase tracking-wide text-steel-bright sm:text-lg">
                  {row}
                </dt>
              </div>
            ))}
          </dl>

          <p
            className="tabular mt-6 border-t border-dashed border-steel-dim/40 pt-5 text-center text-[13px] uppercase tracking-[0.12em] text-steel"
            style={{ fontFamily: "var(--font-mono-panel)" }}
          >
            Carta completa y precios · por teléfono o WhatsApp
          </p>
        </div>
      </div>
    </section>
  );
}
