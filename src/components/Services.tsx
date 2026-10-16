"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// placeholder data, nijer service, description ar image diye replace koro
const services = [
  {
    title: "Residential",
    href: "/services/residential",
    desc: "Homes, villas and apartments designed around the way you live.",
    image: "/images/ina-04.jpg",
  },
  {
    title: "Commercial",
    href: "/services/commercial",
    desc: "Offices, retail and showrooms that carry your brand.",
    image: "/images/ina-04.jpg",
  },
  {
    title: "Space Planning",
    href: "/services/space-planning",
    desc: "Smart layouts that make every square foot work harder.",
    image: "/images/ina-04.jpg",
  },
  {
    title: "Furniture & Styling",
    href: "/services/furniture-styling",
    desc: "Bespoke pieces, materials and finishing touches.",
    image: "/images/ina-04.jpg",
  },
  {
    title: "3D Visualization",
    href: "/services/3d-visualization",
    desc: "Photoreal renders so you see the space before it is built.",
    image: "/images/ina-04.jpg",
  },
];

export default function Services() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // ---------- HEADER ENTRANCE ----------
      gsap.from(".srv-head-inner", {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".srv-head", start: "top 85%" },
      });

      // ---------- PANELS ENTRANCE ----------
      // niche theke ekta ekta kore clip reveal
      gsap.fromTo(
        ".srv-panel",
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power4.inOut",
          stagger: 0.12,
          clearProps: "clipPath",
          scrollTrigger: { trigger: ".srv-panels", start: "top 85%" },
        }
      );
    }, root);

    // font / image load howar pore position abar calculate
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative w-full bg-[#0d0c0b] px-6 pb-28 font-sans uppercase text-[#F6F5F4] lg:px-28 lg:pb-28"
    >
      {/* Header */}
      <div className="srv-head mb-16 lg:mb-24">
        <div className="mb-8 flex items-end justify-between lg:mb-12">
          <p className="overflow-hidden text-xs font-medium tracking-[0.3em] text-white/50">
            <span className="srv-head-inner block">( What we do )</span>
          </p>
         
        </div>

        <h2 className="font-serif text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-[120px]">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="srv-head-inner block">Our</span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="srv-head-inner block">Services</span>
          </span>
        </h2>
      </div>

      {/* Expanding panels: desktop e row (bame-dane), mobile e column (upor-niche) */}
      <div className="srv-panels flex h-[40rem] flex-col gap-2 lg:h-[75svh] lg:flex-row">
        {services.map((s, i) => {
          const isActive = active === i;

          return (
            <div
              key={s.title}
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              aria-label={s.title}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              style={{ flexGrow: isActive ? 6 : 1 }}
              className="srv-panel group/panel relative min-h-0 min-w-0 basis-0 cursor-pointer overflow-hidden bg-black transition-[flex-grow] duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
            >
              {/* Image: inactive e dark + ektu zoom, active e bright + normal */}
              <Image
                src={s.image}
                alt={s.title}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className={`object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isActive ? "scale-100 brightness-90" : "scale-110 brightness-[0.35]"
                }`}
              />

              {/* Readability gradient (open panel e) */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 transition-opacity duration-700 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Number: shob panel e top-left e */}
              <span className="absolute left-5 top-5 text-xs font-medium tracking-[0.25em] lg:left-6 lg:top-6">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* CLOSED label: desktop e vertical text, mobile e horizontal */}
              <span
                className={`absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-semibold tracking-[0.2em] transition-opacity duration-500 lg:bottom-8 lg:left-1/2 lg:top-auto lg:-translate-x-1/2 lg:translate-y-0 lg:rotate-180 lg:text-base lg:[writing-mode:vertical-rl] ${
                  isActive ? "opacity-0" : "opacity-100 delay-300"
                }`}
              >
                {s.title}
              </span>

              {/* OPEN content: fixed min width, tai panel resize hole text reflow hoy na */}
              <div
                className={`absolute inset-x-0 bottom-0 flex flex-col gap-5 p-5 transition-all duration-700 lg:min-w-[34rem] lg:gap-6 lg:p-8 ${
                  isActive
                    ? "translate-y-0 opacity-100 delay-500"
                    : "pointer-events-none translate-y-6 opacity-0"
                }`}
              >
                <h3 className="text-3xl font-semibold leading-[0.95] tracking-tight sm:text-5xl lg:text-7xl">
                  {s.title}
                </h3>

                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                  <p className="max-w-xs text-[11px] leading-[1.9] tracking-widest text-white/70">
                    {s.desc}
                  </p>

                  <Link
                    href={s.href}
                    tabIndex={isActive ? 0 : -1}
                    onClick={(e) => e.stopPropagation()}
                    className="group/link inline-flex shrink-0 items-center gap-3 text-xs font-medium tracking-[0.25em]"
                  >
                    <span className="border-b border-white/40 pb-1 transition-colors group-hover/link:border-white">
                      Learn more
                    </span>
                    <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}