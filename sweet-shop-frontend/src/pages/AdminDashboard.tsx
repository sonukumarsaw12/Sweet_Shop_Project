import AddSweet from "../sweets/AddSweet";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem("role") === "ADMIN";

    useEffect(() => {
        if (!isAdmin) {
            navigate("/");
        }
    }, [isAdmin, navigate]);

    if (!isAdmin) return null;
    return (
        <div className="min-h-screen bg-gray-50 relative">
            <div className="container mx-auto p-4 md:p-6 min-h-screen flex flex-col pt-4 md:pt-6">
                {/* Sticky Header - Static on generic mobile, Sticky on MD+ */}
                <div className="md:sticky md:top-20 z-40 bg-gray-50/95 backdrop-blur-sm py-3 md:py-4 mb-6 md:mb-8 border-b border-gray-200 transition-all">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Admin Dashboard</h1>
                        <span className="bg-white border border-gray-200 text-gray-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Admin Mode
                        </span>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 p-4 md:p-8 rounded-3xl shadow-xl shadow-gray-200/50 mb-8 scroll-mt-32" id="add-sweet">
                    <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 border-b border-gray-100 pb-4">Add New Sweet</h2>
                    <AddSweet />
                </div>

                <div className="bg-white border border-gray-200 p-4 md:p-8 rounded-3xl shadow-xl shadow-gray-200/50">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 border-b border-gray-100 pb-4">Manage Sweets</h2>
                    <div className="flex items-center gap-3 text-gray-600 bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <svg className="w-6 h-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <p className="text-sm md:text-base">
                            To edit or delete sweets, please navigate to the <button onClick={() => navigate("/")} className="text-blue-600 font-bold underline hover:text-blue-700 transition-colors">Home Page</button> and use the admin overlay controls on the product cards.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
