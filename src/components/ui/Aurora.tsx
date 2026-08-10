import { cn } from "@/lib/utils";

/** Slow-drifting colour blooms that sit behind a section. Purely decorative. */
export function Aurora({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  if (tone === "dark") {
    return (
      <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
        <div className="animate-drift absolute -top-40 -left-32 h-[34rem] w-[34rem] rounded-full bg-brand-500/12 blur-[140px]" />
        <div
          className="animate-drift absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-gold-400/10 blur-[150px]"
          style={{ animationDelay: "-7s" }}
        />
        <div
          className="animate-drift absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-gold-500/8 blur-[140px]"
          style={{ animationDelay: "-14s" }}
        />
      </div>
    );
  }

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="animate-drift absolute -top-40 -left-32 h-[34rem] w-[34rem] rounded-full bg-brand-400/10 blur-[140px]" />
      <div
        className="animate-drift absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-gold-400/14 blur-[150px]"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="animate-drift absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-gold-300/12 blur-[140px]"
        style={{ animationDelay: "-14s" }}
      />
    </div>
  );
}

/** Faint dot-grid, used to give large areas some texture. */
export function GridPattern({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const dot = tone === "dark" ? "rgb(255 255 255 / 0.08)" : "rgb(30 27 23 / 0.07)";
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, ${dot} 1px, transparent 0)`,
        backgroundSize: "42px 42px",
        maskImage: "radial-gradient(ellipse 75% 60% at 50% 40%, #000 40%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 75% 60% at 50% 40%, #000 40%, transparent 100%)",
      }}
    />
  );
}
