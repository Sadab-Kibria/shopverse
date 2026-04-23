import { NextResponse } from "next/server";
import { db } from "@/db";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";

/* =======================
   GET PRODUCT BY ID
======================= */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = Number(params.id);

    if (isNaN(productId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const product = await db
      .select()
      .from(items)
      .where(eq(items.id, productId))
      .limit(1);

    if (product.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product[0]);
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/* =======================
   UPDATE PRODUCT (PUT)
======================= */
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = Number(params.id);
    const body = await req.json();

    if (isNaN(productId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const {
      name,
      price,
      stock,
      category,
      description,
      specs,
    } = body;

    await db
      .update(items)
      .set({
        name,
        price,
        stock,
        category,
        description,
        specs,
      })
      .where(eq(items.id, productId));

    return NextResponse.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Update product error:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
