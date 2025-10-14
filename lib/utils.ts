export const CONTACT = {
  name: "Israel Oladapo",
  title: "Full-stack Developer (React • Node • Tailwind)",
  email: "israeloladapo.dev@gmail.com",
  whatsappNumber: "+2348164692198",
  linkedin: "https://www.linkedin.com/in/israel-oladapo-0047b1260/",
  github: "https://github.com/IsraelOladapo",
  twitter: "https://twitter.com/dev_iszie",
  facebook: "https://facebook.com/israel.oladapo.372",
  website: "https://myshop-3qo9.vercel.app",
  location: "Lagos, Nigeria",
  resumeUrl: "/CURRICULUM+VITAE.pdf",
};

export const whatsappUrl = (phone: string) => {
  const cleaned = phone.replace(/\s+/g, "");
  return `https://wa.me/${cleaned.replace(/^\+/, "")}`;
};

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
