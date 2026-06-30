import { HeroSection } from "@/components/hero-section";
import { ExpertiseSection } from "@/components/expertise-section";
import { ExperienceSection } from "@/components/experience-section";
import { EducationSection } from "@/components/education-section";
import { ContactSection } from "@/components/contact-section";
import { ScrollToTop } from "@/components/scroll-to-top";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ExpertiseSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
      <ScrollToTop />
    </>
  );
}
