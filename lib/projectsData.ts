import { StaticImageData } from "next/image";
import myshopDark from "@/public/projects/myshop-dark.png";
import myshopLight from "@/public/projects/myshop-light.png";
import portfolioDark from "@/public/projects/my-portfolio.png";
import portfolioLight from "@/public/projects/my-port-light.png";

import aiwriter from "@/public/projects/Profile avatar.jpg";
import dashlite from "@/public/projects/Profile avatar.jpg";

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  tech: string[];
  category: "Fullstack" | "Frontend" | "Backend";
  image: string | StaticImageData[];
  github?: string;
  live?: string;
}

export const projectsData: Project[] = [
  {
    id: "myshop",
    title: "My Shop",
    shortDescription:
      "Nigeria-focused marketplace for SMEs to create mini-stores with shareable links.",
    longDescription:
      "My Shop is a full-featured marketplace designed for Nigerian SMEs. It enables vendors to easily create their own mini-stores, upload products, and manage orders through a Supabase-powered dashboard. The frontend is built with React (Vite) + TailwindCSS, and the backend is handled entirely through Supabase with row-level security, storage, and auth integration.",
    tech: ["React", "TailwindCSS", "Supabase", "Vercel"],
    category: "Fullstack",
    image: [myshopDark, myshopLight],
    github: "https://github.com/IsraelOladapo",
    live: "https://myshop-online.vercel.app",
  },
  {
    id: "portfolio",
    title: "Portfolio",
    shortDescription:
      "Minimal, fast, and animated portfolio built with Next.js and TailwindCSS.",
    longDescription:
      "This project is my personal portfolio — a modern, responsive site showcasing my work and skills. It’s built with Next.js 15, styled using TailwindCSS v4.1, and powered by Framer Motion for smooth micro-interactions. Every section is modular and reusable, from the Hero to the Contact page.",
    tech: ["Next.js", "TailwindCSS", "Framer Motion"],
    category: "Frontend",
    image: [portfolioDark, portfolioLight],
    github: "https://github.com/IsraelOladapo",
  },
  {
    id: "aiwriter",
    title: "AI Writer",
    shortDescription:
      "A GPT-powered writing assistant for generating high-quality blog and marketing content.",
    longDescription:
      "AI Writer uses OpenAI’s GPT models to generate blog posts, captions, and social media content in seconds. Users can manage their drafts, save ideas, and generate multiple content types based on prompts. Built with Next.js + Supabase, it features prompt history, role-based permissions, and beautiful text animations.",
    tech: ["Next.js", "Supabase", "OpenAI API", "ShadCN UI"],
    category: "Fullstack",
    image: [aiwriter],
    github: "https://github.com/IsraelOladapo",
    live: "https://aiwriter.vercel.app",
  },
  {
    id: "dashlite",
    title: "DashLite",
    shortDescription:
      "Lightweight, data-driven admin dashboard template built with React and Chart.js.",
    longDescription:
      "DashLite is a modular admin dashboard template optimized for speed and simplicity. It features real-time data visualization, authentication mockup, and dark mode. Built with React, TailwindCSS, and Chart.js, it’s the perfect starting point for analytics or SaaS apps.",
    tech: ["React", "TailwindCSS", "Chart.js"],
    category: "Frontend",
    image: [dashlite],
    github: "https://github.com/IsraelOladapo",
  },
];
