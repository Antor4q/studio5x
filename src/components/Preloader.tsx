
"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let exitTimer: number;
    let removeTimer: number;
    let finished = false;

    const finishLoading = () => {
      if (finished) return;
      finished = true;

      window.clearTimeout(fallback);

      exitTimer = window.setTimeout(() => {
        setExiting(true);

        removeTimer = window.setTimeout(() => {
          setVisible(false);
        }, 1000);
      }, 1200);
    };

    const fallback = window.setTimeout(finishLoading, 6000);

    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading, { once: true });
    }

    return () => {
      window.removeEventListener("load", finishLoading);
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
      window.clearTimeout(fallback);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Loading studio 5x"
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#0d0c0b] transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        exiting ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Center Logo */}
      <div
        className={`flex items-center gap-2 sm:gap-3 transition-all duration-700 ease-out ${
          exiting
            ? "-translate-y-6 opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <span className="studio-word font-[var(--font-cormorant)] text-[clamp(1.6rem,5vw,3.5rem)] font-light tracking-[0.12em] text-white">
          studio 5x
        </span>


      </div>

      <style jsx>{`
        .studio-word,
        .studio-mark {
          animation: logoReveal 1.2s
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .studio-mark {
          animation-delay: 0.12s;
        }

        @keyframes logoReveal {
          from {
            opacity: 0;
            transform: translateY(24px);
            filter: blur(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .studio-word,
          .studio-mark {
            animation-duration: 0.01ms;
            animation-delay: 0ms;
          }
        }
      `}</style>
    </div>
  );
}
