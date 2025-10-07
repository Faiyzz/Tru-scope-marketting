"use client";

import { motion, useReducedMotion } from "framer-motion";

type Item = { title: string; desc: string };

const BRAND_GRADIENT =
  "bg-[linear-gradient(90deg,#8A5CFF,40%,#B18CFF,75%,#3AC4EC)]";

const ITEMS: Item[] = [
  {
    title: "Next.js Web Apps",
    desc: "High-impact Next.js builds that ship fast and scale smoothly.",
  },
  {
    title: "Brand Identity & UI/UX",
    desc: "Cohesive identity, elegant UI, and conversion-focused UX.",
  },
  {
    title: "eCommerce Integration",
    desc: "Checkout flows, payments, and product ops—done right.",
  },
  {
    title: "CMS & Headless",
    desc: "Headless architectures with editor-friendly workflows.",
  },
  {
    title: "SEO Optimization",
    desc: "Technical SEO + content structure for discoverability.",
  },
  {
    title: "Ongoing Support",
    desc: "Reliable improvements, monitoring, and quick turnarounds.",
  },
  {
    title: "Performance",
    desc: "SSR/SSG setups, image/CDN strategy, and Core Web Vitals.",
  },
  {
    title: "Security",
    desc: "Hardened infra, auth, and best-practice reviews.",
  },
  {
    title: "Design",
    desc: "Pixel-perfect layouts with tasteful motion and polish.",
  },
];

export default function Capabilities() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="relative isolate bg-white text-[#0f172a] scroll-mt-28 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2
            id="capabilities-heading"
            className="text-[clamp(26px,5.2vw,44px)] font-extrabold tracking-tight leading-tight"
          >
            Our{" "}
            <span
              className={`bg-clip-text text-transparent text-shine ${BRAND_GRADIENT}`}
            >
              Capabilities
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-[clamp(14px,1.1vw,18px)] text-slate-700/90">
            Everything we build is designed for speed, scale, and stunning
            digital performance.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-5 sm:gap-6 md:gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it, i) => (
            <motion.article
              key={it.title}
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.05,
              }}
              className="relative rounded-2xl border border-black/10 bg-white/90 backdrop-blur-sm shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_40px_-18px_rgba(0,0,0,0.25)] transition-all duration-300 p-6 md:p-7"
            >
              <h3 className="text-lg md:text-xl font-semibold tracking-tight">
                {it.title}
              </h3>
              <p className="mt-2 text-sm md:text-[15px] leading-relaxed text-black/65">
                {it.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Gradient shine effect (same global styling as hero/problem-solution) */}
      <style jsx global>{`
        .text-shine {
          background-image: linear-gradient(
            100deg,
            #8a5cff 8%,
            #b18cff 28%,
            #3ac4ec 58%,
            #8a5cff 86%
          );
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
