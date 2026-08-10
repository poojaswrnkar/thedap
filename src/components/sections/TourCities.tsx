import Image from "next/image";
import { ArrowRight, Check, Building2 } from "lucide-react";
import type { Tour } from "@/data/tours";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export default function TourCities({
  section,
  cities,
}: {
  section: Tour["citiesSection"];
  cities: Tour["cities"];
}) {
  return (
    <section className="relative overflow-hidden bg-paper-50 py-14 sm:py-24 lg:py-32">
      <div className="relative z-10 mx-auto max-w-[1300px] px-5 sm:px-8">
        <SectionHeading
          eyebrow={section.label}
          eyebrowIcon={<Building2 className="size-3.5" />}
          titleGold={section.titleGold}
          titleAccent={section.titleBlue}
          subtitle={section.subtitle}
          className="mb-16"
        />

        <div className="flex flex-col gap-6">
          {cities.map((c, i) => (
            <Reveal key={c.name} delay={0.05}>
              <article
                className={cn(
                  "group glass ring-aurora grid items-stretch overflow-hidden rounded-4xl transition-shadow duration-500 hover:shadow-[0_34px_80px_-40px_rgba(30,27,23,0.4)] lg:grid-cols-2",
                  i % 2 === 1 && "lg:[&>figure]:order-2",
                )}
              >
                <figure className="relative h-64 overflow-hidden lg:h-auto lg:min-h-[22rem]">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-charcoal-950/70 via-transparent to-transparent" />
                  <span className="absolute top-5 left-5 rounded-full bg-gold-400 px-3 py-1.5 text-[0.68rem] font-bold tracking-[0.12em] text-ink-900 uppercase">
                    {c.kicker}
                  </span>
                </figure>

                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <h3 className="text-3xl font-extrabold text-ink-900 sm:text-4xl">{c.name}</h3>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-700">{c.desc}</p>

                  <ul className="mt-6 flex flex-wrap gap-2.5">
                    {c.highlights.map((h) => (
                      <li
                        key={h}
                        className="inline-flex items-center gap-2 rounded-full border border-ink-900/12 bg-ink-900/[0.03] px-3.5 py-1.5 text-[0.78rem] font-medium text-ink-700"
                      >
                        <Check className="size-3.5 text-gold-600" strokeWidth={3} />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="/#contact"
                    className="mt-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-gold-500/40 px-6 py-3 text-[0.74rem] font-bold tracking-[0.12em] text-gold-600 uppercase transition-all duration-400 hover:bg-gold-400 hover:text-ink-900"
                  >
                    Explore {c.name}
                    <ArrowRight className="size-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
