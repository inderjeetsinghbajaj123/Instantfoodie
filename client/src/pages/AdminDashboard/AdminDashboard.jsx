import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  HiOutlineUsers,
  HiOutlineBuildingStorefront,
  HiOutlineClipboardDocumentList,
  HiOutlineCake,
  HiOutlinePlusCircle,
} from "react-icons/hi2";
import {
  getUsers,
  deleteUser,
  blockUser,
  unblockUser,
  getRestaurants,
  deleteRestaurant,
  deleteFoodItemAdmin,
  getAllFoodsAdmin,
  getAllOrders,
  createRestaurantAccount,
} from "../../services/admin.service";

const tabs = [
  { key: "users", label: "Users", icon: <HiOutlineUsers size={18} /> },
  {
    key: "restaurants",
    label: "Restaurants",
    icon: <HiOutlineBuildingStorefront size={18} />,
  },
  {
    key: "createRestaurant",
    label: "Create Restaurant",
    icon: <HiOutlinePlusCircle size={18} />,
  },
  {
    key: "orders",
    label: "Orders",
    icon: <HiOutlineClipboardDocumentList size={18} />,
  },
  { key: "foods", label: "Foods", icon: <HiOutlineCake size={18} /> },
];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");

  const handleLogout = async () => {
    await logout();
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white py-12 px-4">
      <div className="mx-auto max-w-5xl rounded-3xl border border-neutral-800 bg-[#111111]/90 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-400">
              Admin dashboard
            </p>
            <h1 className="mt-3 text-4xl font-black">
              Welcome back, {user?.fullName || "Admin"}
            </h1>
            <p className="mt-2 text-neutral-400 max-w-2xl">
              Manage platform settings, monitor users, and review restaurant
              activity from here.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="self-start rounded-2xl bg-amber-500 px-6 py-3 font-semibold text-neutral-950 transition hover:bg-amber-400"
          >
            Logout
          </button>
        </div>

        <div className="flex items-center gap-2 mb-8 border-b border-neutral-800 pb-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors whitespace-nowrap ${activeTab === tab.key
                ? "bg-amber-500 text-neutral-950"
                : "text-neutral-400 hover:text-white hover:bg-zinc-900"
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "users" && <UsersTab />}
        {activeTab === "restaurants" && <RestaurantsTab />}
        {activeTab === "createRestaurant" && <CreateRestaurantTab />}
        {activeTab === "orders" && <OrdersTab />}
        {activeTab === "foods" && <FoodsTab />}
      </div>
    </div>
  );
};

// ===================== Create Restaurant tab =====================
const CreateRestaurantTab = () => {
  const [form, setForm] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSaving(true);
    try {
      await createRestaurantAccount({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      });

      setSuccessMsg(`Restaurant account created for ${form.email}`);
      setForm({ fullName: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      const status = err?.response?.status;
      if (status === 404) {
        setError(
          "Backend support required — POST /api/admin/create-restaurant doesn't exist yet."
        );
      } else {
        setError(err?.response?.data?.message || "Failed to create restaurant account.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-md">
      <h3 className="text-lg font-bold text-white mb-1">Create Restaurant Account</h3>
      <p className="text-neutral-400 text-sm mb-6">
        Set up login credentials for a new restaurant partner. They'll be able to
        log in and create their restaurant profile from their dashboard.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-amber-300 text-sm font-semibold text-center">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-green-400 text-sm font-semibold text-center">
            {successMsg}
          </div>
        )}

        <div>
          <label className="text-sm text-neutral-400 mb-1.5 block">Owner Full Name</label>
          <input
            required
            value={form.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className="w-full bg-zinc-950 border border-neutral-800 focus:border-amber-500 outline-none rounded-xl px-4 py-3 text-white transition-colors"
          />
        </div>

        <div>
          <label className="text-sm text-neutral-400 mb-1.5 block">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full bg-zinc-950 border border-neutral-800 focus:border-amber-500 outline-none rounded-xl px-4 py-3 text-white transition-colors"
          />
        </div>

        <div>
          <label className="text-sm text-neutral-400 mb-1.5 block">Password</label>
          <input
            required
            type="password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="w-full bg-zinc-950 border border-neutral-800 focus:border-amber-500 outline-none rounded-xl px-4 py-3 text-white transition-colors"
          />
        </div>

        <div>
          <label className="text-sm text-neutral-400 mb-1.5 block">Confirm Password</label>
          <input
            required
            type="password"
            value={form.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            className="w-full bg-zinc-950 border border-neutral-800 focus:border-amber-500 outline-none rounded-xl px-4 py-3 text-white transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black py-3 rounded-2xl transition-all active:scale-95 disabled:opacity-60"
        >
          {saving ? "Creating..." : "Create Restaurant Account"}
        </button>
      </form>
    </div>
  );
};

// ===================== Users tab =====================
const UsersTab = () => {
  const [status, setStatus] = useState("loading");
  const [users, setUsers] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [blockingId, setBlockingId] = useState(null);

  async function handleDeleteUser(id) {
    if (!window.confirm("Delete this user account? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert("Failed to delete user.");
    } finally {
      setDeletingId(null);
    }
  }
  async function handleBlockToggle(user) {
    setBlockingId(user._id);

    try {
      if (user.isBlocked) {
        await unblockUser(user._id);
      } else {
        await blockUser(user._id);
      }

      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id
            ? { ...u, isBlocked: !u.isBlocked }
            : u
        )
      );
    } catch (err) {
      alert("Failed to update user status.");
    } finally {
      setBlockingId(null);
    }
  }

  useEffect(() => {
    let cancelled = false;

    const timeout = setTimeout(() => {
      if (!cancelled) setStatus("blocked");
    }, 4000);

    getUsers()
      .then((data) => {
        clearTimeout(timeout);
        if (!cancelled) {
          setUsers(data.users || []);
          setStatus("done");
        }
      })
      .catch(() => {
        clearTimeout(timeout);
        if (!cancelled) setStatus("blocked");
      });

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  if (status === "loading") {
    return <p className="text-neutral-400">Loading users...</p>;
  }

  if (status === "blocked") {
    return (
      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-6 py-8 text-center">
        <p className="text-amber-300 font-semibold mb-2">
          Backend fix required
        </p>
        <p className="text-neutral-400 text-sm">
          <code className="text-neutral-300">GET /api/admin/users</code> doesn't
          send a response back, so this list can't load yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-neutral-400 border-b border-neutral-800">
            <th className="py-3 pr-4 font-semibold">Name</th>
            <th className="py-3 pr-4 font-semibold">Email</th>
            <th className="py-3 pr-4 font-semibold">Phone</th>
            <th className="py-3 pr-4 font-semibold">Joined</th>
            <th className="py-3 pr-4 font-semibold">Status</th>
            <th className="py-3 pr-4 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-6 text-neutral-500 text-center">
                No customer accounts found.
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u._id} className="border-b border-neutral-900">
                <td className="py-3 pr-4 text-white font-medium">
                  {u.fullName}
                </td>
                <td className="py-3 pr-4 text-neutral-300">{u.email}</td>
                <td className="py-3 pr-4 text-neutral-500">{u.phone || "—"}</td>
                <td className="py-3 pr-4 text-neutral-500">
                  {new Date(u.createdAt).toLocaleDateString("en-IN")}
                </td>

                <td className="py-3 pr-4">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${u.isBlocked
                        ? "bg-red-500/10 text-red-400"
                        : "bg-green-500/10 text-green-400"
                      }`}
                  >
                    {u.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>

                <td className="py-3 pr-4 flex gap-2">
                  <button
                    disabled={blockingId === u._id}
                    onClick={() => handleBlockToggle(u)}
                    className={`text-xs font-bold rounded-lg px-3 py-1.5 disabled:opacity-50 ${u.isBlocked
                        ? "border border-green-500 text-green-400"
                        : "border border-amber-500 text-amber-400"
                      }`}
                  >
                    {blockingId === u._id
                      ? "..."
                      : u.isBlocked
                        ? "Unblock"
                        : "Block"}
                  </button>

                  <button
                    disabled={deletingId === u._id}
                    onClick={() => handleDeleteUser(u._id)}
                    className="text-xs font-bold text-red-400 border border-red-500/30 rounded-lg px-3 py-1.5 hover:bg-red-500/10 disabled:opacity-50"
                  >
                    {deletingId === u._id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

// ===================== Restaurants tab =====================
const RestaurantsTab = () => {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [blockingId, setBlockingId] = useState(null);

  useEffect(() => {
    loadRestaurants();
  }, []);

  function loadRestaurants() {
    setLoading(true);
    getRestaurants()
      .then((data) => setRestaurants(data.restaurants || []))
      .catch(() => setError("Failed to load restaurants."))
      .finally(() => setLoading(false));
  }


  async function handleDeleteRestaurant(id) {
    if (
      !window.confirm(
        "Delete this restaurant? This will also delete all of its food items. This cannot be undone."
      )
    )
      return;
    setBusyId(id);
    try {
      await deleteRestaurant(id);
      setRestaurants((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert("Failed to delete restaurant.");
    } finally {
      setBusyId(null);
    }
  }

  async function handleBlockToggle(restaurant) {
    const ownerId = restaurant.owner?._id;
    if (!ownerId) return;

    setBlockingId(ownerId);
    try {
      if (restaurant.owner?.isBlocked) {
        await unblockUser(ownerId);
      } else {
        await blockUser(ownerId);
      }

      setRestaurants((prev) =>
        prev.map((r) =>
          r._id === restaurant._id
            ? { ...r, owner: { ...r.owner, isBlocked: !r.owner?.isBlocked } }
            : r
        )
      );
    } catch (err) {
      alert("Failed to update restaurant owner status.");
    } finally {
      setBlockingId(null);
    }
  }

  return (
    <div>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      {loading ? (
        <p className="text-neutral-400">Loading restaurants...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-neutral-400 border-b border-neutral-800">
                <th className="py-3 pr-4 font-semibold">Restaurant Name</th>
                <th className="py-3 pr-4 font-semibold">Owner Name</th>
                <th className="py-3 pr-4 font-semibold">Email</th>
                <th className="py-3 pr-4 font-semibold">Joined</th>
                <th className="py-3 pr-4 font-semibold">Status</th>
                <th className="py-3 pr-4 font-semibold">Owner Status</th>
                <th className="py-3 pr-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-6 text-neutral-500 text-center">
                    No restaurant accounts found.
                  </td>
                </tr>
              ) : (
                restaurants.map((r) => (
                  <tr key={r._id} className="border-b border-neutral-900">
                    <td className="py-3 pr-4 text-white font-medium">
                      {r.restaurantName || "—"}
                    </td>
                    <td className="py-3 pr-4 text-white">
                      {r.owner?.fullName || "—"}
                    </td>
                    <td className="py-3 pr-4 text-neutral-300">{r.owner?.email || "—"}</td>
                    <td className="py-3 pr-4 text-neutral-500">
                      {new Date(r.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${r.isOpen
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                          }`}
                      >
                        {r.isOpen ? "Open" : "Closed"}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${r.owner?.isBlocked
                            ? "bg-red-500/10 text-red-400"
                            : "bg-green-500/10 text-green-400"
                          }`}
                      >
                        {r.owner?.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="py-3 pr-4 flex gap-2">
                      <button
                        disabled={blockingId === r.owner?._id}
                        onClick={() => handleBlockToggle(r)}
                        className={`text-xs font-bold rounded-lg px-3 py-1.5 disabled:opacity-50 ${r.owner?.isBlocked
                            ? "border border-green-500 text-green-400"
                            : "border border-amber-500 text-amber-400"
                          }`}
                      >
                        {blockingId === r.owner?._id
                          ? "..."
                          : r.owner?.isBlocked
                            ? "Unblock"
                            : "Block"}
                      </button>
                      <button
                        disabled={busyId === r._id}
                        onClick={() => handleDeleteRestaurant(r._id)}
                        className="text-xs font-bold text-red-400 border border-red-500/30 rounded-lg px-3 py-1.5 hover:bg-red-500/10 disabled:opacity-50"
                      >
                        {busyId === r._id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ===================== Orders tab =====================
const orderStatuses = [
  "Placed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

const OrdersTab = () => {
  const [status, setStatus] = useState("loading");
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [restaurantFilter, setRestaurantFilter] = useState("");
  const [restaurantOptions, setRestaurantOptions] = useState([]);

  useEffect(() => {
    getRestaurants()
      .then((data) => setRestaurantOptions(data.restaurants || []))
      .catch(() => setRestaurantOptions([]));
  }, []);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    const filters = {};
    if (statusFilter) filters.status = statusFilter;
    if (restaurantFilter) filters.restaurantId = restaurantFilter;

    const timeout = setTimeout(() => {
      if (!cancelled) setStatus("blocked");
    }, 4000);

    getAllOrders(filters)
      .then((data) => {
        clearTimeout(timeout);
        if (!cancelled) {
          setOrders(data.orders || []);
          setStatus("done");
        }
      })
      .catch(() => {
        clearTimeout(timeout);
        if (!cancelled) setStatus("blocked");
      });

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [statusFilter, restaurantFilter]);

  if (status === "blocked") {
    return (
      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-6 py-8 text-center">
        <p className="text-amber-300 font-semibold mb-2">
          Backend support required
        </p>
        <p className="text-neutral-400 text-sm">
          <code className="text-neutral-300">GET /api/admin/orders</code>{" "}
          doesn't exist yet.
        </p>
      </div>
    );
  }

  return (
    <div>

      <div className="flex items-center gap-2 mb-5 flex-wrap">
        <button
          onClick={() => setStatusFilter("")}
          className={`px-3 py-1.5 rounded-full text-xs font-bold ${statusFilter === ""
            ? "bg-amber-500 text-neutral-950"
            : "bg-zinc-900 text-neutral-400"
            }`}
        >
          All Statuses
        </button>
        {orderStatuses.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold ${statusFilter === s
              ? "bg-amber-500 text-neutral-950"
              : "bg-zinc-900 text-neutral-400"
              }`}
          >
            {s}
          </button>
        ))}

        <select
          value={restaurantFilter}
          onChange={(e) => setRestaurantFilter(e.target.value)}
          className="ml-auto bg-zinc-900 border border-neutral-800 text-neutral-300 text-xs font-bold rounded-full px-3 py-1.5"
        >
          <option value="">All Restaurants</option>
          {restaurantOptions.map((r) => (
            <option key={r._id} value={r._id}>
              {r.restaurantName}
            </option>
          ))}
        </select>
      </div>

      {status === "loading" ? (
        <p className="text-neutral-400">Loading orders...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-neutral-400 border-b border-neutral-800">
                <th className="py-3 pr-4 font-semibold">Order ID</th>
                <th className="py-3 pr-4 font-semibold">Restaurant</th>
                <th className="py-3 pr-4 font-semibold">Customer</th>
                <th className="py-3 pr-4 font-semibold">Items</th>
                <th className="py-3 pr-4 font-semibold">Status</th>
                <th className="py-3 pr-4 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-neutral-500 text-center">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((o) => (
                  <tr key={o._id} className="border-b border-neutral-900">
                    <td className="py-3 pr-4 text-white font-medium">
                      {o.orderId}
                    </td>
                    <td className="py-3 pr-4 text-neutral-300">
                      {o.restaurantId?.restaurantName || "—"}
                    </td>
                    <td className="py-3 pr-4 text-neutral-300">
                      {o.userId?.fullName || "—"}
                    </td>
                    <td className="py-3 pr-4 text-neutral-400 max-w-[220px]">
                      {o.items
                        ?.map(
                          (it) =>
                            `${it.foodItemId?.name || "Item"} x${it.quantity}`
                        )
                        .join(", ") || "—"}
                    </td>
                    <td className="py-3 pr-4 text-amber-400 font-semibold">
                      {o.orderStatus}
                    </td>
                    <td className="py-3 pr-4 text-neutral-300">
                      ₹{o.totalAmount}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
// ===================== Foods tab =====================
const FoodsTab = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    getAllFoodsAdmin()
      .then((data) => setItems(data.fooditems || []))
      .catch(() => setError("Failed to load food items — admin foods route may not exist on the backend yet."))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this food item? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await deleteFoodItemAdmin(id);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
       alert("Failed to delete food item.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      {loading ? (
        <p className="text-neutral-400">Loading food items...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-neutral-400 border-b border-neutral-800">
                <th className="py-3 pr-4 font-semibold">Name</th>
                <th className="py-3 pr-4 font-semibold">Restaurant</th>
                <th className="py-3 pr-4 font-semibold">Category</th>
                <th className="py-3 pr-4 font-semibold">Price</th>
                <th className="py-3 pr-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 text-neutral-500 text-center">
                    No food items found.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item._id} className="border-b border-neutral-900">
                    <td className="py-3 pr-4 text-white font-medium">
                      {item.name}
                    </td>
                    <td className="py-3 pr-4 text-neutral-300">
                      {item.restaurantId?.restaurantName || "—"}
                    </td>
                    <td className="py-3 pr-4 text-neutral-400">
                      {item.category}
                    </td>
                    <td className="py-3 pr-4 text-neutral-300">
                      ₹{item.price}
                    </td>
                    <td className="py-3 pr-4">
                      <button
                        disabled={deletingId === item._id}
                        onClick={() => handleDelete(item._id)}
                        className="text-xs font-bold text-red-400 border border-red-500/30 rounded-lg px-3 py-1.5 hover:bg-red-500/10 disabled:opacity-50"
                      >
                        {deletingId === item._id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;