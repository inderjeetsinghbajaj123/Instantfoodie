import express from "express";
import { adminLogin,adminRegister, adminLogout } from "../controllers/admin.controllers.js";
const router = express.Router();

// Admin Registration Route 
router.post("/register", adminRegister);

// Login existing admin
router.post("/login", adminLogin);

// Logout admin
router.post("/logout", adminLogout);

export default router;