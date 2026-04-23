"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  FiArrowLeft, 
  FiSave, 
  FiImage, 
  FiInfo, 
  FiCpu, 
  FiDollarSign, 
  FiBox, 
  FiCheckCircle, 
  FiAlertCircle 
} from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CATEGORY_SPECS: Record<string, string[]> = {
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

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

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

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const res = await fetch(`/api/admin/get-product/${id}`);
      const data = await res.json();
      setProduct({
        ...data,
        specs: data.specs || {},
      });
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleSpecChange = (key: string, value: string) => {
    setProduct((prev: any) => ({
      ...prev,
      specs: { ...prev.specs, [key]: value },
    }));
  };

  const uploadToCloudinary = async (): Promise<string | null> => {
    if (!newImageFile) return product.thumbnailUrl || null;

    const formData = new FormData();
    formData.append("file", newImageFile);
    formData.append("upload_preset", "ecommerce_upload"); 

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dw76kjrru/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const imageUrl = await uploadToCloudinary();
      const updatedProduct = {
        ...product,
        thumbnailUrl: imageUrl,
      };

      const res = await fetch(`/api/admin/update-product/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (res.ok) {
        setModal({
          open: true,
          title: "Registry Updated",
          message: "Product specifications synchronized successfully.",
          type: "success",
        });

        setTimeout(() => {
          router.push("/admin/products");
        }, 1500);
      } else {
        throw new Error();
      }
    } catch (err) {
      setModal({
        open: true,
        title: "Update Failed",
        message: "Network error while writing to registry.",
        type: "error",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
        <AiOutlineLoading3Quarters className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-500 font-medium tracking-tight">Initializing Asset Editor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans pb-20">
      
      {/* HEADER SECTION */}
      <header className="bg-slate-900 text-white pt-16 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => router.push("/admin/products")}
              className="p-4 bg-white/10 rounded-[1.5rem] hover:bg-white/20 transition-all group"
            >
              <FiArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="bg-blue-500 text-[10px] font-black px-2 py-0.5 rounded tracking-widest uppercase">Asset ID: #{id}</span>
              </div>
              <h1 className="text-4xl font-black tracking-tight">Edit Specification</h1>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN FORM SECTION */}
      <main className="max-w-4xl mx-auto px-6 -mt-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* PRIMARY INFO CARD */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-6">
              <FiInfo className="text-blue-500 w-5 h-5" />
              <h2 className="text-lg font-black uppercase tracking-widest text-slate-400">Core Identity</h2>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Asset Nomenclature</label>
                <input
                  value={product.name}
                  onChange={(e) => setProduct({ ...product, name: e.target.value })}
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700 transition-all"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Valuation (USD)</label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="number"
                      step="0.01"
                      value={product.price}
                      onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Inventory Level</label>
                  <div className="relative">
                    <FiBox className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="number"
                      value={product.stock}
                      onChange={(e) => setProduct({ ...product, stock: Number(e.target.value) })}
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Classification Category</label>
                <select
                  value={product.category}
                  onChange={(e) => setProduct({ ...product, category: e.target.value, specs: {} })}
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700 cursor-pointer appearance-none"
                  required
                >
                  <option value="">Select Category</option>
                  {Object.keys(CATEGORY_SPECS).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Product Manifest (Description)</label>
                <textarea
                  value={product.description || ""}
                  onChange={(e) => setProduct({ ...product, description: e.target.value })}
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700 min-h-[120px]"
                  placeholder="Describe asset characteristics..."
                />
              </div>
            </div>
          </div>

          {/* VISUAL ASSETS CARD */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-6">
              <FiImage className="text-purple-500 w-5 h-5" />
              <h2 className="text-lg font-black uppercase tracking-widest text-slate-400">Visual Assets</h2>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="relative group">
                <div className="w-48 h-48 bg-slate-50 rounded-[2rem] border-4 border-white shadow-inner overflow-hidden">
                  <img
                    src={preview || product.thumbnailUrl}
                    className="w-full h-full object-cover"
                    alt="product preview"
                  />
                </div>
                <div className="absolute -top-3 -right-3 bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-full border-4 border-[#f8fafc]">
                  {preview ? "NEW PREVIEW" : "CURRENT"}
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <p className="text-sm font-bold text-slate-500">
                  Update the visual representation of this asset. Supported formats: JPG, PNG, WEBP.
                </p>
                <label className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl cursor-pointer font-black transition-all shadow-lg shadow-slate-200">
                  <FiImage />
                  Replace Asset Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setNewImageFile(file);
                      setPreview(file ? URL.createObjectURL(file) : null);
                    }}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* TECHNICAL SPECS CARD */}
          {product.category && CATEGORY_SPECS[product.category] && (
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-6">
                <FiCpu className="text-emerald-500 w-5 h-5" />
                <h2 className="text-lg font-black uppercase tracking-widest text-slate-400">Technical Parameters</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {CATEGORY_SPECS[product.category].map((spec) => (
                  <div key={spec}>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">
                      {spec.replace("_", " ")}
                    </label>
                    <input
                      value={product.specs?.[spec] || ""}
                      onChange={(e) => handleSpecChange(spec, e.target.value)}
                      className="w-full px-6 py-3.5 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 font-bold text-slate-700 transition-all"
                      placeholder={`Define ${spec.replace("_", " ")}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBMIT BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={isUpdating}
              className="flex-1 flex items-center justify-center gap-3 px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-[2rem] shadow-xl shadow-blue-500/30 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:translate-y-0"
            >
              {isUpdating ? (
                <AiOutlineLoading3Quarters className="animate-spin w-6 h-6" />
              ) : (
                <>
                  <FiSave className="w-6 h-6" />
                  Commit Changes
                </>
              )}
            </button>
          </div>
        </form>
      </main>

      {/* MODAL OVERLAY */}
      {modal.open && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-6">
          <div className="bg-white rounded-[3rem] p-10 max-w-sm w-full shadow-2xl text-center border border-slate-100">
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${
              modal.type === "success" ? "bg-emerald-50 text-emerald-500" : "bg-red-50 text-red-500"
            }`}>
              {modal.type === "success" ? <FiCheckCircle size={40}/> : <FiAlertCircle size={40}/>}
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">{modal.title}</h2>
            <p className="text-slate-500 font-bold mb-8 leading-relaxed">{modal.message}</p>
            <button
              onClick={() => setModal({ ...modal, open: false })}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all"
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}
    </div>
  );
}