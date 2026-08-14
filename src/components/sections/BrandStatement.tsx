"use client";

import Image from "next/image";
import {
  motion,
  transform,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { brandStatement, type StatementBeat } from "@/data/home";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";

const { eyebrow, beats } = brandStatement;

/** Scroll each beat owns while the section is pinned, in svh. Raise it for a
 *  slower, more deliberate read; lower it to tighten the pacing. */
const SCROLL_PER_BEAT = 90;

/** Share of a beat's slice spent dissolving into the next (0–1). Wide on
 *  purpose — the dissolve is the effect, not a cut with a softened edge. */
const CROSSFADE = 0.5;

/** Share of a beat's slice the word takes to arrive, and to leave. Kept well
 *  clear of the boundary so two words are never on screen together. */
const COPY_FADE = 0.28;

/**
 * A statement section: five one-word imperatives, each held on its own
 * full-bleed photograph.
 *
 * On desktop the frame pins and the beats cross-dissolve under the scroll.
 * Phones read the same beats as a plain vertical sequence — a 450svh pinned
 * frame fights a phone's collapsing toolbar and its scroll inertia — and
 * anyone asking for reduced motion gets that same sequence, held still.
 */
export default function BrandStatement() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="why-we-travel" aria-label={eyebrow} className="relative bg-charcoal-950">
      {reduced ? (
        <StackedBeats animate={false} />
      ) : (
        <>
          <div className="lg:hidden">
            <StackedBeats animate />
          </div>
          <div className="hidden lg:block">
            <PinnedSequence />
          </div>
        </>
      )}
    </section>
  );
}

/* ============================================================
   PINNED — desktop
   ============================================================ */

function PinnedSequence() {
  const ref = useRef<HTMLDivElement>(null);
  // 0 → 1 across the whole pinned run: 0 as the frame locks to the top of the
  // viewport, 1 once the last beat has had its slice of scroll.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div
      ref={ref}
      className="relative"
      style={{ height: `${beats.length * SCROLL_PER_BEAT}svh` }}
    >
      <div className="grain-dark sticky top-0 h-svh overflow-hidden">
        {beats.map((beat, i) => (
          <PinnedBeat key={beat.word} beat={beat} index={i} progress={scrollYProgress} />
        ))}

        {/* Scrim: enough to hold the type, not enough to flatten the photograph. */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-charcoal-950/85 via-charcoal-950/30 to-charcoal-950/65" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_62%_58%_at_50%_50%,transparent,rgba(21,18,14,0.7))]" />

        <span className="eyebrow-dark absolute top-28 left-8 z-20 xl:left-14">
          <span className="h-px w-8 bg-gold-300/60" />
          {eyebrow}
        </span>

        <ProgressRail progress={scrollYProgress} />
      </div>
    </div>
  );
}

function PinnedBeat({
  beat,
  index,
  progress,
}: {
  beat: StatementBeat;
  index: number;
  progress: MotionValue<number>;
}) {
  const slice = 1 / beats.length;
  const image = imageRanges(index);
  const copy = copyRanges(index);

  const imageOpacity = useWindowValue(progress, image.input, image.output);
  const copyOpacity = useWindowValue(progress, copy.input, copy.output);
  const blur = useWindowValue(
    progress,
    copy.input,
    copy.output.map((on) => (1 - on) * 10),
  );

  // A slow push through the whole beat — the frame is never quite still.
  const scale = useWindowValue(
    progress,
    [(index - 0.5) * slice, (index + 1.5) * slice],
    [1.04, 1.16],
  );
  // Copy drifts against the push, a fraction of the distance.
  const y = useWindowValue(progress, [index * slice, (index + 1) * slice], [26, -26]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <>
      <motion.div style={{ opacity: imageOpacity, scale }} className="absolute inset-0 z-0">
        <BeatMedia beat={beat} />
      </motion.div>

      <motion.div
        style={{ opacity: copyOpacity, y, filter }}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center px-8 text-center"
      >
        <BeatCopy beat={beat} />
      </motion.div>
    </>
  );
}

/**
 * Each beat owns an equal slice of the pinned scroll. A beat fades in over the
 * boundary into its slice and then simply stays — later beats sit on top in
 * source order, so the incoming photograph covers the outgoing one rather than
 * both fading at once. Cross-fading two layers independently over a dark
 * ground dips the composite dark at the midpoint; covering does not.
 */
function imageRanges(index: number) {
  const slice = 1 / beats.length;
  const half = (slice * CROSSFADE) / 2;
  const enter = index * slice;

  // The opening beat is simply always there, underneath everything else.
  if (index === 0) return { input: [0, 1], output: [1, 1] };
  return { input: [enter - half, enter + half], output: [0, 1] };
}

/**
 * Copy, by contrast, stays strictly inside its own slice: the outgoing word
 * has cleared before the next one starts to arrive, so a dissolve is never
 * read through two overlapping headlines. That leaves a moment of nothing but
 * photograph between words, which is the part that feels cinematic.
 */
function copyRanges(index: number) {
  const slice = 1 / beats.length;
  const fade = slice * COPY_FADE;
  const enter = index * slice;
  const exit = (index + 1) * slice;

  if (index === 0) return { input: [exit - fade, exit], output: [1, 0] };
  if (index === beats.length - 1) return { input: [enter, enter + fade], output: [0, 1] };
  return { input: [enter, enter + fade, exit - fade, exit], output: [0, 1, 1, 0] };
}

/**
 * Maps the pinned progress through one of the ranges above.
 *
 * The value is set by hand rather than composed with `useTransform`, and that
 * is load-bearing: a purely scroll-derived accelerated property gets handed
 * off to a native ViewTimeline, which measures the animated element's own
 * travel through the viewport rather than the pinned container's progress.
 * The keyframes survive that handoff but the clock driving them does not, so
 * the outgoing word never reaches zero and ghosts over the next beat.
 */
function useWindowValue(progress: MotionValue<number>, input: number[], output: number[]) {
  const value = useMotionValue(transform(progress.get(), input, output));
  useMotionValueEvent(progress, "change", (p) => value.set(transform(p, input, output)));
  return value;
}

function ProgressRail({ progress }: { progress: MotionValue<number> }) {
  return (
    <div
      aria-hidden
      className="absolute top-1/2 right-8 z-20 flex -translate-y-1/2 flex-col items-end gap-3.5 xl:right-14"
    >
      {beats.map((beat, i) => (
        <Tick key={beat.word} index={i} progress={progress} />
      ))}
    </div>
  );
}

function Tick({ index, progress }: { index: number; progress: MotionValue<number> }) {
  // Ticks track the word, not the photograph — the photographs stack and stay.
  const { input, output } = copyRanges(index);
  const active = useWindowValue(progress, input, output);
  const opacity = useWindowValue(
    progress,
    input,
    output.map((on) => 0.28 + on * 0.72),
  );
  const scaleX = useWindowValue(
    progress,
    input,
    output.map((on) => 1 + on * 1.6),
  );
  const background = useTransform(active, [0, 1], ["#ffffff", "#f4c42d"]);

  return (
    <motion.span
      style={{ opacity, scaleX, background }}
      className="h-px w-6 origin-right rounded-full"
    />
  );
}

/* ============================================================
   STACKED — phones, and the reduced-motion fallback
   ============================================================ */

function StackedBeats({ animate }: { animate: boolean }) {
  return (
    <div className="relative">
      {beats.map((beat, i) => (
        <div
          key={beat.word}
          className="grain-dark relative flex min-h-[78svh] items-center justify-center overflow-hidden px-6 text-center"
        >
          <div className="absolute inset-0">
            <BeatMedia beat={beat} />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-charcoal-950/90 via-charcoal-950/35 to-charcoal-950/75" />

          {i === 0 && (
            <span className="eyebrow-dark absolute top-36 left-6 z-20 sm:top-28">
              <span className="h-px w-6 bg-gold-300/60" />
              {eyebrow}
            </span>
          )}

          {animate ? (
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 30, filter: "blur(9px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-18%" }}
              transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <BeatCopy beat={beat} />
            </motion.div>
          ) : (
            <div className="relative z-10">
              <BeatCopy beat={beat} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   SHARED
   ============================================================ */

function BeatCopy({ beat }: { beat: StatementBeat }) {
  return (
    <>
      <h2 className="font-display text-[clamp(3.2rem,13vw,10rem)] leading-[0.88] font-black tracking-[-0.045em] text-white drop-shadow-[0_12px_70px_rgba(0,0,0,0.55)]">
        {beat.word}
        <span className="text-gold-400">.</span>
      </h2>
      <p className="mx-auto mt-6 max-w-[22rem] text-[0.98rem] font-light tracking-wide text-slate-200/80 sm:max-w-[34rem] sm:text-[1.08rem]">
        {beat.line}
      </p>
    </>
  );
}

/**
 * Still photograph by default. A beat only upgrades to its video loop where
 * one can be afforded: never on a phone, never on Save-Data, and never on a
 * connection the browser reports as slower than 4g.
 */
function BeatMedia({ beat }: { beat: StatementBeat }) {
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    if (!beat.video) return;
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && conn.effectiveType !== "4g") return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    setPlayVideo(true);
  }, [beat.video]);

  if (beat.video && playVideo) {
    return <BackgroundVideo src={beat.video.src} poster={beat.video.poster} />;
  }

  return (
    <Image
      src={beat.image}
      alt={beat.alt}
      fill
      sizes="100vw"
      style={{ objectPosition: beat.focus }}
      className="object-cover"
    />
  );
}

/** False on the server and on first paint, so the markup hydrates cleanly. */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return reduced;
}
