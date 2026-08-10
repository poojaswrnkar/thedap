import { Phone, Send, Sparkles } from "lucide-react";
import { whyUs } from "@/data/home";
import { site } from "@/data/site";
import { MagneticButton } from "@/components/ui/Button";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { Aurora } from "@/components/ui/Aurora";

export default function WhyUs() {
  return (
    <section className="grain-dark relative overflow-hidden bg-charcoal-950 py-14 sm:py-24 lg:py-32">
      <Aurora tone="dark" className="opacity-70" />

      <div className="relative z-10 mx-auto max-w-[1300px] px-5 sm:px-8">
        <Reveal>
          <span className="eyebrow-dark mb-5">
            <Sparkles className="size-3.5" />
            {whyUs.eyebrow}
          </span>
        </Reveal>

        <h2 className="max-w-2xl text-[clamp(2.2rem,5.4vw,4.2rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-white">
          <RevealWords text={whyUs.headline[0]} />
          <br />
          <RevealWords text={whyUs.headline[1]} delay={0.1} className="text-gold-grad-dark" />
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 sm:mt-16 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4">
          {whyUs.benefits.map((b, i) => (
            <Reveal key={b.title} delay={0.15 + i * 0.08}>
              <div className="border-t border-white/15 pt-5">
                <h3 className="text-lg font-bold text-white">{b.title}</h3>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-slate-400">{b.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.5} className="mt-14 flex flex-wrap gap-3">
          <MagneticButton href="/#contact" variant="gold">
            <Send className="size-4" />
            Plan My Trip — It&apos;s Free
          </MagneticButton>
          <MagneticButton href={site.contact.phoneHref} variant="glassDark">
            <Phone className="size-4" />
            Call Us
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
