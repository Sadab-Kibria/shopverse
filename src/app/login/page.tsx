"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import {
  FaEye, 
  FaEyeSlash,
  FaArrowRight
} from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoginPage() {
  const router = useRouter();
  
  // Admin login states
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  
  // Common states
  const [error, setError] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Handle admin credentials login
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsAdminLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    });

    setIsAdminLoading(false);

    if (res?.error) {
      setError("Invalid admin credentials. Please try again.");
    } else if (res?.ok) {
      router.push("/admin");
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    await signIn("google", { callbackUrl: "/profile" });
  };

  return (
    <div className=" bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Image & Branding Style */}
        <div className="flex flex-col space-y-12">
          <div>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
              POWERED BY <br />
              <span className="relative inline-block">
                CREATORS
                <div className="absolute bottom-2 left-0 w-full h-3 bg-green-300/60 -z-10" />
              </span> AROUND <br />
              THE WORLD. 
              <span className="inline-flex ml-2">
                <span className="w-8 h-8 rounded-full bg-blue-900 -ml-1"></span>
                <span className="w-8 h-8 rounded-full bg-blue-700 -ml-3"></span>
                <span className="w-8 h-8 rounded-full bg-blue-400 -ml-3"></span>
              </span>
            </h1>
          </div>

          <div className="flex flex-col space-y-4">
            <p className="text-gray-500 font-medium">Don't have an account?</p>
            <button 
              onClick={handleGoogleLogin}
              className="group flex items-center gap-2 text-black font-bold border-b-2 border-black w-fit pb-1 transition-all hover:gap-4"
            >
              Create account <FaArrowRight size={14} />
            </button>
          </div>

          {/* Featured Image Box */}
          <div className="relative rounded-3xl overflow-hidden aspect-video bg-gray-100 group">
            <img 
              src="/images/login/doggo.png" 
              alt="Featured Car" 
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-black/40 p-8 flex flex-col justify-end">
               <div className="flex items-start gap-4">
                  <span className="text-white font-bold text-sm">ShopVerse</span>
                  <p className="text-white/80 text-sm max-w-xs">
                    “Millions of high-quality products from trusted sellers worldwide — brought to you by the growing ShopVerse community.”
                  </p>
               </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Forms */}
        <div className="relative">
          {/* Main Login Card (User) */}
          <div className="bg-white rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-10 md:p-14 border border-gray-100 relative z-20">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-black text-gray-900">Login to your account</h2>
            </div>

            <div className="space-y-8">
              {/* Simplified Google Login */}
              <button
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-4 rounded-2xl hover:bg-gray-100 transition-all font-bold flex items-center justify-center gap-4 shadow-sm active:scale-95 disabled:opacity-70"
              >
                {isGoogleLoading ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  <FcGoogle className="text-2xl" />
                )}
                Continue with Gmail
              </button>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-gray-400 text-sm font-bold">OR ADMIN LOGIN</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              {/* Admin Access Form */}
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email</label>
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 text-gray-700 border-b-2 border-transparent focus:border-black transition-all outline-none"
                    placeholder="admin@example.com"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Password</label>
                  <div className="relative">
                    <input
                      type={showAdminPassword ? "text" : "password"}
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 text-gray-700 border-b-2 border-transparent focus:border-black transition-all outline-none"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowAdminPassword(!showAdminPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showAdminPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

                <button
                  type="submit"
                  disabled={isAdminLoading}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  {isAdminLoading ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Login as Admin"}
                </button>
              </form>
            </div>
          </div>

          {/* Decorative Card Behind */}
          <div className="absolute top-10 -right-4 -left-4 -bottom-10 bg-gray-50 rounded-[40px] -z-10 border border-gray-100" />
        </div>
      </div>
    </div>
  );
}