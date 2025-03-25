import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { ChevronsUp, Sun } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

export default function Header() {
  const { toggleTheme } = useTheme();
  const { scrollY } = useScroll();
  const [scrollYPos, setScrollYPos] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollYPos(latest);
  });

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b transition-colors border-black/10 bg-gray-900 dark:bg-gray-950 text-white dark:border-white/5">
        <div className="container flex items-center justify-between h-16">
          <a href="/#" className="text-[25px] font-bold tracking-tighter">
            fabio<span className="text-green-400">dev</span>
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#about"
              className="text-sm hover:text-green-400 transition-colors"
            >
              Sobre
            </a>
            <a
              href="#projects"
              className="text-sm hover:text-green-400 transition-colors"
            >
              Projetos
            </a>
            <a
              href="#skills"
              className="text-sm hover:text-green-400 transition-colors"
            >
              Habilidades
            </a>
            {/*  <Link
              to="/blog"
              className="text-sm hover:text-green-400 transition-colors"
            >
              Blog
            </Link> */}
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="border-green-400 text-green-500 hover:bg-green-400/10 bg-gray-900"
            >
              Contato
            </Button>

            <Button onClick={toggleTheme}>
              <Sun />
            </Button>
          </div>
        </div>
      </header>

      <motion.div
        variants={{
          visible: { opacity: 1, y: 0, filter: "" },
          hidden: { opacity: 0, y: -30, filter: "blur(5px)" },
        }}
        transition={{ duration: 0.5 }}
        animate={scrollYPos > 400 ? "visible" : "hidden"}
        className="fixed right-7 bottom-10 z-50 opacity-0"
      >
        <a href="#" title="Voltar ao topo">
          <ChevronsUp className="w-7 h-7 hover:text-slate-400" />
        </a>
      </motion.div>
    </>
  );
}
