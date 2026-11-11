"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { ChevronDown, Play } from "lucide-react";
import { introDelay } from "@/components/LoadingScreen";
import { WantedStars } from "@/components/fx";
import { DiscordIcon } from "@/components/icons";
import { asset } from "@/lib/asset";
import { playBlip } from "@/lib/sound";
import { connectHref, site } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const [d] = useState(() => introDelay());
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const sunY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const crewY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const crewScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-ink">
      {/* Camada 1: cidade (Ken Burns + parallax) */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="kenburns absolute inset-0">
          <Image src={asset("/images/hero-city.webp")} alt="Vista da cidade fictícia de Porto Nébula ao pôr do sol" fill priority className="object-cover object-[70%_50%]" sizes="100vw" />
        </div>
      </motion.div>

      {/* Camada 2: sol + raios de luz */}
      <motion.div className="pointer-events-none absolute inset-0 mix-blend-screen" style={{ y: sunY }} aria-hidden>
        <div className="sun-rays absolute left-[88%] top-[40%] h-[1600px] w-[1600px]" />
        <div className="sun-glow absolute left-[88%] top-[40%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,220,140,.75)_0%,rgba(255,122,26,.35)_35%,transparent_70%)]" />
      </motion.div>

      {/* Sombreamento para leitura */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent md:via-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      <div className="halftone absolute inset-0 opacity-20" />
      <div className="scanlines absolute inset-0 opacity-20" />

      {/* Camada 3: personagens recortados na frente do skyline */}
      <motion.div className="pointer-events-none absolute bottom-0 right-[-6%] hidden w-[60vw] max-w-[860px] md:block lg:right-[-1%] lg:w-[52vw]"
        style={{ y: crewY, scale: crewScale, transformOrigin: "bottom center" }}
        initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: d + 0.35, duration: 1.1, ease }}>
        <Image src={asset("/images/hero-crew.webp")} alt="Personagens fictícios da cidade: mecânico, líder de gangue e policial" width={1152} height={864} priority
          className="h-auto w-full drop-shadow-[0_20px_40px_rgba(0,0,0,.6)]" sizes="58vw" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </motion.div>

      {/* HUD: nível de procurado + dinheiro */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: d + 0.6, duration: 0.6 }}
        className="absolute right-5 top-28 hidden flex-col items-end gap-1 sm:right-8 md:flex">
        <WantedStars level={3} size="h-7 w-7" />
        <span className="font-display text-4xl text-white title-shadow">R$ <span className="text-[#7CFF6B]">48.230</span></span>
      </motion.div>

      <motion.div style={{ y: textY, opacity: fade }} className="relative mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-5 pb-20 pt-32 sm:px-8 md:justify-center md:pb-10">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: d + 0.15, duration: 0.6 }}
          className="label mb-6 inline-flex !text-[10px] sm:!text-xs w-fit items-center gap-3 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-gold backdrop-blur">
          <span className="siren h-2 w-2 rounded-full" /> Temporada 03 · Whitelist aberta
        </motion.p>
        <h1 className="font-display">
          <span className="-mt-[0.2em] block overflow-hidden pt-[0.2em] text-[19vw] sm:text-[13vw] lg:text-[10.5rem]">
            <motion.span className="block leading-[.85] text-white title-shadow" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: d, duration: 1, ease }}>Porto</motion.span>
          </span>
          <span className="mt-[0.04em] block overflow-hidden pt-[0.3em] text-[23vw] sm:text-[16vw] lg:text-[13.5rem]">
            <motion.span className="block leading-[.85] text-sunset" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: d + 0.12, duration: 1, ease }}>Nébula</motion.span>
          </span>
        </h1>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: d + 0.45, duration: 0.7 }} className="mt-6 max-w-xl">
          <p className="text-lg text-white/80 sm:text-xl">
            Roleplay brasileiro de verdade. Economia viva, facções com história e uma staff que joga junto. <span className="text-white">{site.tagline}</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={connectHref} onClick={() => playBlip("click")} className="shine btn-skew bg-gold px-8 py-4 font-display text-2xl text-black shadow-[6px_6px_0_#000] transition hover:-translate-y-1 hover:bg-white">
              <span className="flex items-center gap-3"><Play className="h-5 w-5 fill-current" /> Conectar</span>
            </a>
            <a href={site.discordUrl} target="_blank" rel="noreferrer" className="btn-skew bg-[#5865F2] px-8 py-4 font-display text-2xl text-white shadow-[6px_6px_0_#000] transition hover:-translate-y-1 hover:brightness-110">
              <span className="flex items-center gap-3"><DiscordIcon className="h-6 w-6" /> Discord</span>
            </a>
            <Link href="/whitelist/" className="btn-skew border-2 border-white/80 bg-black/30 px-8 py-4 font-display text-2xl text-white backdrop-blur transition hover:-translate-y-1 hover:border-pink hover:bg-pink">
              <span className="block">Whitelist</span>
            </Link>
          </div>
          <p className="mt-4 font-mono text-xs text-white/50">F8 → connect {site.connectAddress}</p>
        </motion.div>
      </motion.div>
      <motion.div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-white/60 sm:block" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}
