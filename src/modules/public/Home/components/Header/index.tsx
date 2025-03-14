import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { Sun } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  const { toggleTheme } = useTheme();
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10"
      )}
    >
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="text-[25px] font-bold tracking-tighter">
          fabio<span className="text-green-400">dev</span>
        </Link>
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
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            className="border-green-400 text-green-400 hover:bg-green-400/10 bg-gray-900"
          >
            Contato
          </Button>

          <Button onClick={() => toggleTheme()}>
            <Sun />
          </Button>
        </div>
      </div>
    </header>
  );
}
