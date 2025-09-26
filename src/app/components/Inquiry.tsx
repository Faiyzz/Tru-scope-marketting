// components/ReservationSection.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Clock, Phone, Loader2, ExternalLink, Video } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import Script from "next/script";

// 👉 Replace with YOUR GHL/LeadConnector booking URL
const GHL_WIDGET_URL =
  "https://api.leadconnectorhq.com/widget/booking/Ky3SDrjMdqqFvoZtt5m9";
const GHL_SCRIPT_SRC = "https://link.msgsndr.com/js/form_embed.js";

const ACCENT = "#3ac4ec";

export default function ReservationSection() {
  const [mounted, setMounted] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [meetingType, setMeetingType] = useState<"phone" | "zoom">("phone");

  const iframeId = useMemo(
    () => `ghl_widget_${Math.random().toString(36).slice(2)}`,
    []
  );

  const iframeSrc = useMemo(() => {
    const joiner = GHL_WIDGET_URL.includes("?") ? "&" : "?";
    return `${GHL_WIDGET_URL}${joiner}meeting_type=${meetingType}`;
  }, [meetingType]);

  useEffect(() => setMounted(true), []);
  useEffect(() => setIframeLoaded(false), [iframeSrc]);

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
      className="relative w-full overflow-hidden bg-white py-8 sm:py-10 mt-30"
    >
      {/* soft aurora bg */}
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
          {/* Left column */}
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
                <span>Phone call</span>
                <span className="text-slate-400">or</span>
                <Video className="h-4 w-4 text-slate-500" />
                <span>Zoom</span>
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
                href={GHL_WIDGET_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-50"
              >
                Open in new tab <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right column — GHL widget */}
          <motion.div variants={item} className="p-4 sm:p-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">
                Select a Time
              </h3>
              {/* Segmented toggle: Phone / Zoom */}
              <div className="flex items-center rounded-full border border-slate-200 p-1 text-xs font-medium shadow-sm">
                <button
                  type="button"
                  onClick={() => setMeetingType("phone")}
                  className={[
                    "px-3 py-1.5 rounded-full transition",
                    meetingType === "phone"
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-100",
                  ].join(" ")}
                  aria-pressed={meetingType === "phone"}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" />
                    Phone
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setMeetingType("zoom")}
                  className={[
                    "px-3 py-1.5 rounded-full transition",
                    meetingType === "zoom"
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-100",
                  ].join(" ")}
                  aria-pressed={meetingType === "zoom"}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Video className="h-3.5 w-3.5" />
                    Zoom
                  </span>
                </button>
              </div>
            </div>

            {/* SCROLLABLE WRAPPER (fix for cut-off calendar) */}
            <div
              className="relative w-full rounded-xl bg-white ring-1 ring-black/5 shadow-lg max-h-[80vh] overflow-auto"
              style={{
                WebkitOverflowScrolling:
                  "touch" as React.CSSProperties["WebkitOverflowScrolling"],
              }}
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

              {/* GHL iframe */}
              {mounted && (
                <>
                  <iframe
                    title="GHL Scheduling"
                    id={iframeId}
                    src={iframeSrc}
                    scrolling="yes" // ← allow internal scrollbars
                    className={`w-full rounded-xl transition-opacity duration-500 ${
                      iframeLoaded ? "opacity-100" : "opacity-0"
                    } min-h-[620px]`} // sensible fallback height
                    style={{ border: "none" }} // no overflow:hidden so scrollbars can appear
                    onLoad={() => setIframeLoaded(true)}
                  />
                  {/* Load LeadConnector embed script once */}
                  <Script src={GHL_SCRIPT_SRC} strategy="afterInteractive" />
                </>
              )}
            </div>

            <div className="mt-2 flex items-center justify-between">
              <p className="text-[11px] text-slate-400">Powered by GHL</p>
              <p className="text-[11px] text-slate-500">
                Preference:{" "}
                <span className="font-semibold capitalize">{meetingType}</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function hexWithAlpha(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
