import { Router } from "express";
import {
  userRegister,
  userLogin,
  userLogout,
  restaurantRegister,
  restaurantLogin,
} from "../controllers/auth.controllers.js";

const router = Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user account
 * @access Public
 */
router.post("/register", userRegister);

/**
 * @route POST /api/auth/login
 * @description Authenticate user and return JWT token
 * @access Public
 */
router.post("/login", userLogin);

/**
 * @route POST /api/auth/logout
 * @description Logout authenticated user
 * @access User
 */
router.post("/logout", userLogout);

/**
 * @route POST /api/auth/restaurant/register
 * @description Register a new restaurant owner account
 * @access Public
 */
router.post("/restaurant/register", restaurantRegister);

/**
 * @route POST /api/auth/restaurant/login
 * @description Authenticate restaurant owner and return JWT token
 * @access Public
 */
router.post("/restaurant/login", restaurantLogin);

/**
 * @route POST /api/auth/restaurant/logout
 * @description Logout authenticated restaurant owner
 * @access Restaurant
 */
router.post("/restaurant/logout", userLogout);

export default router;