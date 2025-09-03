// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FaqSection from "./components/Faq";
import Hero from "./components/Hero";
import LeadInquirySection from "./components/Inquiry";
import PredictableGrowthSection from "./components/OurProcesses";
import ResultsCarousel from "./components/Results";
import ServicesSection from "./components/Services";
import StatsSection from "./components/State";
import TestimonialsSection from "./components/Testimonilas";

export const metadata: Metadata = {
  title: "TruScope",
  description: "Marketing site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth ">
      <body className="min-h-screen bg-white antialiased">
        <Navbar />

        {children}
        <Footer />
      </body>
    </html>
  );
}
