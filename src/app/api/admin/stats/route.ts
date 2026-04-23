import { db } from "@/db";
import { items } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const totalProducts = await db.select({ count: sql<number>`count(*)` }).from(items);
    const totalCategories = await db.select({ count: sql<number>`count(distinct ${items.category})` }).from(items);
    const inStock = await db.select({ count: sql<number>`count(*)` }).from(items).where(sql`${items.stock} > 0`);

    return NextResponse.json({
      totalProducts: totalProducts[0].count,
      totalCategories: totalCategories[0].count,
      inStock: inStock[0].count,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
