import { db } from "@/db"; // your drizzle connection
import { items } from "@/db/schema";
import { specData } from "./specs";
import { eq } from "drizzle-orm";

export async function updateSpecs() {
  for (const entry of specData) {
    const { id, specs } = entry;

    await db.update(items)
      .set({ specs })
      .where(eq(items.id, id));

    console.log(`Updated specs for ID ${id}`);
  }

  console.log("All specs updated successfully!");
}
updateSpecs();
