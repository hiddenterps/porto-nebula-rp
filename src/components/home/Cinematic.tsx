"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { WantedStars } from "@/components/fx";
import { asset } from "@/lib/asset";

/** Painel cinematográfico: a imagem abre de um card para tela cheia conforme o scroll. */
export function Cinematic() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const inset = useTransform(scrollYProgress, [0.1, 0.45], [12, 0]);
  const clip = useTransform(inset, (v) => `inset(${v}% ${v}% ${v}% ${v}% round ${v * 1.5}px)`);
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const textX = useTransform(scrollYProgress, [0.15, 0.85], ["15%", "-25%"]);

  return (
    <section ref={ref} className="relative h-[90vh] min-h-[560px] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
        <motion.div className="absolute inset-0" style={{ scale }}>
          <Image src={asset("/images/police-chase.webp")} alt="Perseguição policial na ponte da cidade" fill className="object-cover" sizes="100vw" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />
        <div className="scanlines absolute inset-0 opacity-30" />
      </motion.div>
      <motion.p style={{ x: textX }} className="pointer-events-none absolute top-[12%] whitespace-nowrap font-display text-[18vw] leading-none text-outline opacity-70">
        Perseguição · Fuga · Adrenalina
      </motion.p>
      <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-[1400px] flex-col gap-4 px-5 pb-14 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <WantedStars level={5} size="h-8 w-8" />
          <h3 className="mt-3 font-display text-5xl sm:text-7xl title-shadow">Toda ação tem<br /><span className="text-sunset">consequência.</span></h3>
        </div>
        <p className="max-w-sm text-white/75">Polícia ativa, sistema de procurado com registro, julgamentos com advogados e prisão com RP. O crime compensa… até a sirene tocar.</p>
      </div>
    </section>
  );
}
