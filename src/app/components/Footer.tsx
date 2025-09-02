// components/Footer.tsx
"use client";

import Link from "next/link";
import React from "react";

type LinkItem = { label: string; href: string };

const QUICK_LINKS: LinkItem[] = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const SERVICES: LinkItem[] = [
  { label: "Paid Traffic", href: "#services" },
  { label: "SEO", href: "#services" },
  { label: "Social Media Marketing", href: "#services" },
  { label: "Web Development", href: "#services" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-[#0f1724] text-slate-200">
      {/* container = slight white space on sides */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + blurb */}
          <div>
            <div className="text-2xl font-semibold leading-none">
              <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                TruScope
              </span>
            </div>
            <p className="mt-4 max-w-xs text-slate-300/90">
              Driving measurable growth with data-driven marketing strategies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-slate-100">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-3">
              {QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-slate-300 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-lg font-semibold text-slate-100">
              Our Services
            </h4>
            <ul className="mt-4 space-y-3">
              {SERVICES.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-slate-300 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-slate-100">Contact</h4>
            <ul className="mt-4 space-y-3 text-slate-300">
              <li>
                Email:{" "}
                <a
                  href="mailto:hello@truscope.com"
                  className="transition hover:text-white"
                >
                  hello@truscope.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a
                  href="tel:+12345678690"
                  className="transition hover:text-white"
                >
                  +1 (234) 567-8690
                </a>
              </li>
              <li>Location: New York, USA</li>
            </ul>

            {/* Socials */}
            <div className="mt-5 flex items-center gap-3">
              <Social href="#" label="Facebook">
                <FacebookIcon />
              </Social>
              <Social href="#" label="Twitter / X">
                <TwitterIcon />
              </Social>
              <Social href="#" label="LinkedIn">
                <LinkedInIcon />
              </Social>
              <Social href="#" label="Instagram">
                <InstagramIcon />
              </Social>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Copyright */}
        <div className="py-6 text-center text-sm text-slate-400">
          © {year} TruScope. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ---------- UI helpers ---------- */
function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-white/30 hover:text-white"
    >
      {children}
    </Link>
  );
}

/* Inline icons (no external deps) */
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" {...props}>
      <path d="M13 22v-8h3l1-4h-4V7.5A1.5 1.5 0 0 1 14.5 6H17V2h-2.5A5.5 5.5 0 0 0 9 7.5V10H6v4h3v8h4z" />
    </svg>
  );
}
function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" {...props}>
      <path d="M21 5.7c-.7.3-1.4.5-2.2.6.8-.5 1.4-1.2 1.7-2a8 8 0 0 1-2.5 1 3.7 3.7 0 0 0-6.4 3.4 10.5 10.5 0 0 1-7.7-3.9 3.7 3.7 0 0 0 1.1 5 3.6 3.6 0 0 1-1.7-.5v.1c0 1.8 1.3 3.3 3 3.7a3.7 3.7 0 0 1-1.7.1c.5 1.5 1.9 2.6 3.6 2.6A7.5 7.5 0 0 1 3 18.6 10.6 10.6 0 0 0 8.7 20c6.6 0 10.2-5.5 10.2-10.2v-.5c.7-.5 1.3-1.2 1.8-1.9z" />
    </svg>
  );
}
function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" {...props}>
      <path d="M6.94 8.79H3.9V20h3.04V8.79zM5.42 3.5a1.77 1.77 0 1 0 0 3.54 1.77 1.77 0 0 0 0-3.54zM20.1 20v-6.17c0-3.29-1.76-4.82-4.1-4.82-1.9 0-2.75 1.05-3.23 1.79V8.79H9.74V20h3.04v-6.06c0-1.6.3-3.15 2.29-3.15 1.96 0 1.99 1.83 1.99 3.25V20h3.04z" />
    </svg>
  );
}
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" {...props}>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.8A5.2 5.2 0 1 1 6.8 13 5.2 5.2 0 0 1 12 7.8zm0 2A3.2 3.2 0 1 0 15.2 13 3.2 3.2 0 0 0 12 9.8zm5.4-2.4a1 1 0 1 1-1-1 1 1 0 0 1 1 1z" />
    </svg>
  );
}
