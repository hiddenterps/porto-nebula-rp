"use client";
import { animate, motion, useInView, useMotionValue, useSpring, useTransform, type Variants } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Star } from "lucide-react";

/** Revela o conteúdo ao entrar na tela. */
export function Reveal({ children, delay = 0, y = 40, className = "" }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

const lineV: Variants = { hidden: { y: "110%" }, show: (i: number) => ({ y: "0%", transition: { duration: 0.9, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] } }) };

/** Título em linhas que sobem por trás de uma máscara. */
export function SplitTitle({ lines, className = "", delay = 0 }: { lines: { text: ReactNode; className?: string }[]; className?: string; delay?: number }) {
  return (
    <motion.span className={`block ${className}`} initial="hidden" whileInView="show" viewport={{ once: true }}>
      {lines.map((l, i) => (
        <span key={i} className="-mt-[0.28em] block overflow-hidden pb-[0.06em] pt-[0.28em]">
          <motion.span className={`block ${l.className ?? ""}`} variants={lineV} custom={i + delay * 10}>{l.text}</motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Contador animado. */
export function Counter({ to, suffix = "", prefix = "", className = "" }: { to: number; suffix?: string; prefix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref} className={`tabular-nums ${className}`}>{prefix}{v.toLocaleString("pt-BR")}{suffix}</span>;
}

/** Card com inclinação 3D seguindo o mouse. */
export function Tilt({ children, className = "", max = 10 }: { children: ReactNode; className?: string; max?: number }) {
  const x = useMotionValue(0.5), y = useMotionValue(0.5);
  const rx = useSpring(useTransform(y, [0, 1], [max, -max]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(x, [0, 1], [-max, max]), { stiffness: 200, damping: 18 });
  const gx = useTransform(x, (v) => `${v * 100}%`), gy = useTransform(y, (v) => `${v * 100}%`);
  return (
    <motion.div className={`relative [transform-style:preserve-3d] ${className}`} style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width); y.set((e.clientY - r.top) / r.height); }}
      onPointerLeave={() => { x.set(0.5); y.set(0.5); }}>
      {children}
      <motion.span aria-hidden className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 [.group:hover_&]:opacity-100"
        style={{ background: useTransform([gx, gy], ([a, b]) => `radial-gradient(circle at ${a} ${b}, rgba(255,255,255,.18), transparent 45%)`) }} />
    </motion.div>
  );
}

/** Faixa de letreiro infinito. */
export function Marquee({ items, reverse = false, speed = 28, className = "" }: { items: string[]; reverse?: boolean; speed?: number; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className={`marquee ${reverse ? "marquee-rev" : ""}`} style={{ ["--speed" as string]: `${speed}s` }}>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {row.map((t, i) => (
              <span key={i} className="flex items-center gap-6 px-6 font-display text-3xl !leading-[1.15] sm:text-4xl">
                {t}<Star className="h-5 w-5 fill-current" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Nível de procurado: estrelas que acendem em sequência. */
export function WantedStars({ level = 5, size = "h-6 w-6", className = "" }: { level?: number; size?: string; className?: string }) {
  return (
    <motion.span className={`inline-flex gap-1 ${className}`} initial="off" whileInView="on" viewport={{ once: true }}>
      {Array.from({ length: 5 }, (_, i) => (
        <motion.span key={i}
          variants={{ off: { scale: 0.6, opacity: 0.25 }, on: { scale: [0.6, 1.35, 1], opacity: i < level ? 1 : 0.25, transition: { delay: 0.15 * i + 0.3, duration: 0.45 } } }}>
          <Star className={`${size} ${i < level ? "fill-gold text-black drop-shadow-[2px_2px_0_#000]" : "fill-transparent text-white/40"}`} strokeWidth={2.2} />
        </motion.span>
      ))}
    </motion.span>
  );
}
