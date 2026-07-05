"use client";

import Reveal from "./Reveal";
import { useLang } from "@/lib/lang";

export default function Promise() {
  const { t } = useLang();
  return (
    <section id="story" className="bg-paper-1 py-28 md:py-36">
      <div className="shell max-w-3xl text-center">
        <Reveal>
          <p className="label mb-8">{t.promise.eyebrow}</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="display text-[clamp(2rem,7vw,3.6rem)] font-medium leading-[1.08] tracking-wide3 text-ink">
            {t.promise.title}
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mt-8 max-w-prose2 text-[15px] leading-[1.9] text-olive-deep">{t.promise.body}</p>
        </Reveal>
        <Reveal delay={320}>
          <div className="mx-auto mt-12 h-px w-10 bg-olive" />
        </Reveal>
      </div>
    </section>
  );
}
