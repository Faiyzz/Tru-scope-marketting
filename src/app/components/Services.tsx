"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Target,
  Search,
  UsersRound,
  Code2,
  Check,
  LucideIcon,
} from "lucide-react";

type ServiceItem = {
  title: string;
  points: string[];
  note?: string;
  Icon: LucideIcon;
};
type ServicesSectionProps = {
  kicker?: string;
  title?: string;
  subtitle?: string;
  items?: ServiceItem[];
  className?: string;
};

function useInViewOnce<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function ServicesSection({
  kicker = "What We Do For You",
  title = "Comprehensive marketing solutions tailored to your unique business needs",
  subtitle,
  className = "",
  items = [
    {
      title: "Paid Traffic",
      Icon: Target,
      points: [
        "Precision audience targeting",
        "Conversion-optimized campaigns",
        "ROI-focused ad spend",
        "Continuous A/B testing",
      ],
      note: "+80% engagement lift",
    },
    {
      title: "SEO",
      Icon: Search,
      points: [
        "Organic growth that compounds",
        "On-page & off-page strategies",
        "Keyword research & targeting",
        "Technical SEO optimization",
      ],
      note: "+60% search visibility",
    },
    {
      title: "Social Media Management",
      Icon: UsersRound,
      points: [
        "Engagement that converts",
        "Platform-specific strategies",
        "Community building",
        "Viral content creation",
      ],
      note: "+120% follower growth",
    },
    {
      title: "Web Development",
      Icon: Code2,
      points: [
        "High-converting experiences",
        "Custom responsive design",
        "Fast & SEO-friendly code",
        "Ongoing support & updates",
      ],
      note: "+95% site performance",
    },
  ],
}: ServicesSectionProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.2);

  return (
    <section ref={ref} className={`w-full bg-white ${className}`}>
      <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <header className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            {kicker}
          </h2>
          <p className="mt-3 text-base text-slate-600 md:text-lg">
            {subtitle ?? title}
          </p>
        </header>

        {/* Stretch items so all cards are equal height per row */}
        <ul
          className={[
            "mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 items-stretch",
            "transition-opacity duration-700",
            inView ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          {items.map((s) => (
            <li key={s.title} className="h-full">
              {/* Make the card a flex column + h-full so CTA can stick to bottom */}
              <article
                className={[
                  "group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 sm:p-7",
                  "shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-within:-translate-y-1 focus-within:shadow-xl",
                ].join(" ")}
                style={{
                  background:
                    "linear-gradient(white, white) padding-box, linear-gradient(180deg, rgba(67,56,202,.12), rgba(168,85,247,.12)) border-box",
                }}
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-slate-50 to-slate-100 ring-1 ring-slate-200 transition-transform duration-300 group-hover:scale-105">
                  <s.Icon
                    className="h-6 w-6 text-slate-700"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="text-xl font-semibold text-slate-900">
                  {s.title}
                </h3>

                <ul className="mt-4 space-y-3">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3 text-slate-700">
                      <Check className="mt-0.5 h-5 w-5 text-emerald-500" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                {!!s.note && (
                  <p className="mt-5 text-sm text-slate-500">{s.note}</p>
                )}

                {/* CTA pinned to bottom with mt-auto */}
                <div className="mt-auto pt-6">
                  <a
                    href="#proposal"
                    className={[
                      "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white",
                      "bg-gradient-to-r from-sky-500 to-violet-500",
                      "shadow-md transition-all duration-300 hover:shadow-xl hover:brightness-[1.05] hover:-translate-y-0.5 active:translate-y-0",
                    ].join(" ")}
                  >
                    Get Proposal
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
