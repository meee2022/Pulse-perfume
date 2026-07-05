"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { REVEAL, productById } from "@/lib/products";
import { useCart } from "@/lib/store";
import { useLang } from "@/lib/lang";
import Logo from "./Logo";

// Geometry mirrors the original brand site: the bottle hangs from the stage
// centre (top:50%), sits BEHIND the tube, and a paper-coloured mask below the
// tube hides its base — so it reads as rising out of the tube.
// NOTE: framer writes `transform`, which overrides Tailwind's -translate-x-1/2,
// so horizontal centring is done inside the motion style via x: "-50%".
export default function Unboxing() {
  const ref = useRef<HTMLElement>(null);
  const { t, money } = useLang();
  const add = useCart((s) => s.add);
  const hero = productById("dulce-de-cuerpo"); // blue colorway matches the cutouts
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const logoOpacity = useTransform(p, [0, 0.12], [1, 0]);
  const logoScale = useTransform(p, [0, 0.12], [1, 0.6]);

  const boxOpacity = useTransform(p, [0.1, 0.24], [0, 1]);
  const boxScale = useTransform(p, [0.1, 0.24], [0.9, 1]);

  // rise in px (predictable) — enough to emerge from the tube, not fly off it
  const perfumeY = useTransform(p, [0.28, 0.66], ["0%", "-100%"]);
  const perfumeOpacity = useTransform(p, [0.26, 0.4], [0, 1]);

  const capOpacity = useTransform(p, [0.72, 0.88], [0, 1]);
  const capY = useTransform(p, [0.72, 0.88], [20, 0]);
  const hintOpacity = useTransform(p, [0, 0.12], [0.5, 0]);

  return (
    <section id="reveal" ref={ref} className="relative h-[300vh] bg-paper-1">
      <div className="sticky top-0 h-[100svh] min-h-[600px] overflow-hidden">
        {/* intro logo */}
        <motion.div
          style={{ opacity: logoOpacity, scale: logoScale }}
          className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
        >
          <Logo tone="dark" height={64} />
        </motion.div>

        {/* stage: sits low so the risen bottle lands near centre */}
        <div className="absolute left-1/2 top-[56%] z-10 w-[min(84vw,430px)] -translate-x-1/2 -translate-y-1/2">
          {/* bottle hangs from stage centre, behind the tube */}
          <motion.img
            src={REVEAL.perfume}
            alt=""
            style={{ x: "-50%", y: perfumeY, opacity: perfumeOpacity }}
            className="absolute left-[50%] top-1/2 z-10 w-[70%] select-none drop-shadow-[0_18px_34px_rgba(38,37,33,0.22)]"
            draggable={false}
          />
          {/* tube in front + paper mask below it (matches bg, hides the bottle's base) */}
          <motion.div style={{ opacity: boxOpacity, scale: boxScale }} className="relative z-20">
            <img src={REVEAL.box} alt="" className="relative z-20 w-full select-none drop-shadow-[0_22px_44px_rgba(38,37,33,0.2)]" draggable={false} />
            <div className="absolute inset-x-[-44px] top-[99%] z-10 h-[200vh] bg-paper-1" />
          </motion.div>
        </div>

        {/* caption resolves at the end */}
        <motion.div style={{ opacity: capOpacity, y: capY }} className="absolute inset-x-0 bottom-[9%] z-30 px-6 text-center">
          <p className="label mb-3">{t.unbox.eyebrow}</p>
          <h2 className="display text-[clamp(1.6rem,6vw,2.4rem)] font-medium tracking-wide3 text-ink">{hero?.name}</h2>
          <p className="mt-2 text-[13px] italic text-olive-deep">{hero?.meaning}</p>
          {hero && (
            <button onClick={() => add(hero.id, "100ml")} className="btn-solid mt-6">
              {t.unbox.cta} · {money(hero.price)}
            </button>
          )}
        </motion.div>

        {/* scroll hint */}
        <motion.div style={{ opacity: hintOpacity }} className="absolute inset-x-0 bottom-12 z-20 text-center font-display text-[10px] uppercase tracking-label text-olive">
          Scroll to reveal
        </motion.div>
      </div>
    </section>
  );
}
