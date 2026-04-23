"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiFilter, FiRefreshCw, FiChevronUp, FiChevronDown, FiDollarSign, FiTrendingUp, FiTrendingDown, FiShoppingBag, FiPackage } from "react-icons/fi";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  thumbnailUrl?: string | null;
};

type Props = {
  products: Product[];
  categorySlug: string;
};

export default function ProductsGrid({ products, categorySlug }: Props) {
  const [sort, setSort] = useState("price_asc");
  const [range, setRange] = useState<[number, number]>([0, 1000]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Determine min and max from products
  const prices = products.map((p) => p.price);
  const minPrice = Math.floor(Math.min(...prices));
  const maxPrice = Math.ceil(Math.max(...prices));

  useEffect(() => {
    setRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const handleRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = Number(e.target.value);
    let newRange: [number, number] = [...range] as [number, number];
    newRange[index] = value;
    if (index === 0 && value > newRange[1]) newRange[0] = newRange[1];
    if (index === 1 && value < newRange[0]) newRange[1] = newRange[0];
    setRange(newRange);
  };

  // Apply filtering and sorting
  const filteredSortedProducts = products
    .filter((p) => p.price >= range[0] && p.price <= range[1])
    .sort((a, b) => {
      switch (sort) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "name_asc":
          return a.name.localeCompare(b.name);
        case "name_desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 hover:border-blue-200 transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiFilter className="w-5 h-5 text-blue-600" />
            </div>
            <span className="font-semibold text-gray-800">Filters & Sort</span>
          </div>
          {isFiltersOpen ? (
            <FiChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <FiChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>

      {/* Sidebar - Desktop & Mobile when open */}
      <aside className={`
        ${isFiltersOpen ? 'block' : 'hidden lg:block'}
        lg:w-80 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white/20
        flex-shrink-0 h-fit lg:sticky lg:top-24
      `}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
              <FiFilter className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          </div>
          <button
            onClick={() => {
              setSort("price_asc");
              setRange([minPrice, maxPrice]);
            }}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 hover:bg-blue-50 rounded-xl"
          >
            <FiRefreshCw className="w-4 h-4" />
            Reset
          </button>
        </div>

        {/* Sort Section */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider">Sort By</h3>
          <div className="space-y-2">
            {[
              { id: "price_asc", label: "Price: Low to High", icon: <FiTrendingUp className="w-4 h-4" /> },
              { id: "price_desc", label: "Price: High to Low", icon: <FiTrendingDown className="w-4 h-4" /> },
              { id: "name_asc", label: "Name: A to Z", icon: <span className="text-sm font-bold">A-Z</span> },
              { id: "name_desc", label: "Name: Z to A", icon: <span className="text-sm font-bold">Z-A</span> }
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSort(s.id)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                  sort === s.id
                    ? "border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm"
                    : "border-gray-100 bg-white hover:border-blue-200 hover:bg-blue-50/50 text-gray-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${sort === s.id ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    {s.icon}
                  </div>
                  <span className="font-medium">{s.label}</span>
                </div>
                {sort === s.id && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Price Range</h3>
            <div className="flex items-center gap-2">
              <FiDollarSign className="w-4 h-4 text-gray-500" />
              <span className="font-bold text-blue-600">
                ${range[0].toFixed(0)} - ${range[1].toFixed(0)}
              </span>
            </div>
          </div>
          
          {/* Price Inputs */}
          <div className="flex gap-3 mb-6 text-gray-700">
            <div className="flex-1">
              <label className="block text-xs  mb-2">Min Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  value={range[0]}
                  min={minPrice}
                  max={range[1]}
                  onChange={(e) => handleRangeChange(e, 0)}
                  className="w-full pl-8 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 transition-all duration-200 outline-none"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-xs  mb-2">Max Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  value={range[1]}
                  min={range[0]}
                  max={maxPrice}
                  onChange={(e) => handleRangeChange(e, 1)}
                  className="w-full pl-8 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 transition-all duration-200 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Range Sliders */}
          <div className="space-y-4">
            <div className="relative pt-4">
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={range[0]}
                onChange={(e) => handleRangeChange(e, 0)}
                className="w-full h-2 bg-gradient-to-r from-blue-200 via-blue-400 to-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
              />
            </div>
            <div className="relative pt-4">
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={range[1]}
                onChange={(e) => handleRangeChange(e, 1)}
                className="w-full h-2 bg-gradient-to-r from-gray-300 via-blue-400 to-blue-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-2xl border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Showing</p>
              <p className="text-xl font-bold text-gray-900">{filteredSortedProducts.length} products</p>
            </div>
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <FiPackage className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </aside>

      {/* Products Grid */}
      <div className="flex-1">
        {/* Products Count Header */}
{/*         <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Products</h1>
              <p className="text-gray-600">
                Found <span className="font-semibold text-blue-600">{filteredSortedProducts.length}</span> items
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500">
              <span>Price range:</span>
              <span className="font-bold text-blue-600">
                ${range[0].toFixed(0)} - ${range[1].toFixed(0)}
              </span>
            </div>
          </div>
        </div> */}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSortedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
            >
              {/* Product Image */}
              <div className="relative w-full h-48 mb-6 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                {product.thumbnailUrl ? (
                  <Image
                    src={product.thumbnailUrl}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FiPackage className="w-16 h-16 text-gray-300" />
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col">
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2.5 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                      <FiShoppingBag className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* View Details Badge */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center gap-2 text-blue-600 font-medium text-sm">
                  <span>View Details</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredSortedProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
              <FiPackage className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">No products found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              Try adjusting your filters or price range to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSort("price_asc");
                setRange([minPrice, maxPrice]);
              }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3.5 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium"
            >
              <FiRefreshCw className="w-5 h-5" />
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}