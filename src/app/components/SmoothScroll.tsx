// src/components/SmoothScroll.tsx
"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis, { type LenisOptions } from "@studio-freight/lenis";

type Props = {
  children: ReactNode;
  /** tune feel: higher = faster catch-up */
  lerp?: number; // 0..1  (0 = instant, 1 = no movement)
  /** multiplier for wheel/touch */
  wheelMultiplier?: number;
  smoothTouch?: boolean;
};

export default function SmoothScroll({
  children,
  lerp = 0.12,
  wheelMultiplier = 1,
  smoothTouch = true,
}: Props) {
  const rafRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Type as LenisOptions + index signature to allow extra keys (e.g., smoothTouch)
    const options: Partial<LenisOptions> & Record<string, unknown> = {
      lerp,
      wheelMultiplier,
      smoothWheel: true,
      smoothTouch: Boolean(smoothTouch), // no TS error
      normalizeWheel: true,
      gestureOrientation: "vertical",
    };

    const lenis = new Lenis(options as LenisOptions);
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    // Respect reduced motion
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyReduced = () => {
      if (media.matches) lenis.stop();
      else lenis.start();
    };
    applyReduced();
    media.addEventListener("change", applyReduced);

    return () => {
      media.removeEventListener("change", applyReduced);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [lerp, wheelMultiplier, smoothTouch]);

  return <>{children}</>;
}
