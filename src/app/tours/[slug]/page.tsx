import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { getTour, tours } from "@/data/tours";
import { destinations } from "@/data/home";
import { site } from "@/data/site";
import TourHero from "@/components/sections/TourHero";
import TourIntro from "@/components/sections/TourIntro";
import TourCities from "@/components/sections/TourCities";
import TourItinerary from "@/components/sections/TourItinerary";
import Trips from "@/components/sections/Trips";
import Contact from "@/components/sections/Contact";
import { MagneticButton } from "@/components/ui/Button";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { Aurora } from "@/components/ui/Aurora";

type Params = { params: Promise<{ slug: string }> };

/** Destinations that are promoted on the homepage but have no full tour page yet. */
const previewSlugs = ["paris", "kedarnath"] as const;

export function generateStaticParams() {
  return [...tours.map((t) => ({ slug: t.slug })), ...previewSlugs.map((slug) => ({ slug }))];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTour(slug);
  if (tour) {
    return {
      title: tour.meta.title,
      description: tour.meta.description,
      alternates: { canonical: `/tours/${tour.slug}` },
      openGraph: {
        title: tour.meta.title,
        description: tour.meta.description,
        images: [{ url: tour.hero.poster }],
      },
    };
  }

  const dest = destinations.find((d) => d.slug === slug);
  if (!dest) return {};
  return {
    title: `${dest.name} Tours`,
    description: dest.desc,
    alternates: { canonical: `/tours/${dest.slug}` },
  };
}

export default async function TourPage({ params }: Params) {
  const { slug } = await params;
  const tour = getTour(slug);

  if (tour) {
    return (
      <>
        <TourHero hero={tour.hero} />
        <TourIntro intro={tour.intro} />
        <TourCities section={tour.citiesSection} cities={tour.cities} />
        <TourItinerary days={tour.itinerary} />
        <Trips
          heading={{
            eyebrow: tour.tripsIntro.label,
            gold: tour.tripsIntro.titleGold,
            accent: tour.tripsIntro.titleBlue,
          }}
          subtitle={tour.tripsIntro.subtitle}
        />
        <Contact />
      </>
    );
  }

  const dest = destinations.find((d) => d.slug === slug);
  if (!dest) notFound();

  return <DestinationPreview dest={dest} />;
}

/**
 * Paris and Kedarnath are linked from the homepage but the original site never
 * shipped pages for them (both returned 404). Rather than dead-end the visitor,
 * we show what we do have plus a direct route to the booking desk.
 */
function DestinationPreview({ dest }: { dest: (typeof destinations)[number] }) {
  return (
    <>
      <section className="grain relative flex min-h-[80svh] items-center overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 -z-10">
          <Image src={dest.image} alt={dest.alt} fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-charcoal-950/90 via-charcoal-950/70 to-charcoal-950" />

        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Reveal>
            <span className="eyebrow mb-5">{dest.region}</span>
          </Reveal>

          <h1 className="text-[clamp(2.6rem,7vw,5rem)] leading-[1.02] font-extrabold">
            <RevealWords text={dest.name} className="text-white" />
          </h1>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-[1.02rem] text-slate-300/85">{dest.desc}</p>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mx-auto mt-8 max-w-lg text-[0.92rem] text-slate-400">
              We build every {dest.name} itinerary around you — dates, pace, budget and interests.
              Tell us what you have in mind and we&apos;ll send a tailored plan.
            </p>
          </Reveal>

          <Reveal delay={0.4} className="mt-9 flex flex-wrap justify-center gap-3">
            <MagneticButton href={site.contact.phoneHref} variant="gold">
              <Phone className="size-4" />
              Call {site.contact.phoneIntl}
            </MagneticButton>
            <MagneticButton href="/#contact" variant="glassDark">
              <Mail className="size-4" />
              Request an Itinerary
            </MagneticButton>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-paper-100 py-20">
        <Aurora className="opacity-60" />
        <div className="relative z-10 mx-auto max-w-[1300px] px-5 sm:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {destinations
              .filter((d) => d.slug !== dest.slug)
              .slice(0, 3)
              .map((d, i) => (
                <Reveal key={d.slug} delay={i * 0.08}>
                  <a
                    href={d.href}
                    className="group glass block overflow-hidden rounded-4xl transition-all duration-500 hover:-translate-y-1.5"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={d.image}
                        alt={d.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-[1.1s] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-ink-900/75 to-transparent" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-ink-900 group-hover:text-gold-700">
                        {d.name}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-[0.85rem] text-ink-500">{d.desc}</p>
                    </div>
                  </a>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
