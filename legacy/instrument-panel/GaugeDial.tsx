const START = -118;
const END = 118;

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p0 = polar(cx, cy, r, a0);
  const p1 = polar(cx, cy, r, a1);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${p0.x} ${p0.y} A ${r} ${r} 0 ${large} 1 ${p1.x} ${p1.y}`;
}

export type GaugeState = {
  label: string;
};

export default function GaugeDial({
  states,
  activeIndex,
  size = 420,
}: {
  states: GaugeState[];
  activeIndex: number;
  size?: number | string;
}) {
  const cx = 100;
  const cy = 104;
  const n = states.length;
  const angleFor = (i: number) => START + (i / (n - 1)) * (END - START);
  const activeAngle = angleFor(activeIndex);

  const minorTicks = Array.from({ length: 33 }, (_, i) => START + (i / 32) * (END - START));

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-label={`Panel de estado: ${states[activeIndex].label}`}
      className="overflow-visible"
    >
      <defs>
        <radialGradient id="face" cx="50%" cy="42%" r="70%">
          <stop offset="0%" stopColor="#232427" />
          <stop offset="70%" stopColor="#17181a" />
          <stop offset="100%" stopColor="#0c0d0e" />
        </radialGradient>
        <linearGradient id="bezel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e4e7ea" />
          <stop offset="45%" stopColor="#8a9096" />
          <stop offset="55%" stopColor="#5c6167" />
          <stop offset="100%" stopColor="#c7ccd0" />
        </linearGradient>
        <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* bezel */}
      <circle cx={cx} cy={cy} r={94} fill="url(#bezel)" />
      <circle cx={cx} cy={cy} r={88} fill="url(#face)" stroke="#000" strokeOpacity={0.5} strokeWidth={1} />

      {/* track */}
      <path
        d={arcPath(cx, cy, 78, START, END)}
        fill="none"
        stroke="var(--steel-dim)"
        strokeWidth={2}
        strokeLinecap="round"
      />
      {/* active zone glow behind needle target */}
      <path
        d={arcPath(cx, cy, 78, activeAngle - 9, activeAngle + 9)}
        fill="none"
        stroke="var(--ember)"
        strokeWidth={4}
        strokeLinecap="round"
        filter="url(#glow)"
      />

      {/* minor ticks */}
      {minorTicks.map((a, i) => {
        const p0 = polar(cx, cy, 84, a);
        const p1 = polar(cx, cy, i % 4 === 0 ? 74 : 79, a);
        return (
          <line
            key={i}
            x1={p0.x}
            y1={p0.y}
            x2={p1.x}
            y2={p1.y}
            stroke="var(--steel)"
            strokeOpacity={i % 4 === 0 ? 0.9 : 0.4}
            strokeWidth={i % 4 === 0 ? 1.4 : 0.8}
          />
        );
      })}

      {/* state labels — ghosted except the one struck forward */}
      {states.map((s, i) => {
        const a = angleFor(i);
        const p = polar(cx, cy, 60, a);
        const active = i === activeIndex;
        return (
          <text
            key={s.label}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="tabular"
            style={{
              fontFamily: "var(--font-mono-panel)",
              fontSize: active ? 8.6 : 6.4,
              fontWeight: active ? 700 : 500,
              fill: active ? "var(--yellow)" : "var(--steel-dim)",
              letterSpacing: "0.02em",
            }}
            filter={active ? "url(#glow)" : undefined}
          >
            {s.label}
          </text>
        );
      })}

      {/* needle */}
      <g
        style={{
          transform: `rotate(${activeAngle}deg)`,
          transformOrigin: `${cx}px ${cy}px`,
          transition: "transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <line x1={cx} y1={cy} x2={cx} y2={cy - 68} stroke="var(--ember-bright)" strokeWidth={2.6} strokeLinecap="round" filter="url(#glow)" />
        <line x1={cx} y1={cy} x2={cx} y2={cy + 12} stroke="var(--steel-dim)" strokeWidth={4} strokeLinecap="round" />
      </g>

      {/* hub */}
      <circle cx={cx} cy={cy} r={7} fill="url(#bezel)" stroke="#000" strokeOpacity={0.4} />
      <circle cx={cx} cy={cy} r={2.4} fill="#0c0d0e" />
    </svg>
  );
}
