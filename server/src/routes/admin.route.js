import express from "express";
import { adminLogin,adminRegister, adminLogout , getUserById ,} from "../controllers/admin.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = express.Router();

// Admin Registration Route 
router.post("/register", adminRegister);

// Login existing admin
router.post("/login", adminLogin);

// Logout admin
router.post("/logout", adminLogout);

// Get all users 
router.get('/users',authMiddleware,getUsers);

// Get all restaurants
router.get('/restaurants', authMiddleware, getRestaurants);

//View a specific user by ID
router.get('/users/:id', authMiddleware, getUserById);

export default router;