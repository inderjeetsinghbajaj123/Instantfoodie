import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cart.controllers.js";

const router = express.Router();

// Add item to cart
router.post("/", authMiddleware, addToCart);

// Get logged-in user's cart
router.get("/", authMiddleware, getCart);

// Update quantity of a cart item
router.patch("/:cartId", authMiddleware, updateCartItem);

// Remove a single item from cart
router.delete("/:cartId", authMiddleware, removeCartItem);

// Clear entire cart
router.delete("/", authMiddleware, clearCart);

export default router;
