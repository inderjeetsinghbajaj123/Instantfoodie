import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  HiCheckCircle,
  HiOutlineXCircle,
  HiArrowLeft,
  HiArrowPath,
} from "react-icons/hi2";
import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";
import { trackOrder } from "../../services/order.service";

const steps = [
  { key: "Placed", label: "Order Placed" },
  { key: "Preparing", label: "Preparing" },
  { key: "Out for Delivery", label: "Out for Delivery" },
  { key: "Delivered", label: "Delivered" },
];

function Tracking() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  async function fetchOrder() {
    setLoading(true);
    setError("");
    try {
      const response = await trackOrder(orderId);
      setOrder(response.order);
    } catch (err) {
      console.log("Tracking error:", err);
      setError("Couldn't load tracking info. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const activeStepIndex = order
    ? steps.findIndex((s) => s.key === order.status)
    : -1;

  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar cartCount={cartCount} />

      <div className="w-[95%] max-w-3xl mx-auto mt-12 pb-20 px-2 sm:px-4">
        <button
          onClick={() => navigate("/order")}
          className="flex items-center gap-2 text-neutral-400 hover:text-amber-500 text-sm font-semibold mb-6 transition-all"
        >
          <HiArrowLeft size={16} />
          Back to Orders
        </button>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-neutral-400 text-sm">
              Loading order tracking...
            </p>
          </div>
        ) : error ? (
          <div className="w-full flex flex-col items-center justify-center py-16 px-6 border-2 border-red-500/20 rounded-[28px] bg-red-500/5">
            <HiOutlineXCircle size={32} className="text-red-400 mb-3" />
            <p className="text-red-400 font-semibold text-center">{error}</p>
            <button
              onClick={fetchOrder}
              className="mt-4 flex items-center gap-2 px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold transition-all"
            >
              <HiArrowPath size={16} />
              Try again
            </button>
          </div>
        ) : !order ? (
          <div className="w-full flex flex-col items-center justify-center py-16 px-6 border-2 border-neutral-800 rounded-[28px] bg-zinc-900/40">
            <p className="text-neutral-400 font-semibold">Order not found.</p>
          </div>
        ) : (
          <div className="relative rounded-3xl p-[1.5px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)]">
            <div className="absolute inset-0 z-0 bg-[conic-gradient(from_0deg,transparent_40%,#f59e0b_50%,transparent_60%)] opacity-60 animate-streak-active pointer-events-none" />

            <div className="relative z-10 bg-[#121212]/95 backdrop-blur-xl rounded-[23px] p-6 sm:p-8">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
                Live Order Tracking
              </h2>

              <p className="text-neutral-400 mb-8">
                Order #{order.orderId}
              </p>

              {order.status === "Cancelled" ? (
                <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-4">
                  <HiOutlineXCircle
                    size={22}
                    className="text-red-400 shrink-0"
                  />
                  <p className="text-red-400 font-bold text-sm">
                    This order was cancelled.
                  </p>
                </div>
              ) : (
                <>
                  <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-10">
                    Current Status: {order.status}
                  </span>

                  <div className="flex items-start justify-between">
                    {steps.map((step, i) => (
                      <div
                        key={step.key}
                        className="flex-1 flex flex-col items-center relative"
                      >
                        {i !== steps.length - 1 && (
                          <div
                            className={`absolute top-5 left-1/2 w-full h-[2px] ${
                              i < activeStepIndex
                                ? "bg-amber-500"
                                : "bg-neutral-800"
                            }`}
                          />
                        )}

                        <div
                          className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                            i <= activeStepIndex
                              ? "bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/30"
                              : "bg-neutral-900 border border-neutral-700 text-neutral-500"
                          }`}
                        >
                          {i <= activeStepIndex ? (
                            <HiCheckCircle size={18} />
                          ) : (
                            i + 1
                          )}
                        </div>

                        <p
                          className={`mt-3 text-[10px] sm:text-xs px-1 font-semibold text-center ${
                            i <= activeStepIndex
                              ? "text-white"
                              : "text-neutral-500"
                          }`}
                        >
                          {step.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tracking;