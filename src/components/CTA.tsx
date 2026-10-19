
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CTA() {
  return (
    <section
      id="contact-cta"
      className="relative w-full overflow-hidden bg-[#0d0c0b] text-[#f3efe8]"
    >
      {/* Full-width Background */}
      <div className="group relative isolate flex min-h-[600px] w-full items-end overflow-hidden sm:min-h-[680px] lg:min-h-[760px]">
        <Image
          src="/images/se1.jpg"
          alt="Luxury contemporary interior"
          fill
          sizes="100vw"
          className="absolute inset-0 -z-30 object-cover object-center transition-transform duration-[1800ms] ease-out group-hover:scale-[1.03]"
        />

        {/* Cinematic Overlay */}
        <div className="absolute inset-0 -z-20 bg-black/35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/25 to-transparent" />

        {/* Full-width Content */}
        <div className="relative w-full px-5 pb-10 pt-36 sm:px-8 sm:pb-14 lg:px-28 lg:pb-16 lg:pt-44">
          {/* Top Label */}
          <div className="mb-8 flex items-center gap-3 sm:mb-10">
             <p className="overflow-hidden text-xs font-medium tracking-[0.3em] text-white/50">
            <span className="prc-head-inner block">
              ( How we work )
            </span>
          </p>
          </div>

          {/* Heading */}
          <h2 className="font-serif uppercase text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-[clamp(5rem,9vw,7.5rem)]">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="prc-head-inner block">Let&apos;s Create</span>
          </span>

          <span className="block overflow-hidden pb-[0.08em]">
            <span className="prc-head-inner block">Something New</span>
          </span>
        </h2>

          {/* Bottom Content */}
          <div className="mt-10 flex flex-col gap-8 border-t border-white/25 pt-6 sm:mt-14 sm:flex-row sm:items-end sm:justify-between sm:pt-8 lg:mt-16">
            <p className="max-w-sm text-xs leading-6 text-white/75 sm:text-sm sm:leading-7">
              Thoughtful spaces begin with a conversation. Tell us what
              you imagine, and let&apos;s bring it to life.
            </p>

            {/* Minimal Underline CTA */}
            <Link
              href="/contact"
              className="group/cta inline-flex w-fit items-center gap-5 self-start text-xs uppercase tracking-[0.18em] text-[#f3efe8] sm:self-auto"
            >
              <span className="relative py-2">
                Start a project
                <span className="absolute bottom-0 left-0 h-px w-full origin-left bg-[#d6c5ae] transition-transform duration-500 group-hover/cta:scale-x-50" />
              </span>

              <ArrowUpRight
                size={19}
                strokeWidth={1.3}
                className="transition-transform duration-300 group-hover/cta:-translate-y-1 group-hover/cta:translate-x-1"
              />
            </Link>
          </div>
        </div>

      

      
      </div>

    
    </section>
  );
}
