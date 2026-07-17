import Restaurant from "../models/restaurant.js";

// Create a new restaurant
export const createRestaurant = async (req, res) => {
  try {
    const {
      restaurantName,
      cuisine,
      description,
      restaurantAddress,
      isOpen,
    } = req.body;

    const restaurant = new Restaurant({
      restaurantName,
      cuisine,
      description,
      restaurantAddress,
      isOpen,
      owner: req.user._id,
    });

    await restaurant.save();

    res.status(201).json({
      success: true,
      message: "Restaurant created successfully",
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating restaurant",
      error: error.message,
    });
  }
};

// Get My Restaurants
export const getMyRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ owner: req.user._id });

    res.status(200).json({
      success: true,
      message: "Restaurants fetched successfully",
      restaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching restaurants",
      error: error.message,
    });
  }
};

// Update Restaurant
export const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findOneAndUpdate(
      {
        _id: id,
        owner: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found or unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Restaurant updated successfully",
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};