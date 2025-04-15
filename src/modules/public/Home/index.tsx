import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import AboutSection from "./components/AboutSection";
import Header from "./components/Header";
import FooterSection from "./components/FooterSection";
import HeroSection from "./components/HeroSection";
import { useEffect } from "react";
import { sevlaControl } from "@/services/sevlaControl";

export default function Home() {
  useEffect(() => {
    sevlaControl.registerVisit();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
      <Header />

      <HeroSection />

      <AboutSection />

      <ProjectsSection />

      <SkillsSection />

      {/*   <ContactSection /> */}

      <FooterSection />
    </div>
  );
}
