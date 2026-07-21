import crypto from "crypto";
import Order from "../models/order.js";
import foodItems from "../models/foodItem.js";
import Restaurant from "../models/restaurant.js";
import { get } from "http";
import { validTransition } from "../utils/orderStatusValidator.js";

export const PlaceOrder = async (req, res) => {
  try {
    let { restaurantId, items, deliveryAddress } = req.body; // items return array consisting of objects returning foodItem id and quantity
    if (!restaurantId || !items || items.length === 0 || !deliveryAddress) {
      return res.status(400).json({
        success: false,
        message: "Restaurant ID, items, and delivery address are required",
      });
    }
    const user = req.user;
    if (user.role != "user") {
      return res.status(403).json({
        success: false,
        message: "only user can place orders",
      });
    }

    const orderId = `ORD-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;

    let orderItems = [];

    for (let item of items) {
      let findItem = await foodItems.findById(item.foodItemId);

      if (!findItem) {
        return res.status(404).json({
          success: false,
          message: "No food item found",
        });
      }

      if (!findItem.isAvailable) {
        return res.status(404).json({
          success: false,
          message: "Some items are out of stock",
        });
      }

      orderItems.push({
        foodItemId: item.foodItemId,
        name: findItem.name,
        price: findItem.price,
        quantity: item.quantity,
        subtotal: item.quantity * findItem.price,
      });
    }
    let totalAmount = orderItems.reduce((acc, ci) => acc + ci.subtotal, 0);
    let placeOrder = await Order.create({
      orderId,
      userId: user._id,
      restaurantId,
      items: orderItems,
      totalAmount,
      deliveryAddress,
    });

    return res.status(201).json({
      success: true,
      message: "order placed successfully",
      order: placeOrder,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false,
    });
  }
};

export const getRestaurantOrders = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const user = req.user;

    if (user.role !== "restaurant") {
      return res.status(403).json({
        success: false,
        message: "only restaurants can view there orders",
      });
    }

    // FIX: get ALL restaurants owned by this user, not just one
    const myRestaurants = await Restaurant.find({ owner: user._id });
    if (!myRestaurants || myRestaurants.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    const restaurantIds = myRestaurants.map((r) => r._id);

    const getOrders = await Order.find({ restaurantId: { $in: restaurantIds } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "name email");

    if (getOrders.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No orders are placed",
        Orders: [],
      });
    }

    return res.status(200).json({
      success: true,
      Orders: getOrders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const trackOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ orderId })
      .populate("restaurantId", "name")
      .populate("userId", "name email");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order: {
        orderId: order.orderId,
        status: order.orderStatus,
        items: order.items,
        totalAmount: order.totalAmount,
        restaurant: order.restaurantId,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Need to send order id first",
      });
    }

    if (!orderStatus) {
      return res.status(400).json({
        success: false,
        message: "Need to send status",
      });
    }

    const user = req.user;

    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "No order of this id is available",
      });
    }

    if (user.role === "restaurant") {
      const myRestaurants = await Restaurant.find({ owner: user._id });
      if (!myRestaurants || myRestaurants.length === 0) {
        return res.status(403).json({
          success: false,
          message: "Restaurant not found",
        });
      }
      const restaurantIds = myRestaurants.map((r) => r._id.toString());

      if (!restaurantIds.includes(order.restaurantId.toString())) {
        return res.status(400).json({
          success: false,
          message: "Unauthorized access",
        });
      }

      const validateTransitionStatus = validTransition(
        order.orderStatus,
        orderStatus,
      );
      if (!validateTransitionStatus) {
        return res.status(400).json({
          success: false,
          message: `Invalid order Status passed`,
        });
      }

      const updateStatus = await Order.findByIdAndUpdate(
        order._id,
        { orderStatus },
        { new: true, runValidators: true },
      );

      return res.status(200).json({
        success: true,
        Order: updateStatus,
      });
    }

    if (user.role === "user") {
      if (orderStatus !== "Cancelled") {
        return res.status(403).json({
          success: false,
          message: "You can only cancel your order",
        });
      }

      if (order.userId.toString() !== user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized access",
        });
      }

      const cancellableStatuses = ["Placed", "Preparing"];
      if (!cancellableStatuses.includes(order.orderStatus)) {
        return res.status(400).json({
          success: false,
          message: "Order can no longer be cancelled",
        });
      }

      const updateStatus = await Order.findByIdAndUpdate(
        order._id,
        { orderStatus: "Cancelled" },
        { new: true, runValidators: true },
      );

      return res.status(200).json({
        success: true,
        Order: updateStatus,
      });
    }

    return res.status(403).json({
      success: false,
      message: "Not authorized to update order status",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false,
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({
        success: false,
        message: "Only users can view their orders",
      });
    }

    const orders = await Order.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
