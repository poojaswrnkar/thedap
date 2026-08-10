"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Poster-first background video. The <source> is only attached once the
 * section is near the viewport, so the page never pays for a multi-megabyte
 * loop the visitor may never scroll to. Honours reduced-motion by staying
 * on the poster.
 */
export function BackgroundVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!load) return;
    const el = ref.current;
    if (!el) return;
    el.load();
    // Autoplay can reject (e.g. battery saver) — the poster stays, which is fine.
    el.play().catch(() => {});
  }, [load]);

  return (
    <video
      ref={ref}
      className={cn("size-full object-cover", className)}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      tabIndex={-1}
    >
      {load && <source src={src} type="video/mp4" />}
    </video>
  );
}
