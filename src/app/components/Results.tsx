// components/ResultsCarousel.tsx
"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

type ResultCard = {
  id: string;
  metric: string; // e.g. "+2.6x ROAS"
  summary: string;
  quote: string;
  author: string;
  role: string;
  rating?: number; // default 5
};

const RESULTS: ResultCard[] = [
  {
    id: "r1",
    metric: "+2.6x ROAS",
    summary:
      "Redesigned creatives and implemented strategic retargeting campaigns that dramatically improved return on ad spend.",
    quote:
      "TruScope transformed our online presence. Their data-driven approach to ads delivered results we never thought possible.",
    author: "Michael Johnson",
    role: "E-commerce Store Owner",
  },
  {
    id: "r2",
    metric: "-56% CPL",
    summary:
      "Refined targeting and landing page UX to reduce acquisition costs while keeping lead quality high.",
    quote:
      "Lead quality went up while our cost per lead dropped. The funnel work paid off immediately.",
    author: "Alina Park",
    role: "B2B SaaS Growth Lead",
  },
  {
    id: "r3",
    metric: "+148% Organic",
    summary:
      "Technical SEO and content strategy that compounded month over month for sustained traffic growth.",
    quote:
      "Search visibility took off. We’re ranking for terms we couldn’t touch before.",
    author: "Shaan Malik",
    role: "Marketplace Co-founder",
  },
  {
    id: "r4",
    metric: "3.1x Conversions",
    summary:
      "Conversion-ready pages, social proof, and speed optimization lifted conversion rates across devices.",
    quote:
      "The new pages convert. Our A/B tests keep coming back with clear wins.",
    author: "Isabella Rivera",
    role: "DTC Brand Manager",
  },
  {
    id: "r5",
    metric: "+72% Retention",
    summary:
      "Lifecycle campaigns and creative refreshes that kept customers engaged and purchasing again.",
    quote:
      "Our repeat orders jumped big time. The lifecycle flows are printing.",
    author: "Kenji Watanabe",
    role: "Subscription Ops Lead",
  },
];

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 64 : -64,
    opacity: 0,
    filter: "blur(6px)",
  }),
  center: { x: 0, opacity: 1, filter: "blur(0px)" },
  exit: (dir: number) => ({
    x: dir > 0 ? -64 : 64,
    opacity: 0,
    filter: "blur(6px)",
  }),
};

export default function ResultsCarousel() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(0);
  const wrap = (n: number) => (n + RESULTS.length) % RESULTS.length;

  const go = useCallback((delta: number) => {
    setDir(delta);
    setIndex((i) => wrap(i + delta));
  }, []);

  // keyboard arrows
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [go]);

  // swipe on mobile
  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) =>
    (startX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    startX.current = null;
  };

  // --- Equal-height logic ---
  const measureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [cardMinH, setCardMinH] = useState<number | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const heights = measureRefs.current.map((el) => el?.offsetHeight ?? 0);
      const max = heights.length ? Math.max(...heights) : 0;
      // Add a tiny buffer to avoid sub-pixel reflows
      setCardMinH(max ? max + 1 : null);
    };

    // Measure now
    measure();

    // Re-measure on container resize
    const ro = new ResizeObserver(() => measure());
    if (containerRef.current) ro.observe(containerRef.current);

    // Re-measure on window resize
    window.addEventListener("resize", measure);

    // Re-measure after fonts load (prevents pop when custom fonts finish)
    // @ts-ignore
    if (document.fonts?.ready) {
      // @ts-ignore
      document.fonts.ready.then(measure).catch(() => {});
    }

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const current = RESULTS[index];

  return (
    <section className="relative bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Proven Results
          </h2>
          <p className="mt-3 text-slate-600 md:text-lg">
            See how we’ve helped businesses like yours achieve remarkable growth
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={containerRef}
          tabIndex={0}
          className="relative mt-10 outline-none md:mt-14"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          aria-roledescription="carousel"
          aria-label="Case study results"
        >
          {/* Arrows */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="absolute left-[-8px] top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 text-indigo-600 shadow-lg ring-1 ring-slate-200 transition hover:scale-105 hover:shadow-indigo-200/60 md:left-[-20px]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="absolute right-[-8px] top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 text-indigo-600 shadow-lg ring-1 ring-slate-200 transition hover:scale-105 hover:shadow-indigo-200/60 md:right-[-20px]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Hidden measuring clones (same width/styles), do not affect layout */}
          <div
            aria-hidden="true"
            className="absolute -z-10 opacity-0 pointer-events-none"
            style={{ left: -99999, top: 0, width: "100%" }}
          >
            <div className="mx-auto max-w-4xl">
              {RESULTS.map((r, i) => (
                <div
                  key={`measure-${r.id}`}
                  ref={(el) => {
                    measureRefs.current[i] = el;
                  }}
                  className="rounded-3xl bg-white p-6 ring-1 ring-slate-200 md:p-10"
                >
                  <CardContent r={r} />
                </div>
              ))}
            </div>
          </div>

          {/* Visible card */}
          <div className="mx-auto max-w-4xl">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.article
                key={current.id}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200 md:p-10"
                style={{
                  // fallback to a reasonable min-height until measured
                  minHeight:
                    cardMinH ??
                    (typeof window !== "undefined"
                      ? window.innerWidth >= 768
                        ? 420
                        : 360
                      : 360),
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${RESULTS.length}`}
              >
                <CardContent r={current} />
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {RESULTS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDir(i > index ? 1 : -1);
                  setIndex(i);
                }}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === index
                    ? "bg-indigo-500"
                    : "bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Shared card content (used by visible + measuring clones) --- */
function CardContent({ r }: { r: ResultCard }) {
  return (
    <>
      {/* stars */}
      <div className="flex items-center justify-center gap-1">
        {Array.from({ length: r.rating ?? 5 }).map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-yellow-400 stroke-yellow-400" />
        ))}
      </div>

      <h3 className="mt-4 text-center text-2xl font-extrabold text-indigo-600 md:text-3xl">
        {r.metric}
      </h3>

      <p className="mx-auto mt-5 max-w-3xl text-center text-slate-700 md:text-lg">
        {r.summary}
      </p>

      <p className="mx-auto mt-6 max-w-3xl text-center italic text-slate-500">
        “{r.quote}”
      </p>

      <div className="mt-8 text-center">
        <p className="font-semibold text-slate-900">{r.author}</p>
        <p className="text-sm text-slate-500">{r.role}</p>
      </div>
    </>
  );
}
