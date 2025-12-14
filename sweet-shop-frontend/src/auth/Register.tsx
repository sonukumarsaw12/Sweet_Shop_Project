import api from "../api/api";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const submit = async () => {
    try {
      await api.post("/auth/register", form);
      alert("Registered successfully, now login");
      window.location.href = "/login"; // ✅ lowercase
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Register failed");
      } else {
        alert("Unexpected error");
      }
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
          <h2 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-md">Create Account</h2>
          <p className="text-blue-50 text-sm mt-2 font-medium drop-shadow">Join our Sweet Shop community today</p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1 drop-shadow">Name</label>
            <input
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all backdrop-blur-sm"
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="relative">
            <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1 drop-shadow">Email</label>
            <input
              placeholder="name@example.com"
              className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all backdrop-blur-sm"
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="relative">
            <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1 drop-shadow">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all backdrop-blur-sm"
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            className="w-full py-3.5 px-4 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold rounded-xl shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            onClick={submit}
          >
            Register
          </button>
        </div>

        <p className="mt-8 text-center text-blue-100 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-white font-bold hover:text-blue-200 transition-colors hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
