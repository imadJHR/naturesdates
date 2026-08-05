import type { CSSProperties } from "react";
import { DatePalm } from "./DatePalm";

/**
 * NutritionDecor — decorative SVG layer for the "Nutrition desk" section.
 * Per the brief, this section keeps ONLY the date-palm illustrations in the
 * bottom corners. The repeating star/geometric pattern, the background
 * circles/blobs, and the Moroccan arch skyline have all been removed.
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
      {/* Flanking date palms only — kept per the brief. */}
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
