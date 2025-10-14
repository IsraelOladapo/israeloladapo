// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
// import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "Dev. Iszie | Full-Stack Developer Portfolio",
  description:
    "Building experiences that solve real problems, not just ship code. Portfolio of Israel Oladapo, full-stack engineer specialized in TypeScript, Next.js, Tailwind, and Supabase.",
  keywords: [
    "Dev. Iszie",
    "Full-stack developer",
    "Next.js portfolio",
    "TypeScript",
    "Supabase",
    "Israel Oladapo",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
