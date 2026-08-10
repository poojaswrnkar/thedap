import { cn } from "@/lib/utils";

/**
 * A pure typographic wordmark — no badge, no icon. A hairline gold rule
 * stands in for the old crest, the way a boutique hotel letterhead uses a
 * single rule rather than a logomark. `tone="light"` is for sitting directly
 * on a dark photo (pre-scroll hero); `tone="dark"` is for the frosted/light
 * nav and the dark footer alike — the wordmark just needs to read against
 * whatever's actually behind it.
 */
export function Logo({
  tone = "dark",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const wordmark = tone === "light" ? "text-white" : "text-ink-900";
  const rule = tone === "light" ? "bg-gold-200" : "bg-gold-500";
  const sub = tone === "light" ? "text-gold-200" : "text-gold-600";

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span className={cn("h-8 w-px shrink-0 opacity-70 sm:h-9", rule)} aria-hidden />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.28rem] font-medium tracking-[-0.01em] italic sm:text-[1.42rem]",
            wordmark,
          )}
        >
          Next Trip
        </span>
        <span className={cn("mt-1 text-[0.62rem] font-semibold tracking-[0.34em] uppercase", sub)}>
          Expedition
        </span>
      </span>
    </span>
  );
}
