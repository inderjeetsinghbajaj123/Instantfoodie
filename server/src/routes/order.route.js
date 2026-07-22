import { Router } from "express";
import {
  PlaceOrder,
  getRestaurantOrders,
  updateOrderStatus,
  getMyOrders,
  trackOrder,
} from "../controllers/order.controllers.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @route POST /api/order/placeOrder
 * @description Place a new food order
 * @access User
 */
router.post("/placeOrder", authMiddleware, PlaceOrder);

/**
 * @route GET /api/order/myOrders
 * @description Get all orders placed by the authenticated user
 * @access User
 */
router.get("/myOrders", authMiddleware, getMyOrders);

/**
 * @route GET /api/order/restaurantOrders
 * @description Get all orders received by the authenticated restaurant
 * @access Restaurant
 */
router.get("/restaurantOrders", authMiddleware, getRestaurantOrders);

/**
 * @route PATCH /api/order/:orderId
 * @description Update the status of an order
 * @access Restaurant
 */
router.patch("/:orderId", authMiddleware, updateOrderStatus);

/**
 * @route GET /api/order/track/:orderId
 * @description Track the status of a specific order
 * @access User
 */
router.get("/track/:orderId", authMiddleware, trackOrder);

export default router;
