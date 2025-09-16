// components/FloatingNavbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu as MenuIcon, X as CloseIcon } from "lucide-react";

type NavItem = { label: string; href: string };
const SOLUTIONS: NavItem[] = [
  { label: "Content Strategy", href: "#" },
  { label: "Automation", href: "#" },
  { label: "Analytics", href: "#" },
];
const SERVICES: NavItem[] = [
  { label: "Content Creating", href: "#" },
  { label: "Video Editing", href: "#" },
  { label: "Web Development", href: "#" },
];

export default function FloatingNavbar({
  brand = "TruScope",
  ctaHref = "#",
  ctaLabel = "Free Consultation",
}: {
  brand?: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Toggle background after a tiny scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll(); // run once on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // When mobile menu is open, force solid/visible background
  const showBg = scrolled || mobileOpen;

  return (
    <>
      {/* Floating container with smart background */}
      <header
        role="banner"
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all",
          // Transparent at top; glassy once scrolled/open
          showBg
            ? "bg-white/80 supports-[backdrop-filter]:bg-white/60 backdrop-blur-md ring-1 ring-black/5 shadow-sm"
            : "bg-transparent",
        ].join(" ")}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Brand */}
            <Link
              href="/"
              className="font-semibold tracking-tight text-neutral-900 focus-gradient"
              aria-label={`${brand} home`}
            >
              {brand}
            </Link>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-8">
              <Dropdown label="Solutions" items={SOLUTIONS} />
              <NavLink href="#about">About us</NavLink>
              <Dropdown label="Services" items={SERVICES} />
              <Link
                href={ctaHref}
                className="btn-base btn-gradient shadow-md hover:shadow-lg focus-gradient"
              >
                {ctaLabel}
              </Link>
            </div>

            {/* Mobile toggles */}
            <div className="md:hidden flex items-center gap-2">
              <Link
                href={ctaHref}
                className="btn-base btn-gradient shadow-md hover:shadow-lg focus-gradient"
              >
                {ctaLabel}
              </Link>
              <button
                aria-label="Open menu"
                className="p-2 rounded-full focus-gradient"
                onClick={() => setMobileOpen(true)}
              >
                <MenuIcon className="h-6 w-6 text-neutral-900" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />
        {/* Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-xs bg-white shadow-xl transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-4 h-16">
            <span className="font-semibold">{brand}</span>
            <button
              aria-label="Close menu"
              className="p-2 rounded-full focus-gradient"
              onClick={() => setMobileOpen(false)}
            >
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="px-4 pb-8">
            <MobileLink href="/" onClick={() => setMobileOpen(false)}>
              Home
            </MobileLink>

            <MobileGroup
              label="Solutions"
              items={SOLUTIONS}
              onItem={() => setMobileOpen(false)}
            />
            <MobileLink href="#about" onClick={() => setMobileOpen(false)}>
              About us
            </MobileLink>
            <MobileGroup
              label="Services"
              items={SERVICES}
              onItem={() => setMobileOpen(false)}
            />

            <Link
              href={ctaHref}
              onClick={() => setMobileOpen(false)}
              className="mt-6 inline-flex w-full items-center justify-center btn-base btn-gradient shadow-md hover:shadow-lg focus-gradient"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- atoms ---------- */

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-neutral-900 hover:opacity-70 transition focus-gradient"
    >
      {children}
    </Link>
  );
}

function Dropdown({ label, items }: { label: string; items: NavItem[] }) {
  return (
    <div className="relative group">
      <button
        className="inline-flex items-center gap-1 text-sm font-medium text-neutral-900 hover:opacity-70 transition focus-gradient"
        aria-haspopup="menu"
        aria-expanded="false"
      >
        {label}
        <ChevronDown className="h-4 w-4" />
      </button>

      {/* menu */}
      <div
        className="
          invisible opacity-0 scale-95 translate-y-1
          group-hover:visible group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
          transition
          absolute left-1/2 -translate-x-1/2 mt-3 w-56
          rounded-xl bg-white p-2 ring-1 ring-black/5 shadow-lg
        "
        role="menu"
      >
        {items.map((it) => (
          <Link
            key={it.label}
            href={it.href}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus-gradient"
            role="menuitem"
          >
            {it.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block py-3 text-base font-semibold text-neutral-900 focus-gradient"
    >
      {children}
    </Link>
  );
}

function MobileGroup({
  label,
  items,
  onItem,
}: {
  label: string;
  items: NavItem[];
  onItem?: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-1">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-3 text-base font-semibold text-neutral-900 focus-gradient"
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-[grid-template-rows] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          {items.map((it) => (
            <Link
              key={it.label}
              href={it.href}
              onClick={onItem}
              className="block rounded-lg px-2 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus-gradient"
            >
              {it.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
