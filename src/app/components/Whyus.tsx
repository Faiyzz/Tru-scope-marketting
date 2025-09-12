"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  animate,
} from "framer-motion";
import {
  Target,
  Camera,
  Scissors,
  Image as ImageIcon,
  Send,
  BarChart3,
  ShieldCheck,
  Rocket,
  Repeat,
} from "lucide-react";

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion(); // ✅ now used
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 25%"],
  });

  const spineScaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="relative isolate overflow-hidden bg-white"
    >
      <BackgroundBlobs />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-[0.6fr_1.4fr] md:gap-14 md:py-24">
        {/* LEFT: Sticky Heading + Counters + Spine */}
        <div className="relative">
          <div className="sticky top-20">
            {/* Vertical scroll spine */}
            <div className="pointer-events-none absolute -left-4 hidden h-full w-1 md:block">
              <div className="relative h-64 w-px overflow-hidden rounded-full bg-slate-200/80">
                <motion.div
                  style={{ scaleY: spineScaleY, transformOrigin: "top" }}
                  className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-indigo-500 via-sky-400 to-fuchsia-500"
                />
              </div>
            </div>

            {/* Heading */}
            <div className="pl-0 md:pl-4">
              <h2 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-5xl">
                Why Clients <ShinyText>Choose</ShinyText> Our Content Studio
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600 md:text-lg">
                Strategy to distribution—one team that plans, shoots, edits, and
                publishes content engineered to convert.
              </p>

              {/* Metrics */}
              <div className="mt-8 grid grid-cols-2 gap-6 sm:max-w-lg">
                <Metric
                  value={42}
                  suffix="%"
                  label="Avg Watch-Time Lift"
                  accent="from-indigo-500 to-blue-500"
                />
                <Metric
                  value={120}
                  suffix="/mo"
                  label="Shorts Capacity"
                  accent="from-fuchsia-500 to-rose-500"
                />
                <Metric
                  value={3}
                  suffix="-5d"
                  label="Turnaround Window"
                  accent="from-sky-400 to-teal-400"
                />
                <Metric
                  value={6}
                  suffix="+"
                  label="Platforms Posted"
                  accent="from-amber-500 to-orange-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Feature Grid (EQUAL HEIGHT CARDS) */}
        <div className="relative">
          <FeatureGrid />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Feature Grid — equal-height cards + animations
   ========================================================= */
function FeatureGrid() {
  const reduceMotion = useReducedMotion(); // ✅ use it here too
  const features = useMemo(
    () => [
      {
        icon: <Target className="h-6 w-6" />,
        title: "Audience-First Strategy",
        desc: "ICP research, pillars, hooks for retention & CTR.",
        badge: "Strategy",
      },
      {
        icon: <Camera className="h-6 w-6" />,
        title: "Studio-Grade Production",
        desc: "Lighting, sound, directing, B-roll, on-camera coaching.",
        badge: "Production",
      },
      {
        icon: <Scissors className="h-6 w-6" />,
        title: "Short-Form Specialists",
        desc: "9:16 cuts, kinetic captions, thumb-stopping cold opens.",
        badge: "Editing",
      },
      {
        icon: <ImageIcon className="h-6 w-6" />,
        title: "Thumbnails That Click",
        desc: "Concept, design & testing for CTR lifts.",
        badge: "Creative",
      },
      {
        icon: <Send className="h-6 w-6" />,
        title: "Cross-Platform Distribution",
        desc: "Scheduling & posting across YT, IG, TikTok, LinkedIn, X.",
        badge: "Distribution",
      },
      {
        icon: <BarChart3 className="h-6 w-6" />,
        title: "Analytics & Iteration",
        desc: "Watch time, retention curves, CTR—optimize weekly.",
        badge: "Performance",
      },
      {
        icon: <Repeat className="h-6 w-6" />,
        title: "Repurposing Engine",
        desc: "Turn one hero video into shorts, carousels & posts.",
        badge: "Scale",
      },
      {
        icon: <ShieldCheck className="h-6 w-6" />,
        title: "Reliable Turnarounds",
        desc: "Tight SLAs, transparent timelines, calm comms cadence.",
        badge: "Ops",
      },
      {
        icon: <Rocket className="h-6 w-6" />,
        title: "Launch-Ready Packages",
        desc: "Clear scopes, flat rates, roadmap to your first 100 posts.",
        badge: "Go-To-Market",
      },
    ],
    []
  );

  const gridRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(gridRef, {
    once: true,
    margin: "-10% 0px -10% 0px",
  });

  return (
    <AnimatePresence initial={false}>
      <motion.div
        ref={gridRef}
        initial={{
          opacity: 0,
          y: reduceMotion ? 0 : 14,
          filter: reduceMotion ? "none" : "blur(6px)",
        }}
        animate={
          inView
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : {
                opacity: 0,
                y: reduceMotion ? 0 : 14,
                filter: reduceMotion ? "none" : "blur(6px)",
              }
        }
        transition={{
          duration: reduceMotion ? 0 : 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((f, idx) => (
          <motion.div
            key={f.title}
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 24,
              scale: reduceMotion ? 1 : 0.98,
            }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              duration: reduceMotion ? 0 : 0.5,
              ease: [0.22, 1, 0.36, 1],
              delay: inView ? (reduceMotion ? 0 : idx * 0.06) : 0,
            }}
            className="group relative h-full"
          >
            {/* Gradient border wrapper (fills height) */}
            <div className="h-full rounded-2xl bg-[linear-gradient(135deg,rgba(99,102,241,0.65),rgba(14,165,233,0.38))] p-[1.5px] transition group-hover:scale-[1.01]">
              {/* Card: equal height via min-h + flex */}
              <div
                className="
                  relative h-full min-h-[240px] md:min-h-[260px] rounded-2xl bg-white p-6
                  shadow-[0_6px_22px_rgba(15,23,42,0.06)] transition
                  hover:-translate-y-0.5 hover:shadow-[0_16px_46px_rgba(79,70,229,0.20)]
                  flex flex-col
                "
              >
                {/* Badge */}
                <span className="inline-flex items-center self-start rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
                  {f.badge}
                </span>

                {/* Icon */}
                <div className="mt-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 ring-indigo-100 transition group-hover:ring-indigo-300">
                  <span className="text-slate-700 group-hover:text-indigo-600">
                    {f.icon}
                  </span>
                </div>

                {/* Title & Desc */}
                <h3 className="mt-3 text-lg font-semibold text-slate-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {f.desc}
                </p>

                {/* Focus ring on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-indigo-400/0 transition group-hover:ring-2 group-hover:ring-indigo-400/30" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

/* =========================================================
   Metric (Animated Counter)
   ========================================================= */
function Metric({
  value,
  suffix = "",
  label,
  accent = "from-indigo-500 to-blue-500",
}: {
  value: number;
  suffix?: string;
  label: string;
  accent?: string;
}) {
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const reduceMotion = useReducedMotion(); // ✅ used
  const inView = useInView(spanRef, {
    once: true,
    margin: "-30% 0px -30% 0px",
  });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(value); // no animation
      return;
    }
    const controls = animate(0, value, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 shadow-[0_6px_22px_rgba(15,23,42,0.06)]">
      <div className="inline-flex items-baseline gap-1 text-3xl font-extrabold tracking-tight text-slate-900">
        <span
          ref={spanRef}
          className={`bg-gradient-to-r ${accent} bg-clip-text text-transparent`}
        >
          {display}
        </span>
        <span className="text-slate-900">{suffix}</span>
      </div>
      <p className="mt-1 text-sm text-slate-600">{label}</p>
    </div>
  );
}

/* =========================================================
   Shiny / Glow Text (subtle white sweep)
   ========================================================= */
function ShinyText({
  children,
  glow = true,
}: {
  children: React.ReactNode;
  glow?: boolean;
}) {
  return (
    <span
      className="relative inline-block text-slate-900"
      style={
        glow
          ? {
              textShadow:
                "0 0 18px rgba(99,102,241,0.18), 0 0 32px rgba(99,102,241,0.10)",
            }
          : undefined
      }
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        aria-hidden
        className="absolute inset-0 select-none pointer-events-none [background:linear-gradient(120deg,transparent,rgba(255,255,255,0.9),transparent)] [background-size:200%_100%] [-webkit-background-clip:text] [color:transparent]"
        initial={{ backgroundPositionX: "0%" }}
        whileInView={{ backgroundPositionX: "200%" }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
        style={{ mixBlendMode: "screen" }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* =========================================================
   Background Blobs — subtle on white
   ========================================================= */
function BackgroundBlobs() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Keep subtle so white background dominates */}
        <div className="blob float1 opacity-60 bg-[radial-gradient(closest-side,rgba(99,102,241,0.18),transparent_65%)] top-[-18%] left-[-12%] w-[70vw] h-[70vw]" />
        <div className="blob float2 opacity-50 bg-[radial-gradient(closest-side,rgba(236,72,153,0.16),transparent_60%)] bottom-[-18%] right-[-10%] w-[60vw] h-[60vw]" />
        <div className="blob float3 opacity-50 bg-[radial-gradient(closest-side,rgba(56,189,248,0.16),transparent_60%)] top-[15%] right-[15%] w-[45vw] h-[45vw]" />
      </div>

      <style jsx>{`
        .blob {
          position: absolute;
          border-radius: 9999px;
          filter: blur(70px);
          mix-blend-mode: screen;
          transform: translateZ(0);
        }
        @keyframes floatSlow1 {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(10%, -6%, 0) scale(1.08);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
        @keyframes floatSlow2 {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(-8%, 6%, 0) scale(1.05);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
        .float1 {
          animation: floatSlow1 18s ease-in-out infinite;
        }
        .float2 {
          animation: floatSlow2 22s ease-in-out infinite;
        }
        .float3 {
          animation: floatSlow1 24s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
