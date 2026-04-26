import { NextResponse } from "next/server";
import { db } from "@/db";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const productId = Number(id);
  const data = await req.json();

  try {
    // Fetch existing product
    const [existing] = await db
      .select()
      .from(items)
      .where(eq(items.id, productId));

    if (!existing) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const updatedData = {
      name: data.name,
      price: data.price,
      stock: data.stock,
      description: data.description,
      category: data.category,
      specs: data.specs ?? existing.specs,

      // ✅ IMPORTANT PART — keep old image if not changed
      thumbnailUrl:
        data.thumbnailUrl && data.thumbnailUrl.trim() !== ""
          ? data.thumbnailUrl
          : existing.thumbnailUrl,
    };

    await db.update(items).set(updatedData).where(eq(items.id, productId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
