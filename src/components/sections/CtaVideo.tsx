"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Phone } from "lucide-react";
import { ctaBanner } from "@/data/home";
import { site } from "@/data/site";
import { MagneticButton } from "@/components/ui/Button";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { RevealWords, Reveal } from "@/components/ui/Reveal";

export default function CtaVideo() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.15]);

  return (
    <section
      ref={ref}
      className="grain relative flex min-h-[26rem] items-center justify-center overflow-hidden py-16 sm:min-h-[32rem] sm:py-28"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-10">
        <BackgroundVideo src={ctaBanner.video} poster="/assets/image/travel-poster.jpg" />
      </motion.div>

      <div className="absolute inset-0 -z-10 bg-linear-to-b from-charcoal-950/92 via-charcoal-950/72 to-charcoal-950/95" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,transparent,rgba(21,18,14,0.8))]" />

      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-8">
        <h2 className="text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.12] font-bold tracking-[-0.02em] text-white">
          <RevealWords text={ctaBanner.title[0]} />{" "}
          <RevealWords text={ctaBanner.title[1]} delay={0.16} className="text-gold-grad-dark" />
        </h2>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-[1rem] text-slate-300/85">{ctaBanner.sub}</p>
        </Reveal>

        <Reveal delay={0.3} className="mt-9 flex justify-center">
          <MagneticButton href={site.contact.phoneHref} variant="gold">
            <Phone className="size-4" />
            Contact Us Today
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
