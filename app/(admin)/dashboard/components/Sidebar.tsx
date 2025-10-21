"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Home, FileText, Settings, Menu } from "lucide-react";
import SidebarItem from "./SidebarItem";

const navItems = [
  { name: "Overview", icon: <Home size={20} />, path: "/dashboard" },
  { name: "Posts", icon: <FileText size={20} />, path: "/blog" },
  // { name: "Settings", icon: Settings, path: "/dashboard/settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);

  const isExpanded = hovered || !collapsed;

  return (
    <motion.aside
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        width: isExpanded ? 240 : 72,
      }}
      transition={{ duration: 0.2 }}
      className="relative flex flex-col  bg-surface shadow-sm"
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-between px-4 py-4">
        {isExpanded && (
          <h1 className="text-lg font-semibold text-blue-600">Admin</h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-gray-100 transition"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col mt-6 space-y-1">
        {navItems.map((item) => (
          <SidebarItem
            key={item.name}
            name={item.name}
            icon={item.icon}
            path={item.path}
            collapsed={!isExpanded}
          />
        ))}
      </nav>

      {/* Footer (e.g., logout button) */}
      <div className="mt-auto">
        <SidebarItem
          name="Settings"
          icon={<Settings size={20} />}
          path="#settings"
          collapsed={!isExpanded}
        />
      </div>
    </motion.aside>
  );
}
