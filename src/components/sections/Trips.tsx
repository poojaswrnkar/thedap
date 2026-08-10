"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  Bus,
  CalendarCheck,
  Car,
  Clock,
  Heart,
  Landmark,
  Mountain,
  MoveRight,
  PersonStanding,
  Plane,
  RefreshCw,
  Route as RouteIcon,
  Sparkles,
  Sun,
  TrainFront,
} from "lucide-react";
import { tripTabs, type Trip } from "@/data/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const tabIcons = { dragon: Sparkles, mountain: Mountain, om: Landmark } as const;
const typeIcons = {
  plane: Plane,
  car: Car,
  bus: Bus,
  train: TrainFront,
  hiking: PersonStanding,
} as const;
const metaIcons = {
  clock: Clock,
  calendar: CalendarCheck,
  rotate: RefreshCw,
  mountain: Mountain,
  sun: Sun,
  road: RouteIcon,
  plane: Plane,
  landmark: Landmark,
} as const;

export default function Trips({
  heading = { eyebrow: "Routes & Packages", gold: "Popular", accent: "Trips" },
  subtitle = "Handpicked journeys crafted for seamless travel and unforgettable moments.",
}: {
  heading?: { eyebrow: string; gold: string; accent: string };
  subtitle?: string;
}) {
  const [active, setActive] = useState(tripTabs[0].id);
  const panel = tripTabs.find((t) => t.id === active) ?? tripTabs[0];

  return (
    <section id="trips" className="relative overflow-hidden bg-paper-50 py-14 sm:py-24 lg:py-32">
      <div className="relative z-10 mx-auto max-w-[1300px] px-5 sm:px-8">
        <SectionHeading
          eyebrow={heading.eyebrow}
          eyebrowIcon={<RouteIcon className="size-3.5" />}
          titleGold={heading.gold}
          titleAccent={heading.accent}
          subtitle={subtitle}
          className="mb-10"
        />

        {/* Tab bar */}
        <div
          role="tablist"
          aria-label="Trip categories"
          className="glass mx-auto mb-10 flex w-fit max-w-full gap-1 overflow-x-auto rounded-full p-1.5 no-scrollbar"
        >
          {tripTabs.map((t) => {
            const Icon = tabIcons[t.icon];
            const isActive = t.id === active;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(t.id)}
                className={cn(
                  "relative shrink-0 rounded-full px-5 py-2.5 text-[0.8rem] font-semibold whitespace-nowrap transition-colors duration-300",
                  isActive ? "text-ink-900" : "text-ink-500 hover:text-ink-900",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="trip-tab-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-linear-to-r from-gold-300 to-gold-500"
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-2">
                  <Icon className="size-3.5" />
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Panels */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            role="tabpanel"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4"
          >
            {panel.trips.map((trip, i) => (
              <TripCard key={`${active}-${i}`} trip={trip} index={i} tabId={panel.id} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function TripCard({ trip, index, tabId }: { trip: Trip; index: number; tabId: string }) {
  const [saved, setSaved] = useState(false);
  const TypeIcon = typeIcons[trip.typeIcon];
  // Each tab lines up with a real tour page (its id is the tour slug), which
  // has the full day-by-day itinerary — much more useful than the contact form.
  const itineraryHref = `/tours/${tabId}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group ring-aurora glass flex w-[72%] shrink-0 snap-start flex-col rounded-4xl p-5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(30,27,23,0.35)] sm:w-auto"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/25 bg-brand-50 px-2.5 py-1 text-[0.66rem] font-bold tracking-[0.1em] text-brand-600 uppercase">
          <TypeIcon className="size-3" />
          {trip.type}
        </span>
        <button
          type="button"
          aria-label={`${saved ? "Unsave" : "Save"} trip`}
          aria-pressed={saved}
          onClick={() => setSaved((v) => !v)}
          className="flex size-8 items-center justify-center rounded-full border border-ink-900/12 text-ink-500 transition-all duration-300 hover:scale-110 hover:border-rose-400/50 hover:text-rose-400"
        >
          <Heart className={cn("size-3.5", saved && "fill-rose-500 text-rose-500")} />
        </button>
      </div>

      {/* Route */}
      <div className="my-6 flex items-center justify-between gap-2">
        <CityNode city={trip.from.city} image={trip.from.image} />

        <div className="relative flex flex-1 items-center justify-center">
          <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-linear-to-r from-transparent via-gold-400/45 to-transparent" />
          <MoveRight className="relative z-10 size-5 text-gold-400 transition-transform duration-500 group-hover:translate-x-1.5" />
        </div>

        <CityNode city={trip.to.city} image={trip.to.image} />
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink-900/8 pt-4 text-[0.74rem] text-ink-500">
        {trip.meta.map((m) => {
          const Icon = metaIcons[m.icon as keyof typeof metaIcons] ?? Clock;
          return (
            <span key={m.label} className="inline-flex items-center gap-1.5">
              <Icon className="size-3.5 text-brand-400" />
              {m.label}
            </span>
          );
        })}
      </div>

      <Link
        href={itineraryHref}
        className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-gold-500/40 py-2.5 text-[0.72rem] font-bold tracking-[0.12em] text-gold-600 uppercase transition-all duration-300 hover:bg-gold-400 hover:text-ink-900"
      >
        View Itinerary
        <ArrowRight className="size-3.5" />
      </Link>
    </motion.article>
  );
}

function CityNode({ city, image }: { city: string; image: string }) {
  return (
    <div className="flex w-[5.5rem] flex-col items-center gap-2 text-center">
      <div className="relative size-16 overflow-hidden rounded-2xl border border-ink-900/12">
        <Image
          src={image}
          alt={city}
          fill
          sizes="64px"
          className="object-cover transition-transform duration-700 group-hover:scale-115"
        />
      </div>
      <span className="text-[0.78rem] leading-tight font-semibold text-ink-900">{city}</span>
    </div>
  );
}
