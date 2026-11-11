import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Car, ChevronDown, Cpu, Landmark, Play, Shield, Sparkles, type LucideIcon } from "lucide-react";
import { HomeHero } from "@/components/home/HomeHero";
import { Cinematic } from "@/components/home/Cinematic";
import { CharacterSelect } from "@/components/home/CharacterSelect";
import { PhoneStatus } from "@/components/home/PhoneStatus";
import { Counter, Marquee, Reveal, SplitTitle, WantedStars } from "@/components/fx";
import { SectionTitle } from "@/components/ui";
import { faq, features, staff, streamers, wanted } from "@/lib/data";
import { asset } from "@/lib/asset";

const icons: Record<string, LucideIcon> = { Landmark, Shield, Car, Building2, Cpu, Sparkles };

export default function Home() {
  return (
    <>
      <HomeHero />

      {/* Letreiros cruzados */}
      <div className="relative z-10 -mt-10 h-36 overflow-hidden sm:h-44" aria-hidden>
        <div className="absolute inset-x-[-5%] top-8 rotate-[3deg] border-y-4 border-black bg-pink py-3 text-white shadow-[0_10px_0_#000]">
          <Marquee items={["Whitelist aberta", "Economia realista", "Facções com história", "Staff 24h", "Eventos semanais"]} speed={30} />
        </div>
        <div className="absolute inset-x-[-5%] top-12 -rotate-[2deg] border-y-4 border-black bg-gold py-3 text-black">
          <Marquee items={["Porto Nébula RP", "Temporada 03", "Roleplay brasileiro", "Conecte-se agora"]} reverse speed={36} />
        </div>
      </div>

      {/* Números */}
      <section className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px border border-white/10 bg-white/10 px-0 sm:mx-8 lg:mx-auto lg:grid-cols-4">
        {[
          { n: 12480, s: "+", l: "Whitelists aprovadas" },
          { n: 640, s: "", l: "Pico de jogadores" },
          { n: 62, s: "", l: "Empregos e facções" },
          { n: 24, s: "h", l: "Staff online" },
        ].map((x, i) => (
          <Reveal key={x.l} delay={i * 0.08} className="bg-ink p-6 sm:p-10">
            <p className="font-display text-5xl text-white sm:text-7xl"><Counter to={x.n} suffix={x.s} /></p>
            <p className="label mt-3 text-white/50">{x.l}</p>
          </Reveal>
        ))}
      </section>

      {/* A cidade */}
      <section className="mx-auto max-w-[1400px] px-5 py-28 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="label flex items-center gap-3 text-pink"><span className="border border-pink/50 px-1.5 py-0.5 text-white">01</span>A cidade</p>
            <h2 className="mt-4 font-display text-6xl sm:text-8xl">
              <SplitTitle lines={[{ text: "Uma cidade." }, { text: "Mil histórias.", className: "text-sunset" }, { text: "A sua começa", className: "text-outline" }, { text: "agora.", className: "text-outline" }]} />
            </h2>
            <p className="mt-6 max-w-lg text-lg text-white/65">Cada sistema foi pensado para gerar cenas, não grind. Do píer à serra, Porto Nébula vive 24 horas por dia — com ou sem você.</p>
          </div>
          <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
            {features.map((f, i) => {
              const Icon = icons[f.icon];
              return (
                <Reveal key={f.title} delay={i * 0.06} className="group relative bg-ink p-7 transition-colors hover:bg-night">
                  <span className="absolute right-5 top-5 font-mono text-xs text-white/25">0{i + 1}</span>
                  <Icon className="h-8 w-8 text-teal transition group-hover:scale-110 group-hover:text-pink" />
                  <h3 className="mt-5 font-display text-3xl">{f.title}</h3>
                  <p className="mt-2 text-sm text-white/55">{f.text}</p>
                  <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-teal to-pink transition-transform duration-500 group-hover:scale-x-100" />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <Cinematic />

      {/* Elenco — grade estilo loading screen */}
      <section className="relative overflow-hidden py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-[#1a0b26] to-ink" />
        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle index="02" eyebrow="Elenco" title={<>Escolha seu <span className="text-sunset">caminho</span></>} />
            <Link href="/faccoes/" className="group inline-flex items-center gap-2 font-display text-2xl hover:text-pink">Todas as facções <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" /></Link>
          </div>
          <div className="mt-14"><CharacterSelect /></div>
        </div>
      </section>

      <PhoneStatus />

      {/* Nível de procurado */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionTitle index="04" eyebrow="Regras sem rodeio" title={<>Nível de <span className="text-sunset">procurado</span></>}
              subtitle="Na cidade, as estrelas são do personagem. Fora dela, quem quebra regra recebe as estrelas da staff." />
            <Link href="/regras/" className="btn-skew mt-8 inline-flex border-2 border-white px-6 py-3 font-display text-xl transition hover:border-pink hover:bg-pink"><span className="block">Ler todas as regras</span></Link>
          </div>
          <ol className="space-y-3">
            {wanted.map((w, i) => (
              <Reveal key={w.level} delay={i * 0.05}>
                <li className="group flex flex-col gap-4 border border-white/10 bg-white/[0.02] p-6 transition hover:border-pink/50 hover:bg-pink/5 sm:flex-row sm:items-center">
                  <WantedStars level={w.level} size="h-6 w-6" className="shrink-0" />
                  <div className="sm:ml-4">
                    <h3 className="font-display text-3xl">{w.title}</h3>
                    <p className="text-sm text-white/55">{w.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Streamers */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
        <SectionTitle index="05" eyebrow="Ao vivo agora" title="Streamers da cidade" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {streamers.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.08}>
              <article className="group">
                <div className="relative aspect-video overflow-hidden border border-white/10">
                  <Image src={s.image} alt="" fill className="object-cover transition duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 25vw" />
                  <div className="scanlines absolute inset-0 opacity-40" />
                  <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/10" />
                  {s.live ? <span className="label absolute left-3 top-3 flex items-center gap-1.5 bg-red-600 px-2 py-1 !text-[10px] text-white"><span className="blink h-1.5 w-1.5 rounded-full bg-white" />Ao vivo</span>
                    : <span className="label absolute left-3 top-3 bg-black/70 px-2 py-1 !text-[10px] text-white/70">Offline</span>}
                  <span className="absolute bottom-3 right-3 bg-black/70 px-2 py-0.5 font-mono text-[11px]">{s.viewers}</span>
                  <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 scale-75 place-items-center rounded-full bg-pink opacity-0 transition group-hover:scale-100 group-hover:opacity-100"><Play className="h-6 w-6 fill-white text-white" /></span>
                </div>
                <p className="mt-3 font-display text-2xl">{s.name}</p>
                <p className="text-sm text-white/50">{s.character}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* VIP teaser */}
      <section className="relative my-20 overflow-hidden">
        <div className="clip-slant-top clip-slant relative py-36">
          <Image src={asset("/images/vip-lifestyle.webp")} alt="Festa na orla de Porto Nébula ao pôr do sol" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
          <div className="halftone absolute inset-0 opacity-25" />
          <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
            <Reveal>
              <p className="label text-gold">Apoie a cidade</p>
              <h2 className="mt-4 max-w-2xl font-display text-6xl sm:text-8xl">Estilo de <span className="text-sunset">sobra</span>.<br />Vantagem? Zero.</h2>
              <p className="mt-6 max-w-lg text-lg text-white/75">Pacotes VIP cosméticos: roupas, placas, neon e prioridade na fila. Compra segura pela loja oficial no Tebex.</p>
              <Link href="/vip/" className="btn-skew mt-8 inline-flex bg-gold px-8 py-4 font-display text-2xl text-black shadow-[6px_6px_0_#000] transition hover:-translate-y-1 hover:bg-white"><span className="flex items-center gap-3">Ver pacotes <ArrowRight className="h-6 w-6" /></span></Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Staff */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
        <SectionTitle index="06" eyebrow="Equipe" title="Staff que joga junto" />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {staff.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.06}>
              <div className="group">
                <div className={`relative aspect-[4/5] overflow-hidden border-[4px] border-black bg-gradient-to-br ${m.color} shadow-[6px_6px_0_#000] transition duration-300 group-hover:-translate-y-1.5 ${i % 2 ? "group-hover:rotate-2" : "group-hover:-rotate-2"}`}>
                  <Image src={m.image} alt={`Retrato ilustrado de ${m.name}, ${m.role}`} fill className="object-cover transition duration-500 group-hover:scale-110" sizes="(max-width: 768px) 50vw, 16vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="halftone absolute inset-0 opacity-20" />
                  <p className="absolute bottom-3 left-3 font-display text-3xl leading-none title-shadow">{m.name}</p>
                </div>
                <p className="label mt-3 !text-[10px] text-white/55">{m.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-5 pt-20 sm:px-8">
        <SectionTitle index="07" eyebrow="Dúvidas" title="Perguntas frequentes" center />
        <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {faq.map((f, i) => (
            <details key={f.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                <span className="flex items-baseline gap-4 font-display text-2xl sm:text-3xl"><span className="font-mono text-xs text-pink">0{i + 1}</span>{f.q}</span>
                <ChevronDown className="h-6 w-6 shrink-0 text-pink transition group-open:rotate-180" />
              </summary>
              <p className="mt-4 pl-9 text-white/60">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
