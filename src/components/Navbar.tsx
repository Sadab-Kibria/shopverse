"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import NavCartButton from "./NavCartButton";
import NavChatWidget from "./NavChatWidget";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
};

const categories = [
  "Mobiles",
  "Mouse",
  "Airpods",
  "Headphones",
  "Laptops",
  "Keyboards",
  "Watches",
  "Monitors",
  "Speakers",
  "Tablets",
  "Cameras",
  "Chargers",
];

function debounce<F extends (...args: any[]) => void>(func: F, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const firstCol = categories.slice(0, 6);
  const secondCol = categories.slice(6, 12);

  useEffect(() => {
    if (isSearchVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchVisible]);

  const fetchRef = useRef(
    debounce(async (query: string) => {
      if (!query) return setFilteredProducts([]);
      try {
        const res = await fetch(`/api/search-products?q=${query}`);
        const data = await res.json();
        setFilteredProducts(data);
      } catch (err) {
        console.error(err);
      }
    }, 300),
  );

  useEffect(() => {
    fetchRef.current(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isLoggedIn = status === "authenticated";
  const isAdmin = session?.user?.role === "admin";

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 w-full font-sans">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left: Logo and Shop Link */}
          <div className="flex items-center gap-10">
            <Link href="/" className="mr-10">
              <Image
                src={"/images/logo.png"}
                alt=""
                height={40}
                width={40}
              ></Image>
            </Link>

            <div
              className="hidden md:flex items-center h-20 relative"
              onMouseEnter={() => setIsShopOpen(true)}
              onMouseLeave={() => setIsShopOpen(false)}
            >
              <h1 className="text-gray-900 text-sm border-b-2 border-white hover:text-blue-600 cursor-pointer hover:border-b-2 hover:border-blue-600 transition-colors">
                SHOP
              </h1>
            </div>
            <Link href={"/blog"} className="hidden md:flex text-gray-900 text-sm border-b-2 border-white hover:text-blue-600 cursor-pointer hover:border-b-2 hover:border-blue-600 transition-colors">
              BLOG
            </Link>
            <Link href={"/contact"} className="hidden md:flex text-gray-900 text-sm border-b-2 border-white hover:text-blue-600 cursor-pointer hover:border-b-2 hover:border-blue-600 transition-colors">
              CONTACT
            </Link>
            
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={() => setIsSearchVisible(true)}
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${isSearchVisible ? "hidden" : "block"}`}
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <NavCartButton />
            <NavChatWidget />

            {/* Desktop Profile Dropdown */}
            <div className="hidden md:block">
              {isLoggedIn ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="p-1 rounded-full border-2 border-transparent hover:border-blue-200 transition-all"
                  >
                    <Image
                      src={session.user?.image || "/images/admin.png"}
                      alt="profile"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </button>
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-xl shadow-xl p-2">
                      <p className="px-4 py-2 text-sm font-bold text-gray-900 truncate">
                        {session.user?.name}
                      </p>
                      <hr className="my-1 border-gray-100" />
                      <Link
                        href={isAdmin ? "/admin" : "/profile"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU SLIDE DOWN --- */}
      <div
        className={`md:hidden bg-white border-b border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 pt-2 pb-6 space-y-4">
          {/* User Section Mobile */}
          <div className="py-4 border-b border-gray-50">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Image
                  src={session.user?.image || "/images/admin.png"}
                  alt="profile"
                  width={45}
                  height={45}
                  className="rounded-full border-2 border-blue-100"
                />
                <div className="flex-1">
                  <p className="text-gray-900 font-bold">
                    {session.user?.name}
                  </p>
                  <Link
                    href={isAdmin ? "/admin" : "/profile"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-blue-600 text-sm"
                  >
                    View Dashboard
                  </Link>
                </div>
                <button
                  onClick={() => signOut()}
                  className="text-red-500 text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mx-auto block w-1/3 text-center bg-blue-600 text-white py-3 rounded-xl font-bold"
              >
                Login
              </Link>
            )}
          </div>

          {/* Categories Mobile */}
          <div>
            <p className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-3">
              Categories
            </p>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/category/${cat.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-gray-50 px-4 py-3 text-gray-800 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- DESKTOP MEGA MENU --- */}
      <div
        className={`absolute hidden md:block left-0 w-full bg-white text-gray-800 transition-all duration-300 ease-in-out shadow-2xl overflow-hidden z-40 ${
          isShopOpen ? "max-h-[500px]" : "max-h-0"
        }`}
        onMouseEnter={() => setIsShopOpen(true)}
        onMouseLeave={() => setIsShopOpen(false)}
      >
        <div className="mx-auto max-w-7xl px-8 py-10">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="flex flex-col gap-4">
              <h3 className="text-gray-800 text-sm font-bold uppercase tracking-widest mb-2">
                Categories
              </h3>
              {firstCol.map((cat) => (
                <Link
                  key={cat}
                  href={`/category/${cat.toLowerCase()}`}
                  className="text-lg text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setIsShopOpen(false)}
                >
                  {cat}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-2 select-none">
                .
              </h3>
              {secondCol.map((cat) => (
                <Link
                  key={cat}
                  href={`/category/${cat.toLowerCase()}`}
                  className="text-lg text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setIsShopOpen(false)}
                >
                  {cat}
                </Link>
              ))}
            </div>
            <Link
              href="/"
              className="relative group overflow-hidden rounded-lg aspect-square bg-gray-800"
            >
              <Image
                src="/images/nav1.jpg"
                alt="New arrivals"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-80"
              />
              <div className="absolute inset-0  flex items-center justify-center">
                <span className="text-md rounded-sm font-semibold text-white bg-blue-600 border-blue px-4 py-2 uppercase">
                  ShopVerse
                </span>
              </div>
            </Link>
            <Link
              href="/"
              className="relative group overflow-hidden rounded-xl aspect-square bg-gray-800"
            >
              <Image
                src="/images/nav2.png"
                alt="Top deals"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-80"
              />
              <div className="absolute inset-0  flex items-center justify-center">
                <span className="text-md font-bold rounded-sm bg-white text-blue-600  px-4 py-2 uppercase">
                  Find all you need
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* --- SEARCH SLIDE DOWN --- */}
      <div
        className={`absolute top-0 left-0 w-full bg-white border-b border-gray-200 shadow-2xl transition-all duration-300 ease-in-out transform z-[60] ${isSearchVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}`}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-center gap-4 max-w-5xl">
          <div className="relative flex-1">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-900"
            />
            {filteredProducts.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 max-h-80 overflow-y-auto">
                {filteredProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b last:border-0"
                    onClick={() => {
                      setSearchTerm("");
                      setIsSearchVisible(false);
                    }}
                  >
                    <span className="font-medium text-gray-800">{p.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => {
              setIsSearchVisible(false);
              setSearchTerm("");
            }}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
