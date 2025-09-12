// components/TalentServicesSection.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Palette,
  Layout,
  Share2,
  Clapperboard,
  ChevronRight,
  LucideIcon,
} from "lucide-react";

/* ---------- Types ---------- */
type TileItem = {
  title: string;
  desc: string;
  Icon: LucideIcon;
  dark?: boolean;
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
  headingLeft = "Explore Our Expert",
  headingRight = "Talent",
  className = "",
  items = [
    {
      title: "Brand Identity",
      desc: "Visually and emotionally communicate a brand’s values and personality.",
      Icon: Palette,
      bg: "/images/brand.jpg",
      bgPosition: "center",
    },
    {
      title: "UI/UX Design",
      desc: "Crafting visually stunning and user-centric websites.",
      Icon: Layout,
      dark: true,
      bg: "/images/uiux.jpg",
      bgPosition: "center 30%",
    },
    {
      title: "Social Media",
      desc: "Strategize, create, and manage engaging content across platforms to build brand awareness.",
      Icon: Share2,
      bg: "/images/social.jpg",
    },
    {
      title: "Animation",
      desc: "Visually engaging 2D/3D motion graphics and character animation for brands, concepts, or ideas.",
      Icon: Clapperboard,
      bg: "/images/animate.jpg",
      bgPosition: "center 40%",
    },
  ],
}: Props) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.18);

  return (
    <section ref={ref} className={`w-full bg-white ${className}`}>
      <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        {/* Header (kicker & caption removed, dot removed) */}
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
    </section>
  );
}

/* ---------- Tile with image background & high-contrast text ---------- */
function TileCard({ item }: { item: TileItem }) {
  const isDark = !!item.dark;

  return (
    <article
      className={[
        "group relative isolate flex h-full min-h-[240px] sm:min-h-[280px] flex-col justify-between overflow-hidden rounded-3xl p-6 md:p-7",
        "transition-all duration-300 hover:-translate-y-0.5",
        "border border-black/10 shadow-[0_0.5px_0_rgba(2,6,23,.06),0_8px_24px_rgba(2,6,23,.06)]",
        "hover:shadow-[0_2px_10px_rgba(2,6,23,.08),0_18px_60px_rgba(2,6,23,.12)]",
      ].join(" ")}
    >
      {/* BG image */}
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

      {/* Strong readability overlay on ALL tiles */}
      <div
        aria-hidden
        className={[
          "absolute inset-0 -z-10 transition-opacity duration-500",
          isDark
            ? "bg-gradient-to-br from-black/75 via-black/55 to-black/30"
            : "bg-gradient-to-br from-black/65 via-black/40 to-black/25",
          "backdrop-blur-[1px]",
        ].join(" ")}
      />

      {/* Hover ring accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 transition group-hover:ring-purple-500/30"
      />

      {/* Content */}
      <div className="relative z-10">
        <div
          className={[
            "mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full ring-1",
            "bg-white/15 text-white ring-white/25 backdrop-blur-[1px]",
          ].join(" ")}
        >
          <item.Icon className="h-5 w-5" />
        </div>

        {/* Title — WHITE + larger + drop shadow */}
        <h3 className="text-2xl md:text-3xl font-semibold text-white filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
          {item.title}
        </h3>

        {/* Description — Indigo/blue tint + larger + drop shadow */}
        <p className="mt-3 text-base md:text-lg leading-relaxed text-indigo-100/95 filter drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]">
          {item.desc}
        </p>
      </div>

      {/* Bottom-right arrow chip */}
      <div className="relative z-10 mt-6 flex justify-end">
        <button
          className={[
            "inline-flex h-10 w-10 items-center justify-center rounded-full border text-sm transition",
            "border-white/30 bg-white/15 text-white hover:border-white/50 backdrop-blur-[1px]",
            "shadow-sm",
          ].join(" ")}
          aria-label="Open"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
