import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Binoculars, Github } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: {
    github?: string;
    deploy?: string;
  };
}

export default function ProjectCard({
  title,
  description,
  tags,
  link,
}: ProjectCardProps) {
  return (
    <div
      className={cn(
        "group relative bg-gray-900/95 rounded-2xl overflow-hidden border border-white/10 transition-all",
        " duration-300 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-400/10"
      )}
    >
      <div className="p-6">
        <div className="flex items-start mb-1">
          <h3 className="text-xl font-bold text-green-500 group-hover:text-green-500 ">
            {title}
          </h3>
        </div>
        <p className="text-gray-400 mb-6 text-sm">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 rounded-full bg-black/50 border border-white/10 text-gray-300 group-hover:border-green-800 transition-all"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-2 flex justify-end gap-2">
          {link.deploy && (
            <Link to={link.deploy} target="_blank">
              <Button size={"icon"} className="hover:bg-black/50 rounded-lg">
                <Binoculars className="group-hover:text-green-500 " />
              </Button>
            </Link>
          )}

          {link.github && (
            <Link to={link.github} target="_blank">
              <Button size={"icon"} className="hover:bg-black/50 rounded-lg">
                <Github className="group-hover:text-green-500" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
