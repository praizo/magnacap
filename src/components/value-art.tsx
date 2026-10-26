/**
 * Abstract line art for the values grid: a ring of rotated ellipses whose
 * proportions and colour vary per value. Decorative only.
 */
const variants = [
  { rx: 34, ry: 12, count: 18, sweep: 180, twist: 8, color: "var(--color-signal)" },
  { rx: 36, ry: 14, count: 26, sweep: 150, twist: 22, color: "var(--color-slate)" },
  { rx: 36, ry: 6, count: 24, sweep: 360, twist: 8, color: "var(--color-signal-ink)" },
  { rx: 22, ry: 34, count: 22, sweep: 110, twist: 26, color: "var(--color-slate-deep)" },
  { rx: 32, ry: 18, count: 20, sweep: 240, twist: 12, color: "var(--color-signal)" },
] as const;

export function ValueArt({ index }: { index: number }) {
  const v = variants[index % variants.length];
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" className="value-art">
      <g stroke={v.color} strokeWidth="0.45" transform="translate(50 50)">
        {Array.from({ length: v.count }, (_, i) => {
          const angle = (v.sweep / v.count) * i;
          const shift = (i / v.count) * v.twist - v.twist / 2;
          return (
            <ellipse key={i} rx={v.rx} ry={v.ry} cx={shift} transform={`rotate(${angle})`} opacity={0.35 + (i / v.count) * 0.65} />
          );
        })}
      </g>
    </svg>
  );
}
