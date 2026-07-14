import { Link } from "react-router-dom";
import {
  HiOutlineHeart,
  HiHeart,
  HiPlus,
  HiMinus,
  HiStar,
} from "react-icons/hi2";

import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";

const Favorites = () => {
  const {
    cartCount,
    getItemQuantity,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar cartCount={cartCount} />

      <div className="w-[95%] max-w-7xl mx-auto mt-12 pb-20 px-2 sm:px-4">
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-8 tracking-tight">
          Your Favorites
        </h2>

        {favorites.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center py-20 px-6 border-2 border-amber-500/20 rounded-[28px] bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06),transparent_60%)] bg-zinc-900/40 backdrop-blur-md shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_-10px_rgba(245,158,11,0.15)] border-dashed">

            <div className="w-16 h-16 rounded-full bg-zinc-950 flex items-center justify-center border border-amber-500/30 mb-5 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(245,158,11,0.2)]">
              <HiOutlineHeart
                size={28}
                className="text-amber-500 animate-pulse"
              />
            </div>

            <h3 className="text-white text-2xl font-black">
              No Favorites Yet
            </h3>

            <p className="text-neutral-400 mt-3 max-w-md text-center">
              Save your favorite dishes by tapping the heart icon on any food
              item.
            </p>

            <Link
              to="/home"
              className="mt-8 px-7 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black transition-all shadow-lg"
            >
              Browse Dishes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((dish) => {
              const quantity = getItemQuantity(dish._id);

              return (
                <div
                  key={dish._id}
                  className="relative w-full rounded-3xl p-[1.5px] overflow-hidden transition-all duration-500 group shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] hover:shadow-[0_30px_60px_-10px_rgba(245,158,11,0.2)] hover:-translate-y-1"
                >
                  {/* Animated Border */}
                  <div className="absolute inset-0 z-0 bg-[conic-gradient(from_0deg,transparent_40%,#f59e0b_50%,transparent_60%)] opacity-50 group-hover:opacity-100 transition-opacity duration-500 scale-110 animate-streak-active pointer-events-none" />

                  {/* Card */}
                  <div className="relative z-10 w-full h-full bg-[#121212]/95 backdrop-blur-xl rounded-[23px] overflow-hidden flex flex-col justify-between">

                    {/* Image */}
                    <div className="relative overflow-hidden aspect-video sm:h-48 w-full">
                      <img
                        src={dish.imageUrl}
                        alt={dish.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://placehold.co/400x300/1a1a1a/f59e0b?text=No+Image";
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out bg-neutral-900"
                      />

                      {/* Favorite */}
                      <button
                        onClick={() => toggleFavorite(dish)}
                        className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-zinc-950/80 border border-white/10 text-white backdrop-blur-md shadow-lg hover:scale-110 active:scale-95 transition-all"
                      >
                        <HiHeart size={18} className="text-red-500" />
                      </button>

                      {/* Quantity */}
                      <div className="absolute bottom-3 right-3">
                        {quantity === 0 ? (
                          <button
                            onClick={() => increaseQuantity(dish)}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-950/80 border border-white/10 text-white backdrop-blur-md shadow-lg hover:bg-amber-500 hover:text-neutral-950 hover:border-amber-600 transition-all active:scale-95"
                          >
                            <HiPlus size={18} />
                          </button>
                        ) : (                          <div className="flex items-center gap-3 bg-zinc-950/90 border border-white/10 rounded-full shadow-lg px-2.5 py-1.5 backdrop-blur-md">
                            <button
                              onClick={() => decreaseQuantity(dish._id)}
                              className="w-7 h-7 flex items-center justify-center rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
                            >
                              <HiMinus size={14} />
                            </button>

                            <span className="text-sm font-black text-white w-4 text-center">
                              {quantity}
                            </span>

                            <button
                              onClick={() => increaseQuantity(dish)}
                              className="w-7 h-7 flex items-center justify-center rounded-full bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-colors"
                            >
                              <HiPlus size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Details */}
                    <div className="p-5 bg-gradient-to-b from-transparent to-black/30">
                      <h3 className="font-extrabold text-white text-base sm:text-lg mb-1 tracking-tight truncate group-hover:text-amber-400 transition-colors duration-300">
                        {dish.name}
                      </h3>

                      <div className="flex items-center gap-1 text-xs font-bold text-neutral-400 mb-4">
                        <HiStar
                          className="text-amber-500"
                          size={15}
                        />
                        <span className="text-neutral-200">
                          {dish.rating || "4.8"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs font-semibold border-t border-neutral-900/60 pt-4">
                        <span className="text-neutral-500 tracking-wide">
                          Delivery · {dish.deliveryTime || "20 min"}
                        </span>

                        <span className="font-black text-amber-500 text-base sm:text-lg tracking-tight">
                          ₹{dish.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;