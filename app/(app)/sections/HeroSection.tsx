"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background text-txt py-24 sm:py-32">
      {/* Gradient Background Accent */}
      <div
        className="absolute inset-0 -z-10 h-full w-full 
          bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 blur-3xl"
      />

      {/* Floating Animated Shapes */}
      <motion.div
        className="absolute -top-20 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "loop" }}
      />
      <motion.div
        className="absolute top-32 right-10 w-32 h-32 bg-secondary/20 rounded-2xl blur-2xl"
        animate={{ y: [0, -15, 0], x: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "loop" }}
      />
      <motion.div
        className="absolute bottom-10 left-1/3 w-24 h-24 bg-primary/10 rounded-full blur-3xl"
        animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "loop" }}
      />

      <div className="container mx-auto px-6 text-center flex flex-col items-center justify-center gap-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-4 text-txt">
            Hey, I'm <span className="text-primary">Iszie</span> a Web App
            Developer building modern web experiences.
          </h1>
          <p className="text-text-muted text-lg sm:text-xl max-w-2xl mx-auto">
            Crafting beautiful, scalable products with TypeScript, Next.js,
            Tailwind, and Supabase. From idea to deployment.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          <Link
            href="/projects"
            className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover transition-colors"
          >
            See My Work
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl border border-border text-txt font-semibold hover:bg-surface transition-colors"
          >
            Contact Me
          </Link>
        </motion.div>
      </div>

      {/* Floating Code Snippet Background */}
      <motion.pre
        initial={{ opacity: 0.1 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 1.2, duration: 2 }}
        className="absolute bottom-0 right-4 text-xs sm:text-sm text-txt/60 select-none"
      >
        {`const developer = {
  name: "Iszie",
  stack: ["TypeScript", "Next.js", "Tailwind", "Supabase"],
  passion: "Building sleek and functional digital experiences",
};`}
      </motion.pre>
    </section>
  );
}

// "use client";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";

// export default function HeroSection() {
//   return (
//     <section className="relative overflow-hidden bg-background text-txt py-24 sm:py-32">
//       {/* Gradient Background Accent */}
//       <div
//         className="absolute inset-0 -z-10 h-full w-full
//         bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 blur-3xl"
//       />

//       <div className="container mx-auto px-6 text-center flex flex-col items-center justify-center gap-8">
//         {/* Floating Avatar */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-lg"
//         >
//           <Image
//             src="/avatar-placeholder.png"
//             alt="Iszie Avatar"
//             fill
//             className="object-cover"
//           />
//         </motion.div>

//         {/* Heading */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="max-w-3xl"
//         >
//           <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-4 text-txt">
//             Hey, I'm <span className="text-primary">Iszie</span> a full-stack
//             developer building modern web experiences.
//           </h1>
//           <p className="text-text-muted text-lg sm:text-xl max-w-2xl mx-auto">
//             Crafting beautiful, scalable products with TypeScript, Next.js,
//             Tailwind, and Supabase — from idea to deployment.
//           </p>
//         </motion.div>

//         {/* CTA Buttons */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1 }}
//           className="flex flex-wrap justify-center gap-4 mt-8"
//         >
//           <Link
//             href="#projects"
//             className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover transition-colors"
//           >
//             See My Work
//           </Link>
//           <Link
//             href="#contact"
//             className="px-6 py-3 rounded-xl border border-border text-txt font-semibold hover:bg-surface transition-colors"
//           >
//             Contact Me
//           </Link>
//         </motion.div>
//       </div>

//       {/* Floating Code Snippet Background */}
//       <motion.pre
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.08 }}
//         transition={{ delay: 1.2, duration: 2 }}
//         className="absolute bottom-0 right-4 text-xs sm:text-sm text-txt/60 select-none"
//       >
//         {`const developer = {
//   name: "Iszie",
//   stack: ["TypeScript", "Next.js", "Tailwind", "Supabase"],
//   passion: "Building sleek and functional digital experiences",
// };`}
//       </motion.pre>
//     </section>
//   );
// }
