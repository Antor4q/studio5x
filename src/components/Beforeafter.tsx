"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// placeholder, nijer before/after image path diye replace koro
const data = {
  before: "/images/ina-04.jpg",
  after: "/images/ina-04.jpg",
  project: "Villa Noor, Dhaka",
};

export default function BeforeAfter() {
  const rootRef = useRef<HTMLElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // pos = handle kothay (0-100). after image ta handle er dan dike dekha jay
  const setPos = (v: number) => {
    if (afterRef.current) afterRef.current.style.clipPath = `inset(0 0 0 ${v}%)`;
    if (handleRef.current) handleRef.current.style.left = `${v}%`;
    if (inputRef.current) inputRef.current.value = String(v);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    setPos(100);

    const ctx = gsap.context(() => {
      gsap.from(".ba-head", {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".ba-title", start: "top 85%" },
      });

      // intro: slider 100 theke 50 e ashe, visitor bujhe eta drag kora jay
      const state = { v: 100 };
      gsap.to(state, {
        v: 50,
        duration: 1.8,
        ease: "power3.inOut",
        onUpdate: () => setPos(state.v),
        scrollTrigger: { trigger: ".ba-frame", start: "top 70%", once: true },
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative w-full bg-[#0d0c0b] px-6 py-24 uppercase text-[#F6F5F4] lg:px-28 lg:py-40"
    >
      <div className="ba-title mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="font-serif text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-[100px]">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="ba-head block">Before</span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="ba-head block">&amp; After</span>
          </span>
        </h2>
        <p className="overflow-hidden text-xs font-medium tracking-[0.3em] text-white/50">
          <span className="ba-head block">{data.project}</span>
        </p>
      </div>

      <div className="ba-frame relative aspect-[4/5] w-full select-none overflow-hidden bg-black sm:aspect-[16/10]">
        {/* Before (niche) */}
        <Image src={data.before} alt="Before renovation" fill sizes="100vw" className="object-cover" />

        {/* After (upore, clip-path diye dekhano) */}
        <div ref={afterRef} className="absolute inset-0">
          <Image src={data.after} alt="After renovation" fill sizes="100vw" className="object-cover" />
        </div>

        {/* Labels */}
        <span className="pointer-events-none absolute left-4 top-4 bg-black/60 px-3 py-2 text-[10px] font-semibold tracking-[0.25em] lg:left-8 lg:top-8">
          Before
        </span>
        <span className="pointer-events-none absolute right-4 top-4 bg-[#F6F5F4] px-3 py-2 text-[10px] font-semibold tracking-[0.25em] text-black lg:right-8 lg:top-8">
          After
        </span>

        {/* Handle */}
        <div
          ref={handleRef}
          className="pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-[#F6F5F4]"
        >
          <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#F6F5F4] text-xs text-black">
            ◀ ▶
          </div>
        </div>

        {/* Drag + keyboard: native range input, accessible */}
        <input
          ref={inputRef}
          type="range"
          min={0}
          max={100}
          step={0.1}
          defaultValue={100}
          aria-label="Before and after comparison"
          onInput={(e) => setPos(Number(e.currentTarget.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </section>
  );
}