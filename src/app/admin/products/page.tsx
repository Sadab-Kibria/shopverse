"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  FiSearch, 
  FiFilter, 
  FiEdit3, 
  FiTrash2, 
  FiArrowLeft,
  FiDatabase,
  FiBox,
  FiAlertTriangle,
  FiCheckCircle
} from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  description?: string | null;
  specs?: Record<string, any>;
};

export default function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // ---------- MODAL STATE ----------
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: "confirm" | "success" | "error";
    title: string;
    message: string;
    targetId?: number | null;
  }>({
    isOpen: false,
    type: "confirm",
    title: "",
    message: "",
    targetId: null,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/admin/get-all-products");
        const data = await res.json();
        const sorted = data.sort((a: Product, b: Product) => a.id - b.id);
        setProducts(sorted);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Open confirmation popup
  const promptDelete = (id: number) => {
    setModal({
      isOpen: true,
      type: "confirm",
      title: "Terminate Asset?",
      message: "This action will permanently remove this product from the inventory vault. This cannot be undone.",
      targetId: id,
    });
  };

  // Execute delete after confirmation
  const confirmDelete = async () => {
    const id = modal.targetId;
    if (!id) return;

    try {
      const res = await fetch(`/api/admin/delete-product/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        setModal({
          isOpen: true,
          type: "error",
          title: "Access Denied",
          message: data.error || "System failed to purge the asset record.",
          targetId: null,
        });
        return;
      }

      setProducts((prev) => prev.filter((p) => p.id !== id));
      setModal({
        isOpen: true,
        type: "success",
        title: "Asset Purged",
        message: "The product has been successfully removed from the registry.",
        targetId: null,
      });
    } catch (error) {
      setModal({
        isOpen: true,
        type: "error",
        title: "System Error",
        message: "A critical error occurred during the deletion process.",
        targetId: null,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
        <AiOutlineLoading3Quarters className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-500 font-medium tracking-tight">Accessing Inventory Vault...</p>
      </div>
    );
  }

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans pb-20">
      
      {/* HEADER */}
      <header className="bg-slate-900 text-white pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all">
                <FiArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-black tracking-tight">Manage Products</h1>
                <p className="text-slate-400 font-medium text-sm">Update inventory and product specifications</p>
              </div>
            </div>
            <Link href="/admin/add-product" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black flex items-center gap-2 shadow-xl shadow-blue-500/20 transition-all">
               New Product
            </Link>
          </div>
        </div>
      </header>

      {/* FILTERS & CONTENT */}
      <main className="max-w-7xl mx-auto px-6 -mt-12">
        <div className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative w-full">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by product name..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-slate-700"
            />
          </div>
          <div className="flex items-center gap-2 bg-slate-50 px-4 rounded-2xl w-full md:w-auto">
            <FiFilter className="text-slate-400" />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent py-4 outline-none font-bold text-slate-600 cursor-pointer text-sm"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-50 bg-slate-50/50">
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Identification</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Asset Details</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Pricing & Stock</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Metadata</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center">
                      <FiDatabase className="mx-auto text-5xl text-slate-100 mb-4" />
                      <p className="text-slate-400 font-bold italic">No matching products found in vault.</p>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="group hover:bg-slate-50/50 transition-all">
                      <td className="px-8 py-6 font-mono text-xs text-slate-400">#{product.id}</td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all shadow-inner">
                            <FiBox />
                          </div>
                          <div>
                            <p className="font-black text-slate-800 tracking-tight leading-none mb-1">{product.name}</p>
                            <span className="text-[10px] font-black text-blue-500 uppercase tracking-tighter bg-blue-50 px-2 py-0.5 rounded-md">
                              {product.category}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="font-black text-slate-900">${product.price}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${product.stock < 10 ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
                          <p className="text-xs font-bold text-slate-400">{product.stock} in stock</p>
                        </div>
                      </td>
                      <td className="px-8 py-6 max-w-[200px]">
                        <p className="text-xs font-medium text-slate-500 truncate mb-1">
                          {product.description || "No description provided"}
                        </p>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex justify-center gap-2">
                          <Link href={`/admin/edit-product/${product.id}`} className="p-3 bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all">
                            <FiEdit3 className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => promptDelete(product.id)}
                            className="p-3 bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* CUSTOM POPUP MODAL */}
      {modal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-6">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl text-center">
            <div className="mb-6 flex justify-center">
              {modal.type === "confirm" && <FiAlertTriangle className="text-amber-500 w-16 h-16" />}
              {modal.type === "success" && <FiCheckCircle className="text-emerald-500 w-16 h-16" />}
              {modal.type === "error" && <FiAlertTriangle className="text-red-500 w-16 h-16" />}
            </div>
            
            <h2 className={`text-2xl font-black mb-2 tracking-tight ${
              modal.type === "confirm" ? "text-slate-900" : 
              modal.type === "success" ? "text-emerald-600" : "text-red-600"
            }`}>
              {modal.title}
            </h2>
            
            <p className="text-slate-500 font-bold mb-8 leading-relaxed">
              {modal.message}
            </p>

            <div className="flex flex-col gap-3">
              {modal.type === "confirm" ? (
                <>
                  <button
                    onClick={confirmDelete}
                    className="w-full py-4 bg-red-600 text-white rounded-2xl font-black hover:bg-red-700 transition-all shadow-lg shadow-red-500/20"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setModal({ ...modal, isOpen: false })}
                    className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all"
                  >
                    Abort
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setModal({ ...modal, isOpen: false })}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all"
                >
                  Close Registry
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-200/60 text-center">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          © {new Date().getFullYear()} ShopEase Inventory Management
        </p>
      </footer>
    </div>
  );
}