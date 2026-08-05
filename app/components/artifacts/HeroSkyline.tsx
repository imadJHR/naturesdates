import type { CSSProperties } from "react";
import { DatePalm } from "./DatePalm";
import { MoroccanGateway } from "./MoroccanGateway";

/**
 * HeroSkyline — the decorative desert silhouette shown ONLY at the bottom of the
 * hero section. Distinct from the footer's `DesertSkyline`: a low dune base, two
 * flanking date palms and a central grand Moorish gateway portal. All pieces
 * inherit currentColor and tint via the --skyline-* custom properties, so the
 * hero stays on the burgundy/gold brand palette.
 *
 * The footer skyline and the Story-section palms are intentionally untouched.
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

      {/* Central Moorish gateway portal */}
      <MoroccanGateway
        className="hero-gateway"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: 0,
          width: "clamp(86px, 11vw, 168px)",
          color: "var(--skyline-front)",
        }}
      />

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
