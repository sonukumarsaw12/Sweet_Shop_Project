import { Search, ShoppingCart, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Header({
    onSearch,
}: {
    onSearch: (query: string) => void;
}) {
    const [query, setQuery] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { cartCount } = useCart();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-6">
                {/* Logo */}
                <Link to="/" className="text-2xl font-black italic flex items-center gap-1 group">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 group-hover:from-pink-600 group-hover:to-purple-700 transition-all">Sweet</span>
                    <span className="text-gray-800">Shop</span>
                    <span className="text-xs bg-black text-white px-1.5 py-0.5 rounded-full not-italic -mt-4 ml-0.5">Plus</span>
                </Link>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex-1 max-w-lg hidden md:block">
                    <div className="flex items-center bg-gray-50 rounded-full border border-gray-200 focus-within:ring-2 focus-within:ring-pink-100 focus-within:border-pink-300 transition-all overflow-hidden">
                        <Search size={18} className="ml-4 text-gray-400" />
                        <input
                            type="text"
                            className="flex-1 px-3 py-2.5 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                            placeholder="Search for sweets..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                </form>

                {/* Nav Items */}
                <div className="flex items-center gap-2 md:gap-6 font-medium text-sm text-gray-600">
                    {localStorage.getItem("role") !== "ADMIN" && (
                        <Link to="/cart" className="flex items-center gap-1.5 hover:text-pink-600 transition-colors relative group">
                            <div className="relative">
                                <ShoppingCart size={22} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full shadow-sm">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <span className="hidden sm:inline font-semibold">Cart</span>
                        </Link>
                    )}

                    {/* Admin Panel Link */}
                    {localStorage.getItem("role") === "ADMIN" && (
                        <Link
                            to="/admin"
                            className="text-gray-800 hover:text-purple-600 font-bold"
                        >
                            Admin
                        </Link>
                    )}

                    {token ? (
                        <div
                            className="relative ml-2"
                            onMouseEnter={() => setIsDropdownOpen(true)}
                            onMouseLeave={() => setIsDropdownOpen(false)}
                            onClick={() => setIsDropdownOpen((prev) => !prev)}
                        >
                            <div className="flex items-center gap-2 cursor-pointer py-2">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-100 to-purple-100 flex items-center justify-center text-purple-600 font-bold border-2 border-white shadow-sm group-hover:shadow-md transition-all">
                                    <User size={18} />
                                </div>
                                <div className="hidden md:block text-left leading-tight">
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Hello,</p>
                                    <p className="text-sm font-bold text-gray-800">User</p>
                                </div>
                                <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute top-full right-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-200 origin-top-right z-50">
                                    <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                                        <p className="text-sm font-bold text-gray-900">My Account</p>
                                        <p className="text-xs text-gray-500 mt-0.5">Manage your details</p>
                                    </div>
                                    <div className="py-2">
                                        <Link to="/orders" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                            Orders
                                        </Link>
                                    </div>
                                    <div className="border-t border-gray-100 py-2">
                                        <button
                                            onClick={logout}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors text-left"
                                        >
                                            <LogOut size={16} />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                to="/login"
                                className="px-3 py-1.5 md:px-5 md:py-2 rounded-full text-pink-600 font-bold hover:bg-pink-50 transition-all text-sm md:text-base"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-3 py-1.5 md:px-5 md:py-2 rounded-full bg-gray-900 text-white font-bold hover:bg-black shadow-md hover:shadow-lg transition-all text-sm md:text-base"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
