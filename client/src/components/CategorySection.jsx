// import { useState } from "react";
// import { categories, dishes } from "../data/foodData";


import { useEffect, useState } from "react";
import { getAllFoodItems } from "../services/food.service";
import { HiStar, HiPlus, HiMinus, HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

const CategorySection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const { getItemQuantity, increaseQuantity, decreaseQuantity } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    async function fetchFood() {
      try {
        const data = await getAllFoodItems();
        console.log("Backend Data:", data);

        // Unpack whatever array the backend sends
        const itemsArray = Array.isArray(data)
          ? data
          : (data?.FoodItems || data?.foodItems || data?.fooditems || data?.data || []);

        setDishes(itemsArray);

        if (itemsArray.length > 0) {
          // Extract unique categories directly from the restaurant's uploaded items
          const uniqueCategories = [
            ...new Set(itemsArray.map(item => item.category).filter(Boolean))
          ];

          setCategories(
            uniqueCategories.map(cat => {
              return {
                id: cat,
                name: cat,
                // The restaurant uploads this URL link from their dashboard panel:
                categoryImageUrl: cat.categoryImageUrl || null
              };
            })
          );
        }
      } catch (error) {
        console.error("Backend connection error:", error);
      }
    }
    fetchFood();
  }, []);



  const handleCategoryClick = (categoryId) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const filteredDishes = selectedCategory
    ? dishes.filter((d) => d.category === selectedCategory)
    : dishes;

  return (
    <div className="w-[95%] max-w-7xl mx-auto mt-12 pb-20 px-2 sm:px-4">
      {/* ===== Explore by Category ===== */}
      <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 tracking-tight">Explore by Category</h2>

      {/* FIXED ROW BOUNDS: Added px-4, py-4, and -my-4 to perfectly stop left-edge circle clipping */}
      <div className="flex gap-6 sm:gap-8 overflow-x-auto px-4 py-4 pb-6 -my-4 scrollbar-none snap-x snap-mandatory">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="flex flex-col items-center gap-3 shrink-0 snap-start group"
            >
              {/* Category Circle Outer Frame - Left 'overflow-hidden' removed to prevent clipping */}
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 transition-all duration-300 relative ${isActive
                    ? "border-amber-500 scale-105 shadow-lg shadow-amber-500/20"
                    : "border-neutral-800 bg-zinc-900/50 group-hover:border-neutral-700"
                  }`}
              >
                {/* Category Interior - Safe overflow masking handled here on the inner bubble layer */}
                <div className={`w-full h-full rounded-full overflow-hidden flex items-center justify-center transition-colors duration-300 ${isActive ? "bg-amber-500/10" : "bg-transparent"
                  }`}>
                  {cat.categoryImageUrl ? (
                    <img
                      src={cat.categoryImageUrl}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-xl font-black text-amber-500 uppercase tracking-tight">
                      {cat.name ? cat.name.charAt(0) : "🍽️"}
                    </span>
                  )}
                </div>
              </div>

              {/* Category Subtitle Label */}
              <span
                className={`text-xs sm:text-sm font-bold tracking-wide transition-colors ${isActive ? "text-amber-500" : "text-neutral-400 group-hover:text-white"
                  }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>


      <hr className="border-neutral-900 mt-2 mb-8" />

      {/* ===== Top Dishes ===== */}
      <h2 className="text-xl sm:text-2xl font-black text-white mb-6 tracking-tight">
        {selectedCategory
          ? `${categories.find((c) => c.id === selectedCategory)?.name} for You`
          : "Top Dishes for You"}
      </h2>

      {/* DISH GRID CANVAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredDishes.map((dish) => {
          const quantity = getItemQuantity(dish._id);

          return (
            /* DYNAMIC GLOWING STREAK CARD WRAPPER */
            <div
              key={dish._id}
              className="relative w-full rounded-3xl p-[1.5px] overflow-hidden transition-all duration-500 group shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] hover:shadow-[0_30px_60px_-10px_rgba(245,158,11,0.2)] transform hover:-translate-y-1"
            >
              {/* Animated Conic Streak Behind Card Rim */}
              <div className="absolute inset-0 z-0 bg-[conic-gradient(from_0deg,transparent_40%,#f59e0b_50%,transparent_60%)] opacity-50 group-hover:opacity-100 transition-opacity duration-500 scale-110 origin-center animate-streak-active pointer-events-none" />

              {/* Card Inner Housing Layer */}
              <div className="relative z-10 w-full h-full bg-[#121212]/95 backdrop-blur-xl rounded-[23px] overflow-hidden flex flex-col justify-between">

                {/* Media Section */}
                <div className="relative overflow-hidden aspect-video sm:h-48 w-full">
                  <img
                    src={dish.imageUrl}
                    alt={dish.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/400x300/1a1a1a/f59e0b?text=No+Image";
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out bg-neutral-900"
                  />

                  {/* Favorite heart overlay button */}
                  <button
                    onClick={() => toggleFavorite(dish)}
                    className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-zinc-950/80 border border-white/10 text-white backdrop-blur-md shadow-lg hover:scale-110 active:scale-95 transition-all"
                  >
                    {isFavorite(dish._id) ? (
                      <HiHeart size={18} className="text-red-500" />
                    ) : (
                      <HiOutlineHeart size={18} className="text-neutral-400 hover:text-white" />
                    )}
                  </button>


                  {/* Cart control cluster overlay */}
                  <div className="absolute bottom-3 right-3">
                    {quantity === 0 ? (
                      <button
                        onClick={() => increaseQuantity(dish)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-950/80 border border-white/10 text-white backdrop-blur-md shadow-lg hover:bg-amber-500 hover:text-neutral-950 hover:border-amber-600 transition-all active:scale-95"
                      >
                        <HiPlus size={18} />
                      </button>
                    ) : (
                      <div className="flex items-center gap-3 bg-zinc-950/90 border border-white/10 rounded-full shadow-lg px-2.5 py-1.5 backdrop-blur-md">
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

                {/* Text Data Fields */}
                <div className="p-5 bg-gradient-to-b from-transparent to-black/30">
                  <h3 className="font-extrabold text-white text-base sm:text-lg mb-1 tracking-tight truncate group-hover:text-amber-400 transition-colors duration-300">
                    {dish.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs font-bold text-neutral-400 mb-4">
                    <HiStar className="text-amber-500" size={15} />
                    <span className="text-neutral-200">{dish.rating}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold border-t border-neutral-900/60 pt-4">
                    <span className="text-neutral-500 tracking-wide">Delivery · {dish.deliveryTime}</span>
                    <span className="font-black text-amber-500 text-base sm:text-lg tracking-tight">₹{dish.price}</span>
                  </div>
                </div>

              </div>
            </div>
          );
        })}

        {/* FULL WIDTH HIGH-SHADOW GLOWING EMPTY STATE BANNER */}
        {filteredDishes.length === 0 && (
          <div className="col-span-full w-full flex flex-col items-center justify-center py-16 px-6 border-2 border-amber-500/20 rounded-[28px] bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06),transparent_60%)] bg-zinc-900/40 backdrop-blur-md mt-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_-10px_rgba(245,158,11,0.15)] border-dashed">
            {/* Glowing Icon Floating Badge Frame */}
            <div className="w-16 h-16 rounded-full bg-zinc-950 flex items-center justify-center border border-amber-500/30 mb-5 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(245,158,11,0.2)]">
              <span className="text-2xl animate-[pulse_3s_ease-in-out_infinite]">🍽️</span>
            </div>

            {/* Context Labels */}
            <h3 className="text-white font-extrabold text-xl tracking-tight">Kitchen is warming up!</h3>
            <p className="text-neutral-400 text-sm mt-2 max-w-sm text-center font-medium leading-relaxed">
              No delicious items are cooking in this category right now. Connect your database or check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySection;
