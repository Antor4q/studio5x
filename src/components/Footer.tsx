"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STUDIO = "Studio 5X";
const nav = [
  { label: "Projects", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/contact" },
];
const socials = [
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "Facebook", href: "https://facebook.com/" },
  { label: "Behance", href: "https://behance.net/" },
];

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  // "Studio 5X" ke container er content width e fit kore
  useEffect(() => {
    const wrap = wrapRef.current;
    const name = nameRef.current;
    if (!wrap || !name) return;

    const fit = () => {
      const base = 100;
      name.style.fontSize = `${base}px`;
      const textW = name.scrollWidth;
      const available = wrap.clientWidth;
      if (!textW || !available) return;
      name.style.fontSize = `${(base * available) / textW}px`;
      ScrollTrigger.refresh();
    };

    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);

    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // big studio name niche theke uthe ashe
      gsap.from(".ft-name-inner", {
        yPercent: 100,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: { trigger: ".ft-name", start: "top 95%" },
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  const linkCls =
    "inline-block transition-colors duration-300 hover:text-white text-white/60";

  return (
    // padding ekhane, tai bhitorer shob section ek-i container width pay
    <footer
      ref={rootRef}
      className="relative w-full overflow-hidden bg-[#0d0c0b] px-5 pt-16 text-[#F6F5F4] sm:px-8 sm:pt-20 lg:px-28 lg:pt-28"
    >
      {/* Info grid */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 text-[11px] font-medium uppercase tracking-[0.2em] sm:text-xs sm:tracking-[0.25em] lg:grid-cols-4 lg:gap-12">
        <div className="col-span-2 space-y-3 text-white/60 lg:col-span-1">
          <p className="text-white">Studio</p>
          <p className="leading-relaxed">
            House 00, Road 00
            <br />
            Gulshan, Dhaka
            <br />
            Bangladesh
          </p>
        </div>

        <div className="space-y-3">
          <p>Explore</p>
          <ul className="space-y-3">
            {nav.map((n) => (
              <li key={n.label}>
                <Link href={n.href} className={linkCls}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <p>Follow</p>
          <ul className="space-y-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkCls}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 space-y-3 text-white/60 lg:col-span-1">
          <p className="text-white">Say hello</p>
          <a
            href="mailto:hello@yourstudio.com"
            className={`${linkCls} break-all normal-case tracking-normal text-sm`}
          >
            hello@yourstudio.com
          </a>
        </div>
      </div>

      {/* Big name: container width e fit */}
      <div
        ref={wrapRef}
        className="ft-name mt-16 w-full overflow-hidden sm:mt-20 lg:mt-28"
      >
        <h2
          ref={nameRef}
          aria-label={STUDIO}
          className="ft-name-inner block w-max whitespace-nowrap pb-[0.18em] pt-[0.08em] font-serif font-bold uppercase leading-[1] tracking-tight"
          style={{ fontSize: "12vw" }}
        >
          {STUDIO}
        </h2>
      </div>

      {/* Copyright */}
      <div className="flex flex-col gap-2 py-6 text-[10px] font-medium uppercase tracking-[0.2em] text-white/40 sm:flex-row sm:justify-between sm:py-8 sm:tracking-[0.25em]">
        <p>
          © {new Date().getFullYear()} {STUDIO}. All rights reserved.
        </p>
        <p>Dhaka, Bangladesh</p>
      </div>
    </footer>
  );
}