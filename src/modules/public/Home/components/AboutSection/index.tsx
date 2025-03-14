import { Button } from "@/components/ui/button";
import { MyLinks } from "@/data/MyLinks";
import { cn } from "@/lib/utils";
import { Github, Linkedin } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function AboutSection() {
  const LINKS = useMemo(
    () => [
      { href: MyLinks.GitHub, Icon: Github, label: "GitHub" },
      {
        href: "https://linkedin.com",
        Icon: Linkedin,
        label: "LinkedIn",
      },
    ],
    []
  );

  const yearsExperience = new Date().getFullYear() - 2018;

  return (
    <div id="about" className="py-24 bg-gray-950  flex items-center h-screen">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-[auto_400px] gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-white">Sobre Mim</h2>
            <div className="space-y-4 text-gray-300 text-lg">
              <p>
                Sou um Desenvolvedor Full Stack com mais de {yearsExperience}{" "}
                anos de experiência na construção de aplicações mobile e mais de{" "}
                {yearsExperience + 5} anos com desenvolvimento web. Expert em
                JavaScript, domino tanto o front com React e backend com
                Node.js.
              </p>
            </div>
            <div className="mt-8 flex space-x-4">
              {LINKS.map(({ href, Icon, label }) => (
                <Link key={label} to={href} target="_blank">
                  <Button
                    variant="ghost"
                    className="rounded-full hover:text-green-400 hover:bg-green-400/10"
                  >
                    <Icon className="h-7 w-7" />
                    <span className="sr-only">{label}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <div className="relative">
            <div
              className={cn(
                "aspect-square overflow-hidden border-2 border-green-500 rounded-full"
              )}
            >
              <img
                src="/profile-pic.png"
                alt="João Silva"
                className=" w-full h-full"
              />
            </div>

            <div className="absolute bottom-4 right-0 bg-green-400 text-black p-2 text-sm rounded-lg shadow-xl">
              <p className="font-bold">{yearsExperience + 5}+ Anos</p>
              <p className="text-sm">Experiência</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
