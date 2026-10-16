"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// placeholder data, nijer step, description ar image diye replace koro
const steps = [
  {
    title: "Consultation",
    desc: "We listen first. Your lifestyle, budget, taste and timeline shape the brief before a single line is drawn.",
    image: "/images/ina-04.jpg",
  },
  {
    title: "Concept",
    desc: "Mood boards, material palettes and layout ideas that define the story and feel of your space.",
    image: "/images/ina-04.jpg",
  },
  {
    title: "Design",
    desc: "Detailed plans, 3D visuals and finishes. You see and refine every corner before it is built.",
    image: "/images/ina-04.jpg",
  },
  {
    title: "Execution",
    desc: "Our team and trusted craftsmen bring the design to life, with site supervision at every stage.",
    image: "/images/ina-04.jpg",
  },
  {
    title: "Handover",
    desc: "Final styling, quality checks and a walkthrough. We hand over a space that is ready to live in.",
    image: "/images/ina-04.jpg",
  },
];

export default function Process() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Header entrance (desktop + mobile duto-i te)
    const headCtx = gsap.context(() => {
      gsap.from(".prc-head-inner", {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".prc-head", start: "top 85%" },
      });
    }, root);

    const mm = gsap.matchMedia();

    // ---------- DESKTOP: pinned horizontal scroll ----------
    mm.add("(min-width: 1024px)", () => {
      const pin = root.querySelector<HTMLElement>(".prc-pin");
      const track = root.querySelector<HTMLElement>(".prc-track");
      if (!pin || !track) return;

      const getDistance = () => track.scrollWidth - window.innerWidth;

      // main horizontal tween, full screen pin hoye track bame sore
      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: true, // Lenis already smooth, tai extra lag lagbe na
          invalidateOnRefresh: true,
        },
      });

      // image parallax: frame fixed, image bhitore sore
      root.querySelectorAll<HTMLElement>(".prc-panel").forEach((panel) => {
        const inner = panel.querySelector(".prc-image-inner");
        if (!inner) return;

        gsap.fromTo(
          inner,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });
    });

    // font / image load howar pore position abar calculate
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
      headCtx.revert();
    };
  }, []);

  return (
    // NOTE: ei section ba parent e overflow-hidden dio na, pin bhenge jabe
    <section
      ref={rootRef}
      className="relative w-full bg-[#0d0c0b] font-sans uppercase text-[#F6F5F4]"
    >
      {/* Header */}
      <div className="prc-head px-6 pt-28 lg:px-28 lg:pb-0">
        <div className="mb-8 flex items-end justify-between lg:mb-12">
          <p className="overflow-hidden text-xs font-medium tracking-[0.3em] text-white/50">
            <span className="prc-head-inner block">( How we work )</span>
          </p>
          <p className="overflow-hidden text-xs font-medium tracking-[0.3em] text-white/50">
            <span className="prc-head-inner block">
              {String(steps.length).padStart(2, "0")} Steps
            </span>
          </p>
        </div>

        <h2 className="font-serif text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-[120px]">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="prc-head-inner block">Our</span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="prc-head-inner block">Process</span>
          </span>
        </h2>
      </div>

      {/* Pinned area: desktop e full screen (h-svh), mobile e normal flow */}
      <div className="prc-pin relative w-full overflow-hidden lg:h-svh">
        {/* Track: items-center, tai panel screen er vertical center e thake.
            lg:pt-16 navbar er jonno halka offset. will-change-transform: GPU smooth */}
        <div className="prc-track flex flex-col gap-16 px-6 pb-24 will-change-transform lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-10 lg:px-28 lg:pb-0 lg:pt-16">
          {steps.map((s, i) => (
            <article
              key={s.title}
              className="prc-panel flex flex-col gap-8 lg:h-[62svh] lg:w-[68vw] lg:shrink-0 lg:flex-row lg:items-stretch lg:gap-12"
            >
              {/* Text column */}
              <div className="flex flex-col justify-between gap-8 lg:w-[42%] lg:py-1">
                {/* Giant outline number */}
                <span className="block -mb-[0.3em] overflow-hidden pb-[0.3em] font-serif text-[28vw] font-bold leading-[0.85] [font-variant-numeric:lining-nums] sm:text-[20vw] lg:text-[10vw]">
                  <span
                    className="block text-transparent"
                    style={{ WebkitTextStroke: "1.5px rgba(246,245,244,0.55)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>

                <div className="flex flex-col gap-4">
                  <h3 className="text-4xl font-semibold leading-[0.95] tracking-tight sm:text-5xl lg:text-4xl xl:text-5xl">
                    {s.title}
                  </h3>

                  <p className="max-w-sm text-[11px] leading-[1.9] tracking-widest text-white/60">
                    {s.desc}
                  </p>
                </div>
              </div>

              {/* Image column */}
              <div className="prc-image-wrap relative aspect-[4/5] w-full overflow-hidden bg-black lg:aspect-auto lg:h-full lg:flex-1">
                {/* inner frame er cheye choura, tai horizontal parallax e faka dekha jabe na */}
                <div className="prc-image-inner absolute inset-y-0 -left-[10%] w-[120%]">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}