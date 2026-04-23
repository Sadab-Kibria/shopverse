"use client";

import { useState } from "react";
import {
  FaHeadset,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
import Image from "next/image";

const contactMethods = [
  {
    icon: <FaHeadset className="text-blue-600 w-6 h-6" />,
    title: "Customer Support",
    description: "Our tech experts are available Mon-Fri, 9am - 6pm.",
    contact: "+1 (555) 000-TECH",
  },
  {
    icon: <FaEnvelope className="text-blue-600 w-6 h-6" />,
    title: "Email Us",
    description: "For order inquiries or hardware technical support.",
    contact: "support@shopverse.com",
  },
  {
    icon: <FaMapMarkerAlt className="text-blue-600 w-6 h-6" />,
    title: "Main Headquarters",
    description: "Visit our showroom and experience the gear.",
    contact: "123 Tech Plaza, Silicon Valley, CA",
  },
];

export default function ContactPage() {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for sending message would go here
    setShowPopup(true);

    // Auto-hide popup after 5 seconds
    setTimeout(() => setShowPopup(false), 5000);
  };

  return (
    <div className="bg-white text-slate-900 min-h-screen font-sans relative">
      {/* --- POPUP NOTIFICATION --- */}
      {showPopup && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md">
          <div className="bg-white/80 text-gray-700 p-5 rounded-2xl shadow-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <FaCheckCircle className="text-green-400 w-6 h-6" />
              <div>
                <p className="font-bold text-sm">Message Sent!</p>
                <p className="text-slate-400 text-xs">
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="p-2 hover:text-white hover:bg-blue-600 rounded-full transition-colors"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      {/* --- HEADER --- */}
      <header className="relative pt-24 pb-16 px-6 text-center border-b border-slate-100">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-gray-800 mb-4">
            GET IN <span className="text-blue-600 uppercase">Touch</span>
          </h1>
          <p className="text-slate-700 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Have a question about a setup or an order? Our team of specialists
            is here to help.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* --- LEFT: CONTACT INFO --- */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6 text-slate-900">
                Contact Information
              </h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Choose your preferred way to reach us. Our technical team is
                standing by.
              </p>
            </div>

            <div className="space-y-8">
              {contactMethods.map((method, index) => (
                <div key={index} className="flex gap-6 items-start group">
                  <div className="p-4 bg-blue-50 rounded-2xl text-blue-600">
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">
                      {method.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-1">
                      {method.description}
                    </p>
                    <p className="text-blue-600 font-bold">{method.contact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT: CONTACT FORM --- */}
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-blue-100/50">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Subject
                </label>
                <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all appearance-none cursor-pointer">
                  <option>Order Inquiry</option>
                  <option>Technical Support</option>
                  <option>Business/Bulk Pricing</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Your Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us what you need..."
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-xl shadow-blue-200 hover:bg-slate-900 hover:shadow-none transition-all duration-300 uppercase tracking-widest text-sm"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* --- MAP PLACEHOLDER --- */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="relative h-64 w-full rounded-[2.5rem] border border-slate-200 flex flex-col items-center justify-center overflow-hidden">
          {/* Background Image */}
          <Image
            src="/images/contact/map.png" // Replace with your image path
            alt="Showroom Background"
            fill
            className="object-cover"
            priority
          />

          {/* Overlay to ensure text remains readable */}
          <div className="absolute inset-0 bg-white/20" />

          {/* Existing Content */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <FaMapMarkerAlt className="text-slate-600 w-8 h-8 mb-2" />
            <p className="text-slate-900 text-xs font-bold uppercase tracking-widest">
              Showroom Location: Silicon Valley, CA
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
