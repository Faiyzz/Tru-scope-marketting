// components/Hero.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, Variants, easeOut } from "framer-motion";
import { ArrowRight, PhoneCall, X as CloseIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/* ===========================
   Booking Modal (Portal)
   =========================== */
function BookingModal({
  open,
  onClose,
  bookingUrl,
}: {
  open: boolean;
  onClose: () => void;
  bookingUrl: string;
}) {
  // Close on Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open || typeof window === "undefined") return null;

  const modal = (
    <div className="fixed inset-0 z-[20000]" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Centered wrapper with padding = gap from all sides */}
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Panel */}
        <div
          className="
            flex w-full max-w-6xl
            bg-white shadow-2xl rounded-xl sm:rounded-2xl overflow-hidden
            flex-col
          "
          style={{
            height: "min(92svh, 900px)",
            maxHeight:
              "calc(100svh - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px) - 2rem)",
            width: "min(96vw, 1100px)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <p className="text-sm font-medium">Book a Free Consultation</p>
            <button
              onClick={onClose}
              aria-label="Close booking"
              className="p-2 rounded-full hover:bg-neutral-100"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 min-h-0">
            <iframe
              src={bookingUrl}
              title="Booking Widget"
              className="block w-full h-full bg-white"
              style={{ border: "none" }}
              scrolling="auto"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Render outside app tree to avoid header/nav stacking contexts
  return createPortal(modal, document.body);
}

/* ---------- tiny util: hover-to-play video ---------- */
function HoverVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const play = useCallback(() => ref.current?.play(), []);
  const stop = useCallback(() => {
    if (!ref.current) return;
    ref.current.pause();
    ref.current.currentTime = 0;
  }, []);
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      playsInline
      loop
      preload="metadata"
      onMouseEnter={play}
      onMouseLeave={stop}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  );
}

/* ---------- animation presets ---------- */
const ease = [0.22, 1, 0.36, 1] as const;

const sectionEnter: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease },
  },
  exit: { opacity: 0, y: -24, transition: { duration: 0.35, ease } },
};

const textGroup: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const textItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
};

const cardsGroup: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.25 },
  },
};

const cardItem: Variants = {
  hidden: (custom: number = 0) => ({
    opacity: 0,
    y: 16,
    scale: 0.96,
    rotate: custom,
  }),
  show: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: custom,
    transition: { duration: 0.6, ease },
  }),
};

/* ---------- constants ---------- */
const GHL_WIDGET_ID = "Ky3SDrjMdqqFvoZtt5m9";
const BOOKING_URL = `https://api.leadconnectorhq.com/widget/booking/${GHL_WIDGET_ID}`;

export default function Hero() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <AnimatePresence mode="wait">
      <motion.section
        role="banner"
        aria-label="Crafting stories that connect and inspire"
        className="hero relative isolate overflow-hidden bg-white text-gray-900 min-h-screen"
        variants={sectionEnter}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        {/* BG 1: Curve */}
        <div className="absolute inset-0 -z-50 ">
          <div className="curve-pos absolute inset-0">
            <Image
              src="/images/curve.png"
              alt="Decorative curved gradient background"
              fill
              priority
              sizes="100vw"
              className="object-cover md:object-contain"
            />
          </div>
        </div>

        {/* BG 2: soft washes */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-40">
          <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_48%_40%,rgba(255,255,255,0.60),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_70%_55%,rgba(58,196,236,0.22),transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_12%_12%,rgba(138,92,255,0.18),transparent_60%)]" />
        </div>

        {/* CONTENT */}
        <div className="relative flex min-h-[82vh] items-center pt-[clamp(88px,10vh,128px)]">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 py-8 md:py-10 lg:py-12 md:place-items-center">
              {/* LEFT */}
              <motion.header
                className="max-w-2xl mx-auto text-center md:text-left"
                variants={textGroup}
                initial="hidden"
                animate="show"
              >
                <motion.h1 className="tracking-tight" variants={textItem}>
                  <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05]">
                    Content that{" "}
                    <span className="text-shine bg-clip-text text-transparent">
                      Scales
                    </span>
                  </span>
                  <span className="mt-1 block text-4xl sm:text-4xl md:text-x6l lg:text-7xl font-semibold">
                    Growth that{" "}
                    <span className="text-shine bg-clip-text text-transparent">
                      Lasts
                    </span>
                  </span>
                </motion.h1>

                <motion.p
                  className="mt-5 text-base sm:text-lg md:text-xl text-gray-700/90"
                  variants={textItem}
                >
                  Turning ideas into impactful digital experiences.
                </motion.p>

                <motion.p
                  className="mt-4 text-[0.95rem] leading-7 text-gray-700 max-w-prose mx-auto md:mx-0"
                  variants={textItem}
                >
                  We help brands and creators bring their vision to life through
                  captivating content, innovative storytelling, and design that
                  leaves a lasting impression.
                </motion.p>

                {/* CTAs */}
                <motion.nav
                  className="mt-7 flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-3"
                  variants={textItem}
                >
                  <button
                    type="button"
                    onClick={() => setBookingOpen(true)}
                    aria-label="Book a free call"
                    className="btn-base btn-gradient text-white shadow-md hover:shadow-lg"
                  >
                    <PhoneCall className="size-4 shrink-0" />
                    Book Free Call
                  </button>

                  <Link
                    href="#services"
                    aria-label="Explore our services"
                    className="btn-base btn-gradient-outline bg-white/90 backdrop-blur"
                  >
                    <span className="text-gradient">Explore Our Services</span>
                    <ArrowRight className="size-4 shrink-0" />
                  </Link>
                </motion.nav>
              </motion.header>

              {/* RIGHT */}
              <figure aria-hidden className="w-full">
                {/* MOBILE row */}
                <motion.div
                  className="md:hidden flex items-center justify-center gap-3 pt-4"
                  variants={cardsGroup}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div
                    variants={cardItem}
                    custom={-4}
                    className="device-frame"
                  >
                    <div className="device-m relative">
                      <HoverVideo src="/images/v1.mp4" poster="" />
                    </div>
                  </motion.div>
                  <motion.div
                    variants={cardItem}
                    custom={0}
                    className="device-frame"
                  >
                    <div className="device-m relative">
                      <HoverVideo src="/images/v2.mp4" poster="" />
                    </div>
                  </motion.div>
                  <motion.div
                    variants={cardItem}
                    custom={4}
                    className="device-frame"
                  >
                    <div className="device-m relative">
                      <HoverVideo src="/images/v3.mp4" poster="" />
                    </div>
                  </motion.div>
                </motion.div>

                {/* DESKTOP/TABLET stack */}
                <motion.div
                  className="hidden md:block relative mx-auto h-[360px] lg:h-[440px]"
                  variants={cardsGroup}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div
                    variants={cardItem}
                    custom={-8}
                    className="absolute left-6 lg:left-10 top-2 rotate-[-8deg] device-frame float-soft z-10"
                  >
                    <div className="device relative">
                      <HoverVideo src="/images/v1.mp4" poster="" />
                    </div>
                  </motion.div>

                  <motion.div
                    variants={cardItem}
                    custom={8}
                    className="absolute right-6 lg:right-10 top-1 rotate-[8deg] device-frame float-soft z-10"
                  >
                    <div className="device relative">
                      <HoverVideo src="/images/v2.mp4" poster="" />
                    </div>
                  </motion.div>

                  <motion.div
                    variants={cardItem}
                    custom={0}
                    className="absolute left-1/2 -translate-x-1/2 top-8 device-frame ring-2 ring-white/50 shadow-xl z-20"
                  >
                    <div className="device relative">
                      <HoverVideo src="/images/v3.mp4" poster="" />
                    </div>
                  </motion.div>
                </motion.div>
              </figure>
            </div>
          </div>
        </div>

        {/* Modal mounted at root (via portal) so it sits over nav */}
        <BookingModal
          open={bookingOpen}
          onClose={() => setBookingOpen(false)}
          bookingUrl={BOOKING_URL}
        />

        <style jsx global>{`
          :root {
            --brand-purple: #8a5cff;
            --brand-lilac: #b18cff;
            --brand-cyan: #3ac4ec;
          }

          .btn-base {
            height: 44px;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding-inline: 1.25rem;
            border-radius: 9999px;
            font-weight: 600;
            font-size: 0.875rem;
            line-height: 1;
          }
          @media (min-width: 640px) {
            .btn-base {
              padding-inline: 1.375rem;
            }
          }

          .text-shine {
            background-image: linear-gradient(
              100deg,
              var(--brand-purple) 8%,
              var(--brand-lilac) 28%,
              var(--brand-cyan) 58%,
              var(--brand-purple) 86%
            );
            background-size: 200% auto;
            animation: shine 2.6s linear infinite;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
          @keyframes shine {
            to {
              background-position: -200% center;
            }
          }

          .btn-gradient {
            background-image: linear-gradient(
              100deg,
              var(--brand-purple) 0%,
              var(--brand-lilac) 35%,
              var(--brand-cyan) 70%,
              var(--brand-purple) 100%
            );
            background-size: 200% auto;
            transition: background-position 0.6s ease, box-shadow 0.25s ease,
              transform 0.12s ease;
          }
          .btn-gradient:hover {
            background-position: 100% center;
          }
          .btn-gradient:active {
            transform: translateY(1px);
          }

          .btn-gradient-outline {
            position: relative;
            color: #111;
            isolation: isolate;
          }
          .btn-gradient-outline::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 9999px;
            padding: 1px;
            background-image: linear-gradient(
              100deg,
              var(--brand-purple) 0%,
              var(--brand-lilac) 35%,
              var(--brand-cyan) 70%,
              var(--brand-purple) 100%
            );
            -webkit-mask: linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            z-index: -1;
          }

          .text-gradient {
            background-image: linear-gradient(
              100deg,
              var(--brand-purple),
              var(--brand-lilac),
              var(--brand-cyan),
              var(--brand-purple)
            );
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent.;
          }

          .float-soft {
            animation: float 6s ease-in-out infinite;
          }
          @keyframes float {
            0%,
            100% {
              transform: translateY(0) rotate(var(--tw-rotate));
            }
            50% {
              transform: translateY(-10px) rotate(var(--tw-rotate));
            }
          }

          .device-frame {
            padding: 6px;
            border-radius: 1.4rem;
            background: linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.85),
              rgba(255, 255, 255, 0.25)
            );
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25),
              inset 0 1px 1px rgba(255, 255, 255, 0.35);
            backdrop-filter: blur(3px);
          }
          .device {
            --device-ar: 9 / 19;
            position: relative;
            width: clamp(120px, 11vw, 160px);
            aspect-ratio: var(--device-ar);
            border-radius: 1.1rem;
            overflow: hidden;
          }
          .device-m {
            position: relative;
            width: clamp(84px, 26vw, 110px);
            aspect-ratio: 9 / 18;
            border-radius: 1.1rem;
            overflow: hidden;
          }

          .hero {
            --curve-x: 2vw;
            --curve-y: -1vh;
            --curve-scale: 1;
          }
          .curve-pos {
            transform: translate(var(--curve-x), var(--curve-y))
              scale(var(--curve-scale));
            transform-origin: center;
          }
          @media (min-width: 640px) {
            .hero {
              --curve-x: 6vw;
              --curve-y: -1vh;
            }
          }
          @media (min-width: 1024px) {
            .hero {
              --curve-x: 18vw;
              --curve-y: -3vh;
              --curve-scale: 1.04;
            }
          }
          @media (min-width: 1280px) {
            .hero {
              --curve-x: 14vw;
              --curve-y: -2vh;
              --curve-scale: 1;
            }
          }
          @media (min-width: 1536px) {
            .hero {
              --curve-x: 0vw;
              --curve-y: -5vh;
              --curve-scale: 1;
            }
          }
        `}</style>
      </motion.section>
    </AnimatePresence>
  );
}
