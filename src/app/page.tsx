// src/app/page.tsx

import FaqSection from "./components/Faq";
import Hero from "./components/Hero";
import LeadInquirySection from "./components/Inquiry";
import PredictableGrowthSection from "./components/OurProcesses";
import ResultsCarousel from "./components/Results";
import ServicesSection from "./components/Services";
import StatsSection from "./components/State";
import TestimonialsSection from "./components/Testimonilas";

export default function Page() {
  return (
    <>
      <Hero />
      <StatsSection />
      <ServicesSection />
      <ResultsCarousel />
      <PredictableGrowthSection />
      <TestimonialsSection />
      <FaqSection />
      <LeadInquirySection />
    </>
  );
}
