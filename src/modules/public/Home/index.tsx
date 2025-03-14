import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import { Link } from "react-router-dom";
import ContactSection from "./components/ContactSection";
import AboutSection from "./components/AboutSection";
import Header from "./components/Header";
import FooterSection from "./components/FooterSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b  from-black to-gray-900 z-0" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
              Olá, <span className="text-green-400">tudo bem?</span>
              <br />
            </h1>

            <h2 className="text-4xl md:text-5xl mb-8">Eu sou o Fábio!</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-xl mx-auto">
              Um desenvolvedor pleno, atuo na parte web e mobile, construo
              experiências digitais que são rápidas, acessíveis e excepcionais.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-green-400 hover:bg-green-500 text-black">
                Meus Projetos <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="border-white/20 hover:border-white/40 bg-gray-800"
              >
                Fale Comigo
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <Link to="#about" className="text-gray-400 hover:text-white">
            <ArrowDown className="h-6 w-6" />
          </Link>
        </div>
      </section>

      <AboutSection />

      <ProjectsSection />

      <SkillsSection />

      <ContactSection />

      <FooterSection />
    </div>
  );
}
