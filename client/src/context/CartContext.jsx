import { createContext, useContext, useEffect, useState } from "react";
import * as cartService from "../services/cart.service";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await cartService.getCart();
      setCartItems(data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const getItemQuantity = (foodId) => {
    const item = cartItems.find(
      (i) => i.foodItemId?._id === foodId
    );

    return item ? item.quantity : 0;
  };

  const increaseQuantity = async (dish) => {
    try {
      const existing = cartItems.find(
        (i) => i.foodItemId?._id === dish._id
      );

      if (existing) {
        await cartService.updateCart(
          existing._id,
          existing.quantity + 1
        );
      } else {
        await cartService.addToCart(dish._id, 1);
      }

      loadCart();
    } catch (err) {
      console.log(err);
    }
  };

  const decreaseQuantity = async (foodId) => {
    try {
      const existing = cartItems.find(
        (i) => i.foodItemId?._id === foodId
      );

      if (!existing) return;

      if (existing.quantity === 1) {
        await cartService.removeCart(existing._id);
      } else {
        await cartService.updateCart(
          existing._id,
          existing.quantity - 1
        );
      }

      loadCart();
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromCart = async (cartId) => {
    await cartService.removeCart(cartId);
    loadCart();
  };

  const clearCart = async () => {
    await cartService.clearCart();
    loadCart();
  };

  // ===== NEW: reorder items from a past order =====
  const reorderItems = async (items) => {
    try {
      for (const item of items) {
        const existing = cartItems.find(
          (i) => i.foodItemId?._id === item.foodItemId
        );

        if (existing) {
          await cartService.updateCart(existing._id, existing.quantity + item.quantity);
        } else {
          await cartService.addToCart(item.foodItemId, item.quantity);
        }
      }
      await loadCart();
      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  };

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (sum, item) =>
      sum + item.foodItemId.price * item.quantity,
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
        clearCart,
        loadCart,
        reorderItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);