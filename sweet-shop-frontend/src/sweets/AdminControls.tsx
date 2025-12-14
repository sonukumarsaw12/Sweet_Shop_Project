import { Edit, Trash, PackagePlus } from "lucide-react";

type AdminControlsProps = {
    onEdit: () => void;
    onDelete: () => void;
    onRestock: () => void;
};

export default function AdminControls({
    onEdit,
    onDelete,
    onRestock,
}: AdminControlsProps) {
    const role = localStorage.getItem("role"); // Assuming role is stored as "ADMIN"

    // Should properly decode token in real app, but this suffices for simple "adminOnly" FE check
    // or checks "role" from login response which is stored in localStorage.
    // The User model has role="ADMIN".
    if (role !== "ADMIN") return null;

    return (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
            <button
                onClick={(e) => { e.stopPropagation(); onEdit(); }}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 active:scale-95 rounded-lg transition-all shadow-sm hover:shadow-md"
                title="Edit Sweet"
            >
                <Edit size={16} /> <span>Edit</span>
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); onRestock(); }}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-green-50 hover:border-green-300 hover:text-green-600 active:scale-95 rounded-lg transition-all shadow-sm hover:shadow-md"
                title="Update Stock"
            >
                <PackagePlus size={16} /> <span>Stock</span>
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className="flex items-center justify-center px-3 py-2 text-red-500 bg-red-50 hover:bg-red-500 hover:text-white border border-red-100 active:scale-95 rounded-lg transition-all shadow-sm hover:shadow-md"
                title="Delete Sweet"
            >
                <Trash size={16} />
            </button>
        </div>
    );
}
