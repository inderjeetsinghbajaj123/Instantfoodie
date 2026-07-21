import express from "express";
import {
  addFavourite,
  getFavourites,
  removeFavourite,
  removeAllFavourites,
} from "../controllers/favourite.controllers.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

// Add a food item to favourites
router.post("/:foodItemId", isAuthenticated, addFavourite);

// Get all favourite food items
router.get("/", isAuthenticated, getFavourites);

// Remove a single favourite
router.delete("/:foodItemId", isAuthenticated, removeFavourite);

// Remove all favourites
router.delete("/", isAuthenticated, removeAllFavourites);

export default router;
