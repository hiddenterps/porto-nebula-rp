import { asset } from "@/lib/asset";

// Conteúdo fictício da cidade demo.

export const features = [
  { icon: "Landmark", title: "Economia realista", text: "Salários, impostos, inflação controlada e empresas geridas por jogadores." },
  { icon: "Shield", title: "Staff 24h", text: "Equipe escalada por turnos, tickets respondidos em minutos no Discord." },
  { icon: "Car", title: "Veículos nacionais", text: "Frota inspirada nas ruas brasileiras, com concessionária e oficinas." },
  { icon: "Building2", title: "Facções e empregos", text: "Polícia, hospital, mecânica, imprensa e organizações com hierarquia." },
  { icon: "Cpu", title: "Performance", text: "Scripts otimizados, 60+ FPS e anticheat próprio. Sem lag nas operações." },
  { icon: "Sparkles", title: "Eventos semanais", text: "Corridas, festas na orla, eleições municipais e temporadas com história." },
] as const;

export const staff = [
  { name: "Maré", role: "Fundador", image: asset("/images/staff-mare.webp"), color: "from-cyan-400 to-blue-600" },
  { name: "Kaju", role: "Head Admin", image: asset("/images/staff-kaju.webp"), color: "from-fuchsia-400 to-purple-600" },
  { name: "Lumi", role: "Moderação", image: asset("/images/staff-lumi.webp"), color: "from-amber-300 to-orange-600" },
  { name: "Tito", role: "Desenvolvedor", image: asset("/images/staff-tito.webp"), color: "from-emerald-300 to-teal-600" },
  { name: "Brisa", role: "Suporte", image: asset("/images/staff-brisa.webp"), color: "from-rose-300 to-pink-600" },
  { name: "Zeca", role: "Eventos", image: asset("/images/staff-zeca.webp"), color: "from-indigo-300 to-violet-600" },
];

export const streamers = [
  { name: "NebulaNina", character: "Dra. Helena Prado — HPN", viewers: "2,1 mil", live: true, image: asset("/images/char-medic.webp") },
  { name: "ZeroGrau", character: "Caio \"Grau\" Mendes — Mecânica Orla", viewers: "1,4 mil", live: true, image: asset("/images/char-mechanic.webp") },
  { name: "TiaKombi", character: "Dona Cida — Lanchonete do Píer", viewers: "860", live: false, image: asset("/images/vip-lifestyle.webp") },
  { name: "Ravi_TV", character: "Sgt. Ravi Lopes — PMPN", viewers: "3,2 mil", live: true, image: asset("/images/police-chase.webp") },
];

export const faq = [
  { q: "Como entro na cidade?", a: "Faça a whitelist pelo site, aguarde a análise da staff (até 48h) e, aprovado, você recebe o cargo no Discord e pode conectar." },
  { q: "Preciso de GTA V original?", a: "Sim. É necessário ter o jogo original na sua plataforma e o cliente FiveM instalado." },
  { q: "O VIP dá vantagem dentro do jogo?", a: "Não. Os pacotes são cosméticos e de conveniência (prioridade na fila, roupas, placas personalizadas), seguindo as regras da Cfx.re." },
  { q: "Qual a idade mínima?", a: "16 anos. Menores de 18 precisam de autorização de um responsável para compras na loja." },
  { q: "Fui banido, e agora?", a: "Abra um ticket de revisão no Discord. Toda punição tem registro e pode ser reavaliada pela coordenação." },
];

export type Faction = {
  name: string; type: "Legal" | "Ilegal" | "Empresa"; leader: string; members: number; max: number; recruiting: boolean; desc: string; color: string; reqs: string[]; image: string;
};

export const factions: Faction[] = [
  { name: "PMPN — Polícia Militar", type: "Legal", leader: "Cel. Duarte", members: 48, max: 60, recruiting: true, desc: "Patrulhamento, operações e investigação. Treinamento obrigatório na academia.", color: "from-blue-500 to-cyan-400", reqs: ["18+ no personagem", "Microfone de qualidade", "Disponibilidade noturna"], image: asset("/images/char-police.webp") },
  { name: "HPN — Hospital Porto Nébula", type: "Legal", leader: "Dra. Helena Prado", members: 31, max: 40, recruiting: true, desc: "Atendimento de emergência, cirurgias e plantões. Ótimo para RP de diálogo.", color: "from-rose-500 to-pink-400", reqs: ["Curso interno de primeiros socorros", "Escala mínima de 6h/semana"], image: asset("/images/char-medic.webp") },
  { name: "Mecânica Orla", type: "Empresa", leader: "Caio Mendes", members: 14, max: 20, recruiting: true, desc: "Tuning, guincho e reparos. Comissão por serviço e metas semanais.", color: "from-amber-400 to-orange-500", reqs: ["Carteira de habilitação no jogo", "Experiência com mecânica RP"], image: asset("/images/char-mechanic.webp") },
  { name: "Jornal Maré Alta", type: "Empresa", leader: "Luíza Faro", members: 8, max: 12, recruiting: false, desc: "Imprensa da cidade: reportagens, entrevistas e cobertura de eventos.", color: "from-violet-500 to-indigo-400", reqs: ["Boa escrita", "Edição de vídeo é diferencial"], image: asset("/images/street-car.webp") },
  { name: "Família Neblina", type: "Ilegal", leader: "\"Vovô\"", members: 22, max: 25, recruiting: true, desc: "Organização tradicional do porto. Roleplay de máfia com foco em negociação.", color: "from-zinc-400 to-slate-600", reqs: ["Whitelist ativa há 30 dias", "Entrevista com a liderança"], image: asset("/images/char-mafia.webp") },
  { name: "Os Corvos", type: "Ilegal", leader: "Sombra", members: 25, max: 25, recruiting: false, desc: "Motoclube da serra. Corridas clandestinas e territórios no interior.", color: "from-fuchsia-500 to-purple-600", reqs: ["Vagas encerradas nesta temporada"], image: asset("/images/char-biker.webp") },
];

export type RuleSection = { id: string; title: string; rules: { code: string; text: string }[] };

export const rules: RuleSection[] = [
  { id: "gerais", title: "Regras gerais", rules: [
    { code: "1.1", text: "Respeito acima de tudo: discriminação, assédio ou discurso de ódio resultam em banimento permanente." },
    { code: "1.2", text: "É proibido o uso de cheats, macros, mods de vantagem ou exploração de bugs." },
    { code: "1.3", text: "Discussões fora do personagem devem acontecer no Discord, nunca no meio da cena." },
    { code: "1.4", text: "Contas compartilhadas ou vendidas serão banidas junto com todos os envolvidos." },
  ]},
  { id: "roleplay", title: "Roleplay", rules: [
    { code: "2.1", text: "RDM (matar sem motivo) e VDM (atropelar intencionalmente sem RP) são proibidos." },
    { code: "2.2", text: "Metagaming: não use informações obtidas fora do personagem (stream, Discord) dentro do jogo." },
    { code: "2.3", text: "Powergaming: não force ações impossíveis ou que não deem chance de reação ao outro jogador." },
    { code: "2.4", text: "Amor à vida: valorize a vida do seu personagem diante de ameaças armadas." },
    { code: "2.5", text: "Combat logging (deslogar para fugir de cena) gera punição automática." },
  ]},
  { id: "ilegal", title: "Ações ilegais", rules: [
    { code: "3.1", text: "Assaltos a bancos exigem no mínimo 4 policiais em serviço na cidade." },
    { code: "3.2", text: "Sequestros precisam de motivação e não podem durar mais de 40 minutos." },
    { code: "3.3", text: "Zonas seguras (hospital, prefeitura, praça central) não podem ser alvo de ações." },
  ]},
  { id: "policia", title: "Polícia e abordagens", rules: [
    { code: "4.1", text: "Abordagens devem seguir o procedimento: identificação, voz de comando e revista." },
    { code: "4.2", text: "Corrupção policial só é permitida com autorização prévia da coordenação de RP." },
  ]},
  { id: "punicoes", title: "Punições", rules: [
    { code: "5.1", text: "Advertência → banimento temporário (1 a 7 dias) → banimento permanente, conforme gravidade." },
    { code: "5.2", text: "Revisões são feitas por ticket com clipes ou provas em até 72h após o ocorrido." },
  ]},
];

export type VipTier = { name: string; price: string; period: string; highlight?: boolean; color: string; perks: string[]; tebexPackage: string };

export const vipTiers: VipTier[] = [
  { name: "Bronze", price: "R$ 19,90", period: "/mês", color: "from-amber-700 to-orange-400", tebexPackage: "bronze", perks: ["Prioridade leve na fila", "Cargo e cor no Discord", "1 placa personalizada", "Pack de roupas exclusivo"] },
  { name: "Prata", price: "R$ 39,90", period: "/mês", color: "from-zinc-300 to-slate-500", tebexPackage: "prata", highlight: true, perks: ["Prioridade média na fila", "Tudo do Bronze", "Pack de tatuagens e acessórios", "Emotes e animações extras", "Canal VIP no Discord"] },
  { name: "Ouro", price: "R$ 69,90", period: "/mês", color: "from-yellow-300 to-amber-500", tebexPackage: "ouro", perks: ["Prioridade máxima na fila", "Tudo do Prata", "Pintura e neon cosméticos para veículos", "Nome em destaque no mural de apoiadores", "Acesso antecipado a eventos"] },
];

export const characters = [
  { name: "Sgt. Rita Alves", role: "PMPN", tag: "Lei & ordem", image: asset("/images/char-police.webp"), desc: "Patrulha, perseguições e investigação. Para quem gosta de procedimento e adrenalina.", stats: [["Ação", 90], ["Diálogo", 60], ["Estratégia", 75]] },
  { name: "Dra. Helena Prado", role: "Hospital", tag: "Plantão 24h", image: asset("/images/char-medic.webp"), desc: "Emergências, cirurgias e decisões difíceis. O RP de quem salva a cidade todo dia.", stats: [["Ação", 55], ["Diálogo", 95], ["Estratégia", 70]] },
  { name: "Caio \"Grau\" Mendes", role: "Mecânica Orla", tag: "Tuning", image: asset("/images/char-mechanic.webp"), desc: "Oficina, guincho e rachas na orla. Economia própria e clientela fiel.", stats: [["Ação", 65], ["Diálogo", 70], ["Estratégia", 60]] },
  { name: "\"Vovô\"", role: "Família Neblina", tag: "O porto é dele", image: asset("/images/char-mafia.webp"), desc: "Negócios, alianças e traições no porto. Roleplay de máfia com foco em negociação.", stats: [["Ação", 50], ["Diálogo", 90], ["Estratégia", 98]] },
  { name: "Sombra", role: "Os Corvos MC", tag: "Estrada é lei", image: asset("/images/char-biker.webp"), desc: "Motoclube da serra: território, corridas clandestinas e lealdade acima de tudo.", stats: [["Ação", 92], ["Diálogo", 45], ["Estratégia", 65]] },
] as const;

export const wanted = [
  { level: 1, title: "Advertência", text: "Infrações leves de RP. Registro no histórico e orientação da staff." },
  { level: 2, title: "Suspensão curta", text: "Reincidência ou quebra de cena. Banimento de 1 a 3 dias." },
  { level: 3, title: "Suspensão longa", text: "RDM, VDM ou metagaming comprovado. Banimento de até 7 dias." },
  { level: 4, title: "Remoção de cargo", text: "Abuso de posição em facção ou empresa. Perde o cargo e a whitelist da org." },
  { level: 5, title: "Banimento permanente", text: "Cheats, discriminação ou venda de conta. Sem volta." },
];
