import { Router } from "express";
import { getProfile, updateProfile , getrestaurants } from "../controllers/user.controller.js";
// Fix the folder name here by adding the 's'
import authMiddleware from "../middlewares/auth.middleware.js"; 

const router = Router();

// Get logged-in user profile
router.get("/profile", authMiddleware, getProfile);

// Update logged-in user profile
router.put("/profile", authMiddleware, updateProfile);

// display the restaurants available to the user
router.get('/restaurants', getrestaurants) 

export default router;