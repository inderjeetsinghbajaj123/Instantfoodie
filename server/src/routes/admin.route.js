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

// Public Route
router.post("/login", adminLogin);

// Protected Routes
router.use(authMiddleware);
router.use(authorizeRole("admin"));

// Logout
router.post("/logout", adminLogout);

// Users
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.delete("/users/:id", deleteUser);

// Restaurants
router.get("/restaurants", getAllRestaurants);
router.patch("/restaurants/:id/status", updateRestaurantStatus);
router.delete("/restaurants/:id", deleteRestaurant);

// Food Items
router.delete("/food-item/:id", deleteFoodItem);

// Orders
router.get("/orders", getAllOrders);

export default router;
