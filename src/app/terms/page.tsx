import type { Metadata } from "next";
import {
  BadgeInfo,
  CalendarClock,
  Check,
  CreditCard,
  FileText,
  Mail,
  Phone,
  ScrollText,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import {
  cancellationSteps,
  cancellationTiers,
  invoiceGuidelines,
  paymentSteps,
  privacyBlocks,
  termsContact,
} from "@/data/terms";
import { MagneticButton } from "@/components/ui/Button";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { Aurora, GridPattern } from "@/components/ui/Aurora";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Reservation, payment, cancellation and privacy terms for booking your journey with Next Trip Expedition.",
  alternates: { canonical: "/terms" },
};

const toneStyles = {
  emerald: "from-emerald-400/16 to-transparent border-emerald-500/30 text-emerald-700",
  gold: "from-gold-400/18 to-transparent border-gold-500/30 text-gold-700",
  orange: "from-orange-400/16 to-transparent border-orange-500/30 text-orange-700",
  rose: "from-rose-400/16 to-transparent border-rose-500/30 text-rose-700",
} as const;

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="grain relative overflow-hidden bg-paper-50 pt-36 pb-20 sm:pt-44">
        <Aurora />
        <GridPattern />

        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Reveal>
            <span className="eyebrow mb-5">
              <ScrollText className="size-3.5" />
              Travel Policy
            </span>
          </Reveal>

          <h1 className="text-[clamp(2.1rem,4.6vw,3.5rem)] leading-[1.12] font-bold tracking-[-0.02em]">
            <RevealWords text="Terms and" />{" "}
            <RevealWords text="Conditions" delay={0.12} className="text-gold-grad" />
          </h1>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-[1rem] text-ink-500">
              Everything you need to know before booking your journey with Next Trip Expedition
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-9 flex flex-wrap justify-center gap-3">
            <MagneticButton href={`tel:${termsContact.phone}`} variant="gold">
              <Phone className="size-4" />
              {termsContact.phone}
            </MagneticButton>
            <MagneticButton href={`mailto:${termsContact.email}`} variant="glass">
              <Mail className="size-4" />
              Email Inquiry
            </MagneticButton>
          </Reveal>
        </div>
      </section>

      {/* Reservation */}
      <Block id="reservation" icon={<BadgeInfo className="size-3.5" />} eyebrow="Reservation" title="How to Make Your Tour Reservation" tone="dark">
        <div className="grid gap-5 lg:grid-cols-2">
          <Card title="Contact Us" icon={<Phone className="size-5" />}>
            <p className="text-ink-700">
              Reach out for personalized assistance with your booking:
            </p>
            <ul className="mt-4 flex flex-col gap-2 text-[0.9rem]">
              <li className="text-ink-700">
                <span className="font-semibold text-ink-900">Phone:</span>{" "}
                <a href={`tel:${termsContact.phone}`} className="text-gold-700 hover:underline">
                  {termsContact.phone}
                </a>
              </li>
              <li className="text-ink-700">
                <span className="font-semibold text-ink-900">Email:</span>{" "}
                <a href={`mailto:${termsContact.email}`} className="text-gold-700 hover:underline">
                  {termsContact.email}
                </a>
              </li>
              <li className="text-ink-700">
                <span className="font-semibold text-ink-900">Hours:</span> {termsContact.hours}
              </li>
            </ul>
          </Card>

          <Card title="Passport Requirement" icon={<FileText className="size-5" />} accent>
            <p className="text-ink-700">
              <strong className="text-gold-700">Important:</strong> A valid passport is required for
              all travelers. Your passport must be valid for a minimum of 6 months after your date of
              return.
            </p>
          </Card>
        </div>
      </Block>

      {/* Payment */}
      <Block id="payment" icon={<CreditCard className="size-3.5" />} eyebrow="Payment" title="Payment Terms" tone="alt">
        <div className="grid gap-5 lg:grid-cols-2">
          {paymentSteps.map((s) => (
            <Reveal key={s.n}>
              <div className="group glass ring-aurora relative h-full rounded-4xl p-7">
                <span className="absolute top-6 right-7 font-display text-6xl font-black text-ink-900/6">
                  {s.n}
                </span>
                <h3 className="text-xl font-bold text-ink-900">{s.title}</h3>
                <p className="mt-2 text-[0.92rem] text-ink-500">{s.desc}</p>
                <p className="mt-5 font-display text-2xl font-extrabold text-gold-grad">{s.amount}</p>
                {"footnote" in s && s.footnote && (
                  <p className="mt-1 text-[0.76rem] text-ink-500">{s.footnote}</p>
                )}
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.methods.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-gold-500/25 bg-gold-100/70 px-3 py-1.5 text-[0.74rem] font-medium text-gold-700"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-6 flex items-start gap-3 rounded-3xl border border-gold-500/30 bg-gold-100/60 p-5 text-[0.9rem] text-ink-700">
            <CalendarClock className="mt-0.5 size-5 shrink-0 text-gold-600" />
            <span>
              <strong className="text-gold-700">Pro Tip:</strong> Mark your calendar for the final
              payment date to avoid booking cancellation.
            </span>
          </p>
        </Reveal>
      </Block>

      {/* Cancellation */}
      <Block
        id="cancellation"
        icon={<TriangleAlert className="size-3.5" />}
        eyebrow="Cancellation"
        title="Cancellation Policy"
        tone="dark"
      >
        <Reveal>
          <div className="rounded-4xl border border-rose-400/25 bg-rose-500/8 p-6 sm:p-7">
            <h3 className="flex items-center gap-2.5 text-lg font-bold text-rose-700">
              <TriangleAlert className="size-5" />
              Important Liability Notice
            </h3>
            <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-700">
              In the event of cancellation, you are solely responsible for any/all penalties imposed
              by the travel provider, tour operator, air carrier, hotel, etc. In the event of a delay
              and you cannot reach the destination, you will be solely responsible for all costs
              relating to the continuation of your trip. This might include air transportation,
              ground transportation, and hotel accommodations. In the event of total cancellation,
              you will be responsible for all penalties imposed by the travel provider.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Card title="How to Cancel" icon={<ScrollText className="size-5" />} className="mt-5">
            <ul className="flex flex-col gap-2.5">
              {cancellationSteps.map((s) => (
                <li key={s} className="flex items-start gap-3 text-[0.92rem] text-ink-700">
                  <Check className="mt-1 size-4 shrink-0 text-gold-600" strokeWidth={3} />
                  {s}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>

        <div className="mt-10">
          <Reveal>
            <h3 className="text-xl font-bold text-ink-900">Cancellation Penalties</h3>
            <p className="mt-2 text-[0.92rem] text-ink-500">
              Penalties are calculated based on when we receive your written cancellation notice:
            </p>
          </Reveal>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cancellationTiers.map((t, i) => (
              <Reveal key={t.label} delay={i * 0.08}>
                <div
                  className={cn(
                    "h-full rounded-4xl border bg-linear-to-b p-6 transition-transform duration-500 hover:-translate-y-1.5",
                    toneStyles[t.tone],
                  )}
                >
                  <span className="text-[0.7rem] font-bold tracking-[0.14em] uppercase">
                    {t.label}
                  </span>
                  <div className="mt-4 font-display text-4xl font-black text-ink-900">{t.percent}</div>
                  <div className="mt-1 text-[0.78rem] text-ink-500">{t.of}</div>
                  <div className="mt-4 border-t border-ink-900/10 pt-3 text-[0.82rem] font-medium text-ink-700">
                    {t.window}
                  </div>
                  <div className="mt-1.5 text-[0.76rem] text-ink-500">{t.note}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Block>

      {/* Invoice */}
      <Block id="invoice" icon={<FileText className="size-3.5" />} eyebrow="Invoice" title="Invoice Guidelines" tone="alt">
        <Reveal>
          <Card title="Please Review Your Invoice Carefully" icon={<FileText className="size-5" />}>
            <ul className="flex flex-col gap-2.5">
              {invoiceGuidelines.map((g) => (
                <li key={g} className="flex items-start gap-3 text-[0.92rem] text-ink-700">
                  <Check className="mt-1 size-4 shrink-0 text-gold-600" strokeWidth={3} />
                  {g}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </Block>

      {/* Privacy */}
      <Block id="privacy" icon={<ShieldCheck className="size-3.5" />} eyebrow="Privacy" title="Privacy Policy" tone="dark">
        <div className="grid gap-5 lg:grid-cols-3">
          {privacyBlocks.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08}>
              <Card title={b.title} icon={<ShieldCheck className="size-5" />} className="h-full">
                <p className="text-[0.92rem] leading-relaxed text-ink-700">{b.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-8 rounded-4xl border border-ink-900/10 bg-ink-900/[0.02] p-6 sm:p-7">
            <h3 className="text-lg font-bold text-ink-900">Changes to Terms & Privacy Policy</h3>
            <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-700">
              Next Trip Expedition reserves the right to change, amend, or update our policy/terms &
              conditions from time to time without prior notice to affiliates.
            </p>
            <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-700">
              We recommend reviewing this page periodically. Continued use of our services after
              updates constitutes acceptance of revised terms.
            </p>
          </div>
        </Reveal>
      </Block>

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-paper-50 py-24">
        <Aurora className="opacity-60" />
        <div className="relative z-10 mx-auto max-w-2xl px-5 text-center sm:px-8">
          <h2 className="text-[clamp(1.8rem,4.5vw,3rem)] font-extrabold">
            Ready to Explore?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[0.98rem] text-ink-500">
            Have questions about these terms? Our travel specialists are ready to help you plan your
            perfect journey.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <MagneticButton href={`tel:${termsContact.phone}`} variant="gold">
              <Phone className="size-4" />
              Call Now
            </MagneticButton>
            <MagneticButton href={`mailto:${termsContact.email}`} variant="glass">
              <Mail className="size-4" />
              Email Inquiry
            </MagneticButton>
          </div>
          <p className="mt-6 text-[0.82rem] text-ink-500">
            Average response time: Under 2 hours during business hours
          </p>
        </div>
      </section>
    </>
  );
}

function Block({
  id,
  icon,
  eyebrow,
  title,
  tone,
  children,
}: {
  id: string;
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  tone: "dark" | "alt";
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-20 sm:py-24",
        tone === "dark" ? "bg-paper-50" : "bg-paper-100",
      )}
    >
      <div className="relative z-10 mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <span className="eyebrow mb-3">
            {icon}
            {eyebrow}
          </span>
        </Reveal>
        <h2 className="mb-9 text-[clamp(1.6rem,3.6vw,2.6rem)] font-extrabold">
          <RevealWords text={title} />
        </h2>
        {children}
      </div>
    </section>
  );
}

function Card({
  title,
  icon,
  children,
  accent,
  className,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass h-full rounded-4xl p-6 sm:p-7",
        accent && "border-gold-400/25 bg-gold-400/6",
        className,
      )}
    >
      <h3 className="mb-4 flex items-center gap-3 text-lg font-bold text-ink-900">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-ink-900 text-gold-300">
          {icon}
        </span>
        {title}
      </h3>
      {children}
    </div>
  );
}
