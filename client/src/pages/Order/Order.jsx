import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineXCircle, HiArrowPath } from "react-icons/hi2";
import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";
import { getMyOrders, cancelOrder } from "../../services/order.service";

const cancellableStatuses = ["Placed", "Preparing"];

const filterTabs = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "Delivered", label: "Delivered" },
  { key: "Cancelled", label: "Cancelled" },
];

const activeStatuses = ["Placed", "Preparing", "Out for Delivery"];

const Order = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [confirmingId, setConfirmingId] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    setFetchError("");
    try {
      const data = await getMyOrders();
      setOrders(data.orders || []);
    } catch (error) {
      setFetchError(
        error?.response?.data?.message ||
          "Couldn't load your orders. Please try again.",
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCancelOrder(orderId) {
    setCancellingId(orderId);
    try {
      await cancelOrder(orderId);
      await fetchOrders();
    } catch (error) {
      console.log(error);
    } finally {
      setCancellingId(null);
      setConfirmingId(null);
    }
  }

  const filteredOrders = orders.filter((order) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "active")
      return activeStatuses.includes(order.orderStatus);
    return order.orderStatus === activeFilter;
  });

  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar cartCount={cartCount} />

      <div className="w-[95%] max-w-3xl mx-auto mt-12 pb-20 px-2 sm:px-4">
        {/* Heading */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Your Orders
            </h2>

            <p className="text-neutral-400 mt-2">
              Track your delicious orders in real time.
            </p>
          </div>

          {!loading && !fetchError && orders.length > 0 && (
            <button
              onClick={fetchOrders}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-neutral-800 hover:border-amber-500/40 text-neutral-300 hover:text-amber-500 text-sm font-semibold transition-all shrink-0"
            >
              <HiArrowPath size={16} />
              Refresh
            </button>
          )}
        </div>

        {!loading && !fetchError && orders.length > 0 && (
          <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-hide pb-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all shrink-0 ${
                  activeFilter === tab.key
                    ? "bg-amber-500 text-neutral-950"
                    : "bg-zinc-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-neutral-400 text-sm">Loading your orders...</p>
          </div>
        ) : fetchError ? (
          <div className="col-span-full w-full flex flex-col items-center justify-center py-16 px-6 border-2 border-red-500/20 rounded-[28px] bg-red-500/5">
            <p className="text-red-400 font-semibold text-center">
              {fetchError}
            </p>
            <button
              onClick={fetchOrders}
              className="mt-4 px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold transition-all"
            >
              Try again
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="col-span-full w-full flex flex-col items-center justify-center py-16 px-6 border-2 border-amber-500/20 rounded-[28px] bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06),transparent_60%)] bg-zinc-900/40 backdrop-blur-md shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_-10px_rgba(245,158,11,0.15)] border-dashed">
            <div className="w-16 h-16 rounded-full bg-zinc-950 flex items-center justify-center border border-amber-500/30 mb-5 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(245,158,11,0.2)]">
              <span className="text-2xl animate-pulse">📦</span>
            </div>

            <h3 className="text-white font-extrabold text-2xl tracking-tight">
              No Orders Yet
            </h3>

            <p className="text-neutral-400 text-sm mt-3 max-w-sm text-center">
              Your placed orders will appear here once you complete your first
              checkout.
            </p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="col-span-full w-full flex flex-col items-center justify-center py-16 px-6 border-2 border-neutral-800 rounded-[28px] bg-zinc-900/40">
            <p className="text-neutral-400 font-semibold">
              No orders in this category.
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.orderId}
              className="relative rounded-2xl p-[1px] overflow-hidden transition-all duration-300 group mb-4 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.8)] hover:shadow-[0_15px_30px_-8px_rgba(245,158,11,0.15)]"
            >
              <div className="absolute inset-0 z-0 bg-[conic-gradient(from_0deg,transparent_40%,#f59e0b_50%,transparent_60%)] opacity-40 group-hover:opacity-80 transition-opacity duration-500 scale-110 animate-streak-active pointer-events-none" />

              <div className="relative z-10 bg-[#121212]/95 backdrop-blur-xl rounded-[15px] p-4">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-white text-base font-black tracking-tight">
                      Order #{order.orderId}
                    </h3>
                    <p className="text-neutral-500 text-xs mt-0.5">
                      {new Date(order.createdAt).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {order.orderStatus !== "Cancelled" &&
                    order.orderStatus !== "Delivered" && (
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                        {order.orderStatus}
                      </span>
                    )}
                </div>

                {order.orderStatus === "Cancelled" && (
                  <div className="flex items-center gap-2 mb-3 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
                    <HiOutlineXCircle size={16} className="text-red-400 shrink-0" />
                    <p className="text-red-400 font-semibold text-xs">
                      This order was cancelled.
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.foodItemId}
                      className="flex items-center justify-between bg-zinc-900/70 border border-neutral-800 rounded-xl px-3 py-2.5 hover:border-amber-500/30 transition-all"
                    >
                      <div>
                        <h4 className="text-white font-bold text-sm">
                          {item.name}
                        </h4>
                        <p className="text-neutral-500 text-xs">
                          Qty {item.quantity} · ₹{item.price}
                        </p>
                      </div>
                      <p className="text-amber-500 font-bold text-sm">
                        ₹{item.subtotal}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-neutral-800 mt-3 pt-3 flex justify-between items-center">
                  <span className="text-neutral-400 text-sm font-semibold">
                    Total
                  </span>
                  <span className="text-lg font-black text-amber-500">
                    ₹{order.totalAmount}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => navigate(`/tracking/${order.orderId}`)}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500 py-2 text-neutral-950 font-bold text-xs hover:bg-amber-400 transition-all duration-300 active:scale-95"
                  >
                    Track Order
                  </button>

                  {cancellableStatuses.includes(order.orderStatus) &&
                    (confirmingId === order.orderId ? (
                      <div className="flex-1 flex items-center gap-1.5">
                        <button
                          onClick={() => handleCancelOrder(order.orderId)}
                          disabled={cancellingId === order.orderId}
                          className="flex-1 px-2 py-2 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold text-xs transition-all disabled:opacity-50"
                        >
                          {cancellingId === order.orderId ? "..." : "Confirm"}
                        </button>
                        <button
                          onClick={() => setConfirmingId(null)}
                          className="flex-1 px-2 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs transition-all"
                        >
                          Keep
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmingId(order.orderId)}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/5 py-2 text-red-400 font-bold text-xs hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-95"
                      >
                        <HiOutlineXCircle size={14} />
                        Cancel
                      </button>
                    ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Order;