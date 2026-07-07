"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { SIZES, type Product } from "@/lib/products";
import { useProducts } from "@/lib/useProducts";
import { useCart } from "@/lib/store";
import { useLang } from "@/lib/lang";
import Reveal from "./Reveal";

// cinematic environmental campaign shots (per colorway)
const ENV: Record<string, string> = {
  green: "/images/env-motion.jpg",
  blue: "/images/env-active.jpg",
  grey: "/images/env-performance.jpg",
  black: "/images/env-intense.jpg",
};
const ACCENT: Record<string, string> = { green: "#B8BCA6", blue: "#A9BBD0", grey: "#D2D4D7", black: "#8FD3E0" };
const COLORNAME: Record<string, string> = { green: "Dusty Green", blue: "Dusty Blue", grey: "Dusty Grey", black: "Matte Black" };
// cinematic 3ML tester campaign shot per colorway (vial in a premium scene, name engraved on the label)
const TESTER: Record<string, string> = {
  green: "/images/tester-scene-green.jpg",
  blue: "/images/tester-scene-blue.jpg",
  grey: "/images/tester-scene-grey.jpg",
  black: "/images/tester-scene-black.jpg",
};

function ScentRow({ p, index }: { p: Product; index: number }) {
  const add = useCart((s) => s.add);
  const { t, money } = useLang();
  const [size, setSize] = useState(SIZES[0].id);
  const price = Math.round(p.price * (SIZES.find((s) => s.id === size)?.multiplier ?? 1));
  const isTester = size === "3ml";

  return (
    <Reveal delay={index * 90}>
      <article className="group overflow-hidden rounded-[26px] bg-paper-1 shadow-[0_16px_60px_-30px_rgba(38,37,33,0.5)]">
        {/* cinematic campaign image — swaps to the separated 3ML tester vial when the tester size is selected */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
          <Image
            src={(isTester ? TESTER[p.colorway] : ENV[p.colorway]) ?? p.card}
            alt={isTester ? `${p.name} — 3ML tester` : p.name}
            fill
            sizes="(max-width:1200px) 100vw, 1120px"
            className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.04]"
            priority={index === 0}
          />
          {isTester && (
            <span className="absolute right-6 top-5 z-10 rounded-full bg-paper-1/10 px-3 py-1 font-display text-[10px] uppercase tracking-wide2 text-paper-1/85 backdrop-blur-sm">
              3 ML · Tester
            </span>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/5" />
          <span className="absolute left-6 top-5 font-display text-[11px] tracking-wide1 text-paper-1/60">0{index + 1}</span>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-10">
            <div>
              <span className="mb-2 block font-display text-[10.5px] uppercase tracking-wide1" style={{ color: ACCENT[p.colorway] }}>
                {COLORNAME[p.colorway]}
              </span>
              <h3 className="font-display text-[30px] font-medium uppercase leading-none tracking-wide3 text-paper-1 md:text-[46px]">
                {p.name}
              </h3>
              <p className="mt-2 text-[13px] italic text-paper-1/70">{p.meaning}</p>
            </div>
            <span className="shrink-0 font-display text-[16px] tracking-wide2 text-paper-1 md:text-[19px]">{money(price)}</span>
          </div>
        </div>

        {/* details bar */}
        <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:px-10 md:py-7">
          <dl className="flex flex-wrap gap-x-8 gap-y-2 text-[12.5px] text-olive-deep">
            {(["top", "heart", "base"] as const).map((k) => (
              <div key={k} className="flex items-baseline gap-2">
                <dt className="font-display text-[10px] uppercase tracking-wide2 text-ink/35">{t.notes[k]}</dt>
                <dd>{p.notes[k]}</dd>
              </div>
            ))}
          </dl>

          <div className="flex items-center gap-3">
            <div className="flex rounded-full bg-paper-2 p-1">
              {SIZES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSize(s.id)}
                  className={`rounded-full px-3.5 py-1.5 font-display text-[10.5px] uppercase tracking-wide2 transition-colors ${
                    size === s.id ? "bg-ink text-paper-1" : "text-olive-deep"
                  }`}
                >
                  {s.id === "100ml" ? "100" : "3ml"}
                </button>
              ))}
            </div>
            <button onClick={() => add(p.id, size)} className="btn-solid !px-7 !py-3.5">
              <Plus size={14} /> {t.notes.add}
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function ThreeScents() {
  const { t } = useLang();
  const products = useProducts();

  return (
    <section id="range" className="bg-paper-2 py-24 md:py-32">
      <div className="shell">
        <Reveal className="mb-14 max-w-2xl md:mb-20">
          <div className="mb-5 flex items-center gap-4">
            <span className="label">{t.range.eyebrow}</span>
            <span className="h-px w-16 bg-ink/15" />
            <span className="font-display text-[11px] tracking-wide1 text-olive/60">01 — 04</span>
          </div>
          <h2 className="display text-[clamp(2rem,7vw,3.4rem)] font-medium leading-[1.05] tracking-wide3 text-ink">
            {t.range.title}
          </h2>
          <p className="mt-5 max-w-prose2 text-[15px] leading-relaxed text-olive-deep">{t.range.sub}</p>
        </Reveal>

        <div className="space-y-10 md:space-y-16">
          {products.map((p, i) => (
            <ScentRow key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
