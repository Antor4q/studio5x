"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const title = "studio 5x";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // autoplay block na hoye tai manually muted kore play()
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.play().catch(() => {});
  }, []);

  // entrance animation
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.2 });

      // text gulo JS ashar age lukano chilo (invisible), ekhon dekhabo
      tl.set(".hero-line, .hero-char", { autoAlpha: 1 })
        // video: halka zoom-out
        .fromTo(".hero-video", { scale: 1.2 }, { scale: 1, duration: 2.4, ease: "power3.out" }, 0)
        // dark overlay: prothome beshi dark, dhire dhire normal
        .fromTo(".hero-overlay", { opacity: 1 }, { opacity: 0.5, duration: 1.8, ease: "power2.out" }, 0)
        // right side 2 line: mask er niche theke uthe ashe
        .fromTo(
          ".hero-line",
          { yPercent: 120 },
          { yPercent: 0, duration: 1.2, stagger: 0.15 },
          0.6
        )
        // big title: ekta ekta letter niche theke uthe ashe
        .fromTo(
          ".hero-char",
          { yPercent: 110, rotate: 4 },
          { yPercent: 0, rotate: 0, duration: 1.4, stagger: 0.06 },
          0.8
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative h-svh w-full overflow-hidden bg-black text-[#F6F5F4]"
    >
      {/* Background video: full bleed, navbar er pichone */}
      <video
        ref={videoRef}
        className="hero-video pointer-events-none absolute inset-0 h-full w-full object-cover"
        src="/images/bannervideo.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
      />

      {/* Dark overlay */}
      <div className="hero-overlay absolute inset-0 bg-black opacity-50" />

      {/* Content: navbar er height (pt-24 / lg:pt-28) bad diye baki jaygay */}
      <div className="relative z-10 flex h-full flex-col px-6 pb-6 pt-24 lg:px-28 lg:pb-10 lg:pt-28">
        {/* Right side: baki height er vertical center, 2 line text */}
        <div className="flex flex-1 items-center justify-end">
          <p className="font-sans text-xl font-semibold uppercase leading-[1.15] tracking-tight sm:text-2xl lg:text-4xl">
            <span className="block overflow-hidden">
              <span className="hero-line invisible block">where design meet data</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line invisible block">where ideas become built realities</span>
            </span>
          </p>
        </div>

        {/* Left bottom: big studio 5x, letter by letter */}
        {/* pb + -mb: mask er niche extra jayga, tai letter kete jabe na, layout same thakbe */}
        <h1
          aria-label={title}
          className="-mb-[0.2em] overflow-hidden pb-[0.2em] pt-[0.1em] font-serif text-[300px] font-bold leading-[0.85] tracking-tighter"
        >
          {title.split("").map((char, i) => (
            <span
              key={i}
              aria-hidden
              className="hero-char invisible inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}