import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyRestaurants } from "../../services/restaurant.service";
import Navbar from "../../components/Navbar";
import {
  getRestaurantOrders,
  updateOrderStatus,
} from "../../services/order.service";

const validTransitions = {
  Placed: ["Preparing", "Cancelled"],
  Preparing: ["Out for Delivery"],
  "Out for Delivery": ["Delivered"],
  Delivered: [],
  Cancelled: [],
};

function RestaurantOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [view, setView] = useState("active");

  useEffect(() => {
    checkRestaurantAndFetchOrders();
  }, []);

  async function checkRestaurantAndFetchOrders() {
    try {
      const restaurantData = await getMyRestaurants();
      const restaurants = restaurantData.restaurants || [];

      if (restaurants.length === 0) {
        navigate("/restaurant-profile");
        return;
      }

      await fetchOrders();
    } catch (error) {
      console.log("Restaurant check error:", error);
      setLoading(false);
    }
  }

  async function fetchOrders() {
    try {
      const data = await getRestaurantOrders();
      setOrders(data.Orders || []);
    } catch (error) {
      console.log("Restaurant orders error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function changeStatus(orderId, status) {
    try {
      setUpdatingId(orderId);
      setErrorId(null);
      setErrorMsg("");

      await updateOrderStatus(orderId, status);

      await fetchOrders();
    } catch (error) {
      setErrorId(orderId);
      setErrorMsg(
        error?.response?.data?.message ||
          "Couldn't update order status. Please try again.",
      );
      console.log("Update status error:", error);
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading) {
    return <h2 className="text-white p-10">Loading restaurant orders...</h2>;
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar />

      <div className="w-[95%] max-w-6xl mx-auto py-10">
        <h1 className="text-3xl font-black text-white mb-8">
          Restaurant Orders
        </h1>

        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => setView("active")}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
              view === "active"
                ? "bg-amber-500 text-neutral-950"
                : "bg-zinc-900 border border-neutral-800 text-neutral-400 hover:text-white"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setView("history")}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
              view === "history"
                ? "bg-amber-500 text-neutral-950"
                : "bg-zinc-900 border border-neutral-800 text-neutral-400 hover:text-white"
            }`}
          >
            History
          </button>
        </div>

        {(() => {
          const visibleOrders = orders.filter((o) =>
            view === "active"
              ? o.orderStatus !== "Delivered" && o.orderStatus !== "Cancelled"
              : o.orderStatus === "Delivered" || o.orderStatus === "Cancelled",
          );

          if (visibleOrders.length === 0) {
            return (
              <div className="text-neutral-400">
                {view === "active"
                  ? "No active orders right now."
                  : "No completed orders yet."}
              </div>
            );
          }

          return (
            <div className="space-y-6">
              {visibleOrders.map((order) => {
                const options = validTransitions[order.orderStatus] || [];

                return (
                  <div
                    key={order.orderId}
                    className="bg-zinc-900 border border-neutral-800 rounded-3xl p-6"
                  >
                    <div className="flex justify-between items-center mb-5">
                      <h2 className="text-white text-xl font-bold">
                        Order #{order.orderId}
                      </h2>
                      <span className="text-amber-500 font-bold">
                        {order.orderStatus}
                      </span>
                    </div>

                    <p className="text-neutral-400 mb-4">
                      Customer: {order.userId?.name || "Customer"}
                    </p>

                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div
                          key={item.foodItemId}
                          className="flex justify-between bg-black/40 rounded-xl p-3"
                        >
                          <span className="text-white">
                            {item.name} x {item.quantity}
                          </span>
                          <span className="text-amber-500">
                            ₹{item.subtotal}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex justify-between items-center">
                      <p className="text-white font-bold">
                        Total: ₹{order.totalAmount}
                      </p>

                      {options.length > 0 && (
                        <select
                          disabled={updatingId === order.orderId}
                          value={order.orderStatus}
                          onChange={(e) =>
                            changeStatus(order.orderId, e.target.value)
                          }
                          className="bg-black text-white border border-neutral-700 rounded-xl px-4 py-2"
                        >
                          <option value={order.orderStatus}>
                            {order.orderStatus}
                          </option>

                          {options.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>

                    {errorId === order.orderId && errorMsg && (
                      <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-400 text-sm font-semibold text-center">
                        {errorMsg}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>
    </div>
  );
}

export default RestaurantOrders;
