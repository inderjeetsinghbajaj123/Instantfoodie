import express from "express";
import {
  addFavourite,
  getFavourites,
  removeFavourite,
  removeAllFavourites,
} from "../controllers/favourite.controllers.js";
import authMiddleware  from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @route POST /api/favourites/:foodItemId
 * @description Add a food item to the authenticated user's favourites
 * @access User
 */
router.post("/:foodItemId", authMiddleware, addFavourite);

/**
 * @route GET /api/favourites
 * @description Get all favourite food items of the authenticated user
 * @access User
 */
router.get("/", authMiddleware, getFavourites);

/**
 * @route DELETE /api/favourites/:foodItemId
 * @description Remove a specific food item from the authenticated user's favourites
 * @access User
 */
router.delete("/:foodItemId", authMiddleware, removeFavourite);

/**
 * @route DELETE /api/favourites
 * @description Remove all favourite food items of the authenticated user
 * @access User
 */
router.delete("/", authMiddleware, removeAllFavourites);

export default router;