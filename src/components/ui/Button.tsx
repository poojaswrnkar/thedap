"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "glass" | "glassDark" | "outline";

const styles: Record<Variant, string> = {
  gold:
    "bg-linear-to-r from-gold-300 via-gold-400 to-gold-500 text-ink-900 shadow-[0_10px_36px_-10px_rgba(166,124,7,0.6)] hover:shadow-[0_16px_50px_-10px_rgba(166,124,7,0.75)]",
  /** Frosted, for use on light card/section backgrounds. */
  glass:
    "glass text-ink-900 hover:bg-ink-900/5 hover:border-ink-900/20",
  /** Frosted, for use over photography or other dark surfaces. */
  glassDark:
    "glass-dark text-white hover:bg-white/16 hover:border-white/30",
  outline:
    "border border-gold-500/50 text-gold-700 hover:bg-gold-400/10 hover:border-gold-500",
};

type Props = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

/** Button that leans toward the cursor — subtle, capped at 6px of travel. */
export function MagneticButton({
  children,
  href,
  variant = "gold",
  className,
  type = "button",
  disabled,
  onClick,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18 });
  const sy = useSpring(y, { stiffness: 260, damping: 18 });

  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 12);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 12);
  }

  const base = cn(
    "group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5",
    "text-[0.82rem] font-semibold uppercase tracking-[0.12em] transition-all duration-400",
    "disabled:cursor-not-allowed disabled:opacity-60",
    styles[variant],
    className,
  );

  const sheen = (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full"
    />
  );

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: sx, y: sy }}
      className="inline-flex"
    >
      {href ? (
        <Link href={href} className={base}>
          {sheen}
          <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
        </Link>
      ) : (
        <button type={type} disabled={disabled} onClick={onClick} className={base}>
          {sheen}
          <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
        </button>
      )}
    </motion.div>
  );
}
