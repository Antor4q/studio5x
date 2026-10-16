"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// placeholder data, nijer project diye replace koro
const projects = [
  {
    slug: "villa-noor",
    name: "Villa Noor",
    category: "Residential",
    location: "Dhaka",
    year: "2025",
    image: "/images/ina-04.jpg",
  },
  {
    slug: "atelier-nine",
    name: "Atelier Nine",
    category: "Commercial",
    location: "Gulshan, Dhaka",
    year: "2025",
    image: "/images/ina-04.jpg",
  },
  {
    slug: "casa-verde",
    name: "Casa Verde",
    category: "Residential",
    location: "Chattogram",
    year: "2024",
    image: "/images/ina-04.jpg",
  },
  {
    slug: "the-loft",
    name: "The Loft",
    category: "Hospitality",
    location: "Sylhet",
    year: "2024",
    image: "/images/ina-04.jpg",
  },
];

export default function FeaturedProjects() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // ---------- HEADER ENTRANCE ----------
      gsap.from(".fp-head-inner", {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".fp-head", start: "top 85%" },
      });

      // ---------- CARDS ----------
      const wraps = gsap.utils.toArray<HTMLElement>(".fp-wrap");

      wraps.forEach((wrap, i) => {
        // image parallax: frame fixed, image bhitore sore
        gsap.fromTo(
          wrap.querySelector(".fp-image-inner"),
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        // text entrance: card screen e ashle uthe ashe
        gsap.from(wrap.querySelectorAll(".fp-text"), {
          yPercent: 110,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: { trigger: wrap, start: "top 55%" },
        });

        // porer card jokhon upor diye ashe, ei card ta halka choto ar dim hoy
        const next = wraps[i + 1];
        if (next) {
          gsap.to(wrap.querySelector(".fp-card"), {
            scale: 0.92,
            ease: "none",
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
          gsap.to(wrap.querySelector(".fp-dim"), {
            opacity: 0.65,
            ease: "none",
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        }
      });

      // ---------- CURSOR "VIEW" ----------
      const cursor = root.querySelector<HTMLElement>(".fp-cursor");
      const stack = root.querySelector<HTMLElement>(".fp-stack");
      if (cursor && stack) {
        gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0 });
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.5, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.5, ease: "power3" });

        const onMove = (e: MouseEvent) => {
          xTo(e.clientX);
          yTo(e.clientY);
        };
        const show = () => gsap.to(cursor, { scale: 1, duration: 0.4, ease: "power3.out" });
        const hide = () => gsap.to(cursor, { scale: 0, duration: 0.3, ease: "power3.in" });

        const cards = Array.from(root.querySelectorAll<HTMLElement>(".fp-card"));
        stack.addEventListener("mousemove", onMove);
        cards.forEach((c) => {
          c.addEventListener("mouseenter", show);
          c.addEventListener("mouseleave", hide);
        });

        return () => {
          stack.removeEventListener("mousemove", onMove);
          cards.forEach((c) => {
            c.removeEventListener("mouseenter", show);
            c.removeEventListener("mouseleave", hide);
          });
        };
      }
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    // NOTE: ei section ba parent e overflow-hidden dio na, sticky bhenge jabe
    <section
      ref={rootRef}
      className="relative w-full bg-[#0d0c0b] font-sans uppercase text-[#F6F5F4]"
    >
      {/* Cursor follower (desktop only) */}
      <div className="fp-cursor pointer-events-none fixed left-0 top-0 z-[80] hidden h-24 w-24 items-center justify-center rounded-full bg-[#F6F5F4] text-xs font-semibold tracking-widest text-black lg:flex">
        View
      </div>

      {/* Header */}
      <div className="fp-head px-6 lg:px-28 ">
        <div className="mb-8 flex items-end justify-between lg:mb-12">
          <p className="overflow-hidden text-xs font-medium tracking-[0.3em] text-white/50">
            <span className="fp-head-inner block">( Selected work )</span>
          </p>
          <p className="overflow-hidden text-xs font-medium tracking-[0.3em] text-white/50">
            <span className="fp-head-inner block">
              {String(projects.length).padStart(2, "0")} Projects
            </span>
          </p>
        </div>

        <h2 className="text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl font-serif lg:text-[120px]">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="fp-head-inner block">Featured</span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="fp-head-inner block">Projects</span>
          </span>
        </h2>
      </div>

      {/* Sticky stacked cards */}
      <div className="fp-stack relative">
        {projects.map((p, i) => (
          <div
            key={p.slug}
            className="fp-wrap sticky top-0 h-svh w-full bg-[#0d0c0b] px-6 pb-6 pt-24 lg:px-28 lg:pb-10 lg:pt-16"
          >
            <Link
              href={`/work/${p.slug}`}
              aria-label={p.name}
              className="fp-card group/card relative block h-full w-full overflow-hidden bg-black will-change-transform"
            >
              {/* Image (parallax inner frame er cheye lomba) */}
              <div className="fp-image-inner absolute inset-x-0 -top-[10%] h-[120%]">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-105"
                />
              </div>

              {/* Readability gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />

              {/* Dim overlay: porer card ashle dark hoy */}
              <div className="fp-dim absolute inset-0 bg-black opacity-0" />

              {/* Top row: number + category */}
              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 text-xs font-medium tracking-[0.25em] lg:p-8">
                
                <span className="block overflow-hidden">
                  <span className="fp-text block">{p.category}</span>
                </span>
              </div>

              {/* Bottom row: name + location/year */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-5 lg:flex-row lg:items-end lg:justify-between lg:p-8">
                <h3 className="text-4xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
                  <span className="block overflow-hidden pb-[0.08em]">
                    <span className="fp-text block">{p.name}</span>
                  </span>
                </h3>
                <p className="block overflow-hidden text-xs font-medium tracking-[0.25em] lg:pb-3">
                  <span className="fp-text block">
                    {p.location} — {p.year}
                  </span>
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* All projects button */}
      <div className="flex justify-center px-6 py-24 lg:py-40">
        <Link
          href="/work"
          className="group inline-flex items-center gap-4 border border-white/30 px-8 py-5 text-sm font-medium tracking-[0.25em] transition-colors duration-500 hover:bg-[#F6F5F4] hover:text-black"
        >
          All projects
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}