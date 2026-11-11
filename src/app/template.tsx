"use client";
import { motion } from "motion/react";
import type { ReactNode } from "react";

/** Transição entre páginas: faixas diagonais estilo loading screen varrendo a tela. */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[80]" aria-hidden>
        {["bg-pink", "bg-sunset", "bg-ink"].map((c, i) => (
          <motion.div key={c} className={`absolute inset-y-0 -left-[20%] w-[140%] ${c}`} style={{ skewX: -12 }}
            initial={{ x: "0%" }} animate={{ x: "110%" }} transition={{ duration: 0.7, delay: 0.06 * (2 - i), ease: [0.76, 0, 0.24, 1] }} />
        ))}
      </div>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}>
        {children}
      </motion.div>
    </>
  );
}
