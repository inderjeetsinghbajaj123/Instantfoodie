import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import restaurantRouter from "./routes/restaurant.route.js";
import authRouter from "./routes/auth.route.js"; // make sure file name matches exactly
import userRouter from "./routes/user.route.js"
import foodItemsRouter from './routes/foodItem.route.js'


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


// ---------- Routes ----------

app.use("/api/auth", authRouter);

app.use("/api/users", userRouter);

app.use("/api/restaurants", restaurantRouter);

app.use("/api/foodItems", foodItemsRouter)

// // Restaurant routes -> list restaurants, food items, menu



// // Cart routes -> add/remove/view cart items
// import cartRouter from "./routes/cart.route.js"
// app.use("/api/cart", cartRouter)

// // Order routes -> place order, order history, order status, tracking
// import orderRouter from "./routes/order.route.js"
// app.use("/api/orders", orderRouter)

export default app;
