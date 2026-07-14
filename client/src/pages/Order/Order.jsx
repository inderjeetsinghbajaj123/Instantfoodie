import { useEffect, useState } from "react";
import { HiCheckCircle, HiOutlineClock, HiOutlineXCircle } from "react-icons/hi2";
import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";
import { getMyOrders, cancelOrder } from "../../services/order.service";

const steps = [
  { key: "placed", label: "Order Placed" },
  { key: "preparing", label: "Preparing" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

// Statuses in which a user is still allowed to cancel
const cancellableStatuses = ["placed", "preparing"];


const Order = () => {

  const { cartCount } = useCart();

  const [orders, setOrders] = useState([]);
  const [confirmingId, setConfirmingId] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);


  useEffect(() => {

    fetchOrders();

  }, []);



  async function fetchOrders() {

    try {

      const data = await getMyOrders();

      setOrders(data.orders || []);

    } catch (error) {

      console.log(error);

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



  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar cartCount={cartCount} />

      <div className="w-[95%] max-w-7xl mx-auto mt-12 pb-20 px-2 sm:px-4">

        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Your Orders
          </h2>

          <p className="text-neutral-400 mt-2">
            Track your delicious orders in real time.
          </p>
        </div>

        {orders.length === 0 ? (

          <div className="col-span-full w-full flex flex-col items-center justify-center py-16 px-6 border-2 border-amber-500/20 rounded-[28px] bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06),transparent_60%)] bg-zinc-900/40 backdrop-blur-md shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_-10px_rgba(245,158,11,0.15)] border-dashed">

            <div className="w-16 h-16 rounded-full bg-zinc-950 flex items-center justify-center border border-amber-500/30 mb-5 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(245,158,11,0.2)]">
              <span className="text-2xl animate-pulse">📦</span>
            </div>

            <h3 className="text-white font-extrabold text-2xl tracking-tight">
              No Orders Yet
            </h3>

            <p className="text-neutral-400 text-sm mt-3 max-w-sm text-center">
              Your placed orders will appear here once you complete your first checkout.
            </p>

          </div>

        ) : (

          orders.map((order) => {

            const activeStepIndex =
              steps.findIndex(
                (s) => s.key === order.status
              );

            return (

              <div
                key={order._id}
                className="relative rounded-3xl p-[1.5px] overflow-hidden transition-all duration-500 group mb-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] hover:shadow-[0_30px_60px_-10px_rgba(245,158,11,0.2)] hover:-translate-y-1"
              >

                {/* Animated Glow Border */}
                <div className="absolute inset-0 z-0 bg-[conic-gradient(from_0deg,transparent_40%,#f59e0b_50%,transparent_60%)] opacity-50 group-hover:opacity-100 transition-opacity duration-500 scale-110 animate-streak-active pointer-events-none" />

                {/* Card */}
                <div className="relative z-10 bg-[#121212]/95 backdrop-blur-xl rounded-[23px] p-6">

                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

                    <div>

                      <h3 className="text-white text-xl font-black tracking-tight">
                        Order #{order._id.slice(-6)}
                      </h3>

                      <p className="text-neutral-400 text-sm mt-1">
                        {new Date(order.createdAt).toDateString()}
                      </p>

                    </div>

                    <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <HiOutlineClock
                        size={22}
                        className="text-amber-500"
                      />
                    </div>
                  </div>


                  {/* Cancelled banner (replaces progress tracker) */}
                  {order.status === "cancelled" ? (
                    <div className="flex items-center gap-3 mb-10 bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-4">
                      <HiOutlineXCircle size={22} className="text-red-400 shrink-0" />
                      <p className="text-red-400 font-bold text-sm">
                        This order was cancelled.
                      </p>
                    </div>
                  ) : (
                  <div className="flex items-start justify-between mb-10">
                    {steps.map((step, i) => (
                      <div
                        key={step.key}
                        className="flex-1 flex flex-col items-center relative"
                      >
                        {/* Connecting Line */}
                        {i !== steps.length - 1 && (
                          <div
                            className={`absolute top-5 left-1/2 w-full h-[2px] ${i < activeStepIndex
                                ? "bg-amber-500"
                                : "bg-neutral-800"
                              }`}
                          />
                        )}

                        {/* Step Circle */}
                        <div
                          className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${i <= activeStepIndex
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
                          className={`mt-3 text-[10px] sm:text-xs px-1 font-semibold text-center ${i <= activeStepIndex
                              ? "text-white"
                              : "text-neutral-500"
                            }`}
                        >
                          {step.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  )}

                  {/* Ordered Items */}
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-4 bg-zinc-900/70 border border-neutral-800 rounded-2xl p-4 hover:border-amber-500/30 transition-all"
                      >
                        <img
                          src={item.food?.imageUrl}
                          alt={item.food?.name}
                          className="w-16 h-16 rounded-xl object-cover bg-neutral-900"
                        />

                        <div className="flex-1">
                          <h4 className="text-white font-bold text-base">
                            {item.food?.name}
                          </h4>

                          <p className="text-neutral-400 text-sm mt-1">
                            Quantity : {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-neutral-800 mt-8 pt-5 flex justify-between items-center">
                    <span className="text-neutral-400 font-semibold">
                      Total Amount
                    </span>

                    <span className="text-xl sm:text-2xl font-black text-amber-500">
                      ₹{order.totalAmount}
                    </span>
                  </div>

                  {/* Cancel Order */}
                  {cancellableStatuses.includes(order.status) && (
                    confirmingId === order._id ? (
                      <div className="mt-5 flex flex-col sm:flex-row items-center gap-3 bg-red-500/5 border border-red-500/20 rounded-2xl px-5 py-4">
                        <p className="text-sm text-neutral-300 font-semibold flex-1 text-center sm:text-left">
                          Cancel this order? This can't be undone.
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleCancelOrder(order._id)}
                            disabled={cancellingId === order._id}
                            className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold text-sm transition-all disabled:opacity-50"
                          >
                            {cancellingId === order._id ? "Cancelling..." : "Yes, Cancel"}
                          </button>
                          <button
                            onClick={() => setConfirmingId(null)}
                            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm transition-all"
                          >
                            Keep Order
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmingId(order._id)}
                        className="mt-5 w-full flex items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/5 py-3 text-red-400 font-bold text-sm hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-95"
                      >
                        <HiOutlineXCircle size={18} />
                        Cancel Order
                      </button>
                    )
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

};

export default Order;