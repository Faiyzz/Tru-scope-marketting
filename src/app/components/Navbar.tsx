// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type NavItem = { label: string; href: string };

const navItems: NavItem[] = [
  { label: "Services", href: "<ServicesSection/>" },
  { label: "Results", href: "#results" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [atTopShadow, setAtTopShadow] = useState(false);

  // add a subtle shadow once the user scrolls a bit
  useEffect(() => {
    const onScroll = () => setAtTopShadow(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70",
        "border-b border-black/5",
        atTopShadow ? "shadow-sm" : "",
      ].join(" ")}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                TruScope
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-8 text-sm text-slate-700">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-block transition-colors hover:text-slate-900"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <CTA />
          </div>

          {/* Mobile: hamburger + CTA (CTA stays visible) */}
          <div className="flex items-center gap-3 md:hidden">
            <CTA small />
            <button
              aria-label="Toggle Menu"
              aria-expanded={open}
              onClick={() => setOpen((s) => !s)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-black/10 bg-white/70 backdrop-blur transition hover:bg-white"
            >
              {/* Simple icon (no extra deps) */}
              <svg
                className={`h-5 w-5 transition-transform ${
                  open ? "rotate-90" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {open ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <>
                    <path d="M3 6h18" />
                    <path d="M3 12h18" />
                    <path d="M3 18h18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden">
            <ul className="border-t border-black/5 py-2 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block px-2 py-3 text-slate-700 transition hover:bg-slate-50"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

function CTA({ small = false }: { small?: boolean }) {
  // gradient pill with drop shadow on hover
  const base =
    "inline-flex items-center justify-center rounded-full font-medium text-white transition " +
    "bg-gradient-to-r from-sky-400 to-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50";
  const size = small ? "h-9 px-4 text-sm" : "h-11 px-5 text-sm";
  const hover =
    "hover:shadow-[0_8px_24px_rgba(56,189,248,0.35)] hover:-translate-y-0.5 active:translate-y-0";
  return (
    <a href="#contact" className={`${base} ${size} ${hover}`}>
      Free Consultation
    </a>
  );
}
