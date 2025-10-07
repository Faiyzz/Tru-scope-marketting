// app/components/OurWork.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants, easeOut } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React from "react";

/* animations to match Hero (vertical) */
const ease = [0.22, 1, 0.36, 1] as const;
const sectionEnter: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
  exit: { opacity: 0, y: -24, transition: { duration: 0.35, ease } },
};
const gridStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const cardIn: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: easeOut },
  },
};

/* ---- 9 demo items (subtitle/description will be ignored in UI) ---- */
type WorkItem = {
  title: string;
  subtitle?: string;
  description?: string;
  href: string;
  image: string;
};
const WORK: WorkItem[] = [
  {
    title: "Ridgeback Built",
    subtitle: "Web design",
    description: "Clean brand-led site.",
    href: "https://ridge-back-builders.vercel.app/",
    image: "/images/rb.png",
  },
  {
    title: "Steve Park",
    subtitle: "Personal brand",
    description: "Cinematic demo site.",
    href: "https://finance-steve-park-site.vercel.app/",
    image: "/images/SP.png",
  },
  {
    title: "Dr Jhonathan M.Fields",
    subtitle: "Contractor",
    description: "Lead-focused UX.",
    href: "https://nextjonathan.vercel.app/",
    image: "/images/jhon.png",
  },
  {
    title: "Nobtimed Marketing",
    subtitle: "Education",
    description: "Training that converts.",
    href: "https://nobtimed-marketing.vercel.app/",
    image: "/images/nobtimed.png",
  },
  {
    title: "Housers",
    subtitle: "Hospitality",
    description: "Sleek, single-page.",
    href: "https://houser-beta.vercel.app/",
    image: "/images/houser.png",
  },
  {
    title: "ScalewithCK",
    subtitle: "Agency",
    description: "Glossy device vibe.",
    href: "https://www.scalewithck.com/",
    image: "/images/scale.png",
  },
  {
    title: "Stratos",
    subtitle: "Real estate",
    description: "Home search flow.",
    href: "https://dom-ricii.vercel.app/",
    image: "/images/stratos.png",
  },
  {
    title: "Victoria Rose",
    subtitle: "Creator",
    description: "Modern portfolio.",
    href: "https://victoriaroserecords.com/",
    image: "/images/rose.png",
  },
  {
    title: "SER-VEH-ZAH",
    subtitle: "Showcase",
    description: "Extra sample card.",
    href: "https://servehzah.vercel.app/",
    image: "/images/ser.png",
  },
];

export default function OurWork() {
  return (
    <AnimatePresence mode="wait">
      <motion.section
        aria-label="Our Work"
        variants={sectionEnter}
        initial="hidden"
        animate="show"
        exit="exit"
        className="bg-white"
      >
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8 py-10 sm:py-14">
          <motion.header
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            viewport={{ once: true, amount: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-center text-[clamp(26px,5.2vw,44px)] font-extrabold tracking-tight leading-tight text-neutral-900">
              Our{" "}
              <span className="text-shine bg-clip-text text-transparent">
                Work
              </span>
            </h2>
          </motion.header>

          {/* 3 columns at md+ */}
          <motion.ul
            variants={gridStagger}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
          >
            {WORK.slice(0, 9).map((item) => (
              <motion.li key={item.title} variants={cardIn}>
                <WorkCard item={item} />
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* keep theme bits inline in case Hero isn't mounted */}
        <style jsx global>{`
          :root {
            --brand-purple: #8a5cff;
            --brand-lilac: #b18cff;
            --brand-cyan: #3ac4ec;
            --brand-gradient: linear-gradient(
              100deg,
              var(--brand-purple) 8%,
              var(--brand-lilac) 28%,
              var(--brand-cyan) 58%,
              var(--brand-purple) 86%
            );
          }
          .text-shine {
            background-image: var(--brand-gradient);
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: shine 2.6s linear infinite;
          }
          .btn-gradient-outline {
            position: relative;
            isolation: isolate;
            background: white;
            color: #111;
            border-radius: 9999px;
          }
          .btn-gradient-outline::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 9999px;
            padding: 1px;
            background-image: var(--brand-gradient);
            background-size: 200% auto;
            -webkit-mask: linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            z-index: -1;
            animation: shine 2.6s linear infinite;
          }
          @keyframes shine {
            to {
              background-position: -200% center;
            }
          }
        `}</style>
      </motion.section>
    </AnimatePresence>
  );
}

function WorkCard({ item }: { item: WorkItem }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_42px_rgba(0,0,0,0.10)]">
      {/* larger visual footprint via aspect and padding */}
      <figure className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-100">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
      </figure>

      <div className="p-5">
        <h3 className="text-[16px] font-semibold text-neutral-900 leading-snug">
          {item.title}
        </h3>

        {/* subtitle & description intentionally removed to match request */}

        <div className="mt-3">
          <Link
            href={item.href}
            target="_blank"
            className="inline-flex items-center gap-2 px-3.5 h-9.5 text-[13.5px] font-medium btn-gradient-outline hover:shadow-sm"
            aria-label={`Visit ${item.title}`}
          >
            <span>Visit Site</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
