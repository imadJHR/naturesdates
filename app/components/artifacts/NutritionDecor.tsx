import type { CSSProperties } from "react";
import { DatePalm } from "./DatePalm";
import { MoroccanArch } from "./MoroccanArch";

/**
 * NutritionDecor — decorative SVG layer for the "Nutrition desk" section.
 * Mirrors the homepage treatment (realistic date palms + clean Moroccan
 * architecture) but kept subtle and low so it never competes with the
 * nutrition cards. All pieces inherit currentColor and tint via the
 * --skyline-* custom properties, staying on the burgundy/gold brand palette.
 *
 * The hero keeps its own HeroSkyline; the footer keeps DesertSkyline; the
 * Story section keeps its DatePalm pair. This is scoped to Nutrition only.
 */
export function NutritionDecor({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`nutrition-decor ${className}`} aria-hidden="true" style={style}>
      {/* Low Moroccan arch row along the bottom — subtle, brand-tinted */}
      <div className="nutrition-arch-row">
        <MoroccanArch
          className="nutrition-arch"
          style={{
            left: "6%",
            bottom: 0,
            width: "clamp(70px, 9vw, 130px)",
            color: "var(--skyline-back)",
            ["--arch-fill" as string]: "var(--skyline-back)",
          }}
        />
        <MoroccanArch
          className="nutrition-arch"
          style={{
            left: "44%",
            bottom: 0,
            width: "clamp(86px, 11vw, 160px)",
            color: "var(--skyline-front)",
            ["--arch-fill" as string]: "var(--skyline-front)",
          }}
        />
        <MoroccanArch
          className="nutrition-arch"
          style={{
            right: "6%",
            bottom: 0,
            width: "clamp(70px, 9vw, 130px)",
            color: "var(--skyline-back)",
            ["--arch-fill" as string]: "var(--skyline-back)",
          }}
        />
      </div>

      {/* Flanking date palms, low opacity so the cards stay the focus */}
      <DatePalm
        className="nutrition-palm nutrition-palm-left"
        style={{ left: -10, bottom: 0, width: "clamp(80px, 10vw, 150px)", color: "var(--skyline-front)" }}
      />
      <DatePalm
        className="nutrition-palm nutrition-palm-right"
        style={{ right: -8, bottom: 0, width: "clamp(96px, 12vw, 175px)", color: "var(--skyline-front)", transform: "scaleX(-1)" }}
      />
    </div>
  );
}

export default NutritionDecor;
