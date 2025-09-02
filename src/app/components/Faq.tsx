// components/FaqSection.tsx
"use client";

import React, { useId, useState } from "react";

type FaqItem = { q: string; a: string };

type Props = {
  title?: string;
  subtitle?: string;
  items?: FaqItem[];
  defaultOpen?: number[]; // indexes to open by default (e.g., [0])
  accentClass?: string; // tailwind color class for accents (e.g., "text-purple-700")
};

export default function FaqSection({
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about working with us",
  items,
  defaultOpen = [0],
  accentClass = "text-purple-700",
}: Props) {
  const DATA: FaqItem[] = items ?? [
    {
      q: "What's your minimum contract length?",
      a: "We require a minimum of 3-months to properly implement and optimize our strategies. Most clients see the best results with 6–12 month engagements.",
    },
    {
      q: "What's your onboarding timeline?",
      a: "Our onboarding follows a structured 5-step process: Welcome (1–2 days), Access (3–5 days), Strategy (1–2 weeks), Setup (1 week), and Launch (1–2 weeks). Most clients are fully onboarded within 3–4 weeks.",
    },
    {
      q: "Can you describe your creative process?",
      a: "Our creative process begins with deep audience research, followed by concept development. We create initial drafts, submit for client review, incorporate feedback, and refine until we have high-performing creatives that resonate with your target audience.",
    },
    {
      q: "How often will I receive reports?",
      a: "We provide weekly, bi-weekly, or monthly reporting depending on client preference. All reports include clear KPIs, insights, and actionable recommendations to continually improve performance.",
    },
    {
      q: "What's your minimum ad spend requirement?",
      a: "We recommend a minimum ad spend of $500 to achieve meaningful results. Optimal budgets vary by industry and goals, which we'll determine during your strategy session.",
    },
    {
      q: "Do you work with specific industries?",
      a: "We provide marketing solutions for every industry. Our team has particular expertise in professional services, e-commerce, healthcare, and SaaS, but our methodologies apply universally to any business looking to grow.",
    },
  ];

  // Track open rows (multiple can be open)
  const [open, setOpen] = useState<Set<number>>(new Set(defaultOpen));
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <section className="w-full bg-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <header className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            {title}
          </h2>
          <p className="mt-3 text-slate-600 md:text-lg">{subtitle}</p>
        </header>

        <div className="mt-10 md:mt-14">
          {DATA.map((item, i) => (
            <FaqRow
              key={i}
              i={i}
              q={item.q}
              a={item.a}
              open={open.has(i)}
              onToggle={() => toggle(i)}
              accentClass={accentClass}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Row ---------------- */

function FaqRow({
  i,
  q,
  a,
  open,
  onToggle,
  accentClass,
}: {
  i: number;
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
  accentClass: string;
}) {
  const baseId = useId();
  const contentId = `${baseId}-content`;

  return (
    <div className="py-6">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={onToggle}
        className="group flex w-full items-start justify-between gap-6 text-left focus:outline-none"
      >
        <h3 className={`text-base font-semibold md:text-lg ${accentClass}`}>
          {q}
        </h3>

        {/* Arrow */}
        <ChevronIcon
          className={`h-5 w-5 shrink-0 text-purple-600 transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Answer with smooth expand/collapse */}
      <div
        id={contentId}
        className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
          open
            ? "grid-rows-[1fr] opacity-100 mt-3"
            : "grid-rows-[0fr] opacity-0 mt-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-slate-700 leading-relaxed">{a}</p>
        </div>
      </div>

      {/* Purple divider like screenshot */}
      <div className="mt-6 h-px bg-purple-300/70" />
    </div>
  );
}

/* ---------------- Icons ---------------- */

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
