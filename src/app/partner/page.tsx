import React from 'react';
import { 
  FiGlobe, 
  FiTrendingUp, 
  FiZap, 
  FiArrowRight, 
  FiCheckCircle,
  FiMessageCircle,
} from 'react-icons/fi';
import { FaHandshake } from 'react-icons/fa'; 
import Link from 'next/link';

const PartnersPage = () => {
  const benefits = [
    {
      title: "Global Reach",
      desc: "Access our customer base of over 500k active monthly shoppers across 40+ countries.",
      icon: <FiGlobe className="w-6 h-6 text-white" />
    },
    {
      title: "Revenue Growth",
      desc: "Partners see an average of 25% increase in annual revenue within the first year.",
      icon: <FiTrendingUp className="w-6 h-6 text-white" />
    },
    {
      title: "Co-Marketing",
      desc: "Benefit from features in our newsletters, social media, and homepage spotlights.",
      icon: <FiZap className="w-6 h-6 text-white" />
    }
  ];

  const partners = [
    { name: "Logistics Pro", logo: "LP", color: "bg-blue-600 text-white" },
    { name: "EcoPack Co", logo: "EC", color: "bg-blue-600 text-white" },
    { name: "PayShield", logo: "PS", color: "bg-blue-600 text-white" },
    { name: "CloudScale", logo: "CS", color: "bg-blue-600 text-white" },
    { name: "Velox Express", logo: "VE", color: "bg-blue-600 text-white" },
    { name: "MarketFlow", logo: "MF", color: "bg-blue-600 text-white" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-28 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black tracking-widest mb-8">
            <FaHandshake className="w-4 h-4" /> PARTNERSHIPS
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
            Scale <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Together.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Join the fastest-growing e-commerce ecosystem. We provide the infrastructure; you bring the innovation.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-all shadow-xl shadow-blue-600/20 hover:-translate-y-1">
            Get in Touch <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12  transition-all">
             {partners.map((p, i) => (
                <div key={i} className="flex items-center justify-center gap-2  transition-all ">
                   <div className={`w-8 h-8 rounded-lg ${p.color} flex items-center justify-center font-black text-xs`}>{p.logo}</div>
                   <span className="font-bold text-slate-700 tracking-tight">{p.name}</span>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Benefits Card Grid */}
      <section className="py-32 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Why Partner with Us?</h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">We’ve designed our program to be mutually profitable from day one with dedicated support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <div key={i} className="group bg-white p-12 rounded-lg border border-slate-200/60 shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">{benefit.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm font-medium">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section (Replaced Form) */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="bg-slate-900 rounded-2xl p-12 md:p-20 relative overflow-hidden shadow-2xl shadow-blue-900/20">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] -ml-32 -mb-32" />

            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-10 backdrop-blur-md border border-white/10">
                <FiMessageCircle className="w-10 h-10 text-blue-400" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Ready to collaborate?</h2>
              <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                Our partnership team is always looking for innovative companies to join our journey. 
                Drop us a line and let’s discuss how we can grow together.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link 
                  href="/contact" 
                  className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 rounded-lg font-black transition-all hover:bg-blue-50 hover:scale-105 active:scale-95 shadow-xl"
                >
                  Contact Partnership Team
                </Link>
                <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
                   <FiCheckCircle className="text-blue-500" /> Response in &lt; 24h
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Secondary Links */}
      <section className="py-20 border-t border-slate-100 text-center">
        <div className="flex items-center justify-center gap-8 text-sm font-bold text-slate-400">
           <Link href="/docs" className="hover:text-blue-600 transition-colors">Partner API</Link>
           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
           <Link href="/privacy" className="hover:text-blue-600 transition-colors">Partner Privacy</Link>
           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
           <Link href="/media-kit" className="hover:text-blue-600 transition-colors">Media Kit</Link>
        </div>
      </section>
    </div>
  );
};

export default PartnersPage;