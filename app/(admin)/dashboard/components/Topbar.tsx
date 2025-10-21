// app/dashboard/components/Topbar.tsx
"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { LogOut, Moon, Sun } from "lucide-react";
import { useThemeCtx } from "@/context/ThemeContext";

export default function Topbar({ user }: { user: any }) {
  const router = useRouter();
  const { theme, toggleTheme } = useThemeCtx();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-[var(--color-background)]"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        <div className="flex items-center gap-3">
          <div className="text-sm text-[var(--color-text-muted)]">
            {user?.email}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-700 hover:text-red-500 cursor-pointer"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

// "use client";
// import { supabase } from "@/lib/supabaseClient";
// import { LogOut } from "lucide-react";

// export default function Topbar({ user }: { user: any }) {
//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     window.location.href = "/dashboard/login";
//   };

//   return (
//     <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-[var(--color-surface)]">
//       <h2 className="text-lg font-semibold">Welcome, {user?.email}</h2>
//       <button
//         onClick={handleLogout}
//         className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600"
//       >
//         <LogOut size={16} />
//         Logout
//       </button>
//     </header>
//   );
// }
