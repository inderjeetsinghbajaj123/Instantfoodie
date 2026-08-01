import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import Navbar from "../../components/Navbar";
import {
  getMyRestaurants,
  createRestaurant,
  updateRestaurant,
} from "../../services/restaurant.service";
import { useAuth } from "../../context/AuthContext";

function RestaurantProfile() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [existingRestaurant, setExistingRestaurant] = useState(null);

  const [form, setForm] = useState({
    restaurantName: "",
    cuisine: "",
    description: "",
    restaurantAddress: "",
    isOpen: true,
  });

  useEffect(() => {
    loadRestaurant();
  }, []);

  async function loadRestaurant() {
    try {
      const data = await getMyRestaurants();
      const restaurants = data.restaurants || [];

      if (restaurants.length > 0) {
        const r = restaurants[0];
        setExistingRestaurant(r);
        setForm({
          restaurantName: r.restaurantName || "",
          cuisine: r.cuisine || "",
          description: r.description || "",
          restaurantAddress: r.restaurantAddress || "",
          isOpen: r.isOpen,
        });
      }
    } catch (err) {
      console.log("Load restaurant error:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(field) {
    return (e) => {
      const value =
        field === "isOpen" ? e.target.value === "true" : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.restaurantName.trim() || !form.restaurantAddress.trim()) {
      setError("Restaurant name and address are required.");
      return;
    }

    setSaving(true);

    try {
      if (existingRestaurant) {
        await updateRestaurant(existingRestaurant._id, form);
      } else {
        await createRestaurant(form);
      }

      navigate("/restaurant-orders");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Something went wrong while saving your restaurant.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    try {
      await logout();
    } catch (err) {
      console.log("Logout error:", err);
    } finally {
      navigate("/restaurant-login");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505]">
        <Navbar />
        <h2 className="text-white p-10">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar />

      <div className="w-[95%] max-w-2xl mx-auto py-10">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h1 className="text-3xl font-black text-white">
            {existingRestaurant
              ? "Update Restaurant Profile"
              : "Set Up Your Restaurant"}
          </h1>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-neutral-800 hover:border-red-500/40 text-neutral-300 hover:text-red-400 text-sm font-semibold transition-all shrink-0"
          >
            <HiArrowRightOnRectangle size={16} />
            Logout
          </button>
        </div>

        <p className="text-neutral-400 mb-8">
          {existingRestaurant
            ? "Update your restaurant details below."
            : "You need to create a restaurant profile before you can receive orders."}
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-neutral-800 rounded-3xl p-6 flex flex-col gap-5"
        >
          <div>
            <label className="text-sm text-neutral-400 mb-1.5 block">
              Restaurant Name
            </label>
            <input
              type="text"
              value={form.restaurantName}
              onChange={handleChange("restaurantName")}
              placeholder="e.g. Tasty Bites"
              className="w-full bg-zinc-950 border border-neutral-800 focus:border-amber-500 outline-none rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 transition-colors"
            />
          </div>

          <div>
            <label className="text-sm text-neutral-400 mb-1.5 block">
              Cuisine
            </label>
            <input
              type="text"
              value={form.cuisine}
              onChange={handleChange("cuisine")}
              placeholder="e.g. Fast Food, Italian, Chinese"
              className="w-full bg-zinc-950 border border-neutral-800 focus:border-amber-500 outline-none rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 transition-colors"
            />
          </div>

          <div>
            <label className="text-sm text-neutral-400 mb-1.5 block">
              Description
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={handleChange("description")}
              placeholder="Tell customers about your restaurant"
              className="w-full bg-zinc-950 border border-neutral-800 focus:border-amber-500 outline-none rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 resize-none transition-colors"
            />
          </div>

          <div>
            <label className="text-sm text-neutral-400 mb-1.5 block">
              Restaurant Address
            </label>
            <textarea
              rows={2}
              value={form.restaurantAddress}
              onChange={handleChange("restaurantAddress")}
              placeholder="Full address"
              className="w-full bg-zinc-950 border border-neutral-800 focus:border-amber-500 outline-none rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 resize-none transition-colors"
            />
          </div>

          <div>
            <label className="text-sm text-neutral-400 mb-1.5 block">
              Status
            </label>
            <select
              value={String(form.isOpen)}
              onChange={handleChange("isOpen")}
              className="w-full bg-zinc-950 border border-neutral-800 focus:border-amber-500 outline-none rounded-xl px-4 py-3 text-white transition-colors"
            >
              <option value="true">Open</option>
              <option value="false">Closed</option>
            </select>
          </div>

          {error && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-400 text-sm font-semibold text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black py-3.5 rounded-2xl transition-all active:scale-95 disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : existingRestaurant
                ? "Update Restaurant"
                : "Create Restaurant"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RestaurantProfile;