import User from "../models/user.js";
import restaurant from "../models/restaurant.js";

// Get logged-in user profile (Fast & simple)
export const getProfile = async (req, res) => {
  try {
    // req.user was already fetched and stripped of password by authMiddleware
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Update logged-in user's profile
export const updateProfile = async (req, res) => {
  try {
    // 1. Fetch the full user document (do NOT use .select("-password") here to safeguard your password hash)
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // 2. Extract updated fields
    const { fullName, phone, address } = req.body;

    // 3. Update only provided fields
    if (fullName) user.fullName = fullName;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    // 4. Update profile picture if handled by an upload middleware (like Multer)
    if (req.file) {
      user.profilePicture = req.file.path;
    }

    // 5. Save document updates cleanly
    await user.save();
    
    // 6. Strip password before sending the document back to the client
    const updatedUser = user.toObject();
    delete updatedUser.password;

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getrestaurants = async (req, res) => {
    try {
         const restaurants = await restaurant.find().select("-__v -owner"); //Displaying different restaurants to the user

        return res.status(200).json({
            success:true,
            restaurants:restaurants
        });

    } catch(error){

        return res.status(500).json({
            success:false,
            message:error.message
        });

    }
}