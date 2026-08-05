import type { CSSProperties } from "react";
import { DatePalm } from "./artifacts/DatePalm";
import { MoroccanArch } from "./artifacts/MoroccanArch";

/* ─────────────────────────────────────────────────────────────
   Sahara decorative toolkit
   Pure presentational SVG layers that give every section its
   desert atmosphere: dune section dividers, a kasbah + palm
   skyline, and floating golden dust. All aria-hidden.
   ───────────────────────────────────────────────────────────── */

type DuneTone = "sand" | "ivory" | "green" | "brown" | "burgundy";

const DUNE_TONES: Record<DuneTone, { front: string; back: string }> = {
  sand: { front: "#EFE0C6", back: "#E4CEAC" },
  ivory: { front: "#FBF4E2", back: "#F2E6CE" },
  green: { front: "#3E7D5B", back: "#2F6B4A" },
  brown: { front: "#3A2518", back: "#2B1A12" },
  burgundy: { front: "#6E1618", back: "#5C0E12" },
};

/**
 * Curved dune-shaped section divider. Renders two layered dune
 * paths that fade towards the bottom via a CSS mask, so it can be
 * dropped at the seam between any two sections without covering
 * the section below.
 */
export function DuneDivider({
  tone = "sand",
  className = "",
}: {
  tone?: DuneTone;
  className?: string;
}) {
  const colors = DUNE_TONES[tone];
  return (
    <div
      className={`dune-divider ${className}`}
      aria-hidden="true"
      style={
        {
          "--dune-front": colors.front,
          "--dune-back": colors.back,
        } as CSSProperties
      }
    >
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path className="dune-path dune-back" d="M0 92 C 220 48, 520 118, 900 84 C 1180 56, 1330 74, 1440 66 L 1440 120 L 0 120 Z" />
        <path className="dune-path dune-front" d="M0 66 C 210 26, 430 94, 720 72 C 1000 54, 1220 22, 1440 54 L 1440 120 L 0 120 Z" />
      </svg>
    </div>
  );
}

/**
 * Panoramic Moroccan desert skyline with date palms.
 *
 * Replaces the old hand-drawn kasbah rectangles + sketch palms with clean,
 * professional SVG components: `MoroccanArch` (domes / minarets / horseshoe
 * arches) and `DatePalm` (a realistic date-palm silhouette). Both inherit
 * `currentColor` and tint through the CSS custom properties below, so the
 * skyline stays on-brand (burgundy / gold) and scales responsively.
 *
 * Two layered rows (back + front) give parallax-free depth; palms anchor the
 * left and right edges. Everything is decorative (aria-hidden).
 */
const SKYLINE_BACK = [
  { x: 6, scale: 1.18 },
  { x: 250, scale: 1.04 },
  { x: 520, scale: 1.22 },
  { x: 820, scale: 1.0 },
  { x: 1080, scale: 1.16 },
  { x: 1320, scale: 1.06 },
];

const SKYLINE_FRONT = [
  { x: 90, scale: 1.1 },
  { x: 360, scale: 1.24 },
  { x: 660, scale: 1.0 },
  { x: 940, scale: 1.18 },
  { x: 1210, scale: 1.08 },
];

export function DesertSkyline({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`desert-skyline ${className}`} aria-hidden="true" style={style}>
      {/* Back row: full-color Moroccan arches, dimmed via --skyline-back */}
      <div className="skyline-back">
        {SKYLINE_BACK.map((item, i) => (
          <MoroccanArch
            key={`back-${i}`}
            className="skyline-arch"
            style={{
              left: `${item.x}px`,
              bottom: 0,
              width: `${120 * item.scale}px`,
              color: "var(--skyline-back)",
              ["--arch-fill" as string]: "var(--skyline-back)",
            }}
          />
        ))}
        {/* Date palms flanking the skyline */}
        <DatePalm
          className="skyline-palm"
          style={{ left: 0, bottom: 0, width: "clamp(90px, 11vw, 170px)", color: "var(--skyline-back)" }}
        />
        <DatePalm
          className="skyline-palm"
          style={{ right: 0, bottom: 0, width: "clamp(110px, 13vw, 200px)", color: "var(--skyline-back)" }}
        />
      </div>

      {/* Front row: darker Moroccan arches (currentColor = --skyline-front) */}
      <div className="skyline-front">
        {SKYLINE_FRONT.map((item, i) => (
          <MoroccanArch
            key={`front-${i}`}
            className="skyline-arch"
            style={{
              left: `${item.x}px`,
              bottom: 0,
              width: `${132 * item.scale}px`,
              color: "var(--skyline-front)",
              ["--arch-fill" as string]: "var(--skyline-front)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Floating golden dust particles. Deterministic pseudo-random
 * placement so SSR and client render identically. Pure CSS animation.
 */
export function DustField({
  count = 16,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const particles = Array.from({ length: count }, (_, i) => {
    const size = 2 + ((i * 37) % 4);
    return {
      left: `${(i * 61 + 13) % 100}%`,
      width: size,
      height: size,
      delay: `${((i * 13) % 10) / 10}s`,
      duration: `${9 + ((i * 7) % 8)}s`,
      drift: `${((i * 53) % 60) - 30}px`,
      opacity: 0.2 + ((i * 29) % 40) / 100,
    };
  });

  return (
    <div className={`dust-field ${className}`} aria-hidden="true">
      {particles.map((p, i) => (
        <i
          key={i}
          style={
            {
              left: p.left,
              width: p.width,
              height: p.height,
              animationDelay: p.delay,
              animationDuration: p.duration,
              "--dust-drift": p.drift,
              "--dust-op": p.opacity,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
