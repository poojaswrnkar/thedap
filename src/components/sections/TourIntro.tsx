import Image from "next/image";
import { MapPin } from "lucide-react";
import type { Tour } from "@/data/tours";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { Aurora } from "@/components/ui/Aurora";

export default function TourIntro({ intro }: { intro: Tour["intro"] }) {
  return (
    <section className="relative overflow-hidden bg-paper-100 py-14 sm:py-24 lg:py-32">
      <Aurora className="opacity-55" />

      <div className="relative z-10 mx-auto max-w-[1300px] px-5 sm:px-8">
        <div className="mb-14 text-center">
          <Reveal>
            <span className="eyebrow mb-4">
              <MapPin className="size-3.5" />
              {intro.label}
            </span>
          </Reveal>
          <h2 className="text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.12] font-bold tracking-[-0.02em]">
            <RevealWords text={intro.titleGold} />{" "}
            <RevealWords text={intro.titleBlue} delay={0.12} className="text-gold-grad" />
          </h2>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal from="right">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-[2.5rem] border border-ink-900/10">
              <Image
                src={intro.image}
                alt={intro.heading}
                fill
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-charcoal-950/55 to-transparent" />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h3 className="text-2xl font-bold text-ink-900 sm:text-3xl">{intro.heading}</h3>
            </Reveal>
            {intro.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className="mt-5 text-[0.96rem] leading-relaxed text-ink-700">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Stats band */}
        <div className="mt-14 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
          {intro.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="group glass rounded-3xl px-5 py-7 text-center transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-500/40">
                <div className="font-display text-3xl font-black text-gold-grad sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-2 text-[0.76rem] font-semibold tracking-[0.14em] text-ink-500 uppercase">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
