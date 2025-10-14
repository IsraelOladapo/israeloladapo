"use client";

import { useState } from "react";
import ProjectsGrid from "./ProjectsGrid";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <>
      <ProjectsGrid onSelect={(id) => setSelectedId(id)} />
      <ProjectModal
        selectedId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </>
  );
}
