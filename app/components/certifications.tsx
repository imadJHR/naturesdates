"use client";

import type { ImgHTMLAttributes } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useRevealEnabled } from "./use-motion";

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
  /** stagger badges into view with a 0.1s interval when scrolled into view */
  animate?: boolean;
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
  animate = false,
}: CertificationsProps) {
  const reduceMotion = useReducedMotion();
  const animateEnabled = useRevealEnabled();
  const classes = `certifications cert-size-${size} ${className}`.trim();
  const rowProps = {
    className: classes,
    role: "list" as const,
    "aria-label": "Certifications and food safety standards",
  };

  if (!animate || !animateEnabled) {
    return (
      <div {...rowProps}>
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

  return (
    <motion.div
      {...rowProps}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {CERTS.map((cert) => (
        <motion.span
          key={cert.src}
          className={`cert-badge cert-badge--${cert.kind}`}
          role="listitem"
          title={cert.title}
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
          }}
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
        </motion.span>
      ))}
    </motion.div>
  );
}
