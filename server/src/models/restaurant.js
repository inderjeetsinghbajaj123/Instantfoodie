import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    cuisine: { //1. stores the type of food the restaurant serves
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    restaurantAddress: {
      type: String,
      required: true,
      trim: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
