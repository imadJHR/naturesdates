import { DatePalm } from "./DatePalm";

/**
 * SectionPalms — reusable date-palm decoration flanking a section on the left
 * and right, matching the hero / Story / FAQ treatment (gold-tinted silhouette,
 * clipped by the section's own overflow:hidden). Decorative only.
 */
export function SectionPalms({
  className = "",
  opacity,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      className={`section-palms${className ? ` ${className}` : ""}`}
      aria-hidden="true"
      style={opacity != null ? ({ "--palm-opacity": String(opacity) } as React.CSSProperties) : undefined}
    >
      <DatePalm className="section-palm section-palm-left" />
      <DatePalm className="section-palm section-palm-right" />
    </div>
  );
}

export default SectionPalms;
