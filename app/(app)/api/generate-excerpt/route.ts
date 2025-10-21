import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

const BodySchema = z.object({
  content: z.string().min(1, "content is required").max(50_000),
});

type ExcerptResponse = { excerpt: string };
type ErrorResponse = { error: string };

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const openai = new OpenAI({
  apiKey: requireEnv("OPENAI_API_KEY"),
});

export async function POST(
  req: NextRequest
): Promise<NextResponse<ExcerptResponse | ErrorResponse>> {
  try {
    const json = (await req.json()) as unknown;
    const result = BodySchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues.map((i) => i.message).join("; ") },
        { status: 400 }
      );
    }

    const { content } = result.data;

    const prompt = `Summarize the following blog content in 2-3 engaging sentences for use as an excerpt:\n\n${content}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 120,
      temperature: 0.7,
    });

    const firstChoice = response.choices?.[0];
    const message = firstChoice?.message;
    const text = typeof message?.content === "string" ? message.content : "";
    const excerpt = text.trim();

    if (!excerpt) {
      return NextResponse.json(
        { error: "Failed to generate excerpt" },
        { status: 502 }
      );
    }

    return NextResponse.json({ excerpt });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal server error";
    console.error("Excerpt generation failed:", err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// import { NextResponse } from "next/server";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // must be set in your .env.local
// });

// export async function POST(req: Request) {
//   try {
//     const { content } = await req.json();
//     if (!content) {
//       return NextResponse.json(
//         { error: "No content provided" },
//         { status: 400 }
//       );
//     }

//     // Call OpenAI to summarize content
//     const prompt = `Summarize the following blog content in 2-3 engaging sentences for use as an excerpt:\n\n${content}`;

//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: prompt }],
//       max_tokens: 120,
//       temperature: 0.7,
//     });

//     const excerpt = response.choices[0]?.message?.content?.trim() || "";
//     return NextResponse.json({ excerpt });
//   } catch (error: any) {
//     console.error("Excerpt generation failed:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
