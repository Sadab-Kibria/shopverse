"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  FiPackage,
  FiTrendingUp,
  FiShoppingBag,
  FiPlusCircle,
  FiLogOut,
  FiGrid,
  FiBarChart2,
  FiUsers,
  FiSettings,
  FiActivity,
  FiArrowRight,
} from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Product = {
  id: number;
  name: string;
  category: string;
  stock: number;
  price?: number;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/admin/get-all-products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut({ redirect: false });
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
        <AiOutlineLoading3Quarters className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-500 font-medium tracking-tight">Accessing Secure Vault...</p>
      </div>
    );
  }

  // Stats Logic
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalProducts = products.length;
  const averagePrice = products.length > 0
      ? products.reduce((sum, p) => sum + (p.price || 0), 0) / products.length
      : 0;
  const lowStockProducts = products.filter((p) => p.stock < 10).length;

  const categoryData = Object.values(
    products.reduce((acc: any, p) => {
      if (!acc[p.category]) acc[p.category] = { name: p.category, value: 0 };
      acc[p.category].value += p.stock;
      return acc;
    }, {}),
  );

  const productStockData = products.slice(0, 8).map((p) => ({
    name: p.name.length > 12 ? p.name.substring(0, 12) + "..." : p.name,
    stock: p.stock,
  }));

  const COLORS = ["#3b82f6", "#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans pb-20">
      
      {/* HEADER SECTION - Matching User Profile */}
      <header className="bg-slate-900 text-white pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
              <div className="p-5 bg-blue-600 rounded-[2rem] shadow-2xl shadow-blue-500/20">
                <FiGrid className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight">Admin Terminal</h1>
                <div className="flex gap-3 mt-2">
                  <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest text-slate-300">
                    <FiActivity className="text-emerald-400" /> System Live
                  </span>
                  <span className="flex items-center gap-2 bg-indigo-500 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                    <FiUsers /> Root Access
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isLoggingOut ? <AiOutlineLoading3Quarters className="animate-spin" /> : <FiLogOut />} 
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 -mt-12">
        
        {/* STATS CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Inventory", value: totalProducts, sub: "Unique Items", icon: <FiPackage />, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Volume", value: totalStock, sub: "Total Units", icon: <FiTrendingUp />, color: "text-indigo-600", bg: "bg-indigo-50" },
            { label: "Valuation", value: `$${averagePrice.toFixed(2)}`, sub: "Avg per Unit", icon: <FiShoppingBag />, color: "text-purple-600", bg: "bg-purple-50" },
            { label: "Critical", value: lowStockProducts, sub: "Low Stock Alert", icon: <FiActivity />, color: "text-red-600", bg: "bg-red-50" },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 ${stat.bg} ${stat.color} rounded-2xl transition-transform group-hover:scale-110`}>
                  {stat.icon}
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Metrics</span>
              </div>
              <h3 className="text-3xl font-black text-slate-800 mb-1">{stat.value}</h3>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">{stat.label} • {stat.sub}</p>
            </div>
          ))}
        </div>

        {/* CHARTS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-10">
          {/* Pie Chart - 2 Columns */}
          <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black flex items-center gap-2">
                <FiBarChart2 className="text-blue-600" /> Category Distribution
              </h2>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart - 3 Columns */}
          <div className="lg:col-span-3 bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
            <h2 className="text-xl font-black mb-8 flex items-center gap-2">
              <FiTrendingUp className="text-indigo-600" /> Stock Velocity
            </h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productStockData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 600, fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 600, fontSize: 12}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="stock" fill="#3b82f6" radius={[10, 10, 10, 10]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS SECTION */}
        <section>
          <h2 className="text-2xl font-black mb-6 px-2 flex items-center gap-3 text-slate-800">
            <FiSettings className="text-slate-400" /> Administrative Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Manage Inventory", desc: "Audit and update products", href: "/admin/products", icon: <FiPackage />, color: "bg-blue-600" },
              { title: "Expand Catalog", desc: "Onboard new products", href: "/admin/add-product", icon: <FiPlusCircle />, color: "bg-emerald-600" },
              { title: "User Permissions", desc: "Manage root access", href: "/admin/users", icon: <FiUsers />, color: "bg-indigo-600" },
            ].map((action, i) => (
              <Link key={i} href={action.href} className="group relative bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 ${action.color} opacity-[0.03] rounded-bl-[5rem] group-hover:opacity-[0.08] transition-opacity`} />
                <div className="flex items-center gap-5">
                  <div className={`p-4 rounded-2xl text-white ${action.color} shadow-lg shadow-current/20`}>
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800 group-hover:text-blue-600 transition-colors">{action.title}</h3>
                    <p className="text-sm font-medium text-slate-400">{action.desc}</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end">
                  <span className="p-2 bg-slate-50 rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <FiArrowRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}