import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal, RevealWords } from "./Reveal";

/**
 * Section headings: a small rule + eyebrow, then a display-weight title where
 * the second half carries the gold accent. Restrained on purpose — the imagery
 * does the selling, the type stays out of its way.
 */
export function SectionHeading({
  eyebrow,
  eyebrowIcon,
  titleGold,
  titleAccent,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  eyebrowIcon?: ReactNode;
  titleGold: string;
  titleAccent?: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative z-10 flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="eyebrow mb-5">
            <span className="h-px w-8 bg-gold-400/60" aria-hidden />
            {eyebrowIcon}
            {eyebrow}
          </span>
        </Reveal>
      )}

      <h2 className="max-w-4xl text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.12] font-bold tracking-[-0.02em]">
        <RevealWords text={titleGold} />
        {titleAccent && (
          <>
            {" "}
            <RevealWords text={titleAccent} delay={0.1} className="text-gold-grad" />
          </>
        )}
      </h2>

      {subtitle && (
        <Reveal delay={0.15}>
          <p
            className={cn(
              "mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-ink-500",
              align === "center" && "mx-auto",
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
