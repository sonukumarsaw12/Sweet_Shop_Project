import api from "../api/api";
import { useEffect, useState } from "react";

import AdminControls from "./AdminControls";
import { useCart } from "../context/CartContext";


import DeleteConfirmationModal from "./DeleteConfirmationModal";
import EditSweetModal from "./EditSweetModal";

type Sweet = {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image?: string;
};

export default function SweetList({ searchTerm, onClearSearch }: { searchTerm: string; onClearSearch: (term: string) => void }) {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const isAdmin = localStorage.getItem("role") === "ADMIN";
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
  const [deletingSweetId, setDeletingSweetId] = useState<string | null>(null);
  const { addToCart, cartItems, decrementFromCart } = useCart();

  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = () => {
    api.get("/sweets").then((res) => setSweets(res.data));
  };

  

 

  const deleteSweet = (id: string) => {
    setDeletingSweetId(id);
  };

  const confirmDelete = async () => {
    if (!deletingSweetId) return;
    try {
      await api.delete(`/sweets/${deletingSweetId}`);
      fetchSweets();
      setDeletingSweetId(null);
    } catch (error) {
      alert("Failed to delete");
    }
  };

  const restockSweet = async (id: string) => {
    try {
      await api.post(`/sweets/${id}/restock`);
      fetchSweets();
    } catch (error) {
      alert("Failed to restock");
    }
  };

  const editSweet = (sweet: Sweet) => {
    setEditingSweet(sweet);
  };

  const filteredSweets = sweets.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="container mx-auto p-4 bg-gray-100 min-h-screen cursor-default"
      onClick={(e) => {
        if (e.target === e.currentTarget && searchTerm) {
          onClearSearch("");
        }
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredSweets.map((s) => {
          const cartItem = cartItems.find((item) => item._id === s._id);
          const cartQty = cartItem?.cartQuantity || 0;
          const effectiveStock = s.quantity - cartQty;

          return (
            <div
              key={s._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group flex flex-col h-full border border-gray-100"
            >
              {/* Image Display */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                {s.image ? (
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 bg-gray-50">
                    <svg
                      className="w-12 h-12 mb-2 opacity-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-xs font-medium uppercase tracking-widest opacity-60">No Image</span>
                  </div>
                )}
                {/* Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm border border-white/50">
                  {s.category}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-1 leading-tight group-hover:text-blue-600 transition-colors">
                  {s.name}
                </h3>

                <div className="flex items-center justify-between mt-auto pt-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">Price</span>
                    <span className="text-2xl font-black text-gray-900">₹{s.price}</span>
                  </div>
                  <div className="text-right">
                    {effectiveStock > 0 ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                        {effectiveStock} in stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                        Out of stock
                      </span>
                    )}
                  </div>
                </div>

                {!isAdmin && (
                  cartQty > 0 ? (
                    <div className="w-full mt-5 py-2 px-4 bg-white border-2 border-pink-500 rounded-xl flex items-center justify-between shadow-md">
                      <button
                        className="bg-pink-100 text-pink-600 p-1.5 rounded-lg hover:bg-pink-200 transition-colors"
                        onClick={() => decrementFromCart(s._id)}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                      </button>
                      <span className="font-bold text-gray-800 text-lg">
                        {cartQty}
                      </span>
                      <button
                        className={`p-1.5 rounded-lg transition-colors shadow-sm ${effectiveStock === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-pink-600 text-white hover:bg-pink-700'}`}
                        onClick={() => addToCart(s)}
                        disabled={effectiveStock === 0}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                      </button>
                    </div>
                  ) : (
                    <button
                      className={`w-full mt-5 py-3 rounded-xl font-bold text-white shadow-lg transform transition-all duration-200 flex items-center justify-center gap-2 ${effectiveStock === 0
                        ? "bg-gray-400 cursor-not-allowed opacity-60"
                        : "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 hover:shadow-xl active:scale-95"
                        }`}
                      disabled={effectiveStock === 0}
                      onClick={() => addToCart(s)}
                    >
                      {effectiveStock === 0 ? (
                        "SOLD OUT"
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                          <span>ADD TO CART</span>
                        </>
                      )}
                    </button>
                  )
                )}

                {/* Admin Controls */}
                <AdminControls
                  onEdit={() => editSweet(s)}
                  onDelete={() => deleteSweet(s._id)}
                  onRestock={() => restockSweet(s._id)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {editingSweet && (
        <EditSweetModal
          sweet={editingSweet}
          onClose={() => setEditingSweet(null)}
          onSave={fetchSweets}
        />
      )}

      {deletingSweetId && (
        <DeleteConfirmationModal
          onClose={() => setDeletingSweetId(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
