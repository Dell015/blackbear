import manifest from "@/lib/images.json";

type Entry = { w: number; h: number; color: string; srcs: Record<string, string> };
const M = manifest as unknown as Record<string, Entry>;

export function imgInfo(slug: string) {
  return M[slug];
}

/** Responsive <img> from the generated manifest (scripts/build-images.py). */
export default function Img({
  slug,
  alt,
  sizes = "100vw",
  priority = false,
  className,
  style,
}: {
  slug: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const e = M[slug];
  if (!e) return null;
  const widths = Object.keys(e.srcs).map(Number).sort((a, b) => a - b);
  const srcSet = widths.map((w) => `${e.srcs[w]} ${w}w`).join(", ");
  const mid = e.srcs[widths[Math.min(1, widths.length - 1)]];
  return (
    <img
      src={mid}
      srcSet={srcSet}
      sizes={sizes}
      width={e.w}
      height={e.h}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      className={className}
      style={{ backgroundColor: e.color, ...style }}
    />
  );
}
