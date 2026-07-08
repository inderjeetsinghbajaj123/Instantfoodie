import express from "express";
import {
  createRestaurant,
  getMyRestaurants,
  updateRestaurant,
} from "../controllers/restaurant.controllers.js";

import authMiddleware from "../middlewares/auth.middleware.js"; 
const router = express.Router();

// Create a new restaurant
router.post("/", authMiddleware, createRestaurant);

// Get My restaurants
router.get("/my-restaurants", authMiddleware, getMyRestaurants);

// Update a restaurant
router.put("/:id", authMiddleware, updateRestaurant);

export default router;