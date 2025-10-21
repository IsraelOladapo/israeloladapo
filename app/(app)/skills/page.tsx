"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useMemo } from "react";
import { SKILLS } from "./sections/SkillsData";
import SkillCard from "./sections/SkillCard";
import { Button } from "@/components/ui/Button";

import { ArrowRight, Cpu, Database, LayoutList } from "lucide-react";
import StackMapVisual from "./sections/StackMapVisual";
import FeaturedCapabilities from "./sections/FeaturedCap";

export default function Skills() {
  const categories = useMemo(
    () => ["All", "Frontend", "Backend", "Tools", "Other"],
    []
  );
  const [active, setActive] = useState<string>("All");
  const [highlight, setHighlight] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (active === "All") return SKILLS;
    return SKILLS.filter((s) => s.category === active);
  }, [active]);

  return (
    <section
      id="skills"
      className="relative py-24 sm:py-32 bg-background text-txt overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/6 via-transparent to-secondary/6 blur-3xl" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
            Turning complex logic into{" "}
            <span className="text-primary">seamless</span> digital experiences
          </h2>
          <p className="text-text-muted mt-3">
            Frontend, backend and tools presented as the systems I use to build
            practical, fast, and maintainable products.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left column: Filters + Featured capabilities */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-surface border border-border p-5 rounded-2xl"
            >
              <h3 className="text-xl font-semibold text-txt mb-3">
                Categories
              </h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setActive(c);
                      setHighlight(
                        c === "All"
                          ? null
                          : c === "Frontend"
                          ? "Frontend"
                          : c === "Backend"
                          ? "Backend"
                          : null
                      );
                    }}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                      c === active
                        ? "bg-primary text-white"
                        : "bg-background border border-border text-text-muted"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Featured Capabilities */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.06 }}
              className="bg-surface border border-border p-5 rounded-2xl"
            >
              <h3 className="text-xl font-semibold text-txt mb-3">
                Featured Capabilities
              </h3>
              <div className="space-y-3">
                <FeaturedCapabilities
                  heading="Reusable UI Systems"
                  text="Atomic components, consistent tokens, and accessible
                        patterns."
                  icon={<Cpu className="w-5 h-5" />}
                />

                <FeaturedCapabilities
                  heading="Reliable Data Flows"
                  text="Auth, RLS, and realtime where it makes sense. Powered
                        with Supabase."
                  icon={<Database className="w-5 h-5" />}
                />

                <FeaturedCapabilities
                  heading="Performance & Polished UX"
                  text="Fast interactions and pragmatic UX decisions for better
                        adoption"
                  icon={<LayoutList className="w-5 h-5" />}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="bg-surface border border-border p-5 rounded-2xl"
            >
              <h3 className="text-xl font-semibold text-txt mb-3">
                Want to see this in action?
              </h3>
              <p className="text-text-muted text-sm mb-4">
                Check my projects where these skills come together.
              </p>
              <div className="flex gap-3">
                <Button variant="primary">
                  <Link href="/projects">
                    View Projects <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline">
                  <Link href="/contact">Contact</Link>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Middle column: Skill grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <AnimatePresence initial={false}>
              {filtered.map((skill) => (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                >
                  <SkillCard
                    skill={skill}
                    onClick={() => {
                      setHighlight(
                        skill.category === "Frontend"
                          ? "Frontend"
                          : skill.category === "Backend"
                          ? "Backend"
                          : null
                      );
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right column: Stack map (visual) */}

          <StackMapVisual highlight={highlight ?? null} />
        </div>
      </div>
    </section>
  );
}
