"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  FiUsers, 
  FiUser, 
  FiCalendar, 
  FiLogOut, 
  FiGrid,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiArrowLeft,
  FiShield,
  FiMail
} from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
};

export default function UsersManagementPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/get-all-users", {
        cache: "no-store",
      });
      const data = await res.json();
      // ✅ FIX maintained: use data.users instead of data
      setUsers(data.users || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

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

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
        <AiOutlineLoading3Quarters className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-500 font-medium tracking-tight">Accessing User Records...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans pb-20">
      
      {/* HEADER SECTION - Terminal Accent */}
      <header className="bg-slate-900 text-white pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
              <Link href="/admin" className="p-4 bg-white/10 rounded-[1.5rem] hover:bg-white/20 transition-all">
                <FiArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-4xl font-black tracking-tight">User Registry</h1>
                <div className="flex gap-3 mt-2">
                  <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-300">
                    <FiShield className="text-indigo-400" /> Database Root
                  </span>
                  <span className="flex items-center gap-2 bg-indigo-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {users.length} Total Records
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all"
              >
                <FiHome className="w-4 h-4" />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold shadow-lg shadow-red-500/20 transition-all disabled:opacity-50"
              >
                {isLoggingOut ? <AiOutlineLoading3Quarters className="animate-spin" /> : <FiLogOut />}
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 -mt-12">
        
        {/* SEARCH BAR CARD */}
        <div className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-slate-100 mb-8">
          <div className="relative">
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search registry by name or email alias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-5 bg-slate-50 rounded-[1.8rem] outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-slate-700"
            />
          </div>
        </div>

        {/* USERS TABLE CARD */}
        <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-50 bg-slate-50/50">
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Profile Identity</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Registration Date</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Access Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-24 text-center">
                      <div className="w-20 h-20 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <FiUsers className="w-10 h-10 text-slate-200" />
                      </div>
                      <p className="text-slate-400 font-bold italic">No records found matching your query.</p>
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((user) => (
                    <tr key={user.id} className="group hover:bg-slate-50/50 transition-all">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center text-slate-500 group-hover:from-blue-500 group-hover:to-indigo-600 group-hover:text-white transition-all duration-300 shadow-inner">
                            <FiUser className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-black text-slate-800 tracking-tight leading-none mb-1">{user.name}</p>
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <FiMail className="w-3 h-3" />
                              <p className="text-xs font-bold truncate max-w-[200px]">{user.email}</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                            <FiCalendar className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-700 text-sm">
                              {new Date(user.created_at).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'short', day: 'numeric'
                              })}
                            </p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                              Timestamp: {new Date(user.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm ${
                          user.role === "admin" 
                          ? "bg-indigo-50 text-indigo-600 border border-indigo-100" 
                          : "bg-blue-50 text-blue-600 border border-blue-100"
                        }`}>
                          <FiShield className="w-3 h-3" />
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION - Premium Styling */}
          {filteredUsers.length > itemsPerPage && (
            <div className="px-8 py-8 bg-slate-50/30 border-t border-slate-50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Showing <span className="text-slate-900">{startIndex + 1} — {Math.min(startIndex + itemsPerPage, filteredUsers.length)}</span> of {filteredUsers.length}
                </p>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all disabled:opacity-30 shadow-sm"
                  >
                    <FiChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <div className="flex gap-1 bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) pageNum = i + 1;
                      else if (currentPage <= 3) pageNum = i + 1;
                      else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                      else pageNum = currentPage - 2 + i;
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 rounded-[0.8rem] font-black text-xs transition-all ${
                            currentPage === pageNum 
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                            : 'text-slate-400 hover:bg-slate-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all disabled:opacity-30 shadow-sm"
                  >
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-6 mt-12 pt-12 border-t border-slate-200/60">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            © {new Date().getFullYear()} ShopEase System • Registry v2.4.0
          </p>
          <div className="flex gap-8">
            <Link href="/admin" className="text-xs font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors">Admin Center</Link>
            <Link href="/admin/products" className="text-xs font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors">Global Inventory</Link>
            <Link href="/" className="text-xs font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors">Main Storefront</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}