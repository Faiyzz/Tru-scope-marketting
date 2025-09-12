"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Target,
  PenSquare,
  Camera,
  Scissors,
  Image as ImageIcon,
  BarChart3,
} from "lucide-react";

const features = [
  {
    title: "Strategy & Pillars",
    desc: "ICP research, content pillars, and a monthly plan aligned to outcomes.",
    icon: <Target className="w-6 h-6 text-purple-700" />,
    side: "left",
  },
  {
    title: "Pre-Production & Scripting",
    desc: "Hooks, outlines, scripts, and shot lists so shoot day runs fast.",
    icon: <PenSquare className="w-6 h-6 text-purple-700" />,
    side: "right",
  },
  {
    title: "Production (Shoot Day)",
    desc: "On-site/studio filming with lighting, audio, and direction.",
    icon: <Camera className="w-6 h-6 text-purple-700" />,
    side: "left",
  },
  {
    title: "Editing & Motion",
    desc: "Cuts, pacing, sound design, captions, and tasteful motion graphics.",
    icon: <Scissors className="w-6 h-6 text-purple-700" />,
    side: "right",
  },
  {
    title: "Thumbnails & Covers",
    desc: "Scroll-stopping graphics and on-brand visuals to lift CTR.",
    icon: <ImageIcon className="w-6 h-6 text-purple-700" />,
    side: "left",
  },
  {
    title: "Posting & Analytics",
    desc: "Platform-aware posting, calendar scheduling, and weekly iteration.",
    icon: <BarChart3 className="w-6 h-6 text-purple-700" />,
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

  // Measure actual travel: spine wrapper height - highlight height
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
      ro = new ResizeObserver(() => calc());
      if (spineWrapRef.current) ro.observe(spineWrapRef.current);
      if (highlightRef.current) ro.observe(highlightRef.current);
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
          <h2 className="text-5xl font-bold text-slate-900 mb-4 pb-8">
            Done-for-You Content Studio
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Strategy → Production → Editing → Distribution. We plan, shoot,
            edit, and publish content that actually grows your brand.
          </p>
        </motion.div>

        {/* Timeline area */}
        <div ref={spineWrapRef} className="relative">
          {/* Base vertical spine (true full height) */}
          <div
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-0 rounded-full"
            style={{
              width: spineW,
              backgroundColor: "rgb(226 232 240)" /* slate-200 */,
            }}
          />

          {/* Scroll highlight */}
          <motion.div
            ref={highlightRef}
            style={{ y: highlightY, width: spineW }}
            className="absolute left-1/2 -translate-x-1/2 h-24 bg-purple-600 rounded-full z-10"
          />

          {/* Items */}
          <div className="relative z-20 flex flex-col gap-y-20 md:gap-y-24">
            {features.map((item, idx) => {
              const isLeft = item.side === "left";

              return (
                <motion.div
                  key={idx}
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
                  {/* LEFT SIDE (desktop only) */}
                  {isLeft ? (
                    <>
                      <div
                        className="hidden md:block"
                        style={{ gridColumn: 1 }}
                      >
                        <Card item={item} align="right" />
                      </div>
                      {/* Connector ONLY from left card edge to spine */}
                      <div
                        className="hidden md:block bg-purple-300 self-center"
                        style={{ gridColumn: 2, height: connectorH }}
                      />
                      {/* Spine spacer */}
                      <div
                        className="hidden md:block"
                        style={{ gridColumn: 3 }}
                      />
                      {/* NO right connector */}
                      <div
                        className="hidden md:block"
                        style={{ gridColumn: 4 }}
                      />
                      {/* Empty right card col */}
                      <div
                        className="hidden md:block"
                        style={{ gridColumn: 5 }}
                      />
                    </>
                  ) : (
                    /* RIGHT SIDE (desktop only) */
                    <>
                      {/* Empty left card col */}
                      <div
                        className="hidden md:block"
                        style={{ gridColumn: 1 }}
                      />
                      {/* NO left connector */}
                      <div
                        className="hidden md:block"
                        style={{ gridColumn: 2 }}
                      />
                      {/* Spine spacer */}
                      <div
                        className="hidden md:block"
                        style={{ gridColumn: 3 }}
                      />
                      {/* Connector ONLY from right card edge to spine */}
                      <div
                        className="hidden md:block bg-purple-300 self-center"
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

                  {/* Mobile: single column, card full width */}
                  <div className="md:hidden col-span-full">
                    <Card item={item} align="center" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Local styles for animated gradient borders */}
      <style jsx>{`
        .card-gradient {
          background: linear-gradient(
            135deg,
            rgba(124, 58, 237, 0.6),
            rgba(99, 102, 241, 0.55),
            rgba(56, 189, 248, 0.5),
            rgba(124, 58, 237, 0.6)
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

/* ---------- Card component ---------- */
function Card({
  item,
  align,
}: {
  item: { title: string; desc: string; icon: React.ReactNode };
  align: "left" | "right" | "center";
}) {
  return (
    <div className="relative w-full">
      <div className="card-gradient rounded-2xl p-[2px] transition-[filter]">
        <div
          className={[
            "rounded-2xl bg-gradient-to-br from-white via-purple-50/60 to-white",
            "p-6 md:p-7",
            "ring-1 ring-purple-100 shadow-sm",
            "transition-all duration-300 will-change-transform",
            "hover:-translate-y-1 hover:shadow-2xl hover:ring-purple-300",
          ].join(" ")}
          style={{
            textAlign:
              align === "center"
                ? "center"
                : align === "left"
                ? "left"
                : "right",
          }}
        >
          <div className="mb-4 flex items-center justify-center">
            <div className="bg-white/80 p-3 rounded-full ring-1 ring-purple-100 shadow-sm transition">
              {item.icon}
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
