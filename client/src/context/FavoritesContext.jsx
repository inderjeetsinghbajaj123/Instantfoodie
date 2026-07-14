import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const isFavorite = (dishId) => favorites.some((f) => f._id === dishId);

  const toggleFavorite = (dish) => {
    setFavorites((prev) =>
      prev.some((f) => f._id === dish._id)
        ? prev.filter((f) => f._id !== dish._id)
        : [...prev, dish]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);