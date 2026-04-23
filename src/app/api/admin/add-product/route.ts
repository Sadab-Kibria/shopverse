import { db } from "@/db";
import { items } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, price, stock, category, description, specs, thumbnailUrl } = body;

    if (!name || !price || !stock || !category || !thumbnailUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await db.insert(items).values({
      name,
      price,
      stock,
      category,
      description: description ?? null,
      specs: specs ?? null,
      thumbnailUrl,   // 👈 STORED IN DB
    });

    return NextResponse.json({ message: "Product added successfully!" });
  } catch (error) {
    console.error("Add product error:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}
