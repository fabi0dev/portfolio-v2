import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  name: string;
}

export default function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <div
      className={cn(
        "px-4 py-2 bg-black/50 border border-white/10 rounded-full text-sm",
        " transition-all duration-300 hover:border-green-400/50 hover:text-green-400"
      )}
    >
      {name}
    </div>
  );
}
