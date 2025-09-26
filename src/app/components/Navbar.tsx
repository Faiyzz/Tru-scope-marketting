// components/FloatingNavbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { ChevronDown, Menu as MenuIcon, X as CloseIcon } from "lucide-react";

type NavItem = { label: string; href: string };
const SOLUTIONS: NavItem[] = [
  { label: "Content Strategy", href: "/#callteam" },
  { label: "Bussiness Growth", href: "/#process" },
  { label: "Analytics", href: "/#state" },
];
const SERVICES: NavItem[] = [
  { label: "Content Creating", href: "/#work" },
  { label: "Video Editing", href: "/#work" },
  { label: "Web Development", href: "/#work" },
  { label: "SEO", href: "/#work" },
];

export default function FloatingNavbar({
  brand = "TruScope",
  logoSrc = "/images/logo.png",
  ctaLabel = "Free Consultation",
  bookingUrl = "https://api.leadconnectorhq.com/widget/booking/Ky3SDrjMdqqFvoZtt5m9",
}: {
  brand?: string;
  logoSrc?: string;
  ctaLabel?: string;
  bookingUrl?: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (showBooking) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [showBooking]);

  const showBg = scrolled || mobileOpen;

  return (
    <>
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />

      <header
        role="banner"
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all pt-2 pb-2",
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
              aria-label={`${brand} home`}
              className="inline-flex items-center focus-gradient"
            >
              <Image
                src={logoSrc}
                alt={brand}
                width={100}
                height={100}
                priority
                className="h-auto w-auto"
              />
            </Link>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-8">
              <Dropdown label="Solutions" items={SOLUTIONS} />
              <NavLink href="/#services">About us</NavLink>
              <Dropdown label="Services" items={SERVICES} />

              {/* CTA — MATCHES HERO OUTLINE STYLE */}
              <button
                type="button"
                onClick={() => setShowBooking(true)}
                className="btn-base btn-gradient-outline bg-white/90 backdrop-blur focus-gradient"
              >
                <span className="text-gradient">{ctaLabel}</span>
              </button>
            </div>

            {/* Mobile toggles */}
            <div className="md:hidden flex items-center gap-2">
              {/* CTA — same outline style on mobile */}
              <button
                type="button"
                onClick={() => setShowBooking(true)}
                className="btn-base btn-gradient-outline bg-white/90 backdrop-blur focus-gradient"
              >
                <span className="text-gradient">{ctaLabel}</span>
              </button>

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
        <div
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-xs bg-white shadow-xl transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-4 h-16">
            <Link
              href="/"
              aria-label={`${brand} home`}
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center"
            >
              <Image
                src={logoSrc}
                alt={brand}
                width={100}
                height={100}
                className="h-auto w-auto"
              />
            </Link>
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

            {/* Mobile CTA — same outline style */}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setShowBooking(true);
              }}
              className="mt-6 inline-flex w-full items-center justify-center btn-base btn-gradient-outline bg-white/90 backdrop-blur focus-gradient"
            >
              <span className="text-gradient">{ctaLabel}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        open={showBooking}
        onClose={() => setShowBooking(false)}
        bookingUrl={bookingUrl}
      />

      {/* Minimal global styles to match Hero button exactly */}
      <style jsx global>{`
        :root {
          --brand-purple: #8a5cff;
          --brand-lilac: #b18cff;
          --brand-cyan: #3ac4ec;
          --brand-gradient: linear-gradient(
            100deg,
            var(--brand-purple) 8%,
            var(--brand-lilac) 28%,
            var(--brand-cyan) 58%,
            var(--brand-purple) 86%
          );
        }
        .btn-base {
          height: 44px;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding-inline: 1.25rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.875rem;
          line-height: 1;
        }
        @keyframes shine {
          to {
            background-position: -200% center;
          }
        }
        .text-gradient {
          background-image: var(--brand-gradient);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shine 2.6s linear infinite;
        }
        .btn-gradient-outline {
          position: relative;
          isolation: isolate;
        }
        .btn-gradient-outline::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          padding: 1px;
          background-image: var(--brand-gradient);
          background-size: 200% auto;
          animation: shine 2.6s linear infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          z-index: -1;
        }
        @media (min-width: 640px) {
          .btn-base {
            padding-inline: 1.375rem;
          }
        }
      `}</style>
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
        aria-expanded={false}
      >
        {label}
        <ChevronDown className="h-4 w-4" />
      </button>

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

/* ---------- Booking Modal ---------- */
function BookingModal({
  open,
  onClose,
  bookingUrl,
}: {
  open: boolean;
  onClose: () => void;
  bookingUrl: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[999]" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div
          className="flex w-full max-w-6xl bg-white shadow-2xl rounded-xl sm:rounded-2xl overflow-hidden flex-col"
          style={{
            height: "min(92svh, 900px)",
            maxHeight:
              "calc(100svh - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px) - 2rem)",
            width: "min(96vw, 1100px)",
          }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <p className="text-sm font-medium">Book a Free Consultation</p>
            <button
              onClick={onClose}
              aria-label="Close booking"
              className="p-2 rounded-full hover:bg-neutral-100"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 min-h-0">
            <iframe
              src={bookingUrl}
              title="Booking Widget"
              className="block w-full h-full"
              style={{ border: "none" }}
              scrolling="auto"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
