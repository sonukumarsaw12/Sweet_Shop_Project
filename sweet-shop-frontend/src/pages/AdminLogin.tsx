import api from "../api/api";
import { useState } from "react";

export default function AdminLogin() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const submit = async () => {
        try {
            const res = await api.post("/auth/login", form);
            const { token, role } = res.data;

            if (role !== "ADMIN") {
                alert("Access Denied: You are not an Admin.");
                return;
            }

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            window.location.href = "/admin";
        } catch (err: unknown) {
            alert("Login failed. Ensure you have Admin credentials.");
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
            style={{
                backgroundImage: "url('/admin-bg.jpg')"
            }}
        >
            {/* Dark Overlay with Blur */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px]"></div>

            <div className="relative z-10 bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-white/10 transform transition-all hover:scale-[1.01]">
                <h2 className="text-3xl font-bold text-center text-white mb-2">
                    Admin Login
                </h2>
                <p className="text-gray-400 text-center text-xs uppercase tracking-widest mb-8">Secure Access</p>

                <div className="mb-5">
                    <label className="block text-gray-300 text-xs font-bold mb-2 uppercase tracking-wide">Email</label>
                    <input
                        className="w-full p-3.5 rounded-xl bg-black/40 text-white border border-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition-all placeholder-gray-500"
                        placeholder="admin@sweetshop.com"
                        onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                </div>

                <div className="mb-8">
                    <label className="block text-gray-300 text-xs font-bold mb-2 uppercase tracking-wide">Password</label>
                    <input
                        type="password"
                        className="w-full p-3.5 rounded-xl bg-black/40 text-white border border-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition-all placeholder-gray-500"
                        placeholder="••••••••"
                        onChange={e => setForm({ ...form, password: e.target.value })}
                    />
                </div>

                <button
                    className="w-full py-3.5 font-bold text-gray-900 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 rounded-xl shadow-lg hover:shadow-yellow-500/20 transition-all active:scale-95 uppercase tracking-wide text-sm"
                    onClick={submit}
                >
                    Login as Admin
                </button>

                <div className="mt-6 text-center">
                    <a href="/login" className="text-xs font-bold text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-gray-400 pb-0.5">
                        &larr; Back to User Login
                    </a>
                </div>
            </div>
        </div>
    );
}
