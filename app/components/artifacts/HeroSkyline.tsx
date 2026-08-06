import type { CSSProperties } from "react";
import { DatePalm } from "./DatePalm";

/**
 * HeroSkyline — the decorative desert silhouette shown ONLY at the bottom of the
 * hero section. Distinct from the footer's `DesertSkyline`: a low dune base and
 * two flanking date palms. All pieces inherit currentColor and tint via the
 * --skyline-* custom properties, so the hero stays on the burgundy/gold brand
 * palette.
 *
 * The central Moorish gateway portal was removed at the user's request (it read
 * as a dark archway over the hero copy). The footer skyline and the Story-section
 * palms are intentionally untouched.
 */
export function HeroSkyline({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`desert-skyline hero-skyline ${className}`} aria-hidden="true" style={style}>
      {/* Low dune base — fades upward to blend into the hero gradient */}
      <svg
        className="hero-dune"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      >
        <path
          d="M0 150 C 240 110, 520 172, 760 140 C 1020 106, 1240 162, 1440 130 L1440 200 L0 200 Z"
          fill="var(--skyline-back)"
        />
      </svg>

      {/* Flanking date palms */}
      <DatePalm
        className="hero-palm"
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "clamp(92px, 12vw, 185px)",
          color: "var(--skyline-front)",
        }}
      />
      <DatePalm
        className="hero-palm hero-palm-right"
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: "clamp(112px, 14vw, 215px)",
          color: "var(--skyline-front)",
          transform: "scaleX(-1)",
        }}
      />
    </div>
  );
}

export default HeroSkyline;
