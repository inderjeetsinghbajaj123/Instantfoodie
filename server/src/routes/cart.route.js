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

/**
 * @route POST /api/cart
 * @description Add a food item to the authenticated user's cart
 * @access User
 */
router.post("/", authMiddleware, addToCart);

/**
 * @route GET /api/cart
 * @description Get the authenticated user's cart
 * @access User
 */
router.get("/", authMiddleware, getCart);

/**
 * @route PATCH /api/cart/:cartId
 * @description Update the quantity of an item in the authenticated user's cart
 * @access User
 */
router.patch("/:cartId", authMiddleware, updateCartItem);

/**
 * @route DELETE /api/cart/:cartId
 * @description Remove a specific item from the authenticated user's cart
 * @access User
 */
router.delete("/:cartId", authMiddleware, removeCartItem);

/**
 * @route DELETE /api/cart
 * @description Clear all items from the authenticated user's cart
 * @access User
 */
router.delete("/", authMiddleware, clearCart);

export default router;
