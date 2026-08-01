import User from "../models/user.js";
import restaurant from "../models/restaurant.js";
import foodItems from "../models/foodItem.js";
import bcrypt from 'bcrypt'

export const getProfile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { fullName, phone, address } = req.body;

    if (fullName) user.fullName = fullName;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    if (req.file) {
      user.profilePicture = req.file.path;
    }

    await user.save();

    const updatedUser = user.toObject();
    delete updatedUser.password;

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getrestaurants = async (req, res) => {
  try {
    const restaurants = await restaurant.find().select("-__v -owner"); //Displaying different restaurants to the user

    return res.status(200).json({
      success: true,
      restaurants: restaurants,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFoodItemsByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    if (!restaurantId) {
      return res.status(400).json({
        success: false,
        message: "Restaurant ID is required",
      });
    }

    const restaurantExists = await restaurant.findById(restaurantId);
    if (!restaurantExists) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    const getfoodItems = await foodItems
      .find({ restaurantId: restaurantId })
      .select("-__v -restaurantId "); // Fetching food items for the given restaurant
    return res.status(200).json({
      success: true,
      getfoodItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const { currentPassword, newPassword } = req.body;
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from current password",
      });
    }

    const hash = await bcrypt.hash(newPassword, 10);

    user.password = hash;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
