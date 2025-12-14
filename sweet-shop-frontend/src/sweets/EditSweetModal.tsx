import { useState, useEffect } from "react";
import api from "../api/api";

type Sweet = {
    _id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
    image?: string;
};

type EditSweetModalProps = {
    sweet: Sweet;
    onClose: () => void;
    onSave: () => void;
};

export default function EditSweetModal({ sweet, onClose, onSave }: EditSweetModalProps) {
    const [form, setForm] = useState<Sweet>(sweet);

    // Sync state if prop changes (though usually modal mounts with one sweet)
    useEffect(() => {
        setForm(sweet);
    }, [sweet]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.put(`/sweets/${sweet._id}`, form);
            alert("Sweet updated successfully!");
            onSave();
            onClose();
        } catch (error) {
            alert("Failed to update sweet");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
                <h2 className="text-xl font-bold mb-4">Edit Sweet</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            className="w-full border p-2 rounded"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <input
                            className="w-full border p-2 rounded"
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                            required
                        />
                    </div>
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="number"
                                className="w-full border p-2 rounded"
                                value={form.price}
                                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Quantity</label>
                            <input
                                type="number"
                                className="w-full border p-2 rounded"
                                value={form.quantity}
                                onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input
                            className="w-full border p-2 rounded"
                            value={form.image || ""}
                            onChange={(e) => setForm({ ...form, image: e.target.value })}
                            placeholder="https://..."
                        />
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
