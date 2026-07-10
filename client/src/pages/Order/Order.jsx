import { HiCheckCircle, HiOutlineClock } from "react-icons/hi2";
import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";
import { activeOrder, pastOrders } from "../../data/orderData";

const steps = [
  { key: "placed", label: "Order Placed" },
  { key: "preparing", label: "Preparing" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

const statusBadgeStyles = {
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  preparing: "bg-orange-100 text-orange-700",
};

const statusLabels = {
  delivered: "Delivered",
  cancelled: "Cancelled",
  preparing: "Preparing",
};

const Order = () => {
  const { cartCount } = useCart();

  const activeStepIndex = activeOrder
    ? steps.findIndex((s) => s.key === activeOrder.status)
    : -1;

  return (
    <div className="min-h-screen bg-white">
      <Navbar cartCount={cartCount} />

      <div className="w-[95%] max-w-4xl mx-auto mt-10 pb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Orders</h2>

        {/* ===== Active Order ===== */}
        {activeOrder && (
          <div className="bg-white border-2 border-orange-200 rounded-2xl shadow-sm p-6 mb-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Order #{activeOrder.id}</h3>
                <p className="text-sm text-gray-500">{activeOrder.placedAt}</p>
              </div>
              <div className="flex items-center gap-2 text-orange-600 font-semibold text-sm">
                <HiOutlineClock size={18} />
                Arriving in {activeOrder.eta}
              </div>
            </div>

            {/* Status stepper */}
            <div className="flex items-center mb-8">
              {steps.map((step, i) => {
                const isDone = i <= activeStepIndex;
                return (
                  <div key={step.key} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                          isDone ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {isDone ? <HiCheckCircle size={20} /> : <span className="text-xs font-bold">{i + 1}</span>}
                      </div>
                      <span
                        className={`text-xs font-medium text-center w-20 ${
                          isDone ? "text-orange-600" : "text-gray-400"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className={`h-1 flex-1 mx-1 rounded-full transition-colors ${
                          i < activeStepIndex ? "bg-orange-500" : "bg-gray-100"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Items */}
            <div className="flex flex-col gap-3 mb-4">
              {activeOrder.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-gray-900">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <hr className="border-gray-100 mb-4" />

            <div className="flex items-center justify-between font-bold text-gray-900">
              <span>Total</span>
              <span>₹{activeOrder.total.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* ===== Order History ===== */}
        <h3 className="text-xl font-bold text-gray-900 mb-4">Order History</h3>

        {pastOrders.length === 0 ? (
          <p className="text-gray-400 text-center py-16">No past orders yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {pastOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      statusBadgeStyles[order.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {statusLabels[order.status] || order.status}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  {order.items.map((item) => (
                    <img
                      key={item.id}
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ))}
                  <p className="text-sm text-gray-500 truncate">
                    {order.items.map((i) => `${i.name} x${i.quantity}`).join(", ")}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900">₹{order.total.toFixed(2)}</span>
                  <button className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                    Reorder
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;