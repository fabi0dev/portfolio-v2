import ProjectCard from "./components/ProjectCard";
import { PROJECTS } from "@/data/Projects";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-black h-screen w-8/12 mx-auto">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Projetos</h2>
            <p className="text-gray-400 max-w-2xl">
              Esses são alguns projetos pessoais que destacam minhas habilidades
              com desenvolvimento web, design e resolução de problemas.
            </p>
          </div>
          {/*  <Button variant="link" className="text-green-400 p-0 h-auto">
            Ver todos <ArrowRight className="ml-2 h-4 w-4" />
          </Button> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              image={project.image}
              link={project.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
