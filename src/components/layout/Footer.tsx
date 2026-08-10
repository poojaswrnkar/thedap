import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Twitter, Youtube } from "lucide-react";
import { footerDestinations, footerNav, site } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { Aurora } from "@/components/ui/Aurora";

const socialIcons = { facebook: Facebook, instagram: Instagram, twitter: Twitter, youtube: Youtube };

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-charcoal-950 pt-20">
      <Aurora tone="dark" className="opacity-45" />

      <div className="relative z-10 mx-auto grid max-w-[1300px] gap-12 px-5 pb-14 sm:px-8 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
        <div>
          <Link href="/" aria-label={site.name} className="inline-block">
            <Logo tone="light" />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
            Seek cultural immersion, natural wonders, or urban adventures — we craft journeys
            you&apos;ll never forget.
          </p>

          <div className="mt-6 flex gap-2.5">
            {site.socials.map((s) => {
              const Icon = socialIcons[s.icon as keyof typeof socialIcons];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="glass flex size-10 items-center justify-center rounded-full text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/50 hover:text-gold-300"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        </div>

        <FooterCol title="Navigation">
          {footerNav.map((l) => (
            <FooterLink key={l.label} href={l.href}>
              {l.label}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Destinations">
          {footerDestinations.map((l) => (
            <FooterLink key={l.label} href={l.href}>
              {l.label}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Contact Us">
          <FooterLink href={site.contact.phoneHref} icon={<Phone className="size-3.5" />}>
            {site.contact.phoneIntl}
          </FooterLink>
          <FooterLink
            href={`mailto:${site.contact.email}`}
            icon={<Mail className="size-3.5" />}
          >
            {site.contact.email}
          </FooterLink>
          <FooterLink href="/#contact" icon={<MapPin className="size-3.5" />}>
            {site.contact.addressShort}
          </FooterLink>
          <FooterLink
            href={`https://wa.me/91${site.contact.phone}`}
            icon={<MessageCircle className="size-3.5" />}
          >
            WhatsApp Us
          </FooterLink>
        </FooterCol>
      </div>

      <div className="relative z-10 border-t border-white/8">
        <div className="mx-auto flex max-w-[1300px] flex-col items-center justify-between gap-3 px-5 py-6 text-center sm:px-8 md:flex-row md:text-left">
          <p className="text-[0.8rem] text-slate-500">
            © 2025 <span className="font-semibold text-gold-300">{site.name}</span>. All rights
            reserved. Designed with <span className="text-gold-400">❤</span>
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[0.78rem] text-slate-500">
            <Link href="/terms" className="transition-colors hover:text-gold-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-gold-300">
              Terms of Service
            </Link>
            <Link href="/#home" className="transition-colors hover:text-gold-300">
              Sitemap
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="relative mb-5 pb-3 text-[0.95rem] font-semibold text-white">
        {title}
        <span className="absolute bottom-0 left-0 h-0.5 w-9 rounded-full bg-linear-to-r from-gold-400 to-transparent" />
      </h4>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  children,
  icon,
}: {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const cls =
    "group inline-flex items-center gap-2.5 text-sm text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-gold-300";

  const inner = (
    <>
      {icon && <span className="text-gold-500/70 transition-colors group-hover:text-gold-400">{icon}</span>}
      {children}
    </>
  );

  return external ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
