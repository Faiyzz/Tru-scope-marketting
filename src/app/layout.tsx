import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import { ReactNode } from "react";

// ✅ Put your real production URL here
const siteUrl = "https://truscope.example.com";
const ogImage = "/"; // place in /public
const faviconIco = "/images/favicon.ico"; // /public
const iconPng16 = "/images/metaicon.png"; // /public
const iconPng32 = "/images/metaicon.png"; // /public
const iconPng192 = "/images/metaicon.png"; // /public
const appleTouch = "/images/metaicon.png"; // /public
const manifest = "/site.webmanifest"; // /public

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "TruScope",
  description: "Marketing site",
  openGraph: {
    title: "TruScope",
    description: "Marketing site",
    url: siteUrl,
    siteName: "TruScope",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "TruScope" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TruScope",
    description: "Marketing site",
    images: [ogImage],
  },
  icons: {
    icon: [
      { url: faviconIco }, // classic
      { url: iconPng16, type: "image/png", sizes: "16x16" },
      { url: iconPng32, type: "image/png", sizes: "32x32" },
      { url: iconPng192, type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: appleTouch, sizes: "180x180" }],
    shortcut: [faviconIco],
  },
  manifest,
  themeColor: "#ffffff",
  other: {
    "msapplication-TileColor": "#ffffff",
    "msapplication-config": "/browserconfig.xml", // optional for Windows tiles
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white antialiased">
        <SmoothScroll lerp={0.12} wheelMultiplier={1} smoothTouch>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
