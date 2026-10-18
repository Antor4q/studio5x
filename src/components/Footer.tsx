"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// placeholder, nijer studio info diye replace koro
const STUDIO = "Studio Name";
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
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  const linkCls =
    "inline-block transition-colors duration-300 hover:text-white text-white/60";

  return (
    <footer
      ref={rootRef}
      className="relative w-full overflow-hidden bg-[#0d0c0b] px-6 pt-20 text-[#F6F5F4] lg:px-28 lg:pt-28"
    >
      <div className="grid gap-12 text-xs font-medium uppercase tracking-[0.25em] sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3 text-white/60">
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
                <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 text-white/60">
          <p className="text-white">Say hello</p>
          <a href="mailto:hello@yourstudio.com" className={`${linkCls} normal-case tracking-normal text-sm`}>
            hello@yourstudio.com
          </a>
        </div>
      </div>

      {/* Big name */}
      <div className="ft-name mt-20 overflow-hidden lg:mt-28">
        <h2
          aria-label={STUDIO}
          className="ft-name-inner block whitespace-nowrap text-center font-serif font-bold uppercase leading-[0.8] tracking-tight"
          style={{ fontSize: "clamp(3rem, 15.5vw, 16rem)" }}
        >
          {STUDIO}
        </h2>
      </div>

      <div className="flex flex-col gap-2 py-8 text-[10px] font-medium uppercase tracking-[0.25em] text-white/40 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {STUDIO}. All rights reserved.</p>
        <p>Dhaka, Bangladesh</p>
      </div>
    </footer>
  );
}