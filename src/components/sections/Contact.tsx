"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  TriangleAlert,
  X,
} from "lucide-react";
import { destinationOptions } from "@/data/home";
import { site } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Aurora } from "@/components/ui/Aurora";

type Status = { kind: "success" | "error"; message: string } | null;

const details = [
  {
    icon: Phone,
    title: "Phone",
    lines: [site.contact.phone],
    muted: site.contact.hours,
    href: site.contact.phoneHref,
  },
  { icon: MapPin, title: "Address", lines: [...site.contact.address] },
  { icon: Mail, title: "Email", lines: [site.contact.email], href: `mailto:${site.contact.email}` },
  { icon: Clock, title: "Working Hours", lines: [...site.contact.workingHours] },
];

const inputCls =
  "w-full rounded-2xl border border-ink-900/14 bg-white/70 px-4 py-3.5 text-[0.92rem] text-ink-900 placeholder:text-ink-300 transition-all duration-300 focus:border-gold-500/60 focus:bg-white focus:outline-none";

export default function Contact() {
  const [status, setStatus] = useState<Status>(null);
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);
    setStatus(null);

    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (result.success) {
        setStatus({ kind: "success", message: result.message });
        form.reset();
      } else {
        setStatus({ kind: "error", message: result.message ?? "Something went wrong." });
      }
    } catch {
      setStatus({
        kind: "error",
        message: `Connection error. Please try again or call ${site.contact.phoneIntl}.`,
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-paper-50 py-14 sm:py-24 lg:py-32">
      <Aurora className="opacity-55" />

      <div className="relative z-10 mx-auto max-w-[1300px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Get in Touch"
          eyebrowIcon={<Mail className="size-3.5" />}
          titleGold="Let's Plan"
          titleAccent="Your Dream Trip"
          subtitle="Our dedicated team is here to craft the perfect itinerary tailored just for you. Reach out today!"
          className="mb-14"
        />

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Contact details */}
          <div className="flex flex-col gap-3.5">
            {details.map((d, i) => {
              const Icon = d.icon;
              const inner = (
                <div className="group glass flex h-full items-start gap-4 rounded-3xl p-5 transition-all duration-400 hover:-translate-y-1 hover:border-gold-400/35">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand-400 to-brand-600 text-white transition-transform duration-400 group-hover:scale-110">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h4 className="text-[0.95rem] font-semibold text-ink-900">{d.title}</h4>
                    {d.lines.map((l) => (
                      <p key={l} className="text-[0.9rem] text-ink-700">
                        {l}
                      </p>
                    ))}
                    {d.muted && <p className="text-[0.8rem] text-ink-500">{d.muted}</p>}
                  </div>
                </div>
              );

              return (
                <Reveal key={d.title} delay={i * 0.08} from="right">
                  {d.href ? (
                    <a href={d.href} className="block h-full">
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </Reveal>
              );
            })}
          </div>

          {/* Form */}
          <Reveal delay={0.12} from="left">
            <form
              onSubmit={onSubmit}
              className="glass-strong flex flex-col gap-3.5 rounded-4xl p-6 sm:p-8"
            >
              <div className="grid gap-3.5 sm:grid-cols-2">
                <input className={inputCls} type="text" name="name" placeholder="Your Full Name *" required />
                <input className={inputCls} type="email" name="email" placeholder="Your Email *" required />
              </div>

              <input
                className={inputCls}
                type="tel"
                name="mobile_no"
                placeholder="Your Phone Number *"
                required
              />

              <select className={inputCls} name="destination" defaultValue="" required>
                <option value="" disabled className="bg-white text-ink-900">
                  Select Destination *
                </option>
                {destinationOptions.map((d) => (
                  <option key={d} value={d} className="bg-white text-ink-900">
                    {d}
                  </option>
                ))}
              </select>

              <textarea
                className={`${inputCls} min-h-32 resize-y`}
                name="message"
                placeholder="Tell us about your dream trip..."
                required
              />

              {/* Honeypot */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] size-0 opacity-0"
              />

              <button
                type="submit"
                disabled={sending}
                className="group/btn relative mt-1 inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-linear-to-r from-gold-300 via-gold-400 to-gold-500 px-7 py-4 text-[0.8rem] font-bold tracking-[0.14em] text-ink-900 uppercase shadow-[0_12px_38px_-12px_rgba(166,124,7,0.55)] transition-all duration-400 hover:shadow-[0_18px_50px_-12px_rgba(244,196,45,1)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full"
                />
                <span className="relative z-10 inline-flex items-center gap-2.5">
                  {sending ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="size-4" />
                      Plan My Trip
                    </>
                  )}
                </span>
              </button>

              <p className="mt-1 flex items-center justify-center gap-2 text-center text-[0.78rem] text-ink-500">
                <ShieldCheck className="size-3.5 text-brand-400" />
                Your information is safe with us. We respect your privacy.
              </p>

              <div aria-live="polite" className="sr-only">
                {status?.message}
              </div>
            </form>
          </Reveal>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {status && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong fixed inset-x-4 bottom-6 z-70 mx-auto flex max-w-md items-start gap-3.5 rounded-3xl p-4 shadow-[0_30px_70px_-25px_rgba(30,27,23,0.35)] sm:left-auto sm:right-6 sm:mx-0"
          >
            <span
              className={`flex size-9 shrink-0 items-center justify-center rounded-full ${
                status.kind === "success"
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-rose-500/15 text-rose-400"
              }`}
            >
              {status.kind === "success" ? (
                <CheckCircle2 className="size-5" />
              ) : (
                <TriangleAlert className="size-5" />
              )}
            </span>
            <div className="flex-1">
              <strong className="block text-[0.9rem] font-semibold text-ink-900">
                {status.kind === "success" ? "Success" : "Oops!"}
              </strong>
              <p className="mt-0.5 text-[0.85rem] leading-snug text-ink-500">{status.message}</p>
            </div>
            <button
              type="button"
              onClick={() => setStatus(null)}
              aria-label="Dismiss notification"
              className="shrink-0 text-ink-500 transition-colors hover:text-ink-900"
            >
              <X className="size-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
