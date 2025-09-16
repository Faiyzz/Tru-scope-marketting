"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Target, Camera, Scissors, BarChart3 } from "lucide-react";

/* --------- Condensed steps (4 cards) --------- */
type Feature = {
  title: string;
  desc: string;
  Icon: LucideIcon;
  side: "left" | "right";
};

const FEATURES: Feature[] = [
  {
    title: "Strategy & Pillars",
    desc: "ICP research, content pillars, and a monthly roadmap aligned to outcomes. Hooks, outlines, scripts, and shot lists included.",
    Icon: Target,
    side: "left",
  },
  {
    title: "Record & Collaborate",
    desc: "You record on your phone/camera using our guides, upload to Drive, and collaborate via private Slack + shared Notion dashboard.",
    Icon: Camera,
    side: "right",
  },
  {
    title: "Editing & Thumbnails",
    desc: "Cuts, pacing, sound design, captions, tasteful motion graphics — plus scroll-stopping thumbnails and covers to lift CTR.",
    Icon: Scissors,
    side: "left",
  },
  {
    title: "Posting & Analytics",
    desc: "Platform-aware posting, calendar scheduling, transparent reporting, and weekly iteration to scale what works.",
    Icon: BarChart3,
    side: "right",
  },
];

export default function CallTeamSection() {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const spineWrapRef = React.useRef<HTMLDivElement | null>(null);
  const highlightRef = React.useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Measure travel for the highlight
  const [travel, setTravel] = React.useState(0);
  React.useLayoutEffect(() => {
    const calc = () => {
      const spineH = spineWrapRef.current?.offsetHeight ?? 0;
      const hlH = highlightRef.current?.offsetHeight ?? 0;
      setTravel(Math.max(0, spineH - hlH));
    };
    calc();

    let ro: ResizeObserver | null = null;
    if (typeof window !== "undefined" && "ResizeObserver" in window) {
      ro = new ResizeObserver(calc);
      spineWrapRef.current && ro.observe(spineWrapRef.current);
      highlightRef.current && ro.observe(highlightRef.current);
    }
    const onResize = () => calc();
    window.addEventListener("resize", onResize);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const highlightY = useTransform(scrollYProgress, (v) => v * travel);
  React.useEffect(() => {
    highlightY.set(scrollYProgress.get() * travel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [travel]);

  /* --------- Tuning --------- */
  const gapX = "clamp(16px, 4vw, 44px)"; // distance card→spine (connector length)
  const spineW = "3px"; // vertical spine thickness
  const connectorH = "2px"; // horizontal connector thickness

  return (
    <section
      id="callteam"
      ref={sectionRef}
      className="relative bg-white py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="relative max-w-5xl mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-center font-extrabold tracking-tight leading-[0.98] text-[clamp(28px,6vw,56px)] text-slate-900 mb-4 pb-2">
            {renderSolidAccentLastWord("Done-for-You Content Studio")}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Strategy → Recording → Editing → Distribution. No on-site filming.
            Record, upload to Google Drive, collaborate in a private Slack, and
            review in a shared Notion dashboard.
          </p>
        </motion.div>

        {/* Timeline area */}
        <div ref={spineWrapRef} className="relative">
          {/* Base vertical spine */}
          <div
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-0 rounded-full"
            style={{ width: spineW, backgroundColor: "rgb(226 232 240)" }} // slate-200
          />

          {/* Scroll highlight */}
          <motion.div
            ref={highlightRef}
            style={{
              y: highlightY,
              width: spineW,
              background: "var(--brand-cyan, #3ac4ec)",
            }}
            className="absolute left-1/2 -translate-x-1/2 h-24 rounded-full z-10"
          />

          {/* Items */}
          <div className="relative z-20 flex flex-col gap-y-20 md:gap-y-24">
            {FEATURES.map((item, idx) => {
              const isLeft = item.side === "left";
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.07 }}
                  viewport={{ once: true }}
                  // 5-col grid: [card | GAP | spine | GAP | card]
                  className="grid items-center"
                  style={{
                    gridTemplateColumns: `1fr ${gapX} ${spineW} ${gapX} 1fr`,
                  }}
                >
                  {/* LEFT SIDE (desktop) */}
                  {isLeft ? (
                    <>
                      <div
                        className="hidden md:block"
                        style={{ gridColumn: 1 }}
                      >
                        <Card item={item} align="right" />
                      </div>
                      <div
                        className="hidden md:block grad-line self-center"
                        style={{ gridColumn: 2, height: connectorH }}
                      />
                      <div
                        className="hidden md:block"
                        style={{ gridColumn: 3 }}
                      />
                      <div
                        className="hidden md:block"
                        style={{ gridColumn: 4 }}
                      />
                      <div
                        className="hidden md:block"
                        style={{ gridColumn: 5 }}
                      />
                    </>
                  ) : (
                    // RIGHT SIDE (desktop)
                    <>
                      <div
                        className="hidden md:block"
                        style={{ gridColumn: 1 }}
                      />
                      <div
                        className="hidden md:block"
                        style={{ gridColumn: 2 }}
                      />
                      <div
                        className="hidden md:block"
                        style={{ gridColumn: 3 }}
                      />
                      <div
                        className="hidden md:block grad-line self-center"
                        style={{ gridColumn: 4, height: connectorH }}
                      />
                      <div
                        className="hidden md:block"
                        style={{ gridColumn: 5 }}
                      >
                        <Card item={item} align="left" />
                      </div>
                    </>
                  )}

                  {/* Mobile: single column */}
                  <div className="md:hidden col-span-full">
                    <Card item={item} align="center" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Local styles (gradient + card) */}
      <style jsx>{`
        :root {
          --brand-purple: var(--brand-purple, #8a5cff);
          --brand-lilac: var(--brand-lilac, #b18cff);
          --brand-cyan: var(--brand-cyan, #3ac4ec);
        }
        .grad-line {
          background-image: linear-gradient(
            90deg,
            var(--brand-purple),
            var(--brand-cyan)
          );
          border-radius: 9999px;
        }
        .card-gradient {
          background: linear-gradient(
            135deg,
            var(--brand-purple),
            var(--brand-lilac),
            var(--brand-cyan),
            var(--brand-purple)
          );
          background-size: 200% 200%;
          border-radius: 1rem;
          animation: borderShift 8s ease-in-out infinite;
        }
        @keyframes borderShift {
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
      `}</style>
    </section>
  );
}

/* ---------- helpers ---------- */
function renderSolidAccentLastWord(text: string) {
  const parts = text.trim().split(/\s+/);
  const last = parts.pop() ?? "";
  const before = parts.join(" ");
  return (
    <>
      {before}{" "}
      <span style={{ color: "var(--brand-purple, #8A5CFF)" }}>{last}</span>
    </>
  );
}

/* ---------- Card component ---------- */
function Card({
  item,
  align,
}: {
  item: Feature;
  align: "left" | "right" | "center";
}) {
  const { Icon } = item;

  const justify =
    align === "left"
      ? "justify-start"
      : align === "right"
      ? "justify-end"
      : "justify-center";
  const textAlign =
    align === "center" ? "center" : align === "left" ? "left" : "right";

  return (
    <div className="relative w-full">
      <div className="card-gradient rounded-2xl p-[2px] transition-[filter]">
        <div
          className={[
            "rounded-2xl bg-gradient-to-br from-white via-[rgba(138,92,255,0.06)] to-white",
            "p-6 md:p-7",
            "ring-1 ring-[rgba(138,92,255,0.15)] shadow-sm",
            "transition-all duration-300 will-change-transform",
            "hover:-translate-y-1 hover:shadow-2xl hover:ring-[rgba(58,196,236,0.35)]",
          ].join(" ")}
          style={{ textAlign }}
        >
          <div className={`mb-4 flex items-center ${justify}`}>
            <div className="bg-white size-12 rounded-full grid place-items-center shadow-sm ring-1 ring-black/10">
              <Icon
                className="h-6 w-6 text-[color:var(--brand-cyan)]"
                strokeWidth={2.5}
              />
            </div>
          </div>

          <h4 className="font-semibold text-xl text-slate-900 mb-2">
            {item.title}
          </h4>
          <p className="text-base leading-relaxed text-slate-600">
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  );
}
