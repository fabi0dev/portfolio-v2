import { CERTIFICATIONS, SKILLS } from "@/data/Skills";
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

        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-6 text-green-400">
            Certificações
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {CERTIFICATIONS.map(({ title, provider }) => (
              <div
                key={title}
                className="bg-black/50 border border-white/10 rounded-lg p-6 flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-green-400/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-400"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <h4 className="font-medium">{title}</h4>
                <p className="text-xs text-gray-400 mt-2">{provider}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
