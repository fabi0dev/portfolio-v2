import { Button } from "@/components/ui/button";
import { MyLinks } from "@/data/MyLinks";
import { ArrowDown, ArrowRight, Linkedin } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useMotionValueEvent, useScroll, motion } from "framer-motion";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const [scrollYPos, setScrollYPos] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollYPos(latest);
  });

  return (
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

            <Link to={MyLinks.Linkedin}>
              <Button
                variant="outline"
                className="border-white/20 hover:border-white/40 bg-gray-800"
              >
                <Linkedin className="h-4 w-4 mr-2" />
                Linkedin
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 100, filter: "blur(5px)" },
          visible: { opacity: 1, y: 0, filter: "" },
        }}
        transition={{ duration: 0.5 }}
        animate={scrollYPos < 50 ? "visible" : "hidden"}
        className="absolute  bottom-10 left-1/2"
      >
        <div className=" -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-gray-400 hover:text-white">
            <ArrowDown className="h-6 w-6" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
