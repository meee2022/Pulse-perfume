"use client";

import { Instagram, Send, Music2 } from "lucide-react";
import Logo from "./Logo";
import { useCart } from "@/lib/store";
import { useLang } from "@/lib/lang";

export default function Footer() {
  const openCart = useCart((s) => s.open);
  const { t } = useLang();

  return (
    <footer id="contact" className="bg-ink text-paper-1">
      <div className="shell py-20">
        <div className="grid gap-14 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo tone="light" height={30} />
            <p className="mt-6 max-w-xs text-[13px] leading-relaxed text-paper-1/55">{t.hero.est}</p>
            <button onClick={openCart} className="btn-olive mt-8">
              {t.footer.cta}
            </button>
          </div>

          <div>
            <h4 className="label text-paper-1/45">{t.footer.explore}</h4>
            <ul className="mt-5 space-y-3 text-[14px] text-paper-1/75">
              {t.footer.links.map(([l, h]) => (
                <li key={l}>
                  <a href={h} className="ulink">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label text-paper-1/45">{t.footer.follow}</h4>
            <div className="mt-5 flex gap-3">
              {[Instagram, Music2, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social"
                  className="grid h-11 w-11 place-items-center rounded-full border border-paper-1/20 text-paper-1/80 transition-colors hover:border-olive hover:text-olive"
                >
                  <Icon size={17} strokeWidth={1.5} />
                </a>
              ))}
            </div>
            <p className="mt-6 whitespace-pre-line text-[12.5px] leading-relaxed text-paper-1/45">{t.footer.ship}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-paper-1/10 pt-8 text-[12px] text-paper-1/45 md:flex-row">
          <span>{t.footer.copy}</span>
          <span className="font-display uppercase tracking-wide2">{t.footer.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
