import type { CSSProperties, SVGProps } from "react";

/**
 * DatePalm — uses the brand's hand-supplied date-palm silhouette (a realistic
 * Phoenix dactylifera: ringed trunk + pinnate fronds) as a CSS mask tinted with
 * `currentColor`. This keeps the palm on-palette (it inherits the surrounding
 * red/gold tint, exactly like the previous inline-SVG version).
 *
 * The image lives in /public/images/palm-decor.png and is referenced by static
 * URL (Next.js serves /public at the site root). Decorative only.
 */
export function DatePalm(props: SVGProps<SVGSVGElement>) {
  const { className, style } = props;

  const maskStyle: CSSProperties = {
    display: "inline-block",
    aspectRatio: "220 / 310",
    backgroundColor: "currentColor",
    WebkitMaskImage: "url(/images/palm-decor.png)",
    maskImage: "url(/images/palm-decor.png)",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskPosition: "center bottom",
    maskPosition: "center bottom",
    ...style,
  };

  return (
    <span
      role="img"
      aria-hidden="true"
      className={className}
      style={maskStyle}
    />
  );
}

export default DatePalm;
