"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Star } from "lucide-react";
import { formatINR, packages } from "@/data/packages";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Aurora } from "@/components/ui/Aurora";

export default function Packages() {
  const rail = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
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
    <section id="packages" className="relative overflow-hidden bg-paper-50 py-14 sm:py-24 lg:py-32">
      <Aurora className="opacity-55" />

      <div className="relative z-10 mx-auto max-w-[1300px] px-5 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Handpicked & Priced"
            eyebrowIcon={<Sparkles className="size-3.5" />}
            titleGold="Popular"
            titleAccent="Packages"
            align="left"
          />
          <Link
            href="/#contact"
            className="group mb-1 inline-flex shrink-0 items-center gap-2 text-[0.8rem] font-bold tracking-[0.1em] text-gold-700 uppercase transition-colors hover:text-gold-600"
          >
            All Packages
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div
          ref={rail}
          onScroll={update}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
          style={{ scrollPaddingLeft: "0.25rem" }}
        >
          {packages.map((p, i) => (
            <PackageCard key={p.slug} pkg={p} index={i} />
          ))}
          <div className="w-1 shrink-0" aria-hidden />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={() => scrollBy(-1)}
            disabled={edges.start}
            aria-label="Previous packages"
            className="glass flex size-11 items-center justify-center rounded-full text-ink-800 transition-all duration-300 hover:border-gold-500/50 hover:text-gold-600 disabled:opacity-35"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            disabled={edges.end}
            aria-label="Next packages"
            className="glass flex size-11 items-center justify-center rounded-full text-ink-800 transition-all duration-300 hover:border-gold-500/50 hover:text-gold-600 disabled:opacity-35"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function PackageCard({ pkg, index }: { pkg: (typeof packages)[number]; index: number }) {
  const save = pkg.priceFrom - pkg.priceNow;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group ring-aurora glass w-[19.5rem] shrink-0 snap-start overflow-hidden rounded-4xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_34px_70px_-34px_rgba(30,27,23,0.4)] sm:w-[21rem]"
    >
      <Link href={pkg.href} aria-label={`View ${pkg.title} package`}>
        <div className="relative h-56 overflow-hidden">
          <Image
            src={pkg.image}
            alt={pkg.name}
            fill
            sizes="21rem"
            className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-charcoal-950/75 via-charcoal-950/10 to-transparent" />

          <span className="absolute top-4 left-4 rounded-full bg-linear-to-r from-gold-300 to-gold-500 px-3 py-1.5 text-[0.68rem] font-bold tracking-[0.1em] text-ink-900 uppercase shadow-sm">
            Save {formatINR(save)}
          </span>
          <span className="glass-dark absolute top-4 right-4 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.72rem] font-bold text-white">
            <Star className="size-3 fill-gold-300 text-gold-300" />
            {pkg.rating.toFixed(1)}
          </span>

          {/* Hover CTA overlay */}
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-400 group-hover:opacity-100">
            <span className="rounded-full bg-white px-5 py-2.5 text-[0.76rem] font-bold tracking-[0.08em] text-ink-900 uppercase shadow-lg">
              View Package
            </span>
          </span>

          <span className="absolute bottom-4 left-4 rounded-full border border-white/25 bg-charcoal-950/40 px-3 py-1 text-[0.68rem] font-semibold text-white backdrop-blur-sm">
            {pkg.duration}
          </span>
        </div>

        <div className="p-6">
          <span className="rounded-full border border-gold-500/25 bg-gold-100/70 px-2.5 py-1 text-[0.64rem] font-semibold tracking-[0.12em] text-gold-700 uppercase">
            {pkg.badge}
          </span>
          <h3 className="mt-3 text-xl font-bold text-ink-900 transition-colors duration-300 group-hover:text-gold-600">
            {pkg.title}
          </h3>
          <p className="mt-2 text-[0.87rem] leading-relaxed text-ink-500">{pkg.desc}</p>

          <div className="mt-4 flex items-baseline gap-2 border-t border-ink-900/8 pt-4">
            <span className="text-[0.85rem] text-ink-300 line-through">{formatINR(pkg.priceFrom)}</span>
            <span className="text-xl font-extrabold text-ink-900">{formatINR(pkg.priceNow)}</span>
            <span className="text-[0.78rem] text-ink-500">/person</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
