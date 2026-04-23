import Link from "next/link";
import {
  Smartphone,
  Headphones,
  Laptop,
  Watch,
  Tablet,
  Keyboard,
  Mouse,
  Camera,
  Monitor,
  BatteryCharging,
  Speaker,
  Headset,
} from "lucide-react";

const categories = [
  { name: "Mobiles", slug: "mobiles", icon: Smartphone },
  { name: "Airpods", slug: "airpods", icon: Headphones },
  { name: "Laptops", slug: "laptops", icon: Laptop },
  { name: "Watches", slug: "watches", icon: Watch },
  { name: "Speakers", slug: "speakers", icon: Speaker },
  { name: "Cameras", slug: "cameras", icon: Camera },
  { name: "Mouse", slug: "mouse", icon: Mouse },
  { name: "Headphones", slug: "headphones", icon: Headset },
  { name: "Keyboards", slug: "keyboards", icon: Keyboard },
  { name: "Monitors", slug: "monitors", icon: Monitor },
  { name: "Tablets", slug: "tablets", icon: Tablet },
  { name: "Chargers", slug: "chargers", icon: BatteryCharging },
];

export default function FeaturedCategories() {
  return (
    <section className="py-10 bg-gray-100">
      <h2 className="text-2xl font-bold mb-2 text-center text-black">Featured Categories</h2>
      <h2 className="text-md font-extralight text-black text-center mb-8">Get Your Desired Product from Featured Category!</h2>

      {/* Flex container, wrap to new line */}
      <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="flex flex-col items-center justify-center w-35 h-35 bg-white shadow-md rounded-lg hover:shadow-lg hover:scale-105 transition"
            >
              <Icon className="text-gray-800 mb-1" size={42} />
              <span className="text-xs font-medium text-center text-black">{cat.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
