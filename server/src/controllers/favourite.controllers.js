import User from "../models/user.js";
import FoodItem from "../models/foodItem.js";

export const addFavourite = async (req, res) => {
  try {
    const { foodItemId } = req.params;
    const userId = req.user._id;

    const foodItem = await FoodItem.findById(foodItemId);

    if (!foodItem) {
      return res.status(404).json({
        success: false,
        message: "Food item not found",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const alreadyExists = user.favouriteItems.some(
      (id) => id.toString() === foodItemId,
    );

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Food item already in favourites",
      });
    }

    user.favouriteItems.push(foodItemId);
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Food item added to favourites successfully",
      favouriteItems: user.favouriteItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFavourites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("favouriteItems");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      count: user.favouriteItems.length,
      favouriteItems: user.favouriteItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeFavourite = async (req, res) => {
  try {
    const { foodItemId } = req.params;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const exists = user.favouriteItems.some(
      (id) => id.toString() === foodItemId,
    );

    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "Food item is not in favourites",
      });
    }

    user.favouriteItems = user.favouriteItems.filter(
      (id) => id.toString() !== foodItemId,
    );

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Food item removed from favourites successfully",
      favouriteItems: user.favouriteItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeAllFavourites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.favouriteItems = [];
    await user.save();

    return res.status(200).json({
      success: true,
      message: "All favourite items removed successfully",
      favouriteItems: [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
