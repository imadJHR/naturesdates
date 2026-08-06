import type { SVGProps } from "react";

/**
 * DatePalm — a stylized but recognizable *date* palm (Phoenix dactylifera):
 *   - a tall, ringed fibrous trunk,
 *   - a crown of arched, feathery (pinnate) fronds,
 *   - two heavy date clusters (regimes) drooping below the crown — the
 *     signature of a fruiting date palm.
 * Uses `currentColor` so it inherits the surrounding color and can be tinted
 * via CSS (fill / color). `aria-hidden` by default; decorative only.
 */
export function DatePalm(props: SVGProps<SVGSVGElement>) {
  // One arched feathery frond, drawn from the crown (~256,250) outward.
  // `d` curves up then droops at the tip; barbs give the pinnate look.
  const frond = (transform: string) => (
    <g transform={transform}>
      <path
        d="M0 0 C70 -22 150 -26 214 -6 C236 2 250 14 252 26"
        fill="none"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <g stroke="currentColor" strokeWidth="4.5" strokeLinecap="round">
        <path d="M40 -12 L52 -30" />
        <path d="M70 -18 L84 -37" />
        <path d="M100 -21 L116 -40" />
        <path d="M130 -21 L148 -39" />
        <path d="M160 -18 L180 -35" />
        <path d="M190 -13 L210 -29" />
        <path d="M40 -6 L52 12" />
        <path d="M70 -8 L84 11" />
        <path d="M100 -9 L116 11" />
        <path d="M130 -8 L148 13" />
        <path d="M160 -5 L180 14" />
        <path d="M190 -1 L210 17" />
      </g>
    </g>
  );

  // A hanging date cluster: a curved stalk from under the crown, with an
  // elongated bunch of oval dates at the bottom.
  const cluster = (transform: string) => (
    <g transform={transform}>
      <path
        d="M0 0 C-4 40 -2 84 6 128"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <g fill="currentColor">
        <ellipse cx="-2" cy="118" rx="9" ry="13" />
        <ellipse cx="14" cy="120" rx="9" ry="13" />
        <ellipse cx="6" cy="104" rx="9" ry="13" />
        <ellipse cx="20" cy="104" rx="9" ry="13" />
        <ellipse cx="10" cy="90" rx="9" ry="13" />
        <ellipse cx="23" cy="90" rx="9" ry="13" />
        <ellipse cx="14" cy="76" rx="8" ry="12" />
        <ellipse cx="26" cy="76" rx="8" ry="12" />
        <ellipse cx="18" cy="62" rx="7" ry="11" />
      </g>
    </g>
  );

  return (
    <svg
      viewBox="0 0 512 512"
      width="1em"
      height="1em"
      fill="currentColor"
      role="img"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {/* Trunk */}
      <path
        d="M238 250
           C236 300 234 360 232 430
           C231 462 233 486 236 500
           L276 500
           C279 486 281 462 280 430
           C278 360 276 300 274 250
           C268 246 246 246 238 250 Z"
      />
      <path
        d="M240 300 L270 302 M240 380 L272 382 M240 420 L274 422 M240 460 L276 462"
        stroke="rgba(0,0,0,0.16)"
        strokeWidth="3"
        fill="none"
      />

      {/* Crown of arched feathery fronds */}
      <g transform="translate(256 246)">
        {frond("rotate(-6) scale(1.05)")}
        {frond("rotate(-40) scale(1)")}
        {frond("rotate(-74) scale(0.9)")}
        {frond("rotate(6) scale(1.05)")}
        {frond("rotate(40) scale(1)")}
        {frond("rotate(74) scale(0.9)")}
      </g>

      {/* Two hanging date clusters (regimes) */}
      <g transform="translate(238 256)">{cluster("rotate(-12)")}</g>
      <g transform="translate(274 256)">{cluster("rotate(12)")}</g>
    </svg>
  );
}

export default DatePalm;
