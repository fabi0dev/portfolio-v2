import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./components/ProjectCard";

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string | null;
  githubUrl?: string | null;
  deployUrl?: string | null;
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) {
          throw new Error("Erro ao carregar projetos");
        }
        const data = await res.json();
        setProjects(data);
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }

    void loadProjects();
  }, []);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-gray-50 py-32 dark:bg-gray-900"
    >
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      <div className="grid-pattern absolute inset-0 opacity-20" />
      <div className="absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Portfólio
          </span>
          <h2 className="mt-3 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Projetos em Destaque
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-500 dark:text-gray-400">
            Alguns projetos pessoais que destacam minhas habilidades com desenvolvimento web,
            design e resolução de problemas.
          </p>
        </motion.div>

        {loading ? (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Carregando projetos...
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  image={project.image ?? undefined}
                  link={{
                    github: project.githubUrl ?? "",
                    deploy: project.deployUrl ?? "",
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
