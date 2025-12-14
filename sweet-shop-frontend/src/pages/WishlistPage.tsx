import { Trash2, ShoppingBag } from "lucide-react";

export default function WishlistPage() {
    const wishlistItems = [
        {
            id: 1,
            name: "Kaju Katli",
            price: 850,
            image: "https://images.unsplash.com/photo-1596483561668-3e4299b6424e?q=80&w=2670&auto=format&fit=crop"
        },
        {
            id: 2,
            name: "Rasgulla",
            price: 450,
            image: "https://images.unsplash.com/photo-1541019191-4775d7870e28?q=80&w=2670&auto=format&fit=crop"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-black text-gray-900 mb-8">My Wishlist</h1>

                {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {wishlistItems.map((item) => (
                            <div key={item.id} className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 group">
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                                    <p className="text-pink-600 font-black text-xl mb-4">₹{item.price}<span className="text-xs text-gray-400 font-normal ml-1">/kg</span></p>

                                    <button className="w-full bg-gray-900 text-white font-bold py-2.5 rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2">
                                        <ShoppingBag size={18} />
                                        Move to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-400 font-medium text-lg">Your wishlist is empty.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
