import api from "../api/api";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      // alert("Logged in successfully"); 
      window.location.href = "/";
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Login failed");
      } else {
        alert("Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://cdn.pixabay.com/photo/2024/05/13/09/43/ai-generated-8758588_1280.png')"
      }}
    >
      {/* Dark Overlay for better text readability and background dimming */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:scale-[1.01] relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-md">Welcome Back</h2>
          <p className="text-blue-50 text-sm mt-2 font-medium drop-shadow">Login to access your Sweet Shop account</p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <div className="relative">
            <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1 drop-shadow">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all backdrop-blur-sm"
              placeholder="name@example.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="relative">
            <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1 drop-shadow">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all backdrop-blur-sm"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold rounded-xl shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : "Sign In"}
          </button>
        </form>

        <p className="mt-8 text-center text-blue-100 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-white font-bold hover:text-blue-200 transition-colors hover:underline">
            Register here
          </a>
        </p>

        <div className="mt-6 border-t border-white/10 pt-4 text-center">
          <a href="/admin-login" className="inline-flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-white transition-colors uppercase tracking-widest opacity-70 hover:opacity-100">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Admin Panel
          </a>
        </div>
      </div>
    </div>
  );
}
