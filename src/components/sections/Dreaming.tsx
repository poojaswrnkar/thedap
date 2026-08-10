"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Check, Phone } from "lucide-react";
import { dreamingFeatures, dreamingSlides } from "@/data/home";
import { MagneticButton } from "@/components/ui/Button";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { Aurora } from "@/components/ui/Aurora";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Dreaming() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % dreamingSlides.length), 3800);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden bg-paper-100 py-14 sm:py-24 lg:py-32">
      <Aurora className="opacity-60" />

      <div className="relative z-10 mx-auto grid max-w-[1300px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.12] font-bold tracking-[-0.02em]">
            <RevealWords text="Dreaming of Your" />{" "}
            <RevealWords text="Next Destination?" delay={0.12} className="text-gold-grad" />
          </h2>

          <ul className="mt-8 flex flex-col gap-3">
            {dreamingFeatures.map((f, i) => (
              <Reveal key={f} delay={0.12 + i * 0.08} as="li">
                <div className="group glass flex items-center gap-3.5 rounded-2xl px-4 py-3 transition-all duration-400 hover:translate-x-1.5 hover:border-gold-400/35">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-gold-300 to-gold-500 text-ink-900">
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  <span className="text-[0.95rem] font-medium text-ink-700">{f}</span>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.45} className="mt-9">
            <MagneticButton href={site.contact.phoneHref} variant="gold">
              <Phone className="size-4" />
              Explore More
            </MagneticButton>
          </Reveal>
        </div>

        {/* Stacked card slider */}
        <div className="relative">
          <div className="relative mx-auto aspect-4/5 w-full max-w-[26rem]">
            <div className="absolute inset-6 rounded-[3rem] bg-brand-500/25 blur-[80px]" />

            <AnimatePresence mode="popLayout">
              {dreamingSlides.map((s, i) => {
                const offset = (i - active + dreamingSlides.length) % dreamingSlides.length;
                if (offset > 2) return null;
                return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, scale: 0.86, y: 40 }}
                    animate={{
                      opacity: offset === 0 ? 1 : 0.55 - offset * 0.16,
                      scale: 1 - offset * 0.07,
                      y: offset * 26,
                      x: offset * 16,
                      rotate: offset * 3.5,
                      zIndex: 10 - offset,
                    }}
                    exit={{ opacity: 0, scale: 0.86, y: -40 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 overflow-hidden rounded-[2.5rem] border-4 border-white shadow-[0_36px_80px_-40px_rgba(30,27,23,0.4)]"
                  >
                    <Image
                      src={s.image}
                      alt={s.alt}
                      fill
                      sizes="(max-width: 1024px) 88vw, 26rem"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-charcoal-950/85 via-transparent to-transparent" />
                    <span className="absolute bottom-6 left-6 font-display text-2xl font-extrabold text-white">
                      {s.label}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="mt-7 flex justify-center gap-2">
            {dreamingSlides.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setActive(i)}
                aria-label={`Show ${s.label} destination`}
                aria-current={i === active}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  i === active ? "w-8 bg-gold-400" : "w-4 bg-ink-900/15 hover:bg-ink-900/25",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
