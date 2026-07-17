import express from "express";
import {
  createRestaurant,
  getMyRestaurants,
  updateRestaurant,
} from "../controllers/restaurant.controllers.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRole from "../middlewares/role.middleware.js";

const router = express.Router();

// Create a new restaurant
router.post(
  "/",
  authMiddleware,
  authorizeRole("restaurant"),
  createRestaurant
);

// Get My restaurants
router.get(
  "/my-restaurants",
  authMiddleware,
  authorizeRole("restaurant"),
  getMyRestaurants
);

// Update a restaurant
router.put(
  "/:id",
  authMiddleware,
  authorizeRole("restaurant"),
  updateRestaurant
);

export default router;