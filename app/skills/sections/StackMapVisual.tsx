import { motion } from "framer-motion";
import StackMap from "./StackMap";

export default function StackMapVisual({
  highlight,
}: {
  highlight?: string | null;
}) {
  return (
    <div className="hidde lg:block">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-surface border border-border p-5 rounded-2xl h-full flex flex-col"
      >
        <h4 className="text-lg font-semibold mb-4 text-txt">Stack Map</h4>
        <div className="flex-1">
          <StackMap highlight={highlight ?? null} />
        </div>
        <p className="text-text-muted text-sm mt-4">
          Hover a skill or pick a category to see relationships.
        </p>
      </motion.div>
    </div>
  );
}
