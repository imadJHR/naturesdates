"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;
    let active = true;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(animate);
    };

    // Disable only on a real touch interaction (true touch device).
    const disableOnTouch = () => {
      active = false;
      dot.style.display = "none";
      ring.style.display = "none";
      document.documentElement.classList.remove("has-custom-cursor");
    };

    const interactive = "a, button, [role='button'], input, textarea, select, summary, label";
    const grow = () => ring.classList.add("is-hover");
    const shrink = () => ring.classList.remove("is-hover");

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchstart", disableOnTouch, { passive: true });
    document.addEventListener("mouseover", (e) => {
      if (active && (e.target as Element)?.closest?.(interactive)) grow();
    });
    document.addEventListener("mouseout", (e) => {
      if (active && (e.target as Element)?.closest?.(interactive)) shrink();
    });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", disableOnTouch);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
