import { db } from "@/db";
import { items } from "@/db/schema";
import { eq, and, ne } from "drizzle-orm";
import Link from "next/link";
import Image from "next/image";
import CategoryNav from "@/components/CategoryNav";
import ProductTabs from "@/components/ProductTabs";
import PurchaseButton from "@/components/PurchaseButton";
import { FiArrowLeft, FiPackage, FiStar, FiTruck, FiShield, FiHeart, FiShoppingCart } from "react-icons/fi";
import toast from "react-hot-toast";

type Props = {
  params: { id: string };
};

export default async function ProductPage({ params }: Props) {
  const productId = parseInt(params.id, 10);

  // Fetch main product
  const [product] = await db
    .select()
    .from(items)
    .where(eq(items.id, productId));

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-8">
        <div className="text-center p-12 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl max-w-md border border-white/20">
          <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
            <FiPackage className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
          >
            <FiArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Ensure category is string and handle null/undefined
  const productCategory = product.category ?? "uncategorized";
  const productPrice = typeof product.price === 'number' ? product.price : 0;
  const productStock = product.stock ?? 0;
  const productName = product.name || "Unnamed Product";

  // Fetch categories for navigation
  const categories = await db
    .selectDistinct({ category: items.category })
    .from(items);

  // Fetch related products from the same category (excluding current product)
  const relatedProducts = await db
    .select({
      id: items.id,
      name: items.name,
      price: items.price,
      thumbnailUrl: items.thumbnailUrl,
      stock: items.stock,
      category: items.category
    })
    .from(items)
    .where(
      and(
        eq(items.category, productCategory),
        ne(items.id, productId)
      )
    )
    .limit(4);

  // Mock rating for demonstration
  const rating = 4.5;
  const reviewCount = 128;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Decorative background elements */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link
            href={`/category/${productCategory}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl hover:bg-white shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 group"
          >
            <FiArrowLeft className="w-5 h-5 text-blue-600 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-gray-700">Back to {productCategory.charAt(0).toUpperCase() + productCategory.slice(1)}</span>
          </Link>
        </div>

        {/* Category Navigation */}
        <div className="mb-8">
          <CategoryNav categories={categories} />
        </div>

        {/* Main Product Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200">
                {product.thumbnailUrl ? (
                  <Image
                    src={product.thumbnailUrl}
                    alt={productName}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
                    priority
                  />
                ) : (
                  <div className="aspect-square flex items-center justify-center">
                    <FiPackage className="w-24 h-24 text-gray-300" />
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-8">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-100">
                <span className="text-sm font-medium text-blue-700">
                  {productCategory.charAt(0).toUpperCase() + productCategory.slice(1)}
                </span>
              </div>

              {/* Product Title */}
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3 leading-tight">
                  {productName}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="ml-2 text-lg font-semibold text-gray-800">{rating}</span>
                  </div>
                  <span className="text-gray-500">({reviewCount} reviews)</span>
                </div>
              </div>

              {/* Price Section */}
              <div className="p-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-2xl border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">Price</p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        ${productPrice.toFixed(2)}
                      </span>
                    </div>
                    
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end mb-2">
                      <FiTruck className="w-5 h-5 text-green-600" />
                      <p className="text-lg font-semibold text-gray-800">Free Shipping</p>
                    </div>
                    <p className="text-sm text-gray-500">Arrives in 2-3 days</p>
                  </div>
                </div>
              </div>

              {/* Quick Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <FiPackage className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Brand</p>
                    <p className="font-semibold text-gray-800">Premium</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <FiShield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Warranty</p>
                    <p className="font-semibold text-gray-800">2 Years</p>
                  </div>
                </div>
              </div>

              {/* Purchase Button and Actions */}
              <div className="space-y-4">
                
                
                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-4 text-gray-800">
                  <button className="flex  items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-red-500 hover:bg-red-50 transition-all duration-200 font-medium shadow-sm hover:shadow-md group">
                    <FiHeart className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                    Add to Wishlist
                  </button>
                  <PurchaseButton 
                  name={productName} 
                  price={productPrice}
                  cartQuantity={1}
                />
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="px-8 pb-8">
            <div className="border-t border-gray-100 pt-8">
              <ProductTabs
                description={product.description || "No description available."}
                specs={product.specs}
              />
            </div>
          </div>
        </div>

        {/* Related Products (Real items from same category) */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">More from {productCategory}</h2>
              <Link 
                href={`/category/${productCategory}`}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
              >
                View all
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => {
                const relatedPrice = typeof relatedProduct.price === 'number' ? relatedProduct.price : 0;
                const relatedStock = relatedProduct.stock ?? 0;
                const relatedName = relatedProduct.name || "Unnamed Product";
                
                return (
                  <Link
                    key={relatedProduct.id}
                    href={`/product/${relatedProduct.id}`}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 overflow-hidden">
                      {relatedProduct.thumbnailUrl ? (
                        <Image
                          src={relatedProduct.thumbnailUrl}
                          alt={relatedName}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FiPackage className="w-12 h-12 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {relatedName}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-blue-600 font-bold text-lg">${relatedPrice.toFixed(2)}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${relatedStock > 10 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {relatedStock} in stock
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}