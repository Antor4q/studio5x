"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const statement =
  "We design spaces that feel calm, personal and effortlessly timeless, where every detail has a reason to exist.";

const stats = [
  { value: 8, suffix: "+", label: "Years of practice" },
  { value: 120, suffix: "+", label: "Projects delivered" },
  { value: 5, suffix: "", label: "Design awards" },
];

export default function Intro() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // ---------- ENTRANCE ----------

      gsap.from(".intro-label-inner", {
        yPercent: 110,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".intro-label", start: "top 90%" },
      });

      // Word entrance: inner span mask er niche theke uthe ashe
      gsap.from(".intro-word", {
        yPercent: 120,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.06,
        scrollTrigger: { trigger: ".intro-statement-outer", start: "top 90%" },
      });

      // ---------- SCROLL TEXT REVEAL ----------
      // outer span (.intro-word-dim) er opacity: dim -> full white, scroll er sathe
      // range chhoto, tai statement screen e dhukle-i taratari reveal shesh hoy
      gsap.fromTo(
        ".intro-word-dim",
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.3,
          scrollTrigger: {
            trigger: ".intro-statement-outer",
            start: "top 85%",
            end: "bottom 70%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      // Image clip reveal
      gsap.fromTo(
        ".intro-image-wrap",
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: { trigger: ".intro-image-wrap", start: "top 85%" },
        }
      );

      // Paragraph, stats, link
      gsap.from(".intro-fade", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: ".intro-fade", start: "top 90%" },
      });

      // Stats count-up
      root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const counter = { val: 0 };

        gsap.to(counter, {
          val: target,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(counter.val));
          },
        });
      });

      // ---------- PARALLAX ----------

      // data-speed: positive = beshi upore uthe, negative = slow
      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const speed = Number(el.dataset.speed);
        gsap.fromTo(
          el,
          { y: speed * 90 },
          {
            y: speed * -90,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // Image parallax: frame fixed, image bhitore sore
      gsap.fromTo(
        ".intro-image-inner",
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: ".intro-image-wrap",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
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
      className="relative w-full overflow-hidden bg-[#0d0c0b] px-6 py-28 font-sans uppercase text-white lg:px-28 lg:py-48"
    >
      {/* Label */}
      <div data-speed="0.3" className="mb-10 lg:mb-16">
        <p className="intro-label overflow-hidden text-xs font-medium tracking-[0.3em] text-white/50">
          <span className="intro-label-inner block">( About the studio )</span>
        </p>
      </div>

      {/* Big statement: outer = static trigger, bhitore parallax wrapper */}
      <div className="intro-statement-outer">
        <div data-speed="0.5">
          <h2 className="max-w-6xl text-3xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-7xl">
            {statement.split(" ").map((word, i) => (
              <span key={i} className="intro-word-dim mr-[0.25em] inline-block align-top">
                <span className="inline-block overflow-hidden pb-[0.08em] align-top">
                  <span className="intro-word inline-block">{word}</span>
                </span>
              </span>
            ))}
          </h2>
        </div>
      </div>

      {/* Image + details */}
      <div className="mt-20 grid gap-16 lg:mt-32 lg:grid-cols-12 lg:gap-8">
        {/* Image column */}
        <div data-speed="-0.25" className="lg:col-span-4">
          <div className="intro-image-wrap relative aspect-[4/5] w-full overflow-hidden">
            <div className="intro-image-inner absolute inset-x-0 -top-[20%] h-[140%]">
              <Image
                src="/images/ina-04.jpg"
                alt="Studio interior"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right column */}
        <div data-speed="0.7" className="lg:col-span-5 lg:col-start-8">
          <div className="flex h-full flex-col justify-between gap-14">
            <p className="intro-fade max-w-md text-xs leading-[1.9] tracking-widest text-white/60 lg:text-sm">
              Studio 5x is an interior design studio crafting residential and commercial spaces
              with a focus on light, material and proportion. From the first sketch to the final
              piece of furniture, we shape interiors that are made to be lived in.
            </p>

            <div>
              <div className="intro-fade grid grid-cols-3 gap-6 border-t border-white/15 pt-8">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="flex items-baseline text-4xl font-semibold tracking-tight lg:text-6xl">
                      <span data-count={s.value}>0</span>
                      <span>{s.suffix}</span>
                    </div>
                    <p className="mt-2 text-[10px] tracking-widest text-white/50 lg:text-xs">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="intro-fade group mt-12 inline-flex items-center gap-3 text-sm font-medium tracking-widest"
              >
                <span className="border-b border-white/40 pb-1 transition-colors group-hover:border-white">
                  Our story
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}