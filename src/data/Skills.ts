export type SkillCategory = {
  category: string;
  skills: string[];
};

export type Certification = {
  title: string;
  provider: string;
};

export const SKILLS: SkillCategory[] = [
  {
    category: "Desenvolvimento Frontend",
    skills: [
      "CSS3",
      "HTML5",
      "JavaScript",
      "Next.js",
      "React",
      "React Native",
      "Redux",
      "Tailwind CSS",
      "TypeScript",
      "Vite",
      "Zustand",
    ],
  },
  {
    category: "Desenvolvimento Backend",
    skills: ["MySQL", "NestJS", "Node.js", "PostgreSQL", "Prisma"],
  },
  {
    category: "Ferramentas & Práticas",
    skills: [
      "Bitbucket",
      "CI/CD",
      "Docker",
      "Git",
      "GitHub",
      "Kanban",
      "Metodologias Ágeis",
      "Scrum",
    ],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: "AWS Certified Developer",
    provider: "Amazon Web Services",
  },
  {
    title: "React Developer Certification",
    provider: "Meta",
  },
  {
    title: "Scrum Master Certified",
    provider: "Scrum Alliance",
  },
];
