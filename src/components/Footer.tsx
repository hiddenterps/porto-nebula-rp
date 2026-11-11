import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Info } from "lucide-react";
import { nav, site } from "@/lib/site";
import { DiscordIcon, Logo } from "./icons";
import { Marquee } from "./fx";
import { asset } from "@/lib/asset";

export function Footer() {
  return (
    <footer className="relative mt-28 overflow-hidden bg-ink">
      <div className="-rotate-2 scale-105 border-y-4 border-black bg-gold py-3 text-black">
        <Marquee items={["Quer um site assim?", "Site da cidade", "Loja VIP via Tebex", "Whitelist com bot", "Painel de facções", "100% em português"]} speed={32} />
      </div>
      <section id="contato" className="relative mx-auto max-w-[1400px] px-5 pt-20 sm:px-8">
        <div className="corner relative overflow-hidden border border-white/10">
          <Image src={asset("/images/street-car.webp")} alt="" fill className="object-cover opacity-50" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/20" />
          <div className="scanlines absolute inset-0 opacity-40" />
          <div className="relative grid gap-8 p-8 sm:p-14 md:grid-cols-[1.4fr_1fr] md:items-end">
            <div>
              <p className="label text-pink">Para donos de servidor</p>
              <h2 className="mt-4 font-display text-5xl sm:text-7xl">
                Quer um site <span className="text-sunset">assim</span><br />para sua cidade?
              </h2>
              <p className="mt-5 max-w-xl text-white/70">Site da cidade com status ao vivo, loja VIP integrada ao Tebex, whitelist com bot do Discord e painel de facções. Feito sob medida, em português.</p>
            </div>
            <div className="md:justify-self-end">
              <a href={site.contactUrl} className="btn-skew inline-flex bg-pink px-8 py-5 font-display text-2xl text-white shadow-[6px_6px_0_#000] transition hover:-translate-y-1 hover:bg-sunset">
                <span className="flex items-center gap-3">Solicitar orçamento <ArrowRight className="h-6 w-6" /></span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-white/50">{site.tagline}</p>
          <a href={site.discordUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white"><DiscordIcon className="h-4 w-4" /> Discord da cidade</a>
        </div>
        <ul className="grid grid-cols-2 content-start gap-3 text-sm">
          {[...nav, { href: "/whitelist/", label: "Whitelist" }].map((n, i) => (
            <li key={n.href}><Link className="text-white/60 hover:text-pink" href={n.href}><span className="mr-2 font-mono text-[10px] text-pink">0{i + 1}</span>{n.label}</Link></li>
          ))}
        </ul>
        <p className="text-xs leading-relaxed text-white/40">
          Servidor de roleplay independente. Não somos afiliados à Rockstar Games, Take-Two Interactive ou Cfx.re. Ilustrações originais geradas para esta demo. Pagamentos da loja são processados pelo Tebex.
        </p>
      </div>
      <div className="border-t border-white/10 bg-black/40 py-4">
        <p className="mx-auto flex max-w-[1400px] items-center justify-center gap-2 px-5 text-center label !tracking-[0.15em] text-gold">
          <Info className="h-3.5 w-3.5 shrink-0" /> Projeto demonstrativo — cidade fictícia. Nomes, dados e números são ilustrativos.
        </p>
      </div>
    </footer>
  );
}
