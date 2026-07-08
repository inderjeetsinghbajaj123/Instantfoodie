import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    imageUrl: {
        type: String,
        default: "",
    },
    isVeg: {
        type: Boolean,
        default: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            "Starter",
            "MainCourse",
            "Dessert",
            "Beverage",
            "Snacks",
            "Fast Food"
        ]
    },
    preparationTime: {
        type: Number,
        required:true,
        min:1
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant',
        required: true
    }
}, {
    timestamps: true
})

const foodItems = mongoose.model('foodItems',foodSchema)

export default foodItems;