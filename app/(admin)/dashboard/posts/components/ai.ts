// "use server";

// export async function generateExcerptAI(content: string): Promise<string> {
//   const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
//   const res = await fetch(`${baseUrl}/api/generate-excerpt`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ content }),
//   });

//   if (!res.ok) throw new Error("Failed to generate excerpt");
//   const data = await res.json();
//   return data.excerpt;
// }

// export async function generateCoverImage(prompt: string): Promise<string> {
//   const res = await fetch("/api/generate-cover", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ prompt }),
//   });

//   if (!res.ok) throw new Error("Failed to generate cover image");
//   const data = await res.json();
//   return data.imageUrl;
// }
