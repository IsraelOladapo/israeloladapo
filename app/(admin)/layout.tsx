import "./globals.css";
import { createClient } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import Sidebar from "./dashboard/components/Sidebar";
import Topbar from "./dashboard/components/Topbar";
import { ThemeProvider } from "@/context/ThemeContext";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  console.log("SESSION IN PROD:", session);
  console.log("SESSION ERROR:", error);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);

  // const adminEmail = process.env.ADMIN_EMAIL;

  // if (!user || user.email !== adminEmail) {
  //   redirect("/login");
  // }

  return (
    <html lang="en">
      <body className="flex min-h-screen bg-background text-txt">
        <ThemeProvider>
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Topbar user={user} />
            <main className="flex-1 p-6 overflow-y-auto">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
