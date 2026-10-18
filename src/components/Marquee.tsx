"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// placeholder, nijer studio er keyword diye replace koro
const items = ["Residential", "Commercial", "Hospitality", "Bespoke Furniture", "Styling"];

export default function Marquee({ speed = 40 }: { speed?: number }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // track e content 2 bar ache, tai -50% gele seamless loop hoy
    const tween = gsap.to(track, {
      xPercent: -50,
      ease: "none",
      duration: speed,
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, [speed]);

  const row = items.map((t, i) => (
    <span key={i} className="flex items-center gap-10 px-5 lg:gap-16 lg:px-8">
      <span className="font-serif text-5xl font-bold tracking-tight sm:text-7xl lg:text-9xl">{t}</span>
      <span aria-hidden className="text-3xl text-white/30 lg:text-5xl">✦</span>
    </span>
  ));

  return (
    <div
      aria-hidden
      className="w-full overflow-hidden border-y border-white/10 bg-[#0d0c0b] py-8 uppercase text-[#F6F5F4] lg:py-12"
    >
      <div ref={trackRef} className="flex w-max whitespace-nowrap will-change-transform">
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
      </div>
    </div>
  );
}