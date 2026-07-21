import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import restaurantRouter from "./routes/restaurant.route.js";
import authRouter from "./routes/auth.route.js"; // make sure file name matches exactly
import userRouter from "./routes/user.route.js";
import foodItemsRouter from "./routes/foodItem.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";
import adminRouter from "./routes/admin.route.js";
import favouriteRouter from "./routes/favourite.route.js";

const app = express();
app.set("trust proxy", 1);
app.use(express.json()); // to parse incoming JSON requests

app.use(cookieParser()); // to read cookies (used for login token
app.use(express.urlencoded({ extended: true })); //to parse the data sent through form

// Allow requests from frontend (React app) with cookies enabled
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      // add your deployed frontend URL here later, e.g:
      // "https://instantfoodie.vercel.app"
    ],
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);

app.use("/api/users", userRouter);

app.use("/api/restaurants", restaurantRouter);

app.use("/api/foodItems", foodItemsRouter);

app.use("/api/cart", cartRouter);

app.use("/api/order", orderRouter);

app.use("/api/admin", adminRouter);

app.use("/api/favourites", favouriteRouter);

export default app;
