"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, Variants, easeOut } from "framer-motion";
import { ArrowRight, PhoneCall, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/* --- video card: hover play + click to pin + mute toggle --- */
function VideoCard({
  src,
  poster,
  className = "",
  controlsAlign = "right",
}: {
  src: string;
  poster?: string;
  className?: string;
  controlsAlign?: "left" | "right";
}) {
  const vidRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);

  const play = useCallback(() => {
    if (!vidRef.current) return;
    vidRef.current.muted = muted;
    vidRef.current.play().catch(() => {});
  }, [muted]);

  const pauseAndReset = useCallback(() => {
    if (!vidRef.current) return;
    vidRef.current.pause();
    vidRef.current.currentTime = 0;
  }, []);

  const onEnter = useCallback(() => {
    setHovered(true);
    if (!pinned) play();
  }, [pinned, play]);

  const onLeave = useCallback(() => {
    setHovered(false);
    if (!pinned) pauseAndReset();
  }, [pinned, pauseAndReset]);

  const toggleMute = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!vidRef.current) return;
      const next = !muted;
      setMuted(next);
      vidRef.current.muted = next;
      vidRef.current.play().catch(() => {});
    },
    [muted]
  );

  const togglePinned = useCallback(() => {
    setPinned((prev) => {
      const next = !prev;
      if (next) play();
      else if (!hovered) pauseAndReset();
      return next;
    });
  }, [hovered, pauseAndReset, play]);

  return (
    <div
      className={`relative w-full h-full ${className}`}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onClick={togglePinned}
    >
      <video
        ref={vidRef}
        src={src}
        poster={poster}
        muted={muted}
        playsInline
        loop
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {(hovered || pinned) && (
        <div
          className={`absolute bottom-2 ${
            controlsAlign === "left" ? "left-2" : "right-2"
          } z-30 flex items-center gap-2`}
        >
          <button
            type="button"
            onClick={toggleMute}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm hover:bg-black/70"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}

/* --- animation presets --- */
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

export default function Hero() {
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
        {/* BG 2: soft washes */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-40">
          <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_48%_40%,rgba(255,255,255,0.60),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_70%_55%,rgba(58,196,236,0.22),transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_12%_12%,rgba(138,92,255,0.18),transparent_60%)]" />
        </div>

        {/* CONTENT WRAPPER */}
        <div className="relative flex min-h-[82vh] items-center pt-[clamp(88px,10vh,128px)]">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 py-8 md:py-10 lg:py-12 md:place-items-center">
              {/* LEFT (text) */}
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

                {/* Buttons */}
                <motion.nav
                  className="mt-7 flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-3"
                  variants={textItem}
                >
                  <Link
                    href="#book"
                    aria-label="Book a free call"
                    className="btn-base btn-gradient text-white shadow-md hover:shadow-lg"
                  >
                    <PhoneCall className="size-4 shrink-0" />
                    Book Free Call
                  </Link>

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

              {/* RIGHT (videos) */}
              <figure aria-hidden className="w-full">
                {/* MOBILE row */}
                <motion.div
                  className="md:hidden flex items-center justify-center gap-3 pt-4"
                  variants={cardsGroup}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div variants={cardItem} custom={-4}>
                    <div className="device-m relative">
                      <VideoCard src="/images/v1.mp4" controlsAlign="left" />
                    </div>
                  </motion.div>

                  <motion.div variants={cardItem} custom={0}>
                    <div className="device-m relative">
                      <VideoCard src="/images/v2.mp4" />
                    </div>
                  </motion.div>

                  <motion.div variants={cardItem} custom={4}>
                    <div className="device-m relative">
                      <VideoCard src="/images/v3.mp4" />
                    </div>
                  </motion.div>
                </motion.div>

                {/* DESKTOP stack */}
                <motion.div
                  className="hidden md:block relative mx-auto h-[360px] lg:h-[440px]"
                  variants={cardsGroup}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div
                    variants={cardItem}
                    custom={-8}
                    className="absolute left-6 lg:left-10 top-2 rotate-[-8deg] float-soft z-10"
                  >
                    <div className="device relative">
                      <VideoCard src="/images/v1.mp4" controlsAlign="left" />
                    </div>
                  </motion.div>

                  <motion.div
                    variants={cardItem}
                    custom={8}
                    className="absolute right-6 lg:right-10 top-1 rotate-[8deg] float-soft z-10"
                  >
                    <div className="device relative">
                      <VideoCard src="/images/v2.mp4" />
                    </div>
                  </motion.div>

                  <motion.div
                    variants={cardItem}
                    custom={0}
                    className="absolute left-1/2 -translate-x-1/2 top-8 shadow-xl z-20"
                  >
                    <div className="device relative">
                      <VideoCard src="/images/v3.mp4" />
                    </div>
                  </motion.div>
                </motion.div>
              </figure>
            </div>
          </div>
        </div>

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

          .text-shine,
          .text-gradient {
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

          .btn-gradient {
            background-image: var(--brand-gradient);
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
            background-image: var(--brand-gradient);
            -webkit-mask: linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            z-index: -1;
            background-size: 200% auto;
            animation: shine 2.6s linear infinite;
          }

          /* Remove video frame borders */
          .device-frame,
          .device-frame-mobile {
            padding: 0;
            border-radius: 0;
            background: transparent;
            box-shadow: none;
            backdrop-filter: none;
          }

          .device,
          .device-m {
            --device-ar: 9 / 19;
            position: relative;
            width: clamp(120px, 11vw, 160px);
            aspect-ratio: var(--device-ar);
            border-radius: 1.1rem;
            overflow: hidden;
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
        `}</style>
      </motion.section>
    </AnimatePresence>
  );
}
