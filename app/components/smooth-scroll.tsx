"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

const easeOutExpo = (time: number) => Math.min(1, 1.001 - Math.pow(2, -10 * time));

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.08,
      easing: easeOutExpo,
      smoothWheel: true,
      wheelMultiplier: 0.86,
      touchMultiplier: 1,
      overscroll: true,
      anchors: {
        offset: -104,
        duration: 1.08,
        easing: easeOutExpo,
      },
    });

    let hashFrame = 0;
    if (window.location.hash) {
      hashFrame = window.requestAnimationFrame(() => {
        const target = document.querySelector<HTMLElement>(window.location.hash);
        if (target) lenis.scrollTo(target, { offset: -104, duration: 1.08, easing: easeOutExpo });
      });
    }

    return () => {
      window.cancelAnimationFrame(hashFrame);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
