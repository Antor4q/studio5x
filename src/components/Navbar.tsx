"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

const links = [
  { label: "Home", href: "/", image: "/images/ina-04.jpg" },
  { label: "Work", href: "/work", image: "/images/ina-04.jpg" },
  { label: "About", href: "/about", image: "/images/ina-04.jpg" },
  { label: "Services", href: "/services", image: "/images/ina-04.jpg" },
  { label: "Contact", href: "/contact", image: "/images/ina-04.jpg" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const lastY = useRef(0);
  const hidden = useRef(false);
  const openRef = useRef(false);

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  // menu timeline
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const ctx = gsap.context(() => {
      gsap.set(overlay, { clipPath: "inset(0% 0% 100% 0%)", pointerEvents: "none" });

      tlRef.current = gsap
        .timeline({
          paused: true,
          onStart: () => {
            gsap.set(overlay, { pointerEvents: "auto" });
          },
          onReverseComplete: () => {
            gsap.set(overlay, { pointerEvents: "none" });
          },
        })
        .to(overlay, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power4.inOut" })
        .fromTo(
          ".menu-link",
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.08 },
          "-=0.45"
        )
        .fromTo(
          ".menu-image",
          { clipPath: "inset(0% 0% 0% 100%)", scale: 1.15 },
          { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.1, ease: "power4.out" },
          "-=0.9"
        )
        .fromTo(
          ".menu-meta",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.5"
        );
    }, overlay);

    return () => ctx.revert();
  }, []);

  // open / close
  useEffect(() => {
    openRef.current = open;

    if (open) {
      // menu open thakle nav hide hobe na
      hidden.current = false;
      if (navRef.current) {
        gsap.to(navRef.current, { yPercent: 0, duration: 0.3, overwrite: "auto" });
      }
      tlRef.current?.timeScale(1).play();
    } else {
      tlRef.current?.timeScale(1.4).reverse();
    }
  }, [open]);

  // menu open thakle page scroll block, kintu scrollbar jemon ache temon thakbe
  useEffect(() => {
    if (!open) return;

    const stop = (e: Event) => e.preventDefault();
    window.addEventListener("wheel", stop, { passive: false });
    window.addEventListener("touchmove", stop, { passive: false });

    return () => {
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchmove", stop);
    };
  }, [open]);

  // ESC diye close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // entrance + hide/show on scroll
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const ctx = gsap.context(() => {
      gsap.from(nav, { yPercent: -100, opacity: 0, duration: 0.8, ease: "power3.out" });
    }, nav);

    const onScroll = () => {
      if (openRef.current) return;

      const y = window.scrollY;
      const delta = y - lastY.current;
      if (Math.abs(delta) < 6) return;

      if (delta > 0 && y > 80 && !hidden.current) {
        hidden.current = true;
        gsap.to(nav, { yPercent: -100, duration: 0.45, ease: "power3.inOut", overwrite: "auto" });
      } else if (delta < 0 && hidden.current) {
        hidden.current = false;
        gsap.to(nav, { yPercent: 0, duration: 0.45, ease: "power3.out", overwrite: "auto" });
      }

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      ctx.revert();
    };
  }, []);

  return (
    <>
      {/* Fullscreen menu overlay */}
      <div
        ref={overlayRef}
        aria-hidden={!open}
        className="fixed inset-0 z-[90] grid bg-black text-white [clip-path:inset(0_0_100%_0)] lg:grid-cols-2"
      >
        {/* Left: links */}
        <div className="flex flex-col justify-between px-6 pb-10 pt-32 lg:px-28 lg:pb-14">
          <ul className="flex flex-col gap-2">
            {links.map((item, i) => (
              <li key={item.label} className="overflow-hidden">
                {/* menu-link: GSAP entrance transform ekhane, hover flip bhitorer span e */}
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  onMouseEnter={() => setActive(i)}
                  className="menu-link group/link block"
                >
                  <span className="relative block overflow-hidden pb-1 text-5xl font-semibold uppercase leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
                    {/* initially: kom opacity, hover e upore flip hoye berhiye jay */}
                    <span className="block text-white/40 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/link:-translate-y-full">
                      {item.label}
                    </span>

                    {/* hover e: niche theke flip hoye ashe, full white */}
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 block translate-y-full text-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/link:translate-y-0"
                    >
                      {item.label}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="menu-meta flex items-center justify-between text-xs uppercase tracking-widest text-white/60">
            <a href="mailto:hello@studio5x.com" className="hover:text-white">
              hello@studio5x.com
            </a>
            <span>© {new Date().getFullYear()} studio5x</span>
          </div>
        </div>

        {/* Right: big image */}
        <div className="relative hidden h-full w-full p-6 pl-0 lg:block lg:pt-28">
          <div className="menu-image relative h-full w-full overflow-hidden rounded-sm bg-black">
            {links.map((item, i) => (
              <Image
                key={item.label}
                src={item.image}
                alt={item.label}
                fill
                sizes="50vw"
                priority={i === 0}
                className={`object-cover transition-opacity duration-700 ${
                  active === i ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navbar */}
      <header
        ref={navRef}
        className="fixed inset-x-0 top-0 z-[100] w-full bg-transparent px-6 py-6 lg:px-28"
      >
        <nav className="flex w-full items-center justify-between text-white">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-2xl font-semibold tracking-tight"
          >
            studio5x
          </Link>

          <div className="flex items-center gap-8">
            {/* menu open hole hide, overlay te already Contact ache */}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className={`text-sm font-medium uppercase tracking-widest transition-opacity duration-300 hover:opacity-60 ${
                open ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              Contact
            </Link>

            {/* Text-only toggle: Menu <-> Close */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="text-sm font-medium uppercase tracking-widest"
            >
              <span className="grid overflow-hidden leading-[1.4]">
                <span
                  className={`col-start-1 row-start-1 transition-transform duration-500 ease-in-out ${
                    open ? "-translate-y-full" : "translate-y-0"
                  }`}
                >
                  Menu
                </span>
                <span
                  className={`col-start-1 row-start-1 transition-transform duration-500 ease-in-out ${
                    open ? "translate-y-0" : "translate-y-full"
                  }`}
                >
                  Close
                </span>
              </span>
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}