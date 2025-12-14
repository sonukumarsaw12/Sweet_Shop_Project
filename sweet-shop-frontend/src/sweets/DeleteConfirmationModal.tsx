type DeleteConfirmationModalProps = {
    onClose: () => void;
    onConfirm: () => void;
};

export default function DeleteConfirmationModal({ onClose, onConfirm }: DeleteConfirmationModalProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Sweet</h3>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this sweet? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 font-medium"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
