"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Clock, Phone, Loader2, ExternalLink } from "lucide-react";
import { motion, type Variants } from "framer-motion";

// 👉 Replace with your Calendly link
const CALENDLY_URL = "https://calendly.com/yourname/30min";
const ACCENT = "#3ac4ec"; // brand accent (used lightly)

export default function ReservationSection() {
  // --- SSR-safe embed_domain + mount flags
  const [domain, setDomain] = useState("localhost");
  const [mounted, setMounted] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") setDomain(window.location.hostname);
  }, []);

  const embedSrc = useMemo(
    () => `${CALENDLY_URL}?embed_type=Inline&embed_domain=${domain}`,
    [domain]
  );

  // --- Framer Motion (typed to avoid TS errors)
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section
      id="reservation"
      className="relative w-full overflow-hidden bg-white py-8 sm:py-10"
    >
      {/* Subtler aurora bg (smaller + lighter) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-28 -left-28 h-[22rem] w-[22rem] rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        style={{
          background: `radial-gradient(60% 60% at 50% 50%, ${hexWithAlpha(
            ACCENT,
            0.12
          )} 0%, rgba(99,102,241,0.08) 45%, transparent 70%)`,
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-28 h-[24rem] w-[24rem] rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.06 }}
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(34,197,94,0.08) 0%, rgba(99,102,241,0.06) 40%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5 md:grid-cols-[1fr_1.15fr]"
        >
          {/* Left column (more compact) */}
          <motion.div variants={item} className="p-6 sm:p-8">
            <div
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: hexWithAlpha(ACCENT, 0.08) }}
            >
              <motion.div
                initial={{ rotate: -8, scale: 0.92 }}
                whileInView={{ rotate: 10, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-4 w-4 rounded-sm"
                style={{ backgroundColor: ACCENT }}
              />
            </div>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Reservation Page
            </h2>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-slate-700">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-slate-500" />
                30 min
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-slate-500" />
                Phone call
              </div>
            </div>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
              Book a quick call to explore your needs and get next steps.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <a
                href="#"
                className="underline underline-offset-2 hover:text-slate-700"
              >
                Cookie settings
              </a>
              <a
                href="#"
                className="underline underline-offset-2 hover:text-slate-700"
              >
                Report abuse
              </a>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-50"
              >
                Open in Calendly <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right column — compact Calendly card */}
          <motion.div variants={item} className="p-4 sm:p-6">
            <h3 className="mb-3 text-base font-semibold text-slate-900">
              Select a Time
            </h3>

            <div
              className="relative w-full rounded-xl bg-white ring-1 ring-black/5 shadow-lg"
              aria-busy={!iframeLoaded}
            >
              {/* Skeleton while loading */}
              {!iframeLoaded && (
                <div className="absolute inset-0 z-10 overflow-hidden rounded-xl">
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-slate-100 to-slate-50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading available slots…
                    </div>
                  </div>
                </div>
              )}

              {/* Iframe (mount only on client) */}
              {mounted && (
                <iframe
                  title="Calendly Scheduling"
                  src={embedSrc}
                  className={`w-full rounded-xl transition-opacity duration-500 ${
                    iframeLoaded ? "opacity-100" : "opacity-0"
                  } 
                  h-[460px] sm:h-[520px] lg:h-[560px]`}
                  loading="lazy"
                  onLoad={() => setIframeLoaded(true)}
                />
              )}
            </div>

            <p className="mt-2 text-[11px] text-slate-400">
              Powered by Calendly
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/** Utility: add alpha to hex (e.g., #3ac4ec, 0.12) */
function hexWithAlpha(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
