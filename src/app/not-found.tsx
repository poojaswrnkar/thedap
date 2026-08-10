import { Compass, Home } from "lucide-react";
import { MagneticButton } from "@/components/ui/Button";
import { Aurora, GridPattern } from "@/components/ui/Aurora";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[80svh] items-center justify-center overflow-hidden bg-paper-50 px-5 py-32">
      <Aurora />
      <GridPattern />

      <div className="relative z-10 text-center">
        <p className="font-display text-[clamp(5rem,18vw,11rem)] leading-none font-black text-gold-grad">
          404
        </p>
        <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">
          This route isn&apos;t on the map
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[0.95rem] text-ink-500">
          The page you were looking for has wandered off. Let&apos;s get you back to somewhere
          beautiful.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <MagneticButton href="/" variant="gold">
            <Home className="size-4" />
            Back Home
          </MagneticButton>
          <MagneticButton href="/#destinations" variant="glass">
            <Compass className="size-4" />
            Browse Destinations
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
