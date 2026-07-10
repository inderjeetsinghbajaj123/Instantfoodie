import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const getItemQuantity = (itemId) => {
    const item = cartItems.find((i) => i.id === itemId);
    return item ? item.quantity : 0;
  };

  const increaseQuantity = (dish) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === dish.id);
      if (existing) {
        return prev.map((i) =>
          i.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  const decreaseQuantity = (dishId) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === dishId);
      if (!existing) return prev;
      if (existing.quantity === 1) {
        return prev.filter((i) => i.id !== dishId);
      }
      return prev.map((i) =>
        i.id === dishId ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

  const removeFromCart = (dishId) => {
    setCartItems((prev) => prev.filter((i) => i.id !== dishId));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        getItemQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);