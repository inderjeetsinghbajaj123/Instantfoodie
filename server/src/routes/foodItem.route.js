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

router.post("/newFoodItem", authMiddleware, createFoodItem);

router.get("/AllFoodItems", authMiddleware, getAllFoodItems); // for customer to get displayed all dishes from different restuarants

router.get("/public", getPublicFoodItems); // for public access without authentication

router.get("/category/:category", authMiddleware, getFoodItemsByCategory); // for restaurants only access with authentication

router.get("/my-food", authMiddleware, getRestaurantFoods); // to get all the food items to the restaurant owner.

router.patch("/:id", authMiddleware, updateFoodInfo);

router.delete("/:id", authMiddleware, deleteFoodItem);

export default router;
