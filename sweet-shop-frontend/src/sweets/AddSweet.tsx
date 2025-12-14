import api from "../api/api";
import axios from "axios";
import { useState } from "react";

type AddSweetProps = {
  onAdded?: () => void;
};

export default function AddSweet({ onAdded }: AddSweetProps) {
  const [sweet, setSweet] = useState({
    name: "",
    category: "",
    price: 0,
    quantity: 0,
    image: ""
  });

  const submit = async () => {
    try {
      await api.post("/sweets", sweet);
      alert("Sweet added");
      setSweet({ name: "", category: "", price: 0, quantity: 0, image: "" }); // Reset form
      if (onAdded) {
        onAdded();
      } else {
        window.location.reload();
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Error adding sweet");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
      <div className="md:col-span-3">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Name</label>
        <input
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500/20 outline-none text-gray-800 placeholder-gray-400 transition-all font-medium"
          value={sweet.name}
          placeholder="e.g. Laddu"
          onChange={(e) => setSweet({ ...sweet, name: e.target.value })}
        />
      </div>

      <div className="md:col-span-3">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Image URL</label>
        <input
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500/20 outline-none text-gray-800 placeholder-gray-400 transition-all font-medium"
          value={sweet.image}
          placeholder="https://..."
          onChange={(e) => setSweet({ ...sweet, image: e.target.value })}
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Category</label>
        <input
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500/20 outline-none text-gray-800 placeholder-gray-400 transition-all font-medium"
          value={sweet.category}
          placeholder="e.g. Milk"
          onChange={(e) => setSweet({ ...sweet, category: e.target.value })}
        />
      </div>

      <div className="md:col-span-1">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Price</label>
        <input
          type="number"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500/20 outline-none text-gray-800 placeholder-gray-400 transition-all font-medium"
          value={sweet.price || ""}
          placeholder="0"
          onChange={(e) => setSweet({ ...sweet, price: +e.target.value })}
        />
      </div>

      <div className="md:col-span-1">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Qty</label>
        <input
          type="number"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500/20 outline-none text-gray-800 placeholder-gray-400 transition-all font-medium"
          value={sweet.quantity || ""}
          placeholder="0"
          onChange={(e) => setSweet({ ...sweet, quantity: +e.target.value })}
        />
      </div>

      <button
        onClick={submit}
        className="md:col-span-2 w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-pink-500/30 active:scale-95 transition-all duration-200 uppercase tracking-wider text-sm"
      >
        <span className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Sweet
        </span>
      </button>
    </div>
  );
}
