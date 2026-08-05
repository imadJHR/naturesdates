import type { SVGProps } from "react";

/**
 * MoroccanGateway — a single grand Moorish (horseshoe/ogival) arch portal with
 * an onion dome and a finial. Used as the centrepiece of the HERO skyline only;
 * the footer keeps the separate multi-arch `DesertSkyline`.
 *
 * Uses currentColor so it tints to the hero's burgundy palette. Decorative.
 */
export function MoroccanGateway(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 250"
      width="1em"
      height="1em"
      fill="currentColor"
      role="img"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {/* Portal body: pointed (ogival) Moorish arch */}
      <path d="M50 140 C50 80 85 52 100 40 C115 52 150 80 150 140 L150 250 L50 250 Z" />
      {/* Inner arch opening (darker cut-out) */}
      <path
        d="M68 250 L68 142 C68 100 86 78 100 68 C114 78 132 100 132 142 L132 250 Z"
        fill="var(--arch-hole, rgba(0,0,0,.32))"
      />
      {/* Onion dome above the apex */}
      <path d="M100 40 C90 40 90 22 100 12 C110 22 110 40 100 40 Z" />
      {/* Finial */}
      <rect x="98" y="2" width="4" height="12" rx="2" />
      <circle cx="100" cy="2" r="3.5" />
      {/* Slender side colonnettes */}
      <rect x="44" y="150" width="6" height="100" rx="2" />
      <rect x="150" y="150" width="6" height="100" rx="2" />
    </svg>
  );
}

export default MoroccanGateway;
