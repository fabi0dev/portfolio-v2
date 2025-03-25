import { SKILLS } from "@/data/Skills";
import SkillBadge from "./components/SkillBadge";

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-gray-950">
      <div className="container w-8/12 mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Habilidades & Tecnologias
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {SKILLS.map(({ category, skills }) => (
            <div key={category} className="cursor-default">
              <h3 className="text-xl font-semibold mb-6 text-green-400">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <SkillBadge key={skill} name={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
