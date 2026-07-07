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
      <article className="group overflow-hidden rounded-[24px] bg-paper-1 shadow-[0_16px_60px_-30px_rgba(38,37,33,0.5)]">
        {/* cinematic campaign image — both the 100ml scene and the 3ML tester are preloaded and cross-fade instantly on size change */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={ENV[p.colorway] ?? p.card}
            alt={p.name}
            fill
            sizes="(max-width:768px) 100vw, 560px"
            className={`object-cover transition-[transform,opacity] duration-[600ms] ease-out group-hover:scale-[1.04] ${isTester ? "opacity-0" : "opacity-100"}`}
            priority={index === 0}
          />
          <Image
            src={TESTER[p.colorway] ?? p.card}
            alt={`${p.name} — 3ML tester`}
            fill
            sizes="(max-width:768px) 100vw, 560px"
            className={`object-cover transition-[transform,opacity] duration-[600ms] ease-out group-hover:scale-[1.04] ${isTester ? "opacity-100" : "opacity-0"}`}
          />
          {isTester && (
            <span className="absolute right-2.5 top-2.5 z-10 rounded-full bg-paper-1/10 px-2 py-0.5 font-display text-[8px] uppercase tracking-wide2 text-paper-1/85 backdrop-blur-sm sm:right-4 sm:top-4 sm:px-3 sm:py-1 sm:text-[9.5px]">
              3 ML · Tester
            </span>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/5" />
          <span className="absolute left-3 top-2.5 font-display text-[10px] tracking-wide1 text-paper-1/60 sm:left-5 sm:top-4 sm:text-[11px]">0{index + 1}</span>
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-1 p-3 sm:flex-row sm:items-end sm:justify-between sm:gap-3 sm:p-5 md:p-7">
            <div className="min-w-0">
              <span className="mb-1 block font-body text-[8.5px] font-medium uppercase tracking-wide1 sm:mb-1.5 sm:text-[10px]" style={{ color: ACCENT[p.colorway] }}>
                {COLORNAME[p.colorway]}
              </span>
              <h3 className="font-display text-[16px] font-medium uppercase leading-none tracking-wide2 text-paper-1 sm:text-[24px] sm:tracking-wide3 md:text-[32px]">
                {p.name}
              </h3>
              <p className="mt-1 hidden text-[10.5px] italic text-paper-1/70 sm:mt-1.5 sm:block sm:text-[12.5px]">{p.meaning}</p>
            </div>
            <span className="shrink-0 font-body text-[11px] font-medium tracking-wide2 text-paper-1/90 sm:font-display sm:text-[15px] md:text-[17px]">{money(price)}</span>
          </div>
        </div>

        {/* details */}
        <div className="flex flex-col gap-3 p-3 sm:gap-5 sm:p-5 md:p-7">
          <dl className="hidden flex-wrap gap-x-6 gap-y-2 text-[12px] text-olive-deep sm:flex">
            {(["top", "heart", "base"] as const).map((k) => (
              <div key={k} className="flex items-baseline gap-2">
                <dt className="font-display text-[9.5px] uppercase tracking-wide2 text-ink/35">{t.notes[k]}</dt>
                <dd>{p.notes[k]}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <div className="flex self-start rounded-full bg-paper-2 p-1">
              {SIZES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSize(s.id)}
                  className={`rounded-full px-3 py-1.5 font-display text-[10.5px] uppercase tracking-wide2 transition-colors sm:px-3.5 ${
                    size === s.id ? "bg-ink text-paper-1" : "text-olive-deep"
                  }`}
                >
                  {s.id === "100ml" ? "100" : "3ml"}
                </button>
              ))}
            </div>
            <button onClick={() => add(p.id, size)} className="btn-solid w-full justify-center !px-5 !py-2.5 sm:w-auto sm:!px-6 sm:!py-3">
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
  const raw = useProducts();
  // lead with INTENSE (the black, premium/top-priced scent); keep the rest in order
  const products = [...raw].sort((a, b) => (b.colorway === "black" ? 1 : 0) - (a.colorway === "black" ? 1 : 0));

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

        {/* staggered two-column layout (kept on mobile too) — the right column drops down for a brick / editorial rhythm */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8">
          <div className="space-y-3 sm:space-y-6 md:space-y-8">
            {products.filter((_, i) => i % 2 === 0).map((p) => (
              <ScentRow key={p.id} p={p} index={products.indexOf(p)} />
            ))}
          </div>
          <div className="mt-8 space-y-3 sm:mt-12 sm:space-y-6 md:mt-16 md:space-y-8">
            {products.filter((_, i) => i % 2 === 1).map((p) => (
              <ScentRow key={p.id} p={p} index={products.indexOf(p)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
