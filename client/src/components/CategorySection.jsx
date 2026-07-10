import { useState } from "react";
import { categories, dishes } from "../data/foodData";
import { HiStar, HiPlus, HiMinus, HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

const CategorySection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { getItemQuantity, increaseQuantity, decreaseQuantity } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const filteredDishes = selectedCategory
    ? dishes.filter((d) => d.category === selectedCategory)
    : dishes;

  return (
    <div className="w-[95%] max-w-6xl mx-auto mt-10 pb-20">
      {/* ===== Explore by Category ===== */}
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore by Category</h2>

      <div className="flex gap-8 overflow-x-auto px-4 py-4 pb-4 scrollbar-hide snap-x snap-mandatory">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="flex flex-col items-center gap-3 shrink-0 snap-start"
            >
              <div
                className={`w-32 h-32 rounded-full overflow-hidden border-4 transition-all ${
                  isActive ? "border-orange-500 scale-105" : "border-transparent"
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className={`text-base font-semibold ${
                  isActive ? "text-orange-500" : "text-gray-700"
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>

      <hr className="border-gray-200 mt-2 mb-8" />

      {/* ===== Top Dishes ===== */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        {selectedCategory
          ? `${categories.find((c) => c.id === selectedCategory)?.name} for You`
          : "Top Dishes for You"}
      </h2>

      <div className="flex flex-wrap gap-6">
        {filteredDishes.map((dish) => {
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

                {/* Favorite heart, top-right */}
                <button
                  onClick={() => toggleFavorite(dish)}
                  className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                >
                  {isFavorite(dish.id) ? (
                    <HiHeart size={18} className="text-red-500" />
                  ) : (
                    <HiOutlineHeart size={18} className="text-gray-600" />
                  )}
                </button>

                {/* Quantity control, bottom-right of image */}
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

        {filteredDishes.length === 0 && (
          <p className="text-gray-400 w-full text-center py-10">
            No dishes found in this category yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategorySection;