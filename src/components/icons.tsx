/** Ícone genérico de chat no estilo Discord (SVG próprio, simplificado). */
export function DiscordIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M19.5 5.3A17 17 0 0 0 15.3 4l-.5 1a15.6 15.6 0 0 0-5.6 0l-.5-1a17 17 0 0 0-4.2 1.3C1.8 9.3 1.1 13.2 1.4 17a17 17 0 0 0 5.2 2.6l1.1-1.8a11 11 0 0 1-1.7-.8l.4-.3a12.2 12.2 0 0 0 11.2 0l.4.3c-.5.3-1.1.6-1.7.8l1.1 1.8a17 17 0 0 0 5.2-2.6c.4-4.4-.7-8.3-3.1-11.7ZM8.7 14.7c-1 0-1.9-1-1.9-2.1s.8-2.1 1.9-2.1 1.9 1 1.9 2.1-.8 2.1-1.9 2.1Zm6.6 0c-1 0-1.9-1-1.9-2.1s.8-2.1 1.9-2.1 1.9 1 1.9 2.1-.8 2.1-1.9 2.1Z" />
    </svg>
  );
}

/** Marca original da cidade: emblema de sol poente + wordmark condensado. */
export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const big = size === "lg";
  return (
    <span className="inline-flex items-center gap-3">
      <svg viewBox="0 0 48 48" className={big ? "h-16 w-16" : "h-10 w-10"} aria-hidden>
        <defs>
          <linearGradient id="sun" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffe06b" /><stop offset=".5" stopColor="#ff7a1a" /><stop offset="1" stopColor="#ff2e88" />
          </linearGradient>
          <clipPath id="disc"><circle cx="24" cy="24" r="20" /></clipPath>
        </defs>
        <circle cx="24" cy="24" r="22.5" fill="#0a0610" stroke="#ff2e88" strokeWidth="1.5" />
        <g clipPath="url(#disc)">
          <circle cx="24" cy="27" r="13" fill="url(#sun)" />
          {[30, 33.5, 37, 40.5].map((y, i) => <rect key={y} x="0" y={y} width="48" height={1.2 + i * 0.5} fill="#0a0610" />)}
          <path d="M4 44 L14 31 L19 36 L27 26 L36 36 L44 30 L48 44Z" fill="#19e3cf" opacity=".9" />
        </g>
      </svg>
      <span className="flex flex-col gap-0.5 leading-none">
        <span className={`label text-white/70 ${big ? "!text-sm" : "!text-[9px]"}`}>Porto</span>
        <span className={`font-display text-sunset !leading-[1.25] ${big ? "text-6xl" : "text-[26px]"}`}>Nébula</span>
      </span>
    </span>
  );
}
