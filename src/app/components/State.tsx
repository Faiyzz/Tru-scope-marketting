"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/* ---------- Types ---------- */
export type StatItem = {
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
  durationMs?: number;
  scrambleMs?: number;
};

type StatsSectionProps = {
  items?: StatItem[];
  className?: string;
};

/* ---------- Utils ---------- */
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const formatNumber = (n: number, decimals = 0) =>
  n.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

const scrambleDigits = (finalText: string) => {
  const randDigit = () => Math.floor(Math.random() * 10).toString();
  return finalText
    .split("")
    .map((ch) => (/\d/.test(ch) && Math.random() < 0.5 ? randDigit() : ch))
    .join("");
};

/* ---------- Hook: runs count-up then brief scramble ---------- */
function useCountUpScramble(
  target: number,
  start: boolean,
  opts?: { decimals?: number; durationMs?: number; scrambleMs?: number }
) {
  const { decimals = 0, durationMs = 1200, scrambleMs = 450 } = opts || {};
  const [text, setText] = useState<string>(formatNumber(0, decimals));
  const scrambledRef = useRef(false);

  useEffect(() => {
    if (!start) return;

    let rafId = 0;
    let startTs = 0;

    const animate = (ts: number) => {
      if (!startTs) startTs = ts;
      const elapsed = ts - startTs;
      const t = Math.min(1, elapsed / durationMs);
      const current = target * easeOutCubic(t);
      setText(formatNumber(current, decimals));

      if (t < 1) {
        rafId = requestAnimationFrame(animate);
      } else if (!scrambledRef.current) {
        scrambledRef.current = true;
        const finalText = formatNumber(target, decimals);
        const tickMs = 40;
        let elapsedScramble = 0;
        const interval = setInterval(() => {
          elapsedScramble += tickMs;
          if (elapsedScramble >= scrambleMs) {
            clearInterval(interval);
            setText(finalText);
          } else {
            setText(scrambleDigits(finalText));
          }
        }, tickMs);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [start, target, decimals, durationMs, scrambleMs]);

  return text;
}

/* ---------- Hook: fire once when section enters viewport ---------- */
function useInViewOnce<T extends HTMLElement>(offset = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: offset }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [offset]);

  return { ref, inView };
}

/* ---------- Component ---------- */
export default function StatsSection({
  className = "",
  items = [
    { value: 100, suffix: "+", label: "Happy Clients" },
    { value: 2, label: "Avg. ROI" },
    { value: 44, label: "Leads/Month" },
    { value: 98, suffix: "%", label: "Retention" },
  ],
}: StatsSectionProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.3);

  return (
    <section
      id="state"
      ref={ref}
      className={`w-full bg-white py-12 md:py-16 ${className}`}
      aria-label="Key performance statistics"
    >
      <div className="mx-auto max-w-7xl px-4">
        <ul
          className={[
            "grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-12",
            "transition-opacity duration-700 ease-out",
            inView ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          {items.map((it, i) => (
            <li
              key={i}
              className={[
                "flex flex-col items-center text-center",
                "opacity-0 translate-y-2",
                inView
                  ? `animate-[fadeUp_700ms_ease-out_forwards] [animation-delay:${
                      i * 120
                    }ms]`
                  : "",
              ].join(" ")}
            >
              <StatBox
                start={inView}
                value={it.value}
                decimals={it.decimals}
                durationMs={it.durationMs}
                scrambleMs={it.scrambleMs}
                suffix={it.suffix}
                label={it.label}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Tailwind keyframes (arbitrary variant) */}
      <style jsx>{`
        :root {
          /* use your global tokens if present, else fall back */
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

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(0.5rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

/* ---------- Individual Stat ---------- */
function StatBox({
  start,
  value,
  suffix,
  decimals = 0,
  durationMs,
  scrambleMs,
  label,
}: {
  start: boolean;
  value: number;
  suffix?: string;
  decimals?: number;
  durationMs?: number;
  scrambleMs?: number;
  label: string;
}) {
  const text = useCountUpScramble(value, start, {
    decimals,
    durationMs,
    scrambleMs,
  });

  const numberEl = useMemo(
    () => (
      <span className="text-gradient tabular-nums" aria-hidden="true">
        {text}
      </span>
    ),
    [text]
  );

  return (
    <div className="flex flex-col items-center">
      <div
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-none tracking-tight tabular-nums"
        aria-label={`${text}${suffix ?? ""} ${label}`}
      >
        {numberEl}
        {suffix ? <span className="text-gradient">{suffix}</span> : null}
      </div>

      <p className="mt-3 text-sm sm:text-base font-medium text-slate-600">
        {label}
      </p>
    </div>
  );
}
