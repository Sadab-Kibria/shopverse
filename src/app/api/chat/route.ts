import { NextResponse } from "next/server";
import { db } from "@/db";
import { items } from "@/db/schema";

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    // === Fetch all products from DB ===
    const products = await db.select().from(items);

    // Convert to a compact list for the AI
    const productList = products
      .map(
        (p, index) =>
          `${index + 1}. ${p.name} — $${p.price} — ${p.category} — stock: ${p.stock}`
      )
      .join("\n");

    const productNames = products.map((p) => p.name.toLowerCase());

    // === SYSTEM INSTRUCTIONS FOR STRICT PRODUCT CONTROL ===
    const systemPrompt = `
      You are ShopVerse Assistant.  
      Only recommend or talk about products that EXIST in the database list below.  
      NEVER invent new products.  
      If a user gives a number, treat it as selecting the product with that number.  
      If user says "yes" or "no", respond naturally based on previous context.
      Always answer fully and never cut text.

      DATABASE PRODUCTS:
      ${productList}
      `;

    // Build the message list
    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: message }
    ];

    const aiRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        max_completion_tokens: 800,
        temperature: 0.5,
      }),
    });

    const data = await aiRes.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't understand.";

    return NextResponse.json({
      reply,
      products, // optional if you want debugging info
    });
  } catch (err) {
    console.error("Chat error:", err);
    return NextResponse.json({ reply: "Error connecting to ShopEase Assistant." });
  }
}
