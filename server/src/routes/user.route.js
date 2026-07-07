import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

// Get logged-in user profile
router.get("/profile", authMiddleware, getProfile);

// Update logged-in user profile
router.put("/profile", authMiddleware, updateProfile);

export default router;
