"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { 
  FiLogOut, FiUser, FiMail, FiShield, FiStar, 
  FiMessageSquare, FiSend, FiTrash2, FiClock, 
  FiCheckCircle, FiAlertTriangle, FiX, FiInfo
} from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// --- Types ---
type Review = {
  id: string;
  rating: number;
  comment: string;
  date: string;
};

type UserProfile = {
  id: number;
  name?: string;
  email: string;
  role: string;
};

export default function ProfilePage() {
  const { data: session, status } = useSession();
  
  // App State
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews'>('overview');
  
  // Reviews State
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  
  // UI Feedback States
  const [showSuccess, setShowSuccess] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Fetch User & Local Storage Data
  useEffect(() => {
    if (!session?.user?.email) return;

    const initData = async () => {
      try {
        const res = await fetch(`/api/users/get-user?email=${session.user.email}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }

      const saved = localStorage.getItem(`user_reviews_${session.user.email}`);
      if (saved) setReviews(JSON.parse(saved));
    };

    initData();
  }, [session?.user?.email]);

  // Success Toast Auto-hide
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  // Handlers
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const freshReview: Review = {
      id: Date.now().toString(),
      rating: newRating,
      comment: newComment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    const updated = [freshReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(`user_reviews_${session?.user?.email}`, JSON.stringify(updated));
    
    setNewComment("");
    setNewRating(5);
    setShowSuccess(true);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    const updated = reviews.filter(r => r.id !== deleteId);
    setReviews(updated);
    localStorage.setItem(`user_reviews_${session?.user?.email}`, JSON.stringify(updated));
    setDeleteId(null);
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <AiOutlineLoading3Quarters className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Synchronizing Profile...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans pb-20">
      
      {/* 1. SUCCESS TOAST */}
      {showSuccess && (
        <div className="fixed top-10 right-10 z-[100] animate-bounce-in">
          <div className="bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
            <FiCheckCircle className="text-xl" />
            <span className="font-bold">Review Posted Successfully!</span>
            <button onClick={() => setShowSuccess(false)} className="ml-2 hover:opacity-70"><FiX /></button>
          </div>
        </div>
      )}

      {/* 2. DELETE CONFIRMATION MODAL */}
      {deleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setDeleteId(null)} />
          <div className="relative bg-white rounded-lg p-10 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 mx-auto">
              <FiAlertTriangle className="text-red-500 text-4xl" />
            </div>
            <h3 className="text-2xl font-black text-center mb-2">Delete Review?</h3>
            <p className="text-slate-500 text-center mb-8 font-medium">This feedback will be permanently removed from your history. This cannot be undone.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => setDeleteId(null)}
                className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-lg font-bold hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="flex-1 py-4 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-100"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER SECTION */}
      <header className="bg-slate-900 text-white pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
              <div className="relative w-28 h-28 rounded-[2rem] overflow-hidden border-4 border-white/10 shadow-2xl">
                <Image src={session?.user?.image || "/avatar.png"} alt="User" fill className="object-cover" />
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight">{user.name || "User Profile"}</h1>
                <div className="flex gap-3 mt-2">
                  <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm font-medium text-slate-300 italic">
                    <FiMail className="text-blue-400" /> {user.email}
                  </span>
                  <span className="flex items-center gap-2 bg-blue-500 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                    <FiShield /> {user.role}
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-bold transition-all flex items-center gap-2"
            >
              <FiLogOut /> Log Out
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 -mt-12">
        
        {/* TAB NAVIGATION */}
        <nav className="flex gap-3 mb-10 bg-white p-2 rounded-full shadow-sm w-fit border border-slate-100">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-10 py-4 rounded-full font-black transition-all flex items-center gap-2 ${activeTab === 'overview' ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <FiInfo /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`px-10 py-4 rounded-full font-black transition-all flex items-center gap-2 ${activeTab === 'reviews' ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <FiMessageSquare /> Reviews ({reviews.length})
          </button>
        </nav>

        {activeTab === 'overview' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Account Details */}
            <section className="lg:col-span-2 bg-white rounded-lg p-10 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                <span className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <FiUser />
                </span> 
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Full Name", value: user.name, icon: <FiUser /> },
                  { label: "Email Address", value: user.email, icon: <FiMail /> },
                  { label: "Account Role", value: user.role, icon: <FiShield />, highlight: true },
                  { label: "Location", value: "Global User", icon: <FiClock /> }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-[1.5rem] border border-transparent hover:border-slate-200 transition-all">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      {item.icon} {item.label}
                    </p>
                    <p className={`text-lg font-bold ${item.highlight ? 'text-blue-600 capitalize' : 'text-slate-800'}`}>
                      {item.value || "Not Provided"}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Submission Form */}
            <section className="bg-white rounded-lg p-10 shadow-sm border border-slate-100">
              <h2 className="text-xl font-black mb-6">Leave Feedback</h2>
              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div>
                  <label className="text-xs font-black text-slate-400 mb-3 block">SERVICE RATING (Click the stars)</label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(s => (
                      <button 
                        key={s} type="button" 
                        onClick={() => setNewRating(s)}
                        className={`text-3xl transition-transform active:scale-90 ${newRating >= s ? 'text-yellow-400' : 'text-slate-100'}`}
                      >
                        <FiStar fill={newRating >= s ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase mb-3 block">Your Comment</label>
                  <textarea 
                    required
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Describe your experience..."
                    className="w-full bg-slate-50 rounded-2xl p-5 min-h-[140px] focus:ring-4 focus:ring-blue-50 outline-none border border-slate-100 font-medium transition-all"
                  />
                </div>
                <button className="w-full py-4 bg-blue-600 text-white rounded-full font-black shadow-xl shadow-blue-100 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                  <FiSend className="text-xl" /> Publish Review
                </button>
              </form>
            </section>
          </div>
        ) : (
          /* REVIEWS DISPLAY */
          <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 min-h-[400px]">
            {reviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {reviews.map(r => (
                  <div key={r.id} className="relative p-8 bg-slate-50 rounded-[2.5rem] border border-transparent hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-1 text-yellow-400">
                        {Array.from({length: 5}).map((_, i) => (
                          <FiStar key={i} fill={i < r.rating ? "currentColor" : "none"} className="text-sm" />
                        ))}
                      </div>
                      <button 
                        onClick={() => setDeleteId(r.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                    <p className="text-slate-800 font-bold text-lg leading-relaxed mb-6">"{r.comment}"</p>
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                      <FiClock /> Published {r.date}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 opacity-30">
                <FiMessageSquare className="text-8xl mb-4" />
                <p className="text-2xl font-black">No reviews found yet.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}