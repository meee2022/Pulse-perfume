"use client";

import Reveal from "./Reveal";
import { useLang } from "@/lib/lang";

// Cinematic collection film (generated from the real product photography).
export default function Unboxing() {
  const { t } = useLang();
  return (
    <section id="reveal" className="bg-paper-1 py-24 md:py-32">
      <div className="shell">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="label mb-4">{t.unbox.eyebrow}</p>
          <h2 className="display text-[clamp(1.9rem,6vw,3rem)] font-medium tracking-wide3 text-ink">{t.hero.tagline}</h2>
          <p className="mx-auto mt-4 max-w-prose2 text-[15px] leading-relaxed text-olive-deep">{t.hero.sub}</p>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative overflow-hidden rounded-[20px] shadow-[0_30px_80px_-40px_rgba(38,37,33,0.5)]">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              className="aspect-video w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/collection-poster.jpg"
            >
              <source src="/videos/collection.mp4" type="video/mp4" />
            </video>
            {/* subtle vignette for depth */}
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(38,37,33,0.18)]" />
          </div>
        </Reveal>

        <Reveal delay={220} className="mt-10 text-center">
          <a href="#range" className="btn-solid">
            {t.hero.cta1}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
