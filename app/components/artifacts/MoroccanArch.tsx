import type { SVGProps } from "react";

/**
 * MoroccanArch — elegant Arabic / Moroccan architecture silhouette:
 * a central onion dome flanked by horseshoe arches and a slender minaret.
 * Drawn on a 240x160 viewBox so it tiles cleanly into a panoramic skyline.
 *
 * Styling:
 *  - The dome + minaret cap use currentColor (pass via `color`).
 *  - Arches/body use a CSS var --arch-fill (defaults to currentColor) so callers
 *    can layer two tones (front/back) by setting --arch-fill on each instance.
 */
export function MoroccanArch(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 240 160"
      width="1em"
      height="1em"
      role="img"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <g fill="var(--arch-fill, currentColor)">
        {/* Left horseshoe arch */}
        <path d="M18 160 V92 a26 26 0 0 1 52 0 V160 H18 Z M30 152 V94 a14 14 0 0 1 28 0 V152 Z" />
        {/* Right horseshoe arch */}
        <path d="M170 160 V92 a26 26 0 0 1 52 0 V160 H170 Z M182 152 V94 a14 14 0 0 1 28 0 V152 Z" />
        {/* Central building body */}
        <rect x="92" y="70" width="56" height="90" />
        {/* Central horseshoe arch door */}
        <path d="M104 160 V104 a16 16 0 0 1 32 0 V160 Z" fill="var(--arch-hole, rgba(0,0,0,.28))" />
        {/* Base steps */}
        <rect x="84" y="150" width="72" height="10" />
      </g>
      {/* Central onion dome (currentColor) */}
      <g fill="currentColor">
        <path d="M120 70 C96 70 96 36 120 14 C144 36 144 70 120 70 Z" />
        {/* Dome finial */}
        <rect x="117" y="2" width="6" height="14" rx="3" />
        <circle cx="120" cy="2" r="4" />
      </g>
      {/* Slender minaret on the right, capped with a small dome */}
      <g fill="currentColor">
        <rect x="226" y="46" width="14" height="114" rx="3" />
        <rect x="222" y="34" width="22" height="14" rx="3" />
        <path d="M233 34 C224 34 224 20 233 10 C242 20 242 34 233 34 Z" />
        <rect x="231" y="2" width="4" height="10" rx="2" />
      </g>
      {/* Smaller minaret on the left */}
      <g fill="currentColor">
        <rect x="0" y="58" width="12" height="102" rx="3" />
        <rect x="-3" y="48" width="18" height="12" rx="3" />
        <path d="M6 48 C-1 48 -1 38 6 30 C13 38 13 48 6 48 Z" />
      </g>
    </svg>
  );
}

export default MoroccanArch;
