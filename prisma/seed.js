// Seed de usuário admin, skills e projetos para o dashboard
// Execute com: npx prisma db seed

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require("@prisma/client");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  // Usuário admin
  const email = "admin@portfolio.local";
  const plainPassword = "change-me-admin-123";

  const passwordHash = await bcrypt.hash(plainPassword, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash,
      name: "Admin",
    },
  });


  // Skills (a partir de src/data/Skills.ts)
  const skillSeeds = [
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

  for (const group of skillSeeds) {
    group.skills.forEach(async (name, index) => {
      const existing = await prisma.skill.findFirst({
        where: {
          name,
          category: group.category,
        },
      });

      if (!existing) {
        await prisma.skill.create({
          data: {
            name,
            category: group.category,
            order: index,
          },
        });
      }
    });
  }

  console.log("Skills base garantidas.");

  // Projetos (a partir de src/data/Projects.ts)
  const projectSeeds = [
    {
      title: "Cashly",
      description: "Sistema de gestão financeira.",
      tags: ["ReactJS", "TypeScript", "Vite"],
      image: "ReactJS",
      githubUrl: "https://github.com/fabi0dev/cashly",
      deployUrl: "https://cashly-app.vercel.app/login",
    },
    {
      title: "Bixtron",
      description: "Um robozinho muito legal.",
      tags: ["ReactJS", "TypeScript", "Vite"],
      image: "ReactJS",
      githubUrl: "https://github.com/fabi0dev/bixtron",
      deployUrl: "https://bixtron.vercel.app/",
    },
    {
      title: "Task Mate",
      description: "Organizador de tarefas diárias.",
      tags: ["React", "TypeScript", "Vite"],
      image: "ReactJS",
      githubUrl: "https://github.com/fabi0dev/task-mate",
      deployUrl: "https://task-mate1.vercel.app/",
    },
    {
      title: "Aiva Assistant",
      description: "Assistente virtual que utiliza chat OpenAI.",
      tags: ["ReactJS", "TypeScript", "Vite"],
      image: "ReactJS",
      githubUrl: "https://github.com/fabi0dev/aiva",
      deployUrl: "https://aiva-assistant.vercel.app/",
    },
    {
      title: "InSound App",
      description: "App mobile de música integrado com o Deezer.",
      tags: ["React Native", "TypeScript", "Expo"],
      image: "ReactNative",
      githubUrl: "https://github.com/fabi0dev/in-sound-app",
      deployUrl: "",
    },
    {
      title: "Simple Weather",
      description: "App que permite visualizar as condições climáticas.",
      tags: ["React Native", "TypeScript", "Expo"],
      image: "ReactNative",
      githubUrl: "https://github.com/fabi0dev/simple-weather",
      deployUrl: "",
    },
  ];

  for (let index = 0; index < projectSeeds.length; index++) {
    const p = projectSeeds[index];
    const existing = await prisma.project.findFirst({
      where: { title: p.title },
    });

    if (!existing) {
      await prisma.project.create({
        data: {
          title: p.title,
          description: p.description,
          tags: JSON.stringify(p.tags),
          image: p.image,
          githubUrl: p.githubUrl,
          deployUrl: p.deployUrl || null,
          order: index,
        },
      });
    }
  }

  console.log("Projetos base garantidos.");
  console.log(`Senha inicial do admin: ${plainPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

