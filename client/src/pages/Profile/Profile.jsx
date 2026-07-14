import { useState } from "react";
import {
    HiOutlineCamera,
    HiOutlinePencil,
    HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const roleBadgeStyles = {
    user: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    admin: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
    restaurant: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
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
        // Backend API call later
    };

    const handleChange = (field, value) => {
        setDraftProfile((prev) => ({
            ...prev,
            [field]: value,
        }));
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
        <div className="min-h-screen bg-[#050505]">
            <Navbar cartCount={cartCount} />

            <div className="w-[95%] max-w-3xl mx-auto mt-12 pb-20 px-2 sm:px-4">

                {/* Heading */}
                <div className="mb-10">
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                        My Profile
                    </h2>

                    <p className="text-neutral-400 mt-2">
                        Manage your account information and delivery details.
                    </p>
                </div>

                {/* Glowing Card */}
                <div className="relative rounded-3xl p-[1.5px] overflow-hidden group shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] hover:shadow-[0_30px_60px_-10px_rgba(245,158,11,0.2)] transition-all duration-500">

                    {/* Glow Border */}
                    <div className="absolute inset-0 z-0 bg-[conic-gradient(from_0deg,transparent_40%,#f59e0b_50%,transparent_60%)] opacity-50 group-hover:opacity-100 transition-opacity duration-500 scale-110 animate-streak-active pointer-events-none" />

                    {/* Card Body */}
                    <div className="relative z-10 bg-[#121212]/95 backdrop-blur-xl rounded-[23px] p-8">

                        {/* Avatar */}
                        <div className="flex flex-col items-center text-center mb-10">

                            <div className="relative rounded-full p-[2px] overflow-hidden group/avatar">

                                {/* Avatar Glow */}
                                <div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 bg-[conic-gradient(from_0deg,transparent_30%,#f59e0b_50%,transparent_70%)] opacity-70 group-hover/avatar:opacity-100 transition-opacity duration-500 animate-streak-active pointer-events-none"
                                    style={{
                                        width: "220%",
                                        paddingBottom: "220%",
                                    }}
                                />

                                {/* Avatar Image */}
                                <div className="relative z-10 w-32 h-32 rounded-full overflow-hidden bg-zinc-900 border border-neutral-800 flex items-center justify-center">

                                    {display.avatar ? (
                                        <img
                                            src={display.avatar}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-4xl font-black text-amber-500">
                                            {display.fullName
                                                ? display.fullName.charAt(0).toUpperCase()
                                                : "?"}
                                        </span>
                                    )}

                                </div>

                                {isEditing && (
                                    <label className="absolute bottom-2 right-2 z-30 w-10 h-10 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 transition-all">
                                        <HiOutlineCamera size={18} />

                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleAvatarChange}
                                        />
                                    </label>
                                )}
                            </div>

                            <h3 className="mt-5 text-2xl font-black text-white tracking-tight">
                                {display.fullName || "Unnamed User"}
                            </h3>

                            <span
                                className={`mt-3 text-xs font-bold px-4 py-1.5 rounded-full ${roleBadgeStyles[display.role]
                                    }`}
                            >
                                {roleLabels[display.role]}
                            </span>
                        </div>

                        {/* Fields */}
                        <div className="flex flex-col gap-6">

                            {/* Full Name */}
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                                    Full Name
                                </label>

                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={draftProfile.fullName}
                                        onChange={(e) => handleChange("fullName", e.target.value)}
                                        className="mt-2 w-full bg-zinc-900 border border-neutral-800 rounded-2xl px-5 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                                    />
                                ) : (
                                    <div className="mt-2 bg-zinc-900 border border-neutral-800 rounded-2xl px-5 py-3 text-white font-semibold">
                                        {savedProfile.fullName || "—"}
                                    </div>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                                    Email
                                </label>

                                <div className="mt-2 bg-zinc-900 border border-neutral-800 rounded-2xl px-5 py-3 text-neutral-400">
                                    {savedProfile.email || "—"}
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                                    Phone Number
                                </label>

                                {isEditing ? (
                                    <input
                                        type="tel"
                                        value={draftProfile.phone}
                                        onChange={(e) => handleChange("phone", e.target.value)}
                                        placeholder="Add phone number"
                                        className="mt-2 w-full bg-zinc-900 border border-neutral-800 rounded-2xl px-5 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                                    />
                                ) : (
                                    <div className="mt-2 bg-zinc-900 border border-neutral-800 rounded-2xl px-5 py-3 text-white font-semibold">
                                        {savedProfile.phone || "—"}
                                    </div>
                                )}
                            </div>

                            {/* Address */}
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                                    Address
                                </label>

                                {isEditing ? (
                                    <textarea
                                        rows={3}
                                        value={draftProfile.address}
                                        onChange={(e) => handleChange("address", e.target.value)}
                                        placeholder="Add your delivery address"
                                        className="mt-2 w-full bg-zinc-900 border border-neutral-800 rounded-2xl px-5 py-3 text-white placeholder:text-neutral-500 resize-none focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                                    />
                                ) : (
                                    <div className="mt-2 bg-zinc-900 border border-neutral-800 rounded-2xl px-5 py-3 text-white font-semibold">
                                        {savedProfile.address || "—"}
                                    </div>
                                )}
                            </div>

                            {/* Role */}
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                                    Role
                                </label>

                                <div className="mt-2 bg-zinc-900 border border-neutral-800 rounded-2xl px-5 py-3 text-amber-500 font-bold">
                                    {roleLabels[savedProfile.role] || savedProfile.role}
                                </div>
                            </div>

                        </div>

                        {/* Actions */}
                        <div className="mt-10 flex flex-col sm:flex-row gap-4">

                            {isEditing ? (
                                <>
                                    {/* Save Button */}
                                    <button
                                        onClick={handleSave}
                                        className="flex-1 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black py-3.5 rounded-2xl transition-all duration-300 shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:shadow-[0_0_35px_rgba(245,158,11,0.45)] active:scale-95"
                                    >
                                        Save Changes
                                    </button>

                                    {/* Cancel Button */}
                                    <button
                                        onClick={handleCancel}
                                        className="flex-1 bg-zinc-900 border border-neutral-700 hover:border-neutral-500 text-white font-bold py-3.5 rounded-2xl transition-all duration-300 active:scale-95"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={handleEditClick}
                                    className="w-full flex items-center justify-center gap-2 bg-zinc-900 border border-neutral-700 hover:border-amber-500 hover:bg-zinc-800 text-white font-bold py-3.5 rounded-2xl transition-all duration-300 active:scale-95"
                                >
                                    <HiOutlinePencil size={18} />
                                    Edit Profile
                                </button>
                            )}

                        </div>

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="w-full mt-4 flex items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 py-3.5 text-red-400 font-bold hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-95"
                        >
                            <HiOutlineArrowRightOnRectangle size={20} />
                            Logout
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;