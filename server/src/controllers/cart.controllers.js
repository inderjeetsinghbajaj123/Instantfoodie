import Cart from "../models/cart.js";
import FoodItem from "../models/foodItem.js";

// Add Item To Cart
export const addToCart = async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({
        success: false,
        message: "Only users can add items to cart",
      });
    }

    const { foodItemId, quantity = 1 } = req.body;

    const food = await FoodItem.findById(foodItemId);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food item not found",
      });
    }

    const existingItem = await Cart.findOne({
      userId: req.user._id,
      foodItemId,
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        data: existingItem,
      });
    }

    const cartItem = await Cart.create({
      userId: req.user._id,
      foodItemId,
      quantity,
    });

    return res.status(201).json({
      success: true,
      message: "Item added to cart",
      data: cartItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get User Cart
export const getCart = async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({
        success: false,
        message: "Only users can view cart",
      });
    }

    const cart = await Cart.find({
      userId: req.user._id,
    }).populate("foodItemId");

    return res.status(200).json({
      success: true,
      count: cart.length,
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({
        success: false,
        message: "Only users can update cart",
      });
    }

    const { cartId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const existingCart = await Cart.findById(cartId);

    if (!existingCart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    if (existingCart.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this cart",
      });
    }

    existingCart.quantity = quantity;

    await existingCart.save();

    const updatedCart = await Cart.findById(cartId).populate("foodItemId");

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: updatedCart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({
        success: false,
        message: "Only users can remove cart items",
      });
    }

    const { cartId } = req.params;

    const cartItem = await Cart.findOneAndDelete({
      _id: cartId,
      userId: req.user._id,
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({
        success: false,
        message: "Only users can clear cart",
      });
    }

    await Cart.deleteMany({
      userId: req.user._id,
    });

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
