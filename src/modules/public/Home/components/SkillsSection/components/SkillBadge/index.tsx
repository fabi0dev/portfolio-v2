import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SkillBadgeProps {
  name: string;
  delay?: number;
}

export default function SkillBadge({ name, delay = 0 }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "px-4 py-2 rounded-lg text-sm cursor-default",
        "bg-white dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700/50",
        "hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/50",
        "transition-all duration-300"
      )}
    >
      {name}
    </motion.div>
  );
}
