"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Info, Rocket } from "lucide-react";
import { about } from "@/data/home";
import { MagneticButton } from "@/components/ui/Button";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { Aurora } from "@/components/ui/Aurora";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-paper-100 py-14 sm:py-24 lg:py-32"
    >
      <Aurora className="opacity-55" />

      <div className="relative z-10 mx-auto grid max-w-[1300px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Image */}
        <Reveal from="right" className="relative">
          <motion.div style={{ y: imgY }} className="relative">
            <div className="absolute inset-8 rounded-[40%] bg-brand-500/25 blur-[90px]" />
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-[3rem] border border-ink-900/10">
              <Image
                src={about.image}
                alt={about.alt}
                fill
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-charcoal-950/55 to-transparent" />
            </div>

            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="glass-strong animate-float absolute -right-2 bottom-8 rounded-3xl px-6 py-5 shadow-2xl sm:-right-6"
            >
              <div className="font-display text-4xl font-black text-gold-grad">10+</div>
              <div className="mt-1 text-[0.72rem] leading-tight font-semibold tracking-[0.14em] text-ink-500 uppercase">
                Years of
                <br />
                Excellence
              </div>
            </motion.div>
          </motion.div>
        </Reveal>

        {/* Text */}
        <div>
          <Reveal>
            <span className="eyebrow mb-4">
              <Info className="size-3.5" />
              {about.label}
            </span>
          </Reveal>

          <h2 className="text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.12] font-bold tracking-[-0.02em]">
            <RevealWords text={about.title[0]} />{" "}
            <RevealWords text={about.title[1]} delay={0.1} className="text-gold-grad" />
            <br />
            <RevealWords text={about.title[2]} delay={0.18} className="text-gold-grad" />
          </h2>

          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.2 + i * 0.08}>
              <p className="mt-5 text-[0.98rem] leading-relaxed text-ink-700">{p}</p>
            </Reveal>
          ))}

          <Reveal delay={0.4} className="mt-10">
            <MagneticButton href="/#contact" variant="gold">
              <Rocket className="size-4" />
              Start Your Journey
            </MagneticButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
