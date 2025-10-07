// app/components/BuildFutureCTA.tsx
"use client";

import Link from "next/link";
import { motion, AnimatePresence, Variants, easeOut } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React from "react";

/* ---------- animations (vertical, same feel as others) ---------- */
const ease = [0.22, 1, 0.36, 1] as const;
const sectionEnter: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
  exit: { opacity: 0, y: -24, transition: { duration: 0.35, ease } },
};
const textStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const textItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
};

export default function BuildsiteCTA({
  href = "/launchyoursite", // <— set your showcase route here (e.g. "/websites" or "/showcase")
}: {
  href?: string;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.section
        aria-label="Build Your Future CTA"
        className="bg-white"
        variants={sectionEnter}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-[72px] sm:py-[96px] text-center">
          <motion.div variants={textStagger} initial="hidden" animate="show">
            <motion.p
              className="text-[15px] sm:text-[16px] text-gray-600"
              variants={textItem}
            >
              See what’s possible for your brand
            </motion.p>

            <motion.h2
              className="mt-3 font-extrabold tracking-tight leading-tight"
              variants={textItem}
            >
              <span className="block text-[clamp(26px,5.2vw,44px)] text-neutral-900 md:text-5xl">
                Websites that{" "}
                <span className="text-shine bg-clip-text text-transparent">
                  converts
                </span>
              </span>
            </motion.h2>

            <motion.p
              className="mt-3 text-[15px] sm:text-[16px] text-gray-600"
              variants={textItem}
            >
              Browse real projects built for startups & businesses. If you like
              what you see, we’ll build yours next.
            </motion.p>

            <motion.div className="mt-6" variants={textItem}>
              <Link
                href={href}
                className="btn-base btn-gradient text-white shadow-md hover:shadow-lg"
                aria-label="View our websites showcase"
              >
                View our websites
                <ArrowRight className="size-4 ml-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* theme utilities so this can live standalone */}
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
          .btn-base {
            height: 44px;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding-inline: 1.25rem;
            border-radius: 9999px;
            font-weight: 600;
            font-size: 0.9rem;
            line-height: 1;
          }
          .btn-gradient {
            background-image: var(--brand-gradient);
            background-size: 200% auto;
            transition: background-position 0.6s ease, box-shadow 0.25s ease,
              transform 0.12s ease;
            will-change: background-position;
            background-position: 0% center;
          }
          .btn-gradient:hover {
            background-position: 100% center;
          }
          @media (hover: none) and (pointer: coarse) {
            .btn-gradient {
              animation: shine 2.6s linear infinite;
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .text-shine,
            .btn-gradient {
              animation: none !important;
            }
          }
        `}</style>
      </motion.section>
    </AnimatePresence>
  );
}
