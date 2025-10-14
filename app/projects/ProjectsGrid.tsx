"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { projectsData } from "@/lib/projectsData";
import { Button } from "@/components/ui/Button";
import { useThemeCtx } from "@/context/ThemeContext";

const categories = ["All", "Fullstack", "Frontend", "Backend"];

export default function ProjectsGrid({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  const { theme } = useThemeCtx();

  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section className="relative overflow-hidden bg-background text-txt py-24 sm:py-32">
      {/* gradient accent aura */}
      <div
        className="absolute inset-0 -z-10 h-full w-full
          bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 blur-3xl"
      />

      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold">
            Featured Projects
          </h2>
          <p className="text-text-muted mt-2">
            Some works I’m proud of recently.
          </p>

          <div className="flex flex-wrap gap-3 mt-8 justify-center">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={cat === activeCategory ? "primary" : "outline"}
                onClick={() => setActiveCategory(cat)}
                className="capitalize"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filtered.map((proj) => (
              <motion.div
                key={proj.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.3 }}
                className="group relative cursor-pointer rounded-2xl overflow-hidden border border-border bg-surface hover:shadow-lg transition"
                onClick={() => onSelect(proj.id)}
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={
                      proj.image.length > 1
                        ? theme === "light"
                          ? proj.image[1]
                          : proj.image[0]
                        : proj.image[0]
                    }
                    alt={proj.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold">{proj.title}</h3>
                  <p className="text-text-muted text-sm mt-2 line-clamp-2">
                    {proj.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {proj.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded-full border border-border bg-background"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
