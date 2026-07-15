import foodItems from "../models/foodItem.js";
import restaurant from "../models/restaurant.js"
export const createFoodItem = async (req, res) => {
    const { name, description, price, imageUrl, isVeg, category, preparationTime } = req.body;
    try {
        const user = req.user;

        if (user.role !== "restaurant") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Only restaurant accounts can perform this action."
            });
        }

        const Restaurant = await restaurant.findOne({ owner: req.user._id }) //from authmiddleware take the user id to find teh restraurant 
        if (!Restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            })
        }

        if (!name || !description || price == null || price < 0 || !category || preparationTime == null || preparationTime < 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide valid food item details."
            });
        }

        const newFoodItem = await foodItems.create({
            name,
            description,
            price,
            imageUrl,
            isVeg,
            category,
            preparationTime,
            restaurantId: Restaurant._id
        })

        return res.status(201).json({
            success: true,
            message: "Food item created successfully.",
            foodItem: newFoodItem
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// export const getAllFoodItems = async (req, res) => {
//     try {
        // const user = req.user;

        // if (user.role !== "restaurant") {
        //     return res.status(403).json({
        //         success: false,
        //         message: "Access denied. Only restaurant accounts can perform this action."
        //     });
        // }

//         const Restaurant = await restaurant.findOne({ owner: req.user._id }) //from authmiddleware take the user id to find teh restraurant 
//         if (!Restaurant) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Restaurant not found"
//             })
//         }
//         const FoodItems = await foodItems.find({ restaurantId: Restaurant._id })

//         return res.status(200).json({
//             success: true,
//             FoodItems
//         });

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// }

export const getAllFoodItems = async (req, res) => {
    try {
         const user = req.user;

        if (user.role !== "restaurant") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Only restaurant accounts can perform this action."
            });
        }

        const FoodItems = await foodItems.find({
            isAvailable:true
        });

        return res.status(200).json({
            success:true,
            FoodItems
        });

    } catch(error){

        return res.status(500).json({
            success:false,
            message:error.message
        });

    }
}

export const updateFoodInfo = async (req, res) => {
    try {
        const user = req.user;
        if (user.role !== "restaurant") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Only restaurant accounts can perform this action."
            });
        }

        const Restaurant = await restaurant.findOne({ owner: req.user._id }) //from authmiddleware take the user id to find teh restraurant 
        const {id}= req.params;
        if (!Restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            })
        }

        if (!id) {
            return res.status(500).json({
                success: false,
                message: 'No id was passed'
            });
        }
        const item = await foodItems.findById(id)
        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Food item not found."
            });
        }

        if (Restaurant._id.toString() !== item.restaurantId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this food item."
            });
        }

        const updatedFoodItem = await foodItems.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        return res.status(200).json({
            success: true,
            message: "Food item updated successfully.",
            foodItem: updatedFoodItem
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

export const getFoodItemsByCategory = async (req, res) => {
    try {
        const { category } = req.params
        const Restaurant = await restaurant.findOne({ owner: req.user._id }) //from authmiddleware take the user id to find teh restraurant 
        const user = req.user;
        if (user.role !== "restaurant") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Only restaurant accounts can perform this action."
            });
        }
        if (!Restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            })
        }

        if (!category) {
            return res.status(400).json({
                success: false,
                message: 'No category was passed'
            });
        }

        const getFoodItems = await foodItems.find({ restaurantId: Restaurant._id, category })

        if (getFoodItems.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No food items found in this category.",
                foodItems: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "Food item fetched successfully.",
            getFoodItems
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

