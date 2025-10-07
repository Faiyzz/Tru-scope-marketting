// app/components/BuildFutureCTA.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, Variants, easeOut } from "framer-motion";
import { ArrowRight, X as CloseIcon } from "lucide-react";

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

/* ---------- Booking Modal (gradient outline, same vibe as other CTAs) ---------- */
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
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
        {/* Gradient outline shell */}
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

export default function BuildFutureCTA() {
  const [open, setOpen] = useState(false);
  const bookingUrl =
    "https://api.leadconnectorhq.com/widget/booking/Ky3SDrjMdqqFvoZtt5m9"; // same as Hero

  useEffect(() => {
    if (open) document.body.classList.add("overflow-hidden", "modal-open");
    else document.body.classList.remove("overflow-hidden", "modal-open");
    return () =>
      document.body.classList.remove("overflow-hidden", "modal-open");
  }, [open]);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

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
              Need a website for your business or startup?
            </motion.p>

            {/* Match headline size/style with other sections */}
            <motion.h2
              className="mt-3 font-extrabold tracking-tight leading-tight"
              variants={textItem}
            >
              <span className="block text-[clamp(26px,5.2vw,44px)] text-neutral-900">
                Let’s{" "}
                <span className="text-shine bg-clip-text text-transparent">
                  Build
                </span>{" "}
                Your Future
              </span>
            </motion.h2>

            <motion.div className="mt-6" variants={textItem}>
              <button
                type="button"
                onClick={openModal}
                className="btn-base btn-gradient text-white shadow-md hover:shadow-lg"
                aria-label="Request a Free Quote"
              >
                Request a Free Quote
                <ArrowRight className="size-4 ml-1" />
              </button>
            </motion.div>
          </motion.div>
        </div>

        <BookingModal
          open={open}
          onClose={closeModal}
          bookingUrl={bookingUrl}
        />

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
          /* hide fixed navbar while modal open */
          body.modal-open header[role="banner"] {
            visibility: hidden;
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
