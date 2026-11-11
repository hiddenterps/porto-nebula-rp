"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { fetchServerStatus, type ServerStatus } from "@/lib/fivem";
import { site } from "@/lib/site";

export function useServerStatus(intervalMs = 30_000) {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  useEffect(() => {
    let alive = true;
    const load = async () => {
      const s = await fetchServerStatus(site.cfxCode);
      if (alive) setStatus(s);
    };
    load();
    const t = setInterval(load, intervalMs);
    return () => { alive = false; clearInterval(t); };
  }, [intervalMs]);
  return status;
}

/** HUD de status estilo minimapa: radar + jogadores + fila. */
export function StatusWidget({ className = "" }: { className?: string }) {
  const s = useServerStatus();
  const pct = s ? s.players / s.maxPlayers : 0;
  const R = 52, C = 2 * Math.PI * R;

  return (
    <div className={`hud-panel corner flex items-center gap-5 p-4 sm:p-5 ${className}`} aria-live="polite">
      <div className="relative h-32 w-32 shrink-0">
        <div className="absolute inset-2 overflow-hidden rounded-full border border-teal/30 bg-[radial-gradient(circle,rgba(25,227,207,.15),transparent_70%)]">
          <div className="radar-sweep absolute inset-0 rounded-full" />
          <div className="absolute inset-0 rounded-full bg-[linear-gradient(rgba(25,227,207,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(25,227,207,.15)_1px,transparent_1px)] bg-[size:14px_14px]" />
          {[[30, 40], [62, 28], [55, 66], [24, 70], [72, 52]].map(([l, t], i) => (
            <span key={i} className="blink absolute h-1.5 w-1.5 rounded-full bg-pink shadow-[0_0_8px_#ff2e88]" style={{ left: `${l}%`, top: `${t}%`, animationDelay: `${i * 0.3}s` }} />
          ))}
        </div>
        <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90">
          <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="6" />
          <motion.circle cx="60" cy="60" r={R} fill="none" stroke="url(#hudg)" strokeWidth="6" strokeLinecap="round" strokeDasharray={C}
            initial={{ strokeDashoffset: C }} animate={{ strokeDashoffset: C * (1 - pct) }} transition={{ duration: 1.6, ease: "easeOut" }} />
          <defs><linearGradient id="hudg"><stop offset="0" stopColor="#19e3cf" /><stop offset="1" stopColor="#ff2e88" /></linearGradient></defs>
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="font-display text-3xl leading-none text-white">{s ? s.players : "—"}</p>
            <p className="font-mono text-[9px] text-white/50">/{s ? s.maxPlayers : "—"}</p>
          </div>
        </div>
      </div>
      <div className="min-w-0">
        <p className="label flex items-center gap-2 text-teal"><span className="blink h-2 w-2 rounded-full bg-teal" />{s ? "Online agora" : "Conectando…"}</p>
        <p className="mt-2 font-display text-4xl leading-none">{s ? s.queue : "—"} <span className="text-lg text-white/50">na fila</span></p>
        <p className="mt-2 font-mono text-[10px] uppercase text-white/40">{s?.source === "live" ? "ao vivo · cfx.re" : "dados simulados · demo"}</p>
      </div>
    </div>
  );
}
