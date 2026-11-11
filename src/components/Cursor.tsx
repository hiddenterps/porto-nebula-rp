"use client";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/** Cursor customizado (só desktop com mouse, desligado em reduced-motion). Mantém o cursor nativo. */
export function Cursor() {
  const [on, setOn] = useState(false);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 }), sy = useSpring(y, { stiffness: 500, damping: 40 });
  useEffect(() => {
    const ok = window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      setOn(true);
      setHover(!!(e.target as HTMLElement).closest("a,button,summary,input,select,textarea,label"));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);
  if (!on) return null;
  return (
    <>
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[120] rounded-full border-2 border-pink mix-blend-screen"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }} animate={{ width: hover ? 54 : 30, height: hover ? 54 : 30, backgroundColor: hover ? "rgba(255,46,136,.18)" : "rgba(255,46,136,0)" }} transition={{ duration: 0.2 }} />
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[120] h-1.5 w-1.5 rounded-full bg-gold"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }} />
    </>
  );
}
