import mongoose from "mongoose";

// Connects to MongoDB Atlas using the URI from .env
export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB connected! Host: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log("MongoDB connection failed:", error);
    process.exit(1); // stop the server if DB fails to connect
  }
};
