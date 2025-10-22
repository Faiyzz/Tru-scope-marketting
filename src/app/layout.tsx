import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import { ReactNode } from "react";

const siteUrl = "https://truscope.us"; // your actual domain
const ogImage = "/images/logo.png"; // full-size logo for OpenGraph
const faviconIco = "/images/favicon.ico"; // classic favicon
const metaIcon = "/images/metaicon.png"; // secondary PNG icon for everything else

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "TruScope",
  description:
    "Welcome to our marketing agency, where creativity meets strategy. Unlock the full potential of your brand with our tailored solutions in digital marketing.",
  openGraph: {
    title: "TruScope — Marketing Agency",
    description:
      "Unlock the full potential of your brand with our tailored digital marketing solutions.",
    url: siteUrl,
    siteName: "TruScope",
    images: [
      { url: ogImage, width: 1200, height: 630, alt: "TruScope Logo" },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TruScope — Marketing Agency",
    description:
      "Unlock the full potential of your brand with our tailored digital marketing solutions.",
    images: [ogImage],
  },
  icons: {
    icon: [
      { url: faviconIco },
      { url: metaIcon, type: "image/png", sizes: "16x16" },
      { url: metaIcon, type: "image/png", sizes: "32x32" },
      { url: metaIcon, type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: metaIcon, sizes: "180x180" }],
    shortcut: [faviconIco],
  },
  manifest: "/site.webmanifest",
  themeColor: "#ffffff",
  other: {
    "msapplication-TileColor": "#ffffff",
    "msapplication-config": "/browserconfig.xml",
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
