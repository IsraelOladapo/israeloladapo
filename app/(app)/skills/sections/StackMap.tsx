import { motion } from "framer-motion";

export default function StackMap({ highlight }: { highlight?: string | null }) {
  // This is a small illustrative SVG map connecting frontend -> api -> db -> deploy
  // It uses simple motion transforms for slight life
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 680 320"
        className="max-w-full h-[320px] w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Lines */}
        <motion.g>
          <motion.line
            x1="180"
            y1="160"
            x2="340"
            y2="160"
            stroke="var(--color-border)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2 }}
          />
          <motion.line
            x1="340"
            y1="160"
            x2="500"
            y2="160"
            stroke="var(--color-border)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: 0.1 }}
          />
        </motion.g>

        {/* Nodes */}
        {/* Frontend node */}
        <motion.g
          initial={{ y: 0 }}
          animate={{ y: highlight === "Frontend" ? -6 : 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 12 }}
        >
          <rect
            x="120"
            y="120"
            rx="16"
            ry="16"
            width="120"
            height="80"
            fill="var(--color-surface)"
            stroke="var(--color-border)"
          />
          <text
            x="180"
            y="156"
            textAnchor="middle"
            alignmentBaseline="middle"
            className="fill-[var(--color-txt)] text-[14px]"
          >
            Frontend
          </text>
        </motion.g>

        {/* API node */}
        <motion.g
          initial={{ y: 0 }}
          animate={{ y: highlight === "Backend" ? -6 : 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 12 }}
        >
          <rect
            x="300"
            y="120"
            rx="16"
            ry="16"
            width="120"
            height="80"
            fill="var(--color-surface)"
            stroke="var(--color-border)"
          />
          <text
            x="360"
            y="156"
            textAnchor="middle"
            alignmentBaseline="middle"
            className="fill-[var(--color-txt)] text-[14px]"
          >
            API / Server
          </text>
        </motion.g>

        {/* DB node */}
        <motion.g
          initial={{ y: 0 }}
          animate={{ y: highlight === "DB" ? -6 : 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 12 }}
        >
          <rect
            x="480"
            y="120"
            rx="16"
            ry="16"
            width="120"
            height="80"
            fill="var(--color-surface)"
            stroke="var(--color-border)"
          />
          <text
            x="540"
            y="156"
            textAnchor="middle"
            alignmentBaseline="middle"
            className="fill-[var(--color-txt)] text-[14px]"
          >
            Database
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
