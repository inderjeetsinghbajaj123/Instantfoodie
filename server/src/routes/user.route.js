import { Router } from "express";
import {
  getProfile,
  updateProfile,
  getrestaurants,
  getFoodItemsByRestaurant,
  updatePassword,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRole from "../middlewares/role.middleware.js";

const router = Router();

/**
 * @route GET /api/user/profile
 * @description Get the profile of the authenticated user
 * @access User
 */
router.get("/profile", authMiddleware, getProfile);

/**
 * @route PUT /api/user/profile
 * @description Update the profile of the authenticated user
 * @access User
 */
router.put("/profile", authMiddleware, updateProfile);

/**
 * @route PATCH /api/users/password-update
 * @description Update the password of the authenticated user
 * @access User
 */
router.patch(
  "/password-update",
  authMiddleware,
  authorizeRole(["user"]),
  updatePassword,
);

/**
 * @route PUT /api/user/profile
 * @description Update the profile of the authenticated user
 * @access User
 */
router.put("/profile", authMiddleware, updateProfile);

/**
 * @route GET /api/user/restaurants
 * @description Get all available restaurants
 * @access Public
 */
router.get("/restaurants", getrestaurants);

/**
 * @route GET /api/user/restaurants/:restaurantId/fooditems
 * @description Get all food items for the selected restaurant
 * @access Public
 */
router.get("/restaurants/:restaurantId/fooditems", getFoodItemsByRestaurant);

export default router;
