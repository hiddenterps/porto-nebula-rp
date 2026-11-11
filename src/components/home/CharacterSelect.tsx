"use client";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { characters } from "@/lib/data";
import { playBlip } from "@/lib/sound";

/** Seleção de personagem: painéis que expandem no hover/foco (desktop) e carrossel com snap (mobile). */
export function CharacterSelect() {
  const [active, setActive] = useState(0);
  const pick = (i: number) => { if (i !== active) { setActive(i); playBlip("hover"); } };

  return (
    <>
      {/* Desktop */}
      <div className="hidden h-[600px] gap-3 md:flex">
        {characters.map((c, i) => {
          const on = i === active;
          return (
            <motion.button key={c.name} type="button" layout onMouseEnter={() => pick(i)} onFocus={() => pick(i)} onClick={() => pick(i)}
              aria-pressed={on} aria-label={`${c.name}, ${c.role}`}
              className="group relative min-w-0 overflow-hidden border-[5px] border-black text-left shadow-[8px_8px_0_#000]"
              animate={{ flexGrow: on ? 5 : 1 }} transition={{ type: "spring", stiffness: 220, damping: 30 }} style={{ flexBasis: 0 }}>
              <Image src={c.image} alt="" fill className={`object-cover transition duration-700 ${on ? "scale-105 grayscale-0" : "scale-125 grayscale-[60%] group-hover:grayscale-0"}`} sizes="(max-width: 1400px) 60vw, 800px" />
              <div className={`absolute inset-0 transition duration-500 ${on ? "bg-gradient-to-t from-black/95 via-black/30 to-transparent" : "bg-black/50"}`} />
              <span className={`absolute left-1/2 top-6 -translate-x-1/2 font-display text-2xl text-white/80 transition ${on ? "opacity-0" : "opacity-100"}`}>0{i + 1}</span>
              {!on && (
                <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rotate-180 whitespace-nowrap font-display text-3xl text-white [writing-mode:vertical-rl]">
                  {c.role}
                </span>
              )}
              <AnimatePresence>
                {on && (
                  <motion.div className="absolute inset-x-0 bottom-0 p-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: 0.15, duration: 0.4 }}>
                    <span className="btn-skew inline-block bg-pink px-3 py-1 font-mono text-[11px] font-bold uppercase"><span className="block">{c.role} · {c.tag}</span></span>
                    <h3 className="mt-3 font-display text-6xl leading-none title-shadow">{c.name}</h3>
                    <p className="mt-3 max-w-md text-white/75">{c.desc}</p>
                    <div className="mt-5 grid max-w-sm gap-2">
                      {c.stats.map(([l, v], k) => (
                        <div key={l} className="grid grid-cols-[90px_1fr] items-center gap-3">
                          <span className="label !text-[10px] text-white/60">{l}</span>
                          <div className="h-2 skew-x-[-12deg] bg-white/10">
                            <motion.div className="h-full bg-gradient-to-r from-gold to-pink" initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ delay: 0.25 + k * 0.08, duration: 0.7 }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Mobile */}
      <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:hidden [scrollbar-width:none]">
        {characters.map((c, i) => (
          <article key={c.name} className="relative h-[460px] w-[78vw] shrink-0 snap-center overflow-hidden border-[5px] border-black shadow-[6px_6px_0_#000]">
            <Image src={c.image} alt={`${c.name}, ${c.role}`} fill className="object-cover" sizes="80vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
            <span className="absolute right-4 top-3 font-display text-3xl text-white/70">0{i + 1}</span>
            <div className="absolute inset-x-0 bottom-0 p-5">
              <span className="btn-skew inline-block bg-pink px-2 py-0.5 font-mono text-[10px] font-bold uppercase"><span className="block">{c.role}</span></span>
              <h3 className="mt-2 font-display text-4xl leading-none">{c.name}</h3>
              <p className="mt-2 text-sm text-white/70">{c.desc}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <p className="text-white/50">Passe o mouse para trocar de personagem. Todos são fictícios.</p>
        <Link href="/whitelist/" className="shine btn-skew inline-flex bg-gold px-7 py-3.5 font-display text-2xl text-black shadow-[5px_5px_0_#000] transition hover:-translate-y-1">
          <span className="flex items-center gap-2">Criar meu personagem <ArrowRight className="h-5 w-5" /></span>
        </Link>
      </div>
    </>
  );
}
