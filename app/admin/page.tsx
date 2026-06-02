"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, AlertCircle, Loader2, ShieldAlert } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    const userSession = localStorage.getItem("moonshot_admin_session");
    if (userSession) {
      try {
        const session = JSON.parse(userSession);
        if (session.role === "admin") {
          router.push("/admin/dashboard");
        }
      } catch (e) {
        localStorage.removeItem("moonshot_admin_session");
      }
    }
  }, [router]);

  // Check for expired session parameter
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("expired") === "true") {
        setErrorMessage("Your session has expired. Please log in again.");
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please fill in all credentials.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Cache admin session in localStorage
        localStorage.setItem("moonshot_admin_session", JSON.stringify(data.user));
        localStorage.setItem("moonshot_admin_token", data.token);
        router.push("/admin/dashboard");
      } else {
        setErrorMessage(data.error || "Invalid email or password.");
      }
    } catch (err) {
      console.error("Login client error:", err);
      setErrorMessage("Could not connect to the backend server. Please verify if it is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-sky-50 px-4 py-12 overflow-hidden animated-grid-bg">
      {/* Soft floating blurred background orbs */}
      <div className="absolute -top-10 left-1/4 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute -bottom-10 right-1/4 h-72 w-72 rounded-full bg-sky-100/30 blur-3xl animate-float-delay pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl border border-slate-100 p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(14,165,233,0.08)]"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-sky-50 text-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-sky-100 shadow-sm shadow-sky-50">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Admin Login
          </h1>
          <p className="text-slate-500 text-sm mt-2 font-medium">
            Sign in to access your inquiries dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ankita@gmail.com"
                className="w-full bg-slate-50 border-transparent rounded-2xl pl-12 pr-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white focus:border-transparent transition-all shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border-transparent rounded-2xl pl-12 pr-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white focus:border-transparent transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Feedback alerts */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-rose-50 border border-rose-100 text-rose-800 p-4 rounded-2xl flex items-center gap-3 text-xs font-medium"
              >
                <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                <span>{errorMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            disabled={isLoading}
            type="submit"
            className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-100 hover-shine"
          >
            {isLoading ? (
              <>
                Authenticating...
                <Loader2 className="w-5 h-5 animate-spin" />
              </>
            ) : (
              "Sign In"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
