import Restaurant from "../models/restaurant.js";

// Create a new restaurant
export const createRestaurant = async (req, res) => {
  try {
    // Allow only restaurant owners
    if (req.user.role !== "restaurant") {
      return res.status(403).json({
        success: false,
        message: "Only restaurant owners can create a restaurant.",
      });
    }

    const { restaurantName, cuisine, description, restaurantAddress, isOpen } =
      req.body;
    const restaurant = new Restaurant({
      restaurantName,
      cuisine,
      description,
      restaurantAddress,
      isOpen,
      owner: req.user._id, // Assuming you have user authentication and the user ID is available in req.user
    });
    await restaurant.save();
    res
      .status(201)
      .json({
        message: "Restaurant created successfully",
        success: true,
        restaurant,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error creating restaurant",
        error: error.message,
        success: false,
      });
  }
};

// Get My restaurants
export const getMyRestaurants = async (req, res) => {
  try {
    const ownerId = req.user._id; // Assuming you have user authentication and the user ID is available in req.user
    const restaurants = await Restaurant.find({ owner: ownerId });// Fetch restaurants owned by the logged-in user
    res
      .status(200)
      .json({
        success: true,
        message: "Restaurants fetched successfully",
        restaurants,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching restaurants",
        error: error.message,
        success: false,
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
        owner: req.user._id, // only owner can update
      },
      req.body,
      {
        new: true,
        runValidators: true,
      },
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
 