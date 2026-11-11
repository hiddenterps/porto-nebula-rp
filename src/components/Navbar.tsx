"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, BatteryFull, Menu, Signal, Volume2, VolumeX, Wifi, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { asset } from "@/lib/asset";
import { lockScroll } from "@/lib/scroll";
import { playBlip, setSound, useSound } from "@/lib/sound";
import { useServerStatus } from "./StatusWidget";
import { DiscordIcon, Logo } from "./icons";

const ease = [0.22, 1, 0.36, 1] as const;

function OnlinePill({ className = "" }: { className?: string }) {
  const s = useServerStatus();
  return (
    <span className={`inline-flex h-10 items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3.5 font-mono text-[11px] font-bold uppercase tracking-wider text-teal ${className}`} title="Jogadores online (dados simulados na demo)">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-70 motion-reduce:animate-none" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
      </span>
      <span className="tabular-nums text-white">{s ? s.players : "···"}</span> online
    </span>
  );
}

function SoundToggle() {
  const on = useSound();
  return (
    <button onClick={() => setSound(!on)} aria-pressed={on} aria-label={on ? "Desligar sons da interface" : "Ligar sons da interface"}
      className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/60 transition hover:border-white/30 hover:text-white">
      {on ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );
}

function CTA({ className = "" }: { className?: string }) {
  return (
    <Link href="/whitelist/" onClick={() => playBlip("click")}
      className={`shine btn-skew inline-flex items-center bg-gradient-to-r from-pink to-sunset px-5 py-2.5 font-display text-[17px] tracking-wide text-white shadow-[3px_3px_0_#000] transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#000] ${className}`}>
      <span className="flex items-center gap-1.5">Fazer whitelist <ArrowUpRight className="h-4 w-4" /></span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const path = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60));
  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href.replace(/\/$/, "")));
  const active = nav.find((n) => isActive(n.href))?.href ?? null;
  const highlight = hovered ?? active;

  useEffect(() => { lockScroll(open); return () => lockScroll(false); }, [open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
        <motion.div
          className="relative mx-auto flex items-center justify-between gap-4 overflow-hidden border px-4 backdrop-blur-xl sm:px-5"
          initial={false}
          animate={{
            maxWidth: scrolled ? 1180 : 1440,
            height: scrolled ? 62 : 74,
            borderRadius: scrolled ? 18 : 10,
            backgroundColor: scrolled ? "rgba(12,7,20,0.72)" : "rgba(12,7,20,0.18)",
            borderColor: scrolled ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.0)",
            boxShadow: scrolled ? "0 18px 50px -20px rgba(0,0,0,.8)" : "0 0 0 rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.45, ease }}
        >
          <Link href="/" aria-label={site.name} className="shrink-0 origin-left transition-transform duration-300" style={{ transform: scrolled ? "scale(.9)" : "scale(1)" }}>
            <Logo />
          </Link>

          <nav className="hidden items-center lg:flex" onMouseLeave={() => setHovered(null)} aria-label="Principal">
            {nav.map((n) => {
              const on = highlight === n.href;
              return (
                <Link key={n.href} href={n.href} onMouseEnter={() => { setHovered(n.href); playBlip("hover"); }} onFocus={() => setHovered(n.href)}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={`relative px-4 py-2 font-display text-[17px] tracking-wide transition-colors duration-200 ${on ? "text-white" : "text-white/60 hover:text-white"}`}>
                  {on && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 -z-0 -skew-x-12 bg-gradient-to-r from-pink/90 to-sunset/90 shadow-[3px_3px_0_#000]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                  )}
                  <span className="relative">{n.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <OnlinePill />
            <SoundToggle />
            <a href={site.discordUrl} target="_blank" rel="noreferrer" aria-label="Discord da cidade"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/70 transition hover:border-[#5865F2] hover:bg-[#5865F2] hover:text-white">
              <DiscordIcon className="h-[18px] w-[18px]" />
            </a>
            <CTA className="ml-2" />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <OnlinePill className="!h-9 !px-3" />
            <button className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/30" onClick={() => setOpen(true)} aria-label="Abrir menu" aria-expanded={open}>
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <motion.span className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-teal via-pink to-sunset" style={{ scaleX: scrollYProgress }} />
        </motion.div>
      </header>

      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} isActive={isActive} />}</AnimatePresence>
    </>
  );
}

function MobileMenu({ onClose, isActive }: { onClose: () => void; isActive: (h: string) => boolean }) {
  const items = [...nav, { href: "/whitelist/", label: "Whitelist" }];
  const [time] = useState(() => new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
  return (
    <motion.div className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-ink lg:hidden" role="dialog" aria-modal="true" aria-label="Menu"
      initial={{ clipPath: "circle(0% at 92% 4%)" }} animate={{ clipPath: "circle(150% at 92% 4%)" }} exit={{ clipPath: "circle(0% at 92% 4%)" }}
      transition={{ duration: 0.55, ease }}>
      <Image src={asset("/images/hero-city.webp")} alt="" fill className="scale-110 object-cover opacity-50 blur-[3px]" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/85 to-ink" />
      <div className="scanlines absolute inset-0 opacity-30" />
      <div className="halftone absolute inset-0 opacity-25" />
      <span aria-hidden className="text-outline pointer-events-none absolute -right-[150px] top-1/2 origin-center -translate-y-1/2 rotate-90 font-display text-[150px] leading-none opacity-[.07]">PAUSA</span>

      {/* barra de status estilo celular */}
      <div className="relative flex items-center justify-between px-6 pt-4 font-mono text-xs text-white/70">
        <span className="font-bold text-white">{time}</span>
        <span className="flex items-center gap-1.5"><Signal className="h-3.5 w-3.5" /><Wifi className="h-3.5 w-3.5" /><BatteryFull className="h-4 w-4" /></span>
      </div>
      <div className="relative flex items-center justify-between px-6 pt-5">
        <Logo />
        <button onClick={onClose} aria-label="Fechar menu" className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/5"><X className="h-5 w-5" /></button>
      </div>
      <p className="label relative mt-8 flex items-center gap-2 px-6 text-pink"><span className="siren h-2 w-2 rounded-full" /> Menu · Pausa</p>

      <nav className="relative mt-3 flex-1 px-6" aria-label="Menu mobile">
        {items.map((n, i) => {
          const on = isActive(n.href);
          return (
            <motion.div key={n.href} initial={{ x: -60, opacity: 0, skewX: -10 }} animate={{ x: 0, opacity: 1, skewX: 0 }} exit={{ x: -30, opacity: 0 }}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.45, ease }}>
              <Link href={n.href} onClick={onClose}
                className={`group flex items-center justify-between border-b border-white/10 py-3.5 font-display text-[44px] leading-none transition ${on ? "text-white" : "text-white/70"}`}>
                <span className="flex items-center gap-4">
                  <span className={`h-9 w-1.5 -skew-x-12 ${on ? "bg-gradient-to-b from-gold to-pink" : "bg-white/10 group-hover:bg-pink"}`} />
                  {n.label}
                </span>
                <ArrowUpRight className={`h-7 w-7 transition ${on ? "text-pink" : "text-white/30 group-hover:text-pink"}`} />
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <motion.div className="relative grid gap-3 px-6 pb-8 pt-6" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.4 }}>
        <div className="flex items-center gap-2">
          <OnlinePill />
          <SoundToggle />
          <a href={site.discordUrl} target="_blank" rel="noreferrer" className="ml-auto inline-flex h-10 items-center gap-2 rounded-full bg-[#5865F2] px-4 text-sm font-semibold"><DiscordIcon className="h-4 w-4" /> Discord</a>
        </div>
        <Link href="/whitelist/" onClick={onClose} className="shine btn-skew flex justify-center bg-gradient-to-r from-pink to-sunset py-4 font-display text-2xl shadow-[4px_4px_0_#000]">
          <span className="block">Fazer whitelist</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
