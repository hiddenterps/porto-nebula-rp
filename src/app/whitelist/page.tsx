import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui";
import { WhitelistForm } from "./WhitelistForm";
import { asset } from "@/lib/asset";

export const metadata: Metadata = { title: "Whitelist" };

const steps = [
  ["01", "Ficha", "Preencha em 3 etapas com Discord, personagem e um teste rápido."],
  ["02", "Análise", "A staff vota pelo bot do Discord em até 48h."],
  ["03", "Cargo", "Aprovado, você recebe o cargo automaticamente e já pode conectar."],
];

export default function WhitelistPage() {
  return (
    <>
      <PageHero image={asset("/images/char-police.webp")} eyebrow="Entrada na cidade" title={<>Faça sua <span className="text-sunset">whitelist</span></>}
        subtitle="Conte quem é seu personagem. A staff avalia sua história e, aprovado, você recebe o cargo no Discord automaticamente." />
      <section className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.4fr]">
        <aside className="space-y-4">
          {steps.map(([n, t, d]) => (
            <div key={n} className="flex gap-5 border border-white/10 p-5">
              <span className="font-display text-5xl text-outline-pink">{n}</span>
              <div><p className="font-display text-2xl">{t}</p><p className="text-sm text-white/55">{d}</p></div>
            </div>
          ))}
          <div className="relative hidden aspect-[4/3] overflow-hidden border-[5px] border-black shadow-[8px_8px_0_#000] lg:block">
            <Image src={asset("/images/char-medic.webp")} alt="" fill className="object-cover" sizes="30vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <p className="absolute bottom-4 left-4 font-display text-3xl">Sua história<br /><span className="text-sunset">começa aqui.</span></p>
          </div>
        </aside>
        <WhitelistForm />
      </section>
    </>
  );
}
