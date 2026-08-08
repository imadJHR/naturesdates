"use client";

import { useReducedMotion } from "framer-motion";

type Cert = {
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
  kind: "halal" | "usda" | "fssc" | "kosher" | "brcgs";
};

const CERTS: Cert[] = [
  { src: "/certifications/halal.svg", alt: "Halal certified", title: "Halal Certified", width: 919, height: 909, kind: "halal" },
  { src: "/certifications/usda-organic.svg", alt: "USDA Organic certified seal", title: "USDA Organic Certified", width: 600, height: 600, kind: "usda" },
  { src: "/certifications/fssc-22000.svg", alt: "FSSC 22000 food safety certified", title: "FSSC 22000 Certified", width: 131, height: 25, kind: "fssc" },
  { src: "/certifications/koshercheck.png", alt: "Kosher Check certified", title: "Kosher Check Certified", width: 220, height: 95, kind: "kosher" },
  { src: "/certifications/brcgs.png", alt: "BRCGS Food Safety certified", title: "BRCGS Food Safety Certified", width: 546, height: 410, kind: "brcgs" },
];

/**
 * "Nos certifications" — a full-width band that loops the five official
 * certification logos in an infinite, seamless marquee. The list is duplicated
 * so the -50% translate creates a perfect loop. Honors prefers-reduced-motion.
 */
export function CertificationsMarquee() {
  const reduceMotion = useReducedMotion();
  // Two copies of the list for a seamless loop.
  const loop = [...CERTS, ...CERTS];

  return (
    <section className="certifications-marquee section-tan" aria-labelledby="certifications-marquee-title">
      <div className="certifications-marquee-inner">
        <div className="certifications-marquee-head">
          <p className="script small">Trust, certified</p>
          <h2 id="certifications-marquee-title">Our certifications</h2>
        </div>

        <div className="cert-marquee" role="region" aria-label="Certifications and food safety standards">
          <div
            className={`cert-marquee-track${reduceMotion ? " is-paused" : ""}`}
          >
            {loop.map((cert, i) => (
              <span
                key={`${cert.src}-${i}`}
                className={`cert-badge cert-badge--${cert.kind}`}
                role="listitem"
                title={cert.title}
                aria-hidden={i >= CERTS.length ? "true" : undefined}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cert.src}
                  alt={i < CERTS.length ? cert.alt : ""}
                  width={cert.width}
                  height={cert.height}
                  loading="lazy"
                  decoding="async"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
