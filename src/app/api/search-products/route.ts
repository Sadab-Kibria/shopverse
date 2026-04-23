import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { items } from "@/db/schema";
import { ilike } from "drizzle-orm"

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("q") || "";
  if (!search) return NextResponse.json([]);

  const results = await db
    .select()
    .from(items)
   .where(ilike(items.name, `%${search}%`)) 
    .limit(10);

  return NextResponse.json(results);
}
