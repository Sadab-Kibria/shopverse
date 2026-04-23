import { NextResponse } from "next/server";
import { db } from "@/db";
import { customers, orders } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, item } = body;

    if (!customer || !item) {
      return NextResponse.json(
        { error: "Missing customer or item data" },
        { status: 400 }
      );
    }

    // 1️⃣ Save customer
    const insertedCustomer = await db
      .insert(customers)
      .values({
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        address: customer.address,
      })
      .returning({ id: customers.id });

    const customerId = insertedCustomer[0].id;

    // 2️⃣ Save order (PENDING)
    await db.insert(orders).values({
      customerId,
      items: [item], // stored as JSON
      total: item.price * item.cartQuantity,
      status: "pending",
    });

    return NextResponse.json({
      message: "Order placed successfully",
    });
  } catch (error) {
    console.error("Pending order error:", error);
    return NextResponse.json(
      { error: "Failed to place order" },
      { status: 500 }
    );
  }
}
