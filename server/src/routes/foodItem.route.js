import { Router } from "express";
const router = Router();

import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createFoodItem,
  getAllFoodItems,
  updateFoodInfo,
  getFoodItemsByCategory,
  deleteFoodItem,
  getPublicFoodItems,
  getRestaurantFoods,
} from "../controllers/foodItem.controllers.js";

/**
 * @route POST /api/foodItem/newFoodItem
 * @description Create a new food item for the authenticated restaurant
 * @access Restaurant
 */
router.post("/newFoodItem", authMiddleware, createFoodItem);

/**
 * @route GET /api/foodItem/AllFoodItems
 * @description Get all available food items for authenticated users
 * @access User, Restaurant
 */
router.get("/AllFoodItems", authMiddleware, getAllFoodItems);

/**
 * @route GET /api/foodItem/public
 * @description Get all publicly available food items
 * @access Public
 */
router.get("/public", getPublicFoodItems);

/**
 * @route GET /api/foodItem/category/:category
 * @description Get food items by category for the authenticated restaurant
 * @access Restaurant
 */
router.get("/category/:category", authMiddleware, getFoodItemsByCategory);

/**
 * @route GET /api/foodItem/my-food
 * @description Get all food items belonging to the authenticated restaurant
 * @access Restaurant
 */
router.get("/my-food", authMiddleware, getRestaurantFoods);

/**
 * @route PATCH /api/foodItem/:id
 * @description Update a food item
 * @access Restaurant
 */
router.patch("/:id", authMiddleware, updateFoodInfo);

/**
 * @route DELETE /api/foodItem/:id
 * @description Delete a food item
 * @access Restaurant
 */
router.delete("/:id", authMiddleware, deleteFoodItem);

export default router;