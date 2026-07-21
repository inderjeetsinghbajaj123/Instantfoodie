import express from "express";
import {
  adminLogin,
  adminLogout,
  getAllUsers,
  getAllRestaurants,
  getUserById,
  deleteUser,
  updateRestaurantStatus,
  getAllOrders,
  deleteRestaurant,
  deleteFoodItem,
} from "../controllers/admin.controllers.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRole from "../middlewares/role.middleware.js";

const router = express.Router();

/**
 * @route POST /api/admin/login
 * @description Authenticate admin and return JWT token
 * @access Public
 */
router.post("/login", adminLogin);

router.use(authMiddleware);
router.use(authorizeRole("admin"));

/**
 * @route POST /api/admin/logout
 * @description Logout authenticated admin
 * @access Admin
 */
router.post("/logout", adminLogout);

/**
 * @route GET /api/admin/users
 * @description Get all registered users
 * @access Admin
 */
router.get("/users", getAllUsers);

/**
 * @route GET /api/admin/users/:id
 * @description Get user details by ID
 * @access Admin
 */
router.get("/users/:id", getUserById);

/**
 * @route DELETE /api/admin/users/:id
 * @description Delete a user account
 * @access Admin
 */
router.delete("/users/:id", deleteUser);

/**
 * @route GET /api/admin/restaurants
 * @description Get all registered restaurants
 * @access Admin
 */
router.get("/restaurants", getAllRestaurants);

/**
 * @route PATCH /api/admin/restaurants/:id/status
 * @description Approve or update restaurant status
 * @access Admin
 */
router.patch("/restaurants/:id/status", updateRestaurantStatus);

/**
 * @route DELETE /api/admin/restaurants/:id
 * @description Delete a restaurant
 * @access Admin
 */
router.delete("/restaurants/:id", deleteRestaurant);

/**
 * @route DELETE /api/admin/food-item/:id
 * @description Delete a food item
 * @access Admin
 */
router.delete("/food-item/:id", deleteFoodItem);

/**
 * @route GET /api/admin/orders
 * @description Get all orders in the system
 * @access Admin
 */
router.get("/orders", getAllOrders);

export default router;