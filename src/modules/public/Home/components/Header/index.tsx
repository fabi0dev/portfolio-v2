import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { ChevronsUp, Moon, Sun } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

export default function Header() {
  const { toggleTheme, theme } = useTheme();
  const { scrollY } = useScroll();
  const [scrollYPos, setScrollYPos] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollYPos(latest);
  });

  const navItems = [
    { href: "#about", label: "Sobre" },
    { href: "#projects", label: "Projetos" },
    { href: "#skills", label: "Skills" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-gray-200 dark:border-white/5 bg-white/80 dark:bg-gray-950/80"
      >
        <div className="container flex items-center justify-between h-16">
          <a
            href="/#"
            className="text-2xl font-bold tracking-tight group text-gray-900 dark:text-white"
          >
            fabio
            <span className="text-emerald-500 dark:text-emerald-400 group-hover:text-glow transition-all">
              dev
            </span>
            <span className="text-emerald-500 dark:text-emerald-400 animate-pulse">
              _
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="relative px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-emerald-500 group-hover:w-1/2 transition-all duration-300" />
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              onClick={toggleTheme}
              size="icon"
              variant="ghost"
              className="text-gray-500 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-emerald-400/10"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </motion.header>

      <motion.div
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 20 },
        }}
        transition={{ duration: 0.3 }}
        animate={scrollYPos > 400 ? "visible" : "hidden"}
        className="fixed right-6 bottom-6 z-50"
      >
        <a
          href="#"
          title="Voltar ao topo"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/50 backdrop-blur-sm hover:bg-emerald-500/30 transition-all"
        >
          <ChevronsUp className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
        </a>
      </motion.div>
    </>
  );
}
