"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// placeholder data, nijer service diye replace koro
const services = [
  {
    slug: "interior-design",
    name: "Interior Design",
    category: "Residential & Commercial",
    description: "Space planning, concept to final styling",
    image: "/images/se1.jpg",
  },
  {
    slug: "architecture",
    name: "Architecture",
    category: "Design & Planning",
    description: "Thoughtful structures built around people",
    image: "/images/se2.jpg",
  },
  {
    slug: "custom-furniture",
    name: "Custom Furniture",
    category: "Bespoke Craft",
    description: "Made-to-measure pieces for your space",
    image: "/images/se3.jpg",
  },
  {
    slug: "project-management",
    name: "Project Management",
    category: "Execution",
    description: "On-site supervision, timeline and budget control",
    image: "/images/se4.jpg",
  },
];

export default function Services() {
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

        // text entrance
        gsap.from(wrap.querySelectorAll(".fp-text"), {
          yPercent: 110,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: { trigger: wrap, start: "top 55%" },
        });

        // porer card ashle ei card choto ar dim hoy
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
    }, root);

    // ---------- REFRESH FIX ----------
    // font/image load er pore layout shift hole position abar calculate
    let timer: ReturnType<typeof setTimeout>;
    const refresh = () => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 150);
    };

    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    // shudhu width change e refresh (mobile address bar er height change e na)
    let lastW = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth !== lastW) {
        lastW = window.innerWidth;
        refresh();
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  return (
    // NOTE: ei section ba parent e overflow-hidden dio na, sticky bhenge jabe
    <section
      ref={rootRef}
      className="relative w-full bg-[#F6F5F4] py-28 font-sans uppercase text-[#0d0c0b]"
    >
      {/* Header */}
      <div className="fp-head px-5 sm:px-8 md:px-12 lg:px-28">
        <div className="mb-8 lg:mb-12">
          <p className="overflow-hidden text-xs font-medium tracking-[0.3em] text-black/50">
            <span className="fp-head-inner block">( What we do )</span>
          </p>
        </div>

        <h2 className="font-serif text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-[clamp(5rem,9vw,7.5rem)]">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="fp-head-inner block">Featured</span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="fp-head-inner block">Services</span>
          </span>
        </h2>
      </div>

      {/* Sticky stacked cards */}
      <div className="fp-stack relative">
        {services.map((s, i) => (
          <div
            key={s.slug}
            className="fp-wrap sticky top-0 h-[80svh] w-full bg-[#F6F5F4] px-5 pb-5 pt-16 sm:h-[82svh] sm:px-8 sm:pb-6 sm:pt-20 md:px-12 lg:h-[85svh] lg:px-28 lg:pb-8 lg:pt-12"
          >
            <Link
              href={`/`}
              aria-label={s.name}
              className="fp-card group/card relative block h-full w-full overflow-hidden bg-black text-[#F6F5F4] will-change-transform"
            >
              {/* Image (parallax inner frame er cheye lomba) */}
              <div className="fp-image-inner absolute inset-x-0 -top-[10%] h-[120%]">
                <Image
                  src={s.image}
                  alt={s.name}
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

              {/* Top row: category */}
              <div className="absolute inset-x-0 top-0 flex items-start p-4 text-[11px] font-medium tracking-[0.25em] sm:p-6 sm:text-xs lg:p-8">
                <span className="block overflow-hidden">
                  <span className="fp-text block">{s.category}</span>
                </span>
              </div>

              {/* Bottom row: name + description */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-4 sm:gap-4 sm:p-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8 lg:p-8">
                <h3 className="text-4xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-[clamp(3.5rem,6.5vw,7rem)]">
                  <span className="block overflow-hidden pb-[0.08em]">
                    <span className="fp-text block">{s.name}</span>
                  </span>
                </h3>
                <p className="block max-w-xs overflow-hidden text-[11px] font-medium leading-relaxed tracking-[0.25em] sm:text-xs lg:shrink-0 lg:pb-3 lg:text-right">
                  <span className="fp-text block">{s.description}</span>
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}