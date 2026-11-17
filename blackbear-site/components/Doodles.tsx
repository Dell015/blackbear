/* Hand-drawn doodle kit in the Black Bear post style (cream single-line).
   Every stroked path carries data-draw so Motion.tsx can "pen" it in. */
type P = { className?: string; style?: React.CSSProperties };

export const Sun = ({ className, style }: P) => (
  <svg viewBox="0 0 100 100" className={`doodle ${className ?? ""}`} style={style} aria-hidden>
    <path data-draw d="M50 32c10 0 18 8 18 18s-8 18-18 18-18-8-18-18 8-17.5 18-18z" />
    <path data-draw d="M50 8v12M50 80v12M8 50h12M80 50h12M20 20l9 9M71 71l9 9M80 20l-9 9M29 71l-9 9" />
  </svg>
);

export const Heart = ({ className, style }: P) => (
  <svg viewBox="0 0 100 100" className={`doodle ${className ?? ""}`} style={style} aria-hidden>
    <path data-draw d="M50 84C30 70 12 56 14 36c1.5-14 18-20 28-10 4 4 7 9 8 12 1-4 5-10 11-13 12-6 26 2 25 17-1 18-18 30-36 42z" />
    <path data-draw d="M28 44l10 10M30 34l18 18M40 30l20 20M54 30l18 18M64 32l12 12" />
  </svg>
);

export const Sparkle = ({ className, style }: P) => (
  <svg viewBox="0 0 100 100" className={`doodle ${className ?? ""}`} style={style} aria-hidden>
    <path data-draw d="M42 14c2 18 6 24 24 26-18 3-22 8-24 26-2-18-7-23-24-26 17-2 22-8 24-26z" />
    <path data-draw d="M76 58c1 9 3 12 12 13-9 1-11 4-12 13-1-9-4-12-12-13 8-1 11-4 12-13z" />
  </svg>
);

export const Star = ({ className, style }: P) => (
  <svg viewBox="0 0 100 100" className={`doodle ${className ?? ""}`} style={style} aria-hidden>
    <path data-draw d="M50 10l11 26 28 3-21 18 7 28-25-15-25 15 7-28-21-18 28-3z" />
  </svg>
);

export const Squiggle = ({ className, style }: P) => (
  <svg viewBox="0 0 120 60" className={`doodle ${className ?? ""}`} style={style} aria-hidden>
    <path data-draw d="M4 40c10-26 22-26 18 0s14 26 18 0 14-26 18 0 14 26 18 0 14-26 18 0 10 16 18 6" />
  </svg>
);

export const CurlyArrow = ({ className, style, flip = false }: P & { flip?: boolean }) => (
  <svg viewBox="0 0 80 80" className={`doodle ${className ?? ""}`} style={{ transform: flip ? "scaleX(-1)" : undefined, ...style }} aria-hidden>
    <path data-draw d="M8 70c4-22 18-34 34-30 12 3 10 18 0 16s-6-22 10-28c8-3 16-2 22 2" />
    <path data-draw d="M64 22l11 8-13 4" />
  </svg>
);

export const Plane = ({ className, style }: P) => (
  <svg viewBox="0 0 100 100" className={`doodle ${className ?? ""}`} style={style} aria-hidden>
    <path data-draw d="M10 46l80-30-24 70-14-26z" />
    <path data-draw d="M52 60l38-44M52 60l-4 22 12-14" />
  </svg>
);

export const Ring = ({ className, style, seed = 0 }: P & { seed?: number }) => {
  const d =
    seed % 2
      ? "M30 14C120 2 250 4 330 22c46 10 60 50 48 120-12 80-30 150-60 186-30 30-160 34-250 20C20 336 4 300 8 220 10 150 4 70 14 40c4-14 6-22 16-26 40-12 80-10 120-8"
      : "M24 30C70 6 200 0 300 12c60 8 82 40 76 110-6 90-14 160-40 196-26 30-150 40-240 26C40 334 10 300 10 220 8 140 2 80 18 46c10-20 40-34 90-38";
  return (
    <svg viewBox="0 0 390 360" preserveAspectRatio="none" className={`fuel__ring ${className ?? ""}`} style={style} aria-hidden>
      <path data-draw d={d} />
    </svg>
  );
};

/** Simple line-art bear (original drawing, Bear Scout style). */
export const BearLine = ({ className, style }: P) => (
  <svg viewBox="0 0 120 140" className={`doodle ${className ?? ""}`} style={style} aria-hidden>
    <circle data-draw cx="30" cy="26" r="11" />
    <circle data-draw cx="90" cy="26" r="11" />
    <path data-draw d="M22 50c0-22 17-34 38-34s38 12 38 34c0 20-16 32-38 32S22 70 22 50z" />
    <circle data-draw cx="46" cy="46" r="2.5" />
    <circle data-draw cx="74" cy="46" r="2.5" />
    <path data-draw d="M52 60c4-4 12-4 16 0-2 5-14 5-16 0zM60 64v6M53 72c4 3 10 3 14 0" />
    <path data-draw d="M30 80c-10 12-14 30-10 52M90 80c10 12 14 30 10 52M20 132h80" />
    <path data-draw d="M34 100c8 6 18 0 20-6M86 100c-8 6-18 0-20-6" />
  </svg>
);

/** Cake drawing used when a cake has no photo yet. */
export const CakeDrawn = ({ className, style }: P) => (
  <svg viewBox="0 0 120 100" className={className} style={style} aria-hidden fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 70 60 46l46 20v18L60 92 14 88z" />
    <path d="M14 70v18M60 92V72M14 70l46 2 46-6" />
    <path d="M18 78c10 2 28 4 42 4s30-4 44-8" />
    <path d="M60 46c-2-6 0-12 6-14 2 6-1 12-6 14zM66 32v-6" />
    <path d="M24 66c4 4 8 4 10 0M40 60c3 4 8 4 10 0M78 54c3 4 8 4 10 0" />
  </svg>
);

/** Starburst used behind ₱ price stamps. */
export const Burst = ({ fill = "#cd6128", stroke = "#fef6cf" }: { fill?: string; stroke?: string }) => {
  const pts: string[] = [];
  const n = 12;
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 ? 40 : 50;
    const a = (Math.PI * i) / n;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`);
  }
  return (
    <svg viewBox="0 0 100 100" aria-hidden>
      <polygon points={pts.join(" ")} fill={fill} stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
};

export function Stamp({ value, size = 84, fill, className }: { value: string; size?: number; fill?: string; className?: string }) {
  return (
    <div className={`stamp ${className ?? ""}`} style={{ ["--s" as string]: `${size}px` }} data-pop>
      <Burst fill={fill} />
      <span>{value}</span>
    </div>
  );
}

/* ---------- diamond tiles (their menu-board border motif) ---------- */
export function Diamond({ kind, fill = "#c5a781", ink = "#43553d" }: { kind: "bear" | "compass" | "word"; fill?: string; ink?: string }) {
  return (
    <svg viewBox="0 0 40 40" className="diamond" aria-hidden>
      <rect x="6" y="6" width="28" height="28" transform="rotate(45 20 20)" fill={fill} stroke={ink} strokeWidth="2" />
      {kind === "compass" && (
        <g stroke={ink} strokeWidth="1.6" strokeLinecap="round" fill="none">
          <path d="M20 11v18M11 20h18" />
          <circle cx="20" cy="20" r="1.8" fill={ink} />
        </g>
      )}
      {kind === "bear" && (
        <path d="M14 27v-4c0-3 1.6-5 3.2-5 .3-1.8 1.2-3 2.8-3 1.3 0 2 .7 2.4 1.7 1 .3 1.7 1.1 1.7 2.2V20c1 1 1.9 2.4 1.9 4.4V27h-2.7v-3l-1 3h-2.5v-3.6h-2V27z" fill={ink} />
      )}
      {kind === "word" && (
        <text x="20" y="22.5" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontWeight="700" fontSize="5.4" fill={ink}>
          BLACK
          <tspan x="20" dy="5.6">BEAR</tspan>
        </text>
      )}
    </svg>
  );
}

export function DiamondRow({ count = 24, fill, ink }: { count?: number; fill?: string; ink?: string }) {
  const kinds = ["compass", "bear", "compass", "word"] as const;
  return (
    <div className="tiles" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <Diamond key={i} kind={kinds[i % 4]} fill={fill} ink={ink} />
      ))}
    </div>
  );
}
