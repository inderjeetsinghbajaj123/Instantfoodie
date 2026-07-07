import User from "../models/user.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password"); // Exclude password from the response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, 
      message: error.message });
  }
};

// Update logged-in user's profile
export const updateProfile = async (req, res) => {
    try {
        // Check if user exists
        const user = await User.findById(req.user._id).select("-password"); // Exclude password from the response

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Get updated data
        const { fullName, phone, address } = req.body;

        // Update only provided fields
        if (fullName) user.fullName = fullName;
        if (phone) user.phone = phone;
        if (address) user.address = address;

        // Update profile picture if uploaded
        if (req.file) {
            user.profilePicture = req.file.path;
        }

        await user.save();
        
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};