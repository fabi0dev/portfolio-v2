import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import ContactSection from "./components/ContactSection";
import AboutSection from "./components/AboutSection";
import Header from "./components/Header";
import FooterSection from "./components/FooterSection";
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <HeroSection />

      <AboutSection />

      <ProjectsSection />

      <SkillsSection />

      <ContactSection />

      <FooterSection />
    </div>
  );
}
