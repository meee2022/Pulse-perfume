"use client";

import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import Logo from "./Logo";
import { useCart } from "@/lib/store";
import { useLang } from "@/lib/lang";

const LINKS = [
  { href: "#range", key: "range" },
  { href: "#reveal", key: "unbox" },
  { href: "#story", key: "promise" },
  { href: "#contact", key: "contact" },
] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [atHero, setAtHero] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const count = useCart((s) => s.count());
  const openCart = useCart((s) => s.open);
  const { t } = useLang();

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setAtHero(y < window.innerHeight - 90);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = atHero && !open;
  const fg = light ? "text-paper-1" : "text-ink";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background,backdrop-filter] duration-500 ${
          scrolled && !light ? "bg-paper-1/85 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <nav className="shell flex h-[70px] items-center justify-between">
          <a href="#top" aria-label="PULSE" className="shrink-0">
            <Logo tone={light ? "light" : "dark"} height={38} />
          </a>

          <div className={`hidden items-center gap-9 md:flex ${fg}`}>
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="ulink opacity-90 hover:opacity-100">
                {t.nav[l.key]}
              </a>
            ))}
          </div>

          <div className={`flex items-center gap-4 ${fg}`}>
            <button onClick={openCart} className="relative transition-opacity hover:opacity-70" aria-label={t.nav.openCart}>
              <ShoppingBag size={19} strokeWidth={1.5} />
              {mounted && count > 0 && (
                <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-olive px-1 font-display text-[10px] text-paper-1">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex flex-col gap-[5px] md:hidden"
              aria-label={t.nav.menu}
            >
              <span className={`h-px w-6 bg-current transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`h-px w-6 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`h-px w-6 bg-current transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* mobile menu overlay */}
      <div
        className={`fixed inset-0 z-30 flex flex-col items-center justify-center gap-8 bg-paper-1 transition-opacity duration-500 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="ulink font-display text-2xl tracking-wide2 text-ink"
          >
            {t.nav[l.key]}
          </a>
        ))}
      </div>
    </>
  );
}
