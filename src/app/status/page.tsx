import type { Metadata } from "next";
import { Play } from "lucide-react";
import { PageHero } from "@/components/ui";
import { StatusWidget } from "@/components/StatusWidget";
import { connectHref, site } from "@/lib/site";
import { asset } from "@/lib/asset";

export const metadata: Metadata = { title: "Status" };

const services = ["Servidor de jogo", "Bot do Discord", "Loja (Tebex)", "Sistema de whitelist"];

export default function StatusPage() {
  return (
    <>
      <PageHero image={asset("/images/street-car.webp")} eyebrow="Tempo real" title={<>Status <span className="text-sunset">ao vivo</span></>}
        subtitle="Jogadores online e fila atualizados a cada 30 segundos pela API pública do cfx.re. Nesta demo, os dados são simulados." />
      <section className="mx-auto grid max-w-5xl gap-8 px-5 py-16 sm:px-8 md:grid-cols-[1.3fr_1fr]">
        <div className="space-y-5">
          <StatusWidget />
          <a href={connectHref} className="btn-skew flex justify-center bg-gold px-6 py-4 font-display text-2xl text-black shadow-[6px_6px_0_#000] transition hover:-translate-y-1 hover:bg-white">
            <span className="flex items-center gap-3"><Play className="h-5 w-5 fill-current" /> Conectar em {site.shortName}</span>
          </a>
        </div>
        <ul className="corner divide-y divide-white/10 border border-white/10 bg-white/[0.02]">
          {services.map((s) => (
            <li key={s} className="flex items-center justify-between p-5">
              <span className="font-display text-xl">{s}</span>
              <span className="label flex items-center gap-2 !text-[10px] text-teal"><span className="blink h-2 w-2 rounded-full bg-teal" />Operacional</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
