// app/components/Hero.tsx
"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, Variants, easeOut } from "framer-motion";
import {
  ArrowRight,
  PhoneCall,
  Volume2,
  VolumeX,
  X as CloseIcon,
} from "lucide-react";
import Link from "next/link";

/* --- video card: first-frame poster + hover (desktop) + tap-to-play (mobile) --- */
function VideoCard({
  src,
  className = "",
  controlsAlign = "right",
}: {
  src: string;
  className?: string;
  controlsAlign?: "left" | "right";
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const vidRef = useRef<HTMLVideoElement>(null);

  const [muted, setMuted] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [noHover, setNoHover] = useState(false); // phones/tablets
  const [posterURL, setPosterURL] = useState<string | null>(null);
  const posterSetRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(hover: none)");
    const apply = () => setNoHover(mql.matches);
    apply();
    mql.addEventListener?.("change", apply);
    return () => mql.removeEventListener?.("change", apply);
  }, []);

  const captureFirstFrame = useCallback(async () => {
    const video = vidRef.current;
    if (!video || posterSetRef.current) return;
    try {
      if (video.readyState < 1) {
        await new Promise<void>((res) => {
          const onMeta = () => {
            video.removeEventListener("loadedmetadata", onMeta);
            res();
          };
          video.addEventListener("loadedmetadata", onMeta, { once: true });
        });
      }
      await new Promise<void>((res) => {
        const onSeek = () => {
          video.removeEventListener("seeked", onSeek);
          res();
        };
        video.currentTime = 0;
        video.addEventListener("seeked", onSeek, { once: true });
      });

      const w = video.videoWidth || 360;
      const h = video.videoHeight || 640;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(video, 0, 0, w, h);
      const dataURL = canvas.toDataURL("image/webp", 0.72);
      setPosterURL(dataURL);
      video.setAttribute("poster", dataURL);
      posterSetRef.current = true;
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    captureFirstFrame();
  }, [captureFirstFrame]);

  const onEnter = useCallback(() => {
    if (noHover) return;
    setHovered(true);
    if (!pinned && vidRef.current) {
      vidRef.current.muted = muted;
      vidRef.current.play().catch(() => {});
    }
  }, [noHover, pinned, muted]);

  const onLeave = useCallback(() => {
    if (noHover) return;
    setHovered(false);
    if (!pinned && vidRef.current) {
      vidRef.current.pause();
      vidRef.current.currentTime = 0;
    }
  }, [noHover, pinned]);

  const togglePinned = useCallback(() => {
    const video = vidRef.current;
    if (!video) return;

    setPinned((prev) => {
      const next = !prev;
      if (next) {
        video.muted = muted;
        video.play().catch(() => {});
      } else {
        if (!(hovered && !noHover)) {
          video.pause();
          video.currentTime = 0;
        }
      }
      return next;
    });
  }, [hovered, noHover, muted]);

  const toggleMute = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const v = vidRef.current;
      if (!v) return;
      const next = !muted;
      setMuted(next);
      v.muted = next;
      if (pinned || (hovered && !noHover)) {
        v.play().catch(() => {});
      }
    },
    [muted, pinned, hovered, noHover]
  );

  return (
    <div
      ref={wrapRef}
      className={`relative w-full h-full ${className}`}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onClick={togglePinned}
      /* GPU promote the media layer as well */
      style={{
        backfaceVisibility: "hidden",
        transform: "translateZ(0)",
        willChange: "transform",
      }}
    >
      {/* poster – slightly bleed under the rounded frame to avoid jaggies */}
      {posterURL && (
        <img
          src={posterURL}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute -inset-[0.5px] h-[calc(100%+1px)] w-[calc(100%+1px)] object-cover select-none pointer-events-none"
          style={{
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
        />
      )}

      {/* video – same bleed */}
      <video
        ref={vidRef}
        src={src}
        muted={muted}
        playsInline
        loop
        preload="metadata"
        className="absolute -inset-[0.5px] h-[calc(100%+1px)] w-[calc(100%+1px)] object-cover bg-black"
        onLoadedData={captureFirstFrame}
        style={{
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
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
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
  exit: { opacity: 0, y: -24, transition: { duration: 0.35, ease } },
};

const textGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const textItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
};

const cardsGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.25 } },
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

/* ---------- Portal Booking Modal ---------- */
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
  if (!open || !mounted) return null;

  const modal = (
    <div className="fixed inset-0 z-[999]" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div
          className="flex w-full max-w-6xl bg-white shadow-2xl rounded-xl sm:rounded-2xl overflow-hidden flex-col"
          style={{
            height: "min(92svh, 900px)",
            maxHeight:
              "calc(100svh - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px) - 2rem)",
            width: "min(96vw, 1100px)",
          }}
        >
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
  );

  return createPortal(modal, document.body);
}

export default function Hero() {
  const [showBooking, setShowBooking] = useState(false);
  const bookingUrl =
    "https://api.leadconnectorhq.com/widget/booking/Ky3SDrjMdqqFvoZtt5m9";

  useEffect(() => {
    if (showBooking) {
      document.body.classList.add("overflow-hidden", "modal-open");
    } else {
      document.body.classList.remove("overflow-hidden", "modal-open");
    }
    return () =>
      document.body.classList.remove("overflow-hidden", "modal-open");
  }, [showBooking]);

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

        <div className="relative flex min-h-[82vh] items-center pt-[clamp(88px,10vh,128px)]">
          <div className="mx-auto w-full max-w-7xl px-2 sm:px-6 lg:px-8">
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
                  <span className="mt-1 block text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold">
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
                  {/* BOOKING: opens portal modal */}
                  <button
                    type="button"
                    onClick={() => setShowBooking(true)}
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

              {/* RIGHT (videos) */}
              <figure aria-hidden className="w-full">
                {/* MOBILE row */}
                <motion.div
                  className="md:hidden flex items-center justify-center gap-3 pt-4 outline-none"
                  variants={cardsGroup}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div variants={cardItem} custom={-4}>
                    <div className="device relative">
                      <VideoCard src="/images/v1.mp4" controlsAlign="left" />
                    </div>
                  </motion.div>

                  <motion.div variants={cardItem} custom={0}>
                    <div className="device relative">
                      <VideoCard src="/images/v2.mp4" />
                    </div>
                  </motion.div>

                  <motion.div variants={cardItem} custom={4}>
                    <div className="device relative">
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

        {/* Portal Modal */}
        <BookingModal
          open={showBooking}
          onClose={() => setShowBooking(false)}
          bookingUrl={bookingUrl}
        />

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

          /* ---------- BUTTON GRADIENT ---------- */
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

          .btn-gradient-outline {
            position: relative;
            color: #111;
            isolation: isolate;
            background: white;
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
          }
          .btn-gradient-outline:hover::before {
            animation: shine 2.6s linear infinite;
          }
          @media (hover: none) and (pointer: coarse) {
            .btn-gradient-outline::before {
              animation: shine 2.6s linear infinite;
            }
          }

          /* --------- DEVICE FRAME (rounded, rotated) ---------
             Anti-aliasing fixes for rotated rounded rectangles with video:
             - overflow: clip (Chromium)
             - tiny hairline outline to help AA
             - translateZ(0) + backface-visibility
             - WebKit mask to force compositing/AA
          */
          .device,
          .device-m {
            --device-ar: 9 / 19;
            position: relative;
            width: clamp(120px, 11vw, 160px);
            aspect-ratio: var(--device-ar);
            border-radius: 1.2rem;
            overflow: clip; /* better than hidden on Chrome for transforms */
            outline: 0.5px solid rgba(0, 0, 0, 0.06);
            backface-visibility: hidden;
            transform: translateZ(0);
            will-change: transform;
            -webkit-mask-image: -webkit-radial-gradient(white, black);
          }

          /* Soft float */
          .float-soft {
            animation: float 6s ease-in-out infinite;
            will-change: transform;
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

          /* Hide the fixed navbar only while a modal is open */
          body.modal-open header[role="banner"] {
            visibility: hidden;
          }

          /* ♿ Respect reduced motion */
          @media (prefers-reduced-motion: reduce) {
            .text-shine,
            .btn-gradient,
            .btn-gradient-outline::before {
              animation: none !important;
            }
            .btn-gradient {
              transition: box-shadow 0.25s ease, transform 0.12s ease;
            }
          }
        `}</style>
      </motion.section>
    </AnimatePresence>
  );
}
