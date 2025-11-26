import { MyLinks } from "@/data/MyLinks";
import { Github, Linkedin, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function FooterSection() {
  const socialLinks = [
    { href: MyLinks.GitHub, Icon: Github, label: "GitHub" },
    { href: MyLinks.Linkedin, Icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <footer className="relative py-12 bg-gray-50 dark:bg-gray-950">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Link
              to="/"
              className="text-xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              fabio<span className="text-cyan-500 dark:text-cyan-400">dev</span>
              <span className="text-cyan-500 dark:text-cyan-400 animate-pulse">
                _
              </span>
            </Link>
            <p className="text-gray-400 dark:text-gray-500 mt-2 text-sm flex items-center gap-1 justify-center md:justify-start">
              Feito com{" "}
              <Heart className="h-3 w-3 text-cyan-500 fill-cyan-500" /> por
              Fábio Costa
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map(({ href, Icon, label }) => (
              <Link
                key={label}
                to={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-gray-400 dark:text-gray-500 hover:text-cyan-500 dark:hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300"
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">{label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800/50 text-center">
          <p className="text-gray-500 dark:text-gray-600 text-sm">
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
