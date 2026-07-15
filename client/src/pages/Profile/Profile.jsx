import { useState, useEffect } from "react";
import {
    HiOutlineCamera,
    HiOutlinePencil,
    HiOutlineArrowRightOnRectangle,
    HiOutlineLockClosed,
    HiEye,
    HiEyeSlash,
} from "react-icons/hi2";
import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { updateProfile, changePassword } from "../../services/user.service";

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
    const { user, logout, updateUser } = useAuth();
    const navigate = useNavigate();

    // ===== Edit profile state =====
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const [savedProfile, setSavedProfile] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
        role: user?.role || "user",
        avatar: user?.profilePicture || null,
    });

    const [draftProfile, setDraftProfile] = useState(savedProfile);

    // ===== Change password state =====
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordSaving, setPasswordSaving] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");
    const [showCurrentPw, setShowCurrentPw] = useState(false);
    const [showNewPw, setShowNewPw] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // Keep local state in sync if AuthContext's user loads/changes after mount
    useEffect(() => {
        if (user) {
            const fresh = {
                fullName: user.fullName || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || "",
                role: user.role || "user",
                avatar: user.profilePicture || null,
            };
            setSavedProfile(fresh);
            setDraftProfile(fresh);
        }
    }, [user]);

    // ===== Edit profile handlers =====
    const handleEditClick = () => {
        setDraftProfile(savedProfile);
        setError("");
        setSuccessMsg("");
        setIsEditing(true);
    };

    const handleCancel = () => {
        setDraftProfile(savedProfile);
        setError("");
        setIsEditing(false);
    };

    const handleSave = async () => {
        setSaving(true);
        setError("");
        setSuccessMsg("");

        try {
            const data = await updateProfile({
                fullName: draftProfile.fullName,
                phone: draftProfile.phone,
                address: draftProfile.address,
            });

            const updatedUser = data.user;

            const fresh = {
                fullName: updatedUser.fullName || "",
                email: updatedUser.email || "",
                phone: updatedUser.phone || "",
                address: updatedUser.address || "",
                role: updatedUser.role || "user",
                avatar: updatedUser.profilePicture || null,
            };

            setSavedProfile(fresh);
            setDraftProfile(fresh);
            updateUser(updatedUser);

            setSuccessMsg("Profile updated successfully.");
            setIsEditing(false);
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to update profile. Please try again.");
        } finally {
            setSaving(false);
        }
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
            // Preview only for now — backend doesn't yet accept file uploads
            // on PUT /api/users/profile.
            const previewUrl = URL.createObjectURL(file);
            handleChange("avatar", previewUrl);
        }
    };

    // ===== Change password handlers =====
    const handlePasswordFieldChange = (field, value) => {
        setPasswordForm((prev) => ({ ...prev, [field]: value }));
    };

    const openChangePassword = () => {
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setPasswordError("");
        setPasswordSuccess("");
        setIsChangingPassword(true);
    };

    const closeChangePassword = () => {
        setIsChangingPassword(false);
        setPasswordError("");
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    };

    const handleChangePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordError("");
        setPasswordSuccess("");

        if (passwordForm.newPassword.length < 6) {
            setPasswordError("New password must be at least 6 characters.");
            return;
        }

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setPasswordError("New password and confirm password do not match.");
            return;
        }

        setPasswordSaving(true);

        try {
            await changePassword({
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword,
            });

            setPasswordSuccess("Password changed successfully.");
            setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });

            setTimeout(() => {
                setIsChangingPassword(false);
                setPasswordSuccess("");
            }, 1500);
        } catch (err) {
            setPasswordError(
                err?.response?.data?.message || "Failed to change password. Please try again."
            );
        } finally {
            setPasswordSaving(false);
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

                {/* Glowing Card — Profile Info */}
                <div className="relative rounded-3xl p-[1.5px] overflow-hidden group shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] hover:shadow-[0_30px_60px_-10px_rgba(245,158,11,0.2)] transition-all duration-500">

                    <div className="absolute inset-0 z-0 bg-[conic-gradient(from_0deg,transparent_40%,#f59e0b_50%,transparent_60%)] opacity-50 group-hover:opacity-100 transition-opacity duration-500 scale-110 animate-streak-active pointer-events-none" />

                    <div className="relative z-10 bg-[#121212]/95 backdrop-blur-xl rounded-[23px] p-8">

                        {/* Avatar */}
                        <div className="flex flex-col items-center text-center mb-10">

                            <div className="relative rounded-full p-[2px] overflow-hidden group/avatar">

                                <div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 bg-[conic-gradient(from_0deg,transparent_30%,#f59e0b_50%,transparent_70%)] opacity-70 group-hover/avatar:opacity-100 transition-opacity duration-500 animate-streak-active pointer-events-none"
                                    style={{
                                        width: "220%",
                                        paddingBottom: "220%",
                                    }}
                                />

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

                        {error && (
                            <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-red-400 text-sm font-semibold text-center">
                                {error}
                            </div>
                        )}
                        {successMsg && !isEditing && (
                            <div className="mb-6 rounded-2xl border border-green-500/20 bg-green-500/10 px-5 py-3 text-green-400 text-sm font-semibold text-center">
                                {successMsg}
                            </div>
                        )}

                        {/* Fields */}
                        <div className="flex flex-col gap-6">

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

                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                                    Email
                                </label>

                                <div className="mt-2 bg-zinc-900 border border-neutral-800 rounded-2xl px-5 py-3 text-neutral-400">
                                    {savedProfile.email || "—"}
                                </div>
                            </div>

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
                                    <button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="flex-1 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black py-3.5 rounded-2xl transition-all duration-300 shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:shadow-[0_0_35px_rgba(245,158,11,0.45)] active:scale-95 disabled:opacity-60"
                                    >
                                        {saving ? "Saving..." : "Save Changes"}
                                    </button>

                                    <button
                                        onClick={handleCancel}
                                        disabled={saving}
                                        className="flex-1 bg-zinc-900 border border-neutral-700 hover:border-neutral-500 text-white font-bold py-3.5 rounded-2xl transition-all duration-300 active:scale-95 disabled:opacity-60"
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

                    </div>
                </div>

                {/* Glowing Card — Change Password */}
                <div className="relative rounded-3xl p-[1.5px] overflow-hidden group mt-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] hover:shadow-[0_30px_60px_-10px_rgba(245,158,11,0.2)] transition-all duration-500">

                    <div className="absolute inset-0 z-0 bg-[conic-gradient(from_0deg,transparent_40%,#f59e0b_50%,transparent_60%)] opacity-50 group-hover:opacity-100 transition-opacity duration-500 scale-110 animate-streak-active pointer-events-none" />

                    <div className="relative z-10 bg-[#121212]/95 backdrop-blur-xl rounded-[23px] p-8">

                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                <HiOutlineLockClosed size={18} className="text-amber-500" />
                            </div>
                            <h3 className="text-xl font-black text-white tracking-tight">
                                Password &amp; Security
                            </h3>
                        </div>
                        <p className="text-neutral-400 text-sm mb-6">
                            Update your password to keep your account secure.
                        </p>

                        {!isChangingPassword ? (
                            <button
                                onClick={openChangePassword}
                                className="w-full flex items-center justify-center gap-2 bg-zinc-900 border border-neutral-700 hover:border-amber-500 hover:bg-zinc-800 text-white font-bold py-3.5 rounded-2xl transition-all duration-300 active:scale-95"
                            >
                                <HiOutlineLockClosed size={18} />
                                Change Password
                            </button>
                        ) : (
                            <form onSubmit={handleChangePasswordSubmit} className="flex flex-col gap-5">

                                {passwordError && (
                                    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-red-400 text-sm font-semibold text-center">
                                        {passwordError}
                                    </div>
                                )}
                                {passwordSuccess && (
                                    <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-5 py-3 text-green-400 text-sm font-semibold text-center">
                                        {passwordSuccess}
                                    </div>
                                )}

                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                                        Current Password
                                    </label>
                                    <div className="relative mt-2">
                                        <input
                                            type={showCurrentPw ? "text" : "password"}
                                            required
                                            value={passwordForm.currentPassword}
                                            onChange={(e) => handlePasswordFieldChange("currentPassword", e.target.value)}
                                            className="w-full bg-zinc-900 border border-neutral-800 rounded-2xl px-5 py-3 pr-12 text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                                            placeholder="Enter current password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrentPw((s) => !s)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-amber-500 transition-colors"
                                        >
                                            {showCurrentPw ? <HiEyeSlash size={20} /> : <HiEye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                                        New Password
                                    </label>
                                    <div className="relative mt-2">
                                        <input
                                            type={showNewPw ? "text" : "password"}
                                            required
                                            value={passwordForm.newPassword}
                                            onChange={(e) => handlePasswordFieldChange("newPassword", e.target.value)}
                                            className="w-full bg-zinc-900 border border-neutral-800 rounded-2xl px-5 py-3 pr-12 text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                                            placeholder="At least 6 characters"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPw((s) => !s)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-amber-500 transition-colors"
                                        >
                                            {showNewPw ? <HiEyeSlash size={20} /> : <HiEye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={passwordForm.confirmPassword}
                                        onChange={(e) => handlePasswordFieldChange("confirmPassword", e.target.value)}
                                        className="mt-2 w-full bg-zinc-900 border border-neutral-800 rounded-2xl px-5 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                                        placeholder="Re-enter new password"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                                    <button
                                        type="submit"
                                        disabled={passwordSaving}
                                        className="flex-1 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black py-3.5 rounded-2xl transition-all duration-300 shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:shadow-[0_0_35px_rgba(245,158,11,0.45)] active:scale-95 disabled:opacity-60"
                                    >
                                        {passwordSaving ? "Updating..." : "Update Password"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={closeChangePassword}
                                        disabled={passwordSaving}
                                        className="flex-1 bg-zinc-900 border border-neutral-700 hover:border-neutral-500 text-white font-bold py-3.5 rounded-2xl transition-all duration-300 active:scale-95 disabled:opacity-60"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="w-full mt-8 flex items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 py-3.5 text-red-400 font-bold hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-95"
                >
                    <HiOutlineArrowRightOnRectangle size={20} />
                    Logout
                </button>

            </div>
        </div>
    );
};

export default Profile;