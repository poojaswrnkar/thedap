"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/** Counts up the numeric part of a label like "500+", "99%" or "4.9" when scrolled into view. */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Capture the leading number (decimals included) separately from any
  // trailing unit like "+" or "%" — a naive \D strip mangles "4.9" into "49.".
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const decimals = match?.[1].includes(".") ? match[1].split(".")[1].length : 0;
  const suffix = match ? match[2] : value;

  // Render the real figure on the server and for no-JS visitors; the client
  // rewinds to zero on mount (still off-screen) so the count-up has somewhere to go.
  const [display, setDisplay] = useState(target.toFixed(decimals));

  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20 });

  useEffect(() => {
    setDisplay((0).toFixed(decimals));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (inView) mv.set(target);
  }, [inView, mv, target]);

  useEffect(() => {
    return spring.on("change", (v) => setDisplay(v.toFixed(decimals)));
  }, [spring, decimals]);

  return (
    <div ref={ref} className={cn("font-display font-black text-gold-grad tabular-nums", className)}>
      {display}
      {suffix}
    </div>
  );
}
