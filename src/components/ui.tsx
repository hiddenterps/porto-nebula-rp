import type { ReactNode } from "react";
import Image from "next/image";

export function SectionTitle({ index, eyebrow, title, subtitle, center = false }: { index?: string; eyebrow?: string; title: ReactNode; subtitle?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <p className={`label flex items-center gap-3 text-pink ${center ? "justify-center" : ""}`}>
          {index && <span className="border border-pink/50 px-1.5 py-0.5 text-white">{index}</span>}{eyebrow}
        </p>
      )}
      <h2 className="mt-4 font-display text-5xl sm:text-7xl">{title}</h2>
      {subtitle && <p className="mt-5 text-lg text-white/60">{subtitle}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, subtitle, image, children }: { eyebrow: string; title: ReactNode; subtitle: string; image: string; children?: ReactNode }) {
  return (
    <section className="clip-slant relative overflow-hidden pb-[6vw]">
      <Image src={image} alt="" fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
      <div className="halftone absolute inset-0 opacity-30" />
      <div className="scanlines absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-[1400px] px-5 pb-16 pt-40 sm:px-8 sm:pt-48">
        <p className="label text-pink">{eyebrow}</p>
        <h1 className="title-shadow mt-4 font-display text-6xl sm:text-8xl lg:text-[9rem]">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg text-white/75">{subtitle}</p>
        {children}
      </div>
    </section>
  );
}
