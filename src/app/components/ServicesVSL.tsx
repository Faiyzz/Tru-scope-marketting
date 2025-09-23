// src/app/components/ServicesSection.tsx
"use client";

import type { ReactElement, CSSProperties } from "react";
import { Clapperboard, CalendarDays, Megaphone, Globe2 } from "lucide-react";
import { motion, Variants, easeOut } from "framer-motion";

type Service = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
};

const SERVICES: Service[] = [
  {
    title: "Video Content Creation",
    description:
      "Reels/shorts with hooks, subtitles, motion graphics, and platform-ready exports.",
    icon: Clapperboard,
  },
  {
    title: "Social Media Management",
    description:
      "Calendar, scheduling, posting, DM triage, and community responses — end-to-end.",
    icon: CalendarDays,
  },
  {
    title: "Social Media Marketing",
    description:
      "Creative strategy, content angles, and paid assets that drive reach and conversions.",
    icon: Megaphone,
  },
  {
    title: "Web Development",
    description:
      "Fast, modern sites with clean UX, SEO-friendly structure, and scalable components.",
    icon: Globe2,
  },
];

// Accent matches the heading's last word color
const ACCENT = "#8A5CFF";

// Reuse the same gradient everywhere (no styled-jsx)
const GRADIENT = "linear-gradient(100deg,#8a5cff,#b18cff,#3ac4ec,#8a5cff)";

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export default function ServicesSection(): ReactElement {
  const style: CSSProperties = {};
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-white"
      style={style}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <motion.h1
            id="services-heading"
            className="text-center font-extrabold tracking-tight leading-[0.98] text-[clamp(28px,6vw,56px)] text-slate-900"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            Our <span className="text-[#8A5CFF]">Services</span>
          </motion.h1>

          <p className="mt-4 text-base text-gray-600">
            Creative and technical execution with a focus on clarity, speed, and
            results.
          </p>
        </header>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-12 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SERVICES.map(({ title, description, icon: Icon, badge }) => (
            <motion.article
              key={title}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -6 }}
              whileTap={{ scale: 0.99 }}
              className="group relative flex h-full flex-col rounded-2xl border border-[#8A5CFF]/30 bg-white p-6
                         shadow-[0_8px_30px_rgba(2,6,23,0.06)] transition-all will-change-transform
                         hover:border-[#8A5CFF] hover:shadow-[0_18px_50px_rgba(2,6,23,0.12)]"
            >
              {/* Icon chip */}
              <motion.div
                aria-hidden
                className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-sm ring-1 ring-black/5"
                style={{
                  backgroundImage: GRADIENT,
                  backgroundSize: "200% auto",
                  backgroundPosition: "0% center",
                }}
                whileHover={{ backgroundPosition: "100% center" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Icon className="h-6 w-6" />
              </motion.div>

              {/* Text */}
              <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
              {badge && (
                <span className="mt-1 inline-flex items-center rounded-full bg-white/70 px-2 py-0.5 text-[11px] font-medium text-gray-900 ring-1 ring-black/5">
                  {badge}
                </span>
              )}
              <p className="mt-2 text-[15px] leading-7 text-gray-600 md:text-base">
                {description}
              </p>

              {/* Removed CTA; add a small spacer so height feels balanced */}
              <div className="mt-4" />
              {/* Focus ring (matched to accent) */}
              <span className="pointer-events-none absolute inset-0 rounded-2xl ring-0 transition group-focus-within:ring-2 group-focus-within:ring-[#8A5CFF]" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
