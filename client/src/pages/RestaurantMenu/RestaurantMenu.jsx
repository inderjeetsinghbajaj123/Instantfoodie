import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  getMyFoodItems,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
} from "../../services/food.service";

const categories = [
  "Starter",
  "MainCourse",
  "Dessert",
  "Beverage",
  "Snacks",
  "Fast Food",
];

const emptyForm = {
  name: "",
  description: "",
  price: "",
  imageUrl: "",
  isVeg: true,
  category: "Fast Food",
  preparationTime: "",
};

function RestaurantMenu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    try {
      const data = await getMyFoodItems();
      setItems(data.FoodItems || []);
    } catch (err) {
      console.log("Load food items error:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(field) {
    return (e) => {
      const value =
        field === "isVeg"
          ? e.target.value === "true"
          : field === "price" || field === "preparationTime"
            ? e.target.value
            : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };
  }

  function openAddForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
    setError("");
  }

  function openEditForm(item) {
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      imageUrl: item.imageUrl || "",
      isVeg: item.isVeg,
      category: item.category,
      preparationTime: item.preparationTime,
    });
    setEditingId(item._id);
    setShowForm(true);
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.price || !form.preparationTime) {
      setError("Name, price, and preparation time are required.");
      return;
    }

    setSaving(true);

    const payload = {
      ...form,
      price: Number(form.price),
      preparationTime: Number(form.preparationTime),
    };

    try {
      if (editingId) {
        await updateFoodItem(editingId, payload);
      } else {
        await createFoodItem(payload);
      }
      setShowForm(false);
      setForm(emptyForm);
      setEditingId(null);
      await loadItems();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Something went wrong while saving.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteFoodItem(id);
      await loadItems();
    } catch (err) {
      console.log("Delete error:", err);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505]">
        <Navbar />
        <h2 className="text-white p-10">Loading menu...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar />

      <div className="w-[95%] max-w-5xl mx-auto py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-white">My Menu</h1>
          {!showForm && (
            <button
              onClick={openAddForm}
              className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black px-5 py-3 rounded-2xl transition-all active:scale-95"
            >
              + Add Food Item
            </button>
          )}
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-zinc-900 border border-neutral-800 rounded-3xl p-6 flex flex-col gap-4 mb-8"
          >
            <h2 className="text-xl font-bold text-white mb-1">
              {editingId ? "Edit Food Item" : "Add Food Item"}
            </h2>

            <input
              type="text"
              value={form.name}
              onChange={handleChange("name")}
              placeholder="Food name"
              className="w-full bg-zinc-950 border border-neutral-800 focus:border-amber-500 outline-none rounded-xl px-4 py-3 text-white placeholder:text-neutral-600"
            />

            <textarea
              rows={2}
              value={form.description}
              onChange={handleChange("description")}
              placeholder="Description"
              className="w-full bg-zinc-950 border border-neutral-800 focus:border-amber-500 outline-none rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 resize-none"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                value={form.price}
                onChange={handleChange("price")}
                placeholder="Price (₹)"
                className="w-full bg-zinc-950 border border-neutral-800 focus:border-amber-500 outline-none rounded-xl px-4 py-3 text-white placeholder:text-neutral-600"
              />
              <input
                type="number"
                value={form.preparationTime}
                onChange={handleChange("preparationTime")}
                placeholder="Prep time (mins)"
                className="w-full bg-zinc-950 border border-neutral-800 focus:border-amber-500 outline-none rounded-xl px-4 py-3 text-white placeholder:text-neutral-600"
              />
            </div>

            <input
              type="text"
              value={form.imageUrl}
              onChange={handleChange("imageUrl")}
              placeholder="Image URL (optional)"
              className="w-full bg-zinc-950 border border-neutral-800 focus:border-amber-500 outline-none rounded-xl px-4 py-3 text-white placeholder:text-neutral-600"
            />

            <div className="grid grid-cols-2 gap-4">
              <select
                value={form.category}
                onChange={handleChange("category")}
                className="w-full bg-zinc-950 border border-neutral-800 focus:border-amber-500 outline-none rounded-xl px-4 py-3 text-white"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <select
                value={String(form.isVeg)}
                onChange={handleChange("isVeg")}
                className="w-full bg-zinc-950 border border-neutral-800 focus:border-amber-500 outline-none rounded-xl px-4 py-3 text-white"
              >
                <option value="true">Veg</option>
                <option value="false">Non-Veg</option>
              </select>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-400 text-sm font-semibold text-center">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black px-5 py-3 rounded-2xl transition-all active:scale-95 disabled:opacity-60"
              >
                {saving ? "Saving..." : editingId ? "Update Item" : "Add Item"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                className="bg-zinc-950 border border-neutral-700 text-white font-semibold px-5 py-3 rounded-2xl"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {items.length === 0 ? (
          <div className="text-neutral-400">
            No food items yet. Add your first one above.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-zinc-900 border border-neutral-800 rounded-3xl p-5"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-bold text-lg">{item.name}</h3>
                  <span className="text-amber-500 font-black">
                    ₹{item.price}
                  </span>
                </div>
                <p className="text-neutral-400 text-sm mb-3">
                  {item.description}
                </p>
                <p className="text-neutral-500 text-xs mb-4">
                  {item.category} · {item.isVeg ? "Veg" : "Non-Veg"} ·{" "}
                  {item.preparationTime} min
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => openEditForm(item)}
                    className="text-amber-500 font-semibold text-sm hover:text-amber-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-400 font-semibold text-sm hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RestaurantMenu;
