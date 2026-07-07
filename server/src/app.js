import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

const app = express();
app.set("trust proxy", 1);

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

app.use(cookieParser()) // to read cookies (used for login token)
app.use(express.json()) // to parse incoming JSON requests
app.use(express.urlencoded({extended:true}))//to parse the data sent through form

// ---------- Routes ----------

app.use("/api/auth", authRouter)

// // User routes -> profile, update profile
// import userRouter from "./routes/user.route.js"
// app.use("/api/users", userRouter)

app.use("/api/users", userRouter);

// // Restaurant routes -> list restaurants, food items, menu
// import restaurantRouter from "./routes/restaurant.route.js"
// app.use("/api/restaurants", restaurantRouter)

// // Cart routes -> add/remove/view cart items
// import cartRouter from "./routes/cart.route.js"
// app.use("/api/cart", cartRouter)

// // Order routes -> place order, order history, order status, tracking
// import orderRouter from "./routes/order.route.js"
// app.use("/api/orders", orderRouter)

export default app;
