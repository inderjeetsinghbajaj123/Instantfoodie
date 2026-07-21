import { Router } from "express";
import {
  getProfile,
  updateProfile,
  getrestaurants,
  getFoodItemsByRestaurant,
} from "../controllers/user.controller.js";
// Fix the folder name here by adding the 's'
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// Get logged-in user profile
router.get("/profile", authMiddleware, getProfile);

// Update logged-in user profile
router.put("/profile", authMiddleware, updateProfile);

// display the restaurants available to the user does not require authentication
router.get("/restaurants", getrestaurants);

//display the fooditems from the restaurant selected by the user and does not require authentication
router.get("/restaurants/:restaurantId/fooditems", getFoodItemsByRestaurant);

export default router;
