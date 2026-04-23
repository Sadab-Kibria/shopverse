"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const router = useRouter();

  const categories = [
    "Mobiles", "Laptops", "Headphones", "Speakers", "Watches", "Airpods",
    "Cameras", "Monitors", "Keyboards", "Mouse", "Tablets", "Chargers",
  ];

  const categorySpecs: Record<string, string[]> = {
    Mobiles: ["ram", "battery", "display", "storage"],
    Laptops: ["ram", "ssd", "screen", "processor"],
    Headphones: ["rgb", "type", "drivers", "battery_life"],
    Speakers: ["power", "battery_life", "water_resistance"],
    Watches: ["gps", "display", "battery_life", "water_resistance"],
    Airpods: ["bluetooth", "battery_life", "noise_cancellation"],
    Cameras: ["lens", "video", "sensor", "stabilization"],
    Monitors: ["size", "panel", "resolution", "refresh_rate"],
    Keyboards: ["rgb", "type", "connection", "spill_resistant"],
    Mouse: ["dpi", "weight", "buttons", "connection"],
    Tablets: ["os", "chip", "camera", "screen", "storage"],
    Chargers: ["type", "power", "compatibility"],
  };

  // Form Fields
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [specs, setSpecs] = useState<Record<string, string>>({});

  const [modal, setModal] = useState<{
    open: boolean;
    title: string;
    message: string;
    type: "success" | "error";
  }>({
    open: false,
    title: "",
    message: "",
    type: "success",
  });

  const handleSpecChange = (key: string, value: string) => {
    setSpecs((prev) => ({ ...prev, [key]: value }));
  };

  const uploadToCloudinary = async (): Promise<string | null> => {
    if (!imageFile) return null;
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "ecommerce_upload");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dw76kjrru/image/upload",
      { method: "POST", body: formData }
    );
    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const imageUrl = await uploadToCloudinary();

    const res = await fetch("/api/admin/add-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price: Number(price),
        stock: Number(stock),
        category,
        description,
        specs,
        thumbnailUrl: imageUrl,
      }),
    });

    if (res.ok) {
      setModal({
        open: true,
        title: "Asset Registered",
        message: "The new product has been added to the inventory.",
        type: "success",
      });
      setTimeout(() => router.push("/admin"), 1500);
    } else {
      setModal({
        open: true,
        title: "Registration Failed",
        message: "Failed to add product to the database.",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans pb-10">
      {/* HEADER SECTION */}
      <div className="bg-slate-900 text-white pt-16 pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-black tracking-tight">Add New Asset</h1>
          <p className="mt-2 text-slate-400 font-medium">Initialize a new product entry in the registry</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 -mt-12">
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
            
            {/* BASIC INFO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Product Name *</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700 transition-all"
                  placeholder="e.g. Sony WH-1000XM5"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Price (USD)</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full pl-10 pr-6 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Stock Level</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700"
                  placeholder="Units available"
                  min="0"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Category Classification</label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setSpecs({});
                  }}
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700 appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Product Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700 resize-none min-h-[120px]"
                  placeholder="Technical details and marketing copy..."
                />
              </div>
            </div>

            {/* DYNAMIC SPECS */}
            {category && (
              <div className="pt-8 border-t border-slate-100">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 mb-6">Technical Parameters</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {categorySpecs[category]?.map((field) => (
                    <div key={field}>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">
                        {field.replace("_", " ")}
                      </label>
                      <input
                        type="text"
                        onChange={(e) => handleSpecChange(field, e.target.value)}
                        className="w-full px-6 py-3.5 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700"
                        placeholder={`Specify ${field.replace("_", " ")}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* IMAGE UPLOAD */}
            <div className="pt-8 border-t border-slate-100">
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-4 ml-1">Product Imagery *</label>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <label className="flex-shrink-0 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black cursor-pointer hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                  Select File
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setImageFile(file);
                      setPreview(file ? URL.createObjectURL(file) : null);
                    }}
                    required
                  />
                </label>
                {preview && (
                  <div className="relative group">
                    <img
                      src={preview}
                      className="w-32 h-32 object-cover rounded-[1.5rem] border-4 border-white shadow-md"
                      alt="preview"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 pt-10">
              <button
                type="submit"
                className="flex-1 px-8 py-5 bg-blue-600 text-white font-black rounded-3xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 hover:-translate-y-1"
              >
                Register Product
              </button>
              <button
                type="button"
                onClick={() => router.push("/admin")}
                className="px-8 py-5 bg-slate-100 text-slate-600 font-black rounded-3xl hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>

          <div className="bg-slate-50 p-6 border-t border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 text-center uppercase tracking-widest">
              Required fields marked with * — Registry verification required
            </p>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {modal.open && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-6">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl text-center">
            <h2 className={`text-2xl font-black mb-2 ${modal.type === "success" ? "text-emerald-600" : "text-red-600"}`}>
              {modal.title}
            </h2>
            <p className="text-slate-500 font-bold mb-8">{modal.message}</p>
            <button
              onClick={() => setModal({ ...modal, open: false })}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}