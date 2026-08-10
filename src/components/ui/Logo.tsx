import { cn } from "@/lib/utils";

/**
 * A small solid gold mark (not a hollow ring) plus a wordmark, replacing the
 * original illustrated oval crest with something simpler and more premium.
 * `tone="light"` is for sitting directly on a dark photo (pre-scroll hero);
 * `tone="dark"` is for the frosted/light nav and the dark footer alike —
 * the wordmark just needs to read against whatever's actually behind it.
 */
export function Logo({
  tone = "dark",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const wordmark = tone === "light" ? "text-white" : "text-ink-900";
  const sub = tone === "light" ? "text-gold-200" : "text-gold-600";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 40 40" className="size-9 shrink-0 sm:size-10" aria-hidden>
        <circle cx="20" cy="20" r="19" fill="url(#logo-gold)" />
        <path
          d="M20 10.5 L23 18 L30 20 L23 22 L20 29.5 L17 22 L10 20 L17 18 Z"
          fill="var(--color-ink-900)"
          fillOpacity="0.92"
        />
        <defs>
          <linearGradient id="logo-gold" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffe9a3" />
            <stop offset="55%" stopColor="#f4c42d" />
            <stop offset="100%" stopColor="#b8860b" />
          </linearGradient>
        </defs>
      </svg>

      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-[1.05rem] font-bold tracking-tight sm:text-[1.15rem]", wordmark)}>
          Next Trip
        </span>
        <span className={cn("mt-0.5 text-[0.6rem] font-semibold tracking-[0.28em] uppercase", sub)}>
          Expedition
        </span>
      </span>
    </span>
  );
}
