"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import { useLang } from "@/lib/lang";

// single-bottle campaign shots — approved bottle designs (colorway caps, black logos, white on INTENSE)
const GALLERY = [
  { src: "/images/pack-green.jpg", name: "MOTION", accent: "#B8BCA6" },
  { src: "/images/pack-blue.jpg", name: "ACTIVE", accent: "#A9BBD0" },
  { src: "/images/pack-grey.jpg", name: "PERFORMANCE", accent: "#D2D4D7" },
  { src: "/images/pack-black.jpg", name: "INTENSE", accent: "#8FD3E0" },
];

export default function Packaging() {
  const { t } = useLang();
  return (
    <section className="bg-paper-2 py-24 md:py-32">
      <div className="shell grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <Reveal className="order-2 md:order-1">
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {GALLERY.map((g, i) => (
              <div
                key={g.name}
                className={`group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_10px_40px_-24px_rgba(38,37,33,0.5)] ${
                  i % 2 === 1 ? "translate-y-4 md:translate-y-8" : ""
                }`}
              >
                <Image
                  src={g.src}
                  alt={g.name}
                  fill
                  sizes="(max-width:768px) 50vw, 280px"
                  className="object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <span
                  className="absolute bottom-4 left-4 font-display text-[12px] font-medium uppercase tracking-wide2 text-paper-1"
                  style={{ textShadow: "0 1px 12px rgba(0,0,0,0.5)" }}
                >
                  {g.name}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="order-1 md:order-2">
          <p className="label mb-5">{t.packaging.eyebrow}</p>
          <h2 className="display text-[clamp(1.9rem,6vw,3rem)] font-medium tracking-wide3 text-ink">{t.packaging.title}</h2>
          <p className="mt-6 max-w-prose2 text-[15px] leading-[1.9] text-olive-deep">{t.packaging.body}</p>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7">
            {t.packaging.specs.map(([k, v]) => (
              <div key={k}>
                <dt className="font-display text-[10px] uppercase tracking-wide1 text-olive">{k}</dt>
                <dd className="mt-1.5 text-[14px] text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
