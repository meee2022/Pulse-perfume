"use client";

import { useLang } from "@/lib/lang";

// Editorial marquee strip — the promise points glide by like a luxury ticker.
export default function Benefits() {
  const { t } = useLang();
  const items = [t.benefits.clothes, t.benefits.odors, t.benefits.travel, t.benefits.mist, t.benefits.lasting];

  const Row = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center">
      {items.map((b, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap font-body text-[11px] font-medium uppercase tracking-wide2 text-olive-deep">
            {b.t}
          </span>
          {/* pulse-dot separator */}
          <span className="mx-8 inline-block h-1 w-1 rounded-full bg-olive/50" />
        </span>
      ))}
    </div>
  );

  return (
    <section className="overflow-hidden border-y border-ink/5 bg-paper-2">
      <div className="flex py-7 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee flex">
          <Row />
          <Row ariaHidden />
        </div>
      </div>
    </section>
  );
}
