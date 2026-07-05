"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { SIZES, type Product } from "@/lib/products";
import { useProducts } from "@/lib/useProducts";
import { useCart } from "@/lib/store";
import { useLang } from "@/lib/lang";
import Reveal from "./Reveal";

const BAR: Record<string, string> = { green: "bg-dust-green", blue: "bg-dust-blue", grey: "bg-dust-grey", black: "bg-ink" };

function ScentCard({ p, index }: { p: Product; index: number }) {
  const add = useCart((s) => s.add);
  const { t, money } = useLang();
  const [size, setSize] = useState(SIZES[0].id);
  const price = Math.round(p.price * (SIZES.find((s) => s.id === size)?.multiplier ?? 1));

  return (
    <Reveal delay={index * 120} className="group">
      <article className="overflow-hidden rounded-2xl bg-paper-1 shadow-[0_4px_28px_rgba(38,37,33,0.07)]">
        <div className={`h-[3px] w-full ${BAR[p.colorway]}`} />
        <div className="relative aspect-square overflow-hidden bg-paper-3">
          <Image
            src={p.card}
            alt={p.name}
            fill
            sizes="(max-width:768px) 100vw, 380px"
            className="kenburns object-cover"
            style={{ animationDelay: `${-index * 6}s` }}
          />
          <span className="absolute left-5 top-4 font-display text-[10px] tracking-wide1 text-olive/70">
            0{index + 1}
          </span>
        </div>

        <div className="p-6 md:p-7">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-[19px] font-medium uppercase tracking-wide3 text-ink">{p.name}</h3>
            <span className="shrink-0 font-display text-[15px] tracking-wide2 text-ink">{money(price)}</span>
          </div>
          <p className="mt-1 text-[13px] italic text-olive-deep">{p.meaning}</p>

          <dl className="mt-5 space-y-2 border-t border-ink/10 pt-5 text-[12.5px] text-olive-deep">
            {(["top", "heart", "base"] as const).map((k) => (
              <div key={k} className="flex gap-3">
                <dt className="w-14 shrink-0 font-display uppercase tracking-wide2 text-ink/35">{t.notes[k]}</dt>
                <dd className="leading-snug">{p.notes[k]}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex items-center gap-2">
            <div className="flex rounded-full bg-paper-2 p-1">
              {SIZES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSize(s.id)}
                  className={`rounded-full px-3 py-1.5 font-display text-[10.5px] uppercase tracking-wide2 transition-colors ${
                    size === s.id ? "bg-ink text-paper-1" : "text-olive-deep"
                  }`}
                >
                  {s.id === "100ml" ? "100" : "3ml"}
                </button>
              ))}
            </div>
            <button onClick={() => add(p.id, size)} className="btn-solid ml-auto !px-6 !py-3">
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
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <p className="label mb-4">{t.range.eyebrow}</p>
          <h2 className="display text-[clamp(1.9rem,6vw,2.8rem)] font-medium tracking-wide3 text-ink">{t.range.title}</h2>
          <p className="mx-auto mt-4 max-w-prose2 text-[15px] leading-relaxed text-olive-deep">{t.range.sub}</p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((p, i) => (
            <ScentCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
