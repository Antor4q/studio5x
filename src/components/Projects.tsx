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
    desc: "A warm, light-filled family villa built around a central courtyard and natural stone.",
    image: "/images/pro1.jpg",
  },
  {
    slug: "atelier-nine",
    name: "Atelier Nine",
    category: "Commercial",
    location: "Gulshan, Dhaka",
    year: "2025",
    desc: "A creative studio workspace with flexible zones, raw textures and layered lighting.",
    image: "/images/pro2.jpg",
  },
  {
    slug: "casa-verde",
    name: "Casa Verde",
    category: "Residential",
    location: "Chattogram",
    year: "2024",
    desc: "A hillside home that blurs indoors and outdoors with timber, glass and greenery.",
    image: "/images/pro3.webp",
  },
  {
    slug: "the-loft",
    name: "The Loft",
    category: "Hospitality",
    location: "Sylhet",
    year: "2024",
    desc: "A boutique stay with double-height spaces, soft palettes and bespoke furniture.",
    image: "/images/pro4.webp",
  },
  
];

export default function Projects() {
  const rootRef = useRef<HTMLElement>(null);

  // ---------- GSAP: header, images, sticky text swap ----------
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // header + image entrance + image parallax (desktop + mobile)
    const ctx = gsap.context(() => {
      gsap.from(".fp-head-inner", {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".fp-head", start: "top 85%" },
      });

      gsap.utils.toArray<HTMLElement>(".fp-item").forEach((item) => {
        // image: niche theke clip reveal
        gsap.fromTo(
          item.querySelector(".fp-image-wrap"),
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.4,
            ease: "power4.inOut",
            scrollTrigger: { trigger: item, start: "top 88%" },
          }
        );

        // image er bhitore parallax: frame fixed, image sore
        gsap.fromTo(
          item.querySelector(".fp-image-inner"),
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        // mobile text (image er niche) entrance
        gsap.from(item.querySelectorAll(".fp-m-line"), {
          yPercent: 110,
          duration: 1,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: { trigger: item, start: "top 75%" },
        });
      });

      gsap.from(".fp-cta", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".fp-cta", start: "top 95%" },
      });
    }, root);

    // ---------- DESKTOP: left sticky text, scroll e swap ----------
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const infos = gsap.utils.toArray<HTMLElement>(".fp-info");
      const items = gsap.utils.toArray<HTMLElement>(".fp-item");
      const linesOf = (el: HTMLElement) => Array.from(el.querySelectorAll(".fp-line"));
      let current = 0;

      // prothom ta chhara baki info lukano
      infos.forEach((el, i) => {
        if (i === 0) return;
        gsap.set(el, { autoAlpha: 0 });
        gsap.set(linesOf(el), { yPercent: 110 });
      });

      // prothom info er entrance
      gsap.from(linesOf(infos[0]), {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.07,
        scrollTrigger: { trigger: ".fp-grid", start: "top 70%" },
      });

      const goTo = (next: number) => {
        if (next === current) return;
        const dir = next > current ? 1 : -1;
        const prev = infos[current];
        const nxt = infos[next];

        // fast scroll e jodi beshi info ekshathe bhese thake, baki shob lukiye dao
        infos.forEach((el, k) => {
          if (k === next || k === current) return;
          gsap.killTweensOf(linesOf(el));
          gsap.set(el, { autoAlpha: 0 });
          gsap.set(linesOf(el), { yPercent: 110 });
        });

        gsap.killTweensOf([...linesOf(prev), ...linesOf(nxt)]);

        // ager info upore (ba niche) berhiye jay
        gsap.to(linesOf(prev), {
          yPercent: -110 * dir,
          duration: 0.5,
          ease: "power3.in",
          stagger: 0.025,
          onComplete: () => {
            gsap.set(prev, { autoAlpha: 0 });
          },
        });

        // notun info mask er niche (ba upor) theke ashe
        gsap.set(nxt, { autoAlpha: 1 });
        gsap.fromTo(
          linesOf(nxt),
          { yPercent: 110 * dir },
          { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.06, delay: 0.12 }
        );

        current = next;
      };

      // image screen e dhukle-i content change:
      // niche scroll: image er top viewport er 85% e pouchhale
      // upore scroll: image er bottom viewport er 15% e pouchhale
      items.forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 85%",
          end: "bottom 15%",
          onEnter: () => goTo(i),
          onEnterBack: () => goTo(i),
        });
      });
    });

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
      mm.revert();
      ctx.revert();
    };
  }, []);

  // ---------- Cursor "VIEW" (desktop only) ----------
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cursor = root.querySelector<HTMLElement>(".fp-cursor");
    if (!cursor) return;

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
    window.addEventListener("mousemove", onMove);
    cards.forEach((c) => {
      c.addEventListener("mouseenter", show);
      c.addEventListener("mouseleave", hide);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cards.forEach((c) => {
        c.removeEventListener("mouseenter", show);
        c.removeEventListener("mouseleave", hide);
      });
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

      {/* Header: pt nai */}
      <div className="fp-head px-5 pb-12 sm:px-8 sm:pb-14 md:px-12 lg:px-28 lg:pb-20">
        <div className="mb-8 lg:mb-12">
          <p className="overflow-hidden text-xs font-medium tracking-[0.3em] text-white/50">
            <span className="fp-head-inner block">( Selected work )</span>
          </p>
        </div>

        <h2 className="font-serif text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-[clamp(5rem,9vw,7.5rem)]">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="fp-head-inner block">Featured</span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="fp-head-inner block">Projects</span>
          </span>
        </h2>
      </div>

      {/* Split layout: left sticky info (desktop), right scrolling images */}
      <div className="fp-grid grid gap-12 px-5 pb-20 sm:px-8 md:px-12 lg:grid-cols-12 lg:gap-10 lg:px-28 lg:pb-32">
        {/* LEFT: sticky info, shudhu desktop e */}
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-0 h-svh">
            {projects.map((p, i) => (
              <div
                key={p.slug}
                className={`fp-info absolute inset-0 flex flex-col justify-between pb-12 pt-28 ${
                  i === 0 ? "" : "invisible"
                }`}
              >
                {/* Top: category */}
                <div className="flex items-center text-xs font-medium tracking-[0.25em] text-white/60">
                  <span className="block overflow-hidden">
                    <span className="fp-line block">{p.category}</span>
                  </span>
                </div>

                {/* Bottom: name, meta, desc, link */}
                <div className="flex flex-col gap-6">
                  <h3 className="font-sans text-[clamp(2.5rem,4.6vw,5rem)] font-semibold leading-[0.95] tracking-tight">
                    <span className="block overflow-hidden pb-[0.1em]">
                      <span className="fp-line block">{p.name}</span>
                    </span>
                  </h3>

                  <p className="block overflow-hidden text-xs font-medium tracking-[0.25em] text-white/60">
                    <span className="fp-line block">
                      {p.location} — {p.year}
                    </span>
                  </p>

                  <p className="block max-w-sm overflow-hidden text-[11px] leading-[1.9] tracking-widest text-white/50">
                    <span className="fp-line block">{p.desc}</span>
                  </p>

                  <span className="block overflow-hidden">
                    <span className="fp-line block">
                      <Link
                        href={`/`}
                        className="group/link inline-flex items-center gap-3 text-xs font-medium tracking-[0.25em]"
                      >
                        <span className="border-b border-white/40 pb-1 transition-colors group-hover/link:border-white">
                          View project
                        </span>
                        <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                          →
                        </span>
                      </Link>
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: scrolling images */}
        <div className="flex flex-col gap-14 sm:gap-16 lg:col-span-7 lg:gap-24 lg:py-[11svh]">
          {projects.map((p, i) => (
            <article key={p.slug} className="fp-item">
              <Link
                href={`/`}
                aria-label={p.name}
                className="fp-card group/card block"
              >
                <div className="fp-image-wrap relative aspect-[4/5] w-full overflow-hidden bg-black sm:aspect-[4/3] lg:aspect-auto lg:h-[78svh]">
                  {/* inner frame er cheye lomba, tai parallax e faka dekha jabe na */}
                  <div className="fp-image-inner absolute inset-x-0 -top-[8%] h-[116%]">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      priority={i < 2}
                      className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-105"
                    />
                  </div>
                </div>
              </Link>

              {/* Mobile/tablet text: image er niche (desktop e hide, left sticky e dekhay) */}
              <div className="mt-5 flex flex-col gap-3 lg:hidden">
                <h3 className="text-4xl font-semibold leading-[1] tracking-tight sm:text-5xl">
                  <span className="block overflow-hidden pb-[0.1em]">
                    <span className="fp-m-line block">{p.name}</span>
                  </span>
                </h3>

                <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[11px] font-medium tracking-[0.25em] text-white/60 sm:text-xs">
                  <span className="block overflow-hidden">
                    <span className="fp-m-line block">{p.category}</span>
                  </span>
                  <span className="block overflow-hidden">
                    <span className="fp-m-line block">
                      {p.location} — {p.year}
                    </span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

    </section>
  );
}