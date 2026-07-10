import { Link } from "react-router-dom";
import { HiOutlineHeart, HiHeart, HiPlus, HiMinus, HiStar } from "react-icons/hi2";
import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";

const Favorites = () => {
  const { cartCount, getItemQuantity, increaseQuantity, decreaseQuantity } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="min-h-screen bg-white">
      <Navbar cartCount={cartCount} />

      <div className="w-[95%] max-w-6xl mx-auto mt-10 pb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Favorites</h2>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <HiOutlineHeart size={56} className="text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No favorites yet</h3>
            <p className="text-gray-400 mb-6">Tap the heart on any dish to save it here.</p>
            <Link
              to="/home"
              className="bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:brightness-110 transition-all"
            >
              Browse dishes
            </Link>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6">
            {favorites.map((dish) => {
              const quantity = getItemQuantity(dish.id);

              return (
                <div
                  key={dish.id}
                  className="w-full sm:w-64 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-52 object-cover"
                    />

                    <button
                      onClick={() => toggleFavorite(dish)}
                      className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <HiHeart size={18} className="text-red-500" />
                    </button>

                    <div className="absolute bottom-3 right-3">
                      {quantity === 0 ? (
                        <button
                          onClick={() => increaseQuantity(dish)}
                          className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 text-gray-700 transition-colors"
                        >
                          <HiPlus size={18} />
                        </button>
                      ) : (
                        <div className="flex items-center gap-3 bg-white rounded-full shadow-md px-2 py-1">
                          <button
                            onClick={() => decreaseQuantity(dish.id)}
                            className="w-7 h-7 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 text-red-500 transition-colors"
                          >
                            <HiMinus size={14} />
                          </button>
                          <span className="text-sm font-semibold text-gray-900 w-4 text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(dish)}
                            className="w-7 h-7 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 text-green-600 transition-colors"
                          >
                            <HiPlus size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">{dish.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                      <HiStar className="text-orange-400" size={16} />
                      <span>{dish.rating}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Delivery · {dish.deliveryTime}</span>
                      <span className="font-bold text-gray-900 text-base">₹{dish.price.toFixed(2)}</span>
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