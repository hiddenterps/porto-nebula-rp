import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { RulesSearch } from "./RulesSearch";
import { asset } from "@/lib/asset";

export const metadata: Metadata = { title: "Regras" };

export default function RegrasPage() {
  return (
    <>
      <PageHero image={asset("/images/police-chase.webp")} eyebrow="Leitura obrigatória" title={<>Regras da <span className="text-sunset">cidade</span></>}
        subtitle="Conhecer as regras faz parte da whitelist. Use a busca para encontrar rapidamente o que precisa." />
      <RulesSearch />
    </>
  );
}
