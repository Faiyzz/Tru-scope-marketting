// components/PredictableGrowthSection.tsx
"use client";

import React from "react";

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
  initialLoadingMs?: number; // skeleton duration (ms)
};

/* ---------------- Component ---------------- */
export default function PredictableGrowthSection({
  title = "Our Process to Predictable Growth",
  subtitle = "A proven methodology that delivers consistent, measurable results for your business.",
  steps,
  metrics,
  advantages,
  onCtaClick,
  initialLoadingMs = 900,
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
    { id: "leads", value: 67, label: "Leads/Month" },
    { id: "bookings", value: 45, label: "Bookings/Month" },
    { id: "retention", value: 98, label: "Client Retention" },
  ];

  const ADV: string[] = advantages ?? [
    "Dedicated account manager",
    "Transparent reporting",
    "No long-term contracts",
    "Flexible engagement models",
  ];

  /* ---- skeleton load ---- */
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(
      () => setLoading(false),
      Math.max(0, initialLoadingMs)
    );
    return () => clearTimeout(t);
  }, [initialLoadingMs]);

  /* ---- in-view to trigger entrances + counters ---- */
  const rootRef = React.useRef<HTMLElement | null>(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    if (!rootRef.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold: 0.2, rootMargin: "0px 0px -15% 0px" }
    );
    io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={rootRef} className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-8">
        {/* Heading */}
        <header
          className={`max-w-3xl ${
            inView ? "animate-rise-in" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
            {subtitle}
          </p>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-8 md:mt-14 md:grid-cols-12">
          {/* LEFT: Steps + CTA */}
          <div className="md:col-span-6">
            <ol className="space-y-6">
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <li
                      key={`step-skel-${i}`}
                      className="flex items-start gap-4 rounded-xl p-2 animate-fade-in"
                      style={{ animationDelay: `${150 + i * 80}ms` }}
                    >
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-slate-200" />
                      <div className="flex-1 space-y-2">
                        <div className="skeleton h-4 w-36 rounded" />
                        <div className="skeleton h-4 w-64 rounded" />
                      </div>
                    </li>
                  ))
                : STEPS.map((item, i) => (
                    <li
                      key={`step-${item.id}-${item.title}`}
                      className="flex items-start gap-4 rounded-xl p-2 animate-fade-in"
                      style={{ animationDelay: `${150 + i * 80}ms` }}
                    >
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-[0_6px_20px_-6px_rgba(59,130,246,0.5)]">
                        <span className="text-sm font-bold">{item.id}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-slate-900 md:text-lg">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-slate-600">{item.blurb}</p>
                      </div>
                    </li>
                  ))}
            </ol>

            {/* CTA */}
            <div
              className={`${
                inView ? "animate-fade-in" : "opacity-0"
              } mt-8 md:mt-10`}
              style={{ animationDelay: "650ms" }}
            >
              <button
                onClick={onCtaClick}
                className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.99] focus:outline-none"
              >
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="button-shine" />
                </span>
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
          </div>

          {/* RIGHT: Metrics + Advantages */}
          <div className="md:col-span-6">
            {/* Metrics grid */}
            <div
              className={`grid grid-cols-2 gap-4 sm:gap-6 ${
                inView ? "animate-fade-in" : "opacity-0"
              }`}
              style={{ animationDelay: "180ms" }}
            >
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={`metric-skel-${i}`}
                      className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm animate-card-pop"
                      style={{ animationDelay: `${180 + i * 80}ms` }}
                    >
                      <div className="skeleton mb-3 h-10 w-16 rounded" />
                      <div className="skeleton h-4 w-28 rounded" />
                    </div>
                  ))
                : METRICS.map((m, i) => (
                    <div
                      key={`metric-${m.id}`}
                      className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md animate-card-pop"
                      style={{ animationDelay: `${180 + i * 80}ms` }}
                    >
                      <div className="text-4xl font-extrabold tracking-tight text-blue-500 md:text-5xl">
                        <CountUp
                          end={m.value}
                          duration={900 + i * 120}
                          play={inView && !loading}
                        />
                      </div>
                      <div className="mt-2 text-sm text-slate-600">
                        {m.label}
                      </div>
                    </div>
                  ))}
            </div>

            {/* Advantage card */}
            <div
              className={`mt-4 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm sm:mt-6 ${
                inView ? "animate-card-pop" : "opacity-0 translate-y-3"
              }`}
              style={{ animationDelay: "260ms" }}
            >
              <p className="text-base font-semibold text-slate-900">
                Your Advantage
              </p>
              <ul className="mt-4 space-y-3">
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <li
                        key={`adv-skel-${i}`}
                        className="flex items-start gap-3 animate-fade-in"
                        style={{ animationDelay: `${i * 70}ms` }}
                      >
                        <div className="skeleton h-4 w-56 rounded" />
                      </li>
                    ))
                  : ADV.map((text, i) => (
                      <li
                        key={`adv-${i}-${text}`}
                        className="flex items-start gap-3 animate-fade-in"
                        style={{ animationDelay: `${i * 70}ms` }}
                      >
                        <CheckIcon />
                        <span className="text-slate-700">{text}</span>
                      </li>
                    ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Helpers ---------------- */

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500"
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

/** Count-up that only plays when `play` is true */
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
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, play]);

  return <span>{val}</span>;
}
