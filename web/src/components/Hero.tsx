"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "@/lib/lang";
import { useSettings } from "@/lib/useSettings";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLang();
  const s = useSettings();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.22]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-24%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // admin overrides fall back to the built-in defaults
  const eyebrow = s?.heroEyebrow || t.hero.est;
  const tagline = s?.heroTagline || t.hero.tagline;
  const sub = s?.heroSub || t.hero.sub;
  const videoSrc = s?.heroVideo || "/videos/pulse-hero.mp4";
  const poster = s?.heroPoster || "/images/hero-poster.jpg";
  const mobileSrc = s?.heroPoster || "/images/hero-mobile.jpg"; // art-directed 9:16 for small screens

  return (
    <section ref={ref} id="top" className="relative flex h-[100svh] min-h-[600px] flex-col justify-end overflow-hidden">
      {/* cinematic product film background (poster = still, for load / reduced-data) */}
      <motion.div style={{ scale: mediaScale }} className="absolute inset-0">
        {/* mobile — art-directed vertical shot (fills portrait cleanly) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mobileSrc}
          alt=""
          aria-hidden
          className="kenburns h-full w-full object-cover object-center sm:hidden"
          style={{ filter: "contrast(1.04) brightness(0.95)" }}
        />
        {/* desktop — cinematic product film */}
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          key={videoSrc}
          className="hidden h-full w-full object-cover sm:block"
          style={{ filter: "contrast(1.07) saturate(0.95) brightness(0.97)" }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/10 to-ink/90" />

      <motion.div style={{ y: contentY, opacity: fade }} className="relative z-10 pb-[clamp(4rem,10vh,7rem)]">
        <div className="shell text-center text-paper-1">
          <p className="mb-5 font-body text-[13px] uppercase tracking-wide1 text-paper-1/85">{eyebrow}</p>

          <h1 className="display mx-auto max-w-4xl text-[clamp(2.5rem,9vw,5rem)] font-medium leading-[1.04] tracking-wide3">
            {tagline}
          </h1>

          <p className="mx-auto mt-6 max-w-prose2 text-[15px] tracking-wide2 text-paper-1/85">{sub}</p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#range" className="btn-solid">
              {t.hero.cta1}
            </a>
            <a href="#reveal" className="btn-line text-paper-1">
              {t.hero.cta2}
            </a>
          </div>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <svg width="34" height="18" viewBox="0 0 34 18" fill="none" className="animate-pulseDown">
          <path d="M2 2 L17 14 L32 2" stroke="#F5F2EB" strokeWidth="1.5" opacity="0.6" />
        </svg>
      </div>
    </section>
  );
}
