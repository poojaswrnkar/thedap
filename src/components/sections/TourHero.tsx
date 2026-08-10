"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Phone } from "lucide-react";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import type { Tour } from "@/data/tours";
import { site } from "@/data/site";
import { MagneticButton } from "@/components/ui/Button";
import { Reveal, RevealWords } from "@/components/ui/Reveal";

export default function TourHero({ hero }: { hero: Tour["hero"] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);

  return (
    <section
      ref={ref}
      className="grain-dark relative flex min-h-[92svh] items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-10">
        {hero.video ? (
          <BackgroundVideo src={hero.video} poster={hero.poster} />
        ) : (
          <Image src={hero.poster} alt="" fill priority sizes="100vw" className="object-cover" />
        )}
      </motion.div>

      <div className="absolute inset-0 -z-10 bg-linear-to-b from-charcoal-950/88 via-charcoal-950/62 to-charcoal-950" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_55%_at_50%_45%,transparent,rgba(21,18,14,0.85))]" />

      <motion.div style={{ opacity }} className="relative z-10 mx-auto max-w-3xl px-5 pt-24 text-center sm:px-8">
        <h1 className="text-[clamp(2.3rem,5.6vw,4.4rem)] leading-[1.08] font-bold tracking-[-0.02em] drop-shadow-[0_6px_30px_rgba(0,0,0,0.5)]">
          {hero.titleLines.map((line, i) => (
            <span key={line} className="block">
              <RevealWords text={line} delay={i * 0.08} className="text-white" />
            </span>
          ))}
          <RevealWords text={hero.highlight} delay={0.2} className="text-gold-grad-dark" />
        </h1>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-6 max-w-xl text-[1.02rem] text-slate-300/85">{hero.subtitle}</p>
        </Reveal>

        <Reveal delay={0.4} className="mt-9 flex justify-center">
          <MagneticButton href={site.contact.phoneHref} variant="gold">
            <Phone className="size-4" />
            Contact Us Today
          </MagneticButton>
        </Reveal>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute inset-x-0 bottom-8 flex justify-center">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-11 w-7 items-start justify-center rounded-full border border-white/25 p-1.5"
        >
          <span className="size-1.5 rounded-full bg-gold-400" />
        </motion.div>
      </div>
    </section>
  );
}
