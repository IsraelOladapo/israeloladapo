"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { projectsData } from "@/lib/projectsData";
import { Button } from "@/components/ui/Button";
import { useThemeCtx } from "@/context/ThemeContext";

interface ProjectModalProps {
  selectedId: string | null;
  onClose: () => void;
}

export default function ProjectModal({
  selectedId,
  onClose,
}: ProjectModalProps) {
  const { theme } = useThemeCtx();

  const project = projectsData.find((p) => p.id === selectedId);
  if (!project) return null;

  return (
    <AnimatePresence>
      {selectedId && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            key="modal"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-3xl w-full bg-surface rounded-2xl overflow-hidden shadow-2xl text-txt border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image */}
            <div className="relative h-64 w-full">
              <Image
                src={
                  project.image.length > 1
                    ? theme === "light"
                      ? project.image[1]
                      : project.image[0]
                    : project.image[0]
                }
                alt={project.title}
                fill
                className="object-cover"
              />
              <button
                onClick={onClose}
                className="absolute top-3 right-3 bg-background/60 hover:bg-background/90 text-txt p-2 rounded-full backdrop-blur-sm transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 space-y-4">
              <h3 className="text-2xl font-semibold">{project.title}</h3>
              <p className="text-text-muted leading-relaxed">
                {project.longDescription}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 border border-border bg-background rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 pt-6">
                {project.github && (
                  <Button variant="outline">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                )}

                {project.live && (
                  <Button variant="primary">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
