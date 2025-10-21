import { LayoutList } from "lucide-react";
import { motion } from "framer-motion";
import { Skill } from "./SkillsData";
import ConfidenceBar from "./ConfidenceBar";

export default function SkillCard({
  skill,
  onClick,
}: {
  skill: Skill;
  onClick?: () => void;
}) {
  return (
    <motion.article
      layout
      whileHover={{
        scale: 1.03,
        y: -6,
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
      }}
      className="bg-surface border border-border rounded-2xl p-5 cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" && onClick) onClick();
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
            {/* icon */}
            {skill.icon ?? <LayoutList className="w-5 h-5" />}
          </div>
          <div>
            <h4 className="text-txt font-semibold">{skill.name}</h4>
            <p className="text-text-muted text-sm">{skill.note}</p>
          </div>
        </div>

        <div className="text-sm text-text-muted">{skill.confidence}%</div>
      </div>

      <div className="mt-4">
        <ConfidenceBar value={skill.confidence} />
      </div>
    </motion.article>
  );
}
