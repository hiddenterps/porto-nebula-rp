"use client";
import { useCallback, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { submitWhitelist, type WhitelistPayload } from "@/lib/whitelist";
import { MissionToast } from "@/components/MissionToast";
import { playBlip } from "@/lib/sound";

type Form = Omit<WhitelistPayload, "age" | "characterAge"> & { age: string; characterAge: string };
type Errors = Partial<Record<keyof Form, string>>;

const initial: Form = { discordUser: "", discordId: "", age: "", rpExperience: "", characterName: "", characterAge: "", backstory: "", scenario: "", acceptRules: false };
const steps = ["Discord", "Personagem", "Avaliação"];
const MIN_STORY = 200;

function validate(step: number, f: Form): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (f.discordUser.trim().length < 2) e.discordUser = "Informe seu usuário do Discord.";
    if (!/^\d{17,20}$/.test(f.discordId.trim())) e.discordId = "O Discord ID tem 17 a 20 números (ative o Modo Desenvolvedor e copie o ID).";
    const age = Number(f.age);
    if (!Number.isInteger(age) || age < 16 || age > 99) e.age = "Idade mínima: 16 anos.";
    if (!f.rpExperience) e.rpExperience = "Selecione uma opção.";
  }
  if (step === 1) {
    if (!/^[A-Za-zÀ-ÿ'.]+(\s[A-Za-zÀ-ÿ'.]+)+$/.test(f.characterName.trim())) e.characterName = "Use nome e sobrenome (sem números).";
    const ca = Number(f.characterAge);
    if (!Number.isInteger(ca) || ca < 18 || ca > 90) e.characterAge = "Idade do personagem entre 18 e 90.";
    if (f.backstory.trim().length < MIN_STORY) e.backstory = `Conte mais sobre o personagem (mínimo ${MIN_STORY} caracteres).`;
  }
  if (step === 2) {
    if (f.scenario.trim().length < 80) e.scenario = "Responda com pelo menos 80 caracteres.";
    if (!f.acceptRules) e.acceptRules = "Você precisa aceitar as regras.";
  }
  return e;
}

export function WhitelistForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [protocol, setProtocol] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [toast, setToast] = useState(false);
  const hideToast = useCallback(() => setToast(false), []);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => { setForm((f) => ({ ...f, [k]: v })); setErrors((e) => ({ ...e, [k]: undefined })); };

  const next = () => {
    const e = validate(step, form);
    setErrors(e);
    if (!Object.keys(e).length) setStep((s) => s + 1);
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (step < steps.length - 1) return next();
    const e = validate(step, form);
    setErrors(e);
    if (Object.keys(e).length) return;
    setSending(true); setApiError(null);
    const res = await submitWhitelist({ ...form, age: Number(form.age), characterAge: Number(form.characterAge) });
    setSending(false);
    if (res.ok) { setProtocol(res.protocol); setToast(true); playBlip("success"); } else setApiError(res.error);
  };

  if (protocol) {
    return (
      <>
      <MissionToast show={toast} protocol={protocol} onDone={hideToast} />
      <div className="corner border border-white/10 bg-night p-10 text-center shadow-[10px_10px_0_#000]">
        <CheckCircle2 className="mx-auto h-16 w-16 text-teal" />
        <h2 className="mt-4 font-display text-6xl text-sunset">Ficha enviada!</h2>
        <p className="mt-2 text-white/60">Protocolo <span className="font-mono font-bold text-gold">{protocol}</span>. A staff avalia em até 48h e você será avisado por mensagem no Discord.</p>
        <p className="mt-4 border border-white/10 bg-black/30 p-3 text-xs text-white/45">Demo: na versão real, o envio vai para um webhook/bot do Discord, que abre o ticket para a staff votar e entrega o cargo automaticamente ao aprovar.</p>
        <Link href="/regras/" className="mt-6 inline-block text-sm font-semibold text-gold hover:underline">Enquanto isso, revise as regras →</Link>
      </div>
      </>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="corner relative border border-white/10 bg-night/80 p-6 shadow-[10px_10px_0_#000] sm:p-10">
      <ol className="mb-8 grid grid-cols-3 gap-2">
        {steps.map((s, i) => (
          <li key={s} className="text-center">
            <div className={`h-2 ${i <= step ? "bg-gradient-to-r from-gold via-sunset to-pink" : "bg-white/10"}`} />
            <span className={`mt-3 block font-display text-xl ${i === step ? "text-white" : "text-white/35"}`}>0{i + 1} · {s}</span>
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait">
      <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
      {step === 0 && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Usuário do Discord" error={errors.discordUser}><input className={inp(errors.discordUser)} value={form.discordUser} onChange={(e) => set("discordUser", e.target.value)} placeholder="ex.: cidadao.nebula" /></Field>
          <Field label="Discord ID" error={errors.discordId} hint="Configurações → Avançado → Modo desenvolvedor → Copiar ID"><input inputMode="numeric" className={inp(errors.discordId)} value={form.discordId} onChange={(e) => set("discordId", e.target.value.replace(/\D/g, ""))} placeholder="123456789012345678" /></Field>
          <Field label="Sua idade" error={errors.age}><input inputMode="numeric" className={inp(errors.age)} value={form.age} onChange={(e) => set("age", e.target.value.replace(/\D/g, ""))} placeholder="18" /></Field>
          <Field label="Experiência com RP" error={errors.rpExperience}>
            <select className={inp(errors.rpExperience)} value={form.rpExperience} onChange={(e) => set("rpExperience", e.target.value)}>
              <option value="">Selecione…</option><option>Nunca joguei</option><option>Menos de 6 meses</option><option>6 meses a 2 anos</option><option>Mais de 2 anos</option>
            </select>
          </Field>
        </div>
      )}

      {step === 1 && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Nome do personagem" error={errors.characterName}><input className={inp(errors.characterName)} value={form.characterName} onChange={(e) => set("characterName", e.target.value)} placeholder="Ana Beatriz Coutinho" /></Field>
          <Field label="Idade do personagem" error={errors.characterAge}><input inputMode="numeric" className={inp(errors.characterAge)} value={form.characterAge} onChange={(e) => set("characterAge", e.target.value.replace(/\D/g, ""))} placeholder="27" /></Field>
          <div className="sm:col-span-2">
            <Field label="História do personagem" error={errors.backstory} hint={`${form.backstory.trim().length}/${MIN_STORY} caracteres mínimos`}>
              <textarea rows={7} className={inp(errors.backstory)} value={form.backstory} onChange={(e) => set("backstory", e.target.value)} placeholder="De onde veio, por que chegou a Porto Nébula, objetivos, medos…" />
            </Field>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <Field label="Situação: você é abordado por dois assaltantes armados na orla. O que seu personagem faz?" error={errors.scenario}>
            <textarea rows={5} className={inp(errors.scenario)} value={form.scenario} onChange={(e) => set("scenario", e.target.value)} placeholder="Descreva a reação considerando amor à vida…" />
          </Field>
          <label className="flex items-start gap-3 text-sm text-white/75">
            <input type="checkbox" checked={form.acceptRules} onChange={(e) => set("acceptRules", e.target.checked)} className="mt-1 h-4 w-4 accent-pink" />
            <span>Li e aceito as <Link href="/regras/" className="text-gold underline">regras da cidade</Link> e entendo que a whitelist pode ser recusada.</span>
          </label>
          {errors.acceptRules && <p className="text-xs text-rose-400">{errors.acceptRules}</p>}
          {apiError && <p className="rounded-lg bg-rose-500/10 p-3 text-sm text-rose-300">{apiError}</p>}
        </div>
      )}

      </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button type="button" onClick={() => setStep((s) => s - 1)} disabled={step === 0} className="inline-flex items-center gap-2 px-4 py-2.5 font-display text-lg text-white/75 hover:bg-white/5 disabled:invisible">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </button>
        <button type="submit" disabled={sending} className="btn-skew inline-flex items-center gap-2 bg-pink px-7 py-3.5 font-display text-xl text-white shadow-[4px_4px_0_#000] hover:bg-sunset disabled:opacity-60">
          <span className="flex items-center gap-2">{sending ? (<><Loader2 className="h-4 w-4 animate-spin" /> Enviando…</>) : step < steps.length - 1 ? (<>Continuar <ArrowRight className="h-4 w-4" /></>) : "Enviar whitelist"}</span>
        </button>
      </div>
    </form>
  );
}

const inp = (err?: string) =>
  `w-full border bg-black/40 px-4 py-3.5 text-sm outline-none transition placeholder:text-white/25 focus:border-pink focus:bg-black/60 ${err ? "border-rose-500/70" : "border-white/15"}`;

function Field({ label, error, hint, children }: { label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label mb-2 block !tracking-[0.18em] text-white/70">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-rose-400">{error}</span> : hint ? <span className="mt-1 block text-xs text-white/45">{hint}</span> : null}
    </label>
  );
}
