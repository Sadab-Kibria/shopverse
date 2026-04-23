"use client";

import { useRouter } from "next/navigation";

const categories = [
  { id: 1, name: "Mobiles", img: "/images/categories/mobile.png" },
  { id: 2, name: "Airpods", img: "/images/categories/airpod.png" },
  { id: 3, name: "Laptops", img: "/images/categories/laptop.png" },
  { id: 4, name: "Watches", img: "/images/categories/watch.png" },
  { id: 5, name: "Speakers", img: "/images/categories/speaker.png" },
  { id: 6, name: "Cameras", img: "/images/categories/camera.png" },
  { id: 7, name: "Mouse", img: "/images/categories/mouse.png" },
  { id: 8, name: "Headphones", img: "/images/categories/headphone.png" },
  { id: 9, name: "Keyboards", img: "/images/categories/keyboard.png" },
  { id: 10, name: "Monitors", img: "/images/categories/monitor.png" },
  { id: 11, name: "Tablets", img: "/images/categories/tablet.png" },
  { id: 12, name: "Chargers", img: "/images/categories/charger.png" },
];

const CategoryPreview = () => {
  const router = useRouter();

  const goToCategory = (categoryName: string) => {
    router.push(`/category/${categoryName}`);
  };

 return (
  <div className="w-full bg-gray-100 py-4">
    <div className="px-4">
      <div className="
        flex flex-wrap justify-center gap-4  mx-auto
      ">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center text-center cursor-pointer"
            onClick={() => goToCategory(category.name)}
          >
            <img
              src={category.img}
              alt={category.name}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-full 
              border border-gray-300 shadow-sm hover:scale-105 transition-transform duration-300"
            />
            <p className="mt-1 text-xs sm:text-sm font-bold text-gray-700 truncate w-full">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);
;
};

export default CategoryPreview;
