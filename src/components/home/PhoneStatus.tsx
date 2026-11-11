"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { BatteryFull, HeartPulse, Play, Signal, Siren, Wifi, Wrench } from "lucide-react";
import { useServerStatus } from "@/components/StatusWidget";
import { DiscordIcon } from "@/components/icons";
import { Reveal } from "@/components/fx";
import { SectionTitle } from "@/components/ui";
import { asset } from "@/lib/asset";
import { connectHref, site } from "@/lib/site";

const feed = [
  { icon: Siren, color: "text-pink", text: "Assalto na joalheria da orla — PMPN a caminho", t: "agora" },
  { icon: HeartPulse, color: "text-teal", text: "HPN abriu 3 vagas de plantão noturno", t: "4 min" },
  { icon: Wrench, color: "text-gold", text: "Encontro de tuning no píer às 22h", t: "12 min" },
];

/** Status ao vivo dentro de um celular estilo jogo. */
export function PhoneStatus() {
  const ref = useRef<HTMLElement>(null);
  const s = useServerStatus();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [8, -5]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const pct = s ? Math.round((s.players / s.maxPlayers) * 100) : 0;

  return (
    <section ref={ref} className="relative overflow-hidden py-28">
      <Image src={asset("/images/hero-city.webp")} alt="" fill className="object-cover opacity-[.12] saturate-150" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_50%,rgba(139,61,255,.35),transparent_55%)]" />
      <span aria-hidden className="text-outline pointer-events-none absolute -bottom-6 left-0 select-none whitespace-nowrap font-display text-[22vw] leading-none opacity-[.06]">AO VIVO</span>
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:gap-24 xl:pr-24">
        <div>
          <SectionTitle index="03" eyebrow="Tempo real" title={<>A cidade no <span className="text-sunset">seu bolso</span></>}
            subtitle="Jogadores online, fila e o que está rolando na cidade, puxados da API pública do cfx.re a cada 30 segundos." />
          <div className="mt-10 grid max-w-lg grid-cols-3 gap-px border border-white/10 bg-white/10">
            {[[s ? `${s.players}` : "—", "online"], [s ? `${s.queue}` : "—", "na fila"], [`${pct}%`, "lotação"]].map(([v, l]) => (
              <div key={l} className="bg-ink p-5"><p className="font-display text-5xl tabular-nums">{v}</p><p className="label mt-1 text-white/45">{l}</p></div>
            ))}
          </div>
          <p className="mt-4 font-mono text-[11px] uppercase text-white/35">{s?.source === "live" ? "ao vivo · cfx.re" : "dados simulados · demo"}</p>
        </div>

        <Reveal className="mx-auto">
          <motion.div style={{ rotate, y }} className="relative h-[620px] w-[300px] rounded-[48px] border-[10px] border-[#050308] bg-black shadow-[0_40px_80px_-20px_rgba(0,0,0,.9),0_0_0_2px_rgba(255,255,255,.08),20px_20px_0_rgba(255,46,136,.35)]">
            <div className="absolute left-1/2 top-2 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-black" />
            <div className="absolute inset-0 overflow-hidden rounded-[38px]">
              <Image src={asset("/images/street-car.webp")} alt="" fill className="scale-125 object-cover opacity-60 blur-[2px]" sizes="300px" />
              <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/65 to-ink/95" />
              <div className="relative flex h-full flex-col px-5 pb-6 pt-3">
                <div className="flex items-center justify-between px-2 font-mono text-[11px] font-bold">
                  <span>21:47</span><span className="flex items-center gap-1"><Signal className="h-3 w-3" /><Wifi className="h-3 w-3" /><BatteryFull className="h-3.5 w-3.5" /></span>
                </div>
                <p className="label mt-8 text-pink">NébulaNet</p>
                <p className="mt-1 font-display text-3xl">Status da cidade</p>
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                  <div className="flex items-end justify-between">
                    <div><p className="font-display text-5xl leading-none tabular-nums">{s ? s.players : "—"}</p><p className="font-mono text-[10px] text-white/50">/ {s?.maxPlayers ?? "—"} jogadores</p></div>
                    <div className="text-right"><p className="font-display text-3xl leading-none text-gold tabular-nums">{s ? s.queue : "—"}</p><p className="font-mono text-[10px] text-white/50">na fila</p></div>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div className="h-full rounded-full bg-gradient-to-r from-teal via-pink to-sunset" initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 1.4, ease: "easeOut" }} />
                  </div>
                </div>
                <p className="label mt-5 !text-[10px] text-white/50">Agora na cidade</p>
                <ul className="mt-2 space-y-2">
                  {feed.map((f, i) => (
                    <motion.li key={f.text} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.15 }}
                      className="flex gap-3 rounded-xl bg-black/40 p-2.5">
                      <f.icon className={`mt-0.5 h-4 w-4 shrink-0 ${f.color}`} />
                      <span className="text-[12px] leading-snug text-white/85">{f.text}<span className="ml-1 text-white/35">· {f.t}</span></span>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-auto grid grid-cols-2 gap-2">
                  <a href={connectHref} className="flex items-center justify-center gap-1.5 rounded-xl bg-gold py-3 font-display text-lg text-black"><Play className="h-4 w-4 fill-current" />Conectar</a>
                  <a href={site.discordUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 rounded-xl bg-[#5865F2] py-3 font-display text-lg"><DiscordIcon className="h-4 w-4" />Discord</a>
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
