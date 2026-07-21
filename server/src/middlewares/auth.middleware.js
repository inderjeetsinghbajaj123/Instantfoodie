import jwt from "jsonwebtoken";
import User from "../models/user.js";

const authMiddleware = async function (req, res, next) {
  try {
    const token = req.cookies.Token;

    if (!token) {
      return res.status(401).json({ message: "Login Again" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User Not Found Retry ...." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
