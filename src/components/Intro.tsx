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

      // ---------- SCROLL TEXT REVEAL ----------
      // timeline/stagger na, scroll progress theke proti word er opacity calculate kori.
      // tai word gula ek ek kore, order e, kono jhatka chhara reveal hoy.
      const words = gsap.utils.toArray<HTMLElement>(".intro-word");
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
        trigger: ".intro-statement-outer",
        start: "top 85%",
        end: "bottom 60%",
        invalidateOnRefresh: true,
        onUpdate: (self) => paint(self.progress),
        onRefresh: (self) => paint(self.progress),
      });

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

      // mobile/tablet e parallax adha, noile stacked layout e overlap hoy
      const factor = () => (window.innerWidth < 1024 ? 0.5 : 1);

      // data-speed: positive = beshi upore uthe, negative = slow
      // NOTE: statement e data-speed nai, ota static thake
      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const speed = Number(el.dataset.speed);
        gsap.fromTo(
          el,
          { y: () => speed * 90 * factor() },
          {
            y: () => speed * -90 * factor(),
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
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

    // ---------- REFRESH FIX ----------
    // debounce: scroll cholar somoy bar bar refresh hole scrub jhatka khay
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
    <section
      ref={rootRef}
      className="relative w-full overflow-hidden bg-[#0d0c0b] px-5 py-20 font-sans uppercase text-white sm:px-8 sm:py-24 md:px-12 lg:px-28 lg:py-28"
    >
      {/* Label */}
      <div data-speed="0.3" className="mb-8 lg:mb-12">
        <p className="intro-label overflow-hidden text-xs font-medium tracking-[0.3em] text-white/50">
          <span className="intro-label-inner block">( About the studio )</span>
        </p>
      </div>

      {/* Big statement: static, parallax nai */}
      <div className="intro-statement-outer">
        <h2 className="max-w-6xl text-3xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-7xl">
          {statement.split(" ").map((word, i) => (
            <span
              key={i}
              className="intro-word mr-[0.25em] inline-block align-top"
              style={{ opacity: 0.15 }}
            >
              {word}
            </span>
          ))}
        </h2>
      </div>

      {/* Image + details */}
      <div className="mt-16 grid gap-14 sm:mt-20 lg:mt-24 lg:grid-cols-12 lg:gap-8">
        {/* Image column */}
        <div data-speed="-0.25" className="mx-auto w-full max-w-md sm:max-w-lg lg:col-span-4 lg:mx-0 lg:max-w-none">
          <div className="intro-image-wrap relative aspect-[4/5] w-full overflow-hidden">
            <div className="intro-image-inner absolute inset-x-0 -top-[20%] h-[140%]">
              <Image
                src="/images/intro.webp"
                alt="Studio interior"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right column */}
        <div data-speed="0.7" className="lg:col-span-6 lg:col-start-7">
          <div className="flex h-full flex-col justify-between gap-12 lg:gap-14">
            <p className="intro-fade max-w-md text-xs leading-[1.9] tracking-widest text-white/60 sm:text-sm">
              Studio 5x is an interior design studio crafting residential and commercial spaces
              with a focus on light, material and proportion. From the first sketch to the final
              piece of furniture, we shape interiors that are made to be lived in.
            </p>

            <div>
              <div className="intro-fade grid grid-cols-3 gap-4 border-t border-white/15 pt-8 sm:gap-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="flex items-baseline text-4xl font-semibold leading-none tracking-tight sm:text-6xl lg:text-[clamp(2.5rem,4.2vw,5.5rem)]">
                      <span data-count={s.value}>0</span>
                      <span>{s.suffix}</span>
                    </div>
                    <p className="mt-3 text-[10px] leading-relaxed tracking-widest text-white/50 sm:text-xs">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="intro-fade group mt-10 inline-flex items-center gap-3 text-sm font-medium tracking-widest lg:mt-12"
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