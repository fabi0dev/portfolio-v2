import { ArrowUpRight } from "lucide-react";
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
  image,
  link,
}: ProjectCardProps) {
  return (
    <div className="group relative bg-gray-900 rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-400/10">
      {/*  <div className="aspect-video overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div> */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <Link
            to={link}
            className="p-2 rounded-full bg-black/20 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="text-gray-400 mb-6">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 rounded-full bg-black/50 border border-white/10 text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
