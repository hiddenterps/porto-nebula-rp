import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Crown, Users } from "lucide-react";
import { PageHero } from "@/components/ui";
import { Reveal, Tilt } from "@/components/fx";
import { factions, type Faction } from "@/lib/data";
import { asset } from "@/lib/asset";

export const metadata: Metadata = { title: "Facções" };

const typeStyle: Record<Faction["type"], string> = { Legal: "bg-teal text-black", Ilegal: "bg-pink text-white", Empresa: "bg-gold text-black" };

export default function FaccoesPage() {
  const open = factions.filter((f) => f.recruiting).length;
  return (
    <>
      <PageHero image={asset("/images/char-mafia.webp")} eyebrow="Organizações" title={<>Escolha <span className="text-sunset">seu lado</span></>}
        subtitle="Polícia, hospital, empresas e organizações. Cada uma com liderança, hierarquia e processo seletivo próprio.">
        <div className="mt-8 flex flex-wrap gap-3">
          <span className="label flex items-center gap-2 bg-teal px-3 py-2 text-black"><span className="blink h-2 w-2 rounded-full bg-black" />{open} recrutando agora</span>
          <span className="label border border-white/20 px-3 py-2 text-white/80">{factions.length} organizações ativas</span>
        </div>
      </PageHero>
      <section className="mx-auto grid max-w-[1400px] gap-8 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-3">
        {factions.map((f, i) => {
          const pct = Math.round((f.members / f.max) * 100);
          return (
            <Reveal key={f.name} delay={(i % 3) * 0.1}>
              <Tilt className="group h-full" max={6}>
                <article className="flex h-full flex-col overflow-hidden border-[5px] border-black bg-night shadow-[10px_10px_0_#000]">
                  <div className="relative h-72 overflow-hidden">
                    <Image src={f.image} alt={f.name} fill className={`object-cover object-top transition duration-700 group-hover:scale-110 ${f.recruiting ? "" : "grayscale"}`} sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" />
                    <span className={`btn-skew absolute left-4 top-4 px-3 py-1 font-mono text-[11px] font-bold uppercase ${typeStyle[f.type]}`}><span className="block">{f.type}</span></span>
                    {!f.recruiting && <span className="absolute right-4 top-6 rotate-12 border-4 border-red-500 px-3 py-1 font-display text-2xl text-red-500">Lotado</span>}
                    <h2 className="absolute bottom-3 left-5 right-5 font-display text-4xl leading-none title-shadow">{f.name}</h2>
                  </div>
                  <div className="flex flex-1 flex-col p-6 pt-3">
                    <p className="text-sm text-white/60">{f.desc}</p>
                    <div className="mt-5 flex items-center justify-between text-sm">
                      <span className="inline-flex items-center gap-1.5"><Crown className="h-4 w-4 text-gold" />{f.leader}</span>
                      <span className="inline-flex items-center gap-1.5 font-mono"><Users className="h-4 w-4 text-teal" />{f.members}/{f.max}</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden bg-white/10"><div className={`h-full bg-gradient-to-r ${f.color}`} style={{ width: `${pct}%` }} /></div>
                    <p className="label mt-6 text-white/40">Requisitos</p>
                    <ul className="mt-2 flex-1 space-y-1.5 text-sm text-white/70">{f.reqs.map((r) => <li key={r} className="flex gap-2"><span className="text-pink">▸</span>{r}</li>)}</ul>
                    {f.recruiting ? (
                      <Link href="/whitelist/" className="btn-skew mt-7 flex justify-center bg-teal px-5 py-3 font-display text-xl text-black shadow-[4px_4px_0_#000] transition hover:-translate-y-0.5 hover:bg-white">
                        <span className="flex items-center gap-2">Candidatar-se <ArrowRight className="h-5 w-5" /></span>
                      </Link>
                    ) : <span className="mt-7 block border border-white/10 py-3 text-center font-display text-xl text-white/40">Recrutamento fechado</span>}
                  </div>
                </article>
              </Tilt>
            </Reveal>
          );
        })}
      </section>
    </>
  );
}
