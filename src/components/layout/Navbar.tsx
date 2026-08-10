"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import {
  CalendarCheck,
  Info,
  Mail,
  MapPinned,
  Menu,
  ConciergeBell,
  Route,
  X,
} from "lucide-react";
import { navLinks, site } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const icons = {
  map: MapPinned,
  bell: ConciergeBell,
  info: Info,
  route: Route,
  mail: Mail,
} as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // Home and tour pages open on a full-bleed dark photo hero, so the
  // transparent, pre-scroll navbar needs light text there. Everything else
  // (terms, 404) opens on a plain light section and needs dark text from the start.
  const overPhoto = !scrolled && (pathname === "/" || pathname?.startsWith("/tours/"));

  return (
    <>
      <motion.header
        initial={{ y: -90 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-2.5" : "py-4",
        )}
      >
        <nav
          className={cn(
            "mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 transition-all duration-500 sm:px-6",
          )}
        >
          <div
            className={cn(
              "flex w-full items-center justify-between gap-4 rounded-full px-4 py-2 transition-all duration-500 sm:px-5",
              scrolled ? "glass-strong" : "border border-transparent bg-transparent",
            )}
          >
            <Link href="/" aria-label={site.name} className="shrink-0">
              <Logo tone={overPhoto ? "light" : "dark"} />
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => {
                const Icon = icons[link.icon];
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "group relative flex items-center gap-2 rounded-full px-4 py-2 text-[0.78rem] font-medium tracking-wide transition-colors",
                        overPhoto ? "text-white/90 hover:text-white" : "text-ink-700 hover:text-ink-900",
                      )}
                    >
                      <Icon
                        className={cn(
                          "size-3.5 transition-transform duration-300 group-hover:scale-110",
                          overPhoto ? "text-gold-300" : "text-gold-600/80",
                        )}
                      />
                      {link.label}
                      <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-linear-to-r from-gold-400 to-brand-400 transition-transform duration-400 group-hover:scale-x-100" />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <Link
                href="/#contact"
                className="group relative hidden overflow-hidden rounded-full bg-linear-to-r from-gold-300 via-gold-400 to-gold-500 px-5 py-2.5 text-[0.75rem] font-bold tracking-[0.1em] text-ink-900 uppercase shadow-[0_8px_28px_-10px_rgba(166,124,7,0.55)] transition-shadow hover:shadow-[0_12px_38px_-8px_rgba(166,124,7,0.7)] sm:inline-flex"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <span className="relative z-10 inline-flex items-center gap-2">
                  <CalendarCheck className="size-4" />
                  Book Now
                </span>
              </Link>

              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className={cn(
                  "flex size-10 items-center justify-center rounded-full lg:hidden",
                  overPhoto ? "glass-dark text-white" : "glass text-ink-800",
                )}
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 lg:hidden"
          >
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-charcoal-950/65 backdrop-blur-md"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass-strong absolute inset-y-0 right-0 flex w-[min(20rem,86vw)] flex-col gap-2 p-6 pt-7"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="mb-4 ml-auto flex size-10 items-center justify-center rounded-full border border-ink-900/12 text-ink-900"
              >
                <X className="size-5" />
              </button>

              {navLinks.map((link, i) => {
                const Icon = icons[link.icon];
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-2xl px-4 py-3 text-[0.95rem] text-ink-700 transition-colors hover:bg-ink-900/5 hover:text-ink-900"
                    >
                      <Icon className="size-4 text-gold-400" />
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-gold-300 to-gold-500 px-5 py-3.5 text-[0.8rem] font-bold tracking-[0.1em] text-ink-900 uppercase"
              >
                <CalendarCheck className="size-4" />
                Book Now
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
