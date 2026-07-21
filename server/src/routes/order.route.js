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

router.post("/placeOrder", authMiddleware, PlaceOrder);

router.get("/myOrders", authMiddleware, getMyOrders);

router.get("/restaurantOrders", authMiddleware, getRestaurantOrders);

router.patch("/:orderId", authMiddleware, updateOrderStatus);

router.get("/track/:orderId", authMiddleware, trackOrder);

export default router;
