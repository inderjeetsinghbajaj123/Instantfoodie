import { Router } from "express";
import {
  userRegister,
  userLogin,
  userLogout,
  restaurantRegister,
  restaurantLogin,
} from "../controllers/auth.controllers.js";

const router = Router();

// ================= USER =================

// Register User
router.post("/register", userRegister);

// Login User
router.post("/login", userLogin);

// Logout User
router.post("/logout", userLogout);

// ================= RESTAURANT =================

// Register Restaurant Owner
router.post("/restaurant/register", restaurantRegister);

// Login Restaurant Owner
router.post("/restaurant/login", restaurantLogin);

// Logout Restaurant Owner
router.post("/restaurant/logout", userLogout);

export default router;
