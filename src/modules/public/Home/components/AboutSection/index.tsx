import { Button } from "@/components/ui/button";
import { MyLinks } from "@/data/MyLinks";
import { Github, Linkedin } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AboutSection() {
  const LINKS = useMemo(
    () => [
      { href: MyLinks.GitHub, Icon: Github, label: "GitHub" },
      { href: MyLinks.Linkedin, Icon: Linkedin, label: "LinkedIn" },
    ],
    []
  );

  const yearsExperience = new Date().getFullYear() - 2018;

  const stats = [
    { value: `${yearsExperience + 5}+`, label: "Anos de Experiência" },
    { value: "∞", label: "Cafés Consumidos" },
    { value: "∞", label: "Linhas de Código Escritas" },
  ];

  return (
    <section
      id="about"
      className="relative py-32 bg-white dark:bg-gray-950 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-emerald-600 dark:text-emerald-400 text-sm font-medium tracking-wider uppercase">
            Sobre mim
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 text-gray-900 dark:text-white">
            Quem sou eu?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80 mx-auto">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/30 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-emerald-500 glow">
                <img
                  src="/profile-pic.png"
                  alt="Fábio Costa"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-xl shadow-xl">
                <p className="font-bold text-lg">{yearsExperience + 5}+ anos</p>
                <p className="text-xs opacity-80">de experiência</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="space-y-5 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              <p>
                Sou um{" "}
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  Desenvolvedor Full Stack
                </span>{" "}
                com mais de {yearsExperience} anos de experiência em aplicações
                mobile e {yearsExperience + 5} anos com desenvolvimento web.
              </p>
              <p>
                Expert em{" "}
                <span className="text-gray-900 dark:text-white font-medium">
                  JavaScript/TypeScript
                </span>
                , domino tanto o frontend com{" "}
                <span className="text-emerald-600 dark:text-emerald-400">React</span>{" "}
                e{" "}
                <span className="text-emerald-600 dark:text-emerald-400">
                  React Native
                </span>
                , quanto o backend com{" "}
                <span className="text-emerald-600 dark:text-emerald-400">
                  Node.js
                </span>
                .
              </p>
            </div>

            <div className="flex gap-3 mt-8">
              {LINKS.map(({ href, Icon, label }) => (
                <Link key={label} to={href} target="_blank">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-xl border-gray-200 dark:border-gray-800 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all duration-300"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{label}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-3 gap-8 mt-20 pt-16 border-t border-gray-200 dark:border-gray-800"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                {stat.value}
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
