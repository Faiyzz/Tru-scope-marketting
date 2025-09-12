"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Hero() {
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <AnimatePresence mode="wait">
      <motion.section
        role="banner"
        aria-label="Crafting stories that connect and inspire"
        className="hero relative isolate overflow-hidden bg-white text-gray-900 pt-8 md:pt-12 lg:pt-14"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.65, ease } }}
        exit={{ opacity: 0, y: -24, transition: { duration: 0.35, ease } }}
      >
        {/* BG 1: Curve */}
        <div className="absolute inset-0 -z-50">
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

        {/* Blob – hidden on mobile */}
        <div
          aria-hidden
          className="hidden sm:block blob-safe absolute bottom-8 md:bottom-12 -z-30 select-none"
        >
          <Image
            src="/images/blob.jpg"
            alt=""
            width={320}
            height={320}
            className="rounded-full opacity-95 w-44 h-44 lg:w-56 lg:h-56 object-cover ring-2 ring-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
            priority
          />
        </div>

        {/* CONTENT */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 py-8 md:py-10 lg:py-12 items-center">
            {/* LEFT */}
            <header className="max-w-xl md:max-w-2xl mx-auto text-center md:text-left">
              <h1 className="leading-[1.05] tracking-tight">
                <span className="block text-4xl sm:text-5xl md:text-6xl font-extrabold text-black">
                  Crafting{" "}
                  <span className="text-shine bg-clip-text text-transparent">
                    Stories
                  </span>
                </span>
                <span className="mt-1 block text-base sm:text-lg md:text-xl text-gray-700">
                  That
                </span>
                <span className="mt-1 block text-3xl sm:text-4xl md:text-5xl font-extrabold">
                  <em className="not-italic text-black">Connect</em>{" "}
                  <span className="text-shine bg-clip-text text-transparent">
                    &nbsp;Inspire
                  </span>
                </span>
              </h1>

              <p className="mt-4 text-sm sm:text-base text-gray-600">
                Turning ideas into impactful digital experiences
              </p>

              <p className="mt-6 text-[0.95rem] leading-6 text-gray-700 max-w-prose mx-auto md:mx-0">
                We help brands and creators bring their vision to life through
                captivating content, innovative storytelling, and designs that
                leave a lasting impression.
              </p>

              {/* Buttons centered on mobile */}
              <nav className="mt-6 flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-3">
                <Link
                  href="#book"
                  aria-label="Book a free call"
                  className="inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 text-sm font-semibold text-white bg-[#3ac4ec] hover:bg-[#2ea5c8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3ac4ec]/40 transition"
                >
                  <PhoneCall className="size-4" />
                  Book Free Call
                </Link>
                <Link
                  href="#services"
                  aria-label="Explore our services"
                  className="inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 text-sm font-semibold text-gray-900 bg-white/90 backdrop-blur ring-1 ring-[#3ac4ec]/30 hover:bg-white transition"
                >
                  Explore Our Services
                  <ArrowRight className="size-4" />
                </Link>
              </nav>
            </header>

            {/* RIGHT */}
            <figure aria-hidden className="w-full">
              {/* MOBILE: simple centered row (no overlap) */}
              <div className="md:hidden flex items-center justify-center gap-3 pt-4">
                <div className="device-frame">
                  <div className="device-m">
                    <Image
                      src="/images/web.jpg"
                      alt="Editing interface"
                      fill
                      className="media"
                    />
                  </div>
                </div>
                <div className="device-frame">
                  <div className="device-m">
                    <Image
                      src="/images/edit.jpg"
                      alt="Studio monitors"
                      fill
                      className="media"
                    />
                  </div>
                </div>
                <div className="device-frame">
                  <div className="device-m">
                    <Image
                      src="/images/seo.jpg"
                      alt="Creator at work"
                      fill
                      className="media"
                    />
                  </div>
                </div>
              </div>

              {/* DESKTOP/TABLET: overlapped stack */}
              <div className="hidden md:block relative mx-auto h-[360px] lg:h-[440px]">
                {/* left card */}
                <motion.div
                  initial={{ opacity: 0, y: 12, rotate: -6, scale: 0.94 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotate: -8,
                    scale: 1,
                    transition: { duration: 0.7, ease, delay: 0.15 },
                  }}
                  className="absolute left-6 lg:left-10 top-2 rotate-[-8deg] device-frame float-soft z-10"
                >
                  <div className="device">
                    <Image
                      src="/images/web.jpg"
                      alt="Editing interface"
                      fill
                      className="media"
                      priority
                    />
                  </div>
                </motion.div>

                {/* right card – pulled closer */}
                <motion.div
                  initial={{ opacity: 0, y: 16, rotate: 6, scale: 0.94 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotate: 8,
                    scale: 1,
                    transition: { duration: 0.7, ease, delay: 0.25 },
                  }}
                  className="absolute right-6 lg:right-10 top-1 rotate-[8deg] device-frame float-soft z-10"
                >
                  <div className="device">
                    <Image
                      src="/images/edit.jpg"
                      alt="Creator at work"
                      fill
                      className="media"
                      priority
                    />
                  </div>
                </motion.div>

                {/* center card on top */}
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.93 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.7, ease, delay: 0.35 },
                  }}
                  className="absolute left-1/2 -translate-x-1/2 top-8 device-frame ring-2 ring-white/50 shadow-xl z-20"
                >
                  <div className="device">
                    <Image
                      src="/images/seo.jpg"
                      alt="Studio monitors"
                      fill
                      className="media"
                      priority
                    />
                  </div>
                </motion.div>
              </div>
            </figure>
          </div>
        </div>

        <style jsx global>{`
          .text-shine {
            background-image: linear-gradient(
              100deg,
              #8a5cff 10%,
              #b18cff 30%,
              #42e9a6 55%,
              #8a5cff 80%
            );
            background-size: 200% auto;
            animation: shine 2.6s linear infinite;
          }
          @keyframes shine {
            to {
              background-position: -200% center;
            }
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

          /* desktop/tablet device */
          .device {
            --device-ar: 9 / 19;
            position: relative;
            width: clamp(120px, 11vw, 160px);
            aspect-ratio: var(--device-ar);
            border-radius: 1.1rem;
            overflow: hidden;
          }
          /* mobile device (smaller) */
          .device-m {
            position: relative;
            width: clamp(84px, 26vw, 110px);
            aspect-ratio: 9 / 18;
            border-radius: 1.1rem;
            overflow: hidden;
          }

          .media {
            object-fit: cover;
            object-position: center;
          }

          /* Curve positioning */
          .hero {
            --curve-x: -2vw;
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
              --curve-x: -3vw;
              --curve-y: -1vh;
            }
          }
          @media (min-width: 1024px) {
            .hero {
              --curve-x: 19vw;
              --curve-y: -3vh;
            }
          }
          @media (min-width: 1536px) {
            .hero {
              --curve-x: 19vw;
              --curve-y: -3vh;
            }
          }

          .blob-safe {
            left: clamp(-64px, -6vw, -16px);
          }

          @media (prefers-reduced-motion: reduce) {
            .text-shine,
            .float-soft {
              animation: none !important;
            }
          }
        `}</style>
      </motion.section>
    </AnimatePresence>
  );
}
