"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { CalendarRange, ChevronLeft, ChevronRight } from "lucide-react";
import type { Day } from "@/data/tours";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Aurora } from "@/components/ui/Aurora";

/** Drag/scroll-snap rail of day cards, replacing the original arrow slider. */
export default function TourItinerary({ days }: { days: Day[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft > max - 8 });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  function scrollBy(dir: number) {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("article");
    const step = card ? card.clientWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <section className="relative overflow-hidden bg-paper-100 py-14 sm:py-24 lg:py-32">
      <Aurora className="opacity-50" />

      <div className="relative z-10">
        <div className="mx-auto max-w-[1300px] px-5 sm:px-8">
          <SectionHeading
            eyebrow="Explore"
            eyebrowIcon={<CalendarRange className="size-3.5" />}
            titleGold="Dream"
            titleAccent="Destinations"
            subtitle="Day by day, here's how your journey unfolds."
            align="left"
            className="mb-10"
          />
        </div>

        <div
          ref={rail}
          onScroll={update}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8"
          style={{ scrollPaddingLeft: "1.25rem" }}
        >
          {days.map((d, i) => (
            <motion.article
              key={`${d.day}-${i}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group ring-aurora glass w-[19rem] shrink-0 snap-start overflow-hidden rounded-4xl transition-shadow duration-500 hover:shadow-[0_30px_70px_-34px_rgba(30,27,23,0.35)] sm:w-[21rem]"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={d.image}
                  alt={d.title}
                  fill
                  sizes="21rem"
                  className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-112"
                />
                <div className="absolute inset-0 bg-linear-to-t from-charcoal-950 via-charcoal-950/25 to-transparent" />

                <span className="absolute top-4 left-4 rounded-full bg-linear-to-r from-gold-300 to-gold-500 px-3 py-1.5 text-[0.68rem] font-bold tracking-[0.14em] text-ink-900 uppercase">
                  {d.day}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-ink-900 transition-colors duration-300 group-hover:text-gold-600">
                  {d.title}
                </h3>
                <p className="mt-2 text-[0.9rem] text-ink-700">{d.subtitle}</p>
                <p className="mt-3 inline-flex items-center gap-2 text-[0.78rem] text-gold-700">
                  <span className="size-1.5 rounded-full bg-gold-500" />
                  {d.note}
                </p>
              </div>
            </motion.article>
          ))}
          <div className="w-1 shrink-0" aria-hidden />
        </div>

        {/* Rail controls */}
        <div className="mx-auto mt-6 flex max-w-[1300px] items-center gap-5 px-5 sm:px-8">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-ink-900/10">
            <div
              className="h-full rounded-full bg-linear-to-r from-gold-300 to-gold-500 transition-[width] duration-150"
              style={{ width: `${Math.max(8, progress * 100)}%` }}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scrollBy(-1)}
              disabled={edges.start}
              aria-label="Previous days"
              className="glass flex size-11 items-center justify-center rounded-full text-ink-800 transition-all duration-300 hover:border-gold-500/50 hover:text-gold-600 disabled:opacity-35"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              disabled={edges.end}
              aria-label="Next days"
              className="glass flex size-11 items-center justify-center rounded-full text-ink-800 transition-all duration-300 hover:border-gold-500/50 hover:text-gold-600 disabled:opacity-35"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
