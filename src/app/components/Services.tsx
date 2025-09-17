// components/TalentServicesSection.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Clapperboard,
  CalendarDays,
  Megaphone,
  Globe2,
  LucideIcon,
} from "lucide-react";

/* ---------- Types ---------- */
type TileItem = {
  title: string;
  desc: string;
  Icon: LucideIcon;
  bg?: string;
  bgPosition?: string;
};

type Props = {
  headingLeft?: string;
  headingRight?: string;
  items?: TileItem[];
  className?: string;
};

/* ---------- In-view fade-in (one time) ---------- */
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

/* ---------- Component ---------- */
export default function TalentServicesSection({
  headingLeft = "Explore Our",
  headingRight = "Services",
  className = "",
  items = [
    {
      title: "Video Content Creation",
      desc: "Reels/shorts with hooks, subtitles, motion graphics, and platform-ready exports.",
      Icon: Clapperboard,
      bg: "/images/1.jpg", // swap with your image
      bgPosition: "center",
    },
    {
      title: "Social Media Management",
      desc: "Calendar, scheduling, posting, DM triage, and community responses — end-to-end.",
      Icon: CalendarDays,
      bg: "/images/2.jpg",
      bgPosition: "center 30%",
    },
    {
      title: "Social Media Marketing",
      desc: "Creative strategy, content angles, and paid assets that drive reach and conversions.",
      Icon: Megaphone,
      bg: "/images/3.jpg",
    },
    {
      title: "Web Development",
      desc: "Fast, modern sites with clean UX, SEO-friendly structure, and scalable components.",
      Icon: Globe2,
      bg: "/images/4.jpg",
      bgPosition: "center 40%",
    },
  ],
}: Props) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.18);

  return (
    <section id="work" ref={ref} className={`w-full bg-white ${className}`}>
      <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <div className="mb-8 grid grid-cols-1 items-end gap-6 sm:mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            {headingLeft} {headingRight}
          </h2>
        </div>

        {/* Grid */}
        <ul
          className={[
            "grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2",
            "transition-opacity duration-700",
            inView ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          {items.map((it) => (
            <li key={it.title} className="h-full">
              <TileCard item={it} />
            </li>
          ))}
        </ul>
      </div>

      {/* Local helpers: brand gradient for icon chips */}
      <style jsx>{`
        :root {
          --brand-purple: var(--brand-purple, #8a5cff);
          --brand-lilac: var(--brand-lilac, #b18cff);
          --brand-cyan: var(--brand-cyan, #3ac4ec);
        }
        .grad-bg {
          background-image: linear-gradient(
            100deg,
            var(--brand-purple),
            var(--brand-lilac),
            var(--brand-cyan),
            var(--brand-purple)
          );
          background-size: 200% auto;
        }
      `}</style>
    </section>
  );
}

/* ---------- Tile with image background ---------- */
function TileCard({ item }: { item: TileItem }) {
  return (
    <article
      className={[
        "group relative isolate flex h-full min-h-[240px] sm:min-h-[280px] flex-col justify-between overflow-hidden rounded-3xl p-6 md:p-7",
        "transition-all duration-300 hover:-translate-y-0.5",
        "border border-black/10 shadow-[0_0.5px_0_rgba(2,6,23,.06),0_8px_24px_rgba(2,6,23,.06)]",
        "hover:shadow-[0_2px_10px_rgba(2,6,23,.08),0_18px_60px_rgba(2,6,23,.12)]",
      ].join(" ")}
    >
      {/* BG image (replace with your higher quality assets) */}
      {item.bg && (
        <Image
          src={item.bg}
          alt=""
          fill
          priority={false}
          className="absolute inset-0 -z-20 object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          style={{ objectPosition: item.bgPosition || "center" }}
        />
      )}

      {/* Readability overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-br from-black/70 via-black/45 to-black/25 backdrop-blur-[1px] transition-opacity duration-500"
      />

      {/* Hover ring accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 transition group-hover:ring-[var(--brand-cyan,#3ac4ec)]/30"
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon chip with SOLID white icon on brand gradient background */}
        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full grad-bg text-white ring-1 ring-white/30 shadow-sm backdrop-blur-[1px]">
          <item.Icon className="h-5 w-5 text-white" strokeWidth={2.5} />
        </div>

        <h3 className="text-2xl md:text-3xl font-semibold text-white filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
          {item.title}
        </h3>

        <p className="mt-3 text-base md:text-lg leading-relaxed text-indigo-100/95 filter drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]">
          {item.desc}
        </p>
      </div>

      {/* NOTE: Removed the bottom-right button per your request */}
    </article>
  );
}
