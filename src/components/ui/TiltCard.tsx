"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Pointer-tracked 3D tilt with a glare highlight. Falls back to a plain
 * container on touch devices (no pointer to track).
 */
export function TiltCard({
  children,
  className,
  intensity = 9,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const spring = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(my, [0, 1], [intensity, -intensity]), spring);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-intensity, intensity]), spring);
  const glareX = useSpring(useTransform(mx, (v) => v * 100), spring);
  const glareY = useSpring(useTransform(my, (v) => v * 100), spring);
  const glare = useMotionTemplate`radial-gradient(340px circle at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.16), transparent 62%)`;

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className={cn("relative", className)}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glare }}
      />
    </motion.div>
  );
}
