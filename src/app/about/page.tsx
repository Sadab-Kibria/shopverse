"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaShieldAlt,
  FaShippingFast,
  FaMicrochip,
  FaHeadset,
  FaChevronDown,
} from "react-icons/fa";
import Image from "next/image";
const categories = [
  {
    id: 1,
    name: "Mobiles",
    href: "/category/mobiles",
    image: "/images/cat/mobiles.png",
  },
  {
    id: 2,
    name: "Airpods",
    href: "/category/airpods",
    image: "/images/cat/airpods.png",
  },
  {
    id: 3,
    name: "Laptops",
    href: "/category/laptops",
    image: "/images/cat/laptops.png",
  },
  {
    id: 4,
    name: "Watches",
    href: "/category/watches",
    image: "/images/cat/watches.png",
  },
  {
    id: 5,
    name: "Speakers",
    href: "/category/speakers",
    image: "/images/cat/speakers.png",
  },
  {
    id: 6,
    name: "Cameras",
    href: "/category/cameras",
    image: "/images/cat/cameras.png",
  },
  {
    id: 7,
    name: "Mouse",
    href: "/category/mouse",
    image: "/images/cat/mouses.png",
  },
  {
    id: 8,
    name: "Headphones",
    href: "/category/headphones",
    image: "/images/cat/headphones.png",
  },
  {
    id: 9,
    name: "Keyboards",
    href: "/category/keyboards",
    image: "/images/cat/keyboards.png",
  },
  {
    id: 10,
    name: "Monitors",
    href: "/category/monitors",
    image: "/images/cat/monitors.png",
  },
  {
    id: 11,
    name: "Tablets",
    href: "/category/tablets",
    image: "/images/cat/tablets.png",
  },
  {
    id: 12,
    name: "Chargers",
    href: "/category/chargers",
    image: "/images/cat/chargers.png",
  },
];

const faqs = [
  {
    question: "Are all products at ShopVerse genuine?",
    answer:
      "Absolutely. We partner directly with authorized distributors and brands to ensure every item in our 'Verse' is 100% authentic and comes with a full manufacturer warranty.",
  },
  {
    question: "How long does shipping typically take?",
    answer:
      "Standard shipping usually takes 3-5 business days. We also offer express 'Warp Speed' shipping for most electronics, which can arrive as early as the next day.",
  },
  {
    question: "What is your return policy for electronics?",
    answer:
      "We offer a 14-day hassle-free return policy for unopened items. If a product is defective, we provide an immediate replacement or full refund under our quality guarantee.",
  },
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Double the array for the infinite sliding effect
  const duplicatedCategories = [...categories, ...categories];

  return (
    <div className="bg-white text-slate-900 min-h-screen font-sans overflow-x-hidden">
      {/* --- SECTION 1: CATEGORY GRID SECTION --- */}
      <section className="bg-slate-50 py-20" id="category_nav">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight text-center">
              Expertly Curated Collections
            </h2>
            <div className="h-1.5 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                href={cat.href}
                key={cat.id}
                className="bg-white border border-slate-200 p-6 rounded-xl text-center hover:border-blue-600 hover:shadow-md hover:-translate-y-1 transition-all group block"
              >
                <p className="font-semibold text-slate-700 group-hover:text-blue-600 uppercase text-xs tracking-wider">
                  {cat.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* --- SECTION 2: CATEGORY SHOWCASE (SLIDING IMAGES) --- */}
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT COLUMN: STATIC TEXT */}
            <div className="space-y-6">
              <h2 className="text-blue-600 font-black uppercase tracking-widest text-sm">
                Explore the Verse
              </h2>
              <h3 className="text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
                The Gear You Need, <br />
                <span className="text-blue-600">All in One Place.</span>
              </h3>
              <p className="text-slate-500 text-lg max-w-md font-medium">
                From high-performance laptops to studio-grade audio, browse our
                curated vault of world-class technology.
              </p>
            </div>

            {/* RIGHT COLUMN: SLIDING IMAGES */}
            <div className="relative h-[500px] overflow-hidden rounded-[3rem] bg-slate-50 border border-slate-100">
              <motion.div
                className="flex flex-col gap-6 p-6"
                animate={{
                  y: [0, -2500], // Adjusted based on card height + gap
                }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {duplicatedCategories.map((cat, index) => (
                  <Link
                    href={cat.href}
                    key={`${cat.id}-${index}`}
                    className="relative group min-h-[250px] w-full bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 transition-all hover:shadow-xl hover:border-blue-200 block"
                  >
                    <div className="absolute inset-0 bg-slate-200">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10" />
                    </div>

                    <div className="absolute bottom-8 left-8 text-left">
                      <p className="text-white text-3xl font-black tracking-tight">
                        {cat.name}
                      </p>
                      <span className="text-blue-600 font-bold text-sm uppercase tracking-widest">
                        Browse Collection →
                      </span>
                    </div>
                  </Link>
                ))}
              </motion.div>

              {/* FADE OVERLAYS */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-slate-50 via-transparent to-transparent pointer-events-none z-10" />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 via-transparent to-transparent pointer-events-none z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: CORE VALUES (Icons) --- */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              icon: <FaShieldAlt />,
              title: "Secure Shopping",
              desc: "Verified payments & data protection.",
            },
            {
              icon: <FaShippingFast />,
              title: "Global Shipping",
              desc: "Fast delivery to your doorstep.",
            },
            {
              icon: <FaMicrochip />,
              title: "Latest Tech",
              desc: "Direct access to newest releases.",
            },
            {
              icon: <FaHeadset />,
              title: "24/7 Support",
              desc: "Expert help whenever you need it.",
            },
          ].map((item, idx) => (
            <div key={idx} className="text-center space-y-4">
              <div className="text-4xl text-blue-600 flex justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="text-slate-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- SECTION 4: IMPACT & PHILOSOPHY --- */}
      <section className="max-w-7xl mx-auto px-6 py-32 border-t border-slate-100">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24 w-full">
            {[
              { label: "Products", value: "7k+", sub: "Curated Items" },
              { label: "Users", value: "3k+", sub: "Global Community" },
              { label: "Reliability", value: "99.9%", sub: "Service Up-time" },
              { label: "Reach", value: "24", sub: "Countries" },
            ].map((stat, idx) => (
              <motion.div key={idx}>
                <h4 className="text-4xl font-black text-slate-900 tracking-tighter">
                  {stat.value}
                </h4>
                <p className="text-blue-600 font-bold uppercase text-[10px] tracking-[0.2em]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Centered Quote Block */}
          <div>
            {/* Decorative Quote Mark */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-3xl md:text-5xl text-slate-700 font-serif select-none">
              &ldquo;
            </span>

            <blockquote className="relative z-10">
              <p className="text-xl md:text-2xl font-medium text-slate-600 italic leading-relaxed">
                Technology is the canvas, and your choice of gear is the brush.
                In the ShopVerse, we don&apos;t just sell electronics; we
                provide the tools to build your future.
              </p>
              <footer className="mt-6">
                <div className="h-px w-12 bg-blue-600 mx-auto mb-4" />
                <cite className="text-sm font-black text-slate-800 uppercase tracking-widest not-italic">
                  The ShopVerse Vision
                </cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
}
