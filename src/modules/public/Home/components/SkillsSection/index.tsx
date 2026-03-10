import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import SkillBadge from "./components/SkillBadge";

type Skill = {
  id: string;
  name: string;
  category: string;
  order: number;
};

type GroupedSkills = {
  category: string;
  skills: string[];
};

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loadingSkills, setLoadingSkills] = useState(true);

  useEffect(() => {
    async function loadSkills() {
      try {
        const res = await fetch("/api/skills");
        if (!res.ok) {
          throw new Error("Erro ao carregar skills");
        }
        const data = await res.json();
        setSkills(data);
      } catch {
        setSkills([]);
      } finally {
        setLoadingSkills(false);
      }
    }

    void loadSkills();
  }, []);

  const groupedSkills: GroupedSkills[] = useMemo(() => {
    if (!skills.length) return [];
    const map = new Map<string, string[]>();

    skills
      .slice()
      .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
      .forEach((skill) => {
        if (!map.has(skill.category)) {
          map.set(skill.category, []);
        }
        map.get(skill.category)?.push(skill.name);
      });

    return Array.from(map.entries()).map(([category, skillNames]) => ({
      category,
      skills: skillNames,
    }));
  }, [skills]);

  return (
    <section id="skills" className="relative overflow-hidden bg-white py-32 dark:bg-gray-950">
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      <div className="grid-pattern absolute inset-0 opacity-30" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Tech Stack
          </span>
          <h2 className="mt-3 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Habilidades & Tecnologias
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-500 dark:text-gray-400">
            Ferramentas e tecnologias que utilizo no dia a dia para criar soluções incríveis.
          </p>
        </motion.div>

        {loadingSkills ? (
          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Carregando skills...
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {groupedSkills.map(({ category, skills }, categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-6 transition-all duration-300 hover:border-emerald-500/30 dark:border-gray-800 dark:bg-gray-900/50"
              >
                <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <SkillBadge key={skill} name={skill} delay={index * 0.05} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

    </section>
  );
}
