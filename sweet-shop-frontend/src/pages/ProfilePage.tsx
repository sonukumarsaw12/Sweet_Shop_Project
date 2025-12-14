import { User, Mail, Phone, MapPin, Edit2 } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 h-32 relative">
                        <div className="absolute -bottom-16 left-8">
                            <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-md flex items-center justify-center">
                                <User size={64} className="text-gray-300" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-20 pb-8 px-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-3xl font-black text-gray-900">John Doe</h1>
                                <p className="text-gray-500 font-medium">Sweet Lover & Premium Member</p>
                            </div>
                            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-xl transition-all text-sm">
                                <Edit2 size={16} />
                                Edit Profile
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-2">Contact Info</h2>
                                <div className="flex items-center gap-4 text-gray-600">
                                    <div className="w-10 h-10 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase">Email</p>
                                        <p className="font-semibold text-gray-800">john.doe@example.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-gray-600">
                                    <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase">Phone</p>
                                        <p className="font-semibold text-gray-800">+91 98765 43210</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-2">Default Address</h2>
                                <div className="flex items-start gap-4 text-gray-600">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase">Shipping Address</p>
                                        <p className="font-semibold text-gray-800 mt-1">
                                            123, Sweet Street, <br />
                                            Sugar Valley, <br />
                                            Mumbai - 400001
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
