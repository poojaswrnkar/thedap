"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Flame, Heart, MapPinned, Mountain, Sparkles, Thermometer } from "lucide-react";
import { destinations, type Destination } from "@/data/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { Reveal } from "@/components/ui/Reveal";
import { Aurora } from "@/components/ui/Aurora";
import { cn } from "@/lib/utils";

/* One warm gold accent for the featured pick; every other badge reads as a
 * quiet charcoal chip — restraint over a rainbow of category colors. */
const badgeStyles = {
  featured: "bg-gold-400 text-ink-900",
  new: "glass-dark text-white",
  popular: "glass-dark text-white",
  spiritual: "glass-dark text-white",
} as const;

const badgeIcons = { featured: Sparkles, popular: Flame, spiritual: Sparkles, new: null } as const;
const statIcons = { mountain: Mountain, temp: Thermometer } as const;

export default function Destinations() {
  const featuredDest = destinations.find((d) => d.featured);
  const restDest = destinations.filter((d) => !d.featured);

  return (
    <section
      id="destinations"
      className="relative overflow-hidden bg-paper-100 py-14 sm:py-24 lg:py-32"
      aria-labelledby="destinations-title"
    >
      <Aurora className="opacity-70" />

      <div className="relative z-10 mx-auto max-w-[1300px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Where We Go"
          eyebrowIcon={<MapPinned className="size-3.5" />}
          titleGold="Our"
          titleAccent="Destinations"
          subtitle="Handcrafted journeys to the world's most breathtaking places."
          className="mb-14"
        />

        <div className="flex flex-col gap-5">
          {/* The lead destination gets full-width billing on every screen size. */}
          {featuredDest && (
            <Reveal>
              <DestinationCard d={featuredDest} featured />
            </Reveal>
          )}

          {/* The rest: a swipeable row on phones, a grid from tablet up — never a
              tall single-file stack, which is what made this section feel endless on mobile. */}
          <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
            {restDest.map((d, i) => (
              <Reveal
                key={d.slug}
                delay={i * 0.07}
                className="w-[70%] shrink-0 snap-start sm:w-auto"
              >
                <DestinationCard d={d} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DestinationCard({ d, featured }: { d: Destination; featured?: boolean }) {
  const [wished, setWished] = useState(false);
  const BadgeIcon = d.badge ? badgeIcons[d.badge.kind] : null;

  return (
    <TiltCard intensity={featured ? 5 : 8} className="group ring-aurora h-full rounded-4xl">
      <Link
        href={d.href}
        aria-label={`Explore ${d.name}`}
        className="glass relative flex h-full flex-col overflow-hidden rounded-4xl transition-shadow duration-500 hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)]"
      >
        {/* On the tall featured card the image absorbs the extra height, not the copy. */}
        <div className={cn("relative overflow-hidden", featured ? "h-64 sm:h-80 lg:h-96" : "h-52")}>
          <Image
            src={d.image}
            alt={d.alt}
            fill
            sizes={featured ? "(max-width: 1024px) 100vw, 55vw" : "(max-width: 640px) 100vw, 33vw"}
            className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-charcoal-950 via-charcoal-950/35 to-transparent" />

          {d.badge && (
            <span
              className={cn(
                "absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.68rem] font-bold tracking-wider uppercase",
                badgeStyles[d.badge.kind],
              )}
            >
              {BadgeIcon && <BadgeIcon className="size-3" />}
              {d.badge.label}
            </span>
          )}

          {d.stats && (
            <div className="absolute bottom-4 left-4 flex gap-2">
              {d.stats.map((s) => {
                const Icon = statIcons[s.icon as keyof typeof statIcons] ?? Mountain;
                return (
                  <span
                    key={s.label}
                    className="glass-dark inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-medium text-white"
                  >
                    <Icon className="size-3 text-gold-300" />
                    {s.label}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        <div className={cn("flex flex-col p-6", !featured && "flex-1")}>
          <div className="mb-3 flex items-start justify-between gap-3">
            <span className="rounded-full border border-gold-500/25 bg-gold-100/70 px-2.5 py-1 text-[0.66rem] font-semibold tracking-[0.14em] text-gold-700 uppercase">
              {d.region}
            </span>
            <button
              type="button"
              aria-label={`${wished ? "Remove" : "Add"} ${d.name} ${wished ? "from" : "to"} wishlist`}
              aria-pressed={wished}
              onClick={(e) => {
                e.preventDefault();
                setWished((v) => !v);
              }}
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-ink-900/12 text-ink-500 transition-all duration-300 hover:scale-110 hover:border-rose-400/50 hover:text-rose-400"
            >
              <motion.span animate={wished ? { scale: [1, 1.35, 1] } : {}} transition={{ duration: 0.35 }}>
                <Heart className={cn("size-4", wished && "fill-rose-500 text-rose-500")} />
              </motion.span>
            </button>
          </div>

          <h3
            className={cn(
              "font-extrabold text-ink-900 transition-colors duration-300 group-hover:text-gold-600",
              featured ? "text-3xl lg:text-4xl" : "text-2xl",
            )}
          >
            {d.name}
          </h3>

          <p className={cn("mt-2.5 text-[0.9rem] leading-relaxed text-ink-500", !featured && "flex-1")}>
            {d.desc}
          </p>

          <span className="mt-5 inline-flex items-center gap-2 text-[0.78rem] font-bold tracking-[0.12em] text-gold-600 uppercase">
            Discover
            <ArrowRight className="size-4 transition-transform duration-400 group-hover:translate-x-1.5" />
          </span>
        </div>
      </Link>
    </TiltCard>
  );
}
