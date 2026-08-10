"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { heroSlides } from "@/data/home";
import SplashCursor from "@/components/effects/SplashCursor";

const AUTOPLAY_MS = 7000;

/**
 * Editorial hero: one full-bleed photograph under a slow cinematic drift,
 * an oversized destination name, a single line of copy and one text link.
 * Everything else was deliberately stripped out — on a hero, the photograph
 * and the name are the message; chips, badges and duplicate CTAs only
 * compete with them.
 */
export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => {
    setIndex((next + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  const slide = heroSlides[index];

  return (
    <section
      id="home"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-charcoal-950"
    >
      {/* ---------- Full-bleed photograph ---------- */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06 }}
            transition={{
              opacity: { duration: 1.4, ease: "easeInOut" },
              scale: { duration: 11, ease: "linear" },
            }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Scrim: just enough to hold the type, not enough to mute the photo */}
        <div className="absolute inset-0 bg-linear-to-t from-charcoal-950 via-charcoal-950/45 to-charcoal-950/35" />
      </div>

      {/* Ambient gold fluid trail — decorative only, gated to precise pointers */}
      <SplashCursor
        RAINBOW_MODE={false}
        COLOR="#f4c42d"
        DENSITY_DISSIPATION={4.2}
        VELOCITY_DISSIPATION={2.5}
        SPLAT_RADIUS={0.18}
        SPLAT_FORCE={4200}
        CURL={2}
        SHADING={false}
      />

      {/* ---------- Centred name + one line + one link ---------- */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1300px] flex-1 flex-col items-center justify-center px-5 pt-28 text-center sm:px-8">
        <AnimatePresence mode="wait">
          <motion.div key={slide.id} className="flex flex-col items-center">
            <h1 className="overflow-hidden py-1">
              <motion.span
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                exit={{ y: "-112%" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="block font-display text-[clamp(3.6rem,13vw,10rem)] leading-[0.86] font-black tracking-[-0.035em] text-white drop-shadow-[0_10px_60px_rgba(0,0,0,0.55)]"
              >
                {slide.bigName}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="mt-5 max-w-md text-[1.02rem] font-light tracking-wide text-slate-200/85 sm:text-[1.15rem]"
            >
              {slide.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-9"
            >
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-2.5 border-b border-white/30 pb-1.5 text-[0.8rem] font-semibold tracking-[0.16em] text-white uppercase transition-colors duration-400 hover:border-gold-400 hover:text-gold-300"
              >
                Plan your journey
                <ArrowRight className="size-4 transition-transform duration-400 group-hover:translate-x-1.5" />
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ---------- One control: slim progress lines + counter ---------- */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1300px] items-center justify-between gap-6 px-5 pb-10 sm:px-8">
        <div className="flex items-center gap-2.5">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i)}
              aria-label={`Go to ${s.alt}`}
              aria-current={i === index}
              className="relative h-px overflow-hidden bg-white/25 transition-all duration-500"
              style={{ width: i === index ? 64 : 26 }}
            >
              {i === index && (
                <motion.span
                  key={`${index}-${paused}`}
                  className="absolute inset-y-0 left-0 bg-gold-400"
                  initial={{ width: "0%" }}
                  animate={{ width: paused ? "35%" : "100%" }}
                  transition={{ duration: paused ? 0.3 : AUTOPLAY_MS / 1000, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-baseline gap-1 text-[0.78rem] tracking-[0.14em] text-slate-400 tabular-nums">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={index}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="inline-block font-semibold text-white"
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
          <span>/ {String(heroSlides.length).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}
