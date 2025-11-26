import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExternalLink, Github } from "lucide-react";
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
        "group relative h-full bg-white dark:bg-gray-950/50 backdrop-blur-sm rounded-2xl overflow-hidden",
        "border border-gray-200 dark:border-gray-800 transition-all duration-500",
        "hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10",
        "hover:-translate-y-1"
      )}
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500 transition-all duration-500" />

      <div className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            {title}
          </h3>
          <div className="flex gap-1">
            {link.deploy && (
              <Link to={link.deploy} target="_blank">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-gray-400 dark:text-gray-500 hover:text-cyan-500 dark:hover:text-cyan-400 hover:bg-cyan-500/10"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            )}
            {link.github && (
              <Link to={link.github} target="_blank">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-gray-400 dark:text-gray-500 hover:text-cyan-500 dark:hover:text-cyan-400 hover:bg-cyan-500/10"
                >
                  <Github className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed flex-1">{description}</p>

        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800/50">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={cn(
                "text-xs px-3 py-1 rounded-full",
                "bg-gray-100 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400",
                "group-hover:bg-cyan-500/10 group-hover:text-cyan-600 dark:group-hover:text-cyan-400",
                "transition-all duration-300"
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
