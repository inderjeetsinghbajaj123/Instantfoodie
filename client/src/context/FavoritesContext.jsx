import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const isFavorite = (dishId) => favorites.some((f) => f.id === dishId);

  const toggleFavorite = (dish) => {
    setFavorites((prev) =>
      prev.some((f) => f.id === dish.id)
        ? prev.filter((f) => f.id !== dish.id)
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