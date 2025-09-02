// components/LeadInquirySection.tsx
"use client";

import React from "react";

/** Public props if you want to wire to your backend later */
type LeadInquirySectionProps = {
  onSubmit?: (data: {
    name: string;
    email: string;
    message: string;
  }) => Promise<void> | void;
  bullets?: string[];
  title?: string;
  subtitle?: string;
};

export default function LeadInquirySection({
  onSubmit,
  bullets = [
    "No-obligation consultation",
    "Custom strategy for your spa",
    "Actionable insights you can use immediately",
  ],
  title = "Ready to Fill Your Appointment Book?",
  subtitle = "Schedule your free strategy call today and discover how we can help your med spa attract more high-value clients.",
}: LeadInquirySectionProps) {
  // in-view for entrance anims
  const rootRef = React.useRef<HTMLElement | null>(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    if (!rootRef.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold: 0.18 }
    );
    io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  // form state
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [errors, setErrors] = React.useState<{ name?: string; email?: string }>(
    {}
  );
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const validate = () => {
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!email.trim()) next.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      // If the caller provided an onSubmit, call it
      if (onSubmit) {
        await onSubmit({ name, email, message });
      } else {
        // Demo delay to show loading/success animations
        await new Promise((r) => setTimeout(r, 1200));
        // Example: send to your API
        // await fetch("/api/inquiry", { method: "POST", body: JSON.stringify({ name, email, message }) });
      }
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
      // Briefly show success then reset state
      setTimeout(() => setSuccess(false), 3200);
    } catch {
      // Keep it simple: surface a minimal error
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={rootRef}
      className="relative w-full bg-gradient-to-br from-white to-slate-50"
    >
      {/* Soft right-side glow */}
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-[50%] w-[60%] rounded-bl-[40%] bg-gradient-to-l from-fuchsia-200/40 to-indigo-200/0 blur-2xl" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-6 py-16 md:grid-cols-2 md:gap-14 md:py-20 lg:px-8">
        {/* Left: copy + bullets */}
        <div
          className={`${
            inView ? "animate-rise-in" : "opacity-0 translate-y-3"
          }`}
        >
          <h2 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-slate-600 md:text-lg">{subtitle}</p>

          <ul className="mt-8 space-y-5">
            {bullets.map((b, i) => (
              <li
                key={`bullet-${i}`}
                className="flex items-start gap-3 animate-fade-in"
                style={{ animationDelay: `${150 + i * 90}ms` }}
              >
                <CheckIcon className="mt-0.5 h-5 w-5 text-emerald-500" />
                <span className="text-slate-700">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: form card */}
        <div
          className={`rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/0 backdrop-blur-sm sm:p-8 ${
            inView ? "animate-card-pop" : "opacity-0 translate-y-4"
          }`}
          style={{ animationDelay: "220ms" }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <Field
              label="Name"
              htmlFor="name"
              error={errors.name}
              input={
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-200/60"
                />
              }
            />

            <Field
              label="Email"
              htmlFor="email"
              error={errors.email}
              input={
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-200/60"
                />
              }
            />

            <div
              className="animate-fade-in"
              style={{ animationDelay: "160ms" }}
            >
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Why do you want to market?
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your business and goals"
                rows={5}
                className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-200/60"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.01] hover:shadow-xl active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-90`}
              >
                {/* shine sweep */}
                <span className="absolute inset-0 overflow-hidden rounded-xl">
                  <span className="button-shine" />
                </span>

                {/* content */}
                <span className="relative flex items-center gap-2">
                  {loading ? (
                    <>
                      <Spinner className="h-4 w-4" />
                      Sending…
                    </>
                  ) : success ? (
                    <>
                      <MiniCheck className="h-4 w-4" />
                      Sent! We’ll reach out shortly
                    </>
                  ) : (
                    <>
                      <span>Send Inquiry</span>
                      <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </span>
              </button>

              {/* live region for a11y */}
              <p aria-live="polite" className="sr-only">
                {loading ? "Sending" : success ? "Message sent" : ""}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------- small UI helpers ---------- */

function Field({
  label,
  htmlFor,
  input,
  error,
}: {
  label: string;
  htmlFor: string;
  input: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="animate-fade-in" style={{ animationDelay: "120ms" }}>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>
      {input}
      {error ? <p className="mt-1 text-sm text-rose-600">{error}</p> : null}
    </div>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 00-1.408-1.42l-6.83 6.774-2.76-2.64a1 1 0 10-1.38 1.45l3.5 3.35a1 1 0 001.394-.017l7.48-7.497z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function Spinner({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`animate-spin ${className}`}
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="white"
        strokeOpacity="0.25"
        strokeWidth="4"
        fill="none"
      />
      <path
        d="M22 12a10 10 0 00-10-10"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MiniCheck({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 13l4 4L19 7"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
