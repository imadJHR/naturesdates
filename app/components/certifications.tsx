import type { ImgHTMLAttributes } from "react";

type Cert = {
  src: string;
  alt: string;
  title: string;
  /** intrinsic SVG dimensions — used to prevent layout shift */
  width: number;
  height: number;
  /** visual treatment hook for dark-mode contrast */
  kind: "halal" | "usda" | "fssc";
};

const CERTS: Cert[] = [
  {
    src: "/certifications/halal.svg",
    alt: "Halal certified",
    title: "Halal Certified",
    width: 919,
    height: 909,
    kind: "halal",
  },
  {
    src: "/certifications/usda-organic.svg",
    alt: "USDA Organic certified seal",
    title: "USDA Organic Certified",
    width: 600,
    height: 600,
    kind: "usda",
  },
  {
    src: "/certifications/fssc-22000.svg",
    alt: "FSSC 22000 food safety certified",
    title: "FSSC 22000 Certified",
    width: 131,
    height: 25,
    kind: "fssc",
  },
];

type CertificationsProps = {
  size?: "sm" | "md";
  /** below-the-fold rows should lazy-load; hero/footer rows load eagerly */
  lazy?: boolean;
  className?: string;
  imgProps?: ImgHTMLAttributes<HTMLImageElement>;
};

/**
 * Premium certification row. Each logo keeps its own proportions and is
 * rendered at a shared visual height. Dark mode handles contrast per-logo
 * (Halal uses currentColor; FSSC wordmark is lightened; USDA is self-colored).
 */
export function Certifications({
  size = "md",
  lazy = true,
  className = "",
  imgProps = {},
}: CertificationsProps) {
  return (
    <div
      className={`certifications cert-size-${size} ${className}`.trim()}
      role="list"
      aria-label="Certifications and food safety standards"
    >
      {CERTS.map((cert) => (
        <span
          key={cert.src}
          className={`cert-badge cert-badge--${cert.kind}`}
          role="listitem"
          title={cert.title}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cert.src}
            alt={cert.alt}
            width={cert.width}
            height={cert.height}
            loading={lazy ? "lazy" : "eager"}
            decoding="async"
            {...imgProps}
          />
        </span>
      ))}
    </div>
  );
}
