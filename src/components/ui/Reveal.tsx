"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const directions = {
  up: { y: 38, x: 0 },
  down: { y: -38, x: 0 },
  left: { x: 48, y: 0 },
  right: { x: -48, y: 0 },
  none: { x: 0, y: 0 },
} as const;

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: keyof typeof directions;
  /** Stagger children that are themselves <Reveal> or motion elements. */
  as?: "div" | "section" | "li" | "article" | "header";
};

export function Reveal({ children, className, delay = 0, from = "up", as = "div" }: Props) {
  const M = motion[as] as typeof motion.div;
  const offset = directions[from];

  const variants: Variants = {
    hidden: { opacity: 0, ...offset, filter: "blur(6px)" },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <M
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </M>
  );
}

/** Splits a string into per-word motion spans for headline entrances. */
export function RevealWords({
  text,
  className,
  wordClassName,
  delay = 0,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      // Stays `inline` so the heading's `text-wrap: balance` can still see the
      // words as a normal text run — inline-flex would defeat it.
      className={cn("inline", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className={cn("inline-block", wordClassName)}
          variants={{
            hidden: { opacity: 0, y: "0.6em", rotateX: -45 },
            show: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}
