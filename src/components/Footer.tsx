"use client"

import Link from "next/link"

const categories = [
  { id: 1, name: "Mobiles" },
  { id: 2, name: "Airpods" },
  { id: 3, name: "Laptops" },
  { id: 4, name: "Watches" },
  { id: 5, name: "Speakers" },
  { id: 6, name: "Cameras" },
  { id: 7, name: "Mouse" },
  { id: 8, name: "Headphones" },
  { id: 9, name: "Keyboards" },
  { id: 10, name: "Monitors" },
  { id: 11, name: "Tablets" },
  { id: 12, name: "Chargers" },
]

const Footer = () => {
  const categoryGroups = [
    categories.slice(0, 3),
    categories.slice(3, 6),
    categories.slice(6, 9),
    categories.slice(9, 12),
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 lg:gap-24">
          
          {/* Column 1 (Left) - Brand Centered X and Y */}
          <div className="flex flex-col items-center justify-center text-center space-y-4 pb-8 lg:pb-0 lg:pr-4">
            <div>
              <h1 className="text-4xl lg:text-5xl text-white tracking-tighter">
                ShopVerse
              </h1>
              <p className="text-sm text-gray-500 font-light mt-2 max-w-[200px]">
                Elevating your digital lifestyle through curated tech.
              </p>
            </div>
          </div>

          {/* Column 2 - Future Pages */}
          <div className="space-y-6 flex flex-col justify-center">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Need Help?
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Our Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/partner" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Categories Group 1 */}
          <div className="space-y-6 flex flex-col justify-center">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Categories
            </h3>
            <ul className="space-y-3">
              {[...categoryGroups[0], ...categoryGroups[1]].map((category) => (
                <li key={category.id}>
                  <Link 
                    href={`/category/${category.name.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Categories Group 2 */}
          <div className="space-y-6 flex flex-col justify-center">
            <h3 className="text-lg font-bold text-white tracking-tight invisible lg:visible">
              More
            </h3>
            <ul className="space-y-3">
              {[...categoryGroups[2], ...categoryGroups[3]].map((category) => (
                <li key={category.id}>
                  <Link 
                    href={`/category/${category.name.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-gray-800 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="hidden md:block w-32"></div>

            <p className="text-gray-500 text-xs tracking-widest uppercase text-center">
              &copy; {new Date().getFullYear()} ShopVerse. All rights reserved.
            </p>

            <div className="text-xs text-gray-600 font-medium tracking-wide">
              Created with 💙 by{" "}
              <Link 
                href="https://github.com/Sadab-Kibria" 
                target="_blank"
                className="text-blue-600 hover:text-blue-400 transition-colors font-bold"
              >
                Sadab
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer