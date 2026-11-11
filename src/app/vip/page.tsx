import type { Metadata } from "next";
import { Check, ExternalLink, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui";
import { Reveal, Tilt, WantedStars } from "@/components/fx";
import { vipTiers } from "@/lib/data";
import { site } from "@/lib/site";
import { asset } from "@/lib/asset";

export const metadata: Metadata = { title: "VIP" };

const accents = ["#cd7f32", "#e8e8f0", "#ffc93c"];

export default function VipPage() {
  return (
    <>
      <PageHero image={asset("/images/vip-lifestyle.webp")} eyebrow="Loja oficial · Tebex" title={<>Apoie <span className="text-sunset">a cidade</span></>}
        subtitle="Pacotes cosméticos e de conveniência que mantêm Porto Nébula no ar. Nenhum pacote dá vantagem de jogo." />
      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
        <div className="grid gap-8 md:grid-cols-3 md:items-stretch">
          {vipTiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1} className={t.highlight ? "md:-mt-6" : ""}>
              <Tilt className="group h-full" max={6}>
                <article className={`relative flex h-full flex-col overflow-hidden border-[5px] border-black p-8 shadow-[10px_10px_0_#000] ${t.highlight ? "bg-gradient-to-b from-[#3a0f3d] to-night" : "bg-night"}`}>
                  <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl" style={{ background: accents[i], opacity: 0.25 }} />
                  {t.highlight && <span className="btn-skew absolute right-5 top-5 bg-pink px-3 py-1 font-mono text-[10px] font-bold uppercase"><span className="block">Mais escolhido</span></span>}
                  <WantedStars level={i + 3} size="h-5 w-5" />
                  <h2 className="mt-5 font-display text-6xl" style={{ color: accents[i] }}>{t.name}</h2>
                  <p className="mt-3"><span className="font-display text-5xl">{t.price}</span><span className="text-white/50">{t.period}</span></p>
                  <ul className="mt-8 flex-1 space-y-3 border-t border-white/10 pt-6">
                    {t.perks.map((p) => <li key={p} className="flex gap-3 text-white/80"><Check className="mt-0.5 h-5 w-5 shrink-0 text-teal" />{p}</li>)}
                  </ul>
                  <a href={`${site.tebexUrl}/package/${t.tebexPackage}`} target="_blank" rel="noreferrer"
                    className={`btn-skew mt-10 flex justify-center px-6 py-4 font-display text-2xl shadow-[5px_5px_0_#000] transition hover:-translate-y-1 ${t.highlight ? "bg-pink text-white hover:bg-sunset" : "bg-white text-black hover:bg-gold"}`}>
                    <span className="flex items-center gap-2">Comprar na loja <ExternalLink className="h-5 w-5" /></span>
                  </a>
                </article>
              </Tilt>
            </Reveal>
          ))}
        </div>
        <Reveal className="mx-auto mt-16 max-w-3xl">
          <div className="corner flex items-start gap-4 border border-white/10 bg-white/[0.03] p-6 text-sm text-white/65">
            <ShieldCheck className="h-6 w-6 shrink-0 text-teal" />
            <p>Os pagamentos são processados com segurança pelo <strong className="text-white">Tebex</strong>, a plataforma de monetização autorizada pela Cfx.re. Ao clicar em comprar você vai para a loja oficial. Os benefícios são só cosméticos ou de conveniência e não alteram o equilíbrio do jogo. Reembolsos são tratados pelo suporte do Tebex.</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
