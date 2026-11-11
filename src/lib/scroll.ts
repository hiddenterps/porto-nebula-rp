import type Lenis from "lenis";
/** Referência global ao Lenis para pausar o scroll (ex.: menu mobile aberto). */
export const scrollCtl: { lenis: Lenis | null } = { lenis: null };
export function lockScroll(lock: boolean) {
  document.documentElement.style.overflow = lock ? "hidden" : "";
  if (lock) scrollCtl.lenis?.stop(); else scrollCtl.lenis?.start();
}
