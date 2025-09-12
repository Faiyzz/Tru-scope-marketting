// src/app/page.tsx

import FaqSection from "./components/Faq";
import Hero from "./components/Hero";
import ReservationSection from "./components/Inquiry";
import PredictableGrowthSection from "./components/OurProcesses";
import CallTeamSection from "./components/ProgressSpine";
import ServicesVSLSection from "./components/ServicesVSL";
import StatsSection from "./components/State";
import TestimonialsSection from "./components/Testimonilas";
import TalentServicesSection from "./components/Services";
import WhyUsSection from "./components/Whyus";

export default function Page() {
  return (
    <>
      <Hero />
      <StatsSection />
      <ServicesVSLSection />
      <CallTeamSection />
      <TestimonialsSection />
      <FaqSection />
      <ReservationSection />
      <PredictableGrowthSection />
    </>
  );
}
