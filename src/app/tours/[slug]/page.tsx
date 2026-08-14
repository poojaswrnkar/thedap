import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTour, tours } from "@/data/tours";
import TourHero from "@/components/sections/TourHero";
import TourIntro from "@/components/sections/TourIntro";
import TourCities from "@/components/sections/TourCities";
import TourItinerary from "@/components/sections/TourItinerary";
import Contact from "@/components/sections/Contact";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) return {};

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

export default async function TourPage({ params }: Params) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  return (
    <>
      <TourHero hero={tour.hero} />
      <TourIntro intro={tour.intro} />
      <TourCities section={tour.citiesSection} cities={tour.cities} />
      <TourItinerary days={tour.itinerary} />
      <Contact />
    </>
  );
}
