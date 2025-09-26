// components/TalentServicesSection.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";

/* ---------- Types ---------- */
type TileItem = {
  title: string;
  desc: string;
  Icon: LucideIcon; // kept for compatibility (not used for rendering)
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
      Icon: (() => null) as unknown as LucideIcon, // unused
      bg: "/images/1.jpg",
      bgPosition: "center",
    },
    {
      title: "Social Media Management",
      desc: "Calendar, scheduling, posting, DM triage, and community responses — end-to-end.",
      Icon: (() => null) as unknown as LucideIcon,
      bg: "/images/2.jpg",
      bgPosition: "center 30%",
    },
    {
      title: "Social Media Marketing",
      desc: "Creative strategy, content angles, and paid assets that drive reach and conversions.",
      Icon: (() => null) as unknown as LucideIcon,
      bg: "/images/3.jpg",
    },
    {
      title: "Web Development",
      desc: "Fast, modern sites with clean UX, SEO-friendly structure, and scalable components.",
      Icon: (() => null) as unknown as LucideIcon,
      bg: "/images/4.jpg",
      bgPosition: "center 40%",
    },
  ],
}: Props) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.18);

  return (
    <section id="work" ref={ref} className={`w-full bg-white ${className}`}>
      <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <div className="mb-8 grid grid-cols-1 gap-6 sm:mb-10">
          <h2 className="text-center font-extrabold tracking-tight leading-[0.98] text-[clamp(28px,6vw,56px)] text-slate-900 mb-4 pb-2">
            {headingLeft}{" "}
            <span className="text-[var(--brand-purple,#8a5cff)]">
              {headingRight}
            </span>
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

      {/* Local helpers: animated brand gradient + variables */}
      <style jsx>{`
        :root {
          --brand-purple: var(--brand-purple, #8a5cff);
          --brand-lilac: var(--brand-lilac, #b18cff);
          --brand-cyan: var(--brand-cyan, #3ac4ec);
        }
        @keyframes gradient-pan {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
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
          animation: gradient-pan 8s linear infinite;
        }
      `}</style>
    </section>
  );
}

/* ---------- Map title → icon key ---------- */
function mapTitleToIconKey(title: string): AnimatedIconKey {
  if (/video/i.test(title)) return "clapperboard";
  if (/management/i.test(title) || /calendar|schedule|social/i.test(title))
    return "calendar";
  if (/marketing|ads|media/i.test(title)) return "megaphone";
  if (/web|site|development/i.test(title)) return "globe";
  // fallback
  return "clapperboard";
}

/* ---------- Tile with image background ---------- */
function TileCard({ item }: { item: TileItem }) {
  const which = mapTitleToIconKey(item.title);
  return (
    <article
      className={[
        "group relative isolate flex h-full min-h-[240px] sm:min-h-[280px] flex-col justify-between overflow-hidden rounded-3xl p-6 md:p-7",
        "transition-all duration-300 md:hover:-translate-y-0.5",
        "border border-black/10 shadow-[0_0.5px_0_rgba(2,6,23,.06),0_8px_24px_rgba(2,6,23,.06)]",
        "md:hover:shadow-[0_2px_10px_rgba(2,6,23,.08),0_18px_60px_rgba(2,6,23,.12)]",
      ].join(" ")}
    >
      {/* BG image */}
      {item.bg && (
        <Image
          src={item.bg}
          alt=""
          fill
          priority={false}
          quality={90}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
          className="absolute inset-0 -z-20 object-cover md:transition-transform md:duration-500 md:group-hover:scale-[1.05]"
          style={{ objectPosition: item.bgPosition || "center" }}
        />
      )}

      {/* Readability overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-br from-black/70 via-black/45 to-black/25 md:backdrop-blur-[1px] transition-opacity duration-500"
      />

      {/* Hover ring accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 transition md:group-hover:ring-[var(--brand-cyan,#3ac4ec)]/30"
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon chip: WHITE background + gradient-stroked SVG icon */}
        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white ring-1 ring-black/10 shadow-sm">
          <AnimatedGradientIcon which={which} />
        </div>

        <h3 className="text-2xl md:text-3xl font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
          {item.title}
        </h3>

        <p className="mt-3 text-base md:text-lg leading-relaxed text-indigo-100/95 drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]">
          {item.desc}
        </p>
      </div>
    </article>
  );
}

/* ---------- Animated Gradient Icons (stroke = url(#grad)) ---------- */
type AnimatedIconKey = "clapperboard" | "calendar" | "megaphone" | "globe";

function AnimatedGradientIcon({ which }: { which: AnimatedIconKey }) {
  const id = React.useId(); // unique per render

  const strokeProps = {
    fill: "none",
    stroke: `url(#grad-${id})`,
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      aria-hidden="true"
      role="img"
    >
      <defs>
        {/* Moving stops to mimic your reference animation */}
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

      {which === "clapperboard" && (
        <>
          {/* Clapper top */}
          <path d="M3 7l3-3 4 4 4-4 3 3" {...strokeProps} />
          {/* Body */}
          <rect x="3" y="7" width="18" height="12" rx="2" {...strokeProps} />
          {/* Hinges */}
          <path d="M3 10h18" {...strokeProps} />
        </>
      )}

      {which === "calendar" && (
        <>
          <rect x="3" y="5" width="18" height="16" rx="2" {...strokeProps} />
          <path d="M16 3v4M8 3v4M3 9h18" {...strokeProps} />
          {/* Few date dots */}
          <path
            d="M7 13h2M11 13h2M15 13h2M7 17h2M11 17h2M15 17h2"
            {...strokeProps}
          />
        </>
      )}

      {which === "megaphone" && (
        <>
          <path d="M3 11l10-4v10L3 13v-2z" {...strokeProps} />
          <path d="M13 7l5-2v14l-5-2" {...strokeProps} />
          <path d="M6 14l1.5 4.5" {...strokeProps} />
        </>
      )}

      {which === "globe" && (
        <>
          <circle cx="12" cy="12" r="9" {...strokeProps} />
          <path d="M3 12h18" {...strokeProps} />
          <path d="M12 3c3 3.5 3 14.5 0 18" {...strokeProps} />
          <path d="M12 3c-3 3.5-3 14.5 0 18" {...strokeProps} />
        </>
      )}
    </svg>
  );
}
