import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ConciergeBell } from "lucide-react";
import { services } from "@/data/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GridPattern } from "@/components/ui/Aurora";

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-paper-50 py-14 sm:py-24 lg:py-32">
      <GridPattern className="opacity-60" />

      <div className="relative z-10 mx-auto max-w-[1300px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="What We Offer"
          eyebrowIcon={<ConciergeBell className="size-3.5" />}
          titleGold="Our"
          titleAccent="Premium Services"
          subtitle="Comprehensive travel solutions tailored to make your journey seamless and memorable"
          className="mb-14"
        />

        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06} className="w-[72%] shrink-0 snap-start sm:w-auto">
              <Link
                href="/#contact"
                className="group ring-aurora glass relative flex h-full flex-col overflow-hidden rounded-4xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_34px_70px_-34px_rgba(0,0,0,0.95)]"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-112"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-charcoal-950 via-charcoal-950/45 to-charcoal-950/5 transition-opacity duration-500 group-hover:opacity-85" />

                  <span className="absolute top-4 right-4 font-display text-5xl font-black text-white/25 transition-all duration-500 group-hover:scale-110 group-hover:text-gold-300/70">
                    {s.n}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold text-ink-900 transition-colors duration-300 group-hover:text-gold-600">
                    {s.name}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[0.9rem] leading-relaxed text-ink-500">
                    {s.desc}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[0.76rem] font-bold tracking-[0.14em] text-gold-600 uppercase">
                    Book Now
                    <ArrowRight className="size-4 transition-transform duration-400 group-hover:translate-x-1.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
