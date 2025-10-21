"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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

const gallery = [
  { src: "/Profile avatar.jpg", alt: "Portrait" },
  { src: "/workspace-1.jpg", alt: "Workspace" },
  { src: "/project-preview.jpg", alt: "Project in action" },
  { src: "/collab.jpg", alt: "Collaboration moment" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-background text-txt py-24 sm:py-32 overflow-hidden"
    >
      {/* Ambient Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-transparent to-secondary/20 blur-3xl opacity-70" />

      <div className="container mx-auto space-y-15">
        {/* Top Section — Introduction + Carousel */}
        <div className="flex flex-col lg:flex-row lg:px-6 items-center gap-16">
          {/* Swiper Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full mx-auto relative rounded-md overflow-hidden shadow-2xl"
          >
            <Swiper
              modules={[Autoplay, Pagination]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              spaceBetween={30}
              className=""
            >
              {gallery.map((img, i) => (
                <SwiperSlide key={i}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={600}
                    className="w-full h-[350px] md:h-[400px] object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Floating Accent Light */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 w-24 h-24 bg-primary/25 blur-2xl rounded-full"
            />
          </motion.div>

          {/* Narrative Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl px-5"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">
              Crafting Digital Experiences with Intention
            </h2>
            <p className="text-text-muted leading-relaxed mb-6 text-lg">
              I'm <span className="font-semibold text-txt">Israel Oladapo</span>{" "}
              but you can call me{" "}
              <span className="text-primary font-medium">Iszie for short</span>.
              I’m a full-stack web developer who loves bringing ideas to life
              through clean, purposeful code and experiences that feel
              effortless.
            </p>

            <p className="text-text-muted leading-relaxed mb-4">
              My work revolves around crafting usable, scalable, and
              human-centered products blending creative logic with technical
              precision. I don’t just build for the web; I build for people,
              ensuring that design and function always speak the same language.
            </p>
          </motion.div>
        </div>

        {/* Skills Snapshot */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center px-5"
        >
          <h3 className="text-2xl font-semibold mb-6 text-secondary">
            Core Stack
          </h3>
          <ul className="flex flex-wrap justify-center gap-4">
            {skills.map((skill) => (
              <motion.li
                key={skill}
                whileHover={{
                  scale: 1.08,
                }}
                className="px-5 py-2 rounded-full bg-surface border border-border text-sm text-txt/90 shadow-sm cursor-default hover:bg-primary/50"
              >
                {skill}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Deeper Section — Philosophy */}
        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center px-4"
        >
          <h3 className="text-2xl font-semibold mb-4 text-primary">
            My Approach
          </h3>
          <p className="text-text-muted leading-relaxed text-lg">
            Every project starts with a conversation understanding problems, not
            just requirements. I think in systems, design with empathy, and code
            with purpose.
            <br />
            <br />
            Whether it's a startup idea, a marketplace like{" "}
            <span className="font-medium text-secondary">My Shop</span>, or a
            passion project, my focus remains the same: delivering clarity,
            speed, and elegance in every line of code.
          </p>
        </motion.div> */}
      </div>
    </section>
  );
}

// "use client";
// import { motion } from "framer-motion";
// import Image from "next/image";

// const skills = [
//   "TypeScript",
//   "Next.js",
//   "React",
//   "Tailwind CSS",
//   "Supabase",
//   "Node.js",
//   "PostgresSQL",
//   "Vercel",
//   "Git / GitHub",
// ];

// export default function About() {
//   return (
//     <section
//       id="about"
//       className="relative bg-background text-txt py-24 sm:py-32 overflow-hidden"
//     >
//       {/* Soft Gradient Aura */}
//       <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-secondary/10 blur-3xl" />

//       <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
//         {/* Image / Visual */}
//         <motion.div
//           initial={{ opacity: 0, x: -40 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="relative w-full max-w-sm mx-auto"
//         >
//           <div className="relative aspect-square rounded-3xl overflow-hidden border-4 border-primary shadow-xl">
//             <Image
//               src="/Profile avatar.jpg"
//               alt="Iszie Portrait"
//               fill
//               className="object-cover"
//             />
//           </div>
//           {/* Floating Accent */}
//           <motion.div
//             animate={{ y: [0, -15, 0] }}
//             transition={{ duration: 6, repeat: Infinity }}
//             className="absolute -top-6 -right-6 w-20 h-20 bg-secondary/20 blur-2xl rounded-full"
//           />
//         </motion.div>

//         {/* About Text */}
//         <motion.div
//           initial={{ opacity: 0, x: 40 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="flex-1 max-w-2xl"
//         >
//           <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">
//             A little about me
//           </h2>
//           <p className="text-text-muted leading-relaxed mb-6 text-lg">
//             I'm Israel Oladapo, a full-stack developer passionate about building
//             sleek, functional, and meaningful web experiences. My work blends
//             performance with aesthetics, creating solutions that not only work
//             great but feel great to use. I believe in clean code, thoughtful
//             design, and the power of simplicity in solving real-world problems.
//           </p>

//           <p className="text-text-muted leading-relaxed mb-8">
//             When I'm not coding, I love exploring new technologies, refining my
//             workflows, and helping others bring their digital ideas to life.
//           </p>

//           {/* Skills Snapshot */}
//           <div>
//             <h3 className="text-xl font-semibold mb-4 text-secondary">
//               My Tech Stack
//             </h3>
//             <ul className="flex flex-wrap gap-3">
//               {skills.map((skill) => (
//                 <motion.li
//                   key={skill}
//                   whileHover={{ scale: 1.05 }}
//                   className="px-4 py-2 rounded-full bg-surface border border-border text-sm text-txt/90 shadow-sm"
//                 >
//                   {skill}
//                 </motion.li>
//               ))}
//             </ul>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
