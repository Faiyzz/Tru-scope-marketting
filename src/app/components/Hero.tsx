"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Search,
  UserRound,
  Code2,
  Zap,
  Play,
  PhoneCall,
} from "lucide-react";
import Link from "next/link";

type ServiceCard = {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
};

export default function Hero() {
  // Cards data
  const baseCards: ServiceCard[] = useMemo(
    () => [
      {
        id: "paid-ads",
        title: "Paid Ads",
        desc: "Precision-targeted campaigns",
        icon: <Target className="h-6 w-6" />,
      },
      {
        id: "seo",
        title: "SEO",
        desc: "Organic growth that compounds",
        icon: <Search className="h-6 w-6" />,
      },
      {
        id: "smm",
        title: "SMM",
        desc: "Engagement that converts",
        icon: <UserRound className="h-6 w-6" />,
      },
      {
        id: "web-dev",
        title: "Web Dev",
        desc: "High-converting experiences",
        icon: <Code2 className="h-6 w-6" />,
      },
    ],
    []
  );

  // Animated rotation
  const [cards, setCards] = useState<ServiceCard[]>(baseCards);
  const [paused, setPaused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = window.setInterval(() => {
      setCards((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }, 2800);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [paused]);

  return (
    <section className="relative isolate overflow-hidden">
      {/* Radial background fill */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[radial-gradient(65rem_65rem_at_15%_10%,rgba(99,102,241,0.28),transparent_60%),
              radial-gradient(50rem_50rem_at_85%_75%,rgba(236,72,153,0.22),transparent_55%)]
        "
      />

      {/* Make columns top-aligned so cards align with hero text */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-6 py-16 md:grid-cols-2 md:py-24 lg:gap-16 md:grid-rows-[auto]">
        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <h1 className="mx-auto max-w-4xl px-0 text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl leading-tight font-[Poppins]">
            Get{" "}
            <span className="bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#60A5FA] bg-clip-text text-transparent">
              Booked Solid
            </span>
            <br />
            With High-Performance
            <br />
            Marketing
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 md:text-xl">
            Performance ads, conversion-ready pages, and SEO that compounds.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CTAButton
              href="#book"
              variant="primary"
              icon={<PhoneCall className="h-4 w-4" />}
            >
              Book Free Strategy Call
            </CTAButton>

            <CTAButton
              href="#resources"
              variant="ghost"
              icon={<Play className="h-4 w-4" />}
            >
              Get FREE Resources
            </CTAButton>
          </div>

          <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">
            <Zap className="h-4 w-4 text-indigo-500" />
            <span>24-hour response time</span>
          </div>
        </motion.div>

        {/* Right: 2×2 animated cards (kept white, colored gradient borders preserved) */}
        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative self-start"
        >
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="grid grid-cols-2 gap-6"
          >
            <AnimatePresence initial={false}>
              {cards.map((card) => (
                <motion.div
                  key={card.id}
                  layout
                  transition={{
                    layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  }}
                  initial={{ opacity: 0, scale: 0.98, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="group"
                >
                  {/* Colored gradient border wrapper */}
                  <div className="rounded-2xl bg-[linear-gradient(135deg,rgba(99,102,241,0.65),rgba(14,165,233,0.38))] p-[1.5px] transition group-hover:scale-[1.01]">
                    <div
                      className={[
                        // CARD: pure white, no inner tint, no inner white border
                        "relative h-full rounded-2xl bg-white p-6",
                        // subtle depth + hover pop
                        "shadow-[0_6px_22px_rgba(15,23,42,0.06)] transition",
                        "hover:-translate-y-0.5 hover:shadow-[0_16px_46px_rgba(79,70,229,0.20)]",
                        mounted ? "" : "animate-pulse",
                      ].join(" ")}
                    >
                      {/* Icon bubble */}
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 ring-indigo-100 transition group-hover:ring-indigo-300">
                        <span className="text-slate-700 group-hover:text-indigo-600">
                          {card.icon}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {card.desc}
                      </p>

                      {/* Focus ring on hover */}
                      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-indigo-400/0 transition group-hover:ring-2 group-hover:ring-indigo-400/30" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Reusable CTA button ---------- */
function CTAButton({
  href,
  children,
  icon,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm md:text-base font-semibold transition will-change-transform active:scale-95";
  if (variant === "primary") {
    return (
      <Link
        href={href}
        className={`${base} bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-[0_10px_30px_rgba(59,130,246,0.35)]
        hover:from-indigo-500 hover:to-violet-500 hover:shadow-[0_18px_48px_rgba(99,102,241,0.45)]`}
      >
        <span className="shrink-0">{icon}</span>
        {children}
      </Link>
    );
  }
  return (
    <Link
      href={href}
      className={`${base} bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-950 shadow-[0_6px_20px_rgba(15,23,42,0.06)]
      hover:shadow-[0_12px_32px_rgba(15,23,42,0.10)]`}
    >
      <span className="shrink-0">{icon}</span>
      {children}
    </Link>
  );
}
