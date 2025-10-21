import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // must be set in your .env.local
});

export async function POST(req: Request) {
  try {
    const { content } = await req.json();
    if (!content) {
      return NextResponse.json(
        { error: "No content provided" },
        { status: 400 }
      );
    }

    // Call OpenAI to summarize content
    const prompt = `Summarize the following blog content in 2-3 engaging sentences for use as an excerpt:\n\n${content}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 120,
      temperature: 0.7,
    });

    const excerpt = response.choices[0]?.message?.content?.trim() || "";
    return NextResponse.json({ excerpt });
  } catch (error: any) {
    console.error("Excerpt generation failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
