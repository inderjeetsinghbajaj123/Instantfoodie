import { Router } from "express";
const router = Router()
import authMiddleware from "../middlewares/auth.middleware.js";
import { createFoodItem , getAllFoodItems , updateFoodInfo ,getFoodItemsByCategory} from "../controllers/foodItem.controllers.js";

//Adding new food items in the restraurant menu 
router.post('/newFoodItem',authMiddleware , createFoodItem)

//to display all food items
router.get('/AllFoodItems',authMiddleware , getAllFoodItems)

//to display food items by category
router.get('/category/:category', authMiddleware , getFoodItemsByCategory)

//to update food item
router.patch('/:id',authMiddleware, updateFoodInfo)

export default router