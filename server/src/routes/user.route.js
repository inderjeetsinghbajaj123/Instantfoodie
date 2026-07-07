import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/user.controller.js";
import {isLoggedIn} from "../middlewares/auth.isLoggedIn.js";

const router = Router();

// Get logged-in user profile
router.get("/profile", isLoggedIn, getProfile);

// Update logged-in user profile
router.put("/profile", isLoggedIn, updateProfile);

export default router;
