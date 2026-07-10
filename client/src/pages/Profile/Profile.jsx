import { useState } from "react";
import { HiOutlineCamera, HiOutlinePencil, HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const roleBadgeStyles = {
    user: "bg-blue-100 text-blue-700",
    admin: "bg-purple-100 text-purple-700",
    restaurant: "bg-orange-100 text-orange-700",
};

const roleLabels = {
    user: "User",
    admin: "Admin",
    restaurant: "Restaurant",
};

const Profile = () => {
    const { cartCount } = useCart();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);

    const [savedProfile, setSavedProfile] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
        role: user?.role || "user",
        avatar: user?.profilePicture || null,
    });

    const [draftProfile, setDraftProfile] = useState(savedProfile);

    const handleEditClick = () => {
        setDraftProfile(savedProfile);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setDraftProfile(savedProfile);
        setIsEditing(false);
    };

    const handleSave = () => {
        setSavedProfile(draftProfile);
        setIsEditing(false);
        // API call to persist changes to your backend (PUT /api/users/:id) goes here later
    };

    const handleChange = (field, value) => {
        setDraftProfile((prev) => ({ ...prev, [field]: value }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            handleChange("avatar", previewUrl);
        }
    };
    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    const display = isEditing ? draftProfile : savedProfile;

    return (
        <div className="min-h-screen bg-white">
            <Navbar cartCount={cartCount} />

            <div className="w-[95%] max-w-2xl mx-auto mt-10 pb-20">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Profile</h2>

                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
                    {/* Avatar + name + role */}
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="relative">
                            <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-md">
                                {display.avatar ? (
                                    <img src={display.avatar} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-orange-100 text-orange-500 text-3xl font-bold">
                                        {display.fullName ? display.fullName.charAt(0).toUpperCase() : "?"}
                                    </div>
                                )}
                            </div>

                            {isEditing && (
                                <label className="absolute bottom-0 right-0 w-9 h-9 flex items-center justify-center rounded-full bg-orange-500 text-white shadow-md cursor-pointer hover:bg-orange-600 transition-colors">
                                    <HiOutlineCamera size={16} />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleAvatarChange}
                                    />
                                </label>
                            )}
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mt-4">
                            {display.fullName || "Unnamed User"}
                        </h3>
                        <span
                            className={`mt-2 text-xs font-semibold px-3 py-1 rounded-full ${roleBadgeStyles[display.role] || "bg-gray-100 text-gray-700"
                                }`}
                        >
                            {roleLabels[display.role] || display.role}
                        </span>
                    </div>

                    {/* Fields */}
                    <div className="flex flex-col gap-5">
                        {/* Full name - editable */}
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                Full Name
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={draftProfile.fullName}
                                    onChange={(e) => handleChange("fullName", e.target.value)}
                                    className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
                                />
                            ) : (
                                <p className="mt-1 text-gray-900 font-medium">
                                    {savedProfile.fullName || "—"}
                                </p>
                            )}
                        </div>

                        {/* Email - read only */}
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                Email
                            </label>
                            <p className="mt-1 text-gray-500">{savedProfile.email || "—"}</p>
                        </div>

                        {/* Phone - editable */}
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                Phone Number
                            </label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    value={draftProfile.phone}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                    placeholder="Add a phone number"
                                    className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
                                />
                            ) : (
                                <p className="mt-1 text-gray-900 font-medium">
                                    {savedProfile.phone || "—"}
                                </p>
                            )}
                        </div>

                        {/* Address - editable */}
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                Address
                            </label>
                            {isEditing ? (
                                <textarea
                                    value={draftProfile.address}
                                    onChange={(e) => handleChange("address", e.target.value)}
                                    placeholder="Add your delivery address"
                                    rows={2}
                                    className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all resize-none"
                                />
                            ) : (
                                <p className="mt-1 text-gray-900 font-medium">
                                    {savedProfile.address || "—"}
                                </p>
                            )}
                        </div>

                        {/* Role - read only */}
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                Role
                            </label>
                            <p className="mt-1 text-gray-500">
                                {roleLabels[savedProfile.role] || savedProfile.role}
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex gap-3">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="flex-1 bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 text-white font-bold py-3 rounded-xl shadow-[0_6px_24px_rgba(249,115,22,0.35)] hover:brightness-110 active:scale-[0.98] transition-all"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={handleEditClick}
                                className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors"
                            >
                                <HiOutlinePencil size={16} />
                                Edit Profile
                            </button>
                        )}
                    </div>
                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 mt-3 text-red-500 font-semibold py-3 rounded-xl hover:bg-red-50 transition-colors"
                    >
                        <HiOutlineArrowRightOnRectangle size={18} />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;