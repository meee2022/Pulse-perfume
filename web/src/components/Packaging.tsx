"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import { useLang } from "@/lib/lang";

export default function Packaging() {
  const { t } = useLang();
  return (
    <section className="bg-paper-2 py-24 md:py-32">
      <div className="shell grid items-center gap-12 md:grid-cols-2">
        <Reveal className="order-2 md:order-1">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_10px_50px_rgba(38,37,33,0.12)]">
            <Image src="/images/boxes.png" alt={t.packaging.title} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
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
