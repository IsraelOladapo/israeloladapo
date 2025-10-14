"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const skills = [
  "TypeScript",
  "Next.js",
  "React",
  "Tailwind CSS",
  "Supabase",
  "Node.js",
  "PostgresSQL",
  "Vercel",
  "Git / GitHub",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-background text-txt py-24 sm:py-32 overflow-hidden"
    >
      {/* Soft Gradient Aura */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-secondary/10 blur-3xl" />

      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        {/* Image / Visual */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative w-full max-w-sm mx-auto"
        >
          <div className="relative aspect-square rounded-3xl overflow-hidden border-4 border-primary shadow-xl">
            <Image
              src="/Profile avatar.jpg"
              alt="Iszie Portrait"
              fill
              className="object-cover"
            />
          </div>
          {/* Floating Accent */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -top-6 -right-6 w-20 h-20 bg-secondary/20 blur-2xl rounded-full"
          />
        </motion.div>

        {/* About Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1 max-w-2xl"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">
            A little about me
          </h2>
          <p className="text-text-muted leading-relaxed mb-6 text-lg">
            I'm Israel Oladapo, a full-stack developer passionate about building
            sleek, functional, and meaningful web experiences. My work blends
            performance with aesthetics, creating solutions that not only work
            great but feel great to use. I believe in clean code, thoughtful
            design, and the power of simplicity in solving real-world problems.
          </p>

          <p className="text-text-muted leading-relaxed mb-8">
            When I'm not coding, I love exploring new technologies, refining my
            workflows, and helping others bring their digital ideas to life.
          </p>

          {/* Skills Snapshot */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-secondary">
              My Tech Stack
            </h3>
            <ul className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <motion.li
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded-full bg-surface border border-border text-sm text-txt/90 shadow-sm"
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
