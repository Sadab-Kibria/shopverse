import { NextResponse } from "next/server";
import { db } from "@/db";
import { items } from "@/db/schema";

export async function GET() {
  try {
    const products = await db.select().from(items);
    return NextResponse.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
