"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, User, ArrowRight, Loader2, Globe, LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

import { Suspense } from "react";

function AuthContent() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, logout, refreshUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Success
      await refreshUser(); // Update global auth state
      toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
      
      const redirectPath = searchParams.get("redirect") || "/";
      router.push(redirectPath);
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-[#050505] relative overflow-hidden flex items-center justify-center p-4 text-center">
        {/* Cinematic Background */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-gold-primary/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-gold-primary/5 rounded-full blur-[180px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-10 rounded-[2.5rem] border border-gold-primary/30 max-w-md w-full"
        >
          <Logo iconSize={40} />
          <h1 className="text-2xl font-bold mt-6">You're already logged in</h1>
          <p className="text-text-secondary mt-2">Logged in as <span className="text-gold-soft">{user.email}</span></p>
          
          <div className="mt-8 space-y-4">
            <Button className="w-full" onClick={() => router.push("/")}>
              Go to Home
            </Button>
            <button 
              onClick={() => {
                logout();
                toast.success("Logged out successfully");
              }}
              className="w-full py-4 rounded-full border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center gap-2 text-text-secondary hover:text-white"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden flex items-center justify-center p-4">
      {/* Premium Cinematic Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-gold-primary/10 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-gold-primary/5 rounded-full blur-[180px] animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[480px] relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <Logo iconSize={40} />
          </div>
          <h1 className="text-3xl font-display font-bold text-white">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-text-secondary mt-2">
            {isLogin ? "Enter your details to access your books" : "Join ISHQFLOW and start your journey"}
          </p>
        </div>

        <div className="glass-card rounded-[2.5rem] p-8 md:p-10 border border-gold-primary/30 shadow-2xl relative overflow-hidden">
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold-primary/5 to-transparent pointer-events-none" />

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium text-text-secondary px-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-gold-soft transition-colors" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold-primary/50 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary px-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-gold-soft transition-colors" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-gold-primary/40 focus:bg-white/[0.06] transition-all placeholder:text-white/20"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-medium text-text-secondary">Password</label>
                  {isLogin && (
                    <button type="button" className="text-xs text-gold-soft hover:underline">Forgot Password?</button>
                  )}
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-gold-soft transition-colors" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-gold-primary/40 focus:bg-white/[0.06] transition-all placeholder:text-white/20"
                    placeholder="••••••••"
                  />
                </div>
              </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-danger text-sm text-center px-2"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 mt-4 rounded-2xl bg-gradient-to-r from-gold-soft via-gold-primary to-gold-soft text-black font-display font-bold text-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex justify-center items-center group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <span>{isLogin ? "Sign In" : "Create Account"}</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-4 text-text-secondary">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium text-white">Continue with Google</span>
              </button>
            </div>

            <p className="text-center text-text-secondary text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-gold-soft font-bold hover:underline"
              >
                {isLogin ? "Sign Up" : "Log In"}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-gold-primary animate-spin" />
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}
