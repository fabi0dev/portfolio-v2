import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import AboutSection from "./components/AboutSection";
import Header from "./components/Header";
import FooterSection from "./components/FooterSection";
import HeroSection from "./components/HeroSection";

export default function Home() {
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
