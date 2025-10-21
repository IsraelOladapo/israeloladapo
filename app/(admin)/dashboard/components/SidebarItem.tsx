"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // optional helper if you have one

export default function SidebarItem({
  name,
  icon,
  path,
  collapsed,
}: {
  name: string;
  icon: React.ReactElement;
  path: string;
  collapsed: boolean;
}) {
  const pathname = usePathname();
  const active = pathname === path;

  return (
    <Link href={path}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        className={cn(
          "flex items-center gap-3 rounded-md px-4 py-2 mx-2 cursor-pointer transition-colors",
          active
            ? "bg-blue-100 text-blue-600 font-medium"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        )}
      >
        {/* <Icon size={20} /> */}
        <p>{icon}</p>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {name}
          </motion.span>
        )}
      </motion.div>
    </Link>
  );
}
