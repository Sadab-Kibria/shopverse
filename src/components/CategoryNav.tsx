"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type CategoryNavProps = {
  categories: { category: string }[];
};

export default function CategoryNav({ categories = [] }: CategoryNavProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap gap-1 sm:gap-3 mb-6 justify-center py-4">
      {categories.map((cat) => {
        const categoryPath = `/category/${encodeURIComponent(cat.category)}`;
        const isActive = pathname === categoryPath;

        return (
          <Link
            key={cat.category}
            href={categoryPath}
            className={`text-xs sm:text-sm px-3 sm:px-6 py-2 font-semibold transition-all duration-300 ease-in-out
              ${
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }
            `}
          >
            {cat.category}
          </Link>
        );
      })}
    </div>
  );
}