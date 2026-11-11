"use client";
import { MotionConfig } from "motion/react";
import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { scrollCtl } from "@/lib/scroll";

/** Smooth scroll (Lenis) + respeito a prefers-reduced-motion em todas as animações. */
export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: true });
    scrollCtl.lenis = lenis;
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); scrollCtl.lenis = null; };
  }, []);
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
