// components/TestimonialsSection.tsx
"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Testimonial = {
  name: string;
  role: string;
  company?: string;
  quote: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  avatarUrl?: string;
};

type Props = {
  title?: string;
  /** If provided and found in title, only this word will be colored; otherwise the last word is colored */
  highlightWord?: string;
  /** Solid accent for heading highlight + card stroke */
  accentColor?: string; // e.g. "#8A5CFF"
  /** Border width in px for all cards (default 2) */
  strokeWidth?: number;
  subtitle?: string;
  items?: Testimonial[];
  initialLoadingMs?: number;
};

export default function TestimonialsSection({
  title = "What Our Clients Say",
  subtitle = "Real results from real business owners",
  items,
  initialLoadingMs = 800,
  highlightWord,
  accentColor = "#8A5CFF",
  strokeWidth = 2,
}: Props) {
  const DATA = useMemo<Testimonial[]>(
    () =>
      items ?? [
        {
          name: "Sarah Johnson",
          role: "CEO",
          company: "Wellness Spa",
          quote:
            "“TruScope transformed our online presence. Our appointment book is now consistently full thanks to their strategic marketing approach.”",
          rating: 5,
        },
        {
          name: "Michael Chen",
          role: "Founder",
          company: "Tech Startup",
          quote:
            "“The ROI from our marketing spend has increased dramatically since working with TruScope. They truly understand performance marketing.”",
          rating: 5,
        },
        {
          name: "David Rodriguez",
          role: "Marketing Director",
          quote:
            "“Their team delivers on promises. Our organic traffic has tripled and lead quality has improved significantly in just six months.”",
          rating: 5,
        },
      ],
    [items]
  );

  // skeleton entrance
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const id = setTimeout(
      () => setLoading(false),
      Math.max(0, initialLoadingMs)
    );
    return () => clearTimeout(id);
  }, [initialLoadingMs]);

  // scroll-in reveal
  const rootRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!rootRef.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold: 0.2 }
    );
    io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  // Accent border style shared by all cards
  const cardStrokeStyle = {
    borderColor: accentColor,
    borderWidth: strokeWidth,
  };

  return (
    <section
      id="testimonil"
      ref={rootRef}
      className="relative w-full bg-slate-50"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-8">
        <header
          className={`text-center ${
            inView ? "animate-rise-in" : "opacity-0 translate-y-3"
          }`}
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl text-center">
            {renderHighlightedTitle(title, highlightWord, accentColor)}
          </h2>
          <p className="mt-3 text-slate-600 md:text-lg">{subtitle}</p>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:gap-6 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <figure
                  key={`skeleton-${i}`}
                  className={`rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${
                    inView ? "animate-fade-in" : "opacity-0"
                  }`}
                  style={{
                    ...cardStrokeStyle,
                    animationDelay: `${150 + i * 120}ms`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="skeleton h-12 w-12 rounded-full" />
                    <figcaption className="flex-1">
                      <div className="skeleton h-4 w-40 rounded" />
                      <div className="mt-2 skeleton h-3 w-28 rounded" />
                    </figcaption>
                  </div>
                  <div className="mt-4">
                    <div className="skeleton h-4 w-24 rounded" />
                  </div>
                  <blockquote className="mt-4 text-slate-700 italic">
                    <div className="skeleton mb-2 h-4 w-full rounded" />
                    <div className="skeleton mb-2 h-4 w-5/6 rounded" />
                    <div className="skeleton h-4 w-3/5 rounded" />
                  </blockquote>
                </figure>
              ))
            : DATA.map((t, i) => (
                <figure
                  key={`t-${t.name}-${i}`}
                  className={`rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${
                    inView ? "animate-fade-in" : "opacity-0"
                  }`}
                  style={{
                    ...cardStrokeStyle,
                    animationDelay: `${150 + i * 120}ms`,
                  }}
                >
                  {/* Header: avatar + name */}
                  <div className="flex items-center gap-3">
                    {t.avatarUrl ? (
                      <Image
                        src={t.avatarUrl}
                        alt={`${t.name} avatar`}
                        className="h-12 w-12 rounded-full object-cover"
                        width={48}
                        height={48}
                      />
                    ) : (
                      <AvatarIcon />
                    )}

                    <figcaption className="flex-1">
                      <p className="text-base font-semibold text-slate-900">
                        {t.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {t.role}
                        {t.company ? `, ${t.company}` : ""}
                      </p>
                    </figcaption>
                  </div>

                  {/* Stars */}
                  <div className="mt-4">
                    <RatingStars count={t.rating ?? 5} />
                  </div>

                  {/* Quote */}
                  <blockquote className="mt-4 text-slate-700 italic">
                    {t.quote}
                  </blockquote>
                </figure>
              ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- helpers ---------- */
function renderHighlightedTitle(
  title: string,
  highlightWord: string | undefined,
  accentColor: string
) {
  const pick = (() => {
    if (highlightWord && title.includes(highlightWord)) return highlightWord;
    const parts = title.trim().split(/\s+/);
    return parts.length > 1 ? parts[parts.length - 1] : title; // last word
  })();

  const idx = title.indexOf(pick);
  if (idx === -1) return title;

  const before = title.slice(0, idx);
  const after = title.slice(idx + pick.length);

  return (
    <>
      {before}
      <span style={{ color: accentColor }}>{pick}</span>
      {after}
    </>
  );
}

/* ---------- UI bits ---------- */

function RatingStars({ count = 5 }: { count?: number }) {
  const clamped = Math.max(0, Math.min(5, count));
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${clamped} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-5 w-5 ${
            i < clamped ? "text-amber-400" : "text-slate-300"
          }`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 2.5l2.47 5.01 5.53.8-4 3.9.95 5.54L10 15.9 5.05 17.75l.95-5.54-4-3.9 5.53-.8L10 2.5z" />
        </svg>
      ))}
    </div>
  );
}

function AvatarIcon() {
  return (
    <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-8 9a8 8 0 1116 0H4z" />
      </svg>
    </div>
  );
}
