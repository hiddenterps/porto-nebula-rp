"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";

/** Toast estilo "missão cumprida" exibido ao enviar a whitelist. */
export function MissionToast({ show, protocol, onDone }: { show: boolean; protocol: string; onDone: () => void }) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onDone, 3600);
    return () => clearTimeout(t);
  }, [show, onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div role="status" aria-live="assertive" onClick={onDone}
          className="fixed inset-0 z-[110] grid cursor-pointer place-items-center bg-black/55 backdrop-blur-[2px]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <div className="relative w-full overflow-hidden py-10 text-center">
            <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/85 to-transparent"
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} exit={{ scaleY: 0 }} transition={{ duration: 0.35 }} />
            <motion.p className="relative font-display text-[13vw] leading-none text-gold sm:text-8xl"
              style={{ WebkitTextStroke: "2px #000", textShadow: "5px 5px 0 #000, 0 0 40px rgba(255,201,60,.5)" }}
              initial={{ scale: 2.2, opacity: 0, letterSpacing: "0.3em" }} animate={{ scale: 1, opacity: 1, letterSpacing: "0.02em" }}
              transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
              Missão cumprida!
            </motion.p>
            <motion.p className="relative mt-3 font-display text-3xl text-white sm:text-4xl" style={{ textShadow: "3px 3px 0 #000" }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              Respeito <span className="text-teal">+100</span>
            </motion.p>
            <motion.p className="label relative mt-4 text-white/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
              Whitelist enviada · protocolo {protocol}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
