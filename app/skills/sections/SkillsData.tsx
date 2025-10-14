import {
  ArrowRight,
  Cpu,
  Database,
  LayoutList,
  Link as LinkIcon,
} from "lucide-react";

export type Skill = {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Tools" | "Other";
  confidence: number; // 0-100
  note: string;
  icon?: React.ReactNode;
};

export const SKILLS: Skill[] = [
  {
    id: "ts",
    name: "TypeScript",
    category: "Frontend",
    confidence: 92,
    note: "Typed codebases, safer refactors, better DX.",
    icon: <LayoutList className="w-5 h-5" />,
  },
  {
    id: "next",
    name: "Next.js",
    category: "Frontend",
    confidence: 90,
    note: "App Router, SSR/SSG, performant routes & SEO.",
    icon: <LinkIcon className="w-5 h-5" />,
  },
  {
    id: "react",
    name: "React",
    category: "Frontend",
    confidence: 95,
    note: "Component-driven UIs with strong composition patterns.",
    icon: <LayoutList className="w-5 h-5" />,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend",
    confidence: 94,
    note: "Utility-first for fast, consistent UI implementation.",
    icon: <LayoutList className="w-5 h-5" />,
  },
  {
    id: "node",
    name: "Node.js",
    category: "Backend",
    confidence: 88,
    note: "APIs, server logic, and lightweight microservices.",
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "Backend",
    confidence: 85,
    note: "Auth, Row-Level Security, storage and real-time flows.",
    icon: <Database className="w-5 h-5" />,
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "Tools",
    confidence: 90,
    note: "Instant deployments and edge-friendly hosting.",
    icon: <LinkIcon className="w-5 h-5" />,
  },
  {
    id: "git",
    name: "Git / GitHub",
    category: "Tools",
    confidence: 94,
    note: "Branching, PRs, code reviews, CI workflows.",
    icon: <LinkIcon className="w-5 h-5" />,
  },
  {
    id: "figma",
    name: "Figma",
    category: "Tools",
    confidence: 78,
    note: "Design handoff, rapid prototyping, system thinking.",
    icon: <LayoutList className="w-5 h-5" />,
  },
];
