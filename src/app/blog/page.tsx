"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaFilter, FaFire } from "react-icons/fa";

const blogCategories = ["All", "Reviews", "Guides", "News", "Setup"];

const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Choosing the Perfect Monitor for Coding",
    excerpt: "Whether you're a dark mode fan or a multi-window power user, the right panel matters. Here is what to look for in 2026...",
    image: "/images/blog/featured.png",
    category: "Guides",
    date: "Feb 18, 2026",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: 2,
    title: "Top 5 Mechanical Keyboards for Silent Typing",
    excerpt: "Love the feel of mechanical keys but hate the noise? We've tested the quietest switches on the market.",
    image: "/images/blog/keyboards.png",
    category: "Reviews",
    date: "Feb 15, 2026",
    readTime: "5 min read",
  },
  {
    id: 3,
    title: "How to Build an Ergonomic Home Office for Under $500",
    excerpt: "You don't need a massive budget to save your back. Here are our top budget picks for 2026.",
    image: "/images/blog/setup-budget.png",
    category: "Guides",
    date: "Feb 10, 2026",
    readTime: "12 min read",
  },
  {
    id: 4,
    title: "Why OLED is Finally Overtaking IPS for Gaming Laptops",
    excerpt: "The response times and contrast ratios are changing the game. Is it time for you to upgrade?",
    image: "/images/blog/oled-tech.png",
    category: "News",
    date: "Feb 05, 2026",
    readTime: "6 min read",
  },
  {
    id: 5,
    title: "Airpods Pro 3 vs. The Universe: Are They Still King?",
    excerpt: "We put the latest noise-cancellation tech to the test in the middle of a busy subway station.",
    image: "/images/blog/airpod-review.png",
    category: "Reviews",
    date: "Feb 02, 2026",
    readTime: "7 min read",
  },
  {
    id: 6,
    title: "Minimalist MacStudio Setups That Actually Work",
    excerpt: "Clean desks, hidden cables, and the best peripherals for the Apple ecosystem.",
    image: "/images/blog/mac-setup.png",
    category: "Setup",
    date: "Feb 12, 2026",
    readTime: "9 min read",
  },
  {
    id: 7,
    title: "Lighting 101: RGB vs. Productivity Warmth",
    excerpt: "How the color of your room affects your focus and your gaming performance.",
    image: "/images/blog/lightning.png",
    category: "Setup",
    date: "Feb 08, 2026",
    readTime: "5 min read",
  },
  {
    id: 8,
    title: "ShopVerse Exclusive: First Look at Next-Gen GPUs",
    excerpt: "Leaked specs suggest a 40% performance jump in ray-tracing capabilities this winter.",
    image: "/images/blog/gpu-news.png",
    category: "News",
    date: "Jan 20, 2026",
    readTime: "4 min read",
  }
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Always find the featured post regardless of filter
  const featuredPost = blogPosts.find(post => post.featured);

  // Filter only non-featured posts for the grid
  const filteredPosts = activeCategory === "All" 
    ? blogPosts.filter(post => !post.featured) 
    : blogPosts.filter(post => post.category === activeCategory && !post.featured);

  return (
    <div className="bg-white text-slate-900 min-h-screen font-sans">
      
      {/* --- HEADER --- */}
      <header className="relative pt-20 pb-12 px-6 border-b border-slate-100 text-center ">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-slate-800 mb-4">
            SHOPVERSE <span className="text-blue-600">JOURNAL</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Expert insights, hardware reviews, and setup inspiration for the modern tech enthusiast.
          </p>
        </motion.div>
      </header>

      {/* --- PERMANENT FEATURED HERO --- */}
      {featuredPost && (
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="relative h-[500px] md:h-[600px] rounded-md overflow-hidden shadow-2xl border border-slate-100">
            <Image 
              src={featuredPost.image} 
              alt={featuredPost.title} 
              fill 
              className="object-cover" 
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-16 text-white max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-blue-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Hot Topic
                </span>
                <span className="text-blue-200 text-sm flex items-center gap-1">
                  <FaFire /> Trending in {featuredPost.category}
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1]">
                {featuredPost.title}
              </h2>
              <div className="flex flex-wrap items-center gap-6 text-slate-300 font-medium">
                <span className="flex items-center gap-2"><FaCalendarAlt /> {featuredPost.date}</span>
                <span className="flex items-center gap-2"><FaClock /> {featuredPost.readTime}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --- FILTER BAR --- */}
<nav className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          
          {/* Filter Section */}
          <div className="relative flex-1 flex items-center gap-3 overflow-hidden">
            <FaFilter className="text-blue-600 shrink-0 hidden sm:block" />
            
            {/* Scrollable Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full pb-1 -mb-1">
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
                    activeCategory === cat 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                      : "text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Subtle Gradient Mask for Mobile Scroll hint */}
            <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white/90 to-transparent pointer-events-none md:hidden" />
          </div>

          {/* Article Count */}
          <div className="hidden md:block text-slate-400 text-sm font-medium italic whitespace-nowrap shrink-0">
            {filteredPosts.length} tech articles
          </div>
        </div>
      </nav>

      {/* --- BLOG GRID --- */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.div 
          layout 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {filteredPosts.map((post) => (
            <motion.div 
              layout
              key={post.id} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full bg-white rounded-md overflow-hidden border border-slate-100 shadow-sm"
            >
              <div className="relative h-64 w-full bg-slate-100">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover" 
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 px-3 py-1 rounded-lg text-[10px] font-black text-white uppercase tracking-tighter">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-4">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>
                
                <div className="pt-6 border-t border-slate-50 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>{post.date}</span>
                  <span className="text-blue-600">{post.readTime}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty state helper */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">No articles found in "{activeCategory}" yet.</p>
          </div>
        )}
      </section>

      {/* --- TAG CLOUD --- */}
      <footer className="py-16 text-center border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-8">Popular Gear Tags</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Workstation", "MechanicalKeyboards", "4K-Resolution", "Apple-Ecosystem", "Gaming-Laptops", "Cable-Management", "Smart-Home", "Battery-Tech", "Audio-HiFi"].map(tag => (
              <span 
                key={tag} 
                className="px-4 py-2 rounded-lg bg-slate-50 border border-slate-100 text-xs font-bold text-slate-500"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}