// src/app/components/Footer.tsx
"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion, Variants, easeOut } from "framer-motion";

export default function Footer() {
  // --- Animation presets ---
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
  };

  // Shimmer that travels fully across the divider
  const shimmer = {
    initial: { x: "-100%" },
    animate: {
      x: "200%",
      transition: {
        duration: 2.4,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  } as const;

  // Socials (kept as is)
  const socials = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/tru.scope.marketing/",
      Icon: InstagramIcon,
      ox: 0,
      oy: -0.5,
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61554888800466",
      Icon: FacebookIcon,
      ox: 0.25,
      oy: -0.5,
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@truscope.us?is_from_webapp=1&sender_device=pc",
      Icon: TiktokIcon,
      ox: 0,
      oy: -0.5,
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@truscope?feature=shared",
      Icon: YoutubeIcon,
      ox: 0.25,
      oy: -0.25,
    },
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
        transition={{ duration: 1.1, ease: easeOut }}
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
        transition={{ duration: 1.1, ease: easeOut, delay: 0.15 }}
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(74,222,128,0.10) 0%, rgba(99,102,241,0.08) 35%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Top grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 gap-10 md:grid-cols-4"
        >
          {/* Brand / About */}
          <motion.div variants={item}>
            <Link href="/">
              <img
                src="/images/logo.png"
                alt="TruScope Logo"
                className="h-auto w-auto -mt-13 -mb-7"
                style={{ maxWidth: 140 }}
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              OurStudio is a digital agency UI / UX Design and Website
              Development located in Ohio, United States of America.
            </p>
            <p className="mt-6 text-xs text-slate-500">
              Copyright TruScope Studio
            </p>
          </motion.div>

          {/* Sections (simple links – no mapping) */}
          <motion.div variants={item}>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
              About us
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <motion.li variants={item}>
                <Link
                  href="/#services"
                  className="relative inline-block transition hover:text-white"
                >
                  Services
                  <span className="block h-px w-0 bg-white/40 transition-all duration-300 ease-out hover:w/full" />
                </Link>
              </motion.li>
              <motion.li variants={item}>
                <Link
                  href="/#callteam"
                  className="relative inline-block transition hover:text-white"
                >
                  Our Process
                  <span className="block h-px w-0 bg-white/40 transition-all duration-300 ease-out hover:w/full" />
                </Link>
              </motion.li>
              <motion.li variants={item}>
                <Link
                  href="/#testimonil"
                  className="relative inline-block transition hover:text-white"
                >
                  Testimonials
                  <span className="block h-px w-0 bg-white/40 transition-all duration-300 ease-out hover:w/full" />
                </Link>
              </motion.li>
              <motion.li variants={item}>
                <Link
                  href="/#faq"
                  className="relative inline-block transition hover:text-white"
                >
                  FAQ
                  <span className="block h-px w-0 bg-white/40 transition-all duration-300 ease-out hover:w/full" />
                </Link>
              </motion.li>
              <motion.li variants={item}>
                <Link
                  href="/#reservation"
                  className="relative inline-block transition hover:text-white"
                >
                  Contact us
                  <span className="block h-px w-0 bg-white/40 transition-all duration-300 ease-out hover:w/full" />
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Company (simple links – no mapping) */}
          <motion.div variants={item}>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
              Services
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <motion.li variants={item}>
                <Link
                  href="/#services"
                  className="relative inline-block transition hover:text-white"
                >
                  Video Content Creation
                  <span className="block h-px w-0 bg-white/40 transition-all duration-300 ease-out hover:w/full" />
                </Link>
              </motion.li>
              <motion.li variants={item}>
                <Link
                  href="/#work"
                  className="relative inline-block transition hover:text-white"
                >
                  Social Media Management
                  <span className="block h-px w-0 bg-white/40 transition-all duration-300 ease-out hover:w/full" />
                </Link>
              </motion.li>
              <motion.li variants={item}>
                <Link
                  href="/#services"
                  className="relative inline-block transition hover:text-white"
                >
                  Social Media Marketing
                  <span className="block h-px w-0 bg-white/40 transition-all duration-300 ease-out hover:w/full" />
                </Link>
              </motion.li>
              <motion.li variants={item}>
                <Link
                  href="/#work"
                  className="relative inline-block transition hover:text-white"
                >
                  Web Development
                  <span className="block h-px w-0 bg-white/40 transition-all duration-300 ease-out hover:w/full" />
                </Link>
              </motion.li>
              <motion.li variants={item}>
                <Link
                  href="/#reservation"
                  className="relative inline-block transition hover:text-white"
                >
                  Contact Us
                  <span className="block h-px w-0 bg-white/40 transition-all duration-300 ease-out hover:w/full" />
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div variants={item}>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
              Social
            </h4>
            <div className="mt-4">
              <ul className="flex flex-wrap items-center gap-3">
                {socials.map(({ name, href, Icon, ox, oy }) => (
                  <li key={name}>
                    <SocialButton href={href} label={name} ox={ox} oy={oy}>
                      <Icon />
                    </SocialButton>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Animated divider (shimmer) */}
        <div className="relative mt-10 h-px w-full overflow-hidden rounded bg-white/10">
          <motion.span
            aria-hidden
            className="absolute left-0 inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent"
            initial={shimmer.initial}
            animate={shimmer.animate}
          />
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="mt-6 flex flex-col items-center gap-2"
        >
          <motion.p
            variants={item}
            className="text-xs text-slate-500 text-center"
          >
            © 2025 TruScope. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}

/* ---------- Button wrapper ---------- */
function SocialButton({
  href,
  label,
  children,
  ox = 0,
  oy = 0,
}: {
  href: string;
  label: string;
  children: ReactNode;
  ox?: number;
  oy?: number;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group grid h-10 w-10 place-items-center rounded-full text-white bg-white/10 ring-1 ring-white/15 transition-transform duration-200 hover:scale-105 hover:bg-white/15 hover:ring-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
    >
      <span
        className="pointer-events-none block"
        style={{
          width: 20,
          height: 20,
          transform: `translate(${ox}px, ${oy}px)`,
        }}
      >
        {children}
      </span>
    </a>
  );
}

/* ---------- Icons ---------- */
function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.8" r="1.3" fill="currentColor" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <path
        d="M15 8h-2a1 1 0 0 0-1 1v2h3l-.7 3H12v6H9v-6H7v-3h2v-1.5A3.5 3.5 0 0 1 12.5 5H15v3z"
        fill="currentColor"
      />
    </svg>
  );
}
function TiktokIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <path
        d="M14 4v5.5c0 3.6-2.9 4.2-4.2 3.8a3.2 3.2 0 1 0 3.2 3.2V6.2l5.5 1.8v3.3c1.6 1 3 1.5 4.5 1.7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="7"
        width="18"
        height="10"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M11 10l4 3-4 3v-6z" fill="currentColor" />
    </svg>
  );
}
