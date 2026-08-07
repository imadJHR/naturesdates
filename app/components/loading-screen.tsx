"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * LoadingScreen — a premium burgundy/gold splash shown while the page (and all
 * its images/fonts) finishes loading. Listens for window `load` so it only
 * clears once the real assets are ready, with a minimum on-screen time so the
 * brand moment actually reads (and never flashes away instantly). A safety
 * timeout guarantees it never traps the user. Mounted once in the root layout,
 * so it appears only on a full page load (not client-side route changes).
 */
const MIN_VISIBLE_MS = 2000;

export function LoadingScreen() {
  const [loaded, setLoaded] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const startedAt = Date.now();
    let minTimer: ReturnType<typeof setTimeout>;
    let safety: ReturnType<typeof setTimeout>;

    // Test/debug hook: ?freeze-loader keeps the splash on screen for capture.
    const frozen =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).has("freeze-loader");

    const finish = () => {
      if (frozen) return;
      const elapsed = Date.now() - startedAt;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
      minTimer = setTimeout(() => setLoaded(true), wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish);
    }
    // Safety net: never trap the user behind the splash.
    safety = setTimeout(finish, 6000);

    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(minTimer);
      clearTimeout(safety);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={() => setHidden(true)}>
      {!loaded && !hidden && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden={loaded}
        >
          <div className="loading-screen-inner">
            <motion.img
              src="/images/palm-decor.png"
              alt=""
              aria-hidden="true"
              className="loading-palm"
              initial={{ opacity: 0, scaleY: 0.6, y: 24 }}
              animate={{ opacity: 1, scaleY: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.p
              className="loading-wordmark"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              NATURES DATES
            </motion.p>
            <motion.p
              className="loading-script"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              Raised by sunshine
            </motion.p>
            <div className="loading-bar">
              <motion.span
                className="loading-bar-fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;
