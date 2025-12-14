import { Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";


export default function CartPage() {
    const { cartItems, removeFromCart, cartTotal, placeOrder } = useCart();
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (cartItems.length === 0) return;

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login to checkout!");
            navigate("/login");
            return;
        }

        try {
            // Place order using context (Client-simulation)
            placeOrder();

            alert("Order placed successfully!");
            navigate("/orders");
        } catch (error) {
            console.error(error);
            alert("Checkout failed. Please try again.");
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto p-8 text-center min-h-[60vh] flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added any sweets yet.</p>
                <Link
                    to="/"
                    className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-8 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items List */}
                <div className="flex-1 space-y-4">
                    {cartItems.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition"
                        >
                            <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                {item.image ? (
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
                                )}
                            </div>

                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                                <p className="text-sm text-gray-500">{item.category}</p>
                                <div className="text-blue-600 font-bold mt-1">₹{item.price}</div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="text-sm font-semibold text-gray-600">
                                    Qty: <span className="text-gray-900 text-base">{item.cartQuantity}</span>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition"
                                    title="Remove Item"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:w-96">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal ({cartItems.length} items)</span>
                                <span>₹{cartTotal}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="text-green-600">Free</span>
                            </div>
                            <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-900">
                                <span>Total</span>
                                <span>₹{cartTotal}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg transform active:scale-95 transition-all"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
