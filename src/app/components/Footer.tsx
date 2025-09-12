"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Animated Footer
 * - Subtle aurora background
 * - Staggered fade/slide-in on scroll
 * - Shimmering divider
 * - Newsletter button loading + success toast
 */
export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const onSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      // TODO: replace with your API call (e.g., fetch("/api/subscribe", {...}))
      await new Promise((r) => setTimeout(r, 1000)); // demo latency
      console.log("Subscribe:", email);
      setEmail("");
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  // Animation presets
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };
  const shimmer = {
    initial: { x: "-100%" },
    animate: {
      x: "100%",
      transition: { duration: 2.4, ease: "linear", repeat: Infinity },
    },
  };

  const serviceLinks = [
    "Illustration",
    "Mobile Design",
    "Motion Graphic",
    "Web Design",
    "Development",
    "SEO",
  ];
  const companyLinks = [
    "Service",
    "Features",
    "Our Team",
    "Portfolio",
    "Blog",
    "Contact Us",
  ];

  return (
    <footer className="relative overflow-hidden bg-[#0F1527] text-slate-300">
      {/* Aurora background blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-40 h-[36rem] w-[36rem] rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(56,189,248,0.10) 0%, rgba(99,102,241,0.10) 35%, transparent 65%)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -right-40 h-[40rem] w-[40rem] rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeOut", delay: 0.15 }}
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(74,222,128,0.10) 0%, rgba(99,102,241,0.08) 35%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Top grid with staggered reveal */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 gap-10 md:grid-cols-4"
        >
          {/* Brand / About */}
          <motion.div variants={item}>
            <h3 className="text-lg font-semibold text-white">TruScope</h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              OurStudio is a digital agency UI / UX Design and Website
              Development located in Ohio, United States of America.
            </p>
            <p className="mt-6 text-xs text-slate-500">
              Copyright TruScope Studio
            </p>
          </motion.div>

          {/* Service */}
          <motion.div variants={item}>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
              Service
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              {serviceLinks.map((label) => (
                <motion.li key={label} variants={item}>
                  <Link
                    href="#"
                    className="relative inline-block transition hover:text-white"
                  >
                    {label}
                    <span className="block h-px w-0 bg-white/40 transition-all duration-300 ease-out hover:w-full" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={item}>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
              Company
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              {companyLinks.map((label) => (
                <motion.li key={label} variants={item}>
                  <Link
                    href="#"
                    className="relative inline-block transition hover:text-white"
                  >
                    {label}
                    <span className="block h-px w-0 bg-white/40 transition-all duration-300 ease-out hover:w-full" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={item}>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
              Join a Newsletter
            </h4>
            <form onSubmit={onSubscribe} className="mt-4">
              <label
                htmlFor="email"
                className="mb-2 block text-xs text-slate-400"
              >
                Your Email
              </label>

              <div className="group relative flex gap-3">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  className="w-full rounded-md border border-white/10 bg-[#1F2740] px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-80"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Subscribing…
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>

                {/* Tiny success/error toast anchored to the form */}
                <AnimatePresence>
                  {status !== "idle" && status !== "loading" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className={`pointer-events-none absolute -bottom-8 left-0 text-xs ${
                        status === "success"
                          ? "text-emerald-400"
                          : "text-rose-400"
                      }`}
                    >
                      {status === "success"
                        ? "You're in! Check your inbox."
                        : "Something went wrong. Try again."}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        </motion.div>

        {/* Animated divider (shimmer) */}
        <div className="relative mt-10 h-px w-full overflow-hidden rounded bg-white/10">
          <motion.span
            aria-hidden
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent"
            {...shimmer}
          />
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <motion.p variants={item} className="text-xs text-slate-500">
            © 2025 TruScope. All rights reserved.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-6 text-sm"
          >
            <span className="flex items-center gap-2 text-slate-400">
              <MapPin className="h-4 w-4" /> 8819 Ohio St. South Gate, CA 90280
            </span>
            <a
              href="mailto:Ourstudio@hello.com"
              className="flex items-center gap-2 text-slate-400 transition hover:text-white"
            >
              <Mail className="h-4 w-4" /> Ourstudio@hello.com
            </a>
            <a
              href="tel:+13866883295"
              className="flex items-center gap-2 text-slate-400 transition hover:text-white"
            >
              <Phone className="h-4 w-4" /> +1 386-688-3295
            </a>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
