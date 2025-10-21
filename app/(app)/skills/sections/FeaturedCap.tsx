import { motion } from "framer-motion";

type Props = {
  heading: string;
  text: string;
  icon: React.ReactNode;
};

export default function FeaturedCapabilities({ heading, text, icon }: Props) {
  return (
    <motion.div
      whileHover={{ x: 6 }}
      className="p-3 rounded-lg bg-background border border-border"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-md bg-primary/10 text-primary">
          <p>{icon}</p>
        </div>
        <div>
          <p className="text-txt font-semibold">{heading}</p>
          <p className="text-text-muted text-sm">{text}</p>
        </div>
      </div>
    </motion.div>
  );
}
