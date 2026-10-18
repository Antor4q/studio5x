"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// placeholder, nijer founder er quote diye replace koro
const quote =
  "We don't decorate rooms. We shape the way a family wakes up, eats together and winds down at night.";
const founder = {
  name: "Founder Name",
  role: "Founder & Principal Designer",
  image: "/images/founder.jpg",
};

export default function FounderQuote() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // ---------- QUOTE SCROLL REVEAL ----------
      // scroll progress theke proti word er opacity calculate kori,
      // tai word gula ek ek kore, order e, jhatka chhara reveal hoy.
      const words = gsap.utils.toArray<HTMLElement>(".fq-word");
      const DIM = 0.15;
      const SPREAD = 2; // ekta word full hote koyta word er somoy lage

      const paint = (progress: number) => {
        const p = progress * (words.length + SPREAD);
        words.forEach((w, i) => {
          const t = gsap.utils.clamp(0, 1, (p - i) / SPREAD);
          w.style.opacity = String(DIM + (1 - DIM) * t);
        });
      };

      paint(0);

      ScrollTrigger.create({
        trigger: ".fq-quote",
        start: "top 80%",
        end: "bottom 55%",
        invalidateOnRefresh: true,
        onUpdate: (self) => paint(self.progress),
        onRefresh: (self) => paint(self.progress),
      });

      // ---------- SQUARE IMAGE ----------
      // entrance: niche theke clip reveal
      gsap.fromTo(
        ".fq-img",
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.3,
          ease: "power4.inOut",
          scrollTrigger: { trigger: ".fq-img", start: "top 90%" },
        }
      );

      // parallax: frame fixed, image bhitore sore
      gsap.fromTo(
        ".fq-img-inner",
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: ".fq-img",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // name + role entrance
      gsap.from(".fq-meta", {
        yPercent: 110,
        duration: 1,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".fq-meta-wrap", start: "top 92%" },
      });
    }, root);

    // ---------- REFRESH FIX ----------
    let timer: ReturnType<typeof setTimeout>;
    const refresh = () => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 150);
    };

    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

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
    <section
      ref={rootRef}
      className="relative w-full bg-[#F6F5F4] px-6 py-24 text-[#0d0c0b] sm:px-8 md:px-12 lg:px-28 lg:py-40"
    >
      {/* items-start: image upor-e align, quote column image er cheye lomba */}
      <div className="grid grid-cols-4 items-start gap-10 sm:gap-12 lg:flex-row lg:gap-16 xl:gap-24">
        {/* Small square image, left + top */}
        <div className="fq-img relative col-span-1 aspect-square w-24 shrink-0 overflow-hidden bg-black/10 sm:w-32 lg:w-44 xl:w-52">
          <div className="fq-img-inner absolute inset-x-0 -top-[12%] h-[124%]">
            <Image
              src={founder.image}
              alt={founder.name}
              fill
              sizes="(min-width: 1280px) 208px, (min-width: 1024px) 176px, (min-width: 640px) 128px, 96px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Quote + name */}
        <div className="min-w-0 col-span-3">
          <blockquote className="fq-quote font-serif text-3xl leading-[1.15] tracking-tight sm:text-5xl lg:text-[clamp(2.75rem,4.8vw,5rem)]">
            <span aria-hidden className="mr-2 align-top">“</span>
            {quote.split(" ").map((w, i) => (
              <span
                key={i}
                className="fq-word inline-block pr-[0.25em]"
                style={{ opacity: 0.15 }}
              >
                {w}
              </span>
            ))}
            <span aria-hidden>”</span>
          </blockquote>

          <div className="fq-meta-wrap mt-8 sm:mt-10 lg:mt-14">
            <p className="overflow-hidden text-sm font-semibold uppercase tracking-[0.25em]">
              <span className="fq-meta block">{founder.name}</span>
            </p>
            <p className="overflow-hidden text-xs font-medium uppercase tracking-[0.25em] text-black/50">
              <span className="fq-meta block">{founder.role}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}