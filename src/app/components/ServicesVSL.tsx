// src/app/components/ServicesSection.tsx
"use client";

import type { CSSProperties } from "react";
import { PenTool, Clapperboard, Globe2 } from "lucide-react";

const ACCENT = "#3ac4ec";

type Service = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

const SERVICES: Service[] = [
  {
    title: "Content Creation",
    description:
      "Scripts, captions, and creative assets tailored to your brand voice—ready to publish everywhere.",
    icon: PenTool,
  },
  {
    title: "Video Editing",
    description:
      "Short-form and long-form edits, motion graphics, subtitles, and platform-ready exports.",
    icon: Clapperboard,
  },
  {
    title: "Web Development",
    description:
      "Fast, modern websites with clean UX, SEO-friendly structure, and scalable components.",
    icon: Globe2,
  },
];

export default function ServicesSection() {
  // define CSS var safely
  const accentStyle: CSSProperties & { "--accent": string } = {
    "--accent": ACCENT,
  };

  return (
    <section
      aria-labelledby="services-heading"
      className="bg-white"
      style={accentStyle}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <h2
            id="services-heading"
            className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl"
          >
            Services
          </h2>
          <p className="mt-4 text-base text-gray-600">
            Creative and technical execution with a focus on clarity, speed, and
            results.
          </p>
        </header>

        <div className="mt-12 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="group relative flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-0.5 focus-within:-translate-y-0.5"
            >
              {/* Accent bar */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-[--accent]"
              />

              {/* Icon */}
              <div
                className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[rgb(58_196_236/0.12)] ring-1 ring-[rgb(58_196_236/0.25)] text-[--accent]"
                aria-hidden="true"
              >
                <Icon className="h-6 w-6" />
              </div>

              {/* Text */}
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {description}
              </p>

              {/* CTA */}
              <div className="mt-5">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-gray-900 ring-1 ring-gray-300 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--accent] focus-visible:ring-offset-2"
                >
                  Learn more
                </a>
              </div>

              {/* Focus ring for card */}
              <span className="pointer-events-none absolute inset-0 rounded-2xl ring-0 transition group-focus-within:ring-2 group-focus-within:ring-[--accent]" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
