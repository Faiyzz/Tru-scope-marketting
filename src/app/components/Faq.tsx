// components/FAQSection.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FaqItem = { q: string; a: string };

const items: FaqItem[] = [
  {
    q: "How long until we deliver your first blog post?",
    a: "Your first draft typically arrives within 3–5 business days after onboarding and topic approval.",
  },
  {
    q: "Can we match your brand voice and style?",
    a: "Yes. We build a simple style guide from your samples and follow it for all drafts.",
  },
  {
    q: "Do you provide revisions?",
    a: "Absolutely. Revisions are included to ensure each post fits your expectations.",
  },
  {
    q: "Do you handle on-page SEO?",
    a: "Yes—titles, meta, headings, internal links, and basic schema are included.",
  },
  {
    q: "How do we get started?",
    a: "Book a quick call, choose a plan, and we’ll kick off your content calendar.",
  },
];

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.section
      id="faq"
      className={cx("relative bg-white overflow-hidden isolate")}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      {/* themed soft glow */}
      <div
        aria-hidden
        className={cx(
          "pointer-events-none absolute -top-40 right-0 sm:-right-10 h-[32rem] w-[32rem] rounded-full blur-3xl -z-10",
          "opacity-90"
        )}
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(58,196,236,0.18) 0%, rgba(177,140,255,0.14) 40%, rgba(255,255,255,0) 65%)",
          maskImage:
            "radial-gradient(closest-side, rgba(0,0,0,1), rgba(0,0,0,0.15))",
          WebkitMaskImage:
            "radial-gradient(closest-side, rgba(0,0,0,1), rgba(0,0,0,0.15))",
        }}
      />

      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
        {/* Heading */}
        <motion.header
          className="mb-10 md:mb-14 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
        >
          <h2 className="font-extrabold tracking-tight text-gray-900 leading-[0.98] text-[clamp(28px,6vw,56px)]">
            Frequently Asked <span className="text-[#8A5CFF]">Questions</span>
          </h2>

          <p className="mt-3 text-gray-500 italic">
            Everything you need to know about working with us
          </p>
        </motion.header>

        {/* Accordion */}
        <motion.ol
          className="space-y-5 min-w-0 mx-auto max-w-3xl"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const contentId = `faq-content-${idx}`;
            return (
              <motion.li
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <motion.div
                  className={cx(
                    "group relative rounded-xl border border-black/5 bg-white p-4 sm:p-5 w-full",
                    "shadow-[0_20px_40px_-28px_rgba(0,0,0,0.35)]",
                    "transition-all"
                  )}
                  whileHover={{
                    y: -2,
                    boxShadow: "0 28px 56px -28px rgba(0,0,0,0.40)",
                  }}
                  animate={{
                    boxShadow: isOpen
                      ? "0 28px 56px -28px rgba(0,0,0,0.45)"
                      : "0 20px 40px -28px rgba(0,0,0,0.35)",
                  }}
                >
                  {/* left gradient rail shows only when open */}
                  <motion.span
                    aria-hidden
                    className="absolute left-0 top-0 h-full w-[3px] rounded-l-xl hidden sm:block"
                    initial={false}
                    animate={{ opacity: isOpen ? 1 : 0 }}
                    style={{
                      background:
                        "linear-gradient(180deg, var(--brand-purple), var(--brand-lilac), var(--brand-cyan))",
                      boxShadow: "0 0 16px rgba(58,196,236,0.45)",
                    }}
                  />

                  <motion.button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    className="flex w-full items-center gap-3 text-left"
                    whileTap={{ scale: 0.985 }}
                    transition={{ type: "spring", stiffness: 400, damping: 24 }}
                  >
                    {/* Number badge */}
                    <span
                      className="relative grid w-8 h-8 shrink-0 place-items-center rounded-full text-white font-bold text-[11px] leading-none"
                      style={{
                        background: isOpen
                          ? "linear-gradient(135deg, var(--brand-purple), var(--brand-lilac), var(--brand-cyan))"
                          : "#8A5CFF",
                        boxShadow: isOpen
                          ? "0 12px 28px -12px rgba(58, 196, 236, 0.45)"
                          : "none",
                      }}
                    >
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>

                    {/* Question text */}
                    <span className="flex-1 min-w-0 text-sm sm:text-base font-medium text-gray-800 leading-snug break-words">
                      {item.q}
                    </span>

                    {/* Right: plus/minus */}
                    <motion.span
                      className="ml-3 grid w-7 h-7 place-items-center rounded-full border border-black/10 bg-white text-slate-700"
                      animate={{ rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      aria-hidden
                    >
                      {isOpen ? <MinusIcon /> : <PlusIcon />}
                    </motion.span>
                  </motion.button>

                  {/* Animated answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={contentId}
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <motion.p
                          className="mt-3 pl-10 text-sm text-gray-600 text-pretty break-words"
                          initial={{ y: -6, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.05, duration: 0.2 }}
                        >
                          {item.a}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>

      {/* Local theme helpers */}
      <style jsx>{`
        :root {
          --brand-purple: #8a5cff;
          --brand-lilac: #b18cff;
          --brand-cyan: #3ac4ec;
        }
      `}</style>
    </motion.section>
  );
}

/* -------- Icons -------- */
function PlusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M10 4v12M4 10h12" strokeLinecap="round" />
    </svg>
  );
}
function MinusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 10h12" strokeLinecap="round" />
    </svg>
  );
}
