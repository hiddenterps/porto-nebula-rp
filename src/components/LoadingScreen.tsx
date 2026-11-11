"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { Logo } from "./icons";

const KEY = "pn-intro-seen";
const DURATION = 1200;
// Dica fixa para não divergir entre o HTML estático e a hidratação.
const tips = [
  "Dica: valorize a vida do seu personagem — amor à vida é regra.",
  "Dica: use /me e /do para descrever ações que o jogo não mostra.",
  "Dica: a staff está no Discord 24h para abrir tickets.",
];

/** Script inline (no <head>) que marca a sessão antes da hidratação, evitando "piscar" o loader. */
export const introScript = `try{if(sessionStorage.getItem("${KEY}"))document.documentElement.dataset.intro="seen"}catch(e){}`;

let played = false;
/** Atraso base das animações de entrada: só existe quando a loading screen está aparecendo. */
export const introDelay = () => {
  if (played || (typeof document !== "undefined" && document.documentElement.dataset.intro === "seen")) return 0;
  return DURATION / 1000 + 0.1;
};

/** Loading screen estilo jogo — exibida uma vez por sessão (~1,2 s). */
export function LoadingScreen() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const seen = document.documentElement.dataset.intro === "seen";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => {
      played = true;
      try { sessionStorage.setItem(KEY, "1"); } catch {}
      setShow(false);
    }, seen ? 0 : reduced ? 150 : DURATION);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div key="loader" className="intro-loader fixed inset-0 z-[100] flex items-end overflow-hidden bg-ink"
          exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }} initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }} aria-hidden>
          <Image src={asset("/images/hero-city.webp")} alt="" fill priority className="object-cover opacity-40 saturate-150" sizes="100vw" />
          <div className="halftone absolute inset-0 opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
          <div className="relative w-full px-6 pb-12 sm:px-12">
            <Logo size="lg" />
            <p className="mt-6 max-w-lg text-sm text-white/70">{tips[0]}</p>
            <div className="mt-5 flex items-center gap-4">
              <div className="h-1.5 w-full max-w-md overflow-hidden bg-white/10">
                <motion.div className="h-full bg-gradient-to-r from-gold via-sunset to-pink" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: DURATION / 1000 - 0.1, ease: "easeInOut" }} />
              </div>
              <span className="label text-white/60">Carregando</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
