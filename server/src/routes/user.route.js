import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/user.controllers.js";
// Fix the folder name here by adding the 's' - fixed 
import authMiddleware from "../middlewares/auth.middleware.js"; 

const router = Router();

// Get logged-in user profile
router.get("/profile", authMiddleware, getProfile);

// Update logged-in user profile
router.put("/profile", authMiddleware, updateProfile);

export default router;