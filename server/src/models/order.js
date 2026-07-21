//order schema
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    items: {
      type: [
        {
          foodItemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "foodItems",
            required: true,
          },
          name: {
            type: String,
            required: true,
            trim: true,
          },
          price: {
            type: Number,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            min: 1,
          },
          subtotal: {
            type: Number,
            required: true,
            min: 1,
          },
        },
      ],
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 1,
    },
    deliveryAddress: {
      type: String,
      trim: true,
    },
    orderStatus: {
      type: String,
      enum: [
        "Placed",
        "Preparing",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Placed",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Order", orderSchema);
