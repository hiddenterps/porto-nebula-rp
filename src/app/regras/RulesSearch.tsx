"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { rules } from "@/lib/data";

function highlight(text: string, q: string) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return (<>{text.slice(0, i)}<mark className="bg-gold px-0.5 text-black">{text.slice(i, i + q.length)}</mark>{text.slice(i + q.length)}</>);
}

export function RulesSearch() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return rules;
    return rules
      .map((s) => ({ ...s, rules: s.rules.filter((r) => r.text.toLowerCase().includes(t) || r.code.includes(t) || s.title.toLowerCase().includes(t)) }))
      .filter((s) => s.rules.length);
  }, [q]);
  const total = filtered.reduce((n, s) => n + s.rules.length, 0);

  return (
    <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[260px_1fr]">
      <aside className="hidden lg:block">
        <nav className="sticky top-28 space-y-1 border-l border-white/10">
          {rules.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} className="block border-l-2 border-transparent py-2 pl-5 -ml-px font-display text-xl text-white/50 transition hover:border-pink hover:text-white">
              <span className="mr-2 font-mono text-[10px] text-pink">0{i + 1}</span>{s.title}
            </a>
          ))}
        </nav>
      </aside>
      <div>
        <label className="corner relative block">
          <Search className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-pink" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar regra (ex.: RDM, assalto, fila…)"
            className="w-full border border-white/15 bg-white/[0.04] py-5 pl-14 pr-4 text-lg outline-none placeholder:text-white/30 focus:border-pink" />
        </label>
        <p className="label mt-3 text-white/40">{total} regra(s) encontrada(s)</p>
        <div className="mt-10 space-y-14">
          <AnimatePresence mode="popLayout">
            {filtered.map((s, si) => (
              <motion.section layout key={s.id} id={s.id} className="scroll-mt-28" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <h2 className="flex items-baseline gap-4 font-display text-4xl sm:text-5xl"><span className="text-outline-pink">0{rules.findIndex((r) => r.id === s.id) + 1 || si + 1}</span>{s.title}</h2>
                <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
                  {s.rules.map((r) => (
                    <li key={r.code} className="group flex gap-6 py-5 transition hover:bg-white/[0.03]">
                      <span className="w-12 shrink-0 font-mono text-sm font-bold text-gold">{r.code}</span>
                      <p className="text-white/75 group-hover:text-white">{highlight(r.text, q.trim())}</p>
                    </li>
                  ))}
                </ul>
              </motion.section>
            ))}
          </AnimatePresence>
          {!filtered.length && <p className="border border-white/10 p-10 text-center text-white/50">Nenhuma regra encontrada para “{q}”.</p>}
        </div>
      </div>
    </div>
  );
}
