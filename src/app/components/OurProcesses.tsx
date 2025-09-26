// components/PredictableGrowthSection.tsx
"use client";

import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type Variants,
} from "framer-motion";
import Script from "next/script";

/* ---------------- GHL embed ---------------- */
const GHL_WIDGET_URL =
  "https://api.leadconnectorhq.com/widget/booking/Ky3SDrjMdqqFvoZtt5m9";
const GHL_SCRIPT_SRC = "https://link.msgsndr.com/js/form_embed.js";

/* ---------------- Theme ---------------- */
const ACCENT = "#3ac4ec";

/* ---------------- Types ---------------- */
type Step = { id: number; title: string; blurb: string };
type Metric = { id: string; value: number; label: string };

type Props = {
  title?: string;
  subtitle?: string;
  steps?: Step[];
  metrics?: Metric[];
  advantages?: string[];
  onCtaClick?: () => void;
  initialLoadingMs?: number;
};

/* ---------------- Improved Modal ---------------- */
function BookingModal({
  open,
  onClose,
  src,
  navOffsetPx = 72,
  title = "Book a Free Consultation",
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  navOffsetPx?: number;
  title?: string;
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      aria-modal
      role="dialog"
      className="fixed inset-0 z-[9999] flex items-start justify-center"
      style={{ paddingTop: navOffsetPx + 16 }}
    >
      {/* Backdrop → only blur, no opaque color */}
      <button
        aria-label="Close booking"
        onClick={onClose}
        className="absolute inset-0 backdrop-blur-md"
      />

      {/* Dialog */}
      <div
        className="
          relative mx-4 w-full
          max-w-[1100px] rounded-2xl bg-white shadow-2xl ring-1 ring-black/10
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-2xl border-b px-5 py-3">
          <h4 className="text-base font-semibold text-slate-900">{title}</h4>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-3 pb-3 pt-3">
          <div
            className="relative w-full overflow-auto rounded-xl ring-1 ring-black/5"
            style={{ height: "min(85vh, 900px)" }}
          >
            <iframe
              title="GHL Booking"
              id={`ghl_popup_${Math.random().toString(36).slice(2)}`}
              src={src}
              scrolling="no"
              className="h-full w-full rounded-xl"
              style={{ border: "none", overflow: "hidden", display: "block" }}
            />
          </div>
          <p className="mt-2 text-center text-[11px] text-slate-400">
            Powered by GHL
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Component ---------------- */
export default function PredictableGrowthSection({
  title = "Our Process to Predictable Growth",
  subtitle = "A proven methodology that delivers consistent, measurable results for your business.",
  steps,
  metrics,
  advantages,
  onCtaClick,
  initialLoadingMs = 500,
}: Props) {
  const STEPS: Step[] = steps ?? [
    {
      id: 1,
      title: "Research",
      blurb: "Deep dive into your market, competitors, and audience",
    },
    {
      id: 2,
      title: "Strategy",
      blurb: "Custom roadmap tailored to your goals",
    },
    {
      id: 3,
      title: "Launch",
      blurb: "Implementation with precision execution",
    },
    { id: 4, title: "Optimize", blurb: "Continuous testing and improvement" },
    {
      id: 5,
      title: "Scale",
      blurb: "Expand what’s working for exponential growth",
    },
  ];

  const METRICS: Metric[] = metrics ?? [
    { id: "roi", value: 4, label: "Average ROI" },
    { id: "leads", value: 67, label: "Leads / Month" },
    { id: "bookings", value: 45, label: "Bookings / Month" },
    { id: "retention", value: 98, label: "Client Retention" },
  ];

  const ADV: string[] = advantages ?? [
    "Dedicated account manager",
    "Transparent reporting",
    "No long-term contracts",
    "Flexible engagement models",
  ];

  // skeleton
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(
      () => setLoading(false),
      Math.max(0, initialLoadingMs)
    );
    return () => clearTimeout(t);
  }, [initialLoadingMs]);

  const SKELETON_STEPS = React.useMemo(
    () => Array.from({ length: 5 }, (_, i) => i),
    []
  );
  const SKELETON_METRICS = React.useMemo(
    () => Array.from({ length: 4 }, (_, i) => i),
    []
  );
  const SKELETON_ADV = React.useMemo(
    () => Array.from({ length: 4 }, (_, i) => i),
    []
  );

  // progress + in-view
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const railWrapRef = React.useRef<HTMLDivElement | null>(null);
  const metricsRef = React.useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: railWrapRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const fillY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const metricsInView = useInView(metricsRef, {
    once: true,
    margin: "0px 0px -20% 0px",
  });

  // anims
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // modal
  const [bookingOpen, setBookingOpen] = React.useState(false);
  const handleCta = () => {
    onCtaClick?.();
    setBookingOpen(true);
  };

  return (
    <section
      id="process"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative isolate w-full max-w-[100vw] overflow-hidden bg-white"
    >
      {/* decor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ contain: "paint" }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-14 md:py-16 lg:px-8">
        {/* Heading */}
        <motion.header
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2
            variants={item}
            className="mt-1 font-extrabold leading-[0.98] tracking-tight text-[clamp(28px,6vw,56px)] text-slate-900"
          >
            {renderSolidAccentLastWord(title)}
          </motion.h2>
          <motion.p
            variants={item}
            className="mt-2 text-base md:text-lg text-slate-600"
          >
            {subtitle}
          </motion.p>
        </motion.header>

        {/* Metrics */}
        <motion.div
          ref={metricsRef}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="mt-8 mx-auto max-w-5xl overflow-hidden rounded-2xl border border-[rgba(58,196,236,0.2)]
                     bg-[linear-gradient(135deg,rgba(58,196,236,0.10),rgba(31,159,192,0.08))] p-5 sm:p-6 text-center"
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 justify-items-center">
            {(loading ? SKELETON_METRICS : METRICS).map((m, i) => (
              <motion.div
                key={
                  loading ? `metric-skel-${i}` : `metric-${(m as Metric).id}`
                }
                variants={item}
                className="space-y-1"
              >
                {loading ? (
                  <>
                    {shimmerBlock(40, 22)}
                    <div className="text-xs font-medium text-slate-700 sm:text-sm flex justify-center">
                      {shimmerLine(60, 100)}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                      <span className="tabular-nums text-gradient inline-flex items-baseline">
                        <CountUp
                          end={(m as Metric).value}
                          duration={900 + i * 120}
                          play={!!metricsInView && !loading}
                        />
                        <MetricSuffix id={(m as Metric).id} gradient />
                      </span>
                    </div>
                    <div className="text-xs font-medium text-slate-700 sm:text-sm">
                      {(m as Metric).label}
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process + Benefits */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:mt-12 md:grid-cols-12">
          {/* LEFT: Steps with progress rail */}
          <div className="md:col-span-7">
            <div
              ref={railWrapRef}
              className="relative overflow-hidden md:overflow-visible pb-1"
            >
              <div className="absolute left-7 top-0 hidden h-full w-[3px] -translate-x-1/2 rounded rail-base md:block" />
              <motion.div
                className="absolute left-7 top-0 hidden w-[3px] -translate-x-1/2 rounded rail-fill md:block"
                style={{ height: fillY }}
              />
              <ol className="space-y-4">
                {(loading ? SKELETON_STEPS : STEPS).map((s, idx) => (
                  <motion.li
                    key={
                      loading ? `step-skel-${idx}` : `step-${(s as Step).id}`
                    }
                    variants={item}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.35 }}
                    className="group relative rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:pl-20"
                  >
                    {/* Desktop badge (existing) */}
                    <div className="pointer-events-none absolute left-7 top-5 hidden -translate-x-1/2 md:block">
                      <div className="grid h-9 w-9 place-items-center rounded-full shadow-md step-badge">
                        <span className="text-sm font-bold text-white">
                          {loading ? idx + 1 : (s as Step).id}
                        </span>
                      </div>
                    </div>

                    {/* Mobile animated number badge (NEW) */}
                    <div className="md:hidden mb-2">
                      <AnimatedNumberBadge
                        n={loading ? idx + 1 : (s as Step).id}
                      />
                    </div>

                    <div className="ml-0 md:ml-2">
                      <h3 className="text-base md:text-lg font-semibold text-slate-900">
                        {loading ? shimmerLine(90, 140) : (s as Step).title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        {loading ? shimmerLine(160, 220) : (s as Step).blurb}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
            <div className="mt-7 md:mt-9" />
          </div>

          {/* RIGHT: Sticky benefits + CTA */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-20">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
                className="rounded-2xl border border-[rgba(58,196,236,0.25)] bg-white/90 p-6 shadow-[0_18px_40px_-15px_rgba(0,0,0,0.25)] backdrop-blur-md"
              >
                <p className="text-base font-semibold text-slate-900">
                  Your Advantage
                </p>
                <ul className="mt-4 space-y-3">
                  {(loading ? SKELETON_ADV : ADV).map((text, i) =>
                    loading ? (
                      <li key={`adv-skel-${i}`}>{shimmerLine(140, 220)}</li>
                    ) : (
                      <li key={`adv-${i}`} className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-slate-700">{text}</span>
                      </li>
                    )
                  )}
                </ul>

                <div className="mt-6">
                  <button
                    onClick={handleCta}
                    className="group btn-base btn-gradient w-full text-white shadow-md hover:shadow-lg"
                  >
                    <span className="relative">Start My Strategy</span>
                    <svg
                      className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M7 5l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Local theme helpers */}
      <style jsx>{`
        :root {
          --brand-purple: var(--brand-purple, #8a5cff);
          --brand-lilac: var(--brand-lilac, #b18cff);
          --brand-cyan: var(--brand-cyan, #3ac4ec);
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
          color: transparent;
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
        .rail-base {
          background: linear-gradient(
            180deg,
            rgba(138, 92, 255, 0.2),
            rgba(58, 196, 236, 0.2)
          );
        }
        .rail-fill {
          background-image: linear-gradient(
            180deg,
            var(--brand-purple),
            var(--brand-lilac),
            var(--brand-cyan)
          );
          box-shadow: 0 0 18px rgba(58, 196, 236, 0.45);
        }
        .step-badge {
          background-image: linear-gradient(
            135deg,
            var(--brand-purple),
            var(--brand-lilac),
            var(--brand-cyan)
          );
          box-shadow: 0 20px 40px -15px rgba(58, 196, 236, 0.4);
        }
      `}</style>

      {/* LeadConnector script (loads once) */}
      <Script src={GHL_SCRIPT_SRC} strategy="afterInteractive" />

      {/* Booking modal */}
      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        src={GHL_WIDGET_URL}
        navOffsetPx={72}
      />
    </section>
  );
}

/* ---------------- Bits ---------------- */

function renderSolidAccentLastWord(raw: string) {
  const parts = raw.trim().split(/\s+/);
  const last = parts.pop() ?? "";
  const before = parts.join(" ");
  return (
    <>
      {before}{" "}
      <span style={{ color: "var(--brand-purple, #8A5CFF)" }}>{last}</span>
    </>
  );
}

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-5 w-5 shrink-0"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 00-1.408-1.42l-6.83 6.774-2.76-2.64a1 1 0 10-1.38 1.45l3.5 3.35a1 1 0 001.394-.017l7.48-7.497z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function MetricSuffix({
  id,
  gradient = false,
}: {
  id: string;
  gradient?: boolean;
}) {
  const cls = gradient ? "ml-0.5 text-gradient" : "ml-0.5 text-slate-900";
  if (id === "roi") return <span className={cls}>×</span>;
  if (id === "retention") return <span className={cls}>%</span>;
  return null;
}

function CountUp({
  end,
  duration = 1000,
  play = true,
}: {
  end: number;
  duration?: number;
  play?: boolean;
}) {
  const [val, setVal] = React.useState(0);
  const startRef = React.useRef<number | null>(null);
  React.useEffect(() => {
    if (!play) {
      setVal(0);
      startRef.current = null;
      return;
    }
    let raf = 0;
    const step = (t: number) => {
      if (startRef.current == null) startRef.current = t;
      const p = Math.min(1, (t - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, play]);
  return <span>{val}</span>;
}

function shimmerLine(minW = 60, maxW = 120) {
  const w = Math.floor(Math.random() * (maxW - minW + 1)) + minW;
  return (
    <span
      className="inline-block h-3 animate-pulse rounded bg-slate-200/80"
      style={{ width: `${w}px` }}
    />
  );
}
function shimmerBlock(w = 50, h = 18) {
  return (
    <span
      className="inline-block animate-pulse rounded bg-slate-200/80"
      style={{ width: w, height: h }}
    />
  );
}

/* ---------- NEW: Animated number badge for mobile ---------- */
function AnimatedNumberBadge({ n }: { n: number }) {
  const id = React.useId(); // unique gradient id per instance

  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      aria-hidden="true"
      role="img"
    >
      <defs>
        {/* Animated stroke gradient (matches brand + timing used elsewhere) */}
        <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--brand-purple, #8a5cff)">
            <animate
              attributeName="offset"
              values="0;1;0"
              dur="4.5s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="50%" stopColor="var(--brand-cyan, #3ac4ec)">
            <animate
              attributeName="offset"
              values="0.5;1;0.5"
              dur="4.5s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="var(--brand-lilac, #b18cff)">
            <animate
              attributeName="offset"
              values="1;1;1"
              dur="4.5s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>

      {/* White chip base for contrast on any background */}
      <circle cx="18" cy="18" r="17" fill="#fff" />
      {/* Glowing animated gradient ring */}
      <circle
        cx="18"
        cy="18"
        r="16"
        fill="none"
        stroke={`url(#grad-${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 8px rgba(58,196,236,0.35))" }}
      />
      {/* Number with gradient fill */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontWeight="800"
        fontSize="14"
        fill={`url(#grad-${id})`}
      >
        {n}
      </text>
    </svg>
  );
}
