
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Consultation",
    desc: "We listen first. Your lifestyle, budget, taste and timeline shape the brief before a single line is drawn.",
    image: "/images/proc1.jpg",
  },
  {
    title: "Concept",
    desc: "Mood boards, material palettes and layout ideas that define the story and feel of your space.",
    image: "/images/proc2.jpg",
  },
  {
    title: "Design",
    desc: "Detailed plans, 3D visuals and finishes. You see and refine every corner before it is built.",
    image: "/images/proc3.jpg",
  },
  {
    title: "Execution",
    desc: "Our team and trusted craftsmen bring the design to life, with site supervision at every stage.",
    image: "/images/proc4.jpg",
  },
  {
    title: "Handover",
    desc: "Final styling, quality checks and a walkthrough. We hand over a space that is ready to live in.",
    image: "/images/proc5.jpg",
  },
];

export default function Process() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // ---------- HEADER ENTRANCE ----------

      gsap.from(".prc-head-inner", {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".prc-head",
          start: "top 85%",
          once: true,
        },
      });
    }, root);

    const mm = gsap.matchMedia();

    // ---------- DESKTOP HORIZONTAL SLIDER ----------

    mm.add("(min-width: 1024px)", () => {
      const pin = root.querySelector<HTMLElement>(".prc-pin");
      const track = root.querySelector<HTMLElement>(".prc-track");

      if (!pin || !track) return;

      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.set(track, { x: 0 });

      const horizontalTween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "center center",

          // Match the exact horizontal travel distance.
          end: () => `+=${getDistance()}`,

          pin: true,
          pinSpacing: true,
          anticipatePin: 1,

          // No delayed catch-up at the end of the pin.
          scrub: true,

          invalidateOnRefresh: true,
        },
      });

      // ---------- IMAGE PARALLAX ----------

      root.querySelectorAll<HTMLElement>(".prc-panel").forEach((panel) => {
        const inner =
          panel.querySelector<HTMLElement>(".prc-image-inner");

        if (!inner) return;

        gsap.fromTo(
          inner,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontalTween,
              start: "left right",
              end: "right left",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    });

    // ---------- REFRESH AFTER LAYOUT CHANGES ----------

    let timer: ReturnType<typeof setTimeout> | undefined;

    const refresh = () => {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };

    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh);
    }

    document.fonts?.ready.then(refresh);

    let lastWidth = window.innerWidth;

    const onResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        refresh();
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      if (timer) clearTimeout(timer);

      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", onResize);

      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative w-full bg-[#0d0c0b] pb-28 font-sans uppercase text-[#F6F5F4] lg:pb-[5.5rem]"
    >
      {/* Header */}

      <div className="prc-head px-5 pb-10 pt-28 sm:px-8 sm:pb-12 md:px-12 lg:px-28 lg:pb-16">
        <div className="mb-8 lg:mb-12">
          <p className="overflow-hidden text-xs font-medium tracking-[0.3em] text-white/50">
            <span className="prc-head-inner block">
              ( How we work )
            </span>
          </p>
        </div>

        <h2 className="font-serif text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-[clamp(5rem,9vw,7.5rem)]">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="prc-head-inner block">Our</span>
          </span>

          <span className="block overflow-hidden pb-[0.08em]">
            <span className="prc-head-inner block">Process</span>
          </span>
        </h2>
      </div>

      {/* Pinned area */}

      <div className="prc-pin relative w-full overflow-hidden lg:h-[calc((100svh_-_7rem)_*_0.75_+_3rem)]">
        <div className="prc-track flex flex-col gap-14 px-5 sm:gap-16 sm:px-8 md:px-12 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-10 lg:px-[16vw]">
          {steps.map((s, i) => (
            <article
              key={s.title}
              className="prc-panel flex flex-col gap-6 sm:gap-8 lg:h-[calc((100svh_-_7rem)_*_0.75)] lg:w-[68vw] lg:shrink-0 lg:flex-row lg:items-stretch lg:gap-12"
            >
              {/* Text column */}

              <div className="flex flex-col justify-between gap-6 sm:gap-8 lg:w-[42%] lg:py-1">
                <span className="-mb-[0.3em] block overflow-hidden pb-[0.3em] font-serif text-[28vw] font-bold leading-[0.85] [font-variant-numeric:lining-nums] sm:text-[20vw] lg:text-[10vw]">
                  <span
                    className="block text-transparent"
                    style={{
                      WebkitTextStroke:
                        "1.5px rgba(246,245,244,0.55)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>

                <div className="flex flex-col gap-4">
                  <h3 className="text-4xl font-semibold leading-[0.95] tracking-tight sm:text-5xl lg:text-4xl xl:text-5xl">
                    {s.title}
                  </h3>

                  <p className="max-w-sm text-[11px] leading-[1.9] tracking-widest text-white/60 sm:max-w-md sm:text-xs">
                    {s.desc}
                  </p>
                </div>
              </div>

              {/* Image column */}

              <div className="prc-image-wrap relative aspect-[4/5] w-full overflow-hidden bg-black sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:flex-1">
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
