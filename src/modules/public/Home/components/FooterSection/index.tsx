import { MyLinks } from "@/data/MyLinks";
import { Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export default function FooterSection() {
  return (
    <footer className="py-12 dark:bg-gray-950 border-t border-white/10">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-xl font-bold tracking-tighter">
              fabio<span className="text-green-400">dev</span>
            </Link>
            <p className="text-gray-400 mt-1 text-sm">
              © {new Date().getFullYear()} Fábio Costa / Desenvolvedor Full
              Stack
            </p>
          </div>
          <div className="flex space-x-6">
            <Link to={MyLinks.GitHub} target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 text-gray-400 hover:text-green-400 transition-colors" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              to="https://linkedin.com/in/fabi0dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-green-400 transition-colors" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
