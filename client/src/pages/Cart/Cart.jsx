import { Link, useNavigate } from "react-router-dom";
import { HiPlus, HiMinus, HiOutlineTrash, HiOutlineShoppingBag } from "react-icons/hi2";
import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, cartCount, cartTotal, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const deliveryFee = cartItems.length > 0 ? 30 : 0;
  const grandTotal = cartTotal + deliveryFee;

  const handleGoToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar cartCount={cartCount} />

      <div className="w-[95%] max-w-6xl mx-auto mt-12 pb-20 px-2 sm:px-4">

        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Your Cart
          </h2>
          <p className="text-neutral-400 mt-2">
            Review your items before checking out.
          </p>
        </div>

        {cartItems.length === 0 ? (

          <div className="col-span-full w-full flex flex-col items-center justify-center py-24 px-6 border-2 border-amber-500/20 rounded-[28px] bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06),transparent_60%)] bg-zinc-900/40 backdrop-blur-md shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_-10px_rgba(245,158,11,0.15)] border-dashed">

            <div className="w-16 h-16 rounded-full bg-zinc-950 flex items-center justify-center border border-amber-500/30 mb-5 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(245,158,11,0.2)]">
              <HiOutlineShoppingBag size={26} className="text-amber-500" />
            </div>

            <h3 className="text-white font-extrabold text-2xl tracking-tight">
              Your cart is empty
            </h3>

            <p className="text-neutral-400 text-sm mt-3 max-w-sm text-center mb-6">
              Looks like you haven't added anything yet.
            </p>

            <Link
              to="/home"
              className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black px-6 py-3 rounded-2xl shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:shadow-[0_0_35px_rgba(245,158,11,0.45)] transition-all active:scale-95"
            >
              Browse dishes
            </Link>
          </div>

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Cart items list */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="relative rounded-2xl p-[1.5px] overflow-hidden group/item transition-all duration-500"
                >
                  <div className="absolute inset-0 z-0 bg-[conic-gradient(from_0deg,transparent_40%,#f59e0b_50%,transparent_60%)] opacity-0 group-hover/item:opacity-70 transition-opacity duration-500 animate-streak-active pointer-events-none" />

                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4 bg-zinc-900/90 backdrop-blur-xl border border-neutral-800 rounded-2xl p-4">

                    {/* Top row (mobile): image + name/price + delete. On sm+, this is just the left portion of one row */}
                    <div className="flex items-center gap-4">
                      <img
                        src={item.foodItemId.imageUrl}
                        alt={item.foodItemId.name}
                        className="w-20 h-20 rounded-xl object-cover shrink-0 bg-neutral-950"
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white truncate">{item.foodItemId.name}</h3>
                        <p className="text-amber-500 font-bold mt-1">₹{item.foodItemId.price.toFixed(2)}</p>
                      </div>

                      {/* Delete button shown here only on mobile, next to name */}
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="sm:hidden shrink-0 self-start text-neutral-500 hover:text-red-400 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <HiOutlineTrash size={18} />
                      </button>
                    </div>

                    {/* Bottom row (mobile): quantity control + line total. On sm+, sits to the right of the row above */}
                    <div className="flex items-center justify-between sm:justify-end sm:flex-1 gap-4">
                      {/* Quantity control */}
                      <div className="flex items-center gap-3 bg-zinc-950 border border-neutral-800 rounded-full px-2 py-1.5 sm:py-1 shrink-0">
                        <button
                          onClick={() => decreaseQuantity(item.foodItemId._id)}
                          className="w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors shrink-0"
                        >
                          <HiMinus size={14} />
                        </button>
                        <span className="text-sm font-bold text-white w-4 text-center shrink-0">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.foodItemId)}
                          className="w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center rounded-full bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-colors shrink-0"
                        >
                          <HiPlus size={14} />
                        </button>
                      </div>

                      {/* Line total + remove (remove shown here only on sm+) */}
                      <div className="flex items-center sm:flex-col sm:items-end gap-3 sm:gap-2 shrink-0 sm:w-20">
                        <span className="font-black text-white whitespace-nowrap">
                          ₹{(item.foodItemId.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="hidden sm:inline-flex text-neutral-500 hover:text-red-400 transition-colors"
                          aria-label="Remove item"
                        >
                          <HiOutlineTrash size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="relative rounded-3xl p-[1.5px] overflow-hidden group h-fit sticky top-28 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] hover:shadow-[0_30px_60px_-10px_rgba(245,158,11,0.2)] transition-all duration-500">

              <div className="absolute inset-0 z-0 bg-[conic-gradient(from_0deg,transparent_40%,#f59e0b_50%,transparent_60%)] opacity-50 group-hover:opacity-100 transition-opacity duration-500 scale-110 animate-streak-active pointer-events-none" />

              <div className="relative z-10 bg-[#121212]/95 backdrop-blur-xl rounded-[23px] p-6">

                <h3 className="text-lg font-black text-white mb-5">Order Summary</h3>

                <div className="flex items-center justify-between text-sm text-neutral-400 mb-3">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="text-white font-semibold">₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-neutral-400 mb-5">
                  <span>Delivery fee</span>
                  <span className="text-white font-semibold">₹{deliveryFee.toFixed(2)}</span>
                </div>

                <hr className="border-neutral-800 mb-5" />

                <div className="flex items-center justify-between text-base font-black text-white mb-6">
                  <span>Total</span>
                  <span className="text-amber-500 text-xl">₹{grandTotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleGoToCheckout}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black py-3.5 rounded-2xl shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:shadow-[0_0_35px_rgba(245,158,11,0.45)] transition-all active:scale-95"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;