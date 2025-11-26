import { Button } from "@/components/ui/button";
import { MyLinks } from "@/data/MyLinks";
import { ArrowDown, ArrowRight, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";

const phrases = [
  "Pensando em ideias...",
  "Criando soluções...",
  "Desenvolvendo o futuro...",
  "Tomando um café...",
  "Escrevendo um código...",
];

export default function HeroSection() {
  const { scrollY } = useScroll();
  const [scrollYPos, setScrollYPos] = useState(0);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollYPos(latest);
  });

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhraseIndex]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block w-[280px] px-4 py-1.5 mb-6 text-sm font-medium text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white"
          >
            Olá, <span className="gradient-text text-glow">tudo bem?</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-5xl font-semibold mb-8 text-gray-600 dark:text-gray-300"
          >
            Eu sou o{" "}
            <span className="text-gray-900 dark:text-white">Fábio!</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Desenvolvedor sênior especializado em{" "}
            <span className="text-cyan-600 dark:text-cyan-400">web</span> e{" "}
            <span className="text-cyan-600 dark:text-cyan-400">mobile</span>.
            Construo experiências digitais rápidas, acessíveis e excepcionais.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a href="#projects">
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25">
                Meus Projetos <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <Link to={MyLinks.Linkedin} target="_blank">
              <Button
                variant="outline"
                className="border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 bg-white/50 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-6 py-5 rounded-xl transition-all duration-300"
              >
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5 }}
        animate={scrollYPos < 50 ? "visible" : "hidden"}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
