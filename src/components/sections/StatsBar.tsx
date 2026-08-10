import { Award, MapPin, Star, Users } from "lucide-react";
import { companyStats } from "@/data/home";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

const icons = { users: Users, pin: MapPin, star: Star, award: Award } as const;

export default function StatsBar() {
  return (
    <section className="relative bg-paper-50 py-16 sm:py-20">
      <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-y-10 px-5 sm:px-8 lg:grid-cols-4">
        {companyStats.map((s, i) => {
          const Icon = icons[s.icon as keyof typeof icons];
          return (
            <Reveal key={s.label} delay={i * 0.08} className="flex flex-col items-center text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-linear-to-br from-gold-300 to-gold-500 text-ink-900 shadow-[0_10px_30px_-10px_rgba(166,124,7,0.55)]">
                <Icon className="size-6" />
              </span>
              <Counter value={s.num} className="mt-4 text-3xl sm:text-4xl" />
              <span className="mt-1.5 text-[0.82rem] font-medium text-ink-500">{s.label}</span>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
