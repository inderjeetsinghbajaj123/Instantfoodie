import { Router } from "express";
const router = Router()
import authMiddleware from "../middlewares/auth.middleware.js";
import {
createFoodItem,
getAllFoodItems,
updateFoodInfo,
getFoodItemsByCategory,
deleteFoodItem,
getPublicFoodItems
} from "../controllers/foodItem.controllers.js";

router.post('/newFoodItem',authMiddleware , createFoodItem)

router.get('/AllFoodItems',authMiddleware , getAllFoodItems)

router.get('/public', getPublicFoodItems) // for public access without authentication

router.get('/category/:category', authMiddleware , getFoodItemsByCategory)

router.patch('/:id',authMiddleware, updateFoodInfo)

router.delete('/:id',authMiddleware, deleteFoodItem)

export default router