/**
 * Status do servidor FiveM.
 *
 * Produção: consulta o endpoint público do cfx.re
 *   https://servers-frontend.fivem.net/api/servers/single/<code>
 * Demo: sem código configurado (ou se a requisição falhar), devolve um mock
 * com o MESMO formato da resposta real, para a UI não precisar mudar.
 */

export type FiveMPlayer = { id: number; name: string; ping: number };

/** Subconjunto da resposta real de /api/servers/single/<code> */
export type FiveMServerResponse = {
  EndPoint: string;
  Data: {
    clients: number;
    sv_maxclients: number;
    hostname: string;
    gametype?: string;
    mapname?: string;
    resources?: string[];
    players: FiveMPlayer[];
    vars: Record<string, string>;
    lastSeen?: string;
  };
};

export type ServerStatus = {
  online: boolean;
  players: number;
  maxPlayers: number;
  queue: number;
  hostname: string;
  source: "live" | "mock";
  updatedAt: string;
};

const ENDPOINT = "https://servers-frontend.fivem.net/api/servers/single/";

/** Mock determinístico + pequena variação, imitando o payload real. */
export function mockServerResponse(code = "demo00"): FiveMServerResponse {
  const minute = new Date().getMinutes();
  const clients = 512 + ((minute * 7) % 112); // 512–623
  const max = 1024;
  return {
    EndPoint: code,
    Data: {
      clients,
      sv_maxclients: max,
      hostname: "^5Porto Nébula ^7RP | ^3Whitelist aberta | Economia realista",
      gametype: "Roleplay",
      mapname: "Porto Nébula",
      players: Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        name: `cidadao_${i + 1}`,
        ping: 20 + i * 9,
      })),
      vars: {
        sv_projectName: "Porto Nébula RP",
        locale: "pt-BR",
        // Muitos servidores expõem a fila via resource/convar própria
        queue: String(18 + (minute % 23)),
      },
      lastSeen: new Date().toISOString(),
    },
  };
}

function normalize(res: FiveMServerResponse, source: ServerStatus["source"]): ServerStatus {
  const queue = Number(res.Data.vars?.queue ?? res.Data.vars?.["Fila"] ?? 0) || 0;
  return {
    online: true,
    players: res.Data.clients,
    maxPlayers: res.Data.sv_maxclients,
    queue,
    hostname: res.Data.hostname.replace(/\^\d/g, ""),
    source,
    updatedAt: new Date().toISOString(),
  };
}

/** Função isolada de fetch — troque/adapte aqui sem tocar na UI. */
export async function fetchServerStatus(code?: string): Promise<ServerStatus> {
  if (!code) return normalize(mockServerResponse(), "mock");
  try {
    const r = await fetch(`${ENDPOINT}${encodeURIComponent(code)}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const json = (await r.json()) as FiveMServerResponse;
    return normalize(json, "live");
  } catch {
    // Fallback: mantém a página funcionando mesmo com o cfx.re fora/CORS.
    return normalize(mockServerResponse(code), "mock");
  }
}
