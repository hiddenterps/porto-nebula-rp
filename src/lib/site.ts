/**
 * Configuração central da cidade (DEMO — cidade fictícia).
 * Para um cliente real, basta trocar estes valores.
 */
export const site = {
  name: "Porto Nébula RP",
  shortName: "Porto Nébula",
  tagline: "A cidade litorânea que nunca dorme.",
  description:
    "Servidor de roleplay brasileiro com economia realista, facções organizadas e staff presente 24h. Projeto demonstrativo — cidade fictícia.",
  // Código do servidor no cfx.re (ex.: "abc123"). Vazio = usa dados simulados.
  cfxCode: process.env.NEXT_PUBLIC_CFX_CODE ?? "",
  // Endereço usado no botão Conectar (fivem://connect/<endereço>)
  connectAddress: "cfx.re/join/demo00",
  discordUrl: "https://discord.gg/SEU-CONVITE", // placeholder
  tebexUrl: "https://SUA-LOJA.tebex.io", // placeholder
  contactUrl: "#contato", // placeholder — inserir canal de contato do desenvolvedor
};

export const nav = [
  { href: "/", label: "Início" },
  { href: "/regras/", label: "Regras" },
  { href: "/faccoes/", label: "Facções" },
  { href: "/vip/", label: "VIP" },
  { href: "/status/", label: "Status" },
];

export const connectHref = `fivem://connect/${site.connectAddress}`;
