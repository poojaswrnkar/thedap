"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  Bike,
  Flower2,
  Gem,
  Landmark,
  MapPinned,
  PartyPopper,
  PawPrint,
  Footprints,
  Plane,
  Sparkles,
} from "lucide-react";
import { tripPrograms, type ProgramGroup, type TripProgram } from "@/data/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Aurora } from "@/components/ui/Aurora";
import { cn } from "@/lib/utils";

/* The client's brief marked these groups with emoji. They're carried over as
 * lucide icons instead — emoji render differently on every platform and read
 * as chat, not as a luxury operator's brochure. */
const groupIcons = {
  classic: Landmark,
  specialty: Sparkles,
  trekking: Footprints,
  aerial: Plane,
  pilgrimage: Flower2,
  wildlife: PawPrint,
  festival: PartyPopper,
  luxury: Gem,
  active: Bike,
} as const;

export default function Destinations() {
  const [active, setActive] = useState(tripPrograms[0].id);
  const program = tripPrograms.find((p) => p.id === active) ?? tripPrograms[0];

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
          subtitle="The journeys we run, by country — and a bespoke route to anywhere else."
          className="mb-10"
        />

        {/* Country switch. A rail on phones so four tabs never wrap to two rows. */}
        <Reveal>
          <div
            role="tablist"
            aria-label="Destinations"
            className="no-scrollbar -mx-5 mb-8 flex snap-x gap-2.5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
          >
            {tripPrograms.map((p) => {
              const selected = p.id === active;
              return (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`program-${p.id}`}
                  onClick={() => setActive(p.id)}
                  className={cn(
                    "shrink-0 snap-start rounded-full px-5 py-2.5 text-[0.8rem] font-bold tracking-[0.1em] uppercase transition-all duration-400",
                    selected
                      ? "bg-linear-to-r from-gold-300 to-gold-500 text-ink-900 shadow-[0_10px_30px_-12px_rgba(166,124,7,0.6)]"
                      : "glass text-ink-700 hover:border-gold-500/40 hover:text-gold-700",
                  )}
                >
                  {p.name}
                </button>
              );
            })}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={program.id}
            id={`program-${program.id}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProgramBanner program={program} />

            {program.groups && (
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {program.groups.map((group, i) => (
                  <GroupCard
                    key={group.label}
                    group={group}
                    // An odd number of groups would leave the last card stranded
                    // in a half-width column; let it run the full width instead.
                    wide={program.groups!.length % 2 === 1 && i === program.groups!.length - 1}
                  />
                ))}
              </div>
            )}

            {program.bespoke && <BespokeCard bespoke={program.bespoke} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/** The country's photograph, name and a way through to its full tour page. */
function ProgramBanner({ program }: { program: TripProgram }) {
  return (
    <div className="ring-aurora relative h-56 overflow-hidden rounded-4xl sm:h-64 lg:h-72">
      <Image
        src={program.image}
        alt={program.alt}
        fill
        sizes="(max-width: 1300px) 100vw, 1300px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-charcoal-950 via-charcoal-950/45 to-charcoal-950/10" />

      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-8">
        <div>
          <h3 className="font-display text-[clamp(1.9rem,4.5vw,3rem)] leading-none font-black tracking-[-0.03em] text-white">
            {program.name}
          </h3>
          <p className="mt-2.5 text-[0.92rem] font-light tracking-wide text-slate-200/85">
            {program.tagline}
          </p>
        </div>

        {program.href && (
          <Link
            href={program.href}
            className="group inline-flex items-center gap-2.5 border-b border-white/30 pb-1.5 text-[0.78rem] font-semibold tracking-[0.14em] text-white uppercase transition-colors duration-400 hover:border-gold-400 hover:text-gold-300"
          >
            View {program.name} tours
            <ArrowRight className="size-4 transition-transform duration-400 group-hover:translate-x-1.5" />
          </Link>
        )}
      </div>
    </div>
  );
}

function GroupCard({ group, wide }: { group: ProgramGroup; wide?: boolean }) {
  const Icon = groupIcons[group.icon];

  return (
    <article
      className={cn(
        "ring-aurora glass flex h-full flex-col rounded-4xl p-6",
        wide && "md:col-span-2",
      )}
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold-100/80 text-gold-700 ring-1 ring-gold-500/25">
          <Icon className="size-4" />
        </span>
        <h4 className="text-[1.02rem] leading-tight font-bold text-ink-900">{group.label}</h4>
      </div>

      <ul className="flex flex-1 flex-col gap-4">
        {group.items.map((item) => (
          <li key={item.title} className="border-t border-ink-900/8 pt-4 first:border-0 first:pt-0">
            <p className="text-[0.92rem] font-semibold text-ink-900">{item.title}</p>
            <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink-500">{item.desc}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}

/** Everywhere else: no menu, just an invitation to tell us where. */
function BespokeCard({
  bespoke,
}: {
  bespoke: NonNullable<TripProgram["bespoke"]>;
}) {
  return (
    <article className="ring-aurora glass mt-5 rounded-4xl p-7 text-center sm:p-12">
      <h4 className="mx-auto max-w-2xl text-[clamp(1.5rem,3.2vw,2.3rem)] leading-[1.15] font-bold tracking-[-0.02em] text-ink-900">
        Beyond South Asia,{" "}
        <span className="text-gold-grad">Every Journey is Uniquely Yours.</span>
      </h4>

      <p className="mt-6 text-[0.8rem] font-semibold tracking-[0.12em] text-gold-700 uppercase">
        {bespoke.intro}
      </p>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {bespoke.places.map((place) => (
          <span
            key={place}
            className="rounded-full border border-gold-500/25 bg-gold-100/60 px-3.5 py-1.5 text-[0.78rem] font-semibold text-gold-700"
          >
            {place}
          </span>
        ))}
      </div>

      <p className="mx-auto mt-6 max-w-2xl text-[0.95rem] leading-relaxed text-ink-500">
        {bespoke.body}
      </p>

      <div className="mt-8 flex justify-center">
        <MagneticButton href="/#contact" variant="gold">
          Plan your journey
          <ArrowRight className="size-4" />
        </MagneticButton>
      </div>
    </article>
  );
}
