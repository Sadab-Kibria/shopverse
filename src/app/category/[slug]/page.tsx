import CategoryNav from "@/components/CategoryNav";
import ProductsGrid from "@/components/ProductsGrid";
import { db } from "@/db";
import { items } from "@/db/schema";
import { sql } from "drizzle-orm";

// 🔧 params must be async
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categorySlug = slug.toLowerCase();

  // ✅ Fetch products INCLUDING thumbnailUrl
  const products = await db
    .select({
      id: items.id,
      name: items.name,
      description: items.description,
      price: items.price,
      stock: items.stock,
      category: items.category,
      thumbnailUrl: items.thumbnailUrl,
    })
    .from(items)
    .where(sql`LOWER(${items.category}) = ${categorySlug}`);

  // Fetch categories
  const categories = await db
    .selectDistinct({ category: items.category })
    .from(items);

  return (
    <div className="relative bg-gray-100 min-h-screen">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="p-8 max-w-7xl mx-auto">
        <CategoryNav categories={categories} current={categorySlug} />

        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          {categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)}
        </h1>

        {/* Client-side component */}
        <ProductsGrid products={products} categorySlug={categorySlug} />
      </div>
    </div>
  );
}
