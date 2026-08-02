import express from "express";
import {
  createRestaurant,
  getMyRestaurants,
  updateRestaurant,
} from "../controllers/restaurant.controllers.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRole from "../middlewares/role.middleware.js";

const router = express.Router();

// Protected Admin Routes
router.use(authMiddleware);
router.use(authorizeRole("restaurant"));

/**
 * @route POST /api/restaurant
 * @description Create a new restaurant for the authenticated restaurant owner
 * @access Restaurant
 */
router.post("/",createRestaurant);

/**
 * @route GET /api/restaurant/my-restaurants
 * @description Get all restaurants owned by the authenticated restaurant owner
 * @access Restaurant
 */
router.get("/my-restaurants",getMyRestaurants,);

/**
 * @route PUT /api/restaurant/:id
 * @description Update restaurant details
 * @access Restaurant
 */
router.put("/:id",updateRestaurant);

export default router;
