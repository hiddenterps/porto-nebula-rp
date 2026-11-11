"use client";
import { useSyncExternalStore } from "react";

/** Sons de interface (sintetizados via WebAudio, sem arquivos). Desligados por padrão. */
let enabled = false;
const subs = new Set<() => void>();
let ctx: AudioContext | null = null;

export function setSound(on: boolean) {
  enabled = on;
  subs.forEach((f) => f());
  if (on) playBlip("on");
}
export function useSound() {
  return useSyncExternalStore((cb) => { subs.add(cb); return () => subs.delete(cb); }, () => enabled, () => false);
}
export function playBlip(kind: "hover" | "click" | "on" | "success" = "hover") {
  if (!enabled || typeof window === "undefined") return;
  ctx ??= new AudioContext();
  const o = ctx.createOscillator(), g = ctx.createGain();
  const t = ctx.currentTime;
  const f = { hover: 880, click: 520, on: 660, success: 784 }[kind];
  o.type = kind === "success" ? "triangle" : "square";
  o.frequency.setValueAtTime(f, t);
  if (kind === "success") o.frequency.setValueAtTime(f * 1.5, t + 0.12);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(kind === "hover" ? 0.02 : 0.05, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + (kind === "success" ? 0.45 : 0.08));
  o.connect(g).connect(ctx.destination);
  o.start(t); o.stop(t + 0.5);
}
