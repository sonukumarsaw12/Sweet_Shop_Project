import { Package, Clock, CheckCircle, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function OrdersPage() {
    const { orders } = useCart();

    if (orders.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full">
                    <div className="w-20 h-20 bg-pink-50 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag size={32} />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 mb-2">No Orders Yet</h2>
                    <p className="text-gray-500 mb-8">It looks like you haven't placed any orders yet. Treat yourself to something sweet!</p>
                    <Link to="/" className="inline-block bg-gray-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-black transition-all">
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-black text-gray-900 mb-8">My Orders</h1>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
                            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-50 pb-4 mb-4">
                                <div>
                                    <p className="text-2xl font-bold text-gray-800">{order.id}</p>
                                    <p className="text-gray-500 font-medium text-sm flex items-center gap-2 mt-1">
                                        <Clock size={14} />
                                        Ordered on {order.date}
                                    </p>
                                </div>
                                <div className="text-left md:text-right">
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Amount</p>
                                    <p className="text-2xl font-black text-pink-600">₹{order.total}</p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-3">Items</p>
                                    <div className="flex flex-wrap gap-2">
                                        {order.items.map((item, idx) => (
                                            <span key={idx} className="bg-gray-50 text-gray-700 px-3 py-1 rounded-lg text-sm font-semibold border border-gray-100 flex items-center gap-2">
                                                {item.name} <span className="text-gray-400 text-xs">x{item.cartQuantity}</span>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-3">Status</p>
                                    <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold ${order.status === 'Delivered'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-blue-100 text-blue-700'
                                        }`}>
                                        {order.status === 'Delivered' ? <CheckCircle size={16} /> : <Package size={16} />}
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
