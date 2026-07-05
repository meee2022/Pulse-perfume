"use client";

import Reveal from "./Reveal";
import { useLang } from "@/lib/lang";

export default function Benefits() {
  const { t } = useLang();
  const items = [t.benefits.clothes, t.benefits.odors, t.benefits.travel, t.benefits.mist, t.benefits.lasting];

  return (
    <section className="bg-paper-2">
      <div className="shell flex flex-wrap items-center justify-center gap-x-10 gap-y-4 py-8">
        {items.map((b, i) => (
          <Reveal key={i} delay={i * 70}>
            <span className="font-display text-[11px] uppercase tracking-wide2 text-olive-deep">{b.t}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
