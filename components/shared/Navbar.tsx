"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeCtx } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Skills", href: "/skills" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useThemeCtx();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/90 backdrop-blur-lg shadow-sm"
          : "bg-background/0"
      }`}
    >
      <div className="mx-auto flex items-center justify-between px-6 md:px-10 py-4 max-w-7xl">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-primary tracking-tight"
        >
          Dev.<span className="text-secondary"> Iszie</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 text-sm font-medium text-txt">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-primary transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex justify-between gap-4">
          {/* Theme Button */}
          <button className="mb-1 text-txt" onClick={() => toggleTheme()}>
            {theme === "dark" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </button>

          {/* Mobile Menu Toggle */}

          <button
            className="md:hidden text-txt"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-surface/90 backdrop-blur-md shadow-md md:hidden"
            >
              <div className="flex flex-col items-center py-4 space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-txt hover:text-primary text-sm font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { Menu, X } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// const navLinks = [
//   { name: "Home", href: "/" },
//   { name: "About", href: "#about" },
//   { name: "Projects", href: "#projects" },
//   { name: "Skills", href: "#skills" },
//   { name: "Blog", href: "#blog" },
//   { name: "Contact", href: "#contact" },
// ];

// export const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav
//       className={`fixed top-0 w-full z-50 transition-all duration-300 ${
//         scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
//       }`}
//     >
//       <div className="mx-auto flex items-center justify-between px-6 md:px-10 py-4 max-w-7xl">
//         {/* Logo */}
//         <Link
//           href="/"
//           className="text-xl font-bold text-blue-600 tracking-tight"
//         >
//           Dev.<span className="text-emerald-600"> Iszie</span>
//         </Link>

//         {/* Desktop Nav */}
//         <div className="hidden md:flex space-x-6 text-sm font-medium text-slate-700">
//           {navLinks.map((link) => (
//             <a
//               key={link.name}
//               href={link.href}
//               className="hover:text-blue-600 transition-colors duration-200"
//             >
//               {link.name}
//             </a>
//           ))}
//         </div>

//         {/* Mobile Menu Toggle */}
//         <button
//           className="md:hidden text-slate-700"
//           onClick={() => setIsOpen((prev) => !prev)}
//         >
//           {isOpen ? <X size={22} /> : <Menu size={22} />}
//         </button>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="absolute top-full left-0 w-full bg-white/90 backdrop-blur-md shadow-md md:hidden"
//             >
//               <div className="flex flex-col items-center py-4 space-y-4">
//                 {navLinks.map((link) => (
//                   <a
//                     key={link.name}
//                     href={link.href}
//                     className="text-slate-800 hover:text-blue-600 text-sm font-medium"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     {link.name}
//                   </a>
//                 ))}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </nav>
//   );
// };
