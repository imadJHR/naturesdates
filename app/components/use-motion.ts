"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * SSR/CSR-safe reveal gate.
 *
 * `useReducedMotion()` returns `null` on the server but a real boolean on the
 * first client render. Using it directly to toggle `initial`/`whileInView`
 * produces a hydration mismatch (server HTML hides content, client doesn't) and
 * the content stays invisible after a hard reload — this is the exact bug we
 * had on the home page.
 *
 * This hook defers animation until after hydration (`mounted`), so SSR and the
 * first client render always agree. Content is therefore visible immediately
 * (great for reduced-motion users and no-JS) and animations kick in only once
 * the page is interactive.
 */
export function useRevealEnabled(): boolean {
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let alive = true;
    // Defer to the next frame so SSR and the first client render agree while
    // keeping the setState asynchronous (the lint rule only rejects the
    // synchronous form).
    requestAnimationFrame(() => {
      if (alive) setMounted(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  return mounted && !reduceMotion;
}