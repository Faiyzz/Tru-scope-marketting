// app/components/ScaleHero.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, Variants } from "framer-motion";
import { ArrowRight, X as CloseIcon } from "lucide-react";
import ProblemSolution from "./components/ProblemSolution";
import Capabilities from "./components/Capabilities";
import OurWork from "./components/OurWork";
import BuildFutureCTA from "./components/BuildFutureCTA";

const ease = [0.22, 1, 0.36, 1] as const;
const sectionEnter: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

/* ---------- Booking Modal ---------- */
function BookingModal({
  open,
  onClose,
  bookingUrl,
}: {
  open: boolean;
  onClose: () => void;
  bookingUrl: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !mounted) return null;

  const modal = (
    <div
      className="fixed inset-0 z-[999]"
      role="dialog"
      aria-modal="true"
      aria-label="Free consultation booking"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div>
          <div
            className="flex w-full bg-white rounded-[calc(theme(borderRadius.2xl))] overflow-hidden flex-col"
            style={{
              height: "min(92svh, 900px)",
              maxHeight:
                "calc(100svh - env(safe-area-inset-top,0px) - env(safe-area-inset-bottom,0px) - 2rem)",
              width: "min(96vw, 1100px)",
            }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <p className="text-sm font-medium">Request a Free Quote</p>
              <button
                onClick={onClose}
                aria-label="Close booking"
                className="p-2 rounded-full hover:bg-neutral-100"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 min-h-0">
              <iframe
                src={bookingUrl}
                title="Booking Widget"
                className="block w-full h-full"
                style={{ border: "none" }}
                scrolling="auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

/* ---------- Hero Section ---------- */
export default function ScaleHero() {
  const [open, setOpen] = useState(false);
  const bookingUrl =
    "https://api.leadconnectorhq.com/widget/booking/Ky3SDrjMdqqFvoZtt5m9";

  useEffect(() => {
    if (open) document.body.classList.add("overflow-hidden", "modal-open");
    else document.body.classList.remove("overflow-hidden", "modal-open");
    return () =>
      document.body.classList.remove("overflow-hidden", "modal-open");
  }, [open]);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  return (
    <section id="launch" className="relative">
      <motion.section
        id="page"
        role="banner"
        aria-label="Hero"
        className="relative isolate overflow-hidden bg-white text-[#0f172a] scroll-mt-28"
        variants={sectionEnter}
        initial="hidden"
        animate="show"
      >
        {/* --- Fullscreen centered hero content --- */}
        <div className="min-h-[100svh] grid place-items-center">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
            {/* --- Animated main heading (word-by-word + spaced letters) --- */}
            <motion.h1
              className="text-[clamp(28px,6vw,56px)] font-extrabold tracking-[0.06em] leading-[1.08]"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.06, delayChildren: 0.05 },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {[
                { t: "Where", g: false },
                { t: "Bold", g: true },
                { t: "Ideas", g: false },
                { t: "Meet", g: false },
                { t: "Scalable", g: true },
                { t: "Digital", g: false },
                { t: "Solutions", g: false },
              ].map(({ t, g }, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.45, ease },
                    },
                  }}
                  className={`inline-block px-[0.2ch] ${
                    g ? "shine-slice" : "text-[#0f172a]"
                  }`}
                >
                  {t}
                  {i < 6 ? " " : ""}
                </motion.span>
              ))}
            </motion.h1>

            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-slate-900/70" />

            <p className="mt-6 font-bold tracking-tight leading-[1.05] text-[clamp(30px,5.4vw,52px)]">
              <span className="text-shine bg-clip-text text-transparent">
                TRUESCOPE
              </span>
            </p>

            <p className="mx-auto mt-5 max-w-3xl text-[clamp(14px,1.2vw,18px)] text-slate-700/90">
              We craft websites that don&apos;t just work — they scale, adapt,
              and empower you to move faster, smarter, and bolder.
            </p>

            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={openModal}
                className="btn-base btn-gradient text-white shadow-md hover:shadow-lg"
                aria-label="Request a Free Quote"
              >
                Get a Free Quote
                <ArrowRight className="size-4 ml-1" />
              </button>
            </div>
          </div>
        </div>

        {/* --- Global styles for shine & gradient buttons --- */}
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
          .shine-slice {
            background-image: var(--brand-gradient);
            background-size: 220% auto;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: shine-slice-move 2.8s linear infinite;
          }
          @keyframes shine-slice-move {
            0% {
              background-position: 0% center;
            }
            100% {
              background-position: -220% center;
            }
          }
          .btn-base {
            height: 46px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding-inline: 1.25rem;
            border-radius: 9999px;
            font-weight: 700;
            font-size: 0.95rem;
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
            .btn-gradient,
            .shine-slice {
              animation: none !important;
            }
            .btn-gradient {
              transition: box-shadow 0.25s ease, transform 0.12s ease;
            }
          }
        `}</style>

        {/* Booking modal instance */}
        <BookingModal
          open={open}
          onClose={closeModal}
          bookingUrl={bookingUrl}
        />

        {/* Following sections */}
        <ProblemSolution />
        <Capabilities />
        <OurWork />
        <BuildFutureCTA />
      </motion.section>
    </section>
  );
}
