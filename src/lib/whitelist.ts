/**
 * Stub de envio da whitelist.
 *
 * Versão real: POST para uma API (route handler / serverless) que valida os
 * dados e encaminha para um webhook do Discord ou para o bot da cidade, que
 * abre o ticket de avaliação da staff e entrega o cargo "Whitelist" ao aprovar.
 * Na demo (export estático) apenas simulamos a latência e geramos um protocolo.
 */
export type WhitelistPayload = {
  discordUser: string;
  discordId: string;
  age: number;
  rpExperience: string;
  characterName: string;
  characterAge: number;
  backstory: string;
  scenario: string;
  acceptRules: boolean;
};

export type WhitelistResult = { ok: true; protocol: string } | { ok: false; error: string };

export async function submitWhitelist(data: WhitelistPayload): Promise<WhitelistResult> {
  await new Promise((r) => setTimeout(r, 900));
  if (!/^\d{17,20}$/.test(data.discordId)) return { ok: false, error: "Discord ID inválido." };
  const protocol = `PN-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  return { ok: true, protocol };
}
