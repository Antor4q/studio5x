
"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Ahmed",
    position: "Homeowner",
    company: "Private Residence",
    image: "/images/profile-1.jpg",
    rating: 5,
    review:
      "The team understood our vision from the very beginning. Every detail feels intentional, and the final space is even more beautiful than we imagined.",
  },
  {
    name: "Rahat Islam",
    position: "Founder & CEO",
    company: "Rahat Studio",
    image: "/images/profile-2.jpg",
    rating: 5,
    review:
      "Professional, creative, and incredibly detail-oriented. They transformed our ideas into a refined space while making the entire process smooth and enjoyable.",
  },
  {
    name: "Tasnim Rahman",
    position: "Creative Director",
    company: "TR Interiors",
    image: "/images/profile-3.jpg",
    rating: 5,
    review:
      "What impressed me most was their attention to materials, lighting, and functionality. The result feels timeless, elegant, and genuinely personal.",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const next = () => {
    setActive((current) => (current + 1) % testimonials.length);
  };

  const prev = () => {
    setActive(
      (current) =>
        (current - 1 + testimonials.length) % testimonials.length
    );
  };

  const testimonial = testimonials[active];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#0d0c0b] px-5 py-20 text-[#f3efe8] sm:px-8 sm:py-28 lg:px-16 lg:py-36"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end">
          <div>
            <span className="mb-5 block text-[10px] uppercase tracking-[0.35em] text-white/50 sm:text-xs">
              ( Testimonials )
            </span>

            <h2 className="max-w-3xl font-[var(--font-cormorant)] text-5xl leading-[0.95] sm:text-6xl md:text-7xl lg:text-[88px]">
              Words from
              <br />
              <span className="italic text-[#c8b9a5]">
                our clients.
              </span>
            </h2>
          </div>

          <div className="flex items-end justify-between gap-6 md:max-w-sm md:pb-2">
            <p className="max-w-xs text-xs leading-6 tracking-wide text-white/50 sm:text-sm sm:leading-7">
              Real experiences from people who trusted us to transform
              their spaces.
            </p>

            {/* Navigation */}
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors duration-300 hover:border-[#c8b9a5] hover:bg-[#c8b9a5] hover:text-[#0d0c0b] sm:h-12 sm:w-12"
              >
                <ArrowLeft size={17} strokeWidth={1.5} />
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors duration-300 hover:border-[#c8b9a5] hover:bg-[#c8b9a5] hover:text-[#0d0c0b] sm:h-12 sm:w-12"
              >
                <ArrowRight size={17} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => {
            const item =
              testimonials[(active + index) % testimonials.length];

            return (
              <article
                key={`${active}-${item.name}`}
                className={`group flex min-h-[350px] flex-col border border-white/10 bg-white/[0.015] p-6 transition-colors duration-500 hover:border-white/25 sm:min-h-[380px] sm:p-8 lg:p-9 ${
                  index === 2 ? "hidden lg:flex" : ""
                }`}
              >
                {/* Rating */}
                <div className="mb-8 flex items-center justify-between">
                  <div
                    className="flex gap-1"
                    aria-label={`${item.rating} out of 5 stars`}
                  >
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-[#c8b08a] text-[#c8b08a]"
                        strokeWidth={1}
                      />
                    ))}
                  </div>

                  <Quote
                    size={24}
                    strokeWidth={1}
                    className="text-white/20 transition-colors duration-300 group-hover:text-[#c8b08a]"
                  />
                </div>

                {/* Review */}
                <p className="flex-1 font-[var(--font-cormorant)] text-[25px] leading-[1.35] text-white/90 sm:text-[28px] lg:text-[30px]">
                  “{item.review}”
                </p>

                <div className="my-7 h-px w-full bg-white/10" />

                {/* Profile */}
                <div className="flex items-center gap-4">
                  <div className="relative h-[58px] w-[58px] shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5 sm:h-16 sm:w-16">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm tracking-wide text-white sm:text-base">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/50 sm:text-[11px]">
                      {item.position}
                    </p>

                    <p className="mt-1 truncate text-xs text-white/35">
                      {item.company}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer / Pagination */}
        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6 sm:mt-10">
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/35 sm:text-xs">
            Client stories
          </span>

          <div className="flex items-center gap-4">
            <span className="font-[var(--font-cormorant)] text-xl">
              {String(active + 1).padStart(2, "0")}
            </span>

            <div className="h-px w-12 bg-white/25 sm:w-20">
              <div
                className="h-px bg-[#c8b08a] transition-all duration-500"
                style={{
                  width: `${((active + 1) / testimonials.length) * 100}%`,
                }}
              />
            </div>

            <span className="text-xs text-white/35">
              {String(testimonials.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
