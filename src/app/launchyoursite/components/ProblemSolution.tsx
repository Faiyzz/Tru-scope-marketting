"use client";

import { motion, Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const fromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

const fromRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

export default function ProblemSolution() {
  return (
    <section
      id="problem-solution"
      className="relative isolate bg-white text-[#0f172a] scroll-mt-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Title like the mock */}
        <div className="mb-10 sm:mb-14">
          <h2 className="text-[clamp(26px,5.2vw,46px)] font-extrabold tracking-tight leading-tight">
            PROBLEM <span className="mx-1">&amp;</span>{" "}
            <span className="bg-clip-text text-transparent text-shine">
              SOLUTION
            </span>
          </h2>
        </div>

        {/* Two-column layout (stack on mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Problem (simple text block with pill) */}
          <motion.div
            variants={fromLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="relative"
          >
            <div className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 shadow-sm ring-1 ring-slate-200">
              <span className="text-[13px] font-semibold tracking-wide bg-clip-text text-transparent text-shine">
                The Problem
              </span>
            </div>

            <div className="mt-5 max-w-md">
              <p className="text-[clamp(14px,1.05vw,18px)] font-semibold text-slate-800/90">
                Digital Presence Without Soul or Speed.
              </p>
              <p className="mt-2 text-[clamp(13px,1vw,16px)] text-slate-600/90 leading-relaxed">
                Most businesses settle for slow, insecure, and uninspired
                digital presences. Poor design and performance hold them back
                from scaling.
              </p>
            </div>
          </motion.div>

          {/* Right: Solution (raised card like the screenshot) */}
          <motion.div
            variants={fromRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="relative"
          >
            <div className="relative rounded-3xl bg-white px-6 py-6 sm:px-8 sm:py-8 shadow-[0_22px_50px_-12px_rgba(16,24,40,0.18)] ring-1 ring-slate-200">
              {/* floating pill header */}
              <div className="-mt-10 mb-4 flex justify-center">
                <div className="inline-flex items-center rounded-full bg-white px-5 py-2 shadow-md ring-1 ring-slate-200">
                  <span className="text-[13px] font-bold tracking-wide bg-clip-text text-transparent text-shine">
                    Our Solution
                  </span>
                </div>
              </div>

              {/* body */}
              <h3 className="text-center text-[clamp(16px,1.2vw,20px)] font-extrabold text-slate-900">
                We Build Brands That Feel as Good as They Perform.
              </h3>
              <p className="mt-2 text-center text-[clamp(13px,1vw,16px)] text-slate-600/90 leading-relaxed">
                We fuse design, engineering, and performance to craft immersive
                experiences — lightning-fast, rock-solid, and unforgettable.
              </p>

              {/* soft brand glow on card edges */}
              <div
                className="pointer-events-none absolute inset-0 -z-10 rounded-3xl"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(15,23,42,0.06), 0 30px 80px rgba(138,92,255,0.10), 0 10px 30px rgba(58,196,236,0.08)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Theme bits from your original component */}
      <style jsx global>{`
        :root {
          --brand-purple: #8a5cff;
          --brand-lilac: #b18cff;
          --brand-cyan: #3ac4ec;
          --brand-gradient: linear-gradient(
            100deg,
            var(--brand-purple) 8%,
            var(--brand-lilac) 28%,
            var(--brand-cyan) 58%,
            var(--brand-purple) 86%
          );
        }
        .text-shine {
          background-image: var(--brand-gradient);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shine 2.6s linear infinite;
        }
        @keyframes shine {
          to {
            background-position: -200% center;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .text-shine {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
