// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  // Create an initial NextResponse
  const res = NextResponse.next({ request: { headers: req.headers } });

  // Initialize Supabase client with type safety
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options: CookieOptions;
          }[]
        ) {
          cookiesToSet.forEach(({ name, value, options }) => {
            try {
              res.cookies.set(name, value, options);
            } catch (err) {
              console.error("Failed to set cookie in middleware:", err);
            }
          });
        },
      },
    }
  );

  // Refresh the session if expired
  const { data, error } = await supabase.auth.getSession();

  if (error) console.warn("Supabase session refresh error:", error.message);

  return res;
}

// Limit middleware to only these routes
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
